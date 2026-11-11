
/* =========================================
   FEZ FAE'EZHA — JAVASCRIPT
   ========================================= */

/* BUSINESS CONFIGURATION
   Update these details when the client supplies them.
*/

const FEZ_CONFIG = {
    whatsapp: "",
    instagram: "",
    facebook: ""
};


/* =========================================
   MOBILE NAVIGATION
   ========================================= */

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navigation.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute("aria-expanded", isOpen);

    });

    navigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

    document.addEventListener("click", event => {

        if (
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navigation.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            navigation.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

}


/* =========================================
   HEADER SCROLL EFFECT
   ========================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}, { passive: true });


/* =========================================
   WHATSAPP INTEGRATION
   ========================================= */

function openWhatsApp() {

    if (!FEZ_CONFIG.whatsapp) {

        alert("WhatsApp contact details will be available soon.");

        return;

    }

    const message = encodeURIComponent(
        "Hello FEZ Fae'ezha, I would like to make an enquiry about your fashion collections."
    );

    const number = FEZ_CONFIG.whatsapp.replace(/\D/g, "");

    window.open(
        `https://wa.me/${number}?text=${message}`,
        "_blank",
        "noopener,noreferrer"
    );

}

const contactButton = document.getElementById("contactButton");
const footerWhatsApp = document.getElementById("footerWhatsApp");

if (contactButton) {

    contactButton.addEventListener("click", event => {

        event.preventDefault();
        openWhatsApp();

    });

}

if (footerWhatsApp) {

    footerWhatsApp.addEventListener("click", event => {

        event.preventDefault();
        openWhatsApp();

    });

}


/* =========================================
   SOCIAL MEDIA INTEGRATION
   ========================================= */

const instagramLink = document.getElementById("footerInstagram");
const facebookLink = document.getElementById("footerFacebook");

if (instagramLink) {

    if (FEZ_CONFIG.instagram) {

        instagramLink.href = FEZ_CONFIG.instagram;
        instagramLink.target = "_blank";
        instagramLink.rel = "noopener noreferrer";

    } else {

        instagramLink.addEventListener("click", event => {
            event.preventDefault();
        });

    }

}

if (facebookLink) {

    if (FEZ_CONFIG.facebook) {

        facebookLink.href = FEZ_CONFIG.facebook;
        facebookLink.target = "_blank";
        facebookLink.rel = "noopener noreferrer";

    } else {

        facebookLink.addEventListener("click", event => {
            event.preventDefault();
        });

    }

}


/* =========================================
   COPYRIGHT YEAR
   ========================================= */

const copyright = document.querySelector(".footer-bottom span");

if (copyright) {

    copyright.textContent =
        `© ${new Date().getFullYear()} FEZ FAE'EZHA. ALL RIGHTS RESERVED.`;

}


/* =========================================
   RESPONSIVE NAVIGATION RESET
   ========================================= */

window.addEventListener("resize", () => {

    if (window.innerWidth > 760 && navigation && menuToggle) {

        navigation.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");

    }

});


/* PRODUCT CARD NAVIGATION */
document.querySelectorAll('.page-card,.editorial-card,.collection-card,.category-card,.gallery-item').forEach(card=>{
    const image=card.querySelector('img');
    if(!image)return;

    image.addEventListener('click',()=>{
        const title=card.querySelector('h2,h3')?.textContent.trim()||image.alt||'FEZ Fashion Design';
        const description=card.querySelector('p')?.textContent.trim()||'A distinctive expression of elegance and personal style.';
        const params=new URLSearchParams({
            name:title,
            image:image.getAttribute('src'),
            description:description,
            price:card.querySelector('.price-tag')?.dataset.price || 'Sample price'
        });
        window.location.href=`product.html?${params.toString()}`;
    });
});
