var mongoose = require('mongoose');

const dbLink = 'mongodb://trena99:valdrin123@ds241664.mlab.com:41664/todo-app'

mongoose.Promise = global.Promise;
mongoose.connect(dbLink,{//'mongodb://127.0.0.1:27017/TodoApp', {
    useNewUrlParser: true,
    useCreateIndex: true,
});

module.exports = { mongoose };