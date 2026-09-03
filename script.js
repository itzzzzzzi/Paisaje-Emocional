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

const artworks = [
    ["Algo se está cocinando", [7.18,15.56,38.00,33.50,0.53,2.87,2.21,0.14], "images/algo-se-esta-cocinando.avif", "https://silviaandthespyglass.com/products/algo-se-esta-cocinando?_pos=28&_sid=cb35938c9&_ss=r"],
    ["Aprender a volar", [10.14,17.05,23.26,18.65,6.02,6.55,11.44,6.89], "images/aprender-a-volar.avif", "https://silviaandthespyglass.com/products/aprender-a-volar-1?_pos=19&_sid=8498fca5e&_ss=r"],
    ["Baobab", [12.03,15.64,16.40,20.48,10.11,7.40,11.38,6.57], "images/baobab.avif", "https://silviaandthespyglass.com/products/baobab?_pos=13&_sid=9c635ab51&_ss=r"],
    ["Belleza en las pequeñas cosas", [17.74,19.68,19.71,14.75,5.68,8.07,8.56,5.81], "images/belleza-en-las-pequenas-cosas.avif", "https://silviaandthespyglass.com/products/beauty-in-the-small-things?_pos=1&_sid=2877ebcde&_ss=r"],
    ["Bonito lugar donde descansar", [14.02,17.11,20.45,20.62,5.72,5.93,9.68,6.47], "images/bonito-lugar-donde-descansar.avif", "https://silviaandthespyglass.com/products/escultura-bronce-un-lugar-bonito-donde-descansar?_pos=2&_sid=df7d643de&_ss=r"],
    ["Buen viaje", [20.69,14.91,18.60,17.94,6.20,9.98,6.30,5.39], "images/buen-viaje.avif", "https://silviaandthespyglass.com/products/buen-viaje?_pos=24&_sid=ee19582c8&_ss=r"],
    ["Compañeros de sueños", [7.06,17.56,38.22,31.75,0.41,2.55,2.29,0.16], "images/companeros-de-suenos.avif", "https://silviaandthespyglass.com/products/companer-s-de-suenos?_pos=6&_sid=e176564db&_ss=r"],

    ["Crisálida I", [6.15,15.22,36.25,36.02,0.89,2.62,2.84,0.01], null, null],
    ["Crisálida II", [7.15,16.22,37.23,34.24,0.70,2.51,1.96,0.00], null, null],
    ["Crisálida III", [6.46,15.22,41.42,31.33,0.69,2.48,2.38,0.04], null, null],
    ["Cuidado mutuo", [18.22,17.67,24.46,14.30,6.48,7.20,7.89,3.79], null, null],
    ["Desconexión", [6.41,14.21,38.28,34.40,1.36,2.71,2.30,0.32], null, null],
    ["Descubre la belleza a tu alrededor", [7.47,17.52,36.29,33.29,0.74,2.35,2.03,0.30], null, null],
    ["Donde la música me lleve", [15.14,22.90,22.07,13.84,6.46,5.40,7.74,6.45], null, null],
    ["Empatía", [6.22,18.84,39.55,31.59,0.24,1.69,1.84,0.04], null, null],
    ["Encuentra tu lado más profundo", [7.69,17.66,37.03,33.61,0.83,1.20,1.84,0.14], null, null],
    ["Equilibrio interior", [12.78,19.90,17.13,16.01,9.65,7.09,10.16,7.28], null, null],
    ["Escucha a la naturaleza", [14.09,14.69,18.91,19.84,6.59,5.44,13.11,7.33], null, null],
    ["Espacio para la ternura I", [9.53,19.39,36.39,30.39,1.13,1.74,1.36,0.06], null, null],
    ["Espacio para la ternura II", [11.04,19.43,36.83,28.24,1.03,1.95,1.40,0.08], null, null],
    ["Fragilidad", [9.38,14.40,37.86,32.64,0.81,2.49,2.18,0.24], null, null],
    ["Ginkgo biloba árbol de la vida", [7.22,17.36,39.12,30.76,0.92,2.77,1.74,0.11], null, null],
    ["Huele a hogar", [16.39,20.77,14.25,17.55,5.69,10.51,8.40,6.45], null, null],
    ["Kintsugi: Cicatrices del tiempo", [24.67,12.59,17.10,16.38,6.93,5.52,10.43,6.39], null, null],
    ["Libertad", [18.17,16.81,15.76,14.38,10.42,9.16,9.25,6.04], null, null],
    ["Ligera de equipaje", [7.13,16.36,40.48,30.09,0.79,3.21,1.90,0.05], null, null],
    ["Llenarse de vida", [5.78,16.13,39.29,33.51,0.50,2.66,1.95,0.18], null, null],
    ["Mantén la calma y suena", [8.63,19.89,22.63,18.75,7.15,7.75,8.98,6.20], null, null],
    ["Metamorfosis", [17.43,20.61,13.10,20.37,5.74,8.27,7.73,6.75], null, null],
    ["Metamorfosis (escultura)", [14.59,17.46,22.77,15.13,7.20,6.72,8.56,7.56], null, null],
    ["Mi lugar", [18.31,16.73,15.91,17.71,7.06,6.20,9.87,8.21], null, null],
    ["Mi tiempo a solas", [16.36,16.80,20.14,14.51,7.60,8.07,9.66,6.87], null, null],
    ["Opuestos", [18.62,20.76,18.21,16.75,6.46,5.96,8.71,4.53], null, null],
    ["Pausa", [18.11,10.12,16.02,20.79,6.00,9.50,11.72,7.74], null, null],
    ["Pausa II", [17.13,17.22,14.64,14.56,9.87,9.18,8.18,9.21], null, null],
    ["Perspectiva", [21.11,18.73,17.06,14.84,5.88,8.85,7.69,5.84], null, null],
    ["Perspectiva emocional", [12.45,18.67,16.37,15.57,9.90,7.66,11.71,7.67], null, null],
    ["Quietud", [16.34,21.53,20.00,12.58,8.02,7.67,10.28,3.58], null, null],
    ["Quisiera ser un caballito de mar", [7.23,17.34,39.60,30.95,0.44,2.42,1.87,0.14], null, null],
    ["Quisiera ser un pájaro", [5.30,14.68,38.80,35.62,0.52,2.27,2.54,0.27], null, null],
    ["Quisiera ser un pez", [12.49,21.52,14.56,18.73,6.50,7.26,13.57,5.36], null, null],
    ["Sentirse como en casa", [19.63,20.79,18.92,16.63,6.39,6.27,6.63,4.74], null, null],
    ["Ser parte de la naturaleza", [17.86,19.60,16.05,18.01,8.19,5.92,9.44,4.93], null, null],
    ["Ser un pez", [6.42,14.10,38.81,35.89,0.51,2.49,1.77,0.01], null, null],
    ["Serendipia", [14.89,11.95,19.94,20.64,6.87,11.10,7.21,7.41], null, null],
    ["Soñadora", [5.57,15.48,38.29,35.73,0.65,2.32,1.91,0.04], null, null],
    ["Sumérgete en la felicidad", [12.52,17.33,19.08,17.97,9.23,7.70,6.95,9.21], null, null],
    ["Tomate tu tiempo", [15.14,15.20,20.93,15.14,10.09,5.35,11.23,6.92], null, null],
    ["Transformación", [15.43,23.96,19.98,7.57,6.30,8.03,9.90,8.83], null, null],
    ["Un lugar bonito donde descansar", [10.74,11.96,19.69,20.70,11.14,9.40,8.53,7.85], null, null],
    ["Una cabeza llena de sueños", [14.00,15.39,23.94,15.66,6.70,6.04,9.27,9.00], null, null],
    ["Una cabeza llena de sueños (escultura)", [15.11,11.43,21.44,21.96,6.98,7.88,7.13,8.08], null, null],
    ["Viaje a la felicidad", [8.82,14.92,39.13,31.92,0.61,2.92,1.51,0.18], null, null],
    ["Vivir con creatividad", [4.86,14.38,43.48,30.88,0.87,3.00,2.36,0.17], null, null],
    ["Volver a nacer", [13.61,18.43,15.61,14.75,8.87,9.00,9.21,10.51], null, null],
    ["Yoga time (escultura)", [22.65,13.37,22.47,11.48,6.51,7.59,8.62,7.32], null, null]
];

