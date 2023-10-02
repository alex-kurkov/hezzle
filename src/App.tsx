import { Box, Text, Flex, MantineProvider, Title, Group } from '@mantine/core';
import { SortableTable } from './components/SortableTable';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import '@mantine/core/styles.css';
import { ThemeToggler } from './components/ThemeToggler';

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<SortableTable />} path="/" index/>
))


function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Box maw="100%" w="100%" h="100vh" style={{overflowX: 'hidden'}}>
        <Flex justify="space-between" align="center" p="md" gap="md">
          <ThemeToggler />
          <Title>MantineUI + React + React-router + Vite + TS</Title>
        </Flex>
        <RouterProvider router={router} />
        <Group p="md">
          <Text>
            роутер подключен для дублирования информации о столбце и направлении
            сортировки из внутреннего стейта в query-параметры адреса и легкой
            передаче этого стейта путем копирования адресной строки.
          </Text>
          <Text>
            ячейки можно редактировать - кроме столбца ID, пока
            подключена простая валидация - в цифровые ячейки можно записать только цифры. Большая часть логики и данных хранятся и
            обрабатываются в кастомных хуках - useEditedCellsStorage,
            useSortSearchParams, useEditStateHandling. При вынесении данных и
            обработчиков в стор в будущем, восприятие значительно упростится
          </Text>
          <Text>Таблица скроллится по горизонтали при переполнении</Text>
        </Group>
      </Box>
    </MantineProvider>
  );
}

export default App;
