import { convertToRGBA } from "./convert-to-rgba";
import { getColorsFromAttribute } from "./get-color-from-bg";
import { lightenColor } from "./lighten-color";

export function replaceColor(elements: NodeListOf<HTMLElement>) {
  // 遍历所有元素并修改颜色和背景色
  elements.forEach((element) => {
    // 获取元素的原始颜色和背景色
    const originalColor = window.getComputedStyle(element).color;
    const originalBgColor = window.getComputedStyle(element).backgroundColor;
    const originalBorderColor = window.getComputedStyle(element).borderColor;

    originalColor &&
      (element.style.color = lightenColor(convertToRGBA(originalColor)));
    originalBgColor &&
      (element.style.backgroundColor = lightenColor(
        convertToRGBA(originalBgColor)
      ));
    originalBorderColor &&
      (element.style.borderColor = lightenColor(
        convertToRGBA(originalBorderColor)
      ));

    const originalBackground = window.getComputedStyle(element).background;
    const originalBoxShadow = window.getComputedStyle(element).boxShadow;
    // background中的颜色单独处理
    if (originalBackground) {
      const bgColors = getColorsFromAttribute(originalBackground);
      bgColors?.forEach((bgColorStr: string) => {
        element.style.background = window
          .getComputedStyle(element)
          .background.replace(
            bgColorStr,
            lightenColor(convertToRGBA(bgColorStr))
          );
      });
    }
    if (originalBoxShadow) {
      const boxShadowColors = getColorsFromAttribute(originalBoxShadow);
      boxShadowColors?.forEach((boxShadowColorStr: string) => {
        element.style.boxShadow = window
          .getComputedStyle(element)
          .boxShadow.replace(
            boxShadowColorStr,
            lightenColor(convertToRGBA(boxShadowColorStr))
          );
      });
    }
  });
}
