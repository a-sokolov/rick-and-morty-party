import styled from 'styled-components';

export const PartyHeadStyled = styled.p`
  font-weight: bold;
  font-size: 30px;
  margin-top: 50px;
`;

export const CharacterListStyled = styled.table`
  display: grid;
  border-spacing: 0;
  
  /* Задаем отступы для элементов таблицы.  */
  tr {
    margin-right: 30px;
    margin-top: 30px;
  };
  
  /* Убираем внутренние отступы у td элемента таблицы. */
  tr > td {
    padding: 0;
  };
  
  /* Убираем отступ справа у последнего элемента поиска. */
  tr:last-child {
    margin-right: 0;
  };
  
  /* Убираем отступ у 4-го элемента поиска. */
  tr:nth-child(4) {
    margin-right: 0;
  };
`;