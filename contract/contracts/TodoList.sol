// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract EnhancedTodoList is Ownable(msg.sender), ReentrancyGuard {
    struct Task {
        bytes32 id; // Unique ID for the task
        address owner; // Address of task creator
        uint8 category;
        uint8 priority;
        uint256 deadline;
        bytes32[] dependencies;
        bool isCompleted;
        uint256 createdAt;
        uint256 completedAt;
        bool isDeleted;
    }

    mapping(bytes32 => Task) private tasks; // Store all tasks
    mapping(address => bytes32[]) public userTasks; // Store all task as per user

    // Separate mapping to handle metadata
    mapping(bytes32 => mapping(bytes32 => bool)) private taskMetadata;

    // Event tracking for changes
    event TaskCreated(
        bytes32 indexed id,
        address indexed owner,
        uint256 timestamp
    );
    event TaskCompleted(bytes32 indexed id, uint256 timestamp);
    event TaskDeleted(bytes32 indexed id, uint256 timestamp);
    // Modifier for access control for todoList
    modifier taskExists(bytes32 _taskId) {
        require(tasks[_taskId].owner != address(0), "Task does not exist");
        _;
    }

    modifier isTaskOwner(bytes32 _taskId) {
        require(tasks[_taskId].owner == msg.sender, "Not task owner");
        _;
    }

    modifier taskNotCompleted(bytes32 _taskId) {
        require(!tasks[_taskId].isCompleted, "Task already completed");
        _;
    }

    modifier taskNotDeleted(bytes32 _taskId) {
        require(!tasks[_taskId].isDeleted, "Task is deleted");
        _;
    }

    function createTask(bytes32 _taskId, uint8 _category, uint8 _priority, uint256 _deadline, bytes32[] memory _dependencies) external nonReentrant {
        require(tasks[_taskId].owner == address(0), "Task already exists");

        Task memory newTask = Task({
            id: _taskId,
            owner: msg.sender,
            category: _category,
            priority: _priority,
            deadline: _deadline,
            dependencies: _dependencies,
            isCompleted: false,
            createdAt: block.timestamp,
            completedAt: 0,
            isDeleted: false
        });

        tasks[_taskId] = newTask;
        userTasks[msg.sender].push(_taskId);

        emit TaskCreated(_taskId, msg.sender, block.timestamp);
    }

    function completeTask(
        bytes32 _taskId
    )
        external
        taskExists(_taskId)
        isTaskOwner(_taskId)
        taskNotDeleted(_taskId)
        taskNotCompleted(_taskId)
        nonReentrant
    {
        tasks[_taskId].isCompleted = true;
        tasks[_taskId].completedAt = block.timestamp;

        emit TaskCompleted(_taskId, block.timestamp);
    }

    function deleteTask(
        bytes32 _taskId
    )
        external
        taskExists(_taskId)
        isTaskOwner(_taskId)
        taskNotDeleted(_taskId)
        nonReentrant
    {
        tasks[_taskId].isDeleted = true;

        emit TaskDeleted(_taskId, block.timestamp);
    }

    // Get a specific task details
    function getTask(bytes32 _taskId) external view returns (Task memory) {
        return tasks[_taskId];
    }

    // Get all non-deleted tasks for a user
    function getFilteredTasks(
        address _user,
        bool includeCompleted,
        bool includeDeleted
    ) external view returns (bytes32[] memory) {
        bytes32[] memory allTasks = userTasks[_user];

        uint256 matchingCount = 0;
        for (uint256 i = 0; i < allTasks.length; i++) {
            Task memory task = tasks[allTasks[i]];
            if (
                (includeDeleted || !task.isDeleted) &&
                (includeCompleted || !task.isCompleted)
            ) {
                matchingCount++;
            }
        }

        bytes32[] memory filteredTasks = new bytes32[](matchingCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < allTasks.length; i++) {
            Task memory task = tasks[allTasks[i]];
            if (
                (includeDeleted || !task.isDeleted) &&
                (includeCompleted || !task.isCompleted)
            ) {
                filteredTasks[currentIndex++] = allTasks[i];
            }
        }

        return filteredTasks;
    }

    // Function to set metadata for a task
    function setTaskMetadata(bytes32 _taskId, bytes32 _key, bool _value) external taskExists(_taskId) isTaskOwner(_taskId) {
        taskMetadata[_taskId][_key] = _value;
    }

    // Function to get metadata for a task
    function getTaskMetadata(bytes32 _taskId, bytes32 _key) external view taskExists(_taskId) returns (bool) {
        return taskMetadata[_taskId][_key];
    }
}