let currentEmotion = "all";
let focusedArtwork = null;

let width = 0;
let height = 0;

const cards = [];
const particles = [];
const artworkMotion = [];

let animationTime = 0;
let filterTransitionToken = 0;

const MIN_ARTWORK_DISTANCE = 205;

const POINT_MIN_RADIUS = 7;
const POINT_MAX_RADIUS = 54;

const SAFE_SIDE = 105;
const SAFE_TOP = 115;
const SAFE_BOTTOM = 115;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

/* -------------------------------------------------------
   POSICIONES
------------------------------------------------------- */

function isPositionValid(x, y, positions) {

    for (const previous of positions) {

        const dx = (x - previous.x) * width;
        const dy = (y - previous.y) * height;

        const distance = Math.sqrt(
            dx * dx + dy * dy
        );

        if (distance < MIN_ARTWORK_DISTANCE) {
            return false;
        }
    }

    return true;
}

function createOrganicOriginalPositions() {

    const positions = [];

    const minX = SAFE_SIDE / width;
    const maxX = 1 - minX;

    const minY = SAFE_TOP / height;
    const maxY = 1 - SAFE_BOTTOM / height;

    artworks.forEach((artwork, i) => {

        let x;
        let y;
        let valid = false;

        for (let attempt = 0; attempt < 300; attempt++) {

            const angle = i * 2.399963 + attempt * 0.73;
            const radius =
                0.12 +
                (i % 6) * 0.055 +
                (attempt * 0.006);

            x =
                0.5 +
                Math.cos(angle) * radius +
                Math.sin(i * 1.73 + attempt) * 0.09;

            y =
                0.5 +
                Math.sin(angle) * radius * 0.70 +
                Math.cos(i * 1.21 + attempt) * 0.08;

            x = clamp(x, minX, maxX);
            y = clamp(y, minY, maxY);

            if (isPositionValid(x, y, positions)) {
                valid = true;
                break;
            }
        }

        if (!valid) {

            for (let yTry = minY; yTry <= maxY; yTry += 0.035) {

                for (let xTry = minX; xTry <= maxX; xTry += 0.035) {

                    if (
                        isPositionValid(
                            xTry,
                            yTry,
                            positions
                        )
                    ) {

                        x = xTry;
                        y = yTry;
                        valid = true;
                        break;
                    }
                }

                if (valid) break;
            }
        }

        positions.push({ x, y });
    });

    return positions;
}

