/* =========================================================
   PAISAJE EMOCIONAL
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
   DOM
   ========================================================= */

const canvas =
    document.getElementById("emotionCanvas");

const ctx =
    canvas.getContext("2d");

const mapContainer =
    document.querySelector(".map-container");

const artworkLayer =
    document.getElementById("artworkLayer");

const filterButtons =
    document.querySelectorAll(".emotion");

const infoPanel =
    document.getElementById("artworkInfo");

const infoTitle =
    document.getElementById("artworkTitle");

const emotionValues =
    document.getElementById("emotionValues");

const closeInfo =
    document.getElementById("closeInfo");


/* =========================================================
   STATE
   ========================================================= */

let currentFilter = "all";

let focusedArtwork = null;

let cards = [];

let particles = [];

let canvasWidth = 0;
let canvasHeight = 0;

let resizeTimeout;


/* =========================================================
   UTILITIES
   ========================================================= */

function isMobile() {

    return window.matchMedia(
        "(max-width: 700px)"
    ).matches;
}


function clamp(
    value,
    min,
    max
) {

    return Math.max(
        min,
        Math.min(
            max,
            value
        )
    );
}


function slugifyEmotion(
    emotion
) {

    return emotion
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .replace(
            /\s+/g,
            "-"
        );
}


/*
 * Random determinista.
 * Permite que las posiciones sean siempre
 * iguales al recargar.
 */

function seededRandom(seed) {

    const x =
        Math.sin(
            seed * 12.9898
        ) *
        43758.5453;

    return x - Math.floor(x);
}


/* =========================================================
   CANVAS
   ========================================================= */

