import { Switch, Group, useMantineColorScheme } from '@mantine/core';
import { Icon } from '../Icon';

export function ThemeToggler() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group my={30}>
      <Switch
        checked={colorScheme === 'dark'}
        onChange={() => toggleColorScheme()}
        size="lg"
        onLabel={<Icon type="sun" />}
        offLabel={<Icon type="moon" />}
      />
    </Group>
  );
}
