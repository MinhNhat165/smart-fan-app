export interface RouterProviderProps {
	children?: React.ReactNode;
}

import { BrowserRouter } from 'react-router-dom';

const RouterProvider = ({ children }: RouterProviderProps) => {
	return <BrowserRouter>{children}</BrowserRouter>;
};

export default RouterProvider;
