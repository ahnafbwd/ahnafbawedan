# 📧 Form Kontak dengan Email Otomatis

Portfolio website Anda sekarang sudah dilengkapi dengan sistem pengiriman email otomatis yang memiliki beberapa opsi backup untuk memastikan pesan selalu terkirim.

## 🚀 Fitur yang Ditambahkan:

### 1. **EmailJS Integration** (Opsi Utama)

- Mengirim email langsung dari frontend tanpa backend
- Gratis hingga 200 email/bulan
- Setup mudah, tidak perlu server

### 2. **Web3Forms Fallback** (Opsi Backup)

- Jika EmailJS gagal, otomatis mencoba Web3Forms
- Gratis hingga 250 email/bulan
- API yang stabil

### 3. **Mailto Fallback** (Opsi Darurat)

- Jika semua service gagal, otomatis buka email client
- Tidak memerlukan konfigurasi apapun
- Selalu berfungsi

### 4. **WhatsApp Integration**

- Tombol WhatsApp langsung untuk kontak cepat
- Link pre-filled dengan pesan pembuka

## 📋 Cara Setup:

### Opsi 1: EmailJS (Recommended)

1. Buka file `EMAILJS_SETUP.md` untuk panduan lengkap
2. Daftar gratis di [EmailJS.com](https://www.emailjs.com/)
3. Update file `assets/js/emailjs-config.js` dengan kredensial Anda

### Opsi 2: Web3Forms (Alternatif)

1. Daftar gratis di [Web3Forms.com](https://web3forms.com/)
2. Dapatkan Access Key
3. Update file `assets/js/email-fallback.js`

### Opsi 3: Gunakan Tanpa Setup

- Form sudah memiliki fallback ke mailto
- WhatsApp button sudah aktif
- Tetap bisa menerima pesan meski tanpa konfigurasi

## 🔧 File yang Ditambahkan/Dimodifikasi:

```
assets/js/
├── emailjs-config.js      # Konfigurasi EmailJS
└── email-fallback.js      # Sistem fallback Web3Forms

EMAILJS_SETUP.md          # Panduan setup EmailJS
index.html                # Form dengan email integration
```

## 🎯 Cara Kerja:

1. **User mengisi form** → Validasi input
2. **Coba EmailJS** → Jika berhasil ✅
3. **Jika gagal, coba Web3Forms** → Jika berhasil ✅
4. **Jika semua gagal** → Buka email client otomatis
5. **User bisa gunakan** → WhatsApp button sebagai alternatif

## 📱 Testing:

1. Buka website Anda
2. Isi form kontak dengan data test
3. Klik "Send Message"
4. Cek email di `ahnafbawedan01@gmail.com`

## 🛠️ Troubleshooting:

**Form tidak mengirim email:**

1. Cek console browser untuk error
2. Pastikan kredensial EmailJS benar
3. Cek spam folder
4. Gunakan mailto button sebagai backup

**EmailJS error:**

- Pastikan domain sudah terdaftar di EmailJS
- Cek quota bulanan (200 email max)
- Periksa template variables

**Ingin mengganti email tujuan:**

- Edit `TO_EMAIL` di `emailjs-config.js`
- Update email di bagian footer dan kontak info

## 💡 Tips:

1. **Setup EmailJS dulu** - Paling stabil dan mudah
2. **Test dengan email sendiri** - Sebelum go live
3. **Monitor quota** - EmailJS free = 200 email/bulan
4. **Backup selalu ada** - Mailto dan WhatsApp tetap berfungsi

## 📊 Analytics:

Form sekarang akan log ke console:

- Service yang digunakan (EmailJS/Web3Forms)
- Status pengiriman
- Error details jika ada

---

**Ready to go!** Form kontak Anda sekarang sudah siap menerima dan mengirim email otomatis! 🎉
