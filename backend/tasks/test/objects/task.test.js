const Task = require('../../objects/Task')

const mockFind = jest.fn()
const mockTaskModel = {
    find: mockFind
}

describe('Task', () => {
    
    const taskClass = new Task(mockTaskModel);
    
    test('getTask', () => {
        //PTA

        //Prepare

        //Test
        const result = taskClass.getTask();
        //Assert
        expect(result).toBe('hello world');
    })

    test('getTasksForUser', async () => {
        //PTA
        const mockData = { test: 'test' };
        //Prepare
        mockFind.mockResolvedValue(mockData)
        //Test
        const result = await taskClass.getTasksForUser(1);
        //Assert
        expect(result).toEqual(mockData);
        expect(mockFind).toHaveBeenCalled();
    })
})