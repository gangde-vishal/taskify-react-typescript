import React, { useRef } from "react";
import "./input-field.css";

interface TodoProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: (e: React.FormEvent) => void;
}
const InputField = ({ todo, setTodo, handleAddTodo }: TodoProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="input__form"
      onSubmit={(e) => {
        handleAddTodo(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        name="todo"
        id="todo"
        placeholder="Enter your task"
        className="input__box"
        autoComplete="off"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit" className="submit__btn">
        Go
      </button>
    </form>
  );
};

export default InputField;
