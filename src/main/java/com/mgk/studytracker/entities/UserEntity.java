package com.mgk.studytracker.entities;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "email")
public class UserEntity {
    private Long id;
    private String email;
    private String password;
    private String name;
    private String profileImage;
    private Integer studyGoalHours;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isAdmin;
    private boolean isDeleted;
    private boolean isSuspended;

//    // 프로필 이미지 URL 생성
//    public String getProfileImageUrl() {
//        if (profileImage != null && !profileImage.isEmpty()) {
//            return "/uploads/profiles/" + profileImage;
//        }
//        return "/static/images/default-avatar.png";
//    }
//
//    // 이름의 첫 글자 반환 (아바타용)
//    public String getInitial() {
//        if (name != null && !name.isEmpty()) {
//            return name.substring(0, 1).toUpperCase();
//        }
//        return "U";
//    }
//
//    // 학습 목표 시간이 설정되어 있는지 확인
//    public boolean hasStudyGoal() {
//        return studyGoalHours != null && studyGoalHours > 0;
//    }
//
//    // 계정이 활성 상태인지 확인
//    public boolean isActive() {
//        return !isDeleted && !isSuspended;
//    }
}