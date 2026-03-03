package com.janardhan.ai_task_manager.service;

import com.janardhan.ai_task_manager.ai.AiService;
import com.janardhan.ai_task_manager.dto.TaskStatsResponse;
import com.janardhan.ai_task_manager.exception.AccessDeniedException;
import com.janardhan.ai_task_manager.exception.TaskNotFoundException;
import com.janardhan.ai_task_manager.model.Task;
import com.janardhan.ai_task_manager.model.TaskPriority;
import com.janardhan.ai_task_manager.model.TaskStatus;
import com.janardhan.ai_task_manager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final AiService aiService;

    // ===================== CREATE =====================
    public Task createTask(Task task) {

        String userEmail = getLoggedInUserEmail();

        String priorityText = aiService.suggestPriority(task.getTitle());

        TaskPriority priority;

        try {
            priority = TaskPriority.valueOf(priorityText);
        } catch (Exception e) {
            priority = TaskPriority.LOW;
        }

        task.setUserEmail(userEmail);
        task.setCreatedAt(LocalDateTime.now());
        task.setStatus(TaskStatus.TODO);
        task.setPriority(priority);

        task.setCategory(aiService.suggestCategory(task.getTitle()));
        // If user gives due date → use it
        if (task.getDueDate() == null) {
        task.setDueDate(aiService.suggestDueDate(task.getTitle()));
        }
        if (task.getDescription() == null || task.getDescription().isBlank()) {
            task.setDescription(aiService.generateDescription(task.getTitle()));
        }

        return taskRepository.save(task);
    }

    // ===================== GET (SORTING) =====================
    public List<Task> getMyTasks(String sortBy) {

    String userEmail = getLoggedInUserEmail();
    List<Task> tasks = taskRepository.findByUserEmail(userEmail);

    if ("priority".equalsIgnoreCase(sortBy)) {
        tasks.sort((a, b) -> {
            if (a.getPriority() == null) return 1;
            if (b.getPriority() == null) return -1;
            return b.getPriority().compareTo(a.getPriority());
        });
    }

    if ("dueDate".equalsIgnoreCase(sortBy)) {
        tasks.sort((a, b) -> {
            if (a.getDueDate() == null) return 1;
            if (b.getDueDate() == null) return -1;
            return a.getDueDate().compareTo(b.getDueDate());
        });
    }

    return tasks;
    }

    // ===================== FILTER =====================
    public List<Task> filterByCategory(String category) {
        String userEmail = getLoggedInUserEmail();
        return taskRepository.findByUserEmailAndCategory(userEmail, category);
    }

    public List<Task> filterByStatus(TaskStatus status) {
        String userEmail = getLoggedInUserEmail();
        return taskRepository.findByUserEmailAndStatus(userEmail, status);
    }

    public List<Task> filterByPriority(TaskPriority priority) {
        String userEmail = getLoggedInUserEmail();
        return taskRepository.findByUserEmailAndPriority(userEmail, priority);
    }

    // ===================== DASHBOARD STATS =====================
    public TaskStatsResponse getStats() {

        String userEmail = getLoggedInUserEmail();

        long total = taskRepository.findByUserEmail(userEmail).size();
        long completed = taskRepository.countByUserEmailAndStatus(userEmail, TaskStatus.COMPLETED);
        long high = taskRepository.countByUserEmailAndPriority(userEmail, TaskPriority.HIGH);
        long medium = taskRepository.countByUserEmailAndPriority(userEmail, TaskPriority.MEDIUM);
        long low = taskRepository.countByUserEmailAndPriority(userEmail, TaskPriority.LOW);

        return new TaskStatsResponse(total, completed, high, medium, low);
    }

    // ===================== UPDATE =====================
    public Task updateTask(String taskId, Task updatedTask) {

        String userEmail = getLoggedInUserEmail();

        Task existingTask = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException("Task not found"));

        if (!existingTask.getUserEmail().equals(userEmail)) {
            throw new AccessDeniedException("You are not allowed to modify this task");
        }

        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setStatus(updatedTask.getStatus());

        String suggested = aiService.suggestPriority(updatedTask.getTitle());
        try {
            existingTask.setPriority(TaskPriority.valueOf(suggested));
        } catch (Exception e) {
            existingTask.setPriority(TaskPriority.LOW);
        }

        return taskRepository.save(existingTask);
    }

    // ===================== DELETE =====================
    public void deleteTask(String taskId) {

        String userEmail = getLoggedInUserEmail();

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException("Task not found"));

        if (!task.getUserEmail().equals(userEmail)) {
            throw new AccessDeniedException("You are not allowed to modify this task");
        }

        taskRepository.delete(task);
    }

    // ===================== AUTH =====================
    private String getLoggedInUserEmail() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }
}
