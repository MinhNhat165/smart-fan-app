import { Route, Routes } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/auth/login" element={<LoginPage />} />
		</Routes>
	);
};

export default AppRoutes;
