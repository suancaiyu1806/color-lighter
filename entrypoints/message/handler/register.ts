import { receiveMessageByContent } from "../common/receive-by-content";
import { greyModeHandler } from "./grey-mode-handler";

export function initHandlers() {
  receiveMessageByContent(greyModeHandler);
}
