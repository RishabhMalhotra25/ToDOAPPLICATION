 package com.igt.toDoApp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.igt.toDoApp.model.ToDo;

public interface ToDoRepository extends JpaRepository <ToDo, String> {

}
