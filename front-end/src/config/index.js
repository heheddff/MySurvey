// const baseURL = 'http://api.survy.com:808'
var baseURL = 'http://127.0.0.1/vue-questionnaire-master/api/'
if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://api.survy.com:808'
}
export default baseURL
