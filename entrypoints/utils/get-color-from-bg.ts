export function getBackgroundColor(bgStyle: string) {
  const hexRegex = /#(?:[A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g;
  const alphaRegex =
    /(?:rgba)\(\s*(?:\d+%?(?:,\s*)?){4}(?:\s*\/\s*\d(?:\.\d+)??)?\)/g;
  const colorRegex =
    /(?:rgb)\(\s*(?:\d+%?(?:,\s*)?){3}(?:\s*\/\s*\d(?:\.\d+)??)?\)/g;
  const colors =
    bgStyle.match(alphaRegex) ??
    bgStyle.match(colorRegex) ??
    bgStyle.match(hexRegex);
  return colors?.[0];
}
