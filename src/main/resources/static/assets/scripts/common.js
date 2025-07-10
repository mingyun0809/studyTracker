// common.js - StudyTracker 공통 JavaScript 함수들

// 네비게이션 활성화
document.addEventListener('DOMContentLoaded', function() {
    // 현재 경로에 따른 네비게이션 활성화
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');

        // 정확한 경로 매칭 또는 하위 경로 매칭
        if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
            link.classList.add('active');
        }
    });

    // 대시보드가 기본 경로인 경우
    if (currentPath === '/' || currentPath === '/dashboard') {
        const dashboardLink = document.querySelector('a[href="/dashboard"]');
        if (dashboardLink) {
            dashboardLink.classList.add('active');
        }
    }
});

// 유틸리티 함수들
const Utils = {
    // 시간 포맷팅 (분을 시간:분 형태로)
    formatTime: function(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}시간 ${mins}분`;
        }
        return `${mins}분`;
    },

    // 날짜 포맷팅
    formatDate: function(date, format = 'YYYY-MM-DD') {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');

        switch(format) {
            case 'YYYY-MM-DD':
                return `${year}-${month}-${day}`;
            case 'YYYY.MM.DD':
                return `${year}.${month}.${day}`;
            case 'MM/DD':
                return `${month}/${day}`;
            case 'Korean':
                return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
            default:
                return `${year}-${month}-${day}`;
        }
    },

    // 상대 시간 표시 (예: "2시간 전")
    getRelativeTime: function(date) {
        const now = new Date();
        const target = new Date(date);
        const diffMs = now - target;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return '방금 전';
        if (diffMins < 60) return `${diffMins}분 전`;
        if (diffHours < 24) return `${diffHours}시간 전`;
        if (diffDays < 7) return `${diffDays}일 전`;

        return this.formatDate(date, 'YYYY.MM.DD');
    },

    // 숫자에 천단위 콤마 추가
    addCommas: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    // 백분율 계산
    calculatePercentage: function(value, total) {
        if (total === 0) return 0;
        return Math.round((value / total) * 100);
    },

    // 색상 헥스코드를 RGB로 변환
    hexToRgb: function(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },

    // 디바운스 함수
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 로컬 스토리지 헬퍼
    storage: {
        get: function(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.error('Storage get error:', e);
                return defaultValue;
            }
        },

        set: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('Storage set error:', e);
                return false;
            }
        },

        remove: function(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('Storage remove error:', e);
                return false;
            }
        }
    }
};

// 알림 시스템
const Notification = {
    show: function(message, type = 'info', duration = 3000) {
        // 기존 알림 제거
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // 새 알림 생성
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // 스타일 추가
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 9999;
                    padding: 15px 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    animation: slideInRight 0.3s ease;
                    max-width: 400px;
                }
                
                .notification-info {
                    background: #eff6ff;
                    border-left: 4px solid #3b82f6;
                    color: #1e40af;
                }
                
                .notification-success {
                    background: #f0fdf4;
                    border-left: 4px solid #22c55e;
                    color: #166534;
                }
                
                .notification-warning {
                    background: #fffbeb;
                    border-left: 4px solid #f59e0b;
                    color: #92400e;
                }
                
                .notification-error {
                    background: #fef2f2;
                    border-left: 4px solid #ef4444;
                    color: #991b1b;
                }
                
                .notification-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 15px;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    cursor: pointer;
                    opacity: 0.7;
                    transition: opacity 0.3s ease;
                }
                
                .notification-close:hover {
                    opacity: 1;
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // DOM에 추가
        document.body.appendChild(notification);

        // 자동 제거
        if (duration > 0) {
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.style.animation = 'slideInRight 0.3s ease reverse';
                    setTimeout(() => notification.remove(), 300);
                }
            }, duration);
        }
    },

    success: function(message, duration = 3000) {
        this.show(message, 'success', duration);
    },

    error: function(message, duration = 5000) {
        this.show(message, 'error', duration);
    },

    warning: function(message, duration = 4000) {
        this.show(message, 'warning', duration);
    },

    info: function(message, duration = 3000) {
        this.show(message, 'info', duration);
    }
};

// 로딩 스피너
const Loading = {
    show: function(target = document.body) {
        const loading = document.createElement('div');
        loading.className = 'loading-overlay';
        loading.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <span>로딩 중...</span>
            </div>
        `;

        // 스타일 추가
        if (!document.querySelector('#loading-styles')) {
            const style = document.createElement('style');
            style.id = 'loading-styles';
            style.textContent = `
                .loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9998;
                }
                
                .loading-spinner {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                    color: #667eea;
                    font-size: 1.1rem;
                    font-weight: 500;
                }
                
                .loading-spinner i {
                    font-size: 2rem;
                }
            `;
            document.head.appendChild(style);
        }

        target.appendChild(loading);
        return loading;
    },

    hide: function(loadingElement) {
        if (loadingElement && loadingElement.parentElement) {
            loadingElement.remove();
        }
    }
};

