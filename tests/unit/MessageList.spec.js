import { mount } from '@vue/test-utils'
import MessageList from '@/components/MessageList.vue'

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
  it('should has the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot()
  })
})
