import ajax from "./ajax";

// login
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");

// add user
export const reqAddUser = (user) => ajax("/manage/user/add", user, "POST");
