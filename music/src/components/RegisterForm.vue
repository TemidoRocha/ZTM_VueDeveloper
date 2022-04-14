<template>
  <div
    class="text-white text-center font-bold p-5 mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_message }}
  </div>
  <vee-form
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
        <vee-Field name="password" :bails="false" v-slot="{ field, errors }">
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
          <div class="text-red-600" v-for="error in errors" :key="error">
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
      :disabled="reg_in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
export default {
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alphaSpaces',
        email: 'required|email|min:3|max:100',
        age: 'required|minValue:18|maxValue:110',
        password: 'required|min:6|max:100',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Antarctica',
        tos: 'tos',
      },
      userData: {
        country: 'USA',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500', // color for in process
      reg_alert_message: 'Please wait! Your accoount is being created.',
    };
  },
  methods: {
    async register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = 'bg-blue-500';
      this.reg_alert_message = 'Please wait! Your account is being created.';

      try {
        await this.$store.dispatch('register', values);
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = 'bg-red-500';
        this.reg_alert_message = `An unexpected error occured.
        Please try again later.`;
        return;
      }

      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_message = 'Success! Your account has been created.';
      window.location.reload();
    },
  },
};
</script>

<style>
</style>
