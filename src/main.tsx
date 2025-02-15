import { Children, StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Login from './pages/login/Login';
import PeopleDetails from './pages/peoples/PeopleDetails';
import Films from './pages/films/Films';
import StarShips from './pages/starShips/StarShips';
import Vehicles from './pages/vehicles/Vehicles';
import Species from './pages/species/Species';
import Planets from './pages/planets/Planets';
import Peoples from './pages/peoples/Peoples';
import FilmDetails from './pages/films/FilmDetails';

export const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			//people
			{ path: '/', element: <Peoples /> },
			{ path: '/people/:id', element: <PeopleDetails /> },
			// films
			{ path: '/films', element: <Films /> },
			{ path: '/films/:id', element: <FilmDetails /> },

			// starship
			{ path: '/star-ships', element: <StarShips /> },
			// { path: '/films/:id', element: <PeopleDetails /> },

			// starship
			{ path: '/vehicles', element: <Vehicles /> },
			// { path: '/films/:id', element: <PeopleDetails /> },

			// species
			{ path: '/species', element: <Species /> },
			// { path: '/films/:id', element: <PeopleDetails /> },

			// species
			{ path: '/planets', element: <Planets /> },
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
