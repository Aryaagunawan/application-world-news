<template>
  <footer class="bg-gray-900 text-white pt-16 pb-8 mt-auto rounded-t-3xl border-t-4 border-brand-primary">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-gray-800 pb-12">
            <div class="md:col-span-2">
                <span class="font-serif font-bold text-2xl tracking-tight">World<span class="text-brand-primary">News</span></span>
                <p class="text-gray-400 text-sm mt-4 max-w-sm">Platform berita terpercaya yang menyajikan informasi global paling mutakhir.</p>
            </div>
            <div>
                <h4 class="font-bold text-lg mb-4 font-serif">Akses Cepat</h4>
                <ul class="space-y-3 text-sm text-gray-400">
                    <li><a href="#" @click.prevent="$emit('change-category', 'nasional')" class="hover:text-brand-light">Nasional</a></li>
                    <li><a href="#" @click.prevent="$emit('change-category', 'internasional')" class="hover:text-brand-light">Internasional</a></li>
                </ul>
            </div>
        </div>
        <div class="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; 2026 World News Network.</p>
        </div>
    </div>
  </footer>
</template>