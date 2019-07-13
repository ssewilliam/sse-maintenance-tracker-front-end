const baseUrl = 'http://localhost:8000/api/v1';
const AppUrls = {
  register: baseUrl+'/auth/signup',
  login: baseUrl+'/auth/login',
  requests: baseUrl+'/users/requests',
  requestsAdmin: baseUrl+'/requests',
  users: baseUrl+'/users'
};

export default AppUrls;
