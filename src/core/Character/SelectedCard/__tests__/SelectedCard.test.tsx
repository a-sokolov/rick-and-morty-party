import React from 'react'
import { shallow } from 'enzyme'
import SelectedCard from '../index';
import {CharacterSelectedCardProperty} from '../interfaces';

describe('New SelectedCard', () => {
  const props: CharacterSelectedCardProperty = {
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
