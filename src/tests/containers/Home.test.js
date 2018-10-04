import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Home } from '../../containers/Home/Home';


describe('Home',() => {
  let wrapper, parentWrapper;
  const props = {
    authStatus: true,
    onFetch: () => {},
    hasRequests:true,
    requests: [{}, {}],
  };

  const mockFetchArticles = jest.fn();
  beforeEach(() => {
    parentWrapper = mount(
      <BrowserRouter>
        <Home {...props} onFetch={mockFetchArticles} />
      </BrowserRouter>
    );
    wrapper = parentWrapper.find(Home);
  });

  it('should render requests without breaking', () => {
    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.find('div')).toHaveLength(14);
  });

  it('should logout users', () => {
    const wrapper = shallow(<Home {...props} history={{push: jest.fn()}} />);
    wrapper.instance().signOut();
    const username = localStorage.getItem('username');
    expect(username).toBe(false);
  });
  describe('onFetch gets called properly', () => {
    it('should call onFetch four times', () => {
      wrapper.instance();
      expect(mockFetchArticles.mock.calls).toHaveLength(3);
    });
    it('should call onFetch six times', () => {
      wrapper.instance().componentDidMount();
      expect(mockFetchArticles.mock.calls).toHaveLength(5);
    });    
  });
  describe('Home with hasRequests as false', () => {
    beforeEach(() => {
      props.hasRequests = false;
      parentWrapper = mount(
        <BrowserRouter>
          <Home {...props} onFetch={mockFetchArticles} />
        </BrowserRouter>
      );
      wrapper = parentWrapper.find(Home);
    });
    it('should render requests without breaking', () => {
      expect(wrapper.find('Button')).toHaveLength(1);
      expect(wrapper.find('div')).toHaveLength(4);
    });
  });
});
