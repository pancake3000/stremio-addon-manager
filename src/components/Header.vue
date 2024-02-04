<script setup>
defineProps({
  addonName: {
    type: String,
    required: true
  },
  addonLogo: {
    type: String,
    required: false
  },
  addonSummary: {
    type: String,
    required: false
  },
  addonTagline: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div class="hero">
    <div class="logo is-center is-vertical-align">
      <img v-if="addonLogo" :src="addonLogo" alt="Addon logo" />
      <h1 v-else>{{ addonName }}</h1>
      <h3>{{ addonSummary }}</h3>
      <small><em>{{ addonTagline }}</em></small>
    </div>
  </div>
</template>

<style scoped>
.logo {
  flex: 1;
  flex-direction: column;
  margin-top: 10%;
}

.logo svg {
  width: 100%;
  max-width: 300px;
}

.logo h3 {
  font-weight: 300;
  text-align: center;
}
</style>
