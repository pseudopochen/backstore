import axios from "axios";

const BASE_URL = "http://localhost:5000";

function ajax(url, data = {}, type = "GET") {
  if (type === "GET") {
    return axios.get(url, { params: data });
  } else {
    return axios.post(url, data);
  }
}

// 1. POST /login
const reqLogin = (username, password) =>
  ajax(BASE_URL + "/login", { username, password }, "POST");

reqLogin("admin", "admin")
  .then((response) => {
    console.log(response.data);
  })
  .catch((err) => {
    console.log(err);
  });

// 2. POST /manage/user/add
const reqAddUser = (user) => ajax(BASE_URL + "/manage/user/add", user, "POST");

reqAddUser({
  username: "a",
  password: "b",
  phone: "123",
  email: "a@b.c",
})
  .then((res) => {
    console.log(res.data);
  })
  .catch((e) => {
    console.log(e);
  });

// 6. GET /manage/category/list
const reqCategories = (parentID) =>
  ajax(BASE_URL + "/manage/category/list", { parentID }, "GET");

reqCategories("0")
  .then((res) => {
    console.log(res.data);
  })
  .catch((e) => {
    console.log(e);
  });

// 7. POST /manage/category/add
const reqAddCategory = (categoryName, parentID) =>
  ajax(BASE_URL + "/manage/category/add", { categoryName, parentID }, "POST");

// reqAddCategory("Dell", "60c0f5b4d61f7fdc39c0f06a")
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((e) => console.log(e));

// 9. GET /manage/category/info
const reqCategory = (categoryID) =>
  ajax(BASE_URL + "/manage/category/info", { categoryID }, "GET");

reqCategory("60c11164d61f7fdc39c0f07f")
  .then((res) => {
    console.log("get category info:", res.data);
  })
  .catch((e) => {
    console.log(e);
  });

//
const reqProducts = (pageNum, pageSize) =>
  ajax(BASE_URL + "/manage/product/list", { pageNum, pageSize }, "GET");

//
const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) =>
  ajax(
    BASE_URL + "/manage/product/search",
    {
      pageNum,
      pageSize,
      [searchType]: searchName,
    },
    "GET"
  );
