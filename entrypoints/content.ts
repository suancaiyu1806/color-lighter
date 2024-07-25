import { convertToRGBA } from "./utils/convert-to-rgba";
import { getBackgroundColor } from "./utils/get-color-from-bg";
import { removeColor } from "./utils/remove-color";

export default defineContentScript({
  matches: ["https://*/*"],
  main() {
    setTimeout(() => {
      // TODO: Vector 页面DOM结构变化监听
      // 获取所有 DOM 元素
      const elements = document.querySelectorAll("*");

      // 遍历所有元素并修改颜色和背景色
      elements.forEach((element) => {
        // 获取元素的原始颜色和背景色
        const originalColor = window.getComputedStyle(element).color;
        const originalBgColor =
          window.getComputedStyle(element).backgroundColor;
        const originalBorderColor =
          window.getComputedStyle(element).borderColor;
        const originalBackground = window.getComputedStyle(element).background;

        originalColor &&
          ((element as HTMLElement).style.color = removeColor(
            convertToRGBA(originalColor)
          ));
        originalBgColor &&
          ((element as HTMLElement).style.backgroundColor = removeColor(
            convertToRGBA(originalBgColor)
          ));
        originalBorderColor &&
          ((element as HTMLElement).style.borderColor = removeColor(
            convertToRGBA(originalBorderColor)
          ));

        if (originalBackground) {
          const bgColorStr = getBackgroundColor(originalBackground);

          bgColorStr &&
            ((element as HTMLElement).style.background =
              originalBackground.replace(
                bgColorStr,
                removeColor(convertToRGBA(bgColorStr))
              ));
          // bgColorStr &&
          //   console.log(
          //     "bgColorStr",
          //     bgColorStr,
          //     removeColor(convertToRGBA(bgColorStr))
          //   );
        }
      });
    }, 5000);

    console.log("Hello content script!");
  },
});
