import { Children, StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import PeopleDetails from './pages/peopleDetails/PeopleDetails';
import Films from './pages/films/Films';

export const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			//people
			{ path: '/', element: <Landing /> },
			{ path: '/people/:id', element: <PeopleDetails /> },
			// films
			{ path: '/films', element: <Films /> },
			// { path: '/films/:id', element: <PeopleDetails /> },
		]
	},
	{
		path: '/login',
		element: <Login />,
	}


];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
