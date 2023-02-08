import styled, { keyframes } from 'styled-components';

import theme from '../../themes';

const JumpKeyframes = keyframes`
  0%,40%,100% {
    transform: translateY(0)
  }
  20% {
    transform: translateY(-10px)
  }
`;

export const AnimatedTextContainer = styled.div`
  position: relative;
  -webkit-box-reflect: below -20px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
  font-size: 4.25rem;
  letter-spacing: 0.5rem;
`;

export interface AnimatedLetterProps {
  idx: number;
}

export const AnimatedLetter = styled.span<AnimatedLetterProps>`
  --i: ${(props) => `${props.idx}`};
  font-weight: ${theme.typography.fontWeightBold};
  position: relative;
  display: inline-block;
  color: ${theme.palette.text.primary};
  text-transform: uppercase;
  animation: ${JumpKeyframes} 1s infinite;
  animation-delay: calc(0.1s * var(--i));
`;
