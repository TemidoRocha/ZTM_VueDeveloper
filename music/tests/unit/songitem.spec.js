import SongItem from '@/components/SongItem.vue';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';

describe('SongItem', () => {
  test('render song.display_name', () => {
    const song = {
      display_name: 'test',
    };

    const wrapper = shallowMount(SongItem, {
      propsData: {
        song
      },
      global: { components: { 'router-link': RouterLinkStub } }
    });

    const compositionAuthor = wrapper.find('.text-gray-500');

    expect(compositionAuthor.text()).toBe(song.display_name);

    // avoid boolean assertion since they are not very helpfull
    // expect(compositionAuthor.text() === song.display_name).toBe(false);
  });

  test('render song.docId in id attrinbute', () => {
    const song = {
      docId: 'abc',
    };

    const wrapper = shallowMount(SongItem, {
      propsData: {
        song
      },
      global: { components: { 'router-link': RouterLinkStub } }
    });

    // attributes will retrieve the attributes on the root element
    // and not from the children components
    expect(wrapper.attributes().id).toBe(`song-id-${song.docId}`);

    expect(wrapper.classes()).toContain(`song-class-id-${song.docId}`);
  });
});
