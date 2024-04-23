/* eslint-disable no-unused-vars */
import { useState } from "react";
import './App.css'
import CreateTodo from "../components/CreateTodo";
import Todos from "../components/Todos";
function App() {
  
  return (
    <div  className="w-[750px] fixed top-1/2 left-1/2 translate -translate-x-1/2 -translate-y-1/2 shadow-custom rounded-t-lg rounded-b-lg h-auto py-5 px-5">
      <CreateTodo />
      <br />
      <Todos></Todos>
    </div>
  );
}

export default App;