function resizeCanvas() {

    const rect =
        mapContainer.getBoundingClientRect();

    canvasWidth =
        Math.max(
            1,
            rect.width
        );

    canvasHeight =
        Math.max(
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
}


/* =========================================================
   POSICIONES ORIGINALES
   =========================================================
   
   Estas son las "casas" originales de cada obra.

   No son una grid.
   Cada obra tiene una posición propia.
   ========================================================= */

function getOriginalPosition(
    index
) {

    const desktop = [
        { x: 13, y: 22 },
        { x: 35, y: 17 },
        { x: 61, y: 23 },
        { x: 86, y: 19 },

        { x: 20, y: 57 },
        { x: 49, y: 45 },
        { x: 76, y: 63 },

        { x: 31, y: 79 },
        { x: 59, y: 76 },
        { x: 88, y: 78 }
    ];


    const mobile = [
        { x: 23, y: 18 },
        { x: 75, y: 18 },

        { x: 18, y: 43 },
        { x: 78, y: 39 },

        { x: 28, y: 66 },
        { x: 69, y: 64 },

        { x: 48, y: 83 },
        { x: 88, y: 82 }
    ];


    const positions =
        isMobile()
            ? mobile
            : desktop;


    const position =
        positions[
            index % positions.length
        ];


    return {
        x: position.x,
        y: position.y
    };
}


/* =========================================================
   POSICIONES DE FILTRO
   =========================================================
   
   ESTA ES LA PARTE NUEVA IMPORTANTE.

   No usamos columnas rígidas.

   El ranking de la emoción determina una trayectoria
   general de arriba → abajo.

   Pero cada obra recibe un desplazamiento lateral
   y vertical diferente, por lo que el resultado
   sigue siendo orgánico.
   ========================================================= */

function getFilteredPositions(
    visibleItems
) {

    const count =
        visibleItems.length;


    const positions = [];


    if (count === 0) {
        return positions;
    }


    /*
     * Área segura.
     *
     * Nunca llega hasta header/filtros porque
     * el propio map-container ya está entre ellos.
     */

    const minY =
        isMobile() ? 15 : 13;

    const maxY =
        isMobile() ? 84 : 86;


    const minX =
        isMobile() ? 14 : 9;

    const maxX =
        isMobile() ? 86 : 91;


    /*
     * El "camino" va de arriba hacia abajo.
     *
     * Pero la curva hace que no parezca una lista.
     */

    visibleItems.forEach(
        (item, rank) => {

            const normalized =
                count === 1
                    ? 0.5
                    : rank / (count - 1);


            /*
             * Trayectoria diagonal/ondulada.
             */

            const baseY =
                minY +
                normalized *
                (maxY - minY);


            const wave =
                Math.sin(
                    normalized *
                    Math.PI *
                    2.4
                ) *
                (isMobile() ? 9 : 13);


            /*
             * La posición X no aumenta simplemente
             * de izquierda a derecha.
             *
             * Se mueve orgánicamente por el espacio.
             */

            const seed =
                item.originalIndex *
                8173 +
                rank *
                127;


            const randomX =
                (
                    seededRandom(
                        seed + 1
                    ) -
                    0.5
                ) *
                (isMobile() ? 38 : 50);


            const randomY =
                (
                    seededRandom(
                        seed + 2
                    ) -
                    0.5
                ) *
                (isMobile() ? 8 : 10);


            /*
             * Una trayectoria suave central +
             * variación individual.
             */

            const baseX =
                isMobile()
                    ? 50
                    : 50;


            const x =
                clamp(
                    baseX +
                    wave +
                    randomX,
                    minX,
                    maxX
                );


            const y =
                clamp(
                    baseY +
                    randomY,
                    minY,
                    maxY
                );


            positions.push({
                x,
                y
            });
        }
    );


    return positions;
}


/* =========================================================
   CREAR CARDS
   ========================================================= */

function createArtworks() {

    artworkLayer.innerHTML = "";

    cards = [];


    artworks.forEach(
        (artwork, index) => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "artwork-card";


            card.dataset.index =
                index;


            const original =
                getOriginalPosition(
                    index
                );


            card.dataset.originalX =
                original.x;

            card.dataset.originalY =
                original.y;


            card.style.left =
                `${original.x}%`;

            card.style.top =
                `${original.y}%`;


            /*
             * IMAGE
             */

            const imageWrap =
                document.createElement(
                    "div"
                );

            imageWrap.className =
                "artwork-image-wrap";


            const image =
                document.createElement(
                    "img"
                );

            image.className =
                "artwork-image";

            image.src =
                artwork.image;

            image.alt =
                artwork.title;

            image.draggable =
                false;


            imageWrap.appendChild(
                image
            );


            /*
             * TITLE
             */

            const title =
                document.createElement(
                    "div"
                );

            title.className =
                "artwork-title";

            title.textContent =
                artwork.title;


            card.appendChild(
                imageWrap
            );

            card.appendChild(
                title
            );


            artworkLayer.appendChild(
                card
            );


            cards.push({
                element: card,
                artwork,
                index,
                original,
                target: original
            });


            setupCardInteraction(
                card,
                artwork,
                index
            );


            setupArtworkMovement(
                card,
                index
            );
        }
    );
}


/* =========================================================
   MOVIMIENTO DE CADA OBRA
   ========================================================= */

function setupArtworkMovement(
    card,
    index
) {

    const seed =
        index * 1937;


    const amplitudeX =
        isMobile()
            ? 4 +
              seededRandom(seed + 1) * 4
            : 5 +
              seededRandom(seed + 1) * 7;


    const amplitudeY =
        isMobile()
            ? 4 +
              seededRandom(seed + 2) * 4
            : 5 +
              seededRandom(seed + 2) * 7;


    const speed =
        0.00010 +
        seededRandom(seed + 3) *
        0.00008;


    const phase =
        seededRandom(seed + 4) *
        Math.PI *
        2;


    const start =
        performance.now();


    function animate(time) {

        if (
            !card.classList.contains(
                "is-still"
            )
        ) {

            const t =
                (time - start) *
                speed;


            const x =
                Math.sin(
                    t +
                    phase
                ) *
                amplitudeX
                +
                Math.sin(
                    t * 2.17 +
                    phase * 1.4
                ) *
                amplitudeX *
                0.18;


            const y =
                Math.cos(
                    t * 0.91 +
                    phase
                ) *
                amplitudeY
                +
                Math.sin(
                    t * 1.73 +
                    phase
                ) *
                amplitudeY *
                0.20;


            card.style.setProperty(
                "--move-x",
                `${x}px`
            );

            card.style.setProperty(
                "--move-y",
                `${y}px`
            );
        }


        requestAnimationFrame(
            animate
        );
    }


    requestAnimationFrame(
        animate
    );
}


