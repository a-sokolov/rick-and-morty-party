import styled from 'styled-components';
import {cardSize} from '../Card/styles';

export const CardLabelStyled = styled.div`
  position: absolute;
  bottom: 14px;
  width: inherit;
  font-style: normal;
  font-weight: 300;   
  font-size: 24px;
  color: #FFFFFF;
`;

export const SelectedCardStyled = styled.div`
  display: inline-block;
  position: relative;
  ${cardSize}
`;

export const SelectedCardImageStyled = styled.img`
  width: inherit;
  height: inherit;
`;