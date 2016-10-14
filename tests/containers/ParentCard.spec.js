import React from 'react';

import { mount, shallow } from 'enzyme';
import {spy} from 'sinon';

import {ParentCard} from 'containers/ParentCard';

function renderParentCard() {
  const props = {
    meta: {id: 'testId', api: null},
    history: {
      goBack: spy()
    },
    fetchApiData: spy(),
    updateRoute: spy(),
    removeComponent: spy(),
    broadcastEvent: spy()
  };
  return shallow(<ParentCard {...props} />);
}

describe('ParentCard Container', () => {
  it('exists', () => {
    expect(ParentCard).to.exist;
    console.log(ParentCard);
  });

  // it('renders component', () => {
  //   let component = renderParentCard();
  //   console.log(component);
  //   expect(component).to.exist;
  //   expect(component).to.be.empty;
  // });
});
