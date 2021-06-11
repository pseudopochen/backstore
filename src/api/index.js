import ajax from "./ajax";
// import jsonp from 'jsonp'

const BASE_URL = ""; //"http://localhost:5000";

// login
export const reqLogin = (username, password) =>
  ajax(BASE_URL + "/login", { username, password }, "POST");


///////////// Category-related ///////////////
// get category list
export const reqCategories = (parentID) =>
  ajax(BASE_URL + "/manage/category/list", { parentID }, "GET");

// add category
export const reqAddCategory = (categoryName, parentID) =>
  ajax(BASE_URL + "/manage/category/add", { categoryName, parentID }, "POST");

// update category
export const reqUpdateCategory = (categoryID, categoryName) =>
  ajax(
    BASE_URL + "/manage/category/update",
    { categoryID, categoryName },
    "POST"
  );

// get category info from category ID
export const reqCategory = (categoryID) =>
  ajax(BASE_URL + "/manage/category/info", { categoryID }, "GET");

///////////// Product-related /////////////////
//get product list
export const reqProducts = (pageNum, pageSize) =>
  ajax(BASE_URL + "/manage/product/list", { pageNum, pageSize }, "GET");

// search product
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchName,
  searchType,
}) =>
  ajax(
    BASE_URL + "/manage/product/search",
    {
      pageNum,
      pageSize,
      [searchType]: searchName,
    },
    "GET"
  );

// update product status
export const reqUpdateStatus = (productID, status) =>
  ajax(
    BASE_URL + "/manage/product/updateStatus",
    { productID, status },
    "POST"
  );

// delete uploaded product image
export const reqDeleteImg = (name) =>
  ajax(BASE_URL + "/manage/img/delete", { name }, "POST");

// add or update product
export const reqAddOrUpdateProduct = (product) =>
  ajax(
    BASE_URL + "/manage/product/" + (product._id ? "update" : "add"),
    product,
    "POST"
  );

///////////// Role-related /////////////////
// get role list
export const reqRoles = () => ajax(BASE_URL + "/manage/role/list");

// add role
export const reqAddRole = (roleName) => ajax(BASE_URL + "/manage/role/add", { roleName }, 'POST');

// update role
export const reqUpdateRole = (role) => ajax(BASE_URL + "/manage/role/update", role, 'POST');

///////////// User-related /////////////////
// get user list
export const reqUsers = () => ajax(BASE_URL + "/manage/user/list");

// delete user
export const reqDeleteUser = (userID) => ajax(BASE_URL + "/manage/user/delete", { userID }, 'POST');

// add user
export const reqAddOrUpdateUser = (user) => ajax(BASE_URL + "/manage/user/" + (user._id ? 'update' : 'add'), user, 'POST');
// // add user
// export const reqAddUser = (user) =>
//   ajax(BASE_URL + "/manage/user/add", user, "POST");

// request weather
// export const reqWeather = () => {

// }
