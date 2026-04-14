export const getImage = (imageObj) => {
    if (!imageObj) return 'https://via.placeholder.com/800x600/e6f5ea/2e7d32?text=Dunia+Kini';
    return imageObj.large || imageObj.small || (typeof imageObj === 'string' ? imageObj : 'https://via.placeholder.com/800x600');
};

export const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/800x600/e6f5ea/2e7d32?text=Gambar+Tidak+Tersedia';
};

export const formatDateShort = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Baru saja' : date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const getDate = (item) => item.isoDate || item.pubDate || null;

export const getSnippet = (item) => item.contentSnippet || item.description || "Klik tautan untuk membaca selengkapnya.";

export const getReadTime = (text) => {
    if (!text) return 3;
    const time = Math.ceil((text.length * 5) / 200);
    return time < 2 ? 2 : (time > 8 ? 8 : time);
};