import { MODE } from "../../constant/global";
import { replaceColor } from "../../utils/replace-color";

export function greyModeHandler(message: any, sender: any, sendResponse: any) {
  console.log("greyModeHandler", message);
  const isGrey = message.action === MODE.GREY;
  if (isGrey) {
    // TODO: Vector 页面DOM结构变化监听
    // 获取所有 DOM 元素
    const elements = document.querySelectorAll("*");
    replaceColor(elements as NodeListOf<HTMLElement>);
    sendResponse("success");
    return;
  }
}
