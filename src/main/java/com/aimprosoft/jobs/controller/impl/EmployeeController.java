package com.aimprosoft.jobs.controller.impl;

import com.aimprosoft.jobs.controller.EvilUserDetectedException;
import com.aimprosoft.jobs.controller.GenericController;
import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.model.impl.Department;
import com.aimprosoft.jobs.model.impl.Employee;
import com.aimprosoft.jobs.service.ValidationException;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
import java.util.*;


@Controller("employeeControllerMVC")
public class EmployeeController extends GenericController {


    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, false));
    }


    /**
     * Shows list of employees in the department
     */
    @RequestMapping(value = "/depEmpList", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> showEmployeeList(@RequestParam(required = false) Integer depId) throws EvilUserDetectedException, DataSourceException {
        Map<String, Object> result = new HashMap<>();
        result.put("department", departmentService.getOne(depId));
        result.put("employees", employeeService.getAllInDepartment(depId));
        return result;
    }


    /**
     * Deletes employee and redirects request to show list of employees in the department
     */
    @RequestMapping(value = "/empDelete", method = RequestMethod.POST)
    @ResponseBody
    public Integer deleteEmployee(@RequestParam(required = false) Integer empId) throws DataSourceException, EvilUserDetectedException {
        employeeService.delete(empId);
        return empId;
    }


    /**
     * Shows "employee for edit" form, where text fields are filled by corresponding fields of employee for
     * add or edit
     */
    @RequestMapping(value = "/empAddOrUpdate.html", method = RequestMethod.GET)
    public ModelAndView showAddEmployeeForm(@RequestParam(required = false) Integer depId,
                                            @RequestParam(required = false) Integer empId, ModelMap map) throws EvilUserDetectedException, DataSourceException {
        if (map.containsKey("incorrectEmployee")) {
            map.put("employeeForAddOrUpdate", map.get("incorrectEmployee"));
        } else {
            map.put("employeeForAddOrUpdate", empId == null ? new Employee() : employeeService.getOne(empId));
        }
        map.put("currentDepartment", departmentService.getOne(depId));
        map.put("employees", employeeService.getAllInDepartment(depId));
        return new ModelAndView("AddOrUpdateEmployee", map);
    }


    /**
     * Executes employee adding or updating and redirects request to show list of employees in the department
     */
    @RequestMapping(value = "/doEmpAddOrUpdate", method = RequestMethod.POST)
    @ResponseBody
    public Employee addOrUpdateEmployee(@ModelAttribute Employee employee,
                                            @RequestParam Integer departmentId) throws DataSourceException, ValidationException, EvilUserDetectedException {
        employee.setDepartment(new Department(departmentId));
        if (employee.getId() == null) {
            employeeService.add(employee);
        } else {
            employeeService.update(employee);
        }
        return employee;
    }


    /**
     * Shows "employee for edit" form, where text fields are filled by corresponding fields of employee with
     * not valid data
     */
    @ExceptionHandler(ValidationException.class)
    public ModelAndView validationExceptionHandler(ValidationException e) throws DataSourceException, EvilUserDetectedException {
        ModelMap map = new ModelMap();
        map.put("errors", e.getMessenger());
        map.put("incorrectEmployee", e.getIncorrectEntity());
        Integer depId = ((Employee) e.getIncorrectEntity()).getDepartment().getId();
        return showAddEmployeeForm(depId, null, map);
    }


}
