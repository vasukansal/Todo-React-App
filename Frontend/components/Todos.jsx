/* eslint-disable react/jsx-key */
import React, { useState } from "react";

function Todos() {
  let [todos, setTodo] = useState([]);
  let arr = async () => {
    let resp = await fetch("http://localhost:3000/todos", { method: "GET" });
    let respp = await resp.json();
    setTodo(respp);
  };

  return (
    <>
      <button  onClick={arr}>Show All Todos</button>

      {todos.map(function (todo) {
        return (
          <div>
            <hr />
            <h6>id - {todo._id}</h6>
            <h2>{todo.title}</h2>
            <h4>{todo.description}</h4>
            
            {!todo.completed && (
              <button
                onClick={async () => {
                  let oldid=todo._id
                  
                  await fetch("http://localhost:3000/deletetodo",{
                  method:"DELETE",
                  body:JSON.stringify({
                    id:todo._id
                  }),
                  headers: {
                      "Content-type": "application/json",
                    }
                })
                  let newtodos=todos.filter(function(todo){
                    todo._id!=oldid
                  })
                  setTodo(newtodos)
                }}
              >
                Complete and Remove
              </button>
            )}
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default Todos;
