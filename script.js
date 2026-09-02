const canvas = document.getElementById("emotionCanvas");
const ctx = canvas.getContext("2d");

const artworkLayer = document.getElementById("artworkLayer");
const artworkInfo = document.getElementById("artworkInfo");
const artworkTitle = document.getElementById("artworkTitle");
const emotionValues = document.getElementById("emotionValues");
const closeInfo = document.getElementById("closeInfo");

const emotions = [
    "Alegría",
    "Confianza",
    "Curiosidad",
    "Sorpresa",
    "Disgusto",
    "Ira",
    "Miedo",
    "Tristeza"
];

const colors = {
    Alegría: "#E2DD00",
    Confianza: "#00FA00",
    Curiosidad: "#FF9933",
    Sorpresa: "#5ABCFF",
    Disgusto: "#BB00BB",
    Ira: "#F00000",
    Miedo: "#009800",
    Tristeza: "#5152FF"
};


/* =========================================================
   DATOS
   ========================================================= */

const artworks = [
    ["Algo se está cocinando", [7.18,15.56,38.00,33.50,0.53,2.87,2.21,0.14], "images/algo-se-esta-cocinando.avif", "https://silviaandthespyglass.com/products/algo-se-esta-cocinando?_pos=28&_sid=cb35938c9&_ss=r"],
    ["Aprender a volar", [10.14,17.05,23.26,18.65,6.02,6.55,11.44,6.89], "images/aprender-a-volar.avif", "https://silviaandthespyglass.com/products/aprender-a-volar-1?_pos=19&_sid=8498fca5e&_ss=r"],
    ["Baobab", [12.03,15.64,16.40,20.48,10.11,7.40,11.38,6.57], "images/baobab.avif", "https://silviaandthespyglass.com/products/baobab?_pos=13&_sid=9c635ab51&_ss=r"],
    ["Belleza en las pequeñas cosas", [17.74,19.68,19.71,14.75,5.68,8.07,8.56,5.81], "images/belleza-en-las-pequenas-cosas.avif", "https://silviaandthespyglass.com/products/beauty-in-the-small-things?_pos=1&_sid=2877ebcde&_ss=r"],
    ["Bonito lugar donde descansar", [14.02,17.11,20.45,20.62,5.72,5.93,9.68,6.47], "images/bonito-lugar-donde-descansar.avif", "https://silviaandthespyglass.com/products/escultura-bronce-un-lugar-bonito-donde-descansar?_pos=2&_sid=df7d643de&_ss=r"],
    ["Buen viaje", [20.69,14.91,18.60,17.94,6.20,9.98,6.30,5.39], "images/buen-viaje.avif", "https://silviaandthespyglass.com/products/buen-viaje?_pos=24&_sid=ee19582c8&_ss=r"],
    ["Compañeros de sueños", [7.06,17.56,38.22,31.75,0.41,2.55,2.29,0.16], "images/companeros-de-suenos.avif", "https://silviaandthespyglass.com/products/companer-s-de-suenos?_pos=6&_sid=e176564db&_ss=r"]
];


/* =========================================================
   ESTADO
   ========================================================= */

let currentEmotion = "all";
let focusedArtwork = null;

let width = 0;
let height = 0;

const cards = [];
const particles = [];


/* =========================================================
   UTILIDADES
   ========================================================= */

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}


/* =========================================================
   RESIZE
   ========================================================= */

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();

    width = rect.width;
    height = rect.height;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    updateOriginalPositions();
}

window.addEventListener("resize", resizeCanvas);


/* =========================================================
   POSICIONES ORIGINALES
   =========================================================
   
   Cada obra tiene una posición propia.
   No hay grid.
*/

function createOrganicOriginalPositions() {

    const positions = [];

    artworks.forEach((artwork, i) => {

        /*
         * distribución pseudo-orgánica
         * basada en el índice, pero sin filas regulares
         */

        const angle = i * 2.399963;
        const radius = 0.18 + (i % 7) * 0.055;

        const x =
            0.5 +
            Math.cos(angle) * radius +
            Math.sin(i * 1.73) * 0.08;

        const y =
            0.5 +
            Math.sin(angle) * radius * 0.72 +
            Math.cos(i * 1.21) * 0.08;

        positions.push({
            x: clamp(x, 0.08, 0.92),
            y: clamp(y, 0.10, 0.90)
        });
    });

    return positions;
}

let originalPositions = createOrganicOriginalPositions();

