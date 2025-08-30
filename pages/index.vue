<template>
  <section>
    <div class="text-center mt-4">
      <div class="flex justify-center items-center gap-4 mb-0">
        <h1 class="font-extrabold tracking-tight text-3xl">Jie's</h1>
        <button @click="toggleTheme" class="border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 rounded-full px-1.5 py-0.5 mt-0 text-xs opacity-70 hover:opacity-100 transition">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>
      <p class="text-gray-500 dark:text-gray-400 mt-1">写作与构建，保持简洁。</p>
      <br />
      <br />
    </div>
    <p class="text-gray-500 mt-10">文章</p>
    <ul class="mt-2 divide-y divide-gray-200 dark:divide-gray-800">
      <li v-for="post in posts" :key="post._path" class="py-3 grid grid-cols-[1fr_auto] gap-4 items-baseline">
        <NuxtLink :to="post._path" class="font-semibold text-lg hover:underline">{{ post.title }}</NuxtLink>
        <time class="text-sm text-gray-500 whitespace-nowrap">{{ formatDate(post.date) }}</time>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const { data } = await useAsyncData('posts', () => queryContent('/posts').where({ draft: { $ne: true } }).sort({ date: -1 }).find())
const posts = computed(() => data.value || [])
function formatDate(d?: string) {
  if (!d) return ''
  const dt = new Date(d)
  const y = dt.getFullYear()
  const m = String(dt.getMonth() + 1).padStart(2, '0')
  const day = String(dt.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const isDark = useState('isDark', () => false)
onMounted(() => {
  const saved = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const dark = saved ? saved === 'dark' : prefersDark
  document.documentElement.classList.toggle('dark', dark)
  isDark.value = dark
})

function toggleTheme() {
  isDark.value = !isDark.value
  const t = isDark.value ? 'dark' : 'light'
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', t)
}
</script>


