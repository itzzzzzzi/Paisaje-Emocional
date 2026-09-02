/* ============================================
   PAISAJE EMOCIONAL
   Silvia & The Spyglass
   ============================================ */


/* --------------------------------
   EMOCIONES
-------------------------------- */

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


/* --------------------------------
   COLORES
   Se toman directamente de las
   variables definidas en style.css
-------------------------------- */

const emotionColors = {};

emotions.forEach(emotion => {

    const variableName = {
        "Alegría": "--alegria",
        "Confianza": "--confianza",
        "Curiosidad": "--curiosidad",
        "Sorpresa": "--sorpresa",
        "Disgusto": "--disgusto",
        "Ira": "--ira",
        "Miedo": "--miedo",
        "Tristeza": "--tristeza"
    }[emotion];

    emotionColors[emotion] =
        getComputedStyle(document.documentElement)
            .getPropertyValue(variableName)
            .trim();

});


/* --------------------------------
   DATOS DE LAS OBRAS
-------------------------------- */

const artworks = [

    {
        title: "Algo se está cocinando",
        image: "images/algo-se-esta-cocinando.avif",
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

    /*
    --------------------------------
    AÑADIR LAS SIGUIENTES OBRAS AQUÍ

    Ejemplo:

    {
        title: "Crisálida I",
        image: "images/crisalida-i.avif",
        emotions: {
            "Alegría": 6.15,
            "Confianza": 15.22,
            "Curiosidad": 36.25,
            "Sorpresa": 36.02,
            "Disgusto": 0.89,
            "Ira": 2.62,
            "Miedo": 2.84,
            "Tristeza": 0.01
        }
    },

    --------------------------------
    */

];


/* ============================================
   ELEMENTOS HTML
============================================ */

const mapContainer =
    document.querySelector(".map-container");

const artworkLayer =
    document.getElementById("artworkLayer");

const canvas =
    document.getElementById("emotionCanvas");

const ctx =
    canvas.getContext("2d");

const infoPanel =
    document.getElementById("artworkInfo");

const artworkTitle =
    document.getElementById("artworkTitle");

const emotionValues =
    document.getElementById("emotionValues");

const closeInfo =
    document.getElementById("closeInfo");

const filterButtons =
    document.querySelectorAll(".emotion");


/* ============================================
   ESTADO
============================================ */

let activeEmotion = "all";

let nodes = [];

let animationTime = 0;


/* ============================================
   CANVAS
============================================ */

function resizeCanvas() {

    const width =
        mapContainer.clientWidth;

    const height =
        mapContainer.clientHeight;

    const ratio =
        window.devicePixelRatio || 1;

    canvas.width =
        width * ratio;

    canvas.height =
        height * ratio;

    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";

    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );

    positionArtworks();

}


window.addEventListener(
    "resize",
    resizeCanvas
);


/* ============================================
   POSICIONAMIENTO

   Las obras se distribuyen en un paisaje
   amplio, dejando espacio suficiente entre ellas.
============================================ */

function positionArtworks() {

    if (!nodes.length) {
        return;
    }

    const width =
        mapContainer.clientWidth;

    const height =
        mapContainer.clientHeight;


    /*
        En pantallas grandes utilizamos una
        distribución amplia.

        En pantallas pequeñas hacemos que las
        obras estén algo más juntas.
    */

    let positions;


    if (width > 1000) {

        positions = [
            [0.20, 0.34],
            [0.47, 0.27],
            [0.75, 0.35],
            [0.30, 0.61],
            [0.61, 0.56],
            [0.82, 0.70],
            [0.46, 0.82]
        ];

    } else if (width > 700) {

        positions = [
            [0.20, 0.34],
            [0.50, 0.27],
            [0.79, 0.35],
            [0.29, 0.61],
            [0.63, 0.57],
            [0.80, 0.74],
            [0.48, 0.82]
        ];

    } else {

        positions = [
            [0.27, 0.25],
            [0.72, 0.24],
            [0.50, 0.40],
            [0.24, 0.55],
            [0.76, 0.54],
            [0.30, 0.76],
            [0.70, 0.76]
        ];

    }


    nodes.forEach((node, index) => {

        if (!positions[index]) {
            return;
        }

        const [x, y] =
            positions[index];

        node.baseX =
            width * x;

        node.baseY =
            height * y;

        node.x =
            node.baseX;

        node.y =
            node.baseY;

        node.element.style.left =
            node.x + "px";

        node.element.style.top =
            node.y + "px";

    });

}


