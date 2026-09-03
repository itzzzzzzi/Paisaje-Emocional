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

let animationTime = 0;

const artworkMotion = [];

const MIN_ARTWORK_DISTANCE = 145;

const POINT_ORBIT_RADIUS = 70;
const POINT_ORBIT_VARIATION = 32;


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
   POSICIONES ORIGINALES
   ========================================================= */

function createOrganicOriginalPositions() {

    const positions = [];

    artworks.forEach((artwork, i) => {

        const angle = i * 2.399963;
        const radius = 0.18 + (i % 7) * 0.055;

        let x =
            0.5 +
            Math.cos(angle) * radius +
            Math.sin(i * 1.73) * 0.08;

        let y =
            0.5 +
            Math.sin(angle) * radius * 0.72 +
            Math.cos(i * 1.21) * 0.08;

        x = clamp(x, 0.10, 0.90);
        y = clamp(y, 0.12, 0.88);

        for (let attempt = 0; attempt < 20; attempt++) {

            let valid = true;

            for (const previous of positions) {

                const dx = (x - previous.x) * width;
                const dy = (y - previous.y) * height;

                const distance = Math.sqrt(
                    dx * dx + dy * dy
                );

                if (distance < MIN_ARTWORK_DISTANCE) {
                    valid = false;
                    break;
                }
            }

            if (valid) break;

            x += random(-0.06, 0.06);
            y += random(-0.06, 0.06);

            x = clamp(x, 0.10, 0.90);
            y = clamp(y, 0.12, 0.88);
        }

        positions.push({ x, y });
    });

    return positions;
}

let originalPositions = createOrganicOriginalPositions();


/* =========================================================
   MOVIMIENTO ORGÁNICO DE LAS OBRAS
   ========================================================= */

artworks.forEach(() => {

    artworkMotion.push({
        phaseX: random(0, Math.PI * 2),
        phaseY: random(0, Math.PI * 2),

        speedX: random(0.00012, 0.00022),
        speedY: random(0.00010, 0.00020),

        amplitudeX: random(7, 15),
        amplitudeY: random(6, 13)
    });
});


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

    originalPositions = createOrganicOriginalPositions();

    if (currentEmotion === "all") {

        cards.forEach((card, index) => {

            setCardPosition(
                card,
                originalPositions[index],
                false
            );
        });
    }
}

window.addEventListener("resize", resizeCanvas);


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
    card.dataset.filterMoving = "false";

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

        if (window.innerWidth > 700) {

            window.open(link, "_blank");

            return;
        }

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
   POSICIÓN ACTUAL
   ========================================================= */

function getArtworkPosition(index) {

    const card = cards[index];

    const x =
        parseFloat(
            card.style.getPropertyValue("--x")
        ) || originalPositions[index].x * width;

    const y =
        parseFloat(
            card.style.getPropertyValue("--y")
        ) || originalPositions[index].y * height;

    return {
        x,
        y
    };
}


/* =========================================================
   POSICIONES DEL FILTRO
   ========================================================= */

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

        const normalized =
            items.length === 1
                ? 0
                : rank / (items.length - 1);

        const baseY =
            0.10 +
            normalized * 0.80;

        const wave1 =
            Math.sin(
                rank * 1.71 +
                emotionIndex * 0.8
            ) * 0.20;

        const wave2 =
            Math.cos(
                rank * 0.83 +
                emotionIndex * 1.7
            ) * 0.13;

        const wave3 =
            Math.sin(item.index * 2.13) * 0.08;

        let x =
            0.50 +
            wave1 +
            wave2 +
            wave3;

        x +=
            (item.value / 100 - 0.15) *
            Math.sin(item.index * 3.1) *
            0.18;

        let y =
            baseY +
            Math.sin(
                item.index * 1.47 +
                emotionIndex
            ) * 0.055;

        x = clamp(x, 0.10, 0.90);
        y = clamp(y, 0.10, 0.90);

        /*
         * Evitar superposición de cuadros.
         */

        let attempts = 0;

        while (attempts < 30) {

            let collision = false;

            for (const existing of Object.values(result)) {

                const dx =
                    (x - existing.x) * width;

                const dy =
                    (y - existing.y) * height;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                if (distance < MIN_ARTWORK_DISTANCE) {

                    collision = true;

                    x +=
                        Math.sin(
                            attempts * 2.4 +
                            item.index
                        ) * 0.035;

                    y +=
                        Math.cos(
                            attempts * 1.8 +
                            item.index
                        ) * 0.035;

                    break;
                }
            }

            if (!collision) break;

            x = clamp(x, 0.10, 0.90);
            y = clamp(y, 0.10, 0.90);

            attempts++;
        }

        result[item.index] = {
            x,
            y
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

            card.dataset.filterMoving = "true";

            setCardPosition(
                card,
                originalPositions[index],
                true
            );

            card.dataset.filteredPosition =
                JSON.stringify(
                    originalPositions[index]
                );

            setTimeout(() => {

                card.dataset.filterMoving = "false";

            }, 2900);
        });

        return;
    }

    const emotionIndex =
        emotions.indexOf(emotion);

    const positions =
        calculateFilteredPositions(emotion);

    cards.forEach((card, index) => {

        const value =
            artworks[index][1][emotionIndex];

        if (value === 0) {

            card.classList.add("hidden");

            return;
        }

        card.classList.remove("hidden");

        const position =
            positions[index];

        card.dataset.filteredPosition =
            JSON.stringify(position);

        card.dataset.filterMoving = "true";

        card.style.transition =
            "transform 3.4s cubic-bezier(.16,.72,.25,1)";

        setCardPosition(
            card,
            position,
            true
        );

        setTimeout(() => {

            card.dataset.filterMoving = "false";

        }, 3500);
    });
}


