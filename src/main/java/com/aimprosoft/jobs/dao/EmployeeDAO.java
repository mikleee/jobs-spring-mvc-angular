package com.aimprosoft.jobs.dao;

import com.aimprosoft.jobs.model.impl.Employee;

import java.util.List;

/**
 * Created on 12/23/13.
 */
public abstract class EmployeeDAO extends EntityDAO<Employee> {

    public abstract List<Employee> getAllInDepartment(Integer id) throws DataSourceException;


}