function getSafePosition(x, y) {

    const minX = SAFE_SIDE;
    const maxX = width - SAFE_SIDE;

    const minY = SAFE_TOP;
    const maxY = height - SAFE_BOTTOM;

    return {
        x: clamp(x, minX, maxX),
        y: clamp(y, minY, maxY)
    };
}

/* -------------------------------------------------------
   MOVIMIENTO
------------------------------------------------------- */

artworks.forEach(() => {

    artworkMotion.push({
        phaseX: random(0, Math.PI * 2),
        phaseY: random(0, Math.PI * 2),

        speedX: random(0.00045, 0.00075),
        speedY: random(0.00038, 0.00068),

        amplitudeX: random(12, 21),
        amplitudeY: random(10, 19)
    });
});

let originalPositions = [];

function resizeCanvas() {

    const rect = canvas.getBoundingClientRect();

    width = rect.width;
    height = rect.height;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    originalPositions =
        createOrganicOriginalPositions();

    cards.forEach((card, index) => {

        if (currentEmotion === "all") {

            setCardPosition(
                card,
                originalPositions[index],
                false
            );

        } else if (card.dataset.filteredPosition) {

            const position =
                JSON.parse(
                    card.dataset.filteredPosition
                );

            setCardPosition(
                card,
                position,
                false
            );
        }
    });
}

