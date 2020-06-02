<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link :to="{name: 'Country', params: { country: 'JP' }}">Japan</router-link> |
      <router-link :to="{name: 'Country', params: { country: 'SG' }}">Singapore</router-link> |
      <router-link :to="{name: 'Country', params: { country: 'UA' }}">Ukraine</router-link> |
    </div>
    <router-view/>
  </div>
</template>
