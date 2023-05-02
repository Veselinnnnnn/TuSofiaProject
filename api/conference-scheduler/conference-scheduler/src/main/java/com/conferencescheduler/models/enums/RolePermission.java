package com.conferencescheduler.models.enums;

public enum RolePermission {
    READ("read");

    private final String permission;

    RolePermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
