import './App.css';

import AppRoutes from './routes';
import { Provider } from './providers';

function App() {
	return (
		<Provider>
			<AppRoutes />
		</Provider>
	);
}

export default App;
