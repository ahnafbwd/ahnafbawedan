# 📂 JSON-Based Project Management System

## 🎯 Overview

Portfolio Anda sekarang menggunakan sistem berbasis JSON untuk mengelola data proyek. Ini membuat portfolio lebih mudah dikelola dan diperbarui tanpa perlu mengedit HTML secara langsung.

## 📁 File Structure

```
assets/
├── data/
│   └── projects.json          # Data proyek dalam format JSON
└── js/
    └── projects.js            # JavaScript untuk load dan render proyek
```

## 🛠️ Cara Menggunakan

### 1. **Menambah Proyek Baru**

Edit file `assets/data/projects.json` dan tambahkan objek proyek baru:

```json
{
  "id": 10,
  "title": "Nama Proyek Baru",
  "category": "mobile",
  "categoryLabel": "Mobile App",
  "image": "assets/image/nama-gambar.jpg",
  "technologies": ["Flutter", "Firebase", "API"],
  "description": "Deskripsi singkat proyek...",
  "features": ["Fitur pertama", "Fitur kedua", "Fitur ketiga"],
  "status": "Completed",
  "year": "2024",
  "client": "Nama Klien",
  "link": "https://link-demo.com",
  "github": "https://github.com/username/repo"
}
```

### 2. **Kategori yang Tersedia**

- `mobile` - Aplikasi mobile
- `web` - Aplikasi web
- `design` - UI/UX Design
- `other` - Kategori lainnya

### 3. **Mengedit Proyek yang Ada**

Cari proyek berdasarkan `id` dalam file JSON, lalu edit field yang diinginkan.

### 4. **Menghapus Proyek**

Hapus objek proyek dari array `projects` dalam file JSON.

## 🎨 Fitur Sistem

### ✅ **Yang Sudah Tersedia:**

1. **Dynamic Loading** - Proyek dimuat otomatis dari JSON
2. **Category Filtering** - Filter berdasarkan kategori
3. **Project Details Modal** - Modal detail untuk setiap proyek
4. **Responsive Design** - Tampilan responsif di semua device
5. **Dark Mode Support** - Styling lengkap untuk dark mode
6. **Loading State** - Indikator loading saat memuat data
7. **Technology Badges** - Badge warna otomatis untuk teknologi
8. **Animation Effects** - Animasi hover dan transisi
9. **Live Demo & GitHub Links** - Link ke demo dan repository

### 🔧 **Komponen Automatic:**

- **Color Coding** - Warna badge otomatis berdasarkan kategori
- **Tech Stack Display** - Badge teknologi dengan warna berbeda
- **Image Optimization** - Lazy loading dan hover effects
- **Error Handling** - Fallback jika JSON gagal dimuat

## 📋 Template Proyek Baru

Gunakan template ini untuk proyek baru:

```json
{
  "id": [NEXT_ID],
  "title": "[NAMA_PROYEK]",
  "category": "[mobile|web|design|other]",
  "categoryLabel": "[Mobile App|Web Application|UI/UX Design|Other]",
  "image": "assets/image/[NAMA_FILE]",
  "technologies": ["Tech1", "Tech2", "Tech3"],
  "description": "[DESKRIPSI_SINGKAT]",
  "features": [
    "[FITUR_1]",
    "[FITUR_2]",
    "[FITUR_3]"
  ],
  "status": "[Completed|In Progress|Coming Soon]",
  "year": "[TAHUN]",
  "client": "[NAMA_KLIEN]",
  "link": "[URL_DEMO atau #]",
  "github": "[URL_GITHUB atau #]"
}
```

## 🎯 Keuntungan Sistem JSON

### ✅ **Kemudahan Maintenance:**

- Edit data tanpa menyentuh HTML/CSS
- Backup dan restore mudah
- Version control friendly

### ✅ **Fleksibilitas:**

- Tambah field baru dengan mudah
- Sorting dan filtering advanced
- Integrasi dengan CMS

### ✅ **Performance:**

- Loading data lebih cepat
- Caching otomatis
- SEO friendly

### ✅ **Skalabilitas:**

- Support unlimited projects
- Easy migration ke database
- API ready structure

## 🚀 Update Portfolio

Untuk update portfolio:

1. **Edit** `assets/data/projects.json`
2. **Save** file
3. **Refresh** browser
4. ✅ **Done!** - Portfolio otomatis terupdate

## 💡 Tips & Best Practices

1. **Gambar**: Gunakan format WebP/JPG dengan ukuran optimal (800x600px)
2. **Deskripsi**: Maksimal 150 karakter untuk tampilan optimal
3. **Features**: 3-5 fitur utama per proyek
4. **Links**: Gunakan `#` jika tidak ada link demo/github
5. **ID**: Gunakan ID yang unik dan berurutan

## 🔧 Customization

File `assets/js/projects.js` dapat dikustomisasi untuk:

- Menambah field baru dalam card
- Mengubah layout modal
- Menambah animasi
- Integrasi dengan API external

Portfolio Anda sekarang lebih professional dan mudah dikelola! 🎉
