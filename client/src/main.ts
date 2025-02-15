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
      cardAnalyser: {
        name: "Card Analyser",
        buttonTitle: "Analyse",
        description:
          "This AI Card Analyzer model specialises in the recognition of French-suited cards.",
        error: {
          title: "Uh oh! Something went wrong.",
          description: "Error while analysing card",
        },
        cardNames: {
          "ace of clubs": "ace of clubs",
          "ace of diamonds": "ace of diamonds",
          "ace of hearts": "ace of hearts",
          "ace of spades": "ace of spades",
          "eight of clubs": "eight of clubs",
          "eight of diamonds": "eight of diamonds",
          "eight of hearts": "eight of hearts",
          "eight of spades": "eight of spades",
          "five of clubs": "five of clubs",
          "five of diamonds": "five of diamonds",
          "five of hearts": "five of hearts",
          "five of spades": "five of spades",
          "four of clubs": "four of clubs",
          "four of diamonds": "four of diamonds",
          "four of hearts": "four of hearts",
          "four of spades": "four of spades",
          "jack of clubs": "jack of clubs",
          "jack of diamonds": "jack of diamonds",
          "jack of hearts": "jack of hearts",
          "jack of spades": "jack of spades",
          joker: "joker",
          "king of clubs": "king of clubs",
          "king of diamonds": "king of diamonds",
          "king of hearts": "king of hearts",
          "king of spades": "king of spades",
          "nine of clubs": "nine of clubs",
          "nine of diamonds": "nine of diamonds",
          "nine of hearts": "nine of hearts",
          "nine of spades": "nine of spades",
          "queen of clubs": "queen of clubs",
          "queen of diamonds": "queen of diamonds",
          "queen of hearts": "queen of hearts",
          "queen of spades": "queen of spades",
          "seven of clubs": "seven of clubs",
          "seven of diamonds": "seven of diamonds",
          "seven of hearts": "seven of hearts",
          "seven of spades": "seven of spades",
          "six of clubs": "six of clubs",
          "six of diamonds": "six of diamonds",
          "six of hearts": "six of hearts",
          "six of spades": "six of spades",
          "ten of clubs": "ten of clubs",
          "ten of diamonds": "ten of diamonds",
          "ten of hearts": "ten of hearts",
          "ten of spades": "ten of spades",
          "three of clubs": "three of clubs",
          "three of diamonds": "three of diamonds",
          "three of hearts": "three of hearts",
          "three of spades": "three of spades",
          "two of clubs": "two of clubs",
          "two of diamonds": "two of diamonds",
          "two of hearts": "two of hearts",
          "two of spades": "two of spades",
        },
      },
      tweetAnalyser: {
        name: "Disaster Tweet",
        buttonTitle: "Analyse",
        description:
          "This model is based on {link} and can detect disaster tweets.",
        inputLabel: "Tweet Text",
        examplesLabel: "Try one of these:",
        error: {
          title: "Uh oh! Something went wrong.",
          description: "Error while analysing tweet",
        },
        formProbabilityLabel: "chance of being a disaster tweet",
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
        formProbabilityLabel: "chance of being offensive",
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
      cardAnalyser: {
        name: "Kártyás Pityu",
        buttonTitle: "Elemzés",
        description:
          "Ez a modell a francia kártyák felismerésére specializálódott.",
        error: {
          title: "Uh oh! Valami rosszul sült el.",
          description: "Hiba a kártya elemzésekor",
        },
        cardNames: {
          "ace of clubs": "treff ász",
          "ace of diamonds": "káró ász",
          "ace of hearts": "kőr ász",
          "ace of spades": "pikk ász",
          "eight of clubs": "treff nyolcas",
          "eight of diamonds": "káró nyolcas",
          "eight of hearts": "kőr nyolcas",
          "eight of spades": "pikk nyolcas",
          "five of clubs": "treff ötös",
          "five of diamonds": "káró ötös",
          "five of hearts": "kőr ötös",
          "five of spades": "pikk ötös",
          "four of clubs": "treff négyes",
          "four of diamonds": "káró négyes",
          "four of hearts": "kőr négyes",
          "four of spades": "pikk négyes",
          "jack of clubs": "treff bubi",
          "jack of diamonds": "káró bubi",
          "jack of hearts": "kőr bubi",
          "jack of spades": "pikk bubi",
          joker: "joker",
          "king of clubs": "treff király",
          "king of diamonds": "káró király",
          "king of hearts": "kőr király",
          "king of spades": "pikk király",
          "nine of clubs": "treff kilences",
          "nine of diamonds": "káró kilences",
          "nine of hearts": "kőr kilences",
          "nine of spades": "pikk kilences",
          "queen of clubs": "treff dáma",
          "queen of diamonds": "káró dáma",
          "queen of hearts": "kőr dáma",
          "queen of spades": "pikk dáma",
          "seven of clubs": "treff hetes",
          "seven of diamonds": "káró hetes",
          "seven of hearts": "kőr hetes",
          "seven of spades": "pikk hetes",
          "six of clubs": "treff hatos",
          "six of diamonds": "káró hatos",
          "six of hearts": "kőr hatos",
          "six of spades": "pikk hatos",
          "ten of clubs": "treff tízes",
          "ten of diamonds": "káró tízes",
          "ten of hearts": "kőr tízes",
          "ten of spades": "pikk tízes",
          "three of clubs": "treff hármas",
          "three of diamonds": "káró hármas",
          "three of hearts": "kőr hármas",
          "three of spades": "pikk hármas",
          "two of clubs": "treff kettes",
          "two of diamonds": "káró kettes",
          "two of hearts": "kőr kettes",
          "two of spades": "pikk kettes",
        },
      },
      tweetAnalyser: {
        name: "Katasztrófa Tweet",
        buttonTitle: "Elemzés",
        description:
          "Ez a {link} alapú modell képes felismerni a katasztrófákról szóló tweeteket.",
        error: {
          title: "Hoppá! Valami hiba történt.",
          description: "Hiba történt az elemzés során",
        },
        inputLabel: "Tweet szöveg (EN)",
        examplesLabel: "Próbáld ki az egyiket ezek közül:",
        formProbabilityLabel: "esély, hogy katasztrófáról szól",
      },
      toxicCommentAnalyser: {
        name: "Offenzív Megjegyzés Analizátor - Német",
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
        formProbabilityLabel: "esély, hogy offenzív",
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
      cardAnalyser: {
        name: "Kartenanalyser",
        buttonTitle: "Analyse",
        description:
          "Dieses Modell ist spezialisiert auf die Erkennung von französischen Karten.",
        error: {
          title: "Hoppla! Etwas ist schief gelaufen.",
          description: "Fehler beim Analysieren der Karte",
        },
        cardNames: {
          "ace of clubs": "Ass Kreuz",
          "ace of diamonds": "Ass Karo",
          "ace of hearts": "Ass Herz",
          "ace of spades": "Ass Pik",
          "eight of clubs": "Acht Kreuz",
          "eight of diamonds": "Acht Karo",
          "eight of hearts": "Acht Herz",
          "eight of spades": "Acht Pik",
          "five of clubs": "Fünf Kreuz",
          "five of diamonds": "Fünf Karo",
          "five of hearts": "Fünf Herz",
          "five of spades": "Fünf Pik",
          "four of clubs": "Vier Kreuz",
          "four of diamonds": "Vier Karo",
          "four of hearts": "Vier Herz",
          "four of spades": "Vier Pik",
          "jack of clubs": "Bube Kreuz",
          "jack of diamonds": "Bube Karo",
          "jack of hearts": "Bube Herz",
          "jack of spades": "Bube Pik",
          joker: "Joker",
          "king of clubs": "König Kreuz",
          "king of diamonds": "König Karo",
          "king of hearts": "König Herz",
          "king of spades": "König Pik",
          "nine of clubs": "Neun Kreuz",
          "nine of diamonds": "Neun Karo",
          "nine of hearts": "Neun Herz",
          "nine of spades": "Neun Pik",
          "queen of clubs": "Dame Kreuz",
          "queen of diamonds": "Dame Karo",
          "queen of hearts": "Dame Herz",
          "queen of spades": "Dame Pik",
          "seven of clubs": "Sieben Kreuz",
          "seven of diamonds": "Sieben Karo",
          "seven of hearts": "Sieben Herz",
          "seven of spades": "Sieben Pik",
          "six of clubs": "Sechs Kreuz",
          "six of diamonds": "Sechs Karo",
          "six of hearts": "Sechs Herz",
          "six of spades": "Sechs Pik",
          "ten of clubs": "Zehn Kreuz",
          "ten of diamonds": "Zehn Karo",
          "ten of hearts": "Zehn Herz",
          "ten of spades": "Zehn Pik",
          "three of clubs": "Drei Kreuz",
          "three of diamonds": "Drei Karo",
          "three of hearts": "Drei Herz",
          "three of spades": "Drei Pik",
          "two of clubs": "Zwei Kreuz",
          "two of diamonds": "Zwei Karo",
          "two of hearts": "Zwei Herz",
          "two of spades": "Zwei Pik",
        },
      },
      tweetAnalyser: {
        name: "Disaster Tweet",
        buttonTitle: "Analyse",
        description:
          "Dieses Modell ist auf {link} spezialisiert und kann Disaster-Tweets erkennen.",
        error: {
          title: "Hoppla! Etwas ist schief gelaufen.",
          description: "Fehler beim Analysieren des Tweets",
        },
        inputLabel: "Tweet-Text (EN)",
        examplesLabel: "Versuche es mit einem dieser:",
        formProbabilityLabel: "Chance, dass es um eine Katastrophe geht",
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
        formProbabilityLabel: "Chance, dass es offensiv ist",
      },
    },
  },
});

createApp(App).use(i18n).use(router).mount("#app");
