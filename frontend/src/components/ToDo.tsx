import "./ToDo.css"
import { Card } from "react-bootstrap";
import { ToDo as ToDoModel } from "../models/todos";

interface ToDoProps {
    toDo: ToDoModel
}

const ToDo = ({ toDo }: ToDoProps ) => {
    const {
        title,
        text,
        createdAt,
        updatedAt
    } = toDo


    return (
        <Card className="note-card">
            <Card.Body>
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Text>
                    {text}
                </Card.Text>
            </Card.Body>
        </Card>
    )

}


export default ToDo;