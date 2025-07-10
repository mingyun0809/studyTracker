package com.mgk.studytracker.controllers;

import com.mgk.studytracker.entities.UserEntity;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttribute;

@Controller
@RequestMapping(value = "/plans")
public class StudyPlanController {

    @RequestMapping(value = "/create", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String getCreate(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
                            Model model) {
        if (signedUser == null) {
            return "redirect:/auth/login";
        }
        model.addAttribute("user", signedUser);
        return "plan/create";
    }

    @RequestMapping(value = "/edit", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String getEdit(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
                          HttpServletRequest request, Model model) {
        if (signedUser == null) {
            return "redirect:/auth/login";
        }
        model.addAttribute("user", signedUser);
        return "plan/edit";
    }

    @RequestMapping(value = "/calendar", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String getCalendar(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
                              Model model) {
        if (signedUser == null) {
            return "redirect:/auth/login";
        }
        model.addAttribute("user", signedUser);
        return "plan/calendar";
    }
}