/* ============================================
   CREAR LAS OBRAS
============================================ */

function createArtworks() {

    artworkLayer.innerHTML = "";

    nodes = [];


    artworks.forEach((artwork, index) => {

        const article =
            document.createElement("article");

        article.className =
            "artwork";


        /*
            Imagen
        */

        const image =
            document.createElement("img");

        image.className =
            "artwork-image";

        image.src =
            artwork.image;

        image.alt =
            artwork.title;

        image.draggable =
            false;

        image.loading =
            "lazy";


        /*
            Título
        */

        const title =
            document.createElement("div");

        title.className =
            "artwork-title";

        title.textContent =
            artwork.title;


        /*
            Pequeño campo para las partículas.
            Las partículas estarán detrás de la imagen.
        */

        const particleContainer =
            document.createElement("div");

        particleContainer.className =
            "particle-container";


        article.appendChild(
            particleContainer
        );

        article.appendChild(
            image
        );

        article.appendChild(
            title
        );


        artworkLayer.appendChild(
            article
        );


        const node = {

            artwork: artwork,

            element: article,

            particleContainer:
                particleContainer,

            baseX: 0,
            baseY: 0,

            x: 0,
            y: 0,

            phase:
                index * 1.73,

            index: index

        };


        nodes.push(node);


        /*
            Click sobre la obra
        */

        article.addEventListener(
            "click",
            () => {

                openArtwork(
                    artwork
                );

            }
        );


        /*
            Hover
        */

        article.addEventListener(
            "mouseenter",
            () => {

                article.classList.add(
                    "hovered"
                );

            }
        );


        article.addEventListener(
            "mouseleave",
            () => {

                article.classList.remove(
                    "hovered"
                );

            }
        );

    });


    positionArtworks();

}


/* ============================================
   PARTÍCULAS EMOCIONALES

   Las partículas NO representan las obras.
   Representan la presencia de las emociones
   alrededor de cada obra.
============================================ */

function drawParticles() {

    const width =
        mapContainer.clientWidth;

    const height =
        mapContainer.clientHeight;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    nodes.forEach(node => {

        const artwork =
            node.artwork;


        emotions.forEach(
            (emotion, emotionIndex) => {

                const value =
                    artwork.emotions[emotion];


                /*
                    Si hay un filtro activo,
                    solo mostramos esa emoción.
                */

                if (
                    activeEmotion !== "all" &&
                    emotion !== activeEmotion
                ) {
                    return;
                }


                /*
                    La cantidad de partículas
                    depende del porcentaje.
                */

                const particleCount =
                    Math.max(
                        1,
                        Math.round(
                            value / 4
                        )
                    );


                const color =
                    emotionColors[emotion];


                /*
                    Las partículas forman una
                    pequeña nube alrededor de la obra.
                */

                for (
                    let i = 0;
                    i < particleCount;
                    i++
                ) {

                    const seed =
                        (
                            node.index * 17 +
                            emotionIndex * 31 +
                            i * 13
                        );


                    const angle =
                        seed * 2.39996 +
                        animationTime *
                        0.00015;


                    const distance =
                        85 +
                        (
                            (
                                seed * 37
                            ) % 70
                        );


                    const movement =
                        Math.sin(
                            animationTime *
                            0.0008 +
                            seed
                        ) * 7;


                    const x =
                        node.x +
                        Math.cos(angle) *
                        (
                            distance +
                            movement
                        );


                    const y =
                        node.y +
                        Math.sin(angle) *
                        (
                            distance +
                            movement
                        );


                    /*
                        Cuando el porcentaje es
                        pequeño, los puntos son más
                        transparentes.
                    */

                    const alpha =
                        Math.min(
                            0.75,
                            0.18 +
                            value / 100
                        );


                    const radius =
                        1.2 +
                        (
                            value / 100
                        ) * 2.5;


                    ctx.beginPath();

                    ctx.arc(
                        x,
                        y,
                        radius,
                        0,
                        Math.PI * 2
                    );

                    ctx.fillStyle =
                        color;

                    ctx.globalAlpha =
                        alpha;

                    ctx.fill();

                }

            }
        );

    });


    ctx.globalAlpha = 1;

}


