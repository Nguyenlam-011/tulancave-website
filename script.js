var currentLang = localStorage.getItem("tu-lan-lang") || "vi";

function setLang(lang) {
    if (lang !== "vi" && lang !== "en") return;
    currentLang = lang;
    localStorage.setItem("tu-lan-lang", lang);

    document.documentElement.lang = lang === "vi" ? "vi" : "en";

    document.querySelectorAll("[data-vi]").forEach(function(el) {
        var text = el.getAttribute("data-" + lang);
        if (text != null && text !== "") el.innerText = text;
    });

    document.getElementById("btn-lang-vi").classList.toggle("active", lang === "vi");
    document.getElementById("btn-lang-vi").setAttribute("aria-pressed", lang === "vi");
    document.getElementById("btn-lang-en").classList.toggle("active", lang === "en");
    document.getElementById("btn-lang-en").setAttribute("aria-pressed", lang === "en");
}

document.addEventListener("DOMContentLoaded", function() {
    setLang(currentLang);

    var videoEl = document.getElementById("intro-video");
    var fallbackEl = document.getElementById("video-fallback");
    if (videoEl) {
        videoEl.setAttribute("playsinline", "true");
        videoEl.setAttribute("webkit-playsinline", "true");
        if (fallbackEl) {
        videoEl.addEventListener("error", function() {
            fallbackEl.style.display = "block";
            fallbackEl.innerHTML = (currentLang === "vi"
                ? "Không phát được video. <strong>Hãy mở trang bằng Live Server:</strong> chuột phải file HTML → Open with Live Server (hoặc chạy máy chủ local)."
                : "Video cannot play. <strong>Open this page with Live Server:</strong> right-click HTML file → Open with Live Server (or run a local server).");
        });
        videoEl.addEventListener("loadeddata", function() {
            fallbackEl.style.display = "none";
        });
        }
    }
});
