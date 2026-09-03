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
];

/*
 * SOLO LAS 7 OBRAS QUE TIENEN IMAGEN
 */

const artworks = [
    [
        "Algo se está cocinando",
        [7.18,15.56,38.00,33.50,0.53,2.87,2.21,0.14],
        "images/algo-se-esta-cocinando.avif",
        "https://silviaandthespyglass.com/products/algo-se-esta-cocinando?_pos=28&_sid=cb35938c9&_ss=r"
    ],
    [
        "Aprender a volar",
        [10.14,17.05,23.26,18.65,6.02,6.55,11.44,6.89],
        "images/aprender-a-volar.avif",
        "https://silviaandthespyglass.com/products/aprender-a-volar-1?_pos=19&_sid=8498fca5e&_ss=r"
    ],
    [
        "Baobab",
        [12.03,15.64,16.40,20.48,10.11,7.40,11.38,6.57],
        "images/baobab.avif",
        "https://silviaandthespyglass.com/products/baobab?_pos=13&_sid=9c635ab51&_ss=r"
    ],
    [
        "Belleza en las pequeñas cosas",
        [17.74,19.68,19.71,14.75,5.68,8.07,8.56,5.81],
        "images/belleza-en-las-pequenas-cosas.avif",
        "https://silviaandthespyglass.com/products/beauty-in-the-small-things?_pos=1&_sid=2877ebcde&_ss=r"
    ],
    [
        "Bonito lugar donde descansar",
        [14.02,17.11,20.45,20.62,5.72,5.93,9.68,6.47],
        "images/bonito-lugar-donde-descansar.avif",
        "https://silviaandthespyglass.com/products/escultura-bronce-un-lugar-bonito-donde-descansar?_pos=2&_sid=df7d643de&_ss=r"
    ],
    [
        "Buen viaje",
        [20.69,14.91,18.60,17.94,6.20,9.98,6.30,5.39],
        "images/buen-viaje.avif",
        "https://silviaandthespyglass.com/products/buen-viaje?_pos=24&_sid=ee19582c8&_ss=r"
    ],
    [
        "Compañeros de sueños",
        [7.06,17.56,38.22,31.75,0.41,2.55,2.29,0.16],
        "images/companeros-de-suenos.avif",
        "https://silviaandthespyglass.com/products/companer-s-de-suenos?_pos=6&_sid=e176564db&_ss=r"
    ]
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

const SAFE_SIDE = 105;
const SAFE_TOP = 100;
const SAFE_BOTTOM = 100;

const POINT_MIN_RADIUS = 12;
const POINT_MAX_RADIUS = 55;

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

        let x = 0;
        let y = 0;
        let valid = false;

        for (let attempt = 0; attempt < 300; attempt++) {

            const angle =
                i * 2.399963 +
                attempt * 0.73;

            const radius =
                0.12 +
                (i % 6) * 0.055;

            x =
                0.5 +
                Math.cos(angle) * radius +
                Math.sin(i * 1.73 + attempt) * 0.08;

            y =
                0.5 +
                Math.sin(angle) * radius * 0.70 +
                Math.cos(i * 1.21 + attempt) * 0.07;

            x = clamp(x, minX, maxX);
            y = clamp(y, minY, maxY);

            if (
                isPositionValid(
                    x,
                    y,
                    positions
                )
            ) {
                valid = true;
                break;
            }
        }

        if (!valid) {

            for (
                let yTry = minY;
                yTry <= maxY;
                yTry += 0.025
            ) {

                for (
                    let xTry = minX;
                    xTry <= maxX;
                    xTry += 0.025
                ) {

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

let originalPositions = [];

function getSafePosition(x, y) {

    const minX = SAFE_SIDE;
    const maxX = Math.max(
        SAFE_SIDE,
        width - SAFE_SIDE
    );

    const minY = SAFE_TOP;
    const maxY = Math.max(
        SAFE_TOP,
        height - SAFE_BOTTOM
    );

    return {
        x: clamp(x, minX, maxX),
        y: clamp(y, minY, maxY)
    };
}

/* -------------------------------------------------------
   MOVIMIENTO CONTINUO
------------------------------------------------------- */

artworks.forEach(() => {

    artworkMotion.push({
        phaseX: random(0, Math.PI * 2),
        phaseY: random(0, Math.PI * 2),

        speedX: random(0.00055, 0.00085),
        speedY: random(0.00045, 0.00075),

        amplitudeX: random(11, 18),
        amplitudeY: random(9, 16)
    });
});

function resizeCanvas() {

    const rect =
        canvas.getBoundingClientRect();

    width = rect.width;
    height = rect.height;

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;

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

    cards.forEach(
        (card, index) => {

            if (
                currentEmotion === "all"
            ) {

                setCardPosition(
                    card,
                    originalPositions[index],
                    false
                );

            } else if (
                card.dataset.filteredPosition
            ) {

                setCardPosition(
                    card,
                    JSON.parse(
                        card.dataset.filteredPosition
                    ),
                    false
                );
            }
        }
    );
}

window.addEventListener(
    "resize",
    resizeCanvas
);

/* -------------------------------------------------------
   CREAR CUADROS
------------------------------------------------------- */

artworks.forEach(
    (artwork, index) => {

        const [
            title,
            values,
            image,
            link
        ] = artwork;

        const card =
            document.createElement(
                "article"
            );

        card.className = "artwork";

        card.dataset.index =
            index;

        card.dataset.title =
            title;

        card.dataset.link =
            link;

        card.dataset.filterMoving =
            "false";

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

        artworkLayer.appendChild(
            card
        );

        cards.push(card);

        card.addEventListener(
            "mouseenter",
            () => {

                if (
                    window.innerWidth > 700
                ) {
                    focusArtwork(index);
                }
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                if (
                    window.innerWidth > 700
                ) {
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

                    window.open(
                        link,
                        "_blank"
                    );

                    return;
                }

                if (
                    focusedArtwork === index
                ) {

                    window.location.href =
                        link;

                } else {

                    focusArtwork(index);
                }
            }
        );
    }
);

/* -------------------------------------------------------
   POSICIÓN DE CUADRO
------------------------------------------------------- */

function setCardPosition(
    card,
    position,
    animate = true
) {

    if (!animate) {
        card.style.transition =
            "none";
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

        requestAnimationFrame(
            () => {
                card.style.transition =
                    "";
            }
        );
    }
}

function getArtworkPosition(index) {

    const card =
        cards[index];

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
        emotions.indexOf(
            emotion
        );

    const items =
        artworks
            .map(
                (artwork, index) => ({
                    index,
                    value:
                        artwork[1][
                            emotionIndex
                        ]
                })
            )
            .filter(
                item =>
                    item.value > 0
            )
            .sort(
                (a, b) =>
                    b.value -
                    a.value
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
                0.5 +
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
                attempts < 300 &&
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
                    attempts * 0.0025;

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
   FILTRO
------------------------------------------------------- */

function applyFilter(
    emotion
) {

    currentEmotion =
        emotion;

    filterTransitionToken++;

    const transition =
        filterTransitionToken;

    if (
        emotion === "all"
    ) {

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

                setTimeout(
                    () => {

                        if (
                            transition !==
                            filterTransitionToken
                        ) {
                            return;
                        }

                        card.dataset.filterMoving =
                            "false";

                    },
                    3800
                );
            }
        );

        return;
    }

    const emotionIndex =
        emotions.indexOf(
            emotion
        );

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

            if (
                value === 0
            ) {

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

            /*
             * La transición solo lleva el cuadro
             * a la nueva zona. NO lo congela:
             * animateArtworks continúa moviéndolo.
             */

            card.dataset.filterMoving =
                "false";

            card.style.transition =
                "transform 2.8s cubic-bezier(.22,.61,.36,1)";

            setCardPosition(
                card,
                position,
                true
            );
        }
    );
}

document
    .querySelectorAll(
        ".emotion"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".emotion"
                        )
                        .forEach(
                            btn => {
                                btn.classList.remove(
                                    "active"
                                );
                            }
                        );

                    button.classList.add(
                        "active"
                    );

                    applyFilter(
                        button.dataset.emotion
                    );
                }
            );
        }
    );

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

    emotionValues.innerHTML =
        "";

    emotions.forEach(
        (emotion, i) => {

            if (
                currentEmotion !==
                    "all" &&
                currentEmotion !==
                    emotion
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

    focusedArtwork =
        index;

    cards.forEach(
        (card, i) => {

            if (
                i === index
            ) {

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

    focusedArtwork =
        null;

    cards.forEach(
        card => {

            card.classList.remove(
                "focused"
            );
        }
    );

    artworkInfo.classList.remove(
        "visible"
    );
}

closeInfo.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        focusedArtwork =
            null;

        cards.forEach(
            card => {

                card.classList.remove(
                    "focused"
                );
            }
        );

        artworkInfo.classList.remove(
            "visible"
        );
    }
);

/* -------------------------------------------------------
   PUNTOS
------------------------------------------------------- */

function createParticles() {

    particles.length =
        0;

    artworks.forEach(
        (artwork, artworkIndex) => {

            const values =
                artwork[1];

            values.forEach(
                (value, emotionIndex) => {

                    const count =
                        Math.round(
                            value
                        );

                    for (
                        let i = 0;
                        i < count;
                        i++
                    ) {

                        const angle =
                            (
                                i /
                                Math.max(
                                    count,
                                    1
                                )
                            ) *
                            Math.PI *
                            2 +
                            random(
                                -0.7,
                                0.7
                            );

                        const radius =
                            random(
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
                                    -0.0015,
                                    0.0015
                                ),

                            radialSpeed:
                                random(
                                    -0.018,
                                    0.018
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

            /*
             * Los puntos siempre están detrás
             * porque el canvas está por debajo
             * de artworkLayer.
             */

            const artworkPosition =
                getArtworkPosition(
                    particle.artworkIndex
                );

            particle.angle +=
                particle.angularSpeed;

            particle.radius +=
                particle.radialSpeed;

            if (
                particle.radius < 10
            ) {

                particle.radius =
                    10;

                particle.radialSpeed *=
                    -1;
            }

            if (
                particle.radius >
                POINT_MAX_RADIUS
            ) {

                particle.radius =
                    POINT_MAX_RADIUS;

                particle.radialSpeed *=
                    -1;
            }

            const organicRadius =
                particle.radius +
                Math.sin(
                    animationTime *
                        0.025 +
                    particle.phase
                ) *
                5;

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
                currentEmotion !==
                    "all" &&
                emotions[
                    particle.emotionIndex
                ] !==
                    currentEmotion
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

            ctx.globalAlpha =
                1;

            ctx.fillStyle =
                colors[
                    emotions[
                        particle.emotionIndex
                    ]
                ];

            ctx.fill();

            ctx.globalAlpha =
                1;
        }
    );

    animationTime +=
        1;

    requestAnimationFrame(
        animateParticles
    );
}

/* -------------------------------------------------------
   CUADROS: MOVIMIENTO SIEMPRE ACTIVO
------------------------------------------------------- */

function animateArtworks() {

    cards.forEach(
        (card, index) => {

            /*
             * Solo el cuadro seleccionado se congela.
             * Todos los demás siguen moviéndose SIEMPRE.
             */

            if (
                focusedArtwork ===
                index
            ) {
                return;
            }

            let base;

            if (
                currentEmotion ===
                "all"
            ) {

                base =
                    originalPositions[
                        index
                    ];

            } else if (
                card.dataset
                    .filteredPosition
            ) {

                base =
                    JSON.parse(
                        card.dataset
                            .filteredPosition
                    );

            } else {

                base =
                    originalPositions[
                        index
                    ];
            }

            const motion =
                artworkMotion[
                    index
                ];

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
   INICIO SIN ANIMACIÓN
------------------------------------------------------- */

resizeCanvas();

cards.forEach(
    (card, index) => {

        setCardPosition(
            card,
            originalPositions[
                index
            ],
            false
        );
    }
);

animateParticles();
animateArtworks();
