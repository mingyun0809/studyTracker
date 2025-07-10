//// AuthController.java - 인증 관련 페이지 라우팅
//package com.mgk.studytracker.controllers;
//
//import com.mgk.studytracker.entities.UserEntity;
//import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.http.MediaType;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.SessionAttribute;
//
//@Controller
//@RequestMapping(value = "/auth")
//public class AuthController {
//
//    @RequestMapping(value = "/login", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
//    public String getLogin(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
//                           HttpServletRequest request, Model model) {
//        if (signedUser != null) {
//            return "redirect:/dashboard";
//        }
//        return "auth/login";
//    }
//
//    @RequestMapping(value = "/register", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
//    public String getRegister(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
//                              HttpServletRequest request, Model model) {
//        if (signedUser != null) {
//            return "redirect:/dashboard";
//        }
//        return "auth/register";
//    }
//
//    @RequestMapping(value = "/profile", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
//    public String getProfile(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
//                             Model model) {
//        if (signedUser == null) {
//            return "redirect:/auth/login";
//        }
//        model.addAttribute("user", signedUser);
//        return "auth/profile";
//    }
//}