import RouterProvider from './RouterProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export interface ProviderProps {
	children?: React.ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
	return (
		<RouterProvider>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				{children}
			</LocalizationProvider>
		</RouterProvider>
	);
};
