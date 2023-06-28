import { InferSchemaType, Schema, model } from "mongoose"

const toDoSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String },
}, { timestamps: true });


// below is the type for typescript
type ToDo = InferSchemaType<typeof toDoSchema>;
// end of typescript type

export default model<ToDo>("ToDo", toDoSchema); 


