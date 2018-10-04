import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ManageRequest from  '../../components/Requests/ManageRequests/ManageRequests';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><ManageRequest /></BrowserRouter> , div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Manage Requests', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  it('should have specific response for approve request', done => {
    const wrapper = mount(<ManageRequest />);
    const expectedResponse = {
      message: 'request approved successfully',
    };
    const approveButton = wrapper.find('button').at(0);
    approveButton.simulate('click');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse
      })
        .then((res) => {
          expect(res.data).toEqual(expectedResponse);
          done();
        });
    });
  });
  it('should have specific response for resolve request', done => {
    const wrapper = mount(<ManageRequest />);
    const expectedResponse = {
      message: 'request approved successfully',
    };
    const resolveButton = wrapper.find('button').at(1);
    resolveButton.simulate('click');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse
      })
        .then((res) => {
          expect(res.data).toEqual(expectedResponse);
          done();
        });
    });
  });
  it('should have specific response for disapprove request', done => {
    const wrapper = mount(<ManageRequest />);
    const expectedResponse = {
      message: 'request approved successfully',
    };
    const resolveButton = wrapper.find('button').at(2);
    resolveButton.simulate('click');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse
      })
        .then((res) => {
          expect(res.data).toEqual(expectedResponse);
          done();
        });
    });
  });  
});
