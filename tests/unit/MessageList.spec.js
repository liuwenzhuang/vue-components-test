import { mount } from '@vue/test-utils'
import MessageList from '@/components/MessageList.vue'
import Message from '@/components/Message.vue'

describe('MessageList.vue', () => {
  let cmp
  const messages = ['New Msg1', 'New Msg2']
  beforeEach(() => {
    cmp = mount(MessageList, {
      propsData: { messages }
    })
  })
  it('should rewrite messages when passed', () => {
    expect(cmp.vm.messages).toEqual(messages)
  })
  it('should contain 2 li element', () => {
    expect(cmp.findAll('li').length).toBe(2)
    expect(
      cmp
        .findAll('li')
        .at(0)
        .text()
    ).toMatch('New Msg1')
  })
  it('should has ul tag', () => {
    expect(cmp.element.tagName).toBe('UL')
  })
  it('should contains Message Component or li elements', () => {
    expect(cmp.findComponent(Message).vm).toBeTruthy()
    expect(cmp.find('li')).toBeTruthy()
  })
  it('Message is not empty', () => {
    expect(cmp.findComponent(Message).element).toBeTruthy()
  })
  it('Message should has .message class', () => {
    expect(cmp.findComponent(Message).classes()).toContain('message')
  })
  it('Message should has style margin-top:10', () => {
    expect(cmp.findComponent(Message).attributes().style).toBe(
      'margin-top: 10px;'
    )
  })
  it('should has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot()
  })
})
