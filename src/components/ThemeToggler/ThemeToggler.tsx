import {
  Switch,
  Group,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { Icon } from '../Icon';

export function ThemeToggler() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Group my={30}>
      <Switch
        checked={colorScheme === 'dark'}
        onChange={() => toggleColorScheme()}
        size="lg"
        onLabel={<Icon color={theme.white} type='sun'/>}
        offLabel={
          <Icon color={theme.colors.gray[6]} type='moon'/>
        }
      />
    </Group>
  );
}
