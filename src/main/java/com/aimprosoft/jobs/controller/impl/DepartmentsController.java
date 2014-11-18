package com.aimprosoft.jobs.controller.impl;

import com.aimprosoft.jobs.controller.EvilUserDetectedException;
import com.aimprosoft.jobs.controller.GenericController;
import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.model.impl.Department;
import com.aimprosoft.jobs.model.impl.Employee;
import com.aimprosoft.jobs.service.ValidationException;
import com.aimprosoft.jobs.util.RandomObjectCreator;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@Controller
public class DepartmentsController extends GenericController {

    @RequestMapping(value = "/populate", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public List<Department> populate() throws DataSourceException, ValidationException {

        for (int i = 0; i < 5; i++) {
            departmentService.add(RandomObjectCreator.createRandomObject(new Department(), null));
        }

        List<Department> departments = departmentService.getAll();

//        for (int i = 0; i < 5; i++) {
//            Integer depId = departments.get(RandomObjectCreator.randomNumber(departments.size())).getId();
//
//            Employee employee = RandomObjectCreator.createRandomObject(new Employee(), null);
//            employee.setDepartment(new Department(depId));
//
//            employeeService.add(employee);
//        }

        return null;
    }

    @RequestMapping(value = "/depList", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Department> showDepartmentList() throws DataSourceException {
        return departmentService.getAll();
    }


    @RequestMapping(value = "/depDelete", method = RequestMethod.POST)
    @ResponseBody
    public Integer deleteDepartment(@RequestParam(required = false) Integer depId) throws DataSourceException, EvilUserDetectedException {
        departmentService.delete(depId);
        return depId;
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


    @ExceptionHandler(ValidationException.class)
    public ModelAndView validationExceptionHandler(ValidationException e) throws DataSourceException, EvilUserDetectedException {
        ModelMap map = new ModelMap();
        map.put("errors", e.getMessenger());
        map.put("incorrectDepartment", e.getIncorrectEntity());
        return showAddDepartmentForm(null, map);
    }


}
