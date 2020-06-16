import styled, {css} from 'styled-components';
import {ReactComponent as CrossIcon} from './img/cross.svg';

export const cardSize = css`
  width: 180px;
  height: 220px;
`;

export const ImageStyled = styled.img`
  ${cardSize}
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
  :hover {
    background-color: gray;
  }
`;

export const CharacterCardStyled = styled.tr`
  display: inline-block;
  position: relative;
`;