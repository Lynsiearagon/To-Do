import { RequestHandler } from "express";
import ToDoModel from "../models/todo";
import createHttpError from "http-errors";
import mongoose from "mongoose";


// get all toDos
export const getToDos: RequestHandler = async (req, res, next) => {
    try {
        const toDos = await ToDoModel.find().exec();
        res.status(200).json(toDos);
    } catch (error) {
        next(error);
    }
};


// get one toDo by id
export const getToDo: RequestHandler = async (req, res, next) => {
    const toDoId = req.params.toDoId;

    try {
        if (!mongoose.isValidObjectId(toDoId)) {
            throw createHttpError(400, "Invalid To Do id.");
        }

        const toDo = await ToDoModel.findById(toDoId).exec()
        res.status(200).json(toDo);

        if (!toDo) {
            throw createHttpError(404, "To Do not found.");
        }
    } catch (error) {
        next(error);
    }
};


// post a toDo
// establish interface for title and text being created
interface CreateToDoBody {
    title?: string, 
    text?: string
}

// There are four arguments that get passed in to the Request Handler, all or nothing.
export const createToDo: RequestHandler<
    unknown, 
    unknown, 
    CreateToDoBody, 
    unknown> = async (req, res, next) => {
        
    const title = req.body.title;
    const text = req.body.text;

    try {
        if (!title) {
            throw createHttpError(400, "To Do must have a title.");
        }

        const newToDo = await ToDoModel.create({
            title: title, 
            text: text
        });

        res.status(201).json(newToDo);
    } catch (error) {
        next(error);
    }
};



// update ToDo by id
// establish interfaces for update params, title, and text
interface UpdateToDoParams {
    toDoId: string
}

interface UpdateToDoBody {
    title?: string,
    text?: string
}

export const updateToDo: RequestHandler<
    UpdateToDoParams, 
    unknown, 
    UpdateToDoBody, 
    unknown> 
    = async (req, res, next) => {
    
    const toDoId = req.params.toDoId;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        if (!mongoose.isValidObjectId(toDoId)) {
            throw createHttpError(400, "Invalid To Do id.");
        }

        if (!newTitle) {
            throw createHttpError(400, "To Do must have a title.");
        }

        const toDo = await ToDoModel.findById(toDoId).exec();

        if (!toDo) {
            throw createHttpError(404, "To Do not found.")
        }

        toDo.title = newTitle; 
        toDo.text = newText;

        const updatedToDo = await toDo.save();
        res.status(200).json(updatedToDo);
    } catch (error) {
        next(error);
    }
};


// delete to do 
export const deleteToDo: RequestHandler = async(req, res, next) => {
    const toDoId = req.params.toDoId; 

    try {
        if (!mongoose.isValidObjectId(toDoId)) {
            throw createHttpError(400, "Invalid To Do id.")
        }

        const toDo = await ToDoModel.findById(toDoId).exec();

        if (!toDo) {
            throw createHttpError(404, "To Do not found.");
        }

        await toDo.deleteOne();

        res.sendStatus(204);
        
    } catch (error) {
        next(error);
    }
};