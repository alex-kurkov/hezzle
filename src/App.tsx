import { Box, MantineProvider } from '@mantine/core';
import { SortableTable } from './components/SortableTable';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import '@mantine/core/styles.css';

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<SortableTable />} path="/" index/>
))


function App() {
  return (
    <MantineProvider defaultColorScheme='dark'>
      <Box
        style={{
          width: '100%',
          height: '100vh',
        }}>
        <RouterProvider router={router} />
        
      </Box>
    </MantineProvider>
  );
}

export default App;
