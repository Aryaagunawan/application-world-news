<template>
  <div class="animate-fade-in py-8 lg:py-16">
    <div class="text-center max-w-4xl mx-auto mb-16 lg:mb-24" data-aos="fade-up" data-aos-duration="1000">
      <h1 class="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
        Jendela Informasi <br><span class="text-brand-primary italic">Dunia Anda.</span>
      </h1>
      <p class="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
        Pilih kategori redaksi di bawah ini untuk mulai membaca laporan jurnalistik mendalam, akurat, dan terpercaya dari berbagai penjuru bumi.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
      <div v-for="(cat, key) in categories" :key="key" v-show="key !== 'beranda'"
        @click="$emit('change-category', key)"
        class="group relative h-64 md:h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg shadow-gray-200/50 block"
        data-aos="fade-up" :data-aos-delay="cat.delay">
        <div class="absolute inset-0 img-zoom-container bg-gray-900">
          <img :src="cat.image" :alt="cat.name" class="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
        <div class="absolute inset-0 p-8 flex flex-col justify-end">
          <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div class="flex items-center gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              <span class="bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{{ cat.source }}</span>
            </div>
            <h3 class="font-serif text-3xl md:text-4xl font-bold text-white mb-2">{{ cat.name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { categories } from '../utils/constants';
defineEmits(['change-category']);
</script>