// 확인 대화상자
const Confirm = {
    show: function(message, onConfirm, onCancel = null) {
        const overlay = document.createElement('div');
        overlay.className = 'confirm-overlay';
        overlay.innerHTML = `
            <div class="confirm-dialog">
                <div class="confirm-content">
                    <i class="fas fa-question-circle confirm-icon"></i>
                    <p class="confirm-message">${message}</p>
                </div>
                <div class="confirm-actions">
                    <button class="btn btn-secondary confirm-cancel">취소</button>
                    <button class="btn btn-danger confirm-ok">확인</button>
                </div>
            </div>
        `;

        // 스타일 추가
        if (!document.querySelector('#confirm-styles')) {
            const style = document.createElement('style');
            style.id = 'confirm-styles';
            style.textContent = `
                .confirm-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }
                
                .confirm-dialog {
                    background: white;
                    border-radius: 10px;
                    padding: 30px;
                    max-width: 400px;
                    width: 90%;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                }
                
                .confirm-content {
                    text-align: center;
                    margin-bottom: 25px;
                }
                
                .confirm-icon {
                    font-size: 3rem;
                    color: #f59e0b;
                    margin-bottom: 15px;
                }
                
                .confirm-message {
                    font-size: 1.1rem;
                    line-height: 1.5;
                    color: #1e293b;
                }
                
                .confirm-actions {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                }
            `;
            document.head.appendChild(style);
        }

        // 이벤트 리스너
        const cancelBtn = overlay.querySelector('.confirm-cancel');
        const okBtn = overlay.querySelector('.confirm-ok');

        cancelBtn.addEventListener('click', () => {
            overlay.remove();
            if (onCancel) onCancel();
        });

        okBtn.addEventListener('click', () => {
            overlay.remove();
            if (onConfirm) onConfirm();
        });

        // 배경 클릭으로 닫기
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
                if (onCancel) onCancel();
            }
        });

        document.body.appendChild(overlay);
    }
};

// 폼 검증 헬퍼
const FormValidator = {
    rules: {
        required: (value) => value && value.trim() !== '',
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        minLength: (value, min) => value && value.length >= min,
        maxLength: (value, max) => value && value.length <= max,
        number: (value) => !isNaN(value) && isFinite(value),
        positiveNumber: (value) => !isNaN(value) && isFinite(value) && value > 0
    },

    validate: function(form, rules) {
        const errors = {};

        for (const [fieldName, fieldRules] of Object.entries(rules)) {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (!field) continue;

            const value = field.value;

            for (const rule of fieldRules) {
                let isValid = false;
                let errorMessage = '';

                if (typeof rule === 'string') {
                    isValid = this.rules[rule](value);
                    errorMessage = this.getErrorMessage(rule);
                } else if (typeof rule === 'object') {
                    const [ruleName, param] = Object.entries(rule)[0];
                    isValid = this.rules[ruleName](value, param);
                    errorMessage = this.getErrorMessage(ruleName, param);
                }

                if (!isValid) {
                    errors[fieldName] = errorMessage;
                    break;
                }
            }
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    },

    getErrorMessage: function(rule, param = null) {
        const messages = {
            required: '필수 입력 항목입니다.',
            email: '올바른 이메일 형식이 아닙니다.',
            minLength: `최소 ${param}자 이상 입력해주세요.`,
            maxLength: `최대 ${param}자까지 입력 가능합니다.`,
            number: '숫자만 입력 가능합니다.',
            positiveNumber: '0보다 큰 숫자를 입력해주세요.'
        };

        return messages[rule] || '입력값이 올바르지 않습니다.';
    },

    showErrors: function(form, errors) {
        // 기존 에러 메시지 제거
        form.querySelectorAll('.field-error').forEach(error => error.remove());

        // 새 에러 메시지 표시
        for (const [fieldName, message] of Object.entries(errors)) {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                const errorElement = document.createElement('div');
                errorElement.className = 'field-error';
                errorElement.textContent = message;
                errorElement.style.cssText = `
                    color: #ef4444;
                    font-size: 0.8rem;
                    margin-top: 5px;
                `;

                field.parentElement.appendChild(errorElement);
                field.classList.add('error');
            }
        }
    },

    clearErrors: function(form) {
        form.querySelectorAll('.field-error').forEach(error => error.remove());
        form.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    }
};

// 전역 이벤트 리스너
document.addEventListener('DOMContentLoaded', function() {
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                const closeBtn = modal.querySelector('.close-btn');
                if (closeBtn) closeBtn.click();
            });
        }
    });

    // 모달 배경 클릭으로 닫기
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal') && e.target.classList.contains('show')) {
            const closeBtn = e.target.querySelector('.close-btn');
            if (closeBtn) closeBtn.click();
        }
    });
});

// 전역 객체로 노출
window.Utils = Utils;
window.Notification = Notification;
window.Loading = Loading;
window.Confirm = Confirm;
window.FormValidator = FormValidator;