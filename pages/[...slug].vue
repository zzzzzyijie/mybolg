<template>
  <div class="grid grid-cols-[1fr_240px] gap-6 items-start max-xl:grid-cols-1">
    <article class="prose prose-slate dark:prose-invert max-w-none xl:pr-8">
      <header class="mt-4 mb-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center text-2xl text-gray-300 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="返回首页"
        >
          ←
        </NuxtLink>
        <h1 class="mt-6 mb-2 leading-tight">{{ doc.title }}</h1>
        <p class="text-sm text-gray-500">{{ formatDate(doc.date) }} · {{ readingTime }}</p>
      </header>
      <ContentRenderer :value="doc" />
    </article>
    <aside
      class="sticky self-start hidden xl:block border-l border-gray-200 dark:border-gray-800 pl-8 pr-6 text-sm text-gray-500 mt-8"
      :style="{ marginLeft: '54px', top: '172px' }"
    >
      <p class="uppercase tracking-wider text-xs mb-4">目录</p>
      <ul>
        <li v-for="link in toc" :key="link.id" class="py-1">
          <a :href="`#${link.id}`" class="hover:underline">{{ link.text }}</a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: doc } = await useAsyncData(`doc-${route.path}`, () => queryContent(route.path).findOne())
if (!doc.value) throw createError({ statusCode: 404, statusMessage: 'Not found' })

const toc = computed(() => (doc.value?.body?.toc?.links || []) as Array<{ id: string, text: string }>)
const words = computed(() => String(doc.value?.readingTime?.words || '').toString())
const readingTime = computed(() => doc.value?.readingTime?.text || '')

function formatDate(d?: string) {
  if (!d) return ''
  const dt = new Date(d)
  const y = dt.getFullYear()
  const m = String(dt.getMonth() + 1).padStart(2, '0')
  const day = String(dt.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
</script>


