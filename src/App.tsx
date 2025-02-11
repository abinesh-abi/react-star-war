import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, LoadingOverlay, MantineProvider } from '@mantine/core';
import { theme } from './theme';
import './App.scss';
import Authenticate from './components/layouts/Authenticate';
import { useAppStore } from './store/app.store';

export default function App() {
	const { pathname } = useLocation();
	const { loading } = useAppStore(state => state)

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<div>
			<Box pos="absolute" h={'100vh'} w={'100vw'} top={0}>
				<LoadingOverlay
					visible={Boolean(loading) }
					// zIndex={1000}
					overlayBlur={2}
					loaderProps={{ color: 'pink', type: 'bars' }}
				/>
				{/* ...other content */}
			</Box>
			<div style={{ background: '#eaebed', padding: '30px', height: '100vh' }}>
				<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
					<Authenticate>
						<Outlet />
					</Authenticate>
				</MantineProvider>
			</div>
		</div>
	);
}
