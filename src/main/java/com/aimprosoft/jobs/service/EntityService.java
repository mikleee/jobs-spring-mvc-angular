package com.aimprosoft.jobs.service;

import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.dao.DepartmentDAO;
import com.aimprosoft.jobs.dao.EmployeeDAO;
import com.aimprosoft.jobs.model.PersistEntity;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created on 12/23/13.
 */
public abstract class EntityService<T extends PersistEntity> implements BasicService<T> {

    @Autowired
    protected ModelValidator validator;

    @Autowired
    protected DepartmentDAO departmentDAO;
    @Autowired
    protected EmployeeDAO employeeDAO;

    public abstract T selectByUniqueIdentifier(String uniqueIdentifier) throws DataSourceException;

}