window.addEventListener(
    "resize",
    resizeCanvas
);

/* -------------------------------------------------------
   CREAR CUADROS
------------------------------------------------------- */

artworks.forEach((artwork, index) => {

    const [
        title,
        values,
        image,
        link
    ] = artwork;

    const card =
        document.createElement("article");

    card.className = "artwork";

    card.dataset.index = index;
    card.dataset.title = title;
    card.dataset.link = link || "";
    card.dataset.filterMoving = "false";

    if (image) {

        card.innerHTML = `
            <img
                class="artwork-image"
                src="${image}"
                alt="${title}"
                draggable="false"
            >
            <div class="artwork-title">
                ${title}
            </div>
        `;

    } else {

        card.innerHTML = `
            <div class="artwork-title">
                ${title}
            </div>
        `;
    }

    artworkLayer.appendChild(card);
    cards.push(card);

    card.addEventListener(
        "mouseenter",
        () => {

            if (window.innerWidth > 700) {
                focusArtwork(index);
            }
        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            if (window.innerWidth > 700) {
                unfocusArtwork();
            }
        }
    );

    card.addEventListener(
        "click",
        () => {

            if (
                window.innerWidth > 700
            ) {

                if (link) {
                    window.open(
                        link,
                        "_blank"
                    );
                }

                return;
            }

            if (
                focusedArtwork === index
            ) {

                if (link) {
                    window.location.href =
                        link;
                }

            } else {

                focusArtwork(index);
            }
        }
    );
});

/* -------------------------------------------------------
   POSICIÓN DE CUADROS
------------------------------------------------------- */

function setCardPosition(
    card,
    position,
    animate = true
) {

    if (!animate) {
        card.style.transition = "none";
    } else {
        card.style.transition = "";
    }

    const safe =
        getSafePosition(
            position.x * width,
            position.y * height
        );

    card.style.setProperty(
        "--x",
        `${safe.x}px`
    );

    card.style.setProperty(
        "--y",
        `${safe.y}px`
    );

    if (!animate) {

        requestAnimationFrame(() => {
            card.style.transition = "";
        });
    }
}

function getArtworkPosition(index) {

    const card = cards[index];

    const x =
        parseFloat(
            card.style.getPropertyValue(
                "--x"
            )
        ) ||
        originalPositions[index].x *
            width;

    const y =
        parseFloat(
            card.style.getPropertyValue(
                "--y"
            )
        ) ||
        originalPositions[index].y *
            height;

    return {
        x,
        y
    };
}

/* -------------------------------------------------------
   POSICIONES DE FILTRO
------------------------------------------------------- */

function calculateFilteredPositions(
    emotion
) {

    const emotionIndex =
        emotions.indexOf(emotion);

    const items =
        artworks
            .map((artwork, index) => ({
                index,
                value:
                    artwork[1][emotionIndex]
            }))
            .filter(
                item => item.value > 0
            )
            .sort(
                (a, b) =>
                    b.value - a.value
            );

    const result = {};

    const minX =
        SAFE_SIDE / width;

    const maxX =
        1 -
        SAFE_SIDE / width;

    const minY =
        SAFE_TOP / height;

    const maxY =
        1 -
        SAFE_BOTTOM / height;

    items.forEach(
        (item, rank) => {

            const normalized =
                items.length === 1
                    ? 0.5
                    : rank /
                      (items.length - 1);

            let x =
                0.50 +
                Math.sin(
                    rank * 1.43 +
                    emotionIndex * 0.9
                ) *
                0.25;

            x +=
                Math.cos(
                    rank * 0.67 +
                    emotionIndex
                ) *
                0.10;

            x +=
                Math.sin(
                    item.index * 1.91
                ) *
                0.08;

            let y =
                minY +
                normalized *
                (maxY - minY);

            y +=
                Math.sin(
                    rank * 1.17 +
                    item.index
                ) *
                0.045;

            x = clamp(
                x,
                minX,
                maxX
            );

            y = clamp(
                y,
                minY,
                maxY
            );

            let attempts = 0;

            while (
                attempts < 250 &&
                !isPositionValid(
                    x,
                    y,
                    Object.values(result)
                )
            ) {

                const angle =
                    attempts * 2.17 +
                    item.index * 0.83;

                const distance =
                    0.025 +
                    attempts * 0.003;

                x +=
                    Math.cos(angle) *
                    distance;

                y +=
                    Math.sin(angle) *
                    distance;

                x = clamp(
                    x,
                    minX,
                    maxX
                );

                y = clamp(
                    y,
                    minY,
                    maxY
                );

                attempts++;
            }

            result[item.index] = {
                x,
                y
            };
        }
    );

    return result;
}

