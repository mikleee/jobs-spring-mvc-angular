package com.aimprosoft.jobs.service;

import com.aimprosoft.jobs.controller.EvilUserDetectedException;
import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.dao.EmployeeDAO;
import com.aimprosoft.jobs.model.impl.Employee;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created on 12/23/13.
 */
public abstract class EmployeeService extends EntityService<Employee> {

    protected static final String GET_EMP_LIST_ERROR = "DATA SOURCE ERROR (getOne employee list failed)";
    protected static final String GET_EMP_ERROR = "DATA SOURCE ERROR (getOne employee failed)";
    protected static final String PUT_EMP_ERROR = "DATA SOURCE ERROR (put employee failed)";
    protected static final String REMOVE_EMP_ERROR = "DATA SOURCE ERROR (remove employee failed)";
    protected static final String UPDATE_EMP_ERROR = "DATA SOURCE ERROR (update employee failed)";

    @Autowired
    protected EmployeeDAO employeeDAO;

    public abstract List<Employee> getAllInDepartment(Integer id) throws DataSourceException, EvilUserDetectedException;


}
