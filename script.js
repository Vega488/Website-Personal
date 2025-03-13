// ==================== Typewriter Effect ====================
const professions = [
    "an AI Engineer",
    "a Front End Developer",
    "a Back End Developer",
    "a Data Analyst"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 80;
const deleteSpeed = 40;
const nextWordDelay = 300;
const element = document.getElementById("typewriter");

function typeText() {
    let prefix = "I'm ";
    let currentText = professions[textIndex];

    if (!isDeleting && charIndex <= currentText.length) {
        element.textContent = prefix + currentText.substring(0, charIndex);
        charIndex++;
        setTimeout(typeText, speed);
    } else if (isDeleting && charIndex >= 0) {
        element.textContent = prefix + currentText.substring(0, charIndex);
        charIndex--;
        setTimeout(typeText, deleteSpeed);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            textIndex = (textIndex + 1) % professions.length;
        }
        setTimeout(typeText, nextWordDelay);
    }
}

typeText();

// ==================== Efek Partikel + Menghindari Kursor ====================
const particleCanvas = document.createElement("canvas");
const particleCtx = particleCanvas.getContext("2d");
document.getElementById("particles-container").appendChild(particleCanvas);

particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x || Math.random() * particleCanvas.width;
        this.y = y || Math.random() * particleCanvas.height;
        this.size = Math.random() * 2.5 + 1.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = particleCanvas.width;
        if (this.x > particleCanvas.width) this.x = 0;
        if (this.y < 0) this.y = particleCanvas.height;
        if (this.y > particleCanvas.height) this.y = 0;
    }

    draw() {
        particleCtx.fillStyle = "#1E90FF";
        particleCtx.beginPath();
        particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        particleCtx.fill();
    }
}

// Inisialisasi Partikel
function initParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

initParticles();

// Animasi Partikel
function animateParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 170) { // 🔥 Panjang tali lebih panjang
                particleCtx.strokeStyle = "rgba(30, 144, 255, 0.5)";
                particleCtx.lineWidth = 0.75;
                particleCtx.beginPath();
                particleCtx.moveTo(particles[i].x, particles[i].y);
                particleCtx.lineTo(particles[j].x, particles[j].y);
                particleCtx.stroke();
            }
        }
    }

    for (let particle of particles) {
        particle.update();
        particle.draw();
    }

    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener("resize", () => {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    initParticles();
});

document.addEventListener("mousemove", (event) => {
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    particles.forEach((particle) => {
        let dx = particle.x - mouseX;
        let dy = particle.y - mouseY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 160) { 
            let angle = Math.atan2(dy, dx);
            let moveX = Math.cos(angle) * 10; 
            let moveY = Math.sin(angle) * 12;

            particle.x += moveX;
            particle.y += moveY;
        }
    });
});

// ==================== Efek Bintang Vega (Komet) ====================
const vegaCanvas = document.getElementById("vegaCanvas");
const vegaCtx = vegaCanvas.getContext("2d");

vegaCanvas.width = window.innerWidth;
vegaCanvas.height = window.innerHeight;

class VegaStar {
    constructor() {
        this.reset();
        this.trail = [];
    }

    reset() {
        this.x = Math.random() * vegaCanvas.width;
        this.y = Math.random() * (vegaCanvas.height / 2);
        this.radius = 6;
        this.speedX = (Math.random() * 1.5 + 0.5) * (Math.random() < 0.5 ? 1 : -1);
        this.speedY = Math.random() * 0.5 + 0.2;
        this.trail = [];
    }

    update() {
        this.trail.push({ x: this.x, y: this.y });

        if (this.trail.length > 30) {
            this.trail.shift();
        }

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y > vegaCanvas.height || this.x < 0 || this.x > vegaCanvas.width) {
            this.reset();
        }
    }

    draw() {
        // Gambar ekor
        for (let i = 0; i < this.trail.length; i++) {
            let alpha = i / this.trail.length;
            vegaCtx.beginPath();
            vegaCtx.arc(this.trail[i].x, this.trail[i].y, this.radius * alpha, 0, Math.PI * 2);
            vegaCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            vegaCtx.fill();
        }

        // Gambar bintang utama
        vegaCtx.beginPath();
        vegaCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        vegaCtx.fillStyle = "white";
        vegaCtx.shadowBlur = 20;
        vegaCtx.shadowColor = "rgba(255, 255, 255, 0.8)";
        vegaCtx.fill();
    }
}