/* =========================================================
   INTERACCIÓN
   ========================================================= */

function setupCardInteraction(
    card,
    artwork,
    index
) {

    /*
     * DESKTOP HOVER
     */

    card.addEventListener(
        "mouseenter",
        () => {

            if (isMobile()) {
                return;
            }


            focusedArtwork =
                index;


            card.classList.add(
                "is-still"
            );


            showInfo(
                artwork
            );
        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            if (isMobile()) {
                return;
            }


            focusedArtwork =
                null;


            card.classList.remove(
                "is-still"
            );


            hideInfo();
        }
    );


    /*
     * CLICK
     */

    card.addEventListener(
        "click",
        event => {

            /*
             * DESKTOP:
             * click lleva directamente
             * a la obra.
             */

            if (!isMobile()) {

                window.location.href =
                    artwork.link;

                return;
            }


            /*
             * MOBILE:
             *
             * primer tap:
             * información
             *
             * segundo tap:
             * link
             */

            if (
                !card.classList.contains(
                    "is-open"
                )
            ) {

                event.preventDefault();
                event.stopPropagation();


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


                focusedArtwork =
                    index;


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

function showInfo(
    artwork
) {

    infoTitle.textContent =
        artwork.title;


    emotionValues.innerHTML =
        "";


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
                "info-emotion";


            /*
             * HEADER
             */

            const header =
                document.createElement(
                    "div"
                );

            header.className =
                "info-emotion-header";


            const name =
                document.createElement(
                    "span"
                );

            name.className =
                "info-emotion-name";

            name.textContent =
                emotion.toLowerCase();


            const percentage =
                document.createElement(
                    "span"
                );

            percentage.className =
                "info-emotion-value";

            percentage.textContent =
                `${value.toFixed(2)}%`;


            header.appendChild(
                name
            );

            header.appendChild(
                percentage
            );


            /*
             * BAR
             */

            const bar =
                document.createElement(
                    "div"
                );

            bar.className =
                "info-bar";


            const fill =
                document.createElement(
                    "div"
                );

            fill.className =
                "info-bar-fill";


            fill.style.background =
                emotionColors[
                    emotion
                ];


            /*
             * La longitud de la barra representa
             * directamente el porcentaje.
             */

            fill.style.width =
                `${value}%`;


            bar.appendChild(
                fill
            );


            row.appendChild(
                header
            );

            row.appendChild(
                bar
            );


            emotionValues.appendChild(
                row
            );
        }
    );


    infoPanel.classList.add(
        "visible"
    );
}


/* =========================================================
   HIDE INFO
   ========================================================= */

function hideInfo() {

    infoPanel.classList.remove(
        "visible"
    );
}


/* =========================================================
   CLOSE MOBILE
   ========================================================= */

closeInfo.addEventListener(
    "click",
    event => {

        event.preventDefault();

        event.stopPropagation();


        cards.forEach(
            card => {

                card.element
                    .classList
                    .remove(
                        "is-open"
                    );

                card.element
                    .classList
                    .remove(
                        "is-still"
                    );
            }
        );


        focusedArtwork =
            null;


        hideInfo();
    }
);


/* =========================================================
   FILTRO
   ========================================================= */

function applyFilter(
    emotion
) {

    currentFilter =
        emotion;


    /*
     * Botones
     */

    filterButtons.forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.emotion ===
                emotion
            );
        }
    );


    /*
     * Cerrar información.
     */

    focusedArtwork =
        null;

    hideInfo();


    cards.forEach(
        card => {

            card.element
                .classList
                .remove(
                    "is-open"
                );

            card.element
                .classList
                .remove(
                    "is-still"
                );
        }
    );


    /*
     * TODAS
     *
     * Volvemos suavemente a la posición
     * original de cada obra.
     */

    if (
        emotion === "all"
    ) {

        cards.forEach(
            card => {

                card.element
                    .classList
                    .remove(
                        "is-hidden"
                    );


                card.element.style.left =
                    `${card.original.x}%`;

                card.element.style.top =
                    `${card.original.y}%`;
            }
        );


        createParticles();

        return;
    }


    /*
     * FILTRO
     *
     * Construimos el ranking.
     */

    const ranked =
        cards
            .filter(
                card =>
                    card.artwork.emotions[
                        emotion
                    ] > 0
            )
            .sort(
                (a, b) =>
                    b.artwork.emotions[
                        emotion
                    ] -
                    a.artwork.emotions[
                        emotion
                    ]
            );


    /*
     * Calculamos las nuevas posiciones.
     *
     * IMPORTANTE:
     * no cambiamos el DOM.
     * Cada obra simplemente viaja
     * a su nuevo lugar.
     */

    const positions =
        getFilteredPositions(
            ranked
        );


    /*
     * Obras visibles.
     */

    ranked.forEach(
        (card, rank) => {

            card.element
                .classList
                .remove(
                    "is-hidden"
                );


            const target =
                positions[rank];


            card.target =
                target;


            card.element.style.left =
                `${target.x}%`;

            card.element.style.top =
                `${target.y}%`;
        }
    );


    /*
     * Obras con 0% desaparecen.
     *
     * No se eliminan:
     * simplemente desaparecen suavemente.
     */

    cards.forEach(
        card => {

            if (
                card.artwork.emotions[
                    emotion
                ] <= 0
            ) {

                card.element
                    .classList
                    .add(
                        "is-hidden"
                    );
            }
        }
    );


    createParticles();
}


