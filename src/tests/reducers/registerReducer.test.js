import registerLoginReducer from '../../store/reducers/registerReducer';
import {
  USER_REGISTRATION_START,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAIL,
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from '../../store/actions/actionTypes';

const initialState = {
  loading: false,
  registrationStatus: false,
  errors: {},
  user: {},
};

describe('registerLoginReducer', () => {
  it('should return initial state', () => {
    const newState = registerLoginReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });
  
  describe('registration',() => {
    it('should change loading to true when registration starts', () => {
      const action = { type: USER_REGISTRATION_START };
      const newState = registerLoginReducer(initialState, action);
      expect(newState.loading).toEqual(true);
      expect(newState.loading).toEqual(true);
      expect(newState.errors).toEqual({});
      expect(newState.registrationStatus).toEqual(false);
    });

    describe('registrationStatus', () => {
      let action;
      beforeEach(() =>{
        initialState.user = {
          username: 'ssewilliam',
          email: 'sample@mail.com',
          password: '@password',
        };
        action = {
          payload: initialState.user
        };
      });

      it('should be true when registration is successfull', () => {
        action.type = USER_REGISTRATION_SUCCESS;
        const newState = registerLoginReducer(initialState, action);

        expect(newState.registrationStatus).toEqual(true);
        expect(newState.loading).toEqual(false);
        expect(newState.user).toEqual(initialState.user);
      });

      it('should be false when registration fails', () => {

        action.type = USER_REGISTRATION_FAIL;
        const newState = registerLoginReducer(initialState, action);

        expect(newState.registrationStatus).toEqual(false);
        expect(newState.loading).toEqual(false);
        expect(newState.user).toEqual(initialState.user);
      });
    });
  });
  describe('login',()=>{
    it('should change loading to true when login starts', () => {
      const action = { type: USER_LOGIN_START };
      const newState = registerLoginReducer(initialState, action);
      expect(newState.loading).toEqual(true);
      expect(newState.errors).toEqual({});
      expect(newState.loginStatus).toEqual(false);
    });
    describe('registrationStatus', () => {
      let action;
      beforeEach(() =>{
        initialState.user = {
          username: 'ssewilliam',
          password: '@password',
        };
        action = {
          payload: initialState.user
        };
      });
      it('should be true when login is successfull', () => {
        action.type = USER_LOGIN_SUCCESS;
        const newState = registerLoginReducer(initialState, action);

        expect(newState.loginStatus).toEqual(true);
        expect(newState.loading).toEqual(false);
        expect(newState.user).toEqual(initialState.user);
      });
      it('should be false when login fails', () => {

        action.type = USER_LOGIN_FAIL;
        const newState = registerLoginReducer(initialState, action);

        expect(newState.loading).toEqual(false);
        expect(newState.user).toEqual(initialState.user);
      });
    });
  });
});
