/* =========================================================
   PAISAJE EMOCIONAL
   Silvia & The Spyglass / Arte y Neurociencia II
   ========================================================= */


/* =========================================================
   EMOCIONES
   ========================================================= */

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


/* =========================================================
   OBRAS
   ========================================================= */

const artworks = [
    {
        title: "Algo se está cocinando",
        image: "images/algo-se-esta-cocinando.avif",
        link: "https://silviaandthespyglass.com/products/algo-se-esta-cocinando?_pos=28&_sid=cb35938c9&_ss=r",
        emotions: {
            "Alegría": 7.18,
            "Confianza": 15.56,
            "Curiosidad": 38.00,
            "Sorpresa": 33.50,
            "Disgusto": 0.53,
            "Ira": 2.87,
            "Miedo": 2.21,
            "Tristeza": 0.14
        }
    },

    {
        title: "Aprender a volar",
        image: "images/aprender-a-volar.avif",
        link: "https://silviaandthespyglass.com/products/aprender-a-volar-1?_pos=19&_sid=8498fca5e&_ss=r",
        emotions: {
            "Alegría": 10.14,
            "Confianza": 17.05,
            "Curiosidad": 23.26,
            "Sorpresa": 18.65,
            "Disgusto": 6.02,
            "Ira": 6.55,
            "Miedo": 11.44,
            "Tristeza": 6.89
        }
    },

    {
        title: "Baobab",
        image: "images/baobab.avif",
        link: "https://silviaandthespyglass.com/products/baobab?_pos=13&_sid=9c635ab51&_ss=r",
        emotions: {
            "Alegría": 12.03,
            "Confianza": 15.64,
            "Curiosidad": 16.40,
            "Sorpresa": 20.48,
            "Disgusto": 10.11,
            "Ira": 7.40,
            "Miedo": 11.38,
            "Tristeza": 6.57
        }
    },

    {
        title: "Belleza en las pequeñas cosas",
        image: "images/belleza-en-las-pequenas-cosas.avif",
        link: "https://silviaandthespyglass.com/products/beauty-in-the-small-things?_pos=1&_sid=2877ebcde&_ss=r",
        emotions: {
            "Alegría": 17.74,
            "Confianza": 19.68,
            "Curiosidad": 19.71,
            "Sorpresa": 14.75,
            "Disgusto": 5.68,
            "Ira": 8.07,
            "Miedo": 8.56,
            "Tristeza": 5.81
        }
    },

    {
        title: "Bonito lugar donde descansar",
        image: "images/bonito-lugar-donde-descansar.avif",
        link: "https://silviaandthespyglass.com/products/escultura-bronce-un-lugar-bonito-donde-descansar?_pos=2&_sid=df7d643de&_ss=r",
        emotions: {
            "Alegría": 14.02,
            "Confianza": 17.11,
            "Curiosidad": 20.45,
            "Sorpresa": 20.62,
            "Disgusto": 5.72,
            "Ira": 5.93,
            "Miedo": 9.68,
            "Tristeza": 6.47
        }
    },

    {
        title: "Buen viaje",
        image: "images/buen-viaje.avif",
        link: "https://silviaandthespyglass.com/products/buen-viaje?_pos=24&_sid=ee19582c8&_ss=r",
        emotions: {
            "Alegría": 20.69,
            "Confianza": 14.91,
            "Curiosidad": 18.60,
            "Sorpresa": 17.94,
            "Disgusto": 6.20,
            "Ira": 9.98,
            "Miedo": 6.30,
            "Tristeza": 5.39
        }
    },

    {
        title: "Compañeros de sueños",
        image: "images/companeros-de-suenos.avif",
        link: "https://silviaandthespyglass.com/products/companer-s-de-suenos?_pos=6&_sid=e176564db&_ss=r",
        emotions: {
            "Alegría": 7.06,
            "Confianza": 17.56,
            "Curiosidad": 38.22,
            "Sorpresa": 31.75,
            "Disgusto": 0.41,
            "Ira": 2.55,
            "Miedo": 2.29,
            "Tristeza": 0.16
        }
    }
];


