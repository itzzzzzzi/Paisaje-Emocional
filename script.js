
/* --------------------------------
   DATOS
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


const emotionColors = {

    "Alegría":
        getComputedStyle(document.documentElement)
            .getPropertyValue("--alegria"),

    "Confianza":
        getComputedStyle(document.documentElement)
            .getPropertyValue("--confianza"),

    "Curiosidad":
        getComputedStyle(document.documentElement)
            .getPropertyValue("--curiosidad"),

    "Sorpresa":
        getComputedStyle(document.documentElement)
            .getPropertyValue("--sorpresa"),

    "Disgusto":
        getComputedStyle(document.documentElement)
            .getPropertyValue("--disgusto"),

    "Ira":
        getComputedStyle(document.documentElement)
            .getPropertyValue("--ira"),

    "Miedo":
        getComputedStyle(document.documentElement)
            .getPropertyValue("--miedo"),

    "Tristeza":
        getComputedStyle(document.documentElement)
            .getPropertyValue("--tristeza")

};


/*
    Los porcentajes proceden de la tabla
    de las 56 obras del estudio.

    La ruta de imagen es relativa a /images/
*/

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

    // --------------------------------
    // AÑADIR AQUÍ EL RESTO DE OBRAS
    // --------------------------------

];
