import styled, {css, keyframes} from 'styled-components';
import {ReactComponent as CrossIcon} from './img/cross.svg';

export const cardSize = css`
  width: 180px;
  height: 220px;
`;

export const ImageStyled = styled.img`
  ${cardSize};
  transition: 200ms ease;
  :hover {
    transform: scale(1.05);
  }
`;

const shake = keyframes`
  0% {
    transform: rotate(0deg);
  }
  
  25% {
    transform: rotate(10deg);
  }
  
  50% {
    transform: rotate(-10deg);
  }
  
  75% {
    transform: rotate(10deg);
  }
  
  100% {
    transform: rotate(0deg);
  }
`;

const fade = keyframes`
  from {
    transform: scale();
  }
  
  to {
    transform: scale(0);
  }
`;

export interface AnimatedImageProps {
  animate?: boolean;
  deleted?: boolean;
}

export const AnimatedImageStyled = styled(ImageStyled)<AnimatedImageProps>`
  animation: 200ms linear;
  animation-name: ${props => props.animate ? shake : props.deleted ? fade : 'none'};
`;

export const CloseCardButtonIconStyled = styled(CrossIcon)`
  pointer-events: none;
`;

export const CloseCardButtonStyled = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 8px;
  right: 8px;
  background-color: white;
  cursor: pointer;
  border-radius: 50%;
  opacity: 90%;
  width: 30px;
  height: 30px;
  transition: 300ms ease;
  :hover {
    transform: rotate(180deg);
    background-color: gray;
  }
`;

export const CharacterCardStyled = styled.tr`
  display: inline-block;
  position: relative;
`;