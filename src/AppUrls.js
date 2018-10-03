const baseUrl = 'https://maintenance-tracer-with-db.herokuapp.com/api/v1';
const AppUrls = {
  register: baseUrl+'/auth/signup',
  login: baseUrl+'/auth/login',
  requests: baseUrl+'/users/requests'
};

export default AppUrls;
