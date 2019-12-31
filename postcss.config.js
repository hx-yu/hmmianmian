module.exports = {
  plugins: {
    autoprefixer: {}
  },
  module:{
    rules:[{
      test:/\.less$/,
      use:['style-loader','css-loader','less-loader']
    }]
  }
}
