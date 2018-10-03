// import React from 'react';
// import SubmitRequest from '../../containers/Requests/SubmitRequest/SubmitRequest';
// import { mount } from 'enzyme';
// import moxios from 'moxios';

// // it('renders without crashing', () => {
// //   const div = document.createElement('div');
// //   ReactDOM.render(<App />, div);
// //   ReactDOM.unmountComponentAtNode(div);
// // });
// describe('dfjhs', () => {
//   beforeEach(() => {
//     moxios.install();
//   });
//   afterEach(() => {
//     moxios.uninstall();
//   });
//   it('should have specific for bookmark request', () => {
//     // const wrapper = mount( <SubmitRequest /> );
//     // const expectedResponse = {
//     //   title: '',
//     //   type: '',
//     //   description: ''
//     // };
//     // const bookmarkButton = wrapper.find('form');
//     // bookmarkButton.simulate('submit');
//     // const spy = jest.spyOn(wrapper.instance(), 'notifyDone');
//     // wrapper.instance().createRequest();
//     // expect(spy).toHaveBeenCalled();
//     // moxios.wait(() => {
//     //   const request = moxios.requests.mostRecent();
//     //   request.respondWith({
//     //     status: 400,
//     //     response: {
//     //       title: '',
//     //       type: '',
//     //       description: ''
//     //     },
//     //   })
//     //     .then((error) => {
//     //       // expect(error.data).toEqual(expectedResponse);
//     //       done();
//     //     });
//     // });
//   });
//   it('should have specific response for bookmark request', done => {
//     const wrapper = mount( <SubmitRequest /> );
//     const expectedResponse = {
//       title: '',
//       type: '',
//       description: ''
//     };
//     const bookmarkButton = wrapper.find('form');
//     bookmarkButton.simulate('submit');
//     const notifyDone = jest.fn();
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: {
//           title: '',
//           type: '',
//           description: ''
//         },
//       })
//         .then((error) => {
//           expect(error.data).toEqual(expectedResponse);
//           done();
//         });
//     });
//     // const data = {
//     //   message: 'returned successfully',
//     //   requests: [{
//     //     description: 'This is ssewilliams maintenance tracker',
//     //     id: 1,
//     //     status: 'pending',
//     //     title: 'this is a request',
//     //     type: 'repair'
//     //   }],
//     //   'status': 'OK'
//     // };
        
//     // moxios.stubRequest('/users/requests', {
//     //   status: 200,
//     //   response: {
//     //     results: data,
//     //   },
//     // });

//     // const result = await wrapper.instance().eventListner;//('me-and-william');
//     // console.log(result().data);
//     // expect(result).toBeInstanceOf(Promise);
//   });
// });