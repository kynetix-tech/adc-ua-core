import React from 'react';

import { AnimatedLetter, AnimatedTextContainer } from './AnimatedText.style';

export interface AnimatedTextProps {
  children: string;
  separator?: string;
}
export function AnimatedText({ children, separator = '', ...props }: AnimatedTextProps) {
  return (
    <>
      <AnimatedTextContainer {...props}>
        {children.split(separator).map((letter, index) => (
          <AnimatedLetter idx={index} key={index}>
            {letter}
          </AnimatedLetter>
        ))}
      </AnimatedTextContainer>
    </>
  );
}
