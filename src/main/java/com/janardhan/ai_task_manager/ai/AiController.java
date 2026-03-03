package com.janardhan.ai_task_manager.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

   
@PostMapping("/suggest-priority")
public ResponseEntity<Map<String, String>> suggestPriority(
        @RequestBody Map<String, String> request) {

    String title = request.get("title");

    if (title == null || title.isBlank()) {
        return ResponseEntity.badRequest()
                .body(Map.of("result", "Task title is required"));
    }

    String result = aiService.suggestPriority(title);

    return ResponseEntity.ok(Map.of("result", result));
  
}
}