/* -------------------------------------------------------
   FILTROS
------------------------------------------------------- */

function applyFilter(emotion) {

    currentEmotion = emotion;

    filterTransitionToken++;

    const thisTransition =
        filterTransitionToken;

    if (emotion === "all") {

        cards.forEach(
            (card, index) => {

                card.classList.remove(
                    "hidden"
                );

                card.dataset.filterMoving =
                    "true";

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

                    if (
                        thisTransition !==
                        filterTransitionToken
                    ) {
                        return;
                    }

                    card.dataset.filterMoving =
                        "false";

                }, 3900);
            }
        );

        return;
    }

    const emotionIndex =
        emotions.indexOf(emotion);

    const positions =
        calculateFilteredPositions(
            emotion
        );

    cards.forEach(
        (card, index) => {

            const value =
                artworks[index][1][
                    emotionIndex
                ];

            if (value === 0) {

                card.classList.add(
                    "hidden"
                );

                return;
            }

            card.classList.remove(
                "hidden"
            );

            const position =
                positions[index];

            card.dataset.filteredPosition =
                JSON.stringify(
                    position
                );

            card.dataset.filterMoving =
                "true";

            card.style.transition =
                "transform 4.1s cubic-bezier(.16,.72,.25,1)";

            setCardPosition(
                card,
                position,
                true
            );

            setTimeout(() => {

                if (
                    thisTransition !==
                    filterTransitionToken
                ) {
                    return;
                }

                card.dataset.filterMoving =
                    "false";

            }, 4200);
        }
    );
}

document
    .querySelectorAll(".emotion")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".emotion"
                    )
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );
                    });

                button.classList.add(
                    "active"
                );

                applyFilter(
                    button.dataset.emotion
                );
            }
        );
    });

/* -------------------------------------------------------
   INFORMACIÓN
------------------------------------------------------- */

