export function getColorsFromAttribute(bgStyle: string) {
  const hexColor =
    bgStyle.match(/#(?:[A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g) ?? [];
  const rgbaColor =
    bgStyle.match(
      /(?:rgba)\(\s*(?:\d+%?(?:,\s*)?){4}(?:\s*\/\s*\d(?:\.\d+)??)?\)/g
    ) ?? [];
  const rgbColor =
    bgStyle.match(
      /(?:rgb)\(\s*(?:\d+%?(?:,\s*)?){3}(?:\s*\/\s*\d(?:\.\d+)??)?\)/g
    ) ?? [];

  const colors = [...hexColor, ...rgbaColor, ...rgbColor];
  return colors;
}
