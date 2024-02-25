import { useMediaQuery } from "react-responsive";

export const useMediaQueries = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 576 });
  const isMediumScreen = useMediaQuery({ minWidth: 577, maxWidth: 992 });
  const isBigScreen = useMediaQuery({ minWidth: 993 });

  return { isSmallScreen, isMediumScreen, isBigScreen };
};
