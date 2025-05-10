const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-input");

const lightbox = document.querySelector(".light-box");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxPhotographer = document.querySelector("#lightbox-photographer");
const downloadBtn = document.querySelector("#download-btn");
const closeLightboxBtn = document.querySelector("#close-lightbox");

const apiKey = "g2EaKK3jHNhzdJgK7VYYybv6hbry2ZCqUpu4rNL7Ov3AFhdY1o68CaFq";
const perPage = 15;
let currentPage = 1;
let searchTerm = "nature";

// Generate image cards
const generateHTML = (images) => {
    imagesWrapper.innerHTML += images.map(img => `
        <li class="card" data-photographer="${img.photographer}" data-img="${img.src.large2x}">
            <img src="${img.src.large2x}" alt="Image">
            <div class="details">
                <div class="photograph">
                    <i class="uil uil-camera"></i>
                    <span>${img.photographer}</span>
                </div>
                <button class="download-btn" data-img="${img.src.large2x}">
                    <i class="uil uil-import"></i>
                </button>
            </div>
        </li>
    `).join("");
};

// Fetch images from API
const getImages = (apiURL) => {
    loadMoreBtn.innerText = "Loading...";
    loadMoreBtn.disabled = true;

    fetch(apiURL, {
        headers: { Authorization: apiKey }
    })
    .then(res => res.json())
    .then(data => {
        generateHTML(data.photos);
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.disabled = false;
    })
    .catch(err => {
        console.error("Error fetching images:", err);
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.disabled = false;
    });
};

// Load more images
const loadMoreImages = () => {
    currentPage++;
    const apiURL = `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`;
    getImages(apiURL);
};

// Search images
const loadSearchImages = (e) => {
    if (e.key === "Enter") {
        currentPage = 1;
        searchTerm = searchInput.value.trim();
        imagesWrapper.innerHTML = "";
        const apiURL = `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`;
        getImages(apiURL);
    }
};

// Show lightbox
const showLightbox = (img, photographer) => {
    lightboxImage.src = img;
    lightboxPhotographer.textContent = photographer;
    downloadBtn.setAttribute("data-img", img);
    lightbox.style.display = "flex";
};

// Close lightbox
const closeLightbox = () => {
    lightbox.style.display = "none";
    lightboxImage.src = "";
};

// Download image
const downloadImage = (imgURL) => {
    fetch(imgURL)
        .then(res => res.blob())
        .then(file => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(file);
            a.download = "pexels-image.jpg";
            a.click();
        })
        .catch(err => console.error("Error downloading image:", err));
};

// Click event on image cards
imagesWrapper.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const downloadBtnEl = e.target.closest(".download-btn");

    if (downloadBtnEl) {
        const imgURL = downloadBtnEl.getAttribute("data-img");
        downloadImage(imgURL);
    } else if (card) {
        const imgURL = card.getAttribute("data-img");
        const photographer = card.getAttribute("data-photographer");
        showLightbox(imgURL, photographer);
    }
});

// Download button inside lightbox
downloadBtn.addEventListener("click", () => {
    const imgURL = downloadBtn.getAttribute("data-img");
    downloadImage(imgURL);
});

// Close button in lightbox
closeLightboxBtn.addEventListener("click", closeLightbox);

// Initial image load
const initialLoad = () => {
    const apiURL = `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`;
    getImages(apiURL);
};

// Event listeners
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);

// Load default images
initialLoad();
