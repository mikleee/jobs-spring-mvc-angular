package com.aimprosoft.jobs.controller.impl;

import com.aimprosoft.jobs.controller.EvilUserDetectedException;
import com.aimprosoft.jobs.controller.GenericController;
import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.model.impl.Department;
import com.aimprosoft.jobs.service.ValidationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@Controller
public class DepartmentsController extends GenericController {


    /**
     * Shows list of departments
     */
    @RequestMapping(value = "/depList", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Department> showDepartmentList() throws DataSourceException {
        return departmentService.getAll();
    }


    /**
     * Deletes department and redirects request to show departments list
     */
    @RequestMapping(value = "/depDelete", method = RequestMethod.POST)
    @ResponseBody
    public Integer deleteDepartment(@RequestParam(required = false) Integer depId) throws DataSourceException, EvilUserDetectedException {
        departmentService.delete(depId);
        return depId;
    }


    /**
     * Shows "department for edit" form, where text fields are filled by corresponding fields of department for
     * add or edit
     */
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


    /**
     * Executes department adding or updating and redirects request to show departments list
     */
    @RequestMapping(value = "/doDepAddOrUpdate", method = RequestMethod.POST)
    @ResponseBody
    public Department addOrUpdateDepartment(@ModelAttribute Department department) throws DataSourceException, EvilUserDetectedException, ValidationException {
        if (department.getId() == null) {
            departmentService.add(department);
        } else {
            departmentService.update(department);
        }
        return department;
    }


    /**
     * Shows "department for edit" form, where text fields are filled by corresponding fields of department with
     * not valid data
     */
    @ExceptionHandler(ValidationException.class)
    public ModelAndView validationExceptionHandler(ValidationException e) throws DataSourceException, EvilUserDetectedException {
        ModelMap map = new ModelMap();
        map.put("errors", e.getMessenger());
        map.put("incorrectDepartment", e.getIncorrectEntity());
        return showAddDepartmentForm(null, map);
    }


}
