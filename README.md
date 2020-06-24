# vue-components-test

使用`jest`和`@vue/test-utils`对vue components进行单元测试：

```bash
$ npm run test:unit
# watch模式
$ npm run test:unit -- --watch
```

## mount vs shallowMount

相同的api调用，但`shallowMount`是一个隔离的环境，不会渲染子组件。当待测试组件内有http调用、store操作等类似副作用时，慎用`mount`。

## jest mock依赖

在单独的测试文件中mock：

```javascript
// Form.spec.js
jest.mock('axios', () => ({
  get: jest.fn()
}))

import axios from 'axios' // 使用mock的版本
```

或者将mock分离到`__mocks__`目录下的单独文件内，保持文件名称和依赖名称一致：

```javascript
// __mocks__/axios.js
module.exports = {
  get: jest.fn()
}

// Form.spec.js
import axios from 'axios' // 使用自动注入的mock版本
```

为保证mock的依赖在每个用例执行时都是“干净”的，最好在`beforeEach`中进行清理工作，防止用例之间的相互影响：

```javascript
// Form.spec.js
beforeEach(() => {
  jest.resetModules()
  jest.clearAllMocks()
})
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
