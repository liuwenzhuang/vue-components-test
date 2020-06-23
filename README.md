# vue-components-test

使用`jest`和`@vue/test-utils`对vue components进行单元测试：

```bash
$ npm run test:unit
# watch模式
$ npm run test:unit -- --watch
```

## eslint中定义@vue/prettier规则

```json
"rules": {
  "prettier/prettier": [
    "warn",
    {
      "singleQuote": true,
      "semi": false,
      "trailingComma": "none"
    }
  ]
}
```
