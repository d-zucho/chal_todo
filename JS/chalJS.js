const todos = [
	{
		text: 'Go to the store',
		completed: false,
	},
	{
		text: 'Clean my room',
		completed: false,
	},
	{
		text: 'Tell Trevor I love him',
		completed: true,
	},
	{
		text: 'Find out what I can do with programming',
		completed: false,
	},
	{
		text: 'Take Luke on a walk',
		completed: false,
	},
];

const filters = {
	searchText: '',
};

/**   --- START OF RENDER TODO FUNCTION ---    */

const renderTodos = function(todos, filters) {
	const incompleteTodos = todos.filter(function(todo) {
		return !todo.completed;
	});

	/**   --- Display Summary ---    */

	const summary = document.createElement('h3');
	summary.textContent = `You have ${incompleteTodos.length} todos left`;
	document.querySelector('#summary').appendChild(summary);

	/**   --- Display Original Todos */

	todos.forEach(todo => {
		const p = document.createElement('p');
		p.textContent = ' - ' + todo.text;
		document.querySelector('#todos').appendChild(p);
	});

	/**   --- Filter ---    */

	document.querySelector('#filterText').addEventListener('input', function(e) {
		filters.searchText = e.target.value;

		// Create filtered list to match user input
		const filteredTodos = todos.filter(function(todo) {
			return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
		});
		// Clear section as filter is being applied to avoid posting
		// duplicates
		document.querySelector('#todos').innerHTML = '';

		// Post filtered todo
		filteredTodos.forEach(todo => {
			const p = document.createElement('p');
			p.textContent = ' - ' + todo.text;
			document.querySelector('#todos').appendChild(p);
		});
	});
};

renderTodos(todos, filters);

/**   --- Add New Todo ---    */

document.querySelector('#todo-form').addEventListener('submit', function(e) {
	// prevents default
	e.preventDefault();

	// Add new todo to Todos array
	todos.push({ text: e.target.elements.newTodoText.value, completed: false });
	console.log(e.target.elements.newTodoText.value);

	e.target.elements.newTodoText.value = '';
	document.querySelector('#summary').innerHTML = '';
	document.querySelector('#todos').innerHTML = '';
	renderTodos(todos, filters);
});
