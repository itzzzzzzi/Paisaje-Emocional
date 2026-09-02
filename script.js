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
   DATOS DE LAS OBRAS
   =========================================================
   
   El orden de emotions es siempre:

   Alegría
   Confianza
   Curiosidad
   Sorpresa
   Disgusto
   Ira
   Miedo
   Tristeza
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
        .getPropertyValue("--alegria")
        .trim(),

    "Confianza": getComputedStyle(document.documentElement)
        .getPropertyValue("--confianza")
        .trim(),

    "Curiosidad": getComputedStyle(document.documentElement)
        .getPropertyValue("--curiosidad")
        .trim(),

    "Sorpresa": getComputedStyle(document.documentElement)
        .getPropertyValue("--sorpresa")
        .trim(),

    "Disgusto": getComputedStyle(document.documentElement)
        .getPropertyValue("--disgusto")
        .trim(),

    "Ira": getComputedStyle(document.documentElement)
        .getPropertyValue("--ira")
        .trim(),

    "Miedo": getComputedStyle(document.documentElement)
        .getPropertyValue("--miedo")
        .trim(),

    "Tristeza": getComputedStyle(document.documentElement)
        .getPropertyValue("--tristeza")
        .trim()
};


/* =========================================================
   ELEMENTOS
   ========================================================= */

const canvas = document.getElementById("emotionCanvas");
const ctx = canvas.getContext("2d");

const mapContainer = document.querySelector(".map-container");
const artworkLayer = document.getElementById("artworkLayer");
const filterButtons = document.querySelectorAll(".emotion");


/* =========================================================
   ESTADO
   ========================================================= */

let currentFilter = "all";

let cards = [];

let particles = [];

let animationFrame;

let canvasWidth = 0;
let canvasHeight = 0;

const isMobile = () =>
    window.matchMedia("(max-width: 700px)").matches;


/* =========================================================
   UTILIDADES
   ========================================================= */

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}


function slugifyEmotion(emotion) {
    return emotion
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
}


/*
 * Random determinista.
 * Hace que cada punto tenga un comportamiento estable
 * en lugar de cambiar aleatoriamente cada frame.
 */
function seededRandom(seed) {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
}


/* =========================================================
   CANVAS
   ========================================================= */

function resizeCanvas() {
    const rect = mapContainer.getBoundingClientRect();

    canvasWidth = Math.max(1, rect.width);
    canvasHeight = Math.max(1, rect.height);

    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;

    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    createParticles();
}


/* =========================================================
   LAYOUT DE OBRAS
   =========================================================
   
   En "all" utilizamos una composición más orgánica.

   Cuando hay un filtro:
   - se ordenan de mayor a menor
   - se colocan en reading order:
     izquierda → derecha
     arriba → abajo
   ========================================================= */

