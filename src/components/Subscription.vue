<template>
  <div class="main-container">
    <div class="main-container__inner">
      <div class="flex flex-col items-center sm:flex-row sm:items-start sm:pt-6 md:pt-8">
        <div class="mb-12 sm:mb-0 sm:mr-4">
          <div id="subscription">
            <div v-if='status === "new"'>
              <h2>Subscribe</h2>
              <p>Get the latest COVID-19 travel news in your inbox</p>
              <form ref="formElement" @submit.prevent="response" autocomplete="off">
                <input class="appearance-none block w-full sm:max-w-xs py-2 px-3 mb-2
                  border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                  name="entry.1302821693" id="name" required placeholder="Enter your name">
                <input class="appearance-none block w-full sm:max-w-xs py-2 px-3 mb-4
                  border rounded-md text-gray-700 focus:outline-none focus:shadow-outline"
                  name="entry.1349569946" id="email" required placeholder="Enter your email">
                <button class="w-full sm:max-w-xs bg-primary text-white py-2
                  px-4 rounded-md focus:outline-none focus:shadow-outline"
                  type="submit" id="subscribe-button">
                  Subscribe
                </button>
              </form>
            </div>
            <div v-if='status === "submitted"'>
              <p class="mb-0">Awesome! You’ll get the latest updates in your inbox.</p>
            </div>
          </div>
        </div>
        <img class="h-auto w-8/12 md:w-6/12" src="@/assets/images/undraw_traveling.svg">
      </div>
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
      const url = process.env.VUE_APP_SUBSCRIPTION_FORM_URL;
      // Google Forms fails due to CORS so assume data is accepted
      axios.post(url, formData).finally(() => { this.status = 'submitted'; });
    },
  },
};
</script>