/* ============================================
   ANIMACIÓN

   Movimiento extremadamente lento.
============================================ */

function animate(time) {

    animationTime =
        time;


    nodes.forEach(node => {

        /*
            Movimiento muy pequeño.
            La sensación debería ser de
            un paisaje que respira.
        */

        const movementX =
            Math.sin(
                time * 0.00025 +
                node.phase
            ) * 3;

        const movementY =
            Math.cos(
                time * 0.00021 +
                node.phase
            ) * 3;


        node.x =
            node.baseX +
            movementX;

        node.y =
            node.baseY +
            movementY;


        node.element.style.left =
            node.x + "px";

        node.element.style.top =
            node.y + "px";

    });


    drawParticles();


    requestAnimationFrame(
        animate
    );

}


/* ============================================
   FILTROS
============================================ */

filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                activeEmotion =
                    button.dataset.emotion;


                filterButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                updateArtworkVisibility();

            }
        );

    }
);


/* ============================================
   VISIBILIDAD SEGÚN EMOCIÓN
============================================ */

function updateArtworkVisibility() {

    nodes.forEach(node => {

        const artwork =
            node.artwork;


        if (
            activeEmotion === "all"
        ) {

            node.element.style.opacity =
                "1";

            node.element.classList.remove(
                "dimmed"
            );

            return;

        }


        const value =
            artwork.emotions[
                activeEmotion
            ];


        /*
            Las obras con mucha presencia
            de la emoción permanecen fuertes.

            Las demás se vuelven más sutiles.
        */

        let opacity;


        if (value >= 30) {

            opacity = 1;

        } else if (value >= 20) {

            opacity = 0.85;

        } else if (value >= 10) {

            opacity = 0.55;

        } else {

            opacity = 0.25;

        }


        node.element.style.opacity =
            opacity;


        node.element.classList.toggle(
            "dimmed",
            value < 10
        );

    });

}


/* ============================================
   INFORMACIÓN DE LA OBRA
============================================ */

function openArtwork(artwork) {

    artworkTitle.textContent =
        artwork.title;


    emotionValues.innerHTML =
        "";


    emotions.forEach(
        emotion => {

            const value =
                artwork.emotions[
                    emotion
                ];


            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "emotion-value";


            const name =
                document.createElement(
                    "span"
                );

            name.className =
                "emotion-name";

            name.textContent =
                emotion.toLowerCase();


            const bar =
                document.createElement(
                    "div"
                );

            bar.className =
                "emotion-bar";


            const fill =
                document.createElement(
                    "div"
                );

            fill.className =
                "emotion-bar-fill";


            fill.style.width =
                value + "%";


            fill.style.background =
                emotionColors[
                    emotion
                ];


            bar.appendChild(
                fill
            );


            const number =
                document.createElement(
                    "span"
                );

            number.className =
                "emotion-number";

            number.textContent =
                value.toFixed(2) + "%";


            row.appendChild(
                name
            );

            row.appendChild(
                bar
            );

            row.appendChild(
                number
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


/* ============================================
   CERRAR INFORMACIÓN
============================================ */

closeInfo.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        infoPanel.classList.remove(
            "visible"
        );

    }
);


/* ============================================
   INICIALIZACIÓN
============================================ */

createArtworks();

resizeCanvas();

updateArtworkVisibility();

requestAnimationFrame(
    animate
);
