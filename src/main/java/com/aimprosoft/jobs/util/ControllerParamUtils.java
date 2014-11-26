package com.aimprosoft.jobs.util;

import com.aimprosoft.jobs.ApplicationException;
import com.aimprosoft.jobs.controller.EvilUserDetectedException;
import org.springframework.ui.ModelMap;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.GregorianCalendar;
import java.util.List;

/**
 * Created on 29.12.13.
 */
public class ControllerParamUtils {

    public final static String INCORRECT_EMP_ID_MESSAGE = "Evil user go home! (evil user has typed incorrect value of employee id)";
    public final static String INCORRECT_DEP_ID_MESSAGE = "Evil user go home! (evil user has typed incorrect value of department id)";

    private static final int MAX_YEAR = 2000;
    private static final int MIN_YEAR = 1969;

    //go to error page with exception message
    public static String doExceptionScenario(ModelMap modelMap, ApplicationException e) {
        modelMap.put("exceptionMessage", e.getMessage());
        return "ErrorPage";
    }

    public static String doExceptionScenario(ApplicationException e, HttpServletRequest req) {
        req.setAttribute("exceptionMessage", e.getMessage());
        return "ErrorPage";
    }

    public static ModelAndView doExceptionScenario(Throwable e) {
        return new ModelAndView("ErrorPage", "exceptionMessage", e.getMessage());
    }

    //String encoder
    public static String getStringParam(String parameter, HttpServletRequest req) {
        try {
            return new String(req.getParameter(parameter).getBytes("ISO-8859-1"), "utf-8");
        } catch (UnsupportedEncodingException e) {
            return req.getParameter(parameter);
        }
    }


    public static Integer getIntegerFromParams(HttpServletRequest req, String paramName, String messageForException) throws EvilUserDetectedException {
        String idParam = req.getParameter(paramName);
        if (idParam == null || idParam.equals("")) {
            return null;
        } else {
            try {
                return Integer.valueOf(idParam);
            } catch (IllegalArgumentException e) {
                throw new EvilUserDetectedException(messageForException);
            }
        }
    }


    public static Date getDateFromParams(Integer year, Integer month, Integer day) throws EvilUserDetectedException {
        Date result = null;

        if ((year <= MIN_YEAR || year > MAX_YEAR) || (month < 1 || month > 12) || (day < 1 || day > 31)) {
            throw new EvilUserDetectedException("Evil user go home! (evil user has typed incorrect range of year, month or day)");
        }
        if (isDateCorrect(year, month, day)) {
            result = new Date(new GregorianCalendar(year, month - 1, day).getTimeInMillis());
        }

        return result;

    }


    public static Date setDateFromParams(HttpServletRequest req) throws EvilUserDetectedException {
        Date result = null;
        Integer year;
        Integer month;
        Integer day;
        try {
            year = Integer.valueOf(req.getParameter("year"));
            month = Integer.valueOf(req.getParameter("month"));
            day = Integer.valueOf(req.getParameter("date"));
        } catch (IllegalArgumentException e) {
            throw new EvilUserDetectedException("Evil user go home! (evil user has typed incorrect value of year, month or day)");
        }

        if ((year <= MIN_YEAR || year > MAX_YEAR) || (month < 1 || month > 12) || (day < 1 || day > 31)) {
            throw new EvilUserDetectedException("Evil user go home! (evil user has typed incorrect range of year, month or day)");
        }
        if (isDateCorrect(year, month, day)) {
            result = new Date(new GregorianCalendar(year, month - 1, day).getTimeInMillis());
        }

        return result;

    }

    public static Integer parseSalary(String salary) {
        try {
            return Integer.valueOf(salary);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    public static void putDateCollectionsIntoRequestAttributes(ModelMap map) {
        map.put("years", getYears());
        map.put("months", getMonths());
        map.put("dates", getDates());
    }

//------------------------------private methods-------------------------------------------------------------------------


    private static boolean isDateCorrect(int year, int month, int day) {

        boolean monthWith31Days = (month == 1) || (month == 3) || (month == 5) || (month == 7) || (month == 8) || (month == 10) || (month == 12);
        boolean monthWith30Days = (month == 4) || (month == 6) || (month == 9) || (month == 11);
        boolean february = (month == 2);

        if (monthWith31Days && day <= 31) return true;
        if (monthWith30Days && day <= 30) return true;
        if (february && day <= 28) return true;
        //noinspection RedundantIfStatement
        if (february && year % 4 == 0 && day <= 29) return true;

        return false;
    }


    private static List<Integer> getYears() {
        ArrayList<Integer> years = new ArrayList<>();
        for (int i = MAX_YEAR; i > MIN_YEAR; i--) {
            years.add(i);
        }
        return years;
    }

    private static ArrayList<Integer> getMonths() {
        ArrayList<Integer> months = new ArrayList<>();
        for (int i = 12; i > 0; i--) {
            months.add(i);
        }
        return months;
    }

    private static ArrayList<Integer> getDates() {
        ArrayList<Integer> dates = new ArrayList<>();
        for (int i = 31; i > 0; i--) {
            dates.add(i);
        }
        return dates;
    }


}
