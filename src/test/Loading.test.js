import { shallow, mount } from 'enzyme';
import React from 'react';

import Loading from '../components/Loading/index';

describe('<ReposList />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(<Loading loading={true} />);
    expect(typeof renderedComponent.find('div')).toBe('object');
  });

  it('should not render anything if nothing interesting is provided', () => {
    const renderedComponent = shallow(
      <Loading loading={false} />
    );
    expect(renderedComponent.html()).toEqual(null);
  });
});
