package com.janardhan.ai_task_manager.repository;

import com.janardhan.ai_task_manager.model.Task;
import com.janardhan.ai_task_manager.model.TaskPriority;
import com.janardhan.ai_task_manager.model.TaskStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {

    List<Task> findByUserEmail(String userEmail);

    List<Task> findByUserEmailAndCategory(String userEmail, String category);

    List<Task> findByUserEmailAndStatus(String userEmail, TaskStatus status);

    List<Task> findByUserEmailAndPriority(String userEmail, TaskPriority priority);

    long countByUserEmailAndPriority(String userEmail, Enum<?> priority);

    long countByUserEmailAndStatus(String userEmail, TaskStatus status);
}
