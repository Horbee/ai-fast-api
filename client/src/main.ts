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
          "This model is based on BERT and can detect disaster tweets.",
        error: {
          title: "Uh oh! Something went wrong.",
          description: "Error while analysing tweet",
        },
        formProbabilityLabel: "chance of being a disaster tweet",
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
          "Ez a BERT alapú modell képes felismerni a katasztrófákról szóló tweeteket.",
        error: {
          title: "Hoppá! Valami hiba történt.",
          description: "Hiba történt az elemzés során",
        },
        formProbabilityLabel: "esély, hogy katasztrófáról szól",
      },
    },
  },
});

createApp(App).use(i18n).use(router).mount("#app");
