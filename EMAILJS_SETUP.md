# Setup EmailJS untuk Form Kontak

## Langkah-langkah Setup:

### 1. Daftar di EmailJS

1. Kunjungi [https://www.emailjs.com/](https://www.emailjs.com/)
2. Klik "Sign Up" dan buat akun gratis
3. Verifikasi email Anda

### 2. Setup Email Service

1. Di dashboard EmailJS, klik "Email Services"
2. Klik "Add New Service"
3. Pilih provider email Anda (Gmail, Outlook, Yahoo, dll.)
4. Ikuti instruksi untuk menghubungkan akun email
5. Catat **Service ID** yang diberikan

### 3. Buat Email Template

1. Klik "Email Templates"
2. Klik "Create New Template"
3. Gunakan template berikut:

**Subject:** New Message from {{from_name}} - {{subject}}

**Content:**

```
Hi Ahnaf,

You have received a new message from your portfolio website:

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
Reply to: {{reply_to}}
```

4. Catat **Template ID** yang diberikan

### 4. Dapatkan Public Key

1. Klik "Account" di menu
2. Catat **Public Key** Anda

### 5. Update Konfigurasi

Edit file `assets/js/emailjs-config.js` dan ganti:

```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: "your_actual_public_key", // Dari step 4
  SERVICE_ID: "your_actual_service_id", // Dari step 2
  TEMPLATE_ID: "your_actual_template_id", // Dari step 3
  TO_EMAIL: "ahnaf@gmail.com", // Email tujuan
};
```

### 6. Test Form

1. Buka website Anda
2. Isi form kontak
3. Klik "Send Message"
4. Cek email Anda

## Opsi Alternatif:

### A. Menggunakan mailto (Sederhana)

Jika ingin solusi yang lebih sederhana tanpa setup, bisa gunakan mailto link.

### B. Backend dengan PHP

Untuk kontrol penuh, bisa buat backend PHP untuk mengirim email.

### C. Netlify Forms (Jika hosting di Netlify)

Jika hosting di Netlify, bisa gunakan Netlify Forms yang built-in.

## Troubleshooting:

1. **Email tidak terkirim**: Pastikan semua kredensial benar
2. **CORS Error**: Pastikan domain terdaftar di EmailJS dashboard
3. **Template Error**: Cek variable names di template sesuai dengan yang dikirim

## Rate Limits:

- EmailJS free tier: 200 emails/bulan
- Untuk lebih dari itu, perlu upgrade ke plan berbayar

---

**Catatan**: Setelah setup EmailJS, form kontak akan bisa mengirim email langsung ke inbox Anda tanpa perlu backend server!
