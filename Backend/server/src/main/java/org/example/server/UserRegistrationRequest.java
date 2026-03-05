package org.example.server;

public class UserRegistrationRequest {
    private String username;
    private String password;

    // Getters och Setters behövs för att Spring ska kunna läsa JSON-datan
    public String getUsername() { return username; }
    public String getPassword() { return password; }
}