function updateOriginalPositions() {
    if (!cards.length) return;

    originalPositions.forEach((pos, i) => {
        if (cards[i]) {
            cards[i].dataset.originalX = pos.x;
            cards[i].dataset.originalY = pos.y;
        }
    });

    if (currentEmotion === "all") {
        cards.forEach((card, i) => {
            setCardPosition(card, originalPositions[i], false);
        });
    }
}


/* =========================================================
   CREAR OBRAS
   ========================================================= */

artworks.forEach((artwork, index) => {

    const [title, values, image, link] = artwork;

    const card = document.createElement("article");

    card.className = "artwork";

    card.dataset.index = index;
    card.dataset.title = title;
    card.dataset.link = link;

    card.innerHTML = `
        <img
            class="artwork-image"
            src="${image}"
            alt="${title}"
            draggable="false"
        >
        <div class="artwork-title">${title}</div>
    `;

    artworkLayer.appendChild(card);

    cards.push(card);

    card.addEventListener("mouseenter", () => {
        if (window.innerWidth > 700) {
            focusArtwork(index);
        }
    });

    card.addEventListener("mouseleave", () => {
        if (window.innerWidth > 700) {
            unfocusArtwork();
        }
    });

    card.addEventListener("click", () => {

        /*
         * Desktop:
         * click = ir al producto
         */

        if (window.innerWidth > 700) {
            window.open(link, "_blank");
            return;
        }

        /*
         * Mobile:
         * primer click = focus
         * segundo click = producto
         */

        if (focusedArtwork === index) {
            window.location.href = link;
        } else {
            focusArtwork(index);
        }
    });
});


/* =========================================================
   POSICIÓN DE LAS OBRAS
   ========================================================= */

function setCardPosition(card, position, animate = true) {

    if (!animate) {
        card.style.transition = "none";
    } else {
        card.style.transition = "";
    }

    card.style.setProperty(
        "--x",
        `${position.x * width}px`
    );

    card.style.setProperty(
        "--y",
        `${position.y * height}px`
    );

    if (!animate) {
        requestAnimationFrame(() => {
            card.style.transition = "";
        });
    }
}


/* =========================================================
   POSICIONES DEL FILTRO
   =========================================================
   
   Esta es la parte nueva.

   NO hacemos:
       sort()
       display grid
       columnas
       filas

   Cada obra recibe una posición propia calculada a partir
   de su porcentaje y de una serie de desplazamientos
   orgánicos.
*/

function calculateFilteredPositions(emotion) {

    const emotionIndex = emotions.indexOf(emotion);

    const items = artworks
        .map((artwork, index) => ({
            index,
            value: artwork[1][emotionIndex]
        }))
        .filter(item => item.value > 0)
        .sort((a, b) => b.value - a.value);

    const result = {};

    items.forEach((item, rank) => {

        /*
         * normalized:
         * 0 = emoción más alta
         * 1 = emoción más baja
         */

        const normalized =
            items.length === 1
                ? 0
                : rank / (items.length - 1);

        /*
         * Trayectoria vertical general.
         * Pero no es una columna.
         */

        const baseY =
            0.10 +
            normalized * 0.80;

        /*
         * La posición X cambia de forma orgánica.
         * El patrón se genera por obra, no por fila.
         */

        const wave1 =
            Math.sin(rank * 1.71 + emotionIndex * 0.8) * 0.20;

        const wave2 =
            Math.cos(rank * 0.83 + emotionIndex * 1.7) * 0.13;

        const wave3 =
            Math.sin(item.index * 2.13) * 0.08;

        let x =
            0.50 +
            wave1 +
            wave2 +
            wave3;

        /*
         * Un pequeño desplazamiento adicional basado
         * directamente en el porcentaje.
         */

        x +=
            (item.value / 100 - 0.15) *
            Math.sin(item.index * 3.1) *
            0.18;

        /*
         * Y también una pequeña deformación vertical.
         */

        let y =
            baseY +
            Math.sin(item.index * 1.47 + emotionIndex) * 0.055;

        result[item.index] = {
            x: clamp(x, 0.08, 0.92),
            y: clamp(y, 0.08, 0.92)
        };
    });

    return result;
}


/* =========================================================
   APLICAR FILTRO
   ========================================================= */

function applyFilter(emotion) {

    currentEmotion = emotion;

    if (emotion === "all") {

        cards.forEach((card, index) => {

            card.classList.remove("hidden");

            /*
             * Volvemos a la posición original EXACTA.
             */

            setCardPosition(
                card,
                originalPositions[index],
                true
            );
        });

        return;
    }

    const emotionIndex = emotions.indexOf(emotion);

    const positions = calculateFilteredPositions(emotion);

    cards.forEach((card, index) => {

        const value = artworks[index][1][emotionIndex];

        /*
         * Solo desaparece si es exactamente 0.
         */

        if (value === 0) {
            card.classList.add("hidden");
            return;
        }

        card.classList.remove("hidden");

        /*
         * IMPORTANTE:
         * no modificamos el orden de cards.
         * cada obra se desplaza desde donde está ahora.
         */

        setCardPosition(
            card,
            positions[index],
            true
        );
    });
}


