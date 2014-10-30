package com.aimprosoft.jobs.service.impl;

import com.aimprosoft.jobs.controller.EvilUserDetectedException;
import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.model.impl.Employee;
import com.aimprosoft.jobs.service.EmployeeService;
import com.aimprosoft.jobs.service.ValidationException;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created on 17.12.13.
 */
@Component("employeeServiceImpl")
public class EmployeeServiceImpl extends EmployeeService {

    @Override
    public List<Employee> getAllInDepartment(Integer depId) throws DataSourceException, EvilUserDetectedException {
        if (depId == null || !departmentDAO.isExist(depId))
            throw new EvilUserDetectedException("Evil user go home! (attempting do view employees list of non existing department)");
        try {
            return employeeDAO.getAllInDepartment(depId);
        } catch (DataSourceException e) {
            throw new DataSourceException(GET_EMP_LIST_ERROR);
        }
    }

    @Override
    public void add(Employee employee) throws DataSourceException, ValidationException {
        try {
            validator.validate(employee);
            employeeDAO.add(employee);
        } catch (DataSourceException e) {
            throw new DataSourceException(PUT_EMP_ERROR);
        }
    }

    @Override
    public void delete(Integer empId) throws DataSourceException, EvilUserDetectedException {
        try {
            if (empId == null || !employeeDAO.isExist(empId)) {
                throw new EvilUserDetectedException("Evil user go home! (attempting do delete non existing employee)");
            }
            employeeDAO.delete(empId);
        } catch (DataSourceException e) {
            throw new DataSourceException(REMOVE_EMP_ERROR);
        }
    }

    @Override
    public void update(Employee employee) throws DataSourceException, ValidationException, EvilUserDetectedException {
        try {

            if (!employeeDAO.isExist(employee.getId())) {
                throw new EvilUserDetectedException("Evil user go home! (attempting do update non existing employee)");
            }
            if (!departmentDAO.isExist(employee.getDepartment().getId())) {
                throw new EvilUserDetectedException("Evil user go home! (attempting do put employee into non existing department)");
            }

            validator.validate(employee);
            employeeDAO.edit(employee);
        } catch (DataSourceException e) {
            throw new DataSourceException(UPDATE_EMP_ERROR);
        }
    }

    @Override
    public Employee selectByUniqueIdentifier(String email) throws DataSourceException {
        try {
            return employeeDAO.selectByUniqueIdentifier(email);
        } catch (DataSourceException e) {
            throw new DataSourceException(GET_EMP_ERROR);
        }
    }

    @Override
    public Employee getOne(Integer id) throws DataSourceException, EvilUserDetectedException {
        try {
            Employee employee = employeeDAO.selectById(id);
            if (employee == null) {
                throw new EvilUserDetectedException("Evil user go home! (attempting to invoke non existing employee)");
            } else {
                return employee;
            }
        } catch (DataSourceException e) {
            throw new DataSourceException(GET_EMP_ERROR);
        }


    }

}
