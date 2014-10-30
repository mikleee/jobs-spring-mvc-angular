package com.aimprosoft.jobs.service.impl;

import com.aimprosoft.jobs.controller.EvilUserDetectedException;
import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.model.impl.Department;
import com.aimprosoft.jobs.service.DepartmentService;
import com.aimprosoft.jobs.service.ValidationException;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created on 17.12.13.
 */
@Component("departmentServiceImpl")
public class DepartmentServiceImpl extends DepartmentService {

    @Override
    public List<Department> getAll() throws DataSourceException {
        try {
            return departmentDAO.getAll();
        } catch (DataSourceException e) {
            throw new DataSourceException(GET_DEP_LIST_ERROR);
        }
    }

    @Override
    public void add(Department department) throws DataSourceException, ValidationException {
        try {
            validator.validate(department);
            departmentDAO.add(department);
        } catch (DataSourceException e) {
            throw new DataSourceException(PUT_DEP_ERROR);
        }
    }

    @Override
    public void delete(Integer depId) throws DataSourceException, EvilUserDetectedException {
        try {
            if (depId == null || (!departmentDAO.isExist(depId))) {
                throw new EvilUserDetectedException("Evil user go home! (attempting do delete non existing department)");
            }
            departmentDAO.delete(depId);
        } catch (DataSourceException e) {
            throw new DataSourceException(REMOVE_DEP_ERROR);
        }
    }

    @Override
    public void update(Department department) throws DataSourceException, ValidationException, EvilUserDetectedException {
        try {
            if (!departmentDAO.isExist(department.getId())) {
                throw new EvilUserDetectedException("Evil user go home! (attempting do update non existing department)");
            }
            validator.validate(department);
            departmentDAO.edit(department);
        } catch (DataSourceException e) {
            throw new DataSourceException(UPDATE_DEP_ERROR);
        }
    }

    @Override
    public Department selectByUniqueIdentifier(String name) throws DataSourceException {
        try {
            return departmentDAO.selectByUniqueIdentifier(name);
        } catch (DataSourceException e) {
            throw new DataSourceException(GET_DEP_ERROR);
        }
    }

    @Override
    public Department getOne(Integer id) throws DataSourceException, EvilUserDetectedException {
        try {
            Department department = departmentDAO.selectById(id);
            if (department == null) {
                throw new EvilUserDetectedException("Evil user go home! (attempting to invoke non existing department)");
            }
            return department;
        } catch (DataSourceException e) {
            throw new DataSourceException(GET_DEP_ERROR);
        }
    }

}
