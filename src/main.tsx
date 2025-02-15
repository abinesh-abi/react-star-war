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
import StarShipDetails from './pages/starShips/StarShipDetails';
import VehicleDetails from './pages/vehicles/VehicleDetails';
import SpeciesDetails from './pages/species/SpeciesDetails';
import PlanetsDetails from './pages/planets/PlanetsDetails';

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
			{ path: '/star-ships/:id', element: <StarShipDetails /> },

			// vehicle
			{ path: '/vehicles', element: <Vehicles /> },
			{ path: '/vehicles/:id', element: <VehicleDetails /> },

			// species
			{ path: '/species', element: <Species /> },
			{ path: '/species/:id', element: <SpeciesDetails /> },

			// planets
			{ path: '/planets', element: <Planets /> },
			{ path: '/planets/:id', element: <PlanetsDetails /> },
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
