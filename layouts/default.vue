<template>
  <div class="container py-6">
    <main>
      <slot />
    </main>
    <footer class="mt-6 pt-4 text-sm text-gray-500">© {{ year }} Jie Blog</footer>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
const isDark = useState('isDark', () => false)
onMounted(() => {
  const saved = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const dark = saved ? saved === 'dark' : prefersDark
  document.documentElement.classList.toggle('dark', dark)
  isDark.value = dark
})
</script>


