package com.aimprosoft.jobs.util;

import java.io.IOException;

/**
 * @author by Мишаня on 28.11.14.
 */
public class CommonUtils {

    public static String makeJson(Object o) {
        String result = "";

        try {
            result = SpringUtils.getObjectMapper().writeValueAsString(o);
        } catch (IOException e) {
            //ignore
        }

        return result;
    }

}
