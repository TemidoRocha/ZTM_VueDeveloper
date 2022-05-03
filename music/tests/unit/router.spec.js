import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import SongItem from '@/components/SongItem.vue';

describe('Router', () => {
  test('renders route link', () => {
    const song = {
      docId: 'abs',
    };

    const wrapper = shallowMount(SongItem, {
      propsData: {
        song,
      },
      global: { components: { 'router-link': RouterLinkStub } },
    });

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'song',
      params: { id: song.docId },
    });
  });
});
