import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader
import "font-awesome/css/font-awesome.min.css"; // Ensure you are using css-loader

import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#FFF",
        secondary: colors.pink.accent1,
        accent: colors.pink.accent1,
        error: "#FF5252",
        info: "#424242",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  },
  icons: {
    iconfont: "md" //'mdi',
  }
});
