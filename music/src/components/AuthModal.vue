<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    :class="{ hidden: !authModalShow }"
    id="modal"
  >
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block sm:p-0
      "
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >

      <div
        class="
          inline-block
          align-bottom
          bg-white
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
        "
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div
              class="modal-close cursor-pointer z-50"
              @click.prevent="toggleAuthModal"
              @keydown="toggleAuthModal"
            >
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'login',
                  'hover: text-blue-600': tab === 'register',
                }"
                href="#"
                @click.prevent="tab = 'login'"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                :class="{
                  'hover:text-white text-white bg-blue-600': tab === 'register',
                  'hover: text-blue-600': tab === 'login',
                }"
                href="#"
                @click.prevent="tab = 'register'"
                >Register</a
              >
            </li>
          </ul>

          <!-- Login Form -->
          <form v-show="tab === 'login'">
            <!-- Email -->
            <div class="mb-3">
              <label for="email" class="inline-block mb-2">
                Email
                <input
                  id="email"
                  type="email"
                  class="
                    block
                    w-full
                    py-1.5
                    px-3
                    text-gray-800
                    border border-gray-300
                    transition
                    duration-500
                    focus:outline-none focus:border-black
                    rounded
                  "
                  placeholder="Enter Email"
                />
              </label>
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label for="password" class="inline-block mb-2">
                Password
                <input
                  id="password"
                  type="password"
                  class="
                    block
                    w-full
                    py-1.5
                    px-3
                    text-gray-800
                    border border-gray-300
                    transition
                    duration-500
                    focus:outline-none focus:border-black
                    rounded
                  "
                  placeholder="Password"
                />
              </label>
            </div>
            <button
              type="submit"
              class="
                block
                w-full
                bg-purple-600
                text-white
                py-1.5
                px-3
                rounded
                transition
                hover:bg-purple-700
              "
            >
              Submit
            </button>
          </form>
          <!-- Registration Form -->
          <vee-form
            v-show="tab === 'register'"
            :validation-schema="schema"
            @submit="register"
            :initial-values="userData"
          >
            <!-- Name -->
            <div class="mb-3">
              <label for="name" class="inline-block mb-2">
                Name
                <vee-field
                  id="text"
                  name="name"
                  type="text"
                  class="
                    block
                    w-full
                    py-1.5
                    px-3
                    text-gray-800
                    border border-gray-300
                    transition
                    duration-500
                    focus:outline-none focus:border-black
                    rounded
                  "
                  placeholder="Enter Name"
                />
                <!--
                    the rules can also be set at the vee-field directly
                    :rules="{
                    required: true,
                  }" -->
                <!-- the name needs to be the same as the vee-field name that we want to link -->
                <ErrorMessage class="text-red-600" name="name" />
              </label>
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label for="emailRegistration" class="inline-block mb-2">
                Email
                <vee-field
                  id="emailRegistration"
                  name="email"
                  type="email"
                  class="
                    block
                    w-full
                    py-1.5
                    px-3
                    text-gray-800
                    border border-gray-300
                    transition
                    duration-500
                    focus:outline-none focus:border-black
                    rounded
                  "
                  placeholder="Enter Email"
                />
                <ErrorMessage class="text-red-600" name="email" />
              </label>
            </div>
            <!-- Age -->
            <div class="mb-3">
              <label for="age" class="inline-block mb-2">
                Age
                <vee-field
                  id="age"
                  name="age"
                  type="number"
                  class="
                    block
                    w-full
                    py-1.5
                    px-3
                    text-gray-800
                    border border-gray-300
                    transition
                    duration-500
                    focus:outline-none focus:border-black
                    rounded
                  "
                />
                <ErrorMessage class="text-red-600" name="age" />
              </label>
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label for="passwordRegistration" class="inline-block mb-2">
                Password
                <vee-Field
                  name="password"
                  :bails="false"
                  v-slot="{ field, errors }"
                >
                  <input
                    id="passwordRegistration"
                    type="password"
                    class="
                      block
                      w-full
                      py-1.5
                      px-3
                      text-gray-800
                      border border-gray-300
                      transition
                      duration-500
                      focus:outline-none focus:border-black
                      rounded
                    "
                    placeholder="Password"
                    v-bind="field"
                  />
                  <div
                    class="text-red-600"
                    v-for="error in errors"
                    :key="error"
                  >
                    {{ error }}
                  </div>
                </vee-Field>
              </label>
            </div>
            <!-- Confirm Password -->
            <div class="mb-3">
              <label for="confirm_password" class="inline-block mb-2">
                Confirm Password
                <vee-field
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  class="
                    block
                    w-full
                    py-1.5
                    px-3
                    text-gray-800
                    border border-gray-300
                    transition
                    duration-500
                    focus:outline-none focus:border-black
                    rounded
                  "
                  placeholder="Confirm Password"
                />
                <ErrorMessage class="text-red-600" name="confirm_password" />
              </label>
            </div>
            <!-- Country -->
            <div class="mb-3">
              <label for="country" class="inline-block mb-2">
                Country
                <vee-field
                  as="select"
                  id="country"
                  name="country"
                  class="
                    block
                    w-full
                    py-1.5
                    px-3
                    text-gray-800
                    border border-gray-300
                    transition
                    duration-500
                    focus:outline-none focus:border-black
                    rounded
                  "
                >
                  <option value="USA">USA</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Germany">Germany</option>
                  <option value="Antarctica">Antarctica</option>
                </vee-field>
                <ErrorMessage class="text-red-600" name="country" />
              </label>
            </div>
            <!-- TOS -->
            <div class="mb-3 pl-6">
              <label for="acceptTerms" class="inline-block">
                Accept terms of service
                <vee-field
                  if="acceptTerms"
                  name="tos"
                  value="1"
                  type="checkbox"
                  class="w-4 h-4 float-left -ml-6 mt-1 rounded"
                />
                <ErrorMessage class="text-red-600" name="tos" />
              </label>
            </div>
            <button
              type="submit"
              class="
                block
                w-full
                bg-purple-600
                text-white
                py-1.5
                px-3
                rounded
                transition
                hover:bg-purple-700
              "
            >
              Submit
            </button>
          </vee-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'AuthModal',
  data() {
    return {
      tab: 'login',
      schema: {
        name: 'required|min:3|max:100|alphaSpaces',
        email: 'required|email|min:3|max:100',
        age: 'required|minValue:18|maxValue:110',
        password: 'required|min:3|max:100',
        confirm_password: 'confirmed:@password',
        country: 'required|excluded:Antarctica',
        tos: 'required',
      },
      userData: {
        country: 'USA',
      },
    };
  },
  computed: {
    // ...mapState({
    //   modal: 'authModalShow',
    // }),
    ...mapState(['authModalShow']),
    // authModalShow() {
    //   return this.$store.getters.authModalShow;
    // },
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    register(values) {
      console.log(values);
    },
  },
};
</script>

<style>
</style>
