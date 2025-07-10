package com.mgk.studytracker.controllers;

import com.mgk.studytracker.entities.UserEntity;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttribute;

@Controller
@RequestMapping(value = "/dashboard")
public class DashBoardController {

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String getDashboard(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
                               Model model) {
        // 임시: 로그인 체크 제거

        // 더미 사용자 데이터 생성 (UI 테스트용)
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
        return "dashboard/index";
    }

    @RequestMapping(value = "/overview", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String getOverview(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
                              Model model) {
        // 임시: 로그인 체크 제거

        // 더미 사용자 데이터 생성 (UI 테스트용)
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
        return "dashboard/overview";
    }

    @RequestMapping(value = "/quick-start", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public String getQuickStart(@SessionAttribute(value = "signedUser", required = false) UserEntity signedUser,
                                Model model) {
        // 임시: 로그인 체크 제거

        // 더미 사용자 데이터 생성 (UI 테스트용)
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
        return "dashboard/quick-start";
    }
}