const images = [
  { title: "Forest Morning", category: "Nature", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=90", alt: "Sunlight through a green forest" },
  { title: "Mountain Escape", category: "Travel", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=90", alt: "Mountain landscape under a blue sky" },
  { title: "City Lights", category: "City", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=90", alt: "City skyline with buildings and lights" },
  { title: "Ocean Breeze", category: "Nature", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=90", alt: "Turquoise ocean and sandy beach" },
  { title: "Modern Lines", category: "Architecture", url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=90", alt: "Modern white architectural building" },
  { title: "Urban Motion", category: "City", url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=90", alt: "Urban city streets and tall buildings" },
  { title: "Desert Road", category: "Travel", url: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1600&q=90", alt: "Road crossing a desert landscape" },
  { title: "Glass & Steel", category: "Architecture", url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=90", alt: "Modern glass and steel office interior" },
  { title: "Waterfall Escape", category: "Nature", url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1600&q=90", alt: "Waterfall surrounded by green nature" },
  { title: "Coastal Journey", category: "Travel", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=90", alt: "Scenic coastal travel landscape" },
  { title: "Downtown Avenue", category: "City", url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=90", alt: "Busy downtown avenue with buildings" },
  { title: "Concrete Geometry", category: "Architecture", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90", alt: "Modern geometric office building" },
  { title: "Green Valley", category: "Nature", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=90", alt: "Green valley landscape under sunlight" },
  { title: "Alpine Adventure", category: "Travel", url: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1600&q=90", alt: "Mountain peaks and alpine landscape" },
  { title: "Night Skyline", category: "City", url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=90", alt: "Night city skyline with illuminated buildings" },
  { title: "Architectural Interior", category: "Architecture", url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=90", alt: "Modern architectural interior" }
];

const cards = [...document.querySelectorAll(".gallery-item")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const resultCount = document.getElementById("resultCount");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxNumber = document.getElementById("lightboxNumber");
const closeLightbox = document.getElementById("closeLightbox");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
let activeFilter = "all";

function updateCount() {
  const visible = cards.filter(card => !card.classList.contains("hidden")).length;
  resultCount.textContent = `${visible} ${visible === 1 ? "image" : "images"}`;
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    cards.forEach((card, index) => {
      const show = activeFilter === "all" || card.dataset.category === activeFilter;
      card.classList.toggle("hidden", !show);
      if (show) {
        card.style.animationDelay = `${(index % 4) * 60}ms`;
      }
    });

    updateCount();
  });
});

function openLightbox(index) {
  currentIndex = index;
  renderLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  closeLightbox.focus();
}

function renderLightbox() {
  const image = images[currentIndex];
  lightboxImage.src = image.url;
  lightboxImage.alt = image.alt;
  lightboxTitle.textContent = image.title;
  lightboxCategory.textContent = image.category;
  lightboxNumber.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
}

function closeViewer() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  renderLightbox();
}

function showPrevious() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  renderLightbox();
}

document.querySelectorAll(".image-card").forEach(card => {
  card.addEventListener("click", () => openLightbox(Number(card.dataset.index)));
});

closeLightbox.addEventListener("click", closeViewer);
prevBtn.addEventListener("click", showPrevious);
nextBtn.addEventListener("click", showNext);

lightbox.addEventListener("click", event => {
  if (event.target.dataset.close === "true") {
    closeViewer();
  }
});

document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") closeViewer();
  if (event.key === "ArrowRight") showNext();
  if (event.key === "ArrowLeft") showPrevious();
});

updateCount();
