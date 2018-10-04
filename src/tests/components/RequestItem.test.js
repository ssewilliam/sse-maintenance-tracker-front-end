import React from 'react';
import { shallow } from 'enzyme';
import RequestItem from  '../../components/Requests/RequestItem/RequestItem';

describe('<RequestItem />', () => {
  let pendingRequest, resolvedRequest, approvedRequest, defaultRequest;
  let pendingWrapper, resolvedWrapper, approvedWrapper, defaultWrapper;
  beforeEach(() =>{
    defaultRequest, approvedRequest = resolvedRequest = pendingRequest = {
      description: 'This is ssewilliams maintenance tracker',
      id: 1,
      title: 'this is a request',
      type: 'repair'
    };
  });
  describe('number of divs for requests', () => {
    it('should have two divs', () => {
      pendingRequest.status = 'pending';
      pendingWrapper = shallow(<RequestItem {...pendingRequest} />);

      resolvedRequest.status = 'resolved';
      resolvedWrapper = shallow(<RequestItem {...resolvedRequest} />);

      approvedRequest.status = 'approved';
      approvedWrapper = shallow(<RequestItem {...approvedRequest} />);
      
      defaultWrapper = shallow(<RequestItem {...defaultRequest} />);
      
      const pending = pendingWrapper.find('div').first();
      const approved = approvedWrapper.find('div').first();
      const resolved = resolvedWrapper.find('div').first();
      const _default = defaultWrapper.find('div').first();
      expect(pending.children()).toHaveLength(2);
      expect(approved.children()).toHaveLength(2);
      expect(resolved.children()).toHaveLength(2);
      expect(_default.children()).toHaveLength(2);
    });
  });
});
