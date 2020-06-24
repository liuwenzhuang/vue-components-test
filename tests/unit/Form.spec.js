import { mount, shallowMount } from '@vue/test-utils'
import Form from '@/components/Form.vue'
import Message from '@/components/Message.vue'
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

  describe('slots', () => {
    let cmp = shallowMount(Form)
    it('should render div.result', () => {
      cmp = shallowMount(Form, {
        slots: {
          default: '<div class="result"></div>'
        }
      })
      expect(cmp.findAll('.result').length).toBe(1)
    })
    it('should render component correctly', () => {
      const SlotWrapper = {
        render(h) {
          return h(Message, {
            props: {
              message: 'Msg'
            }
          })
        }
      }
      cmp = shallowMount(Form, {
        slots: {
          default: SlotWrapper
        }
      })
      expect(cmp.findComponent(Message).vm).toBeTruthy()
    })
  })

  describe('named slots', () => {
    it('should render submit button when no button slot', () => {
      const cmp = shallowMount(Form)
      expect(cmp.findAll('button[type="submit"]').length).toBe(1)
    })
    it('should render button slot correctly', () => {
      const cmp = shallowMount(Form, {
        slots: {
          button: '<a href="javascript:;">Submit Button</a>'
        }
      })
      expect(
        cmp
          .find('a[href="javascript:;"]')
          .text()
          .trim()
      ).toBe('Submit Button')
    })
  })

  describe('scoped slots', () => {
    beforeEach(() => {
      jest.resetModules()
      jest.clearAllMocks()
    })
    it('should render by results attribute in Form.vue', async done => {
      const cmp = mount(Form, {
        scopedSlots: {
          default: `<template v-slot:default="formProps">
            <div class="result-item" v-for="item in formProps.results" :key="item">{{ item }}</div>
          </template>`
        }
      })
      await cmp.vm.onSubmit('a')
      cmp.vm.$nextTick(() => {
        expect(cmp.findAll('.result-item').length).toBe(3)
        done()
      })
    })
  })
})
