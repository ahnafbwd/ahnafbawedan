// EmailJS Configuration
// Ganti dengan kredensial EmailJS Anda setelah mendaftar di https://www.emailjs.com/

const EMAILJS_CONFIG = {
    PUBLIC_KEY: "_RiJ16LBld3OfmVTv",        // Dapatkan dari EmailJS Dashboard
    SERVICE_ID: "service_24h8k3v",        // ID layanan email (Gmail, Outlook, etc.)
    TEMPLATE_ID: "template_0pr22nm",      // ID template email
    TO_EMAIL: "ahnafbawedan01@gmail.com"  // Email tujuan
};

// Fungsi untuk mengirim email
function sendEmail(formData) {
    return emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: EMAILJS_CONFIG.TO_EMAIL,
            reply_to: formData.email
        }
    );
}

// Initialize EmailJS saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
});
