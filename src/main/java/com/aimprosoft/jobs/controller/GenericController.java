package com.aimprosoft.jobs.controller;

import com.aimprosoft.jobs.ApplicationException;
import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.model.impl.Department;
import com.aimprosoft.jobs.model.impl.Employee;
import com.aimprosoft.jobs.service.DepartmentService;
import com.aimprosoft.jobs.service.EmployeeService;
import com.aimprosoft.jobs.service.ValidationException;
import com.aimprosoft.jobs.util.RandomObjectCreator;
import org.apache.log4j.Logger;
import org.springframework.beans.TypeMismatchException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

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

    protected Logger logger = Logger.getLogger(this.getClass());

    @Autowired
    protected EmployeeService employeeService;

    @Autowired
    protected DepartmentService departmentService;

    /**
     * Redirects request to error page which contains exception message
     */
    @ExceptionHandler({Throwable.class})
    public ModelAndView applicationExceptionHandler(Throwable e) {
        return doExceptionScenario(e);
    }

    @ExceptionHandler(TypeMismatchException.class)
    public ModelAndView typeMismatchExceptionHandler() {
        return applicationExceptionHandler(new EvilUserDetectedException("Evil user go home!"));
    }


}
