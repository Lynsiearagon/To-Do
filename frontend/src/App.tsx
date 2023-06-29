import React, { useEffect, useState } from 'react';
import { ToDo as ToDoModel } from './models/todos';
import ToDo from './components/ToDo';

function App() {
  const [toDos, setToDos] = useState<ToDoModel[]>([]);

  useEffect(() => {
    async function fetchAllToDos() {
      try {
        const resp = await fetch("/api/todos", {method: "GET"});
        const allToDos = await resp.json();
        setToDos(allToDos);

      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    fetchAllToDos();
  }, []);

  return (
    <div>
      {toDos.map(todo => (
        <ToDo toDo={todo} key={todo._id} />
      ))}
    </div>
  );
}

export default App;
