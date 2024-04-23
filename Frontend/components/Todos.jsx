import React, { useState } from "react";

function Todos() {
  let [todos, setTodo] = useState([]);
  const [itemRemoved, setItemRemoved] = useState(false);

  let arr = async () => {
    let resp = await fetch("http://localhost:3000/todos", { method: "GET" });
    let respp = await resp.json();
    setTodo(respp);
  };

  const handleShowNotification = () => {
    setItemRemoved(true);

    // Hide notification after 3 seconds
    setTimeout(() => {
      setItemRemoved(false);
    }, 1000);
  };

  const notificationStyle = {
    position: "fixed",
    top: itemRemoved ? "50px" : "-100px", // Start from above (-100px) and animate to 10px
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#0891b2",
    padding: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    transition: "top 0.5s ease-in-out, opacity 0.5s ease-in-out",
    opacity: itemRemoved ? 1 : 0,
    zIndex: 999,
    borderRadius: "14px",
    color: "#ffffff",
  };

  return (
    <>
      <button onClick={arr} style={{ margin: "10px 0" }}>Show All Todos</button>

      {todos.map(function (todo) {
        return (
          <div key={todo._id} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <hr />
            <h6>id - {todo._id}</h6>
            <h2>{todo.title}</h2>
            <h4>{todo.description}</h4>
            
            {!todo.completed && (
              <button
                style={{
                  backgroundColor: "#0891b2",
                  color: "#ffffff",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  width: "250px"
                }}
                onClick={async () => {
                  let oldid = todo._id;

                  await fetch("http://localhost:3000/deletetodo", {
                    method: "DELETE",
                    body: JSON.stringify({
                      id: todo._id,
                    }),
                    headers: {
                      "Content-type": "application/json",
                    },
                  });

                  let newtodos = todos.filter((todo) => todo._id !== oldid);
                  setTodo(newtodos);

                  // Show notification for item removal
                  handleShowNotification();
                }}
              >
                Complete and Remove
              </button>
            )}

            <hr />
          </div>
        );
      })}

      {/* Notification for item removal */}
      <div style={notificationStyle}>
        Item has been removed successfully!
      </div>
    </>
  );
}

export default Todos;
