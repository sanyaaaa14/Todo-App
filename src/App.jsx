import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./Components/Navbar.jsx";
import { v4 as uuidv4 } from "uuid";

import "./index.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);

    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="md:container  mx-auto my-5 rounded-xl text-gray-800 md:w-1/2 bg-purple-100 p-5 min-h-[70vh]">
        <h1 className="font-semibold text-center text-2xl my-2">
          iTask - Manage your todos at one place
        </h1>
        <div className="h-[1px] w-full bg-gray-800"></div>

        <div className="addtodo">
          <h2 className="font-semibold text-xl my-2">Add Todo</h2>
          <div className=" flex gap-4 items-center py-2">
            <input
              onChange={handleChange}
              value={todo}
              className="bg-white rounded-sm py-1 px-4 md:w-[90%] w-full"
              type="text"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-purple-800 py-1 px-3 disabled:bg-purple-700 text-white rounded-md  hover:bg-purple-900 cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        <label className="mx-2 " htmlFor="show">
          Show Finished
        </label>
        <h2 className="font-semibold text-xl my-3">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className=" text-gray-500 my-4">No Todos Found</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex gap-3 items-center my-3 md:w-3/4 justify-between"
                >
                  <div className="flex gap-4 items-center ">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      value={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex gap-3 items-center">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-purple-800 py-1 px-3 text-white rounded-md  hover:bg-purple-900 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-purple-800 py-1 px-3 text-white rounded-md  hover:bg-purple-900 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
