package com.artsquare.cipi;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceChainRegistration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.ResourceUrlEncodingFilter;
import org.springframework.web.servlet.resource.VersionResourceResolver;

@Configuration
public class CacheBustConfig extends WebMvcConfigurerAdapter {

    private static final Logger logger = LoggerFactory.getLogger(CacheBustConfig.class);

    @Value("${spring.thymeleaf.cache:true}")
    private boolean productionMode;

    @Bean
    public ResourceUrlEncodingFilter resourceUrlEncodingFilter() {
        return new ResourceUrlEncodingFilter();
    }

    @PostConstruct
    public void log() {
        logger.info("production-mode cache busting is " + (productionMode ? "" : "not ") + "enabled");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        ResourceChainRegistration chain = registry.addResourceHandler("/**").
            addResourceLocations("classpath:/public/").
            setCachePeriod(productionMode ? 31536000 : 0).resourceChain(productionMode);

        if(productionMode) {
            chain.addResolver(new VersionResourceResolver().addContentVersionStrategy("/**"));
        }
    }
}
