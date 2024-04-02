import React, { useState } from "react";

function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="flex justify-between">
      <input
        type="text"
        placeholder="Title"
        onChange={function (e) {
          setTitle(e.target.value);
        }}
      ></input>
      <br />
      <input
        type="text"
        placeholder="Description"
        onChange={function (e) {
          setDescription(e.target.value);
        }}
      ></input>{" "}
      <br />
      {title.length > 0 && description.length > 0 && (
        <button className="rounded-full ..."
          onClick={async function () {
            const resp = await fetch("http://localhost:3000/todo", {
              method: "POST",
              body: JSON.stringify({
                title: title,
                description: description,
              }),
              headers: {
                "Content-type": "application/json",
              },
            });
            resp.json();
            alert("Added");
          }}
        >
          Add this todo
        </button>
      )}
    </div>
  );
}

export default CreateTodo;
