package com.arzan.MSMS.response;

public class loginResponse {
    private int authentication;
    private String username;
    private String name;
    private Boolean level;

    public int getAuthentication() {
        return authentication;
    }

    public void setAuthentication(int authentication) {
        this.authentication = authentication;
    }

    public Boolean getLevel() {
        return level;
    }

    public void setLevel(Boolean level) {
        this.level = level;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return this.username;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public loginResponse(int authentication, String username, String name, Boolean level) {
        this.authentication = authentication;
        this.username = username;
        this.name = name;
        this.level = level;
    }
    public loginResponse(){}
}
