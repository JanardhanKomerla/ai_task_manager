package com.janardhan.ai_task_manager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskStatsResponse {

    private long total;
    private long completed;
    private long highPriority;
    private long mediumPriority;
    private long lowPriority;
}