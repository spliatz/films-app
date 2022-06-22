import { useState } from 'react';

export const useScreen = (userWidth: number) => {
  const [width, setWidth] = useState(userWidth);

  const changeWidth = (newWidth: number) => {
    setWidth(newWidth);
  };

  const answer = {
    width: width,
    isMobile: false,
    isDesktop: false,
    changeWidth: changeWidth,
  };

  switch (true) {
    case width <= 600:
      answer.isMobile = true;
      break;
    default:
      answer.isDesktop = true;
      break;
  }

  return answer;
};
