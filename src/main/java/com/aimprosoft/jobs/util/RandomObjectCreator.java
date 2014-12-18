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
        Class objectType = t.getClass();

        for (Field field : objectType.getDeclaredFields()) {
            Method setter;

            try {
                setter = getSetter(field, objectType);
            } catch (NoSuchMethodException e) {
                continue;
            }

            setValue(field, t, setter, id);
        }
        return t;
    }


//  ========================================= PRIVATE =========================================

    private static <T> Method getSetter(Field field, Class<T> clazz) throws NoSuchMethodException {
        String setterName = "set" + Character.toUpperCase(field.getName().charAt(0)) + field.getName().substring(1);
        Class type = field.getType();
        return clazz.getMethod(setterName, type);
    }

    private static Object createInstance(Field field, Object o) {
        Class instanceType = field.getType();
        Object instance = null;
        try {
            if (instanceType == Integer.class || instanceType == Long.class) {
                instance = createNumberValue(instanceType);
            } else {
                instance = field.getType().newInstance();
            }
        } catch (Exception e) {
            LOGGER.debug(field.getName() + " field in the " + o + " was not set.");
        }
        return instance;
    }


    private static void setValue(Field field, Object o, Method setter, Integer id) {
        Object instance = createInstance(field, o);
        Object value = null;

        try {
            if (field.isAnnotationPresent(Id.class)) {
                value = id;
            } else if (instance instanceof Number) {
                value = instance;
            } else if (instance instanceof String) {
                value = createStringValue(field);
            } else if (instance instanceof Date) {
                value = createDateValue();
            } else if (field.getType() == boolean.class) {
                setter.invoke(o, true);
            }
            setter.invoke(o, value);
        } catch (Exception e) {
            System.out.println("error with field:" + field.getName());
        }

    }

    private static String createStringValue(Field field) {
        if (field.getName().contains("mail")) {
            return randomString(4) + '@' + randomString(3) + '.' + randomString(2);
        }
        return randomString(1).toUpperCase() + randomString(8);
    }

    private static Date createDateValue() {
        long maxTimeStamp = System.currentTimeMillis();
        long randomTimeStamp = randomNumber(maxTimeStamp);
        return new Date(randomTimeStamp);
    }

    private static Number createNumberValue(Class type) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
        String randomStringNumber = Long.toString(randomNumber(10000));
        return (Number) type.getConstructor(String.class).newInstance(randomStringNumber);
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

    public static long randomNumber(long x) {
        return (long) Math.round(Math.random() * x);
    }

}