/* =========================================================
   COLORES
   ========================================================= */

const emotionColors = {
    "Alegría": getComputedStyle(document.documentElement)
        .getPropertyValue("--alegria").trim(),

    "Confianza": getComputedStyle(document.documentElement)
        .getPropertyValue("--confianza").trim(),

    "Curiosidad": getComputedStyle(document.documentElement)
        .getPropertyValue("--curiosidad").trim(),

    "Sorpresa": getComputedStyle(document.documentElement)
        .getPropertyValue("--sorpresa").trim(),

    "Disgusto": getComputedStyle(document.documentElement)
        .getPropertyValue("--disgusto").trim(),

    "Ira": getComputedStyle(document.documentElement)
        .getPropertyValue("--ira").trim(),

    "Miedo": getComputedStyle(document.documentElement)
        .getPropertyValue("--miedo").trim(),

    "Tristeza": getComputedStyle(document.documentElement)
        .getPropertyValue("--tristeza").trim()
};


/* =========================================================
   ELEMENTOS
   ========================================================= */

const canvas = document.getElementById("emotionCanvas");
const ctx = canvas.getContext("2d");

const mapContainer =
    document.querySelector(".map-container");

const artworkLayer =
    document.getElementById("artworkLayer");

const filterButtons =
    document.querySelectorAll(".emotion");


/* =========================================================
   ESTADO
   ========================================================= */

let currentFilter = "all";

let cards = [];

let particles = [];

let canvasWidth = 0;
let canvasHeight = 0;

let animationFrame;


/* =========================================================
   UTILIDADES
   ========================================================= */

function isMobile() {
    return window.matchMedia(
        "(max-width: 700px)"
    ).matches;
}


function slugifyEmotion(emotion) {
    return emotion
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
}


function seededRandom(seed) {
    const x =
        Math.sin(seed * 12.9898) *
        43758.5453;

    return x - Math.floor(x);
}


function clamp(value, min, max) {
    return Math.max(
        min,
        Math.min(max, value)
    );
}


/* =========================================================
   CANVAS
   ========================================================= */

function resizeCanvas() {

    const rect =
        mapContainer.getBoundingClientRect();

    canvasWidth = Math.max(
        1,
        rect.width
    );

    canvasHeight = Math.max(
        1,
        rect.height
    );

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        canvasWidth * dpr;

    canvas.height =
        canvasHeight * dpr;

    canvas.style.width =
        `${canvasWidth}px`;

    canvas.style.height =
        `${canvasHeight}px`;

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    createParticles();
}


/* =========================================================
   POSICIONES ORGÁNICAS
   =========================================================
   
   No hay grid.
   
   Las posiciones se generan alrededor de varios
   "campos" dentro del espacio.
   
   Cuando se filtra:
   - se ordenan por porcentaje
   - pero se mantienen posiciones orgánicas
   - el orden determina la zona general que ocupa cada obra
   ========================================================= */

