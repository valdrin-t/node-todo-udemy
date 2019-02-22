require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

/**
 * Todos
 */
app.post('/todos', authenticate, (req, res) => {
    let todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.sendStatus(400);
    });
});
app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.sendStatus(400);
    });
});
app.get('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.sendStatus(404);
    }
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.sendStatus(404);
        }
        res.send({ todo });
    }).catch((e) => {
        res.sendStatus(400);
    });
});
app.delete('/todos/:id', authenticate, async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.sendStatus(404);
    }
    try {
        const todo = await Todo.findOneAndDelete({
            _id: id,
            _creator: req.user._id
        });
        if (!todo) {
            return res.sendStatus(404);
        }
        res.send({ todo });
    } catch (e) {
        res.sendStatus(400);
    }
});
app.patch('/todos/:id', authenticate, async (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return res.sendStatus(404);
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    try {
        const todo = await Todo.findOneAndUpdate({
            _id: id,
            _creator: req.user._id
        }, { $set: body }, { new: true });
        
        if (!todo) {
            return res.sendStatus(404);
        }
        res.send({todo});
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

/**
 * Users
 */
app.post('/users', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = new User(body);
        await user.save();
        const token = user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (e) {
        res.sendStatus(400);
    }
});
app.get('/users/me', authenticate, (req,res) => {
    res.send(req.user);
});
app.post('/users/login', async (req, res) =>{
    try{
        const body = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (e) {
        res.sendStatus(401).send(e);
    }
});
app.delete('/users/me/token', authenticate, async (req, res) => {
    try{
        await req.user.removeToken(req.token);
        res.sendStatus(200);
    } catch{
        res.sendStatus(400);
    }
});
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };