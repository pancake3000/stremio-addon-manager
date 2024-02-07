<script setup>
import './assets/main.css'
import Header from './components/Header.vue'
import DarkModeToggle from './components/DarkModeToggle.vue'
import Summary from './components/Summary.vue'
import Configuration from './components/Configuration.vue'
import ThankYou from './components/ThankYou.vue'
import FAQ from './components/FAQ.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <header>
    <DarkModeToggle />
    <Header addonName="Stremio Addon Manager"
      addonSummary="Effortlessly manage the order of your Stremio addons without re-installing."
      addonTagline="Including the default Cinemeta catalogs." addonLogo="logo.png" />
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
