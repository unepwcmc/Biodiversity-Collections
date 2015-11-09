package com.unep.wcmc.biodiversity.config;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
@ComponentScan
public class MailConfig {

    @Value("${smtp.host}")
    private String host;
    @Value("${smtp.port}")
    private int port;
    @Value("${smtp.protocol}")
    private String protocol;
    @Value("${smtp.username}")
    private String username;
    @Value("${smtp.password}")
    private String password;
    @Value("${mail.smtp.auth}")
    private boolean auth;
    @Value("${mail.smtp.starttls.enable}")
    private boolean starttls;
    @Value("${mail.smtp.debug}")
    private boolean mailDebug;
    
    @Bean
    public JavaMailSender javaMailSenderImpl() {
        final JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        final Properties properties = new Properties();
        mailSender.setHost(host);
        mailSender.setPort(port);
        mailSender.setProtocol(protocol);
        mailSender.setUsername(username);
        mailSender.setPassword(password);
        properties.put("mail.smtp.auth", auth);
        properties.put("mail.smtp.starttls.enable", starttls);
        properties.put("mail.smtp.debug", mailDebug);
        properties.put("mail.smtp.socketFactory.port", port);
        properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        mailSender.setJavaMailProperties(properties);
        return mailSender;
    }
}