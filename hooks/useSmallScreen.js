import { useMediaQuery } from '@mantine/hooks';

function useSmallScreen() {
  const isSmallScreen = useMediaQuery('(max-width: 767px)');
  return { isSmallScreen };
}

export default useSmallScreen;
