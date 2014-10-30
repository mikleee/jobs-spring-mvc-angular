package com.aimprosoft.jobs.util;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

/**
 * Created on 1/8/14.
 */
@Component
public class SpringUtils {

    private static ApplicationContext applicationContext;

    public static <T> T getBean(Class<T> requiredType) throws BeansException {
        return applicationContext.getBean(requiredType);
    }

    @Autowired
    public void setApplicationContext(ApplicationContext applicationContext) {
        SpringUtils.applicationContext = applicationContext;
    }

}
