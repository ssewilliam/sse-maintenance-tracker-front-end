import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { SingleRequest } from '../../containers/Requests/SingleRequest/SingleRequest';


describe('SingleRequest',() => {
  let wrapper, parentWrapper;
  const props = {
    authStatus: true,
    onFetch: () => {},
    hasRequests: true,
    request: [{}],
    fetchRequest: {
      loading: false,
      hasRequests: false,
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
    expect(wrapper.find('Button')).toHaveLength(3);
    expect(wrapper.find('div')).toHaveLength(8);
  });

  it('should logout users', () => {
    const wrapper = shallow(<SingleRequest {...props} history={{push: jest.fn()}} />);
    wrapper.instance().signOut();
    const username = localStorage.getItem('username');
    expect(username).toBe(false);
  });
  describe('SingleRequest with hasRequests as false', () => {
    beforeEach(() => {
      props.hasRequests = false;
      parentWrapper = mount(
        <BrowserRouter>
          <SingleRequest {...props} onFetch={mockFetchArticles} />
        </BrowserRouter>
      );
      wrapper = parentWrapper.find(SingleRequest);
    });
    it('should render requests without breaking', () => {
      expect(wrapper.find('Button')).toHaveLength(1);
      expect(wrapper.find('div')).toHaveLength(4);
    });
  });
});
