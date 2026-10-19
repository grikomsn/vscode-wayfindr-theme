export const variants = [
  { key: 'dark', label: 'Wayfindr Dark', type: 'dark', uiTheme: 'vs-dark' },
  { key: 'light', label: 'Wayfindr Light', type: 'light', uiTheme: 'vs' },
  { key: 'gray-dark', label: 'Wayfindr Gray Dark', type: 'dark', uiTheme: 'vs-dark', family: 'gray', level: 'standard' },
  { key: 'gray-light', label: 'Wayfindr Gray Light', type: 'light', uiTheme: 'vs', family: 'gray', level: 'standard' },
  { key: 'gray-dark-soft', label: 'Wayfindr Gray Dark Soft', type: 'dark', uiTheme: 'vs-dark', family: 'gray', level: 'soft' },
  { key: 'gray-light-soft', label: 'Wayfindr Gray Light Soft', type: 'light', uiTheme: 'vs', family: 'gray', level: 'soft' },
  { key: 'gray-dark-contrast', label: 'Wayfindr Gray Dark Contrast', type: 'dark', uiTheme: 'vs-dark', family: 'gray', level: 'contrast' },
  { key: 'gray-light-contrast', label: 'Wayfindr Gray Light Contrast', type: 'light', uiTheme: 'vs', family: 'gray', level: 'contrast' },
  { key: 'night', label: 'Wayfindr Night', type: 'dark', uiTheme: 'vs-dark' },
  { key: 'day', label: 'Wayfindr Day', type: 'light', uiTheme: 'vs' },
];

export const resolvePalette = (palette, key) => {
  const { extends: base, ...colors } = palette[key];
  return base ? { ...resolvePalette(palette, base), ...colors } : colors;
};
