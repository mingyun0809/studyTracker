package com.mgk.studytracker.controllers;

import com.mgk.studytracker.entities.UserEntity;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttribute;

@Controller
@RequestMapping(value = "/")
public class HomeController {

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String getIndex(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
                           HttpServletRequest request, Model model) {
        if (signedUser == null) {
            return "redirect:/auth/login";
        }

        model.addAttribute("user", signedUser);
        return "dashboard/index";
    }

    @RequestMapping(value = "/dashboard", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String getDashboard(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
                               Model model) {
        if (signedUser == null) {
            return "redirect:/auth/login";
        }

        model.addAttribute("user", signedUser);
        return "dashboard/index";
    }

    @RequestMapping(value = "/timer", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String getTimer(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
                           Model model) {
        if (signedUser == null) {
            return "redirect:/auth/login";
        }

        model.addAttribute("user", signedUser);
        return "study/timer";
    }

    @RequestMapping(value = "/subjects", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String getSubjects(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
                              Model model) {
        if (signedUser == null) {
            return "redirect:/auth/login";
        }

        model.addAttribute("user", signedUser);
        return "subject/list";
    }

    @RequestMapping(value = "/plans", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String getPlans(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
                           Model model) {
        if (signedUser == null) {
            return "redirect:/auth/login";
        }

        model.addAttribute("user", signedUser);
        return "plan/list";
    }

    @RequestMapping(value = "/notes", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String getNotes(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
                           Model model) {
        if (signedUser == null) {
            return "redirect:/auth/login";
        }

        model.addAttribute("user", signedUser);
        return "note/list";
    }

    @RequestMapping(value = "/problems", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String getProblems(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
                              Model model) {
        if (signedUser == null) {
            return "redirect:/auth/login";
        }

        model.addAttribute("user", signedUser);
        return "problem/list";
    }

    @RequestMapping(value = "/statistics", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String getStatistics(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
                                Model model) {
        if (signedUser == null) {
            return "redirect:/auth/login";
        }

        model.addAttribute("user", signedUser);
        return "statistics/index";
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String getLogout(HttpSession session) {
        session.setAttribute("signedUser", null);
        return "redirect:/auth/login";
    }
}