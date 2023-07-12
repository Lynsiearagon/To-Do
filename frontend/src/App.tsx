import React, { useEffect, useState } from 'react';
import { ToDo as ToDoModel } from './models/todos';
import ToDo from './components/ToDo';
import { Container, Row } from 'react-bootstrap';

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
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {toDos.map(todo => (
          <ToDo toDo={todo} key={todo._id} />
        ))}
      </Row>
    </Container>
  );
}

export default App;
