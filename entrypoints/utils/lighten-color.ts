import { IRGBColor } from "../type";

// 定义颜色变浅的函数
export function lightenColor(color: IRGBColor) {
  // 将颜色值转换为 RGB 值
  let [colorR, colorG, colorB, colorA] = color;
  const average = Math.round((colorR + colorG + colorB) / 3);

  // 以均值作为新的rgb值
  colorR = average;
  colorG = average;
  colorB = average;

  // 将变浅后的 RGB 值转换为 16 进制颜色码
  let newColorR = colorR.toString(16).padStart(2, "0");
  let newColorG = colorG.toString(16).padStart(2, "0");
  let newColorB = colorB.toString(16).padStart(2, "0");
  let newColorA = (colorA * 255).toString(16).padStart(2, "0");

  return "#" + newColorR + newColorG + newColorB + newColorA;
}
