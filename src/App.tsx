import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import './App.scss';
import Authenticate from './components/layouts/Authenticate';

export default function App() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<div style={{background:'#eaebed',padding:'30px', height:'100vh'}}>
			<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
				<Authenticate>
						<Outlet />
				</Authenticate>
			</MantineProvider>
		</div>
	);
}
