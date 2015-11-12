package com.unep.wcmc.biodiversity.security;

import com.unep.wcmc.biodiversity.security.token.TokenProvider;
import com.unep.wcmc.biodiversity.security.token.XAuthTokenConfigurer;
import com.unep.wcmc.biodiversity.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Configuration responsible for setting all authorized requests as well as login service
 *
 */
@Order(1)
@Configuration
@EnableWebSecurity
@EnableSpringDataWebSupport
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private Http401UnauthorizedEntryPoint authenticationEntryPoint;

    public SecurityConfig() {
        super(true);
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        // Security filters
        httpSecurity.addFilterBefore(new CORSFilter(), ChannelProcessingFilter.class);
        httpSecurity.addFilterBefore(new LoginFilter("/login", tokenProvider,
                userService, authenticationManager()), UsernamePasswordAuthenticationFilter.class);
        // Security configuration
        httpSecurity.exceptionHandling()
                .accessDeniedHandler(new AccessDeniedHandlerImpl())
                .authenticationEntryPoint(authenticationEntryPoint)
            .and().csrf().disable().headers().frameOptions().disable()
            .and().headers().cacheControl().disable()
            .and().anonymous()
            .and().servletApi()
            .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and().authorizeRequests()
                .antMatchers(HttpMethod.POST, "/login").denyAll()
                .antMatchers(HttpMethod.GET, "/media/image/**").permitAll()
            .and().apply(securityConfigurerAdapter());
        // Logout process
        LogoutHandler logoutHandler = new LogoutHandler(tokenProvider);
        httpSecurity.logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "POST"))
                .logoutSuccessHandler(logoutHandler)
                .addLogoutHandler(logoutHandler);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected UserDetailsService userDetailsService() {
        return userService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    private XAuthTokenConfigurer securityConfigurerAdapter() {
        return new XAuthTokenConfigurer(tokenProvider);
    }

}
