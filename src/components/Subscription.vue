<template>
  <div class="w-full px-8 pt-6 pb-8 mb-4">
    <div v-if='status === "new"'>
      <p>Get the latest COVID–19 travel news in your inbox</p>
      <form ref="formElement" @submit.prevent="response" autocomplete="off">
        <fieldset class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Name
          </label>
          <input class="shadow appearance-none border rounded w-full max-w-xs py-2 px-3
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="entry.1302821693" id="name" required placeholder="e.g. John Appleseed">
        </fieldset>
        <fieldset class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input class="shadow appearance-none border rounded w-full max-w-xs py-2 px-3
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="entry.1349569946" id="email" required placeholder="e.g. hello@example.com">
        </fieldset>
        <button class="bg-primary hover:bg-primary-light text-white font-bold py-2
          px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Sign up
        </button>
      </form>
    </div>
    <div v-if='status === "submitted"'>
      Thank you!
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Subscription',
  data() {
    return {
      status: 'new',
    };
  },
  methods: {
    response() {
      const { formElement } = this.$refs;
      const formData = new FormData(formElement);
      const url = 'https://docs.google.com/forms/d/10vtoUergPwRBk1usUwpZaEhlqEGWrD8OlOyqq5urfWw/formResponse';
      axios.post(url, formData).then((r) => { this.status = 'submitted'; });
    },
  },
};
</script>
