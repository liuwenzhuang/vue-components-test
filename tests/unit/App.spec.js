import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  let cmp
  const messages = ['New Msg1', 'New Msg2']
  beforeEach(() => {
    cmp = shallowMount(App, {
      data() {
        return { messages }
      }
    })
  })
  it('messages should equal messages', () => {
    expect(cmp.vm.messages).toEqual(messages)
  })
  it('should match html structure', () => {
    expect(cmp.element).toMatchSnapshot()
  })
})
