package com.aimprosoft.jobs.controller.impl;

import com.aimprosoft.jobs.controller.GenericController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping
public class GoToStartPage extends GenericController {

    @RequestMapping(method = RequestMethod.GET)
    public String showView() {
        return "AngularStartPage";
    }

}
