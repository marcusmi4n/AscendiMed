// Utility helpers for working with colors across the app.
export function withOpacity(hexColor, opacity = 1) {
  const safeOpacity = Math.min(Math.max(opacity, 0), 1);
  if (!hexColor || typeof hexColor !== 'string') {
    return `rgba(0, 0, 0, ${safeOpacity})`;
  }

  let color = hexColor.replace('#', '');

  if (color.length === 3) {
    color = color
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (color.length === 4) {
    color = color
      .split('')
      .map((char) => char + char)
      .join('')
      .slice(2);
  }

  // Strip existing alpha channel if present before applying the new opacity.
  if (color.length === 8) {
    color = color.slice(2);
  }

  if (color.length !== 6) {
    return `rgba(0, 0, 0, ${safeOpacity})`;
  }

  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${safeOpacity})`;
}
