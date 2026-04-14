<template>
  <div class="min-h-screen flex flex-col">
    <Navbar :currentCategory="currentCategoryKey" @change-category="changeCategory" />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
      
      <div v-if="currentCategoryKey === 'beranda'" class="animate-fade-in py-8 lg:py-16">
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
            @click="changeCategory(key)"
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

      <div v-else-if="loading" class="animate-pulse w-full py-8">
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
              <span class="text-brand-primary font-bold tracking-widest uppercase text-sm mb-1 block">{{ currentCategorySource }}</span>
              <h1 class="font-serif text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">Kabar {{ currentCategoryName }}</h1>
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
                <span class="bg-brand-light text-brand-primary border border-brand-soft px-3 py-1 rounded-full font-bold tracking-wider uppercase">{{ currentCategorySource }}</span>
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

const news = ref([])
const loading = ref(false)
const currentCategoryKey = ref('beranda')

const categories = {
    beranda: { name: 'Beranda', url: '', source: '' },
    nasional: { name: 'Nasional', source: 'CNN NASIONAL', url: 'https://berita-indo-api-next.vercel.app/api/cnn-news/nasional', image: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800' },
    internasional: { name: 'Internasional', source: 'CNN INT', url: 'https://berita-indo-api-next.vercel.app/api/cnn-news/internasional', image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=800' },
    hiburan: { name: 'Hiburan', source: 'CNN HIB', url: 'https://berita-indo-api-next.vercel.app/api/cnn-news/hiburan', image: 'https://images.unsplash.com/photo-1493225457224-eda0e6fd1463?w=800' },
    teknologi: { name: 'Teknologi', source: 'CNN TECH', url: 'https://berita-indo-api-next.vercel.app/api/cnn-news/teknologi', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800' }
}

const currentCategoryName = computed(() => categories[currentCategoryKey.value]?.name)
const currentCategorySource = computed(() => categories[currentCategoryKey.value]?.source)

// Pisahkan array untuk Hero dan Grid
const featuredArticle = computed(() => news.value.length > 0 ? news.value[0] : null)
const gridArticles = computed(() => news.value.length > 1 ? news.value.slice(1) : [])

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

// === FUNGSI BANTUAN YANG KEMBALI DIMASUKKAN ===
const getImage = (imageObj) => {
    if (!imageObj) return 'https://via.placeholder.com/800x600/e6f5ea/2e7d32?text=Dunia+Kini';
    return imageObj.large || imageObj.small || (typeof imageObj === 'string' ? imageObj : 'https://via.placeholder.com/800x600');
};

const handleImageError = (e) => { e.target.src = 'https://via.placeholder.com/800x600/e6f5ea/2e7d32?text=Gambar+Tidak+Tersedia'; };

const formatDateShort = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Baru saja' : date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getDate = (item) => item.isoDate || item.pubDate || null;
const getSnippet = (item) => item.contentSnippet || item.description || "Klik tautan untuk membaca selengkapnya.";
const getReadTime = (text) => {
    if (!text) return 3;
    const time = Math.ceil((text.length * 5) / 200);
    return time < 2 ? 2 : (time > 8 ? 8 : time);
};

const refreshAOS = () => { nextTick(() => { AOS.refreshHard(); }); }

onMounted(() => { AOS.init({ duration: 800, once: true }); })
</script>