# Retail Back Office Management System

This project is a back-store administrative system for managing products, users, roles of the users and 3 types of charts. 

The front-end was built using React-17, Redux and the Ant-Design UI Library.

The back-end, which was built using NodeJS, MongoDB, Mongoose and Express, is under another repository named "backstore_server".

A set of screenshot of the major modules of the app is under "public/screenshots".

## Techniques Used in the Front-End

* Data display and user-interaction were built using "react" and "antd". Rich-text-editor for entering product details was built using "react-draft-wysiwyg". Charts for bar-plot, line-plot and pie-plot were built using "echarts" and "echarts-for-react".

* Front-end routing (two levels of routing) was built using "react-router-dom".

* State management was built using "redux", "react-redux" with async middleware "redux-thunk".

* "PureComponent" was used to improve rendering efficiency.

* React-17 version of the life-cycle methods (including "getDerivedStateFromProps") were used.

## Techniques Used in the Back-End

* Product and user data were stored using MongoDB. Schemas were defined for 4 different types of data. I used MongoDB Atlas for hosting the database.

* The ODM for interactions between Node and MongoDB was Mongoose.

* Image file uploading was handled using "multer" middleware.

* Password encription was handled using MD5 implemented in "blueimp-md5".

## Interactions between the Front-End and the Back-End

* ajax requests implemented using "axios", "jsonp" and promise/async/await.

* All APIs (20 of them) were tested and updated using "postman" before and during the implementation of the Front-End.







