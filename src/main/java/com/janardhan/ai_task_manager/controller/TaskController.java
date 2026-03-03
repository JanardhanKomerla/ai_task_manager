package com.janardhan.ai_task_manager.controller;

import com.janardhan.ai_task_manager.dto.TaskStatsResponse;
import com.janardhan.ai_task_manager.model.Task;
import com.janardhan.ai_task_manager.model.TaskPriority;
import com.janardhan.ai_task_manager.model.TaskStatus;
import com.janardhan.ai_task_manager.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    // CREATE
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    // GET (Sort / Filter)
    @GetMapping
    public List<Task> getTasks(
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(required = false) TaskPriority priority
    ) {

        if (category != null) {
            return taskService.filterByCategory(category);
        }

        if (status != null) {
            return taskService.filterByStatus(status);
        }

        if (priority != null) {
            return taskService.filterByPriority(priority);
        }

        return taskService.getMyTasks(sortBy);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable String id,
                           @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
    }

    // DASHBOARD STATS
    @GetMapping("/stats")
    public TaskStatsResponse getStats() {
        return taskService.getStats();
    }
}
