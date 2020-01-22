import React from 'react';
import { shallow } from 'enzyme';

import { SAVE_CARD } from "../constants/index";
import Reducer from '../reducers/index';
import { saveCard } from '../actions/index';
import PaymentForm from '../components/PaymentForm/index';

describe('<PaymentForm />', () => {
    it('should render its heading', () => {
      const renderedComponent = shallow(<PaymentForm />);
      expect(renderedComponent.contains("Card Number")).toBe(true);
    });
  
  });

describe('Root Actions', () => {
  describe('saveCard', () => {
    it('should return the correct type and the passed name', () => {
      const fixture = 'Max';
      const expectedResult = {
        type: SAVE_CARD,
        payload: fixture
      };

      expect(saveCard(fixture)).toEqual(expectedResult);
    });
  });
});

describe('Root Reducer', () => {
  let state;
  beforeEach(() => {
    state = {
      cardDetails: {},
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(Reducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the saveCard action correctly', () => {
    const fixture = '41000000V';
    const expectedResult = { ...state, cardDetails: fixture };
    expect(Reducer(state, saveCard(fixture))).toEqual(expectedResult);
  });
});

