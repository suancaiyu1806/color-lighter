export function receiveMessageByPopup(
  // FIXME: 类型问题
  callback: (message: any, sender: any, sendResponse: any) => void
) {
  browser.runtime.onMessage.addListener(callback);
}