function getLayoutPositions(numberOfVisibleWorks) {

    const mobile = isMobile();

    let columns;

    if (mobile) {
        columns = window.innerWidth <= 430 ? 2 : 2;
    } else if (window.innerWidth <= 1000) {
        columns = 3;
    } else {
        columns = 4;
    }

    /*
     * Cuando hay pocas obras queremos mantener bastante aire.
     */
    if (numberOfVisibleWorks <= 2) {
        columns = mobile ? 2 : 2;
    }

    if (numberOfVisibleWorks === 3) {
        columns = mobile ? 2 : 3;
    }

    const rows = Math.ceil(numberOfVisibleWorks / columns);

    /*
     * En móvil aumentamos la altura para que las cajas
     * puedan abrirse sin tocar los filtros.
     */
    if (mobile) {
        const rowHeight = window.innerWidth <= 430 ? 180 : 185;

        const desiredHeight = Math.max(
            720,
            rows * rowHeight + 100
        );

        mapContainer.style.height = `${desiredHeight}px`;
    } else {
        /*
         * En desktop dejamos una zona generosa.
         */
        mapContainer.style.height = "calc(100vh - 170px)";
        mapContainer.style.minHeight = "620px";
    }

    const positions = [];

    if (currentFilter === "all") {

        /*
         * Composición inicial:
         * deliberadamente no es una cuadrícula perfecta.
         */
        if (!mobile && window.innerWidth > 1000) {

            const desktopPositions = [
                { x: 14, y: 25 },
                { x: 38, y: 18 },
                { x: 63, y: 27 },
                { x: 86, y: 22 },

                { x: 24, y: 67 },
                { x: 53, y: 57 },
                { x: 78, y: 70 }
            ];

            for (let i = 0; i < numberOfVisibleWorks; i++) {
                positions.push(
                    desktopPositions[i] || {
                        x: 50,
                        y: 50
                    }
                );
            }

        } else if (!mobile) {

            const tabletPositions = [
                { x: 18, y: 24 },
                { x: 50, y: 20 },
                { x: 82, y: 25 },
                { x: 25, y: 68 },
                { x: 60, y: 60 },
                { x: 82, y: 72 },
                { x: 50, y: 78 }
            ];

            for (let i = 0; i < numberOfVisibleWorks; i++) {
                positions.push(
                    tabletPositions[i] || {
                        x: 50,
                        y: 50
                    }
                );
            }

        } else {

            /*
             * Mobile: cuadrícula pero con pequeñas variaciones.
             */
            const mobilePositions = [
                { x: 25, y: 15 },
                { x: 75, y: 15 },

                { x: 25, y: 40 },
                { x: 75, y: 40 },

                { x: 25, y: 65 },
                { x: 75, y: 65 },

                { x: 25, y: 89 }
            ];

            for (let i = 0; i < numberOfVisibleWorks; i++) {
                positions.push(
                    mobilePositions[i] || {
                        x: 50,
                        y: 50
                    }
                );
            }
        }

    } else {

        /*
         * FILTRO ACTIVO
         *
         * Reading order:
         * izquierda → derecha
         * arriba → abajo
         */
        const horizontalPadding = mobile ? 20 : 12;
        const verticalStart = mobile ? 15 : 17;
        const verticalEnd = mobile ? 87 : 78;

        const usableWidth = 100 - horizontalPadding * 2;
        const usableHeight = verticalEnd - verticalStart;

        for (let i = 0; i < numberOfVisibleWorks; i++) {

            const row = Math.floor(i / columns);
            const column = i % columns;

            const totalRows = Math.ceil(
                numberOfVisibleWorks / columns
            );

            const x =
                columns === 1
                    ? 50
                    : horizontalPadding +
                      (column / Math.max(1, columns - 1)) *
                      usableWidth;

            const y =
                totalRows === 1
                    ? 45
                    : verticalStart +
                      (row / Math.max(1, totalRows - 1)) *
                      usableHeight;

            positions.push({
                x,
                y
            });
        }
    }

    return positions;
}


/* =========================================================
   RENDER DE OBRAS
   ========================================================= */

