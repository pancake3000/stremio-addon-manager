<script setup>
import { ref, onMounted } from 'vue'

const darkIcon = '🌙'
const lightIcon = '☀️'
let darkEnabled = ref(getDarkModePreference())
let toggleIcon = ref(darkEnabled.value ? lightIcon : darkIcon)

function getDarkModePreference() {
    const userSet = localStorage.getItem('darkMode')
    // User explicit setting takes precedence
    if (userSet !== null) {
        return userSet === 'true'
    } else {
        // If user has no preference, use system preference
        if (window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return true
        }
    }

    return false
}

function toggleMode() {
    darkEnabled.value = !darkEnabled.value
    localStorage.setItem('darkMode', darkEnabled.value)
    document.body.classList.toggle('dark')
    if (darkEnabled.value) {
        toggleIcon.value = lightIcon
    } else {
        toggleIcon.value = darkIcon
    }
}

onMounted(() => {
    if (darkEnabled.value) {
        document.body.classList.add('dark')
    }
})
</script>

<template>
    <h1 class="pull-right" style="margin: 0;">
        <a @click="toggleMode">{{ toggleIcon }}</a>
    </h1>
</template>
