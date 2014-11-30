package com.aimprosoft.jobs.service;

import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.model.impl.Department;

import java.util.List;

/**
 * Created on 12/23/13.
 */
public abstract class DepartmentService extends EntityService<Department> {

    protected static final String GET_DEP_LIST_ERROR = "DATA SOURCE ERROR (get department list failed)";
    protected static final String GET_DEP_ERROR = "DATA SOURCE ERROR (get department failed)";
    protected static final String PUT_DEP_ERROR = "DATA SOURCE ERROR (put department failed)";
    protected static final String REMOVE_DEP_ERROR = "DATA SOURCE ERROR (remove department failed)";
    protected static final String UPDATE_DEP_ERROR = "DATA SOURCE ERROR (update department failed)";

    public abstract List<Department> getAll() throws DataSourceException;

    public abstract void deleteAll() throws DataSourceException;

    public abstract List<Department> populate(int depCount, int empCount) throws DataSourceException;

}
