<template>
  <nav class="bg-white/90 backdrop-blur-md border-b border-brand-soft sticky top-0 z-50 transition-all duration-300 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20 items-center">
        <div class="flex items-center gap-2 cursor-pointer" @click="$emit('change-category', 'beranda')">
          <div class="bg-brand-primary p-2 rounded-lg shadow-md shadow-brand-primary/20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="font-serif font-bold text-3xl text-gray-900 tracking-tight ml-1">World<span class="text-brand-primary">News</span></span>
        </div>

        <div class="hidden md:flex space-x-8 items-center">
          <a href="#" @click.prevent="$emit('change-category', 'beranda')" :class="currentCategory === 'beranda' ? activeClass : inactiveClass">Beranda</a>
          <a href="#" @click.prevent="$emit('change-category', 'nasional')" :class="currentCategory === 'nasional' ? activeClass : inactiveClass">Nasional</a>
          <a href="#" @click.prevent="$emit('change-category', 'internasional')" :class="currentCategory === 'internasional' ? activeClass : inactiveClass">Internasional</a>
          <a href="#" @click.prevent="$emit('change-category', 'hiburan')" :class="currentCategory === 'hiburan' ? activeClass : inactiveClass">Hiburan</a>
          <a href="#" @click.prevent="$emit('change-category', 'teknologi')" :class="currentCategory === 'teknologi' ? activeClass : inactiveClass">Teknologi</a>
          <button class="ml-4 bg-brand-primary hover:bg-brand-dark text-white px-5 py-2 rounded-full font-medium transition-colors shadow-sm shadow-brand-primary/30">
            Langganan
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  currentCategory: String
})

const activeClass = "text-brand-primary font-bold border-b-2 border-brand-primary py-2 transition-colors"
const inactiveClass = "text-gray-500 hover:text-brand-primary font-medium transition-colors"
</script>