/* =========================================================
   BOTONES
   ========================================================= */

filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                applyFilter(
                    button.dataset.emotion
                );
            }
        );
    }
);


/* =========================================================
   PARTICLES
   ========================================================= */

function createParticles() {

    particles = [];


    artworks.forEach(
        (artwork, artworkIndex) => {

            emotions.forEach(
                (
                    emotion,
                    emotionIndex
                ) => {

                    const value =
                        artwork.emotions[
                            emotion
                        ];


                    /*
                     * 20.69% → 21 puntos.
                     */

                    const count =
                        Math.round(
                            value
                        );


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

                            /*
                             * Todos tienen el mismo
                             * tamaño en drawParticles.
                             */

                            angle:
                                seededRandom(
                                    seed + 1
                                ) *
                                Math.PI *
                                2,

                            /*
                             * En todas:
                             * muy dispersos.
                             */

                            radius:
                                70 +
                                seededRandom(
                                    seed + 2
                                ) *
                                125,

                            phase:
                                seededRandom(
                                    seed + 3
                                ) *
                                Math.PI *
                                2,

                            speed:
                                0.00008 +
                                seededRandom(
                                    seed + 4
                                ) *
                                0.00012,

                            wobble:
                                5 +
                                seededRandom(
                                    seed + 5
                                ) *
                                9
                        });
                    }
                }
            );
        }
    );
}


/* =========================================================
   CENTRO DE UNA OBRA
   ========================================================= */

