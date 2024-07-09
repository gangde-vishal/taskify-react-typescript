import React from "react";
import { TodoListProps } from "../modal";
import SingleTodo from "./SingleTodo";
import "./input-field.css";

interface Props {
  todoList: TodoListProps[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoListProps[]>>;
}
const TodoList = ({ todoList, setTodoList }: Props) => {
  return (
    <div className="todos">
      {todoList.map((item) => {
        return (
          <SingleTodo
            key={item.id}
            todo={item}
            todoList={todoList}
            setTodoList={setTodoList}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