function renderArtworks() {

    artworkLayer.innerHTML = "";

    cards = [];

    let visibleArtworks = artworks.map((artwork, index) => ({
        artwork,
        originalIndex: index
    }));


    /*
     * FILTRO
     */

    if (currentFilter !== "all") {

        visibleArtworks = visibleArtworks
            .filter(item => {
                return item.artwork.emotions[currentFilter] > 0;
            })
            .sort((a, b) => {
                return (
                    b.artwork.emotions[currentFilter] -
                    a.artwork.emotions[currentFilter]
                );
            });
    }


    /*
     * POSICIONES
     */

    const positions = getLayoutPositions(
        visibleArtworks.length
    );


    /*
     * CREAR CADA OBRA
     */

    visibleArtworks.forEach((item, index) => {

        const artwork = item.artwork;

        const card = document.createElement("article");

        card.className = "artwork-card";

        card.dataset.index = item.originalIndex;

        card.dataset.title = artwork.title;


        /*
         * Posición
         */

        const position = positions[index];

        card.style.left = `${position.x}%`;
        card.style.top = `${position.y}%`;


        /*
         * Wrapper imagen
         */

        const imageWrap = document.createElement("div");

        imageWrap.className = "artwork-image-wrap";


        /*
         * Imagen
         */

        const image = document.createElement("img");

        image.className = "artwork-image";

        image.src = artwork.image;

        image.alt = artwork.title;

        image.draggable = false;


        imageWrap.appendChild(image);


        /*
         * Caja de información
         */

        const info = document.createElement("div");

        info.className = "artwork-info";


        /*
         * Botón X
         */

        const closeButton = document.createElement("button");

        closeButton.className = "info-close";

        closeButton.type = "button";

        closeButton.innerHTML = "×";

        closeButton.setAttribute(
            "aria-label",
            "Cerrar información"
        );


        closeButton.addEventListener("click", event => {

            event.preventDefault();
            event.stopPropagation();

            card.classList.remove("is-open");
            card.classList.remove("is-still");

        });


        /*
         * Título
         */

        const title = document.createElement("h2");

        title.className = "info-title";

        title.textContent = artwork.title;


        /*
         * Emociones
         */

        const emotionContainer =
            document.createElement("div");

        emotionContainer.className = "info-emotions";


        const emotionsToShow =
            currentFilter === "all"
                ? emotions
                : [currentFilter];


        emotionsToShow.forEach(emotion => {

            const value =
                artwork.emotions[emotion];


            /*
             * En modo normal enseñamos todas.
             * En filtro, solo la seleccionada.
             */

            if (
                currentFilter !== "all" &&
                value <= 0
            ) {
                return;
            }


            const row = document.createElement("div");

            row.className = "emotion-row";


            const name = document.createElement("span");

            name.className = "emotion-name";


            const indicator =
                document.createElement("span");

            indicator.className =
                "emotion-indicator indicator-" +
                slugifyEmotion(emotion);


            name.appendChild(indicator);

            name.appendChild(
                document.createTextNode(emotion.toLowerCase())
            );


            const percentage =
                document.createElement("span");

            percentage.className = "emotion-value";

            percentage.textContent =
                `${value.toFixed(2)}%`;


            row.appendChild(name);

            row.appendChild(percentage);

            emotionContainer.appendChild(row);
        });


        info.appendChild(closeButton);

        info.appendChild(title);

        info.appendChild(emotionContainer);


        /*
         * Montar card
         */

        card.appendChild(imageWrap);

        card.appendChild(info);

        artworkLayer.appendChild(card);


        /*
         * Guardamos referencia
         */

        cards.push({
            element: card,
            artwork,
            originalIndex: item.originalIndex,
            position,
            image
        });


        /*
         * Interacción desktop
         */

        card.addEventListener("mouseenter", () => {

            if (!isMobile()) {

                card.classList.add("is-still");

            }
        });


        card.addEventListener("mouseleave", () => {

            if (!isMobile()) {

                card.classList.remove("is-still");

            }
        });


        /*
         * Interacción click / tap
         */

        let mobileOpened = false;

        card.addEventListener("click", event => {

            /*
             * DESKTOP
             *
             * Click = ir directamente a la obra.
             */
            if (!isMobile()) {

                window.location.href = artwork.link;

                return;
            }


            /*
             * MOBILE
             *
             * Primer tap = información.
             * Segundo tap = link.
             */

            if (!mobileOpened) {

                event.preventDefault();

                mobileOpened = true;

                card.classList.add("is-open");
                card.classList.add("is-still");

            } else {

                window.location.href = artwork.link;
            }
        });


        /*
         * Si tocamos fuera de la card, cerramos
         * la información en mobile.
         */
        document.addEventListener(
            "click",
            event => {

                if (
                    isMobile() &&
                    mobileOpened &&
                    !card.contains(event.target)
                ) {

                    card.classList.remove("is-open");
                    card.classList.remove("is-still");

                    mobileOpened = false;
                }
            },
            { passive: true }
        );
    });


    /*
     * Crear de nuevo los puntos
     */

    createParticles();
}


/* =========================================================
   PARTICLES
   =========================================================
   
   Número de puntos:
   
   7.18%  → 7 puntos
   20.69% → 21 puntos
   38.22% → 38 puntos
   
   Nunca utilizamos opacity.
   ========================================================= */

