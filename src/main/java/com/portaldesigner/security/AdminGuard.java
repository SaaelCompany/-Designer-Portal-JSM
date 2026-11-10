package com.portaldesigner.security;

import com.atlassian.jira.security.GlobalPermissionManager;
import com.atlassian.jira.security.JiraAuthenticationContext;
import com.atlassian.jira.permission.GlobalPermissionKey;
import com.atlassian.jira.user.ApplicationUser;

public final class AdminGuard {
    private AdminGuard() {
    }

    public static ApplicationUser requireAdmin(JiraAuthenticationContext auth, GlobalPermissionManager permissions) {
        ApplicationUser user = auth == null ? null : auth.getLoggedInUser();
        if (user == null || permissions == null) {
            return null;
        }
        if (permissions.hasPermission(GlobalPermissionKey.ADMINISTER, user)
                || permissions.hasPermission(GlobalPermissionKey.SYSTEM_ADMIN, user)) {
            return user;
        }
        return null;
    }

    public static boolean isLoggedIn(JiraAuthenticationContext auth) {
        return auth != null && auth.getLoggedInUser() != null;
    }
}
