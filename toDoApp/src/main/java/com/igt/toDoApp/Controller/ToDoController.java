package com.igt.toDoApp.Controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.igt.toDoApp.Repository.ToDoRepository;
import com.igt.toDoApp.model.ToDo;
@RestController
@RequestMapping("/api")
public class ToDoController {

	@Autowired
	ToDoRepository toDoRepository;

	@RequestMapping(value = "/InsertToDoDetails", method = RequestMethod.POST)
	public ToDo createToDo(@RequestBody ToDo toDo) {
		toDo.setCreatedDate(new Date());
		return toDoRepository.saveAndFlush(toDo);
	}

	@RequestMapping(value = "/getToDo/{id}")
	public ToDo getToDo(@PathVariable("id") String id) {
		return toDoRepository.findOne(id);
	}

	@RequestMapping(value = "/getAllToDo")
	public List<ToDo> getAllTodo() throws Exception {
		List<ToDo> todoList = toDoRepository.findAll();
		if (null == todoList) {
			throw new Exception();
		}

		return todoList;
	}

	@RequestMapping(value = "/updateToDoSatus/{id}")
	public ToDo updateToDoStatus(@PathVariable("id") String id)
			throws Exception {
		ToDo todo = toDoRepository.findOne(id);
		if (null == todo) {
			throw new Exception();
		} else {
			todo.setCompleted("true");
			toDoRepository.saveAndFlush(todo);
		}
		return todo;
	}

	@RequestMapping(value = "/deleteToDo/{id}")
	public ToDo deleteToDo(@PathVariable("id") String id) throws Exception {
		ToDo todo = toDoRepository.findOne(id);
		if (null == todo) {
			throw new Exception();
		} else {
			toDoRepository.delete(todo);
		}
		return todo;
	}

}
