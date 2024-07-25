import { replaceColor } from "./utils/replace-color";

export default defineContentScript({
  matches: ["https://*/*"],
  main() {
    setTimeout(() => {
      // TODO: Vector 页面DOM结构变化监听
      // 获取所有 DOM 元素
      const elements = document.querySelectorAll("*");
      replaceColor(elements as NodeListOf<HTMLElement>);
    }, 5000);

    console.log("Hello content script!");
  },
});
