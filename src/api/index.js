import ajax from "./ajax";
// import jsonp from 'jsonp'

// login
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");

// add user
export const reqAddUser = (user) => ajax("/manage/user/add", user, "POST");

// request weather
export const reqWeather = () => {

}