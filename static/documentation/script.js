      const sidebarLinks = document.querySelectorAll(".chapitre .nav-link");
const subLinks = document.querySelectorAll(".sub-link");
const sections = document.querySelectorAll(".section");
const subContents = document.querySelectorAll(".sub-content");
const subMenu = document.querySelector(".sub-menu");
const menuBtn = document.getElementById("menu-btn");
const chapitre = document.querySelector(".chapitre");
const chapterLinks = document.querySelectorAll(".chapter-link");
const searchInput = document.querySelector(".seach input");
const contentArea = document.querySelector(".centre");

// -----------------------------
// Fonctions principales
// -----------------------------
function hideSubMenuInSidebar() {
    subMenu.style.display = "none";
}

function showSubMenuIfNeeded() {
    const activeChapter = document.querySelector('.chapter-link.active');
    if (activeChapter && activeChapter.getAttribute('data-chapter') === 'api-rest') {
        subMenu.style.display = "block";
    } else {
        subMenu.style.display = "none";
    }
}

function hideAllSections() {
    sections.forEach(sec => sec.classList.remove("active"));
    subContents.forEach(sub => sub.style.display = "none");
}

function showSection(sectionId) {
    hideAllSections();
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        if (targetSection.classList.contains("section")) {
            targetSection.classList.add("active");
        } else {
            targetSection.style.display = "block";
        }
    }
}

function updateActiveNav(targetId) {
    sidebarLinks.forEach(l => l.classList.remove("active"));
    subLinks.forEach(l => l.classList.remove("active"));

    if (targetId === "intro" || targetId === "web-admin" || targetId === "api-rest") {
        const mainLink = document.querySelector(`.chapitre .nav-link[data-chapter="${targetId}"]`);
        if (mainLink) mainLink.classList.add("active");
        if (targetId === "api-rest") subMenu.style.display = "block";
        else subMenu.style.display = "none";
    } else {
        const mainLink = document.querySelector('.chapitre .nav-link[data-chapter="api-rest"]');
        if (mainLink) mainLink.classList.add("active");
        subMenu.style.display = "block";
        const subLink = document.querySelector(`.sub-link[data-target="${targetId}"]`);
        if (subLink) subLink.classList.add("active");
    }
}

// -----------------------------
// Navigation clics
// -----------------------------
chapterLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = link.getAttribute("data-chapter");
        showSection(targetId);
        updateActiveNav(targetId);
        if (window.innerWidth <= 768) chapitre.classList.remove("show");
    });
});

subLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = link.getAttribute("data-target");
        showSection(targetId);
        updateActiveNav(targetId);
        if (window.innerWidth <= 768) chapitre.classList.remove("show");
    });
});

document.querySelectorAll(".point, .suiv, .follow, .lien").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = link.getAttribute("data-chapter") || link.getAttribute("data-target") || link.getAttribute("href")?.substring(1);
        if (targetId) {
            showSection(targetId);
            updateActiveNav(targetId);
        }
    });
});

// -----------------------------
// Menu responsive
// -----------------------------
menuBtn.addEventListener("click", () => {
    chapitre.classList.toggle("show");
    if (chapitre.classList.contains("show")) {
        hideSubMenuInSidebar();
        showSubMenuIfNeeded();
    }
});

document.addEventListener('click', (e) => {
    if (!chapitre.contains(e.target) && !menuBtn.contains(e.target)) {
        chapitre.classList.remove('show');
    }
});

hideSubMenuInSidebar();
hideAllSections();
showSection("intro");
updateActiveNav("intro");

// -----------------------------
// Barre de recherche fonctionnelle
// -----------------------------
searchInput.addEventListener("input", function() {
    const query = this.value.toLowerCase().trim();
    let found = false;

    // Parcourir tout le texte des paragraphes, listes et titres
    const elements = contentArea.querySelectorAll("p, li, h2");
    elements.forEach(el => {
        const text = el.textContent.toLowerCase();
        if (query && text.includes(query)) {
            el.style.backgroundColor = "gray"; // surbrillance si trouvé
            found = true;
        } else {
            el.style.backgroundColor = ""; // retirer surbrillance
        }
    });

    // Afficher "Aucun résultat" si rien trouvé
    let noResultEl = document.getElementById("no-result");
    if (query && !found) {
        if (!noResultEl) {
            noResultEl = document.createElement("p");
            noResultEl.id = "no-result";
            noResultEl.textContent = "Aucun résultat";
            noResultEl.style.color = "red";
            noResultEl.style.fontWeight = "bold";
            noResultEl.style.margin = "10px 0";
            contentArea.prepend(noResultEl);
        }
    } else if (noResultEl) {
        noResultEl.remove();
    }
});

