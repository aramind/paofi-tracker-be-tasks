
class Task {
    constructor(taskModel){
        this.taskModel = taskModel
    }

    getTasksForUser(userId){
        return this.taskModel.find({ userId });
    }

    getTask(){
        return 'hello world';
    }
}

module.exports = Task