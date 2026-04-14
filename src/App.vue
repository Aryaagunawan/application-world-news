<template>
  <div class="min-h-screen flex flex-col">
    <Navbar :currentCategory="currentCategoryKey" @change-category="changeCategory" />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
      
      <div v-if="currentCategoryKey === 'beranda'" class="py-8 lg:py-16">
        <div class="text-center max-w-4xl mx-auto mb-16 lg:mb-24" data-aos="fade-up">
          <h1 class="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Jendela Informasi <br><span class="text-brand-primary italic">Dunia Anda.</span>
          </h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          <div v-for="(cat, key) in categories" :key="key" v-show="key !== 'beranda'"
            @click="changeCategory(key)"
            class="group relative h-64 md:h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg block" data-aos="fade-up">
            <div class="absolute inset-0 img-zoom-container bg-gray-900">
              <img :src="cat.image" :alt="cat.name" class="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            <div class="absolute inset-0 p-8 flex flex-col justify-end">
              <h3 class="font-serif text-3xl font-bold text-white mb-2">{{ cat.name }}</h3>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="loading" class="animate-pulse w-full py-8">
        <div class="h-10 bg-gray-200 rounded w-64 mb-12"></div>
        <div class="h-[400px] bg-gray-200 rounded-2xl mb-8"></div>
      </div>

      <div v-else class="py-8">
        <h1 class="font-serif text-4xl font-bold mb-12" data-aos="fade-up">Kabar {{ currentCategoryName }}</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
            <a :href="article.link" target="_blank" v-for="(article, index) in news" :key="index" class="group cursor-pointer block" data-aos="fade-up">
                <div class="img-zoom-container rounded-xl mb-6 overflow-hidden">
                    <img :src="article.image?.large || article.image?.small || 'https://via.placeholder.com/800x600'" class="w-full h-64 object-cover" />
                </div>
                <h3 class="font-serif text-2xl font-bold text-gray-900 mb-4 line-clamp-3 group-hover:text-brand-primary transition-colors">
                    {{ article.title }}
                </h3>
            </a>
        </div>
      </div>

    </main>

    <Footer @change-category="changeCategory" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

// --- COPY PASTE SEMUA LOGIKA JAVASCRIPT-MU DI SINI ---
const news = ref([])
const loading = ref(false)
const currentCategoryKey = ref('beranda')

const categories = {
    beranda: { name: 'Beranda', url: '' },
    nasional: { name: 'Nasional', url: 'https://berita-indo-api-next.vercel.app/api/cnn-news/nasional', image: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800' },
    internasional: { name: 'Internasional', url: 'https://berita-indo-api-next.vercel.app/api/cnn-news/internasional', image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=800' },
    hiburan: { name: 'Hiburan', url: 'https://berita-indo-api-next.vercel.app/api/cnn-news/hiburan', image: 'https://images.unsplash.com/photo-1493225457224-eda0e6fd1463?w=800' },
    teknologi: { name: 'Teknologi', url: 'https://berita-indo-api-next.vercel.app/api/cnn-news/teknologi', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800' }
}

const currentCategoryName = computed(() => categories[currentCategoryKey.value]?.name)

const changeCategory = (cat) => {
    if (currentCategoryKey.value === cat) return;
    currentCategoryKey.value = cat;
    if (cat === 'beranda') {
        loading.value = false;
        refreshAOS();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        fetchNews();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

const fetchNews = async () => {
    loading.value = true;
    news.value = [];
    try {
        // Logika fetch mu yang sudah sangat bagus masukkan di sini
        const response = await fetch(categories[currentCategoryKey.value].url);
        const data = await response.json();
        news.value = data.data;
    } catch (e) {
        console.error("Gagal", e);
    } finally {
        loading.value = false;
        refreshAOS();
    }
}

const refreshAOS = () => {
    nextTick(() => { AOS.refreshHard(); });
}

onMounted(() => {
    AOS.init({ duration: 800, once: true });
})
</script>