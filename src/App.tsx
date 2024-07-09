import { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { TodoListProps } from "./modal";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  // TODO: Implement the Taskify application here
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<TodoListProps[]>([]);

  // console.log('todoList-----', todoList)

  const handleAddTodo = (e: React.FormEvent): void => {
    e.preventDefault();
    if (todo.trim() === "") return;
    if (todo) {
      setTodoList([
        ...todoList,
        { id: Date.now(), todo: todo.trim(), completed: false },
      ]);
      setTodo("");
    }
  };

  return (
    <div className="app">
      <span className="heading">Taskify</span>
      {/* INPUT FIELD */}
      <InputField todo={todo} setTodo={setTodo} handleAddTodo={handleAddTodo} />
      {/* TODO LIST */}
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
};

export default App;
