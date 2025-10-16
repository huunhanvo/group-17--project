// utils/roleUtils.js

// Role hierarchy levels
export const ROLES = {
    USER: 'user',
    MODERATOR: 'moderator',
    ADMIN: 'admin'
};

// Role hierarchy (higher number = more permissions)
export const ROLE_HIERARCHY = {
    [ROLES.USER]: 1,
    [ROLES.MODERATOR]: 2,
    [ROLES.ADMIN]: 3
};

// Role display names with icons
export const ROLE_DISPLAY = {
    [ROLES.USER]: { name: 'User', icon: '👤', color: '#2196F3' },
    [ROLES.MODERATOR]: { name: 'Moderator', icon: '⭐', color: '#FF9800' },
    [ROLES.ADMIN]: { name: 'Admin', icon: '👑', color: '#9C27B0' }
};

/**
 * Check if user has specific role
 * @param {string} userRole - User's current role
 * @param {string} requiredRole - Required role to check
 * @returns {boolean}
 */
export const hasRole = (userRole, requiredRole) => {
    return userRole === requiredRole;
};

/**
 * Check if user has minimum role level (equal or higher)
 * @param {string} userRole - User's current role
 * @param {string} minRole - Minimum required role
 * @returns {boolean}
 */
export const hasMinRole = (userRole, minRole) => {
    const userLevel = ROLE_HIERARCHY[userRole] || 0;
    const minLevel = ROLE_HIERARCHY[minRole] || 0;
    return userLevel >= minLevel;
};

/**
 * Check if user has any of the specified roles
 * @param {string} userRole - User's current role
 * @param {string[]} allowedRoles - Array of allowed roles
 * @returns {boolean}
 */
export const hasAnyRole = (userRole, allowedRoles) => {
    return allowedRoles.includes(userRole);
};

/**
 * Get role display information
 * @param {string} role - Role to get display info for
 * @returns {object} - { name, icon, color }
 */
export const getRoleDisplay = (role) => {
    return ROLE_DISPLAY[role] || { name: 'Unknown', icon: '❓', color: '#666' };
};

/**
 * Check if user can manage another user based on roles
 * @param {string} currentUserRole - Current user's role
 * @param {string} targetUserRole - Target user's role
 * @returns {boolean}
 */
export const canManageUser = (currentUserRole, targetUserRole) => {
    // Admin can manage everyone except other admins
    if (currentUserRole === ROLES.ADMIN) {
        return targetUserRole !== ROLES.ADMIN;
    }

    // Moderator can manage users only
    if (currentUserRole === ROLES.MODERATOR) {
        return targetUserRole === ROLES.USER;
    }

    // Users can't manage anyone
    return false;
};

/**
 * Get available roles that current user can assign
 * @param {string} currentUserRole - Current user's role
 * @returns {string[]}
 */
export const getAssignableRoles = (currentUserRole) => {
    switch (currentUserRole) {
        case ROLES.ADMIN:
            return [ROLES.USER, ROLES.MODERATOR]; // Admin can assign user/moderator
        case ROLES.MODERATOR:
            return [ROLES.USER]; // Moderator can only assign user
        default:
            return []; // Users can't assign roles
    }
};

/**
 * Check permissions for specific actions
 */
export const PERMISSIONS = {
    // User management
    VIEW_USERS: [ROLES.MODERATOR, ROLES.ADMIN],
    CREATE_USER: [ROLES.ADMIN],
    EDIT_USER: [ROLES.ADMIN],
    DELETE_USER: [ROLES.ADMIN],
    CHANGE_USER_ROLE: [ROLES.ADMIN],

    // Admin panel
    VIEW_ADMIN_PANEL: [ROLES.ADMIN],
    VIEW_MODERATOR_PANEL: [ROLES.MODERATOR, ROLES.ADMIN],

    // System settings
    VIEW_SYSTEM_STATS: [ROLES.ADMIN],
    MANAGE_SYSTEM: [ROLES.ADMIN],

    // Content moderation
    MODERATE_CONTENT: [ROLES.MODERATOR, ROLES.ADMIN],
    VIEW_REPORTS: [ROLES.MODERATOR, ROLES.ADMIN]
};

/**
 * Check if user has permission for specific action
 * @param {string} userRole - User's current role
 * @param {string} permission - Permission key from PERMISSIONS
 * @returns {boolean}
 */
export const hasPermission = (userRole, permission) => {
    const allowedRoles = PERMISSIONS[permission];
    return allowedRoles ? allowedRoles.includes(userRole) : false;
};