package com.unep.wcmc.biodiversity.security;

import com.unep.wcmc.biodiversity.service.TokenAuthenticationService;
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
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Configuration responsible for setting all authorized 
 * requests as well as login service
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
    private TokenAuthenticationService tokenAuthenticationService;

    public SecurityConfig() {
        super(true);
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        final LogoutHandler logoutHandler = new LogoutHandler(tokenAuthenticationService);
        httpSecurity.addFilterBefore(new CORSFilter(), ChannelProcessingFilter.class);
        httpSecurity.exceptionHandling().accessDeniedHandler(new AccessDeniedHandlerImpl())
                .and().anonymous().and().servletApi().and().headers().cacheControl();
        httpSecurity.authorizeRequests()
                .antMatchers(HttpMethod.POST, "/login").denyAll()
                .antMatchers(HttpMethod.GET, "/media/image/**").permitAll();
        httpSecurity.logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "POST"))
                .logoutSuccessHandler(logoutHandler)
                .addLogoutHandler(logoutHandler);
        httpSecurity.csrf().disable();
        httpSecurity.addFilterBefore(new LoginFilter("/login", tokenAuthenticationService,
                userService, authenticationManager()), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new AuthenticationFilter(tokenAuthenticationService),
                        UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService);
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
}
