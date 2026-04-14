<template>
  <div>
    <div v-if="loading" class="animate-pulse w-full py-8">
      <div class="h-10 bg-gray-200 rounded w-64 mb-12"></div>
      <div class="flex flex-col lg:flex-row gap-8 mb-16">
        <div class="lg:w-2/3 w-full h-[400px] lg:h-[500px] bg-gray-200 rounded-2xl"></div>
        <div class="lg:w-1/3 w-full flex flex-col justify-center gap-4">
          <div class="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div class="h-12 bg-gray-200 rounded w-full"></div>
          <div class="h-12 bg-gray-200 rounded w-4/5 mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>

    <div v-else class="animate-fade-in py-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-gray-200" data-aos="fade-up">
        <div class="flex items-center gap-4">
          <div class="w-2 h-12 bg-brand-primary rounded-full shadow-sm"></div>
          <div>
            <span class="text-brand-primary font-bold tracking-widest uppercase text-sm mb-1 block">{{ categorySource }}</span>
            <h1 class="font-serif text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">Kabar {{ categoryName }}</h1>
          </div>
        </div>
      </div>

      <a :href="featuredArticle?.link" target="_blank" v-if="featuredArticle" class="mb-24 group block cursor-pointer" data-aos="fade-up">
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div class="lg:w-2/3 w-full img-zoom-container rounded-2xl relative shadow-xl overflow-hidden border border-brand-soft bg-gray-100">
            <img :src="getImage(featuredArticle.image)" :alt="featuredArticle.title" class="w-full h-[350px] lg:h-[500px] object-cover" @error="handleImageError" />
            <div class="absolute top-5 left-5 bg-white/95 backdrop-blur text-brand-dark text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase shadow-md border border-brand-soft/50">
              Laporan Utama
            </div>
          </div>
          <div class="lg:w-1/3 w-full flex flex-col justify-center">
            <div class="flex items-center text-sm text-brand-primary font-bold mb-5 gap-3 uppercase tracking-widest">
              <span>{{ formatDateShort(getDate(featuredArticle)) }}</span>
              <span class="w-1.5 h-1.5 rounded-full bg-brand-soft"></span>
              <span>{{ getReadTime(getSnippet(featuredArticle)) }} Mnt Baca</span>
            </div>
            <h2 class="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-[1.15] group-hover:text-brand-primary transition-colors">
              {{ featuredArticle.title }}
            </h2>
            <p class="text-gray-600 mb-8 text-lg leading-relaxed line-clamp-3 font-light">
              {{ getSnippet(featuredArticle) }}
            </p>
          </div>
        </div>
      </a>

      <div class="mb-10 flex items-center justify-between" data-aos="fade-up">
        <h3 class="font-serif text-3xl font-bold text-gray-900 border-b-2 border-brand-primary pb-2 inline-block">Berita Terkini Lainnya</h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
        <a :href="article.link" target="_blank" v-for="(article, index) in gridArticles" :key="index" class="group cursor-pointer flex flex-col block" data-aos="fade-up">
          <div class="img-zoom-container rounded-xl mb-6 bg-gray-100 shadow-md border border-gray-50 overflow-hidden relative">
            <img :src="getImage(article.image)" :alt="article.title" class="w-full h-64 object-cover" @error="handleImageError" />
          </div>
          <div class="flex flex-col flex-grow px-1">
            <div class="flex items-center text-xs text-gray-500 font-medium mb-4 gap-2">
              <span class="bg-brand-light text-brand-primary border border-brand-soft px-3 py-1 rounded-full font-bold tracking-wider uppercase">{{ categorySource }}</span>
              <span>&bull;</span>
              <span class="tracking-wide">{{ formatDateShort(getDate(article)) }}</span>
            </div>
            <h3 class="font-serif text-2xl font-bold text-gray-900 mb-4 leading-tight line-clamp-3 group-hover:text-brand-primary transition-colors">
              {{ article.title }}
            </h3>
            <p class="text-base text-gray-600 mb-5 line-clamp-3 flex-grow leading-relaxed font-light">
              {{ getSnippet(article) }}
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getImage, handleImageError, formatDateShort, getDate, getSnippet, getReadTime } from '../utils/helpers';

// Menerima data yang dilempar dari App.vue
defineProps({
  loading: Boolean,
  categoryName: String,
  categorySource: String,
  featuredArticle: Object,
  gridArticles: Array
});
</script>