function generateOrganicPositions(items) {

    const mobile = isMobile();

    const positions = [];

    const count = items.length;


    /*
     * Anchuras de seguridad.
     */

    const minX = mobile ? 14 : 9;
    const maxX = mobile ? 86 : 91;

    const minY = mobile ? 13 : 14;
    const maxY = mobile ? 82 : 84;


    /*
     * Número de "zonas".
     *
     * No son columnas visibles.
     * Solo sirven para distribuir las obras.
     */

    const zones = mobile
        ? [
            { x: 24, y: 20 },
            { x: 74, y: 23 },
            { x: 20, y: 50 },
            { x: 78, y: 48 },
            { x: 27, y: 76 },
            { x: 72, y: 73 },
            { x: 50, y: 35 },
            { x: 50, y: 68 }
        ]
        : [
            { x: 13, y: 22 },
            { x: 35, y: 16 },
            { x: 61, y: 21 },
            { x: 86, y: 17 },

            { x: 20, y: 52 },
            { x: 47, y: 43 },
            { x: 74, y: 52 },

            { x: 30, y: 78 },
            { x: 59, y: 72 },
            { x: 84, y: 77 },

            { x: 48, y: 27 },
            { x: 68, y: 72 }
        ];


    /*
     * Si hay filtro, el orden de los elementos
     * ya viene de mayor → menor.
     *
     * Asignamos progresivamente las zonas,
     * pero mezclamos ligeramente su posición.
     */

    items.forEach((item, index) => {

        const zone =
            zones[index % zones.length];

        const seed =
            item.originalIndex * 9187 +
            index * 173;


        /*
         * Variación suficientemente grande para
         * evitar cualquier sensación de cuadrícula.
         */

        let spreadX =
            mobile ? 7 : 8;

        let spreadY =
            mobile ? 6 : 7;


        /*
         * En listas largas, ampliar el movimiento
         * de las posiciones.
         */

        if (count > 8) {
            spreadX += 3;
            spreadY += 3;
        }


        let x =
            zone.x +
            (seededRandom(seed + 1) - 0.5) *
            spreadX *
            2;

        let y =
            zone.y +
            (seededRandom(seed + 2) - 0.5) *
            spreadY *
            2;


        /*
         * Límites para que nunca entren en
         * header o filtros.
         */

        x = clamp(x, minX, maxX);
        y = clamp(y, minY, maxY);


        positions.push({
            x,
            y
        });
    });


    /*
     * En "todas" queremos todavía más libertad.
     *
     * Se añade una pequeña redistribución basada
     * en el índice original.
     */

    if (currentFilter === "all") {

        positions.forEach((position, index) => {

            const seed =
                index * 731;

            position.x = clamp(
                position.x +
                (seededRandom(seed + 10) - 0.5) * 5,
                minX,
                maxX
            );

            position.y = clamp(
                position.y +
                (seededRandom(seed + 11) - 0.5) * 5,
                minY,
                maxY
            );
        });
    }


    return positions;
}


/* =========================================================
   CREAR OBRAS
   ========================================================= */

function renderArtworks() {

    /*
     * Guardamos qué card estaba abierta para no
     * generar estados inconsistentes.
     */

    cards = [];

    artworkLayer.innerHTML = "";


    /*
     * Filtrar.
     */

    let visibleArtworks =
        artworks.map((artwork, index) => ({
            artwork,
            originalIndex: index
        }));


    if (currentFilter !== "all") {

        visibleArtworks =
            visibleArtworks
                .filter(item =>
                    item.artwork.emotions[
                        currentFilter
                    ] > 0
                )
                .sort((a, b) =>
                    b.artwork.emotions[
                        currentFilter
                    ] -
                    a.artwork.emotions[
                        currentFilter
                    ]
                );
    }


    /*
     * Posiciones orgánicas.
     */

    const positions =
        generateOrganicPositions(
            visibleArtworks
        );


    /*
     * Crear DOM.
     */

    visibleArtworks.forEach(
        (item, index) => {

            const artwork =
                item.artwork;

            const card =
                document.createElement("article");

            card.className =
                "artwork-card";

            card.dataset.index =
                item.originalIndex;


            /*
             * Posición.
             */

            card.style.left =
                `${positions[index].x}%`;

            card.style.top =
                `${positions[index].y}%`;


            /*
             * Imagen.
             */

            const imageWrap =
                document.createElement("div");

            imageWrap.className =
                "artwork-image-wrap";


            const image =
                document.createElement("img");

            image.className =
                "artwork-image";

            image.src =
                artwork.image;

            image.alt =
                artwork.title;

            image.draggable = false;


            imageWrap.appendChild(image);


            /*
             * Nombre debajo.
             */

            const artworkTitle =
                document.createElement("div");

            artworkTitle.className =
                "artwork-title";

            artworkTitle.textContent =
                artwork.title;


            card.appendChild(imageWrap);

            card.appendChild(
                artworkTitle
            );

            artworkLayer.appendChild(card);


            /*
             * Referencia.
             */

            cards.push({
                element: card,
                artwork,
                originalIndex:
                    item.originalIndex,
                position:
                    positions[index],
                image
            });


            /*
             * Movimiento individual.
             */

            setupOrganicMovement(
                card,
                index
            );


            /*
             * Interacción.
             */

            setupInteraction(
                card,
                artwork
            );
        }
    );


    createParticles();
}


/* =========================================================
   MOVIMIENTO ORGÁNICO
   =========================================================
   
   Cada cuadro se mueve de forma independiente.
   No hay una órbita ni una trayectoria rígida.
   ========================================================= */

function setupOrganicMovement(
    card,
    index
) {

    const seed =
        index * 1937 +
        Math.random() * 1000;


    const amplitudeX =
        isMobile()
            ? 4 + seededRandom(seed + 1) * 5
            : 5 + seededRandom(seed + 1) * 8;

    const amplitudeY =
        isMobile()
            ? 4 + seededRandom(seed + 2) * 5
            : 5 + seededRandom(seed + 2) * 8;


    const duration =
        6500 +
        seededRandom(seed + 3) * 5500;


    const phase =
        seededRandom(seed + 4) *
        Math.PI *
        2;


    const startTime =
        performance.now() +
        seededRandom(seed + 5) * 3000;


    function move(time) {

        /*
         * Si la card está siendo inspeccionada,
         * no se mueve.
         */

        if (
            !card.classList.contains(
                "is-still"
            )
        ) {

            const elapsed =
                time - startTime;

            const t =
                elapsed / duration;


            /*
             * Dos ondas diferentes producen un
             * desplazamiento más natural.
             */

            const x =
                Math.sin(
                    t * Math.PI * 2 +
                    phase
                ) *
                amplitudeX
                +
                Math.sin(
                    t * Math.PI * 4.7 +
                    phase * 1.7
                ) *
                amplitudeX *
                0.22;


            const y =
                Math.cos(
                    t * Math.PI * 2.3 +
                    phase
                ) *
                amplitudeY
                +
                Math.sin(
                    t * Math.PI * 3.8 +
                    phase * 0.8
                ) *
                amplitudeY *
                0.25;


            card.style.setProperty(
                "--move-x",
                `${x}px`
            );

            card.style.setProperty(
                "--move-y",
                `${y}px`
            );
        }


        requestAnimationFrame(move);
    }


    requestAnimationFrame(move);
}


/* =========================================================
   INTERACCIÓN
   ========================================================= */

function setupInteraction(
    card,
    artwork
) {

    /*
     * DESKTOP
     */

    card.addEventListener(
        "mouseenter",
        () => {

            if (!isMobile()) {

                card.classList.add(
                    "is-still"
                );

                showInfo(
                    artwork
                );
            }
        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            if (!isMobile()) {

                card.classList.remove(
                    "is-still"
                );

                hideInfo();
            }
        }
    );


    /*
     * CLICK
     */

    card.addEventListener(
        "click",
        event => {

            /*
             * Desktop:
             * click = web.
             */

            if (!isMobile()) {

                window.location.href =
                    artwork.link;

                return;
            }


            /*
             * Mobile:
             *
             * primer tap → info
             * segundo tap → web
             */

            if (
                !card.classList.contains(
                    "is-open"
                )
            ) {

                event.preventDefault();
                event.stopPropagation();

                /*
                 * Cerrar otras.
                 */

                cards.forEach(
                    other => {

                        other.element
                            .classList
                            .remove(
                                "is-open"
                            );

                        other.element
                            .classList
                            .remove(
                                "is-still"
                            );
                    }
                );


                card.classList.add(
                    "is-open"
                );

                card.classList.add(
                    "is-still"
                );


                showInfo(
                    artwork
                );

            } else {

                window.location.href =
                    artwork.link;
            }
        }
    );
}


/* =========================================================
   INFO PANEL
   ========================================================= */

