package com.aimprosoft.jobs.util;


/**
 * Created on 17.12.13.
 */
public class ControllerEntityUtils {


/*    public static Employee createEmployeeFromParams(HttpServletRequest req) throws EvilUserDetectedException {

        Employee employee = new Employee();

        employee.setId(getIntegerFromParams(req, EMP_ID, INCORRECT_EMP_ID_MESSAGE));
        employee.setName(getStringParam(EMP_NAME, req));
        employee.setEmail(req.getParameter(EMP_EMAIL));
        employee.setBirth(setDateFromParams(req));
        employee.setDepartmentId(getIntegerFromParams(req, DEP_ID, INCORRECT_DEP_ID_MESSAGE));
        employee.setDepartment(new Department(getIntegerFromParams(req, DEP_ID, INCORRECT_DEP_ID_MESSAGE)));

        //set employee salary
        try {
            employee.setSalary(Integer.valueOf(req.getParameter(EMP_SALARY)));
        } catch (IllegalArgumentException e) {
            employee.setSalary(null);
        }

        return employee;
    }



    public static Department createDepartmentFromParams(HttpServletRequest req) throws EvilUserDetectedException {
        Integer id = getIntegerFromParams(req, DEP_ID, INCORRECT_DEP_ID_MESSAGE);
        String name = ControllerParamUtils.getStringParam(DEP_NAME, req);
        String location = ControllerParamUtils.getStringParam(DEP_LOCATION, req);
        return new Department(id, name, location);
    }*/



}
