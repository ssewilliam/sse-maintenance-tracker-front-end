import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { SingleRequest } from '../../containers/Requests/SingleRequest/SingleRequest';


describe('SingleRequest',() => {
  let wrapper, parentWrapper;
  const props = {
    authStatus: true,
    onFetch: () => {},
    hasRequest: true,
    request: [{}],
    fetchRequest: {
      loading: false,
      hasRequest: false,
      errors: {},
      requests: [],
    },
    match: {
      params: {
        requestId: '2',
      },
    },
  };

  const mockFetchArticles = jest.fn();
  beforeEach(() => {
    parentWrapper = mount(
      <BrowserRouter>
        <SingleRequest {...props}/>
      </BrowserRouter>
    );
    wrapper = parentWrapper.find(SingleRequest);
  });

  it('should render requests without breaking', () => {
    expect(wrapper.find('div')).toHaveLength(15);
  });

  describe('SingleRequest with hasRequests as false', () => {
    beforeEach(() => {
      props.hasRequest = false;
      parentWrapper = mount(
        <BrowserRouter>
          <SingleRequest {...props} onFetch={mockFetchArticles} />
        </BrowserRouter>
      );
      wrapper = parentWrapper.find(SingleRequest);
    });
    it('should render requests without breaking', () => {
      expect(wrapper.find('div')).toHaveLength(7);
    });
  });
});
