module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react', 'react-hooks', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn', //bao loi neu khong khai bao dependencies
    'react/prop-types': 0,
    'react/display-name': 0,

    // MUI
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*']
      }
    ],

    // Common
    'no-console': 1, //tránh console.log khi build sản phẩm
    'no-lonely-if': 1, //phải dùng else if sau trong else thay vì dùng if để rõ ràng cú pháp
    'no-unused-vars': 1, // tránh tạo biến ko dùng
    'no-trailing-spaces': 1, //tránh thừa dấu cách khi code xong 1 dòng
    'no-multi-spaces': 1, //tránh dư thừa dấu cách khi code
    'no-multiple-empty-lines': 1, //tránh các dòng thừa
    'space-before-blocks': ['error', 'always'], //tạo 1 khoảng trống khi mở block
    'object-curly-spacing': [1, 'always'], //tạo khoảng trống đầu và cuối của object
    indent: ['warn', 2], //đảm bảo khoảng cách thò thụt hợp lý
    semi: [1, 'never'], //bỏ dấu ;
    quotes: ['error', 'single'], //đồng bộ khai báo string dùng ngoặc single
    'array-bracket-spacing': 1, //đảm báo ko thừa space trong array
    'linebreak-style': 0, //xuống dòng đúng cách
    'no-unexpected-multiline': 'warn', //tránh dư thừa các dòng không dùng đến
    'keyword-spacing': 1, //đảm bảo có space giữa các hàm hoặc if else
    'comma-dangle': 1, //tránh dư thừa dấu , ở cuối mỗi phần tử của object
    'comma-spacing': 1, //đảm bảo giữa các phần tử có dấu phẩy xong mới đến khoảng trống chứ ko phải khoảng trống trước dấu phẩy
    'arrow-spacing': 1, //khoảng cách giữa function với arrow
    'no-extra-boolean-cast': 0 // Xử lý ép kiểu boolean (default là error)
  }
}
