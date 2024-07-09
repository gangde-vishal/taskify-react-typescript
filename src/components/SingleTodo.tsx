import React, { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { TodoListProps } from "../modal";
import "./input-field.css";

interface Props {
  todo: TodoListProps;
  todoList: TodoListProps[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoListProps[]>>;
}
const SingleTodo = ({ todo, todoList, setTodoList }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo?.todo);

  const inputFocus = useRef<HTMLInputElement>(null);

  const handleDeleteTodo = (id: number) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  const handleCompletedTodo = (id: number) => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, completed: !todo.completed } : item
      )
    );
  };

  const handleEditSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, todo: editTodo } : item
      )
    );
    setEdit(false);
  };

  return (
    <form
      className="single__todo"
      onSubmit={(e) => handleEditSubmit(e, todo.id)}
    >
      {edit ? (
        <input
          ref={inputFocus}
          type="text"
          name="edit"
          id="edit"
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : (
        <span
          className={`${todo.completed ? "completed" : ""} single__todo-text`}
        >
          {todo?.todo}
        </span>
      )}

      <div className="icons">
        <span
          className="icon"
          onClick={() => {
            inputFocus.current?.focus();
            if (!edit && !todo.completed) {
              setEdit(!edit);
            }
          }}
        >
          <CiEdit />
        </span>
        <span className="icon" onClick={() => handleDeleteTodo(todo.id)}>
          <MdDelete />
        </span>
        <span className="icon" onClick={() => handleCompletedTodo(todo.id)}>
          <FaCheck />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
