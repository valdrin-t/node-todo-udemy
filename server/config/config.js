var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoApp';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoAppTest';
} else if (env === 'production') {
    process.env.MONGODB_URI = 'mongodb://trena99:valdrin123@ds241664.mlab.com:41664/todo-app'
}
