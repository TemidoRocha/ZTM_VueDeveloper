<template>
  <div
    class="text-white text-center font-bold p-4 mb-4"
    :class="login_alert_variant"
    v-if="login_show_alert"
  >
    {{ login_alert_message }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label for="email" class="inline-block mb-2">
        Email
        <vee-field
          id="email"
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
    <!-- Password -->
    <div class="mb-3">
      <label for="password" class="inline-block mb-2">
        Password
        <vee-field
          id="password"
          name="password"
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
        <ErrorMessage class="text-red-600" name="password" />
      </label>
    </div>
    <button
      type="submit"
      :disabled="login_in_submission"
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
</template>

<script>
export default {
  data() {
    return {
      loginSchema: {
        email: 'required|email|min:3|max:100',
        password: 'required|min:6|max:100',
      },
      /**
       * to disable and enable the login button while submitting the form
       * to avaoid unecessary requests
       */
      login_in_submission: false,
      /**
       * to disable and enable the login button while submitting the form
       * to avaoid unecessary requests
       */
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500', // color for in process
      login_alert_message: 'Please wait! We are logging you in.',
    };
  },
  methods: {
    async login(values) {
      this.login_show_alert = true;
      this.login_in_submission = true;
      this.login_alert_variant = 'bg-blue-500';
      this.login_alert_message = 'Please wait! We are logging you in.';

      try {
        await this.$store.dispatch('login', values);
      } catch (error) {
        this.login_in_submission = false;
        this.login_alert_variant = 'bg-red-500';
        this.login_alert_message = 'Invalid login details.';
        return;
      }
      this.login_alert_variant = 'bg-green-500';
      this.login_alert_message = 'Success! Your are now logged in.';
    },
  },
};
</script>

<style>
</style>
