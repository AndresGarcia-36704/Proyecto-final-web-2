import express from "express";
import {read, write} from "../utils/files.js";
import dayjs from "dayjs";
export const makeupsFileRouter = express.Router();

makeupsFileRouter.get("/", (req, res) => {
    let Makeups = read();
    let done = req.query.done;
    if (done === 'true') {
        done = true;
    } else if (done === 'false') {
        done = false;
    }
    console.log('req.query', req.query);
    console.log('Makeups', Makeups);
    if (req.query.done || req.query.limit) {
        Makeups = req.query.done ? Makeups.filter(makeup => makeup.done === done): Makeups;
        Makeups = req.query.limit ? Makeups.slice(0, parseInt(req.query.limit)) : Makeups;
        res.json(Makeups);
        return;
    }
    console.log('Makeups', Makeups);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(Makeups));
})

makeupsFileRouter.post('/',
    (req, res, next) => {
        req.body.ip = req.ip;
        req.body.created_at = dayjs().format('HH:mm DD-MM-YYYY');
        next();
    }, 
    (req, res) => {
    const Makeups = read();
    //Añadir ID a los datos recibidos
    const makeup = {
        ...req.body, //Spread operator
        id: Makeups.length + 1
    }
    Makeups.push(makeup);
    write(Makeups);
    res.status(201).json(Makeups);
})

makeupsFileRouter.get('/:id', (req, res) => {
    const Makeups = read();
    const makeup = Makeups.find(makeup => makeup.id === parseInt(req.params.id));
    if (makeup) {
        res.json(makeup);
    } else {
        res.status(404).end();
    }
})

makeupsFileRouter.put('/:id',   
    (req, res, next) => {
        req.body.ip = req.ip;
        req.body.updated_at = dayjs().format('HH:mm DD-MM-YYYY');
        next();
    }, 
    (req, res) => {
        const Makeups = read();
        let makeup = Makeups.find(makeup => makeup.id === parseInt(req.params.id));
        if (makeup) {
            makeup = {
                ...makeup,
                ...req.body
            }
            Makeups[
                Makeups.findIndex(makeup => makeup.id === parseInt(req.params.id))
            ] = makeup;
            write(Makeups);
            res.json(makeup);
        } else {
            res.status(404).end();
        }
    }
)

makeupsFileRouter.put('/update/to/done', (req, res) => {
    let Makeups = read();
    Makeups = Makeups.map(makeup => {
        makeup.done = true;
        makeup.updated_at = dayjs().format('HH:mm DD-MM-YYYY');
        return makeup;
    });
    write(Makeups);
    res.json(Makeups);
})

makeupsFileRouter.delete('/:id', (req, res) => {
    const Makeups = read();
    const makeup = Makeups.find(makeup => makeup.id === parseInt(req.params.id));
    if (makeup) {
        Makeups.splice(
            Makeups.findIndex(makeup => makeup.id === parseInt(req.params.id)),
            1
        );
        write(Makeups);
        res.json(makeup);
    } else {
        res.status(404).end();
    }
})