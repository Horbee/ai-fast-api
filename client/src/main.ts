import { createApp } from "vue";
import { createI18n } from "vue-i18n";

import "./styles.css";

import App from "./App.vue";
import { router } from "./routes";

const userLang = navigator.languages
  ? navigator.languages[0]
  : navigator.language;

console.log({ userLang });

const i18n = createI18n({
  legacy: false,
  locale: userLang,
  fallbackLocale: "en",
  messages: {
    en: {
      titanicPredictor: {
        name: "Titanic",
        buttonTitle: "Predict",
        description: "Would you survive the Titanic? This model will tell you.",
        error: {
          title: "Uh oh! Something went wrong.",
          description: "Error while predicting response",
        },
        input: {
          class: {
            label: "Ticket Class",
            value1: "1st = Upper",
            value2: "2nd = Middle",
            value3: "3rd = Lower",
          },
          sex: {
            label: "Sex",
            value0: "Male",
            value1: "Female",
          },
          age: {
            label: "Age",
          },
          family_size: {
            label: "Family Members on Titanic",
          },
        },
        formProbabilityLabel: "Your chance of survival is:",
      },
      rainPredictor: {
        name: "Rain",
        buttonTitle: "Predict",
        description:
          "This model predicts the probability of precipitation based on temperature, humidity and surface pressure.",
        error: {
          title: "Uh oh! Something went wrong.",
          description: "Error while predicting response",
        },
        input: {
          temp: {
            label: "Temperature",
          },
          humidity: {
            label: "Humidity",
          },
          pressure: {
            label: "Surface pressure",
          },
        },
        formProbabilityLabel: "Chances of rain:",
      },
      toxicCommentAnalyser: {
        name: "Offensive Comment Analyser - German",
        buttonTitle: "Analyse",
        description:
          "This model is based on {link} and can detect offensive comments.",
        inputLabel: "Comment Text (DE)",
        modelVersionInputLabel: "Model Version",
        examplesLabel: "Try one of these:",
        error: {
          title: "Uh oh! Something went wrong.",
          description: "Error while analysing comment",
        },
        feedback: {
          correct: "Correct",
          incorrect: "Incorrect",
          saved: "Feedback submitted",
          error: {
            title: "Uh oh! Something went wrong.",
            description: "Error while submitting feedback",
          },
        },
        formProbabilityLabel: "Ensemble offensive score",
      },
      gecGerman: {
        name: "German Grammar Error Correction",
        inputLabel: "Your sentence to fix (DE)",
        buttonTitle: "Fix Sentence",
        originalLabel: "Original",
        correctedLabel: "Corrected",
        error: {
          title: "Uh oh! Something went wrong.",
          description: "Error while fixing your sentence",
        },
      },
    },
    hu: {
      titanicPredictor: {
        name: "Titanic",
        buttonTitle: "Előrejelzés",
        description: "Túlélnéd a Titanicot? Ez a modell megmondja.",
        error: {
          title: "Hoppá! Valami hiba történt.",
          description: "Hiba történt az előrejelzés során",
        },
        input: {
          class: {
            label: "Jegyosztály",
            value1: "1. = Felső",
            value2: "2. = Középső",
            value3: "3. = Alsó",
          },
          sex: {
            label: "Nem",
            value0: "Férfi",
            value1: "Nő",
          },
          age: {
            label: "Életkor",
          },
          family_size: {
            label: "Családtagok száma a Titanicon",
          },
        },
        formProbabilityLabel: "Túlélési esélyed:",
      },
      rainPredictor: {
        name: "Csapadék",
        buttonTitle: "Előrejelzés",
        description:
          "Ez a modell a csapadék valószínűségét jósolja a hőmérséklet, páratartalom és a felszíni nyomás alapján.",
        error: {
          title: "Hoppá! Valami hiba történt.",
          description: "Hiba történt az előrejelzés során",
        },
        input: {
          temp: {
            label: "Hőmérséklet",
          },
          humidity: {
            label: "Páratartalom",
          },
          pressure: {
            label: "Felszíni nyomás",
          },
        },
        formProbabilityLabel: "Eső valószínűsége:",
      },
      toxicCommentAnalyser: {
        name: "Offenzív Megjegyzés Analizátor (DE)",
        buttonTitle: "Elemzés",
        description:
          "Ez a modell a {link} alapján képes felismerni a offenzív kommenteket.",
        inputLabel: "Komment szöveg (DE)",
        modelVersionInputLabel: "Model Verzió",
        examplesLabel: "Próbáld ki az egyiket ezek közül:",
        error: {
          title: "Hoppá! Valami hiba történt.",
          description: "Hiba történt az elemzés során",
        },
        feedback: {
          correct: "Helyes",
          incorrect: "Helytelen",
          saved: "Visszajelzés mentve",
          error: {
            title: "Hoppá! Valami hiba történt.",
            description: "Hiba történt a visszajelzés elküldésekor",
          },
        },
        formProbabilityLabel: "közös offenzív pontszám",
      },
      gecGerman: {
        name: "Grammatikai Hibajavítás (DE)",
        inputLabel: "Hibás mondat a javításhoz (DE)",
        buttonTitle: "Mondat javítása",
        originalLabel: "Eredeti",
        correctedLabel: "Javított",
        error: {
          title: "Hoppá! Valami hiba történt.",
          description: "Hiba történt a mondat javítása során",
        },
      },
    },
    de: {
      titanicPredictor: {
        name: "Titanic",
        buttonTitle: "Prognose",
        description:
          "Würdest du den Titanic überleben? Dieses Modell wird es sagen.",
        error: {
          title: "Hoppla! Etwas ist schief gelaufen.",
          description: "Fehler beim Vorhersagen",
        },
        input: {
          class: {
            label: "Klassen",
            value1: "1. = Oberklasse",
            value2: "2. = Mittelklasse",
            value3: "3. = Unterklasse",
          },
          sex: {
            label: "Geschlecht",
            value0: "Männlich",
            value1: "Weiblich",
          },
          age: {
            label: "Alter",
          },
          family_size: {
            label: "Anzahl Familienmitglieder auf dem Titanic",
          },
        },
        formProbabilityLabel: "Deine Überlebenschance:",
      },
      rainPredictor: {
        name: "Regen",
        buttonTitle: "Prognose",
        description:
          "Dieses Modell prognostiziert die Wahrscheinlichkeit von Niederschlag basierend auf Temperatur, Luftfeuchtigkeit und Luftdruck.",
        error: {
          title: "Hoppla! Etwas ist schief gelaufen.",
          description: "Fehler beim Vorhersagen",
        },
        input: {
          temp: {
            label: "Temperatur",
          },
          humidity: {
            label: "Luftfeuchtigkeit",
          },
          pressure: {
            label: "Luftdruck",
          },
        },
        formProbabilityLabel: "Wahrscheinlichkeit von Niederschlag:",
      },
      toxicCommentAnalyser: {
        name: "Offensive Kommentar-Analysator",
        buttonTitle: "Analyse",
        description:
          "Dieses Modell ist auf {link} spezialisiert und kann offensive Kommentare erkennen.",
        inputLabel: "Kommentar-Text (DE)",
        modelVersionInputLabel: "Model-Version",
        examplesLabel: "Versuche es mit einem dieser:",
        error: {
          title: "Hoppla! Etwas ist schief gelaufen.",
          description: "Fehler beim Analysieren des Kommentars",
        },
        feedback: {
          correct: "Richtig",
          incorrect: "Falsch",
          saved: "Feedback gespeichert",
          error: {
            title: "Hoppla! Etwas ist schief gelaufen.",
            description: "Fehler beim Speichern des Feedbacks",
          },
        },
        formProbabilityLabel: "gemeinsamer offensiver Score",
      },
      gecGerman: {
        name: "German Grammar Error Correction",
        inputLabel: "Satz zur Korrektur (DE)",
        buttonTitle: "Satz korrigieren",
        originalLabel: "Original",
        correctedLabel: "Korrigiert",
        error: {
          title: "Hoppla! Etwas ist schief gelaufen.",
          description: "Fehler beim Korrigieren deines Satzes",
        },
      },
    },
  },
});

createApp(App).use(i18n).use(router).mount("#app");
