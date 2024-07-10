import { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { TodoListProps } from "./modal";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  // TODO: Implement the Taskify application here
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<TodoListProps[]>([]);
  const [completedTodos, setCompletedTodos] = useState<TodoListProps[]>([]);

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
  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    console.log("result---", result);
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    let add;
    let active = todoList,
      completed = completedTodos;
    if (source.droppableId === "TodoList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === "TodoList") {
      active.splice(source.index, 0, add);
    } else {
      completed.splice(source.index, 0, add);
    }
    setTodoList(active);
    setCompletedTodos(completed);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="app">
        <span className="heading">NeoSoft-Taskify</span>
        {/* INPUT FIELD */}
        <InputField
          todo={todo}
          setTodo={setTodo}
          handleAddTodo={handleAddTodo}
        />
        {/* TODO LIST */}
        <TodoList
          todoList={todoList}
          setTodoList={setTodoList}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
