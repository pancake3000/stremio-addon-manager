<script setup>
import './assets/main.css'
import Header from './components/Header.vue'
import Summary from './components/Summary.vue'
import Configuration from './components/Configuration.vue'
import ThankYou from './components/ThankYou.vue'
import FAQ from './components/FAQ.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <header>
    <Header addonName="Stremio Addon Manager" addonSummary="Re-order and remove Stremio addons from your profile."
      addonTagline="For power users - use it at your own risk." />
  </header>
  <main>
    <Summary />
    <Configuration />
    <ThankYou />
    <FAQ />
  </main>
  <footer>
    <Footer />
  </footer>
</template>
