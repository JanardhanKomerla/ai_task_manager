package com.janardhan.ai_task_manager.ai;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

@Service
public class AiService {

    public String suggestPriority(String taskTitle) {

        if (taskTitle == null) return "LOW";

        String title = taskTitle.toLowerCase(Locale.ROOT);
        int score = 0;

        List<String> highSignals = List.of(
                "urgent", "asap", "immediately", "immediate", "critical",
                "deadline", "submit", "submission", "exam", "interview",
                "production", "outage", "client", "payment", "invoice", "tax"
        );

        List<String> mediumSignals = List.of(
                "important", "project", "review", "meeting", "presentation",
                "update", "follow up", "follow-up", "today", "tomorrow", "soon",
                "assignment", "report", "study", "prepare", "practice",
                 "earing",
                "eating", "eatting", "eting"
        );

        for (String word : highSignals) {
            if (title.contains(word)) score += 2;
        }

        for (String word : mediumSignals) {
            if (title.contains(word)) score += 1;
        }

        if (score >= 3) return "HIGH";
        if (score >= 1) return "MEDIUM";
        return "LOW";
    }

    public String suggestCategory(String taskTitle) {

        if (taskTitle == null) return "GENERAL";

        String title = taskTitle.toLowerCase(Locale.ROOT);

        if (title.contains("project") || title.contains("code")) {
            return "WORK";
        }

        if (title.contains("gym") || title.contains("health")) {
            return "PERSONAL";
        }

        if (title.contains("bill") || title.contains("payment")) {
            return "FINANCE";
        }

        return "GENERAL";
    }

    public LocalDateTime suggestDueDate(String taskTitle) {

        String priority = suggestPriority(taskTitle);

        if (priority.equals("HIGH")) {
            return LocalDateTime.now().plusDays(1);
        }

        if (priority.equals("MEDIUM")) {
            return LocalDateTime.now().plusDays(3);
        }

        return LocalDateTime.now().plusDays(7);
    }

    public String generateDescription(String title) {
        return "Auto-generated description for task: " + title;
    }
}
