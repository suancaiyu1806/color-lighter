import { IMessage } from "../../type";

export function sendMessageToPopup(message: IMessage, extensionId?: string) {
  return new Promise((resolve, _reject) => {
    browser.runtime.sendMessage(extensionId, message).then((response) => {
      resolve(response);
    });
  });
}
