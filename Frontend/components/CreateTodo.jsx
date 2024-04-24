import { useState } from "react";

function CreateTodo() {
  const [itemAdded, setItemAdded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const notificationStyle = {
    position: "fixed",
    top: itemAdded ? "50px" : "-100px", // Start from top (-100px) and animate to 50px
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#0891b2", // Set background color to #4ade80
    padding: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    transition: "top 0.5s ease-in-out, opacity 0.5s ease-in-out", // Add transition effect for top and opacity
    opacity: itemAdded ? 1 : 0, // Show notification if itemAdded is true
    zIndex: 999, // Ensure the notification is on top of other elements
    borderRadius: "14px"
  };

  const handleShowNotification = () => {
    setItemAdded(true);

    // Reset input values to null
    setTitle("");
    setDescription("");

    // Hide notification after 3 seconds
    setTimeout(() => {
      setItemAdded(false);
    }, 1000);
  };
  const displayStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };

  return (
    <div style={displayStyle}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      {title.length > 0 && description.length > 0 && (
        <button
          className="rounded-full ..."
          onClick={async () => {
            const resp = await fetch("https://a6d3-2a09-bac5-40b3-1eb-00-31-82.ngrok-free.app/todo", {
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
            handleShowNotification();
          }}
        >
          Add this todo
        </button>
      )}
      <div style={notificationStyle}>
        <p style={{ backgroundColor: "#0891b2", color: "#ffffff" }}>
          Item has been added successfully!
        </p>
      </div>
    </div>
  );
}

export default CreateTodo;
