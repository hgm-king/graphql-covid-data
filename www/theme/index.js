import c from "./colors/";
import palettes from "./palettes/";

const colors = {
  black: c["DARK PURPLE"],
  white: c["IVORY"],
  success: c["FERN GREEN"],
  danger: c["ENGLISH VERMILLION"],
  info: c["BLUE JEANS"],
  warning: c["HONEY YELLOW"],
};

const theme = {
  colors,
  palettes,
  charts: {
    background: c["PAPER"],
    radius: 14,
    selectedOpacity: 20,
  },
};

export default theme;