function showInfo(artwork) {

    const panel =
        document.getElementById(
            "artworkInfo"
        );

    if (!panel) {
        return;
    }


    /*
     * El HTML original tenía estos elementos.
     * Los rellenamos dinámicamente.
     */

    const title =
        document.getElementById(
            "artworkTitle"
        );

    const values =
        document.getElementById(
            "emotionValues"
        );


    title.textContent =
        artwork.title;


    values.innerHTML = "";


    /*
     * Si hay filtro, solo mostramos
     * esa emoción.
     */

    const emotionsToShow =
        currentFilter === "all"
            ? emotions
            : [currentFilter];


    emotionsToShow.forEach(
        emotion => {

            const value =
                artwork.emotions[
                    emotion
                ];


            if (
                currentFilter !== "all" &&
                value <= 0
            ) {
                return;
            }


            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "emotion-row";


            const name =
                document.createElement(
                    "span"
                );

            name.className =
                "emotion-name";


            const indicator =
                document.createElement(
                    "span"
                );

            indicator.className =
                "emotion-indicator indicator-" +
                slugifyEmotion(
                    emotion
                );


            name.appendChild(
                indicator
            );

            name.appendChild(
                document.createTextNode(
                    emotion.toLowerCase()
                )
            );


            const percentage =
                document.createElement(
                    "span"
                );

            percentage.className =
                "emotion-value";

            percentage.textContent =
                `${value.toFixed(2)}%`;


            row.appendChild(name);

            row.appendChild(
                percentage
            );

            values.appendChild(
                row
            );
        }
    );


    /*
     * Mostrar.
     */

    panel.classList.add(
        "visible"
    );
}


/* =========================================================
   OCULTAR INFO
   ========================================================= */

function hideInfo() {

    const panel =
        document.getElementById(
            "artworkInfo"
        );

    if (!panel) {
        return;
    }

    panel.classList.remove(
        "visible"
    );
}


/* =========================================================
   CERRAR INFO MOBILE
   ========================================================= */

const closeInfo =
    document.getElementById(
        "closeInfo"
    );


if (closeInfo) {

    closeInfo.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            cards.forEach(
                card => {

                    card.element.classList
                        .remove(
                            "is-open"
                        );

                    card.element.classList
                        .remove(
                            "is-still"
                        );
                }
            );

            hideInfo();
        }
    );
}


/* =========================================================
   FILTROS
   ========================================================= */

filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                currentFilter =
                    button.dataset.emotion;


                /*
                 * Estado visual.
                 */

                filterButtons.forEach(
                    other => {

                        other.classList.toggle(
                            "active",
                            other === button
                        );
                    }
                );


                /*
                 * Cerramos info.
                 */

                hideInfo();


                /*
                 * Renderizamos.
                 *
                 * Las obras se ordenan según el
                 * porcentaje de la emoción,
                 * pero las nuevas posiciones siguen
                 * siendo orgánicas.
                 */

                renderArtworks();
            }
        );
    }
);


/* =========================================================
   CLICK FUERA EN MOBILE
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        if (!isMobile()) {
            return;
        }


        const info =
            document.getElementById(
                "artworkInfo"
            );


        if (
            info &&
            info.classList.contains(
                "visible"
            ) &&
            !info.contains(event.target) &&
            !event.target.closest(
                ".artwork-card"
            )
        ) {

            cards.forEach(
                card => {

                    card.element.classList
                        .remove(
                            "is-open"
                        );

                    card.element.classList
                        .remove(
                            "is-still"
                        );
                }
            );

            hideInfo();
        }
    }
);


/* =========================================================
   PARTICLES
   =========================================================
   
   1% ≈ 1 punto.
   
   Todos los puntos tienen EXACTAMENTE el mismo tamaño.
   ========================================================= */

