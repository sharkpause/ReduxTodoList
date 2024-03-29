const Redux = require('redux');

const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const EDIT_TASK = 'EDIT_TASK';

function taskReducer(state = [], action) {
	switch(action.type) {
		case ADD_TASK:
			return [...state, action.task];
		case REMOVE_TASK:
			return state.slice(0, action.index)
						.concat(state.slice(action.index + 1, state.length));
		case EDIT_TASK:
			const newState = state.slice(0);
			newState[action.index] = action.newTask;
			return newState;
		default:
			return state;
	}
}

function addTask(task) {
	return {
		type: ADD_TASK,
		task
	}
}

function removeTask(index) {
	return {
		type: REMOVE_TASK,
		index
	}
}

function editTask(newTask, index) {
	return {
		type: EDIT_TASK,
		newTask,
		index
	}
}

function displayTasks(store) {
	const tasks = store.getState();
	for(let i = 0; i < tasks.length; ++i) {
		console.log(`${i}: ${tasks[i]}`);
	}
}

const store = Redux.createStore(taskReducer);

store.dispatch(addTask('get motivated'));
store.dispatch(addTask('think of a multimillion dollar business idea'));
store.dispatch(addTask('start researching about the idea'));
store.dispatch(addTask('get unmotivated'));

displayTasks(store);
