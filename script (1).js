const detectBtn = document.getElementById("detectBtn");
const resetBtn = document.getElementById("resetBtn");
const status = document.getElementById("status");
const message = document.getElementById("message");
let speechTimeout;

const warnings = [
    "അതാ പാറ്റ! ഓടിക്കോ!",
    "പാറ്റയെ കണ്ടു! എല്ലാവരും ഓടിക്കോ!",
    "അയ്യോ! പാറ്റ! രക്ഷപ്പെടൂ!",
    "അതാ പാറ്റ! ഇവിടെ നിൽക്കണ്ട!",
    "പാറ്റ ആക്രമണം! ഓടിക്കോ!"
];

function speakMalayalam(text) {

    const speaker = window.speechSynthesis;

    speaker.cancel();
    speaker.resume();

    const voice = new SpeechSynthesisUtterance(text);

    // Malayalam language
    voice.lang = "ml-IN";

    voice.rate = 0.9;
    voice.pitch = 1.1;
    voice.volume = 1.0;

    // Find Malayalam voice available in browser
    const voices = speaker.getVoices();

    const malayalamVoice = voices.find(v =>
        v.lang.toLowerCase().startsWith("ml")
    );

    if (malayalamVoice) {
        voice.voice = malayalamVoice;
        console.log("Malayalam voice:", malayalamVoice.name);
    } else {
        console.log("Malayalam voice not available. Using default voice.");
    }

    // Restart after cancel so repeated detections are spoken reliably.
    window.clearTimeout(speechTimeout);
    speechTimeout = window.setTimeout(() => {
        speaker.speak(voice);
    }, 50);
}


// Detect Cockroach
detectBtn.addEventListener("click", () => {

    const warning =
        warnings[Math.floor(Math.random() * warnings.length)];

    document.body.classList.add("panic");

    status.innerHTML = "🔴 COCKROACH DETECTED!";
    message.innerHTML = warning;

    speakMalayalam(warning);

    detectBtn.innerHTML = "🚨 PANIC MODE ACTIVE!";
});


// Reset
resetBtn.addEventListener("click", () => {

    document.body.classList.remove("panic");

    status.innerHTML = "🟢 Room is Safe";
    message.innerHTML = "No cockroach detected...";

    detectBtn.innerHTML = "🪳 DETECT COCKROACH";

    window.clearTimeout(speechTimeout);
    speechSynthesis.cancel();
});


// Load voices
speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices();
};