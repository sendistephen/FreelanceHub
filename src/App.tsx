import { useState } from 'react';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className='App'>
			<h1 className='text-green-500'>Hello crypto</h1>
		</div>
	);
}

export default App;
