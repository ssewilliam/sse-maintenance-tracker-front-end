import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Home } from '../../containers/Home/Home';


describe('Home', () => {
  let wrapper, parentWrapper;
  let propsCombined ={
    authStatus: true,
    onFetch: () => {},
    hasRequests: true,
    requests: [{}, {}],
  };
  const mockFetchArticles = jest.fn();
  describe('loadingRequests is true',() => {
    const props = propsCombined;
    beforeEach(() => {
      parentWrapper = mount(
        <BrowserRouter>
          <Home {...props} onFetch={mockFetchArticles} />
        </BrowserRouter>
      );
      wrapper = parentWrapper.find(Home);
    });

    it('should render requests without breaking', () => {
      expect(wrapper.find('div')).toHaveLength(18);
    });
    describe('onFetch gets called properly', () => {
      it('should call onFetch twice', () => {
        wrapper.instance();
        expect(mockFetchArticles.mock.calls).toHaveLength(2);
      });
      it('should call onFetch four times', () => {
        wrapper.instance().componentDidMount();
        expect(mockFetchArticles.mock.calls).toHaveLength(4);
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
        expect(wrapper.find('div')).toHaveLength(18);
      });
    });
  });
  describe('loadingRequests is false',() => {
    const props = {
      propsCombined,
      errors: {
        message:'you have no requests',
      },
      loadingRequests:false,
    };
    beforeEach(() => {
      parentWrapper = mount(
        <BrowserRouter>
          <Home {...props} onFetch={mockFetchArticles} />
        </BrowserRouter>
      );
    });
    it('should render no requests without breaking',() => {
      wrapper = parentWrapper.find(Home);
      expect(wrapper.find('div')).toHaveLength(7);
    });
  });
});