/* =========================================================
   FILTROS
   ========================================================= */

document
    .querySelectorAll(".emotion")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".emotion")
                .forEach(btn => {
                    btn.classList.remove("active");
                });

            button.classList.add("active");

            applyFilter(
                button.dataset.emotion
            );
        });
    });


/* =========================================================
   INFO PANEL
   ========================================================= */

function showInfo(index) {

    const [title, values] =
        artworks[index];

    artworkTitle.textContent =
        title;

    emotionValues.innerHTML = "";

    emotions.forEach((emotion, i) => {

        if (
            currentEmotion !== "all" &&
            currentEmotion !== emotion
        ) {
            return;
        }

        const value = values[i];

        const row =
            document.createElement("div");

        row.className =
            "emotion-row";

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

    if (window.innerWidth <= 700) {
        return;
    }

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
   PUNTOS
   ========================================================= */

function createParticles() {

    particles.length = 0;

    artworks.forEach((artwork, artworkIndex) => {

        const values = artwork[1];

        values.forEach((value, emotionIndex) => {

            const count =
                Math.round(value);

            for (let i = 0; i < count; i++) {

                const angle =
                    (i / Math.max(count, 1)) *
                    Math.PI * 2 +
                    random(-0.7, 0.7);

                const radius =
                    random(
                        18,
                        POINT_ORBIT_RADIUS +
                        random(
                            -POINT_ORBIT_VARIATION,
                            POINT_ORBIT_VARIATION
                        )
                    );

                particles.push({

                    artworkIndex,

                    emotionIndex,

                    angle,

                    radius,

                    angularSpeed:
                        random(
                            -0.0008,
                            0.0008
                        ),

                    radialSpeed:
                        random(
                            -0.015,
                            0.015
                        ),

                    phase:
                        random(
                            0,
                            Math.PI * 2
                        )
                });
            }
        });
    });
}

createParticles();


/* =========================================================
   MOVIMIENTO DE LOS PUNTOS
   ========================================================= */

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    particles.forEach(particle => {

        const artworkIsFocused =
            focusedArtwork ===
            particle.artworkIndex;

        /*
         * Los puntos se paran junto con su obra.
         */

        if (!artworkIsFocused) {

            particle.angle +=
                particle.angularSpeed;

            particle.radius +=
                particle.radialSpeed;

            if (particle.radius < 18) {

                particle.radius = 18;

                particle.radialSpeed *= -1;
            }

            if (
                particle.radius >
                POINT_ORBIT_RADIUS +
                POINT_ORBIT_VARIATION
            ) {

                particle.radius =
                    POINT_ORBIT_RADIUS +
                    POINT_ORBIT_VARIATION;

                particle.radialSpeed *= -1;
            }
        }

        const artworkPosition =
            getArtworkPosition(
                particle.artworkIndex
            );

        const organicRadius =
            particle.radius +
            Math.sin(
                animationTime * 0.018 +
                particle.phase
            ) * 7;

        const x =
            artworkPosition.x +
            Math.cos(
                particle.angle
            ) *
            organicRadius;

        const y =
            artworkPosition.y +
            Math.sin(
                particle.angle
            ) *
            organicRadius;

        if (
            currentEmotion !== "all" &&
            emotions[
                particle.emotionIndex
            ] !== currentEmotion
        ) {
            return;
        }

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            2,
            0,
            Math.PI * 2
        );

        ctx.globalAlpha = 1;

        ctx.fillStyle =
            colors[
                emotions[
                    particle.emotionIndex
                ]
            ];

        ctx.fill();
    });

    animationTime += 1;

    requestAnimationFrame(
        animateParticles
    );
}


/* =========================================================
   MOVIMIENTO DE LAS OBRAS
   ========================================================= */

function animateArtworks() {

    cards.forEach((card, index) => {

        /*
         * Obra seleccionada = completamente quieta.
         */

        if (focusedArtwork === index) {
            return;
        }

        /*
         * Mientras está viajando hacia la posición
         * del filtro, no añadimos movimiento.
         */

        if (
            card.dataset.filterMoving === "true"
        ) {
            return;
        }

        let base;

        if (
            currentEmotion === "all"
        ) {

            base =
                originalPositions[index];

        } else if (
            card.dataset.filteredPosition
        ) {

            base =
                JSON.parse(
                    card.dataset.filteredPosition
                );

        } else {

            base =
                originalPositions[index];
        }

        const motion =
            artworkMotion[index];

        const offsetX =
            Math.sin(
                animationTime *
                motion.speedX +
                motion.phaseX
            ) *
            motion.amplitudeX;

        const offsetY =
            Math.cos(
                animationTime *
                motion.speedY +
                motion.phaseY
            ) *
            motion.amplitudeY;

        const x =
            base.x * width +
            offsetX;

        const y =
            base.y * height +
            offsetY;

        card.style.setProperty(
            "--x",
            `${x}px`
        );

        card.style.setProperty(
            "--y",
            `${y}px`
        );
    });

    requestAnimationFrame(
        animateArtworks
    );
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

animateArtworks();
