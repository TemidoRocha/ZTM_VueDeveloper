import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import SongItem from '@/components/SongItem.vue';

describe('Snapshot SongItem.vue', () => {
  test('renders correctly', () => {
    const song = {
      docId: 'abs',
      modified_name: 'Olecas',
      display_name: 'Olecas',
      comment_count: 5,
    };

    const wrapper = shallowMount(SongItem, {
      propsData: { song },
      global: { components: { 'router-link': RouterLinkStub } }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
