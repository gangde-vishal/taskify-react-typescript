import React from "react";
import { TodoListProps } from "../modal";
import SingleTodo from "./SingleTodo";
import "./input-field.css";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todoList: TodoListProps[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoListProps[]>>;
  completedTodos: TodoListProps[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<TodoListProps[]>>;
}
const TodoList = ({
  todoList,
  setTodoList,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId="TodoList">
        {(provided,snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? 'draggingActive' :""}`} 
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_heading">Active Tasks</span>
            {todoList.map((item, index) => {
              return (
                <SingleTodo
                  index={index}
                  key={item.id}
                  todo={item}
                  todoList={todoList}
                  setTodoList={setTodoList}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="RemoveTodos">
        {(provided,snapshot) => (
          <div
          className={`todos remove ${snapshot.isDraggingOver ? 'draggingCompleted' :""}`} 
            
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_heading">Completed Tasks</span>
            {completedTodos.map((item, index) => {
              return (
                <SingleTodo
                  index={index}
                  key={item.id}
                  todo={item}
                  todoList={completedTodos}
                  setTodoList={setCompletedTodos}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
