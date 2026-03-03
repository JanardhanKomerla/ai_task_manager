package com.janardhan.ai_task_manager.repository;

import com.janardhan.ai_task_manager.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);
}