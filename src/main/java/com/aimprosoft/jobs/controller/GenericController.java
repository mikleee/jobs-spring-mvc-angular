package com.aimprosoft.jobs.controller;

import com.aimprosoft.jobs.ApplicationException;
import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.service.DepartmentService;
import com.aimprosoft.jobs.service.EmployeeService;
import org.springframework.beans.TypeMismatchException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import static com.aimprosoft.jobs.util.ControllerParamUtils.doExceptionScenario;

/**
 * Created on 28.12.13.
 */
public abstract class GenericController {

    public final static String DEP_ID = "depId";
    public final static String DEP_NAME = "depName";
    public final static String DEP_LOCATION = "depLocation";

    public final static String EMP_ID = "empId";
    public final static String EMP_NAME = "name";
    public final static String EMP_EMAIL = "e-mail";
    public final static String EMP_SALARY = "salary";


    @Autowired
    protected EmployeeService employeeService;

    @Autowired
    protected DepartmentService departmentService;


    /**
     * Redirects request to error page which contains exception message
     */
    @ExceptionHandler({EvilUserDetectedException.class, DataSourceException.class})
    public ModelAndView applicationExceptionHandler(ApplicationException e) {
        return doExceptionScenario(e);
    }

    @ExceptionHandler(TypeMismatchException.class)
    public ModelAndView typeMismatchExceptionHandler() {
        return applicationExceptionHandler(new EvilUserDetectedException("Evil user go home!"));
    }


}
