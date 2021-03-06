package com.aimprosoft.jobs.controller.impl;

import com.aimprosoft.jobs.controller.EvilUserDetectedException;
import com.aimprosoft.jobs.controller.GenericController;
import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.model.impl.Department;
import com.aimprosoft.jobs.model.impl.Employee;
import com.aimprosoft.jobs.service.ValidationException;
import com.aimprosoft.jobs.util.RandomObjectCreator;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.*;


@Controller
public class DepartmentsController extends GenericController {

    @RequestMapping(value = "/populate", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public List<Department> populate() throws DataSourceException, ValidationException {
        logger.trace("/populate request");
        return departmentService.populate(5, 15);
    }

    @RequestMapping(value = "/depList", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Department> showDepartmentList() throws DataSourceException {
        logger.trace("/depList request");
        return departmentService.getAll();
    }


    @RequestMapping(value = "/depDelete", consumes = "application/json", method = RequestMethod.POST)
    @ResponseBody
    public List<Department> deleteDepartment(@RequestBody Department department) throws DataSourceException, EvilUserDetectedException {
        logger.trace("/depDelete request");
        departmentService.delete(department.getId());
        return departmentService.getAll();
    }

    @RequestMapping(value = "/deleteAllDepartments", method = RequestMethod.POST)
    @ResponseBody
    public void deleteAll() throws DataSourceException, EvilUserDetectedException {
        logger.trace("/deleteAllDepartments request");
        departmentService.deleteAll();
    }


    @RequestMapping(value = "/depAddOrUpdate", method = RequestMethod.GET)
    public ModelAndView showAddDepartmentForm(@RequestParam(required = false) Integer depId, ModelMap map) throws EvilUserDetectedException, DataSourceException {
        if (map.containsKey("incorrectDepartment")) {
            map.put("departmentForAddOrEdit", map.get("incorrectDepartment"));
        } else {
            map.put("departmentForAddOrEdit", depId == null ? new Department() : departmentService.getOne(depId));
        }
        map.put("departments", departmentService.getAll());
        return new ModelAndView("AddOrUpdateDepartment", map);

    }

    @RequestMapping(value = "/persistDepartment", consumes = "application/json", method = RequestMethod.POST)
    @ResponseBody
    public List<Department> addOrUpdateDepartment(@RequestBody Department department, HttpServletRequest request) throws DataSourceException, EvilUserDetectedException, ValidationException {
        logger.trace("/persistDepartment request");
        department.setEmployeeList(new ArrayList<Employee>());

        if (department.getId() == null) {
            departmentService.add(department);
        } else {
            departmentService.update(department);
        }

        return departmentService.getAll();
    }


    @ExceptionHandler(ValidationException.class)
    @ResponseBody
    public Map<String, Object> validationExceptionHandler(ValidationException e) throws DataSourceException, EvilUserDetectedException {
        Map<String, Object> result = new HashMap<>();
        result.put("status", "validation-error");
        result.put("serverMessages", e.getMessenger());
        return result;

    }


}
