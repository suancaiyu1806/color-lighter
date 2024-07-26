export function receiveMessageByPopup(
  callback: (message: any, sender: any, sendResponse: any) => void
) {
  browser.runtime.onMessage.addListener(callback);
}
