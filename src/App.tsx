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
      <Box maw="100%" w="100%" h="100vh">
        <Flex justify="space-between" align="center" p="md" gap="md">
          <ThemeToggler />
          <Title>MantineUI + React + React-router + Vite</Title>
        </Flex>
        <RouterProvider router={router} />
        <Group p="md">
          <Text>
            роутер подключен для дублирования информации о столбце и направлении
            сортировки из внутреннего стейта в query-параметры адреса и легкой
            передаче этого стейта путем копирования адресной строки. Пока без
            оптимизаций и анимаций, да они здесь и не нужны
          </Text>
          <Text>
            ячейки можно редактировать - кроме столбца ID, однако пока не
            подключена валидация. Также все пока хранится внутри стейта, за
            исключением данных об измененнных ячейках - для обработки истории
            изменений создан кастомный хук useEditedCellsStorage. При вынесении
            данных и обработчиков в стор в будущем, восприятие значительно
            упростится
          </Text>
          <Text>Таблица скроллится по горизонтали при переполнении</Text>
        </Group>
      </Box>
    </MantineProvider>
  );
}

export default App;
