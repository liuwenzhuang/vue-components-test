import { mount } from '@vue/test-utils'
import Form from '@/components/Form.vue'
import axios from 'axios' // mock from jest

describe('Form.vue', () => {
  let cmp = mount(Form)
  beforeEach(() => {
    cmp = mount(Form)
    jest.resetModules()
    jest.clearAllMocks()
  })
  describe('methods', () => {
    it('onSubmit should call axios.get', () => {
      cmp.vm.onSubmit('test')
      expect(axios.get).toBeCalledWith(
        'https://jsonplaceholder.typicode.com/posts?q=test'
      )
    })
    it('onSubmit should return promise and set results attribute', async () => {
      const result = await cmp.vm.onSubmit('test')
      expect(result).toEqual({
        data: ['mock1', 'mock2', 'mock3']
      })
      expect(cmp.vm.results).toEqual(['mock1', 'mock2', 'mock3'])
    })
  })
})
