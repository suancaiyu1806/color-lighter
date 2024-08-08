import { convertToRGBA } from "./convert-to-rgba";
import { getColorsFromAttribute } from "./get-color-from-bg";
import { lightenColor } from "./lighten-color";

function replaceCommonColor(elements: NodeListOf<HTMLElement>) {
  // 遍历所有元素，识别并修改属性中的颜色字段
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

function replaceImgColor(elements: NodeListOf<HTMLElement>) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  // 遍历所有图片元素，识别并修改属性中的颜色字段
  elements.forEach((element) => {
    if (element.nodeName === "IMG") {
      const img = element as HTMLImageElement;
      if (img.src) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        if (imageData) {
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const averageData = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = averageData;
            data[i + 1] = averageData;
            data[i + 2] = averageData;
          }
          ctx?.putImageData(imageData, 0, 0);

          // 将修改后的图像替换 img 元素
          img.src = canvas.toDataURL();
          img.srcset = ""; // TODO: 后续可以优化下 srcset 的情况
        }
      }
    }
    // FIXME: SVG 可能会有坑
    if (element.nodeName === "svg") {
      //TODO: 处理svg，替换为png
    }
  });
}

export function replaceColor(elements: NodeListOf<HTMLElement>) {
  replaceCommonColor(elements);
  replaceImgColor(elements);
}
