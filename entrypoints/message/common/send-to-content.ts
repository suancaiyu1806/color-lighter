import { IMessage } from "../../type";

export function sendMessageToCurContentScript(message: IMessage) {
  return new Promise((resolve, _reject) => {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      tabs.forEach((tab) => {
        browser.tabs.sendMessage(tab.id!, message).then((response) => {
          resolve(response);
        });
      });
    });
  });
}
