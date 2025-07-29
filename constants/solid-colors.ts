export const solidColors = {
  white: '#ffffff',
  black: '#000000',
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff',
  yellow: '#ffff00',
  purple: '#800080',
  orange: '#ffa500',
  pink: '#ffc0cb',
  gray: '#808080',
  light_gray: '#d3d3d3',
  dark_gray: '#404040',
  navy: '#000080',
  teal: '#008080',
  maroon: '#800000',
  olive: '#808000',
  lime: '#00ff00',
  aqua: '#00ffff',
  silver: '#c0c0c0',
  fuchsia: '#ff00ff',
} as const;

export type SolidColorKey = keyof typeof solidColors;
