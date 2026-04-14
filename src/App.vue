<template>
  <div class="min-h-screen flex flex-col">
    <Navbar :currentCategory="currentCategoryKey" @change-category="changeCategory" />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
      
      <HomeView 
        v-if="currentCategoryKey === 'beranda'" 
        @change-category="changeCategory" 
      />

      <NewsView 
        v-else 
        :loading="loading"
        :categoryName="currentCategoryName"
        :categorySource="currentCategorySource"
        :featuredArticle="featuredArticle"
        :gridArticles="gridArticles"
      />

    </main>

    <Footer @change-category="changeCategory" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import HomeView from './views/HomeView.vue';
import NewsView from './views/NewsView.vue';
import { categories } from './utils/constants';
import AOS from 'aos';
import 'aos/dist/aos.css';

// State
const news = ref([]);
const loading = ref(false);
const currentCategoryKey = ref('beranda');

// Computed Data
const currentCategoryName = computed(() => categories[currentCategoryKey.value]?.name);
const currentCategorySource = computed(() => categories[currentCategoryKey.value]?.source);
const featuredArticle = computed(() => news.value.length > 0 ? news.value[0] : null);
const gridArticles = computed(() => news.value.length > 1 ? news.value.slice(1) : []);

// Logika Navigasi
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

// Logika Fetch API
const fetchNews = async () => {
    loading.value = true;
    news.value = [];
    try {
        const targetUrl = categories[currentCategoryKey.value].url;
        const proxies = [
            'https://api.allorigins.win/raw?url=',
            'https://api.codetabs.com/v1/proxy?quest='
        ];

        let data = null;
        for (const proxy of proxies) {
            try {
                const response = await fetch(proxy + encodeURIComponent(targetUrl));
                if (response.ok) {
                    data = await response.json();
                    break; 
                }
            } catch (e) { console.warn("Mencoba proxy lain..."); }
        }

        if (data && data.data && Array.isArray(data.data)) {
            news.value = data.data;
        } else {
            throw new Error("Gagal mengambil data dari API.");
        }
    } catch (err) {
        console.error("Error API:", err);
    } finally {
        loading.value = false;
        refreshAOS();
    }
}

const refreshAOS = () => { nextTick(() => { AOS.refreshHard(); }); }

onMounted(() => { AOS.init({ duration: 800, once: true }); });
</script>