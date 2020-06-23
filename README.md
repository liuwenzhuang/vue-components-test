# vue-components-test

使用`jest`和`@vue/test-utils`对vue components进行单元测试：

```bash
$ npm run test:unit
# watch模式
$ npm run test:unit -- --watch
```

## mount vs shallowMount

相同的api调用，但`shallowMount`是一个隔离的环境，不会渲染子组件。当待测试组件内有http调用、store操作等类似副作用时，慎用`mount`。

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
