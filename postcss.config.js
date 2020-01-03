module.exports = {
  plugins: {
    autoprefixer: {}
  },
  module:{
    rules:[
      {
        // 3) less处理loader配置
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
    ]
  }


}