const vegaStar = new VegaStar();

function animateVega() {
    vegaCtx.clearRect(0, 0, vegaCanvas.width, vegaCanvas.height);
    vegaStar.update();
    vegaStar.draw();
    requestAnimationFrame(animateVega);
}

animateVega();

// Resize Event
window.addEventListener("resize", () => {
    vegaCanvas.width = window.innerWidth;
    vegaCanvas.height = window.innerHeight;
});

document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Buat tombol chatbot
    const chatbotButton = document.createElement("div");
    chatbotButton.id = "chatbot-button";
    chatbotButton.innerHTML = '<span id="chatbot-wave">🤖</span>';
    document.body.appendChild(chatbotButton);

    // 🔹 Buat sapaan otomatis
    const chatbotGreeting = document.createElement("div");
    chatbotGreeting.id = "chatbot-greeting";
    document.body.appendChild(chatbotGreeting);

    // 🔹 Buat container chatbot
    const chatbotContainer = document.createElement("div");
    chatbotContainer.id = "chatbot-container";
    chatbotContainer.style.display = "none"; // Awalnya tersembunyi
    chatbotContainer.innerHTML = `
        <div id="chatbot-header">
            AI Chatbot
            <button id="chatbot-close">✖</button>
        </div>
        <div id="chatbot-messages"></div>
        <div id="chatbot-questions"></div>
        <div id="chatbot-input">
            <input type="text" id="chat-input" placeholder="Tanya sesuatu..." />
            <button id="send-button">➤</button>
        </div>
    `;
    document.body.appendChild(chatbotContainer);

    const chatbotClose = document.getElementById("chatbot-close");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotQuestions = document.getElementById("chatbot-questions");
    const chatInput = document.getElementById("chat-input");
    const sendButton = document.getElementById("send-button");

    let greetingTexts = ["Haiii salam kenalll!", "Kamu siapa nihh? ><", "Chat aku dongg :3", "uy uy halooo tanya tanya sini yu"];
    let greetingIndex = 0;

    function showGreeting() {
        chatbotGreeting.innerText = greetingTexts[greetingIndex];
        chatbotGreeting.style.display = "block";

        setTimeout(() => {
            chatbotGreeting.style.display = "none";
        }, 2500);

        greetingIndex = (greetingIndex + 1) % greetingTexts.length;
        setTimeout(showGreeting, 5000);
    }

    setTimeout(showGreeting, 2000);

    chatbotButton.addEventListener("click", function () {
        chatbotContainer.style.display = "block";
        showSuggestedQuestions();
    });

    chatbotClose.addEventListener("click", function () {
        chatbotContainer.style.display = "none";
    });

    sendButton.addEventListener("click", function () {
        sendMessage();
    });

    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        let userText = chatInput.value.trim();
        if (userText === "") return;

        appendMessage("Kamu", userText);
        chatInput.value = "";

        let botResponse = getBotResponse(userText);
        setTimeout(() => {
            appendMessage("Bot", botResponse);
        }, 1000);
    }

    function appendMessage(sender, text) {
        let messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showSuggestedQuestions() {
        chatbotQuestions.innerHTML = "<p>Pilih pertanyaan yang tersedia:</p>";
        let questions = [
            "Siapa itu Vega Retsuya?",
            "Apa skill yang kamu kuasai?",
            "Punya pengalaman proyek apa saja?",
            "Ceritakan tentang GoUMKM!",
            "Apa tujuanmu sebagai AI Engineer?"
        ];

        questions.forEach((question) => {
            let button = document.createElement("button");
            button.classList.add("question-button");
            button.innerText = question;
            button.addEventListener("click", function () {
                chatInput.value = question;
                sendMessage();
            });
            chatbotQuestions.appendChild(button);
        });
    }

    function getBotResponse(userText) {
        let responses = {
            "Apa itu Vega Retsuya?": "Vega Retsuya adalah seorang mahasiswa dengan passion di bidang teknologi dan AI.",
            "Apa skill yang kamu kuasai?": "Saya menguasai Python, Kotlin, Golang, dan beberapa teknologi data science serta AI.",
            "Punya pengalaman proyek apa saja?": "Saya pernah mengembangkan GoUMKM, sebuah aplikasi untuk UMKM, dan proyek Azure ML.",
            "Ceritakan tentang GoUMKM!": "GoUMKM adalah aplikasi yang membantu UMKM mengelola stok dan laporan keuangan secara otomatis.",
            "Apa tujuanmu sebagai AI Engineer?": "Tujuan saya adalah menjadi AI Engineer yang dapat mengembangkan solusi cerdas untuk berbagai industri."
        };

        return responses[userText] || "Hmm... aku masih belajar nih! ><";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const chatbotButton = document.getElementById("chatbot-button");
    const chatbotContainer = document.getElementById("chatbot-container");
    const chatbotClose = document.getElementById("chatbot-close");
    const sendButton = document.getElementById("send-button");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.getElementById("chatbot-messages");

    // Saat tombol chatbot diklik, buka chatbot
    chatbotButton.addEventListener("click", function () {
        chatbotContainer.style.display = "block";
    });

    // Saat tombol close diklik, tutup chatbot
    chatbotClose.addEventListener("click", function () {
        chatbotContainer.style.display = "none";
    });

    // Fungsi menambahkan pesan ke chatbox
    function addMessage(text, sender) {
        let messageElement = document.createElement("div");
        messageElement.classList.add("chat-message");
        if (sender === "user") {
            messageElement.style.textAlign = "right";
            messageElement.style.color = "#1E90FF";
        } else {
            messageElement.style.textAlign = "left";
            messageElement.style.color = "#fff";
        }
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll ke bawah
    }

    // Saat tombol kirim diklik
    sendButton.addEventListener("click", function () {
        let userMessage = chatInput.value.trim();
        if (userMessage !== "") {
            addMessage(userMessage, "user");
            chatInput.value = ""; // Reset input

            // Simulasi respons AI (bisa diganti dengan API)
            setTimeout(() => {
                let botReply = getBotResponse(userMessage);
                addMessage(botReply, "bot");
            }, 1000);
        }
    });

    // Fungsi respons chatbot sederhana
    function getBotResponse(message) {
        let responses = {
            "hai": "Hai juga! 👋",
            "kamu siapa?": "Aku chatbot AI yang siap membantu! 🚀",
            "bagaimana kabarmu?": "Aku selalu baik, terima kasih sudah bertanya! 😊",
            "apa yang bisa kamu lakukan?": "Aku bisa menjawab pertanyaanmu dan mengobrol! Coba tanyakan sesuatu. 🤖",
            "bye": "Sampai jumpa lagi! 👋"
        };
        return responses[message.toLowerCase()] || "Maaf, aku tidak mengerti. 😅";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const icons = document.querySelectorAll(".floating-icon");

    icons.forEach(icon => {
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;

        let velocityX = (Math.random() - 0.5) * 0.6; // Kecepatan lebih kecil
        let velocityY = (Math.random() - 0.5) * 0.6; // Pergerakan lebih halus

        function moveIcon() {
            x += velocityX;
            y += velocityY;

            if (x < 0 || x > window.innerWidth - 50) velocityX *= -1;
            if (y < 0 || y > window.innerHeight - 50) velocityY *= -1;

            icon.style.transform = `translate(${x}px, ${y}px)`;

            requestAnimationFrame(moveIcon);
        }

        moveIcon();
    });
});

const crypto = require('crypto');

const secret = '•••••••••'; // Your verification secret key
const userId = current_user.id // A string UUID to identify your user

const hash = crypto.createHmac('sha256', secret).update(userId).digest('hex');