import { IRGBColor } from "../type";

// 定义颜色转换函数
export function convertToRGBA(color: string): IRGBColor {
  const whiteColor = [255, 255, 255, 1] as IRGBColor;
  // 如果是 RGB 或 RGBA 格式
  if (color.startsWith("rgba")) {
    const rgba = color.match(/\d+/g)?.map(Number) ?? whiteColor;
    return rgba as IRGBColor;
  } else if (color.startsWith("rgb")) {
    // 提取 RGB 值
    const rgb = color.match(/\d+/g)?.map(Number) ?? whiteColor;
    return [...rgb, 1] as IRGBColor;
  }
  // 如果是 16 进制格式
  else if (color.startsWith("#")) {
    // 将 16 进制转换为 RGB 值
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    return [r, g, b, 1];
  }
  // 其他情况默认返回白色

  return whiteColor;
}
