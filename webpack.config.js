const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const prod = process.env.NODE_ENV === "production";

module.exports = {
  mode: prod
    ? "production"
    : "development" /* webpack serve시 inline에서 mode 플래그로 node_env 제어 가능 */,
  devtool: prod
    ? "hidden-source-map"
    : "eval" /* 소스맵 노출 여부. hidden-source-map을 통해 소스까기 방지 */,
  devServer: {
    historyApiFallback: true /* API 404 code 발생시 최초 라우팅 지점으로 자동 이동 */,
    port: 3000 /* 개발서버 포트 지정 */,
    hot: true /* 핫리로드 기능 */,
    open: true /* 개발 구동시 웹페이지 자동 열림 설정 */,
  },
  entry: "./src/index.tsx" /* 최초 진입점 경로 지정 */,
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
    ] /* import 경로 지정시 익스텐션 작성 생략 */,
  },
  module: {
    rules: [
      {
        test: /\.ts|tsx?$/,
        use: ["babel-loader", "ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.join(__dirname, "/dist") /* 빌드 출력물 경로 지정 */,
    filename: "bundle.js" /* 빌드 출력물 이름 지정 */,
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }) /* import React 생략. 자주 사용되는 모듈들을 미리 등록하여 매번 작성할 필요를 덜음. */,
    new webpack.HotModuleReplacementPlugin() /* cmd / ctrl + s 시 자동 리렌더링*/,
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }) /* SPA 렌더링 지점을 public/index.html로 지정 */,
  ],
};
