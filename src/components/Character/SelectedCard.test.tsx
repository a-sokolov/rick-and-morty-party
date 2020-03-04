import React from 'react'
import { shallow } from 'enzyme'
import SelectedCard, { ICharacterSelectedCard } from './SelectedCard';

describe('New SelectedCard', () => {
  const props: ICharacterSelectedCard = {
    label: 'Test label',
    image: 'Test image',
    skeleton: 'Test skeleton'
  };

  describe('initial', () => {
    const selectedCard = shallow(<SelectedCard {...props} />);

    it('render', () => {
      expect(selectedCard.find('img')).toHaveLength(1);
    });
  });
})
