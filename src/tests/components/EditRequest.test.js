import React from 'react';
import { mount } from 'enzyme';
import { moxios } from 'moxios';
import EditRequest from '../../components/Requests/EditRequest/EditRequest';

describe('EditRequest', () => {
  let wrapper, title, type, description;
  const event = { preventDefault: () => {} };
  const props = {
    errors: {
      message: ''
    }
  };

  beforeEach(() => {
    wrapper = mount(<EditRequest />);

    jest.spyOn(event, 'preventDefault');

    title = wrapper.find('input[name="title"]');
    type = wrapper.find('select[name="type"]');
    description = wrapper.find('textarea[name="description"]');
  });
  it('should change states', () => {
    title.simulate('change', { target: { value: 'this is a title', name: 'title' } });
    type.simulate('change', { target: { value: 'repair', name: 'type' } });
    description.simulate('change', { target: { value: 'description', name: 'description' } });

    expect(wrapper.instance().state.hasFocus.title).toBeTruthy();
    expect(wrapper.instance().state.hasFocus.type).toBeTruthy();
    expect(wrapper.instance().state.hasFocus.description).toBeTruthy();
  });

  it('should call updateRequestEventHandler', async () => {
    const spy = jest.spyOn(wrapper.instance(), 'updateRequestEventHandler');
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().updateRequestEventHandler).toHaveBeenCalled();
  });
});
