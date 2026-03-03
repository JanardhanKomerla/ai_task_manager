package com.janardhan.ai_task_manager.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tasks")
public class Task {

    @Id
    private String id;

    private String title;

    private String description;

    private TaskStatus status;

    private TaskPriority priority;

    private String category;        

    private LocalDateTime dueDate;   

    private String userEmail;

    private LocalDateTime createdAt;
}