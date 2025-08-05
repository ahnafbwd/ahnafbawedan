// Web3Forms Alternative Configuration
// Jika EmailJS tidak bekerja, gunakan Web3Forms sebagai alternatif
// Daftar gratis di: https://web3forms.com/

const WEB3FORMS_CONFIG = {
    ACCESS_KEY: "390eded0-d5f7-4c4e-b4db-e16effb65d30", // Dapatkan dari web3forms.com
    ENDPOINT: "https://api.web3forms.com/submit"
};

// Fungsi untuk mengirim email menggunakan Web3Forms
async function sendEmailWeb3Forms(formData) {
    const formDataObj = new FormData();
    formDataObj.append("access_key", WEB3FORMS_CONFIG.ACCESS_KEY);
    formDataObj.append("name", formData.name);
    formDataObj.append("email", formData.email);
    formDataObj.append("subject", formData.subject);
    formDataObj.append("message", formData.message);
    formDataObj.append("from_name", "Portfolio Contact Form");
    
    const response = await fetch(WEB3FORMS_CONFIG.ENDPOINT, {
        method: "POST",
        body: formDataObj
    });
    
    return response.json();
}

// Fungsi untuk mencoba EmailJS dulu, jika gagal pakai Web3Forms
async function sendEmailWithFallback(formData) {
    try {
        // Coba EmailJS dulu
        if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
            const response = await sendEmail(formData);
            return { success: true, service: 'EmailJS', response };
        } else {
            throw new Error('EmailJS not configured');
        }
    } catch (emailjsError) {
        console.log('EmailJS failed, trying Web3Forms...', emailjsError);
        
        try {
            // Fallback ke Web3Forms
            if (WEB3FORMS_CONFIG.ACCESS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY") {
                const response = await sendEmailWeb3Forms(formData);
                if (response.success) {
                    return { success: true, service: 'Web3Forms', response };
                } else {
                    throw new Error(response.message || 'Web3Forms failed');
                }
            } else {
                throw new Error('Web3Forms not configured');
            }
        } catch (web3formsError) {
            console.log('Web3Forms also failed:', web3formsError);
            throw new Error('All email services failed');
        }
    }
}
