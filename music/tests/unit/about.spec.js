import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import About from '@/views/AboutView.vue';

const store = createStore();

describe('About.vue', () => {
  test('renders inner test', () => {
    const wrapper = shallowMount(About, {
      global: { plugins: [store] }
    });

    expect(wrapper.text()).toContain('About');
  });
});