function createParticles() {

    particles = [];


    artworks.forEach((artwork, artworkIndex) => {

        emotions.forEach((emotion, emotionIndex) => {

            const value =
                artwork.emotions[emotion];


            /*
             * El número de puntos corresponde al porcentaje
             * redondeado al entero más cercano.
             */
            const numberOfPoints =
                Math.round(value);


            for (
                let pointIndex = 0;
                pointIndex < numberOfPoints;
                pointIndex++
            ) {

                const seed =
                    artworkIndex * 10000 +
                    emotionIndex * 1000 +
                    pointIndex;


                /*
                 * Distribución inicial.
                 *
                 * sqrt = distribución más natural alrededor
                 * del centro que una simple línea radial.
                 */
                const angle =
                    seededRandom(seed + 1) *
                    Math.PI *
                    2;

                const radius =
                    25 +
                    Math.sqrt(
                        seededRandom(seed + 2)
                    ) * 90;


                particles.push({

                    artworkIndex,

                    emotion,

                    angle,

                    radius,

                    seed,

                    size:
                        1.65 +
                        seededRandom(seed + 3) * 1.15,

                    speed:
                        0.00012 +
                        seededRandom(seed + 4) * 0.00022,

                    phase:
                        seededRandom(seed + 5) *
                        Math.PI *
                        2,

                    wobble:
                        3 +
                        seededRandom(seed + 6) * 7
                });
            }
        });
    });
}


/* =========================================================
   POSICIÓN ACTUAL DE UNA OBRA
   ========================================================= */

function getArtworkCenter(artworkIndex) {

    const cardData = cards.find(
        card => card.originalIndex === artworkIndex
    );

    if (!cardData) {
        return null;
    }

    const card = cardData.element;

    const rect = card.getBoundingClientRect();

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
            20
    };
}


/* =========================================================
   DIBUJO DE PARTICLES
   ========================================================= */

function drawParticles(time) {

    ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );


    particles.forEach(particle => {

        /*
         * Si estamos filtrando una emoción,
         * todos los demás puntos desaparecen.
         */
        if (
            currentFilter !== "all" &&
            particle.emotion !== currentFilter
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
         * Movimiento orgánico.
         *
         * Cada punto tiene:
         * - velocidad propia
         * - fase propia
         * - radio propio
         * - dos ondas diferentes
         *
         * Esto evita que parezcan partículas orbitando
         * mecánicamente alrededor de un centro.
         */

        const t =
            time * particle.speed;


        const organicAngle =
            particle.angle +
            Math.sin(
                t +
                particle.phase
            ) *
            0.22;


        const organicRadius =
            particle.radius +
            Math.sin(
                t * 1.37 +
                particle.phase
            ) *
            particle.wobble;


        const secondaryX =
            Math.sin(
                t * 0.83 +
                particle.phase * 2
            ) *
            4;


        const secondaryY =
            Math.cos(
                t * 0.71 +
                particle.phase
            ) *
            4;


        const x =
            center.x +
            Math.cos(organicAngle) *
            organicRadius +
            secondaryX;


        const y =
            center.y +
            Math.sin(organicAngle) *
            organicRadius *
            0.72 +
            secondaryY;


        /*
         * Evitar que los puntos se salgan demasiado
         * del propio mapa.
         */
        const safeX =
            clamp(x, -30, canvasWidth + 30);

        const safeY =
            clamp(y, -30, canvasHeight + 30);


        /*
         * COLOR 100% OPACO.
         */
        ctx.globalAlpha = 1;

        ctx.fillStyle =
            emotionColors[particle.emotion];


        ctx.beginPath();

        ctx.arc(
            safeX,
            safeY,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    });


    ctx.globalAlpha = 1;

    animationFrame =
        requestAnimationFrame(drawParticles);
}


/* =========================================================
   FILTROS
   ========================================================= */

function setFilter(emotion) {

    currentFilter = emotion;


    /*
     * Estado visual de botones.
     */

    filterButtons.forEach(button => {

        const active =
            button.dataset.emotion === emotion;

        button.classList.toggle(
            "active",
            active
        );
    });


    /*
     * Cerramos cualquier interacción mobile.
     */

    cards.forEach(card => {

        card.element.classList.remove(
            "is-open"
        );

        card.element.classList.remove(
            "is-still"
        );
    });


    /*
     * Renderizamos de nuevo.
     *
     * Esto es lo que hace que:
     * - se eliminen las obras con 0%
     * - se ordenen por porcentaje
     * - se reorganice el espacio
     * - cambie la información
     */
    renderArtworks();
}


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        setFilter(
            button.dataset.emotion
        );

    });

});


/* =========================================================
   RESIZE
   ========================================================= */

let resizeTimeout;

window.addEventListener("resize", () => {

    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {

        resizeCanvas();

        renderArtworks();

    }, 150);
});


/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

resizeCanvas();

renderArtworks();

cancelAnimationFrame(animationFrame);

animationFrame =
    requestAnimationFrame(drawParticles);
