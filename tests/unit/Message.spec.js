import { mount } from '@vue/test-utils'
import Message from '@/components/Message.vue'
import { logMessage } from '@/components/util'

jest.mock('@/components/util', () => ({
  logMessage: jest.fn()
}))

function mountCmp(propsData) {
  return mount(Message, {
    propsData
  })
}

describe('Message.vue', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })
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
      cmp.vm.$forceUpdate()
      cmp.find('.message').trigger('click')
      expect(logMessage).toBeCalled()
    })
    it('onMessageClick will $emit message-click event', () => {
      const stub = jest.fn()
      cmp.vm.$on('message-click', stub)
      cmp.vm.onMessageClick()
      expect(stub).toBeCalledWith('Msg1')
    })
  })

  describe('computed properties', () => {
    let cmp = mountCmp({ message: 'Msg1' })
    beforeEach(() => {
      cmp = mountCmp({ message: 'Msg1' })
    })
    it('reversedMessage should be 1gsM', () => {
      expect(cmp.vm.reversedMessage).toBe('1gsM')
    })
    it('reversedMessage should affected by message', () => {
      cmp.setProps({
        message: 'Msg2'
      })
      expect(cmp.vm.reversedMessage).toBe('2gsM')
    })
  })

  describe('watcher on nextMessage', () => {
    let cmp = mountCmp()
    let spy = jest.spyOn(console, 'debug')
    beforeEach(() => {
      spy = jest.spyOn(console, 'debug')
    })
    afterEach(() => {
      spy.mockReset()
    })
    it('should called if values change', done => {
      cmp = mountCmp()
      cmp.setData({
        nextMessage: 'Next Msg1'
      })
      // watcher的执行会推迟到下个更新点，故需在$nextTick中判断
      cmp.vm.$nextTick(() => {
        expect(cmp.vm.nextMessage).toBe('Next Msg1')
        expect(spy).toBeCalledWith(expect.stringContaining('Next Msg1'))
        done()
      })
    })
    it('should not called if values not change', done => {
      cmp = mount(Message, {
        data() {
          return {
            nextMessage: 'Next Msg2'
          }
        }
      })
      cmp.setData({
        nextMessage: 'Next Msg2'
      })
      cmp.vm.$nextTick(() => {
        expect(spy).not.toBeCalled()
        done()
      })
    })
  })
})
