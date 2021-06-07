// This following configuration for CracoLessPlugin is from https://ant.design/docs/react/use-with-create-react-app

const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],

  // following config for Babel is from post https://blog.csdn.net/qq_52135740/article/details/116649756
  babel: {
    plugins: [
      [
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: true, //设置为true即是less
        },
      ],
    ],
  },
};
