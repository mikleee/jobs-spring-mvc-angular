package com.aimprosoft.jobs.service.impl;

import com.aimprosoft.jobs.controller.EvilUserDetectedException;
import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.model.impl.Department;
import com.aimprosoft.jobs.model.impl.Employee;
import com.aimprosoft.jobs.service.DepartmentService;
import com.aimprosoft.jobs.service.ValidationException;
import com.aimprosoft.jobs.util.RandomObjectCreator;
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
    public void deleteAll() throws DataSourceException {
        for (Department department : departmentDAO.getAll()) {
            departmentDAO.delete(department.getId());
        }
    }

    @Override
    public List<Department> populate(int depCount, int empCount) throws DataSourceException {

        for (int i = 0; i < depCount; i++) {
            departmentDAO.add(RandomObjectCreator.createRandomObject(new Department(), null));
        }

        List<Department> departments = departmentDAO.getAll();
        departmentDAO.evictCollection(departments);

        for (int i = 0; i < empCount; i++) {
            Integer depId = departments.get(RandomObjectCreator.randomNumber(departments.size() - 1)).getId();
            Employee employee = RandomObjectCreator.createRandomObject(new Employee(), null);
            employee.setDepartment(new Department(depId));
            employeeDAO.add(employee);
        }

        return departmentDAO.getAll();
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