function createParticles() {

    particles = [];


    artworks.forEach(
        (artwork, artworkIndex) => {

            emotions.forEach(
                (emotion, emotionIndex) => {

                    const value =
                        artwork.emotions[
                            emotion
                        ];


                    /*
                     * 20.69 → 21 puntos
                     * 38.22 → 38 puntos
                     * etc.
                     */

                    const count =
                        Math.round(value);


                    for (
                        let i = 0;
                        i < count;
                        i++
                    ) {

                        const seed =
                            artworkIndex *
                            10000 +
                            emotionIndex *
                            1000 +
                            i;


                        particles.push({

                            artworkIndex,

                            emotion,

                            angle:
                                seededRandom(
                                    seed + 1
                                ) *
                                Math.PI *
                                2,

                            radius:
                                25 +
                                seededRandom(
                                    seed + 2
                                ) *
                                105,

                            phase:
                                seededRandom(
                                    seed + 3
                                ) *
                                Math.PI *
                                2,

                            speed:
                                0.00010 +
                                seededRandom(
                                    seed + 4
                                ) *
                                0.00018,

                            wobble:
                                3 +
                                seededRandom(
                                    seed + 5
                                ) *
                                8
                        });
                    }
                }
            );
        }
    );
}


/* =========================================================
   CENTRO DE CADA OBRA
   ========================================================= */

function getArtworkCenter(
    artworkIndex
) {

    const cardData =
        cards.find(
            card =>
                card.originalIndex ===
                artworkIndex
        );


    if (!cardData) {
        return null;
    }


    const card =
        cardData.element;


    const rect =
        card.getBoundingClientRect();


    const mapRect =
        mapContainer.getBoundingClientRect();


    return {

        x:
            rect.left -
            mapRect.left +
            rect.width / 2,

        y:
            rect.top -
            mapRect.top +
            rect.height / 2
    };
}


/* =========================================================
   DIBUJAR PUNTOS
   ========================================================= */

function drawParticles(time) {

    ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );


    particles.forEach(
        particle => {

            /*
             * Si hay filtro, desaparecen TODOS
             * los puntos de las demás emociones.
             */

            if (
                currentFilter !== "all" &&
                particle.emotion !==
                    currentFilter
            ) {
                return;
            }


            const center =
                getArtworkCenter(
                    particle.artworkIndex
                );


            if (!center) {
                return;
            }


            /*
             * Movimiento.
             *
             * No es una órbita perfecta.
             */

            const t =
                time *
                particle.speed;


            const angle =
                particle.angle +
                Math.sin(
                    t +
                    particle.phase
                ) *
                0.30;


            const radius =
                particle.radius +
                Math.sin(
                    t * 1.41 +
                    particle.phase
                ) *
                particle.wobble;


            const secondaryX =
                Math.sin(
                    t * 0.73 +
                    particle.phase * 1.7
                ) *
                5;


            const secondaryY =
                Math.cos(
                    t * 0.61 +
                    particle.phase
                ) *
                5;


            const x =
                center.x +
                Math.cos(angle) *
                radius +
                secondaryX;


            const y =
                center.y +
                Math.sin(angle) *
                radius *
                0.72 +
                secondaryY;


            const safeX =
                clamp(
                    x,
                    -40,
                    canvasWidth + 40
                );


            const safeY =
                clamp(
                    y,
                    -40,
                    canvasHeight + 40
                );


            /*
             * MUY IMPORTANTE:
             *
             * todos exactamente el mismo tamaño
             * y sin opacity.
             */

            ctx.globalAlpha = 1;

            ctx.fillStyle =
                emotionColors[
                    particle.emotion
                ];


            ctx.beginPath();

            ctx.arc(
                safeX,
                safeY,
                2,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }
    );


    ctx.globalAlpha = 1;

    animationFrame =
        requestAnimationFrame(
            drawParticles
        );
}


/* =========================================================
   RESIZE
   ========================================================= */

let resizeTimeout;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimeout
        );

        resizeTimeout =
            setTimeout(
                () => {

                    resizeCanvas();

                    renderArtworks();

                },
                150
            );
    }
);


/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

resizeCanvas();

renderArtworks();

cancelAnimationFrame(
    animationFrame
);

animationFrame =
    requestAnimationFrame(
        drawParticles
    );
