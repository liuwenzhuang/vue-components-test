import { mount } from '@vue/test-utils'
import Message from '@/components/Message.vue'

function mountCmp(propsData) {
  return mount(Message, {
    propsData
  })
}

describe('Message.vue', () => {
  describe('properties', () => {
    it('should has a message property and author property which default value is LWZ', () => {
      const cmp = mountCmp({ message: 'Msg' })
      expect(cmp.props('message')).toBe('Msg')
      expect(cmp.props('author')).toBe('LWZ')
    })
    it('message should be type string', () => {
      const spy = jest.spyOn(console, 'error')
      mountCmp({ message: 1 })
      expect(spy).toBeCalledWith(
        expect.stringContaining('[Vue warn]: Invalid prop')
      )
      spy.mockReset()
    })
    it(`author's length should at least 2`, () => {
      const cmp = mountCmp()
      const author = cmp.vm.$options.props.author
      expect(author.validator).toBeTruthy()
      expect(author.validator('a')).toBe(false)
      expect(author.validator('ab')).toBe(true)
    })
    it('has no color attribute', () => {
      const cmp = mountCmp({ color: 'red' })
      expect(cmp.props('color')).toBeUndefined()
    })
  })

  describe('events', () => {
    let cmp = mountCmp({ message: 'Msg1' })
    beforeEach(() => {
      cmp = mountCmp({ message: 'Msg1' })
    })
    it('call onMessageClick when click on message', async () => {
      const spy = jest.spyOn(cmp.vm, 'onMessageClick')
      await cmp.vm.$forceUpdate()
      await cmp.find('.message').trigger('click')
      expect(spy).toBeCalled()
      spy.mockReset()
    })
    it('call onMessageClick when click on message by setMethods', () => {
      // TODO: setMethods will be deprecated
      const stub = jest.fn()
      cmp.setMethods({
        onMessageClick: stub
      })
      cmp.vm.$forceUpdate()
      cmp.find('.message').trigger('click')
      expect(stub).toBeCalled()
    })
    it('onMessageClick will $emit message-click event', () => {
      const stub = jest.fn()
      cmp.vm.$on('message-click', stub)
      cmp.vm.onMessageClick()
      expect(stub).toBeCalledWith('Msg1')
    })
  })
})
