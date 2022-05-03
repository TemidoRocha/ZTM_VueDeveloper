import { createStore } from 'vuex';
import auth from '@/store/modules/auth';
import { cloneDeep } from 'lodash';
import player from '@/store/modules/player';

jest.mock('@/includes/firebase', () => ({
  auth: {
    signInWithEmailAndPassword: () => Promise.resolve(),
  }
}));

describe('Vuex store', () => {
  test('toggleAuth mutation sets userLoggedIn to true', () => {
    /**
     * We need to clone the store to have a single instance in each test
     */
    const clonedAuth = cloneDeep(auth);
    /**
     * Verifies that a certain number of assertions are called during a test.
     * This is often useful when testing asynchronous code, in order to make
     * sure that assertions in a callback actually got called.
     */
    expect.assertions(2);

    const store = createStore({
      modules: {
        auth: clonedAuth
      }
    });

    expect(store.state.auth.userLoggedIn).not.toBe(true);

    store.commit('toggleAuth');

    expect(store.state.auth.userLoggedIn).toBe(true);
  });

  test('toggleAuth action sets userLoggedIn to true', async () => {
    /**
     * We need to clone the store to have a single instance in each test
     */
    const clonedAuth = cloneDeep(auth);
    /**
     * Verifies that a certain number of assertions are called during a test.
     * This is often useful when testing asynchronous code, in order to make
     * sure that assertions in a callback actually got called.
     *
     * It is also useful to verify if the tests are leaking
     */
    expect.assertions(2);

    const store = createStore({
      modules: {
        auth: clonedAuth
      }
    });
    expect(store.state.auth.userLoggedIn).not.toBe(true);
    await store.dispatch('login', { email: '', password: '' });
    expect(store.state.auth.userLoggedIn).toBe(true);
  });

  test('playing returns true if is playing', async () => {
    const state = {
      sound: {
        playing: () => true
      }
    };

    const result = player.getters.playing(state);

    expect(result).toEqual(true);
  });
});
