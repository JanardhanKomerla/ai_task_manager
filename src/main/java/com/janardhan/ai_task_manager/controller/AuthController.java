package com.janardhan.ai_task_manager.controller;

import com.janardhan.ai_task_manager.dto.LoginRequest;
import com.janardhan.ai_task_manager.dto.RegisterRequest;
import com.janardhan.ai_task_manager.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {

        String token = authService.login(request.getEmail(), request.getPassword());

        return ResponseEntity.ok().body(
                java.util.Map.of("token", token)
        );
    }
}