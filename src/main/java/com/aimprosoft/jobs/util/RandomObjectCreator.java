package com.aimprosoft.jobs.util;

import org.apache.log4j.Logger;

import javax.persistence.Id;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Date;

/**
 * @author Mikhail Tkachenko
 */
public class RandomObjectCreator {

    private static final Logger LOGGER = Logger.getLogger(RandomObjectCreator.class);

    public static <T> T createRandomObject(T t, Integer id) {

        for (Field field : t.getClass().getDeclaredFields()) {

            String setterName = "set" + Character.toUpperCase(field.getName().charAt(0)) + field.getName().substring(1);
            Class type = field.getType();

            Method setter = null;

            try {
                setter = t.getClass().getMethod(setterName, type);
            } catch (NoSuchMethodException e) {
                continue;
            }

            setValue(field, t, setter, id);

        }
        return t;
    }


//  ========================================= PRIVATE =========================================


    private static void setValue(Field field, Object o, Method setter, Integer id) {

        Object instance = null;

        try {
            instance = field.getType().newInstance();
        } catch (Exception e) {
            try {
                instance = field.getType().getConstructor(int.class).newInstance(randomNumber());
            } catch (Exception e1) {
                try {
                    instance = field.getType().getConstructor(long.class).newInstance(randomNumber());
                } catch (Exception e2) {
                    LOGGER.debug(field.getName() + " field in the " + o + " was not set.");
                }
            }
        }

        try {

            if (field.isAnnotationPresent(Id.class)) {

                if (id == null) {
                    return;
                } else {
                    setter.invoke(o, id);
                }

            }

            if (instance instanceof Number) {
                setter.invoke(o, instance);
            } else if (instance instanceof String) {

                String value;

                if (field.getName().contains("mail")) {
                    value = randomString(4) + '@' + randomString(3) + '.' + randomString(2);
                } else {
                    value = randomString(1).toUpperCase() + randomString(8);
                }

                setter.invoke(o, value);
            } else if (instance instanceof Date) {
                setter.invoke(o, new Date());
            } else if (field.getType() == boolean.class) {
                setter.invoke(o, true);
            }
        } catch (IllegalAccessException | InvocationTargetException | IllegalArgumentException e) {
            System.out.println("error with field:" + field.getName());
        }

    }


    public static String randomString(int c) {
        StringBuilder sb = new StringBuilder();
        for (int j = 0; j < c; j++) {
            sb.append((char) Math.round(97 + Math.random() * 25));
        }
        return sb.toString();
    }


    public static int randomNumber() {
        return (int) Math.round(Math.random() * 100);
    }

    public static int randomNumber(int x) {
        return (int) Math.round(Math.random() * x);
    }


}
