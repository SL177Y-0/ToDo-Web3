// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ToDo{

    struct Task{
        uint id;
        string name;
        string date;
        bool completed;
        string reminderDate; // Add reminderDate to Task struct
    }

    address owner;
    Task task;
    mapping(uint=>Task) tasks;
    uint taskId=1;
    event taskCreate(uint taskId, string name);
    event taskUpdate(uint taskId, string name);
    event taskDelete(uint taskId);
    event taskComplete(uint taskId, bool completed);
    event taskReminderSet(uint taskId, string reminderDate); // Add event for setting reminder

    modifier checkId(uint id){
        require(id!=0 && id<taskId,"Invalid Id");
        _;
    }
    modifier onlyOwner(){
        require(msg.sender==owner,"Invalid Owner");
        _;
    }

    constructor(){
        owner=msg.sender;
    }

    function createTask(string calldata _taskName, string calldata _date) public { 
          tasks[taskId]=Task(taskId,_taskName,_date, false, "");
          taskId++;
          emit taskCreate(taskId,_taskName);
    }

    function updateTask(uint _taskId,string calldata _taskName, string calldata _date) checkId(_taskId) public {
        tasks[_taskId] = Task(_taskId,_taskName,_date, tasks[_taskId].completed, tasks[_taskId].reminderDate);
        emit taskUpdate(taskId,_taskName);
    }

    function allTask() public view returns(Task[] memory){
        Task[] memory taskList = new Task[](taskId-1);
        for(uint i=0;i<taskId-1;i++){
            taskList[i]=tasks[i+1];
        }
        return taskList;
    }

    function viewTask(uint _taskId) checkId(_taskId) public view returns(Task memory){
        return tasks[_taskId];
    }

    function deleteTask(uint _taskId) checkId(_taskId) public {
      delete tasks[_taskId];
      emit taskDelete(_taskId);
    }

    function completeTask(uint _taskId, bool _completed) checkId(_taskId) public {
        tasks[_taskId].completed = _completed;
        emit taskComplete(_taskId, _completed);
    }

    function setReminder(uint _taskId, string calldata _reminderDate) checkId(_taskId) public {
        tasks[_taskId].reminderDate = _reminderDate;
        emit taskReminderSet(_taskId, _reminderDate);
    }

    function getReminders() public view returns (Task[] memory) {
        Task[] memory reminderList = new Task[](taskId - 1);
        uint count = 0;
        for (uint i = 0; i < taskId - 1; i++) {
            if (bytes(tasks[i + 1].reminderDate).length > 0) {
                reminderList[count] = tasks[i + 1];
                count++;
            }
        }
        return reminderList;
    }
}
