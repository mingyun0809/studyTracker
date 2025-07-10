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
@RequestMapping(value = "/subjects")
public class SubjectController {

    @RequestMapping(value = "/create", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String getCreate(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
                            Model model) {
        // 임시: 로그인 체크 제거
        if (signedUser == null) {
            signedUser = UserEntity.builder()
                    .id(1L)
                    .email("test@example.com")
                    .name("김학생")
                    .studyGoalHours(6)
                    .isAdmin(false)
                    .isDeleted(false)
                    .isSuspended(false)
                    .build();
        }
        model.addAttribute("user", signedUser);
        return "subject/create";
    }

    @RequestMapping(value = "/edit", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String getEdit(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
                          HttpServletRequest request, Model model) {
        // 임시: 로그인 체크 제거
        if (signedUser == null) {
            signedUser = UserEntity.builder()
                    .id(1L)
                    .email("test@example.com")
                    .name("김학생")
                    .studyGoalHours(6)
                    .isAdmin(false)
                    .isDeleted(false)
                    .isSuspended(false)
                    .build();
        }
        model.addAttribute("user", signedUser);
        return "subject/edit";
    }
}