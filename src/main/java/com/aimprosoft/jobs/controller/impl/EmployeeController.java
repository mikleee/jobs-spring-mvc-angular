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
import java.util.Date;
import java.util.List;


@Controller("employeeControllerMVC")
public class EmployeeController extends GenericController {


    @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, false));
    }

    @RequestMapping(value = "/empList", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Employee> showEmployeeList(Integer depId) throws EvilUserDetectedException, DataSourceException {
        logger.trace("/empList " + depId + " request");
        return employeeService.getAllInDepartment(depId);
    }

    @RequestMapping(value = "/empDelete", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @ResponseBody
    public List<Employee> deleteEmployee(@RequestBody Employee employee) throws DataSourceException, EvilUserDetectedException {
        employeeService.delete(employee.getId());
        return employeeService.getAllInDepartment(employee.getDepartmentId());
    }

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
