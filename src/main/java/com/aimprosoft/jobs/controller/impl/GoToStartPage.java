package com.aimprosoft.jobs.controller.impl;

import com.aimprosoft.jobs.controller.GenericController;
import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.model.impl.Department;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping
public class GoToStartPage extends GenericController {

    @RequestMapping(method = RequestMethod.GET)
    public String showView() {
        return "AngularStartPage";
    }


}