function showInfo(index) {

    const [
        title,
        values
    ] = artworks[index];

    artworkTitle.textContent =
        title;

    emotionValues.innerHTML = "";

    emotions.forEach(
        (emotion, i) => {

            if (
                currentEmotion !== "all" &&
                currentEmotion !== emotion
            ) {
                return;
            }

            const value =
                values[i];

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "emotion-row";

            row.innerHTML = `
                <span>
                    ${emotion.toLowerCase()}
                </span>

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

            emotionValues.appendChild(
                row
            );
        }
    );

    artworkInfo.classList.add(
        "visible"
    );
}

function focusArtwork(index) {

    focusedArtwork = index;

    cards.forEach(
        (card, i) => {

            if (i === index) {

                card.classList.add(
                    "focused"
                );

            } else {

                card.classList.remove(
                    "focused"
                );
            }
        }
    );

    showInfo(index);
}

function unfocusArtwork() {

    if (
        window.innerWidth <= 700
    ) {
        return;
    }

    focusedArtwork = null;

    cards.forEach(card => {

        card.classList.remove(
            "focused"
        );
    });

    artworkInfo.classList.remove(
        "visible"
    );
}

closeInfo.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        focusedArtwork = null;

        cards.forEach(card => {

            card.classList.remove(
                "focused"
            );
        });

        artworkInfo.classList.remove(
            "visible"
        );
    }
);

/* -------------------------------------------------------
   PUNTOS
------------------------------------------------------- */

function createParticles() {

    particles.length = 0;

    artworks.forEach(
        (artwork, artworkIndex) => {

            const values =
                artwork[1];

            values.forEach(
                (value, emotionIndex) => {

                    const count =
                        Math.round(value);

                    for (
                        let i = 0;
                        i < count;
                        i++
                    ) {

                        /*
                         * La mayoría de puntos están
                         * alrededor del cuadro.
                         * Una pequeña parte nace
                         * prácticamente encima.
                         */

                        const isOverArtwork =
                            Math.random() < 0.18;

                        const angle =
                            random(
                                0,
                                Math.PI * 2
                            );

                        const radius =
                            isOverArtwork
                                ? random(
                                      0,
                                      15
                                  )
                                : random(
                                      POINT_MIN_RADIUS,
                                      POINT_MAX_RADIUS
                                  );

                        particles.push({

                            artworkIndex,

                            emotionIndex,

                            angle,

                            radius,

                            angularSpeed:
                                random(
                                    -0.0018,
                                    0.0018
                                ),

                            radialSpeed:
                                random(
                                    -0.025,
                                    0.025
                                ),

                            phase:
                                random(
                                    0,
                                    Math.PI * 2
                                )
                        });
                    }
                }
            );
        }
    );
}

createParticles();

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    particles.forEach(
        particle => {

            const artworkIsFocused =
                focusedArtwork ===
                particle.artworkIndex;

            if (
                !artworkIsFocused
            ) {

                particle.angle +=
                    particle.angularSpeed;

                particle.radius +=
                    particle.radialSpeed;

                if (
                    particle.radius <
                    0
                ) {

                    particle.radius = 0;

                    particle.radialSpeed *= -1;
                }

                if (
                    particle.radius >
                    POINT_MAX_RADIUS
                ) {

                    particle.radius =
                        POINT_MAX_RADIUS;

                    particle.radialSpeed *= -1;
                }
            }

            const artworkPosition =
                getArtworkPosition(
                    particle.artworkIndex
                );

            /*
             * Los puntos siguen exactamente
             * la posición actual del cuadro,
             * incluida su animación.
             */

            const organicRadius =
                particle.radius +
                Math.sin(
                    animationTime * 0.035 +
                    particle.phase
                ) *
                (
                    particle.radius <
                    15
                        ? 2
                        : 5
                );

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

            ctx.globalAlpha = 1;
        }
    );

    animationTime += 1;

    requestAnimationFrame(
        animateParticles
    );
}

/* -------------------------------------------------------
   ANIMACIÓN DE CUADROS
------------------------------------------------------- */

function animateArtworks() {

    cards.forEach(
        (card, index) => {

            if (
                focusedArtwork === index
            ) {
                return;
            }

            if (
                card.dataset.filterMoving ===
                "true"
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

            let offsetX =
                Math.sin(
                    animationTime *
                    motion.speedX +
                    motion.phaseX
                ) *
                motion.amplitudeX;

            let offsetY =
                Math.cos(
                    animationTime *
                    motion.speedY +
                    motion.phaseY
                ) *
                motion.amplitudeY;

            /*
             * Movimiento adicional muy suave
             * para que nunca parezca una trayectoria
             * mecánica.
             */

            offsetX +=
                Math.sin(
                    animationTime *
                    0.001 +
                    index
                ) *
                5;

            offsetY +=
                Math.cos(
                    animationTime *
                    0.0013 +
                    index * 0.7
                ) *
                4;

            const safe =
                getSafePosition(
                    base.x * width +
                        offsetX,
                    base.y * height +
                        offsetY
                );

            card.style.setProperty(
                "--x",
                `${safe.x}px`
            );

            card.style.setProperty(
                "--y",
                `${safe.y}px`
            );
        }
    );

    requestAnimationFrame(
        animateArtworks
    );
}

/* -------------------------------------------------------
   INICIO
------------------------------------------------------- */

/*
 * No hay animación de entrada:
 * los cuadros aparecen directamente
 * en su posición inicial.
 */

resizeCanvas();

cards.forEach(
    (card, index) => {

        setCardPosition(
            card,
            originalPositions[index],
            false
        );
    }
);

animateParticles();
animateArtworks();