/* =========================================================
   FILTROS
   ========================================================= */

document.querySelectorAll(".emotion").forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".emotion")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        applyFilter(button.dataset.emotion);
    });
});


/* =========================================================
   INFO PANEL
   ========================================================= */

function showInfo(index) {

    const [title, values] = artworks[index];

    artworkTitle.textContent = title;

    emotionValues.innerHTML = "";

    emotions.forEach((emotion, i) => {

        if (
            currentEmotion !== "all" &&
            currentEmotion !== emotion
        ) {
            return;
        }

        const value = values[i];

        const row = document.createElement("div");
        row.className = "emotion-row";

        row.innerHTML = `
            <span>${emotion.toLowerCase()}</span>

            <span class="emotion-bar">
                <span
                    class="emotion-bar-fill"
                    style="
                        width:${value}%;
                        background:${colors[emotion]};
                    "
                ></span>
            </span>

            <span class="emotion-value">
                ${value.toFixed(2)}%
            </span>
        `;

        emotionValues.appendChild(row);
    });

    artworkInfo.classList.add("visible");
}


function focusArtwork(index) {

    focusedArtwork = index;

    cards.forEach((card, i) => {

        if (i === index) {
            card.classList.add("focused");
        } else {
            card.classList.remove("focused");
        }
    });

    showInfo(index);
}


function unfocusArtwork() {

    if (window.innerWidth <= 700) return;

    focusedArtwork = null;

    cards.forEach(card => {
        card.classList.remove("focused");
    });

    artworkInfo.classList.remove("visible");
}


closeInfo.addEventListener("click", event => {

    event.stopPropagation();

    focusedArtwork = null;

    cards.forEach(card => {
        card.classList.remove("focused");
    });

    artworkInfo.classList.remove("visible");
});


/* =========================================================
   PUNTOS / EMOCIONES
   ========================================================= */

function createParticles() {

    particles.length = 0;

    artworks.forEach((artwork, artworkIndex) => {

        const values = artwork[1];

        values.forEach((value, emotionIndex) => {

            /*
             * Exactamente redondeado:
             * 20.69 = 21 puntos
             */

            const count = Math.round(value);

            for (let i = 0; i < count; i++) {

                /*
                 * Algunos puntos pueden atravesar
                 * el área de las obras.
                 *
                 * No se crea un comportamiento especial
                 * de hover: siguen exactamente igual.
                 */

                const overlap =
                    Math.random() < 0.10;

                particles.push({
                    artworkIndex,
                    emotionIndex,

                    x: random(
                        overlap ? 0.25 : 0.03,
                        overlap ? 0.75 : 0.97
                    ),

                    y: random(
                        overlap ? 0.22 : 0.05,
                        overlap ? 0.78 : 0.95
                    ),

                    driftX: random(-0.00018, 0.00018),
                    driftY: random(-0.00018, 0.00018)
                });
            }
        });
    });
}

createParticles();


/* =========================================================
   ANIMACIÓN DE PUNTOS
   ========================================================= */

function animateParticles() {

    ctx.clearRect(0, 0, width, height);

    particles.forEach(particle => {

        particle.x += particle.driftX;
        particle.y += particle.driftY;

        if (particle.x < 0.02 || particle.x > 0.98) {
            particle.driftX *= -1;
        }

        if (particle.y < 0.02 || particle.y > 0.98) {
            particle.driftY *= -1;
        }

        /*
         * Con filtro:
         * solo mostramos los puntos de la emoción.
         */

        if (
            currentEmotion !== "all" &&
            emotions[particle.emotionIndex] !== currentEmotion
        ) {
            return;
        }

        const x = particle.x * width;
        const y = particle.y * height;

        ctx.beginPath();

        /*
         * Todos exactamente iguales.
         */

        ctx.arc(x, y, 2, 0, Math.PI * 2);

        ctx.globalAlpha = 1;
        ctx.fillStyle =
            colors[emotions[particle.emotionIndex]];

        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}


/* =========================================================
   INICIO
   ========================================================= */

resizeCanvas();

cards.forEach((card, index) => {
    setCardPosition(
        card,
        originalPositions[index],
        false
    );
});

animateParticles();
