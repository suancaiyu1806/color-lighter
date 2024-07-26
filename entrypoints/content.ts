import { initHandlers } from "./message/handler/register";

export default defineContentScript({
  matches: ["https://*/*"],
  main() {
    initHandlers();
    console.log("Hello content script!");
  },
});
