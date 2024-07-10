import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { TodoListProps } from "../modal";
import "./input-field.css";
import { Draggable } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface Props {
  index: number;
  todo: TodoListProps;
  todoList: TodoListProps[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoListProps[]>>;
}
const SingleTodo = ({ index, todo, todoList, setTodoList }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo?.todo);

  const inputFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputFocus.current?.focus();
  }, [edit]);

  const handleDeleteTodo = (id: number) => {
    MySwal.fire({
      title: `Do you want to delete "${todo.todo}" ?`,
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "success");
        setTodoList(todoList.filter((item) => item.id !== id));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
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
    if (editTodo.trim() === "") return;
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, todo: editTodo } : item
      )
    );
    setEdit(false);
  };

  return (
    <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`single__todo ${snapshot.isDragging ? "dragTodo" : ""}`}
          onSubmit={(e) => handleEditSubmit(e, todo.id)}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputFocus}
              type="text"
              name="edit"
              id="edit"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="edit__input__box"
            />
          ) : (
            <span
              className={`${
                todo.completed ? "completed" : ""
              } single__todo-text`}
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
      )}
    </Draggable>
  );
};

export default SingleTodo;
