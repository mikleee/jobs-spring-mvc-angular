package com.aimprosoft.jobs.dao;

import com.aimprosoft.jobs.model.impl.Department;

import java.util.List;

/**
 * Created on 12/19/13.
 */
public abstract class DepartmentDAO extends EntityDAO<Department> {

    public abstract List<Department> getAll() throws DataSourceException;

}