function getArtworkCenter(
    artworkIndex
) {

    const card =
        cards.find(
            item =>
                item.index ===
                artworkIndex
        );


    if (!card) {
        return null;
    }


    /*
     * Aunque esté oculto, no queremos
     * dibujar sus puntos.
     */

    if (
        card.element.classList
            .contains(
                "is-hidden"
            )
    ) {
        return null;
    }


    const rect =
        card.element
            .getBoundingClientRect();


    const mapRect =
        mapContainer
            .getBoundingClientRect();


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
   PARTICLES ANIMATION
   ========================================================= */

function drawParticles(
    time
) {

    ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );


    particles.forEach(
        particle => {

            /*
             * Si hay filtro:
             * solo la emoción seleccionada.
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


            const isFocused =
                focusedArtwork ===
                particle.artworkIndex;


            /*
             * =================================================
             * RADIO
             * =================================================
             *
             * TODAS:
             * puntos muy separados.
             *
             * HOVER/TAP:
             * puntos de esa obra se acercan.
             *
             * FILTRO:
             * también reducimos ligeramente el campo,
             * porque el paisaje está concentrado.
             */

            let baseRadius;


            if (isFocused) {

                baseRadius =
                    35 +
                    seededRandom(
                        particle.artworkIndex *
                        10000 +
                        particle.emotion.length *
                        100 +
                        Math.round(
                            particle.radius
                        )
                    ) *
                    45;

            } else if (
                currentFilter !== "all"
            ) {

                baseRadius =
                    48 +
                    (
                        particle.radius -
                        70
                    ) *
                    0.55;

            } else {

                baseRadius =
                    particle.radius;
            }


            /*
             * Movimiento orgánico.
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
                0.32;


            const radius =
                baseRadius +
                Math.sin(
                    t * 1.37 +
                    particle.phase
                ) *
                particle.wobble;


            const secondaryX =
                Math.sin(
                    t * 0.71 +
                    particle.phase * 1.8
                ) *
                6;


            const secondaryY =
                Math.cos(
                    t * 0.63 +
                    particle.phase
                ) *
                6;


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


            /*
             * =================================================
             * PUNTO
             * =================================================
             *
             * EXACTAMENTE EL MISMO TAMAÑO.
             *
             * SIN opacity.
             */

            ctx.globalAlpha = 1;

            ctx.fillStyle =
                emotionColors[
                    particle.emotion
                ];


            ctx.beginPath();

            ctx.arc(
                clamp(
                    x,
                    -50,
                    canvasWidth + 50
                ),
                clamp(
                    y,
                    -50,
                    canvasHeight + 50
                ),
                2,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }
    );


    ctx.globalAlpha = 1;


    requestAnimationFrame(
        drawParticles
    );
}


/* =========================================================
   CLICK FUERA EN MOBILE
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        if (!isMobile()) {
            return;
        }


        if (
            !infoPanel.classList
                .contains(
                    "visible"
                )
        ) {
            return;
        }


        if (
            infoPanel.contains(
                event.target
            )
        ) {
            return;
        }


        if (
            event.target.closest(
                ".artwork-card"
            )
        ) {
            return;
        }


        cards.forEach(
            card => {

                card.element
                    .classList
                    .remove(
                        "is-open"
                    );

                card.element
                    .classList
                    .remove(
                        "is-still"
                    );
            }
        );


        focusedArtwork =
            null;


        hideInfo();
    }
);


/* =========================================================
   RESIZE
   ========================================================= */

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


                    /*
                     * Recalcular posiciones actuales
                     * sin cambiar el filtro.
                     */

                    if (
                        currentFilter ===
                        "all"
                    ) {

                        cards.forEach(
                            card => {

                                const position =
                                    getOriginalPosition(
                                        card.index
                                    );


                                card.original =
                                    position;


                                card.element.style.left =
                                    `${position.x}%`;

                                card.element.style.top =
                                    `${position.y}%`;
                            }
                        );

                    } else {

                        applyFilter(
                            currentFilter
                        );
                    }

                },
                200
            );
    }
);


/* =========================================================
   INIT
   ========================================================= */

resizeCanvas();

createArtworks();

createParticles();

requestAnimationFrame(
    drawParticles
);
