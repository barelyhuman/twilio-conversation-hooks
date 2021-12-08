import { Message } from ".";
import { _reactTo } from "./client";
import { CLIENT_EVENT_TYPES } from "./enums";

export function onMessageAdded(cb: (messageResource: Message) => void) {
  return _reactTo(CLIENT_EVENT_TYPES.messageAdded, cb);
}
export function onMessageRemoved(cb: (messageResource: Message) => void) {
  return _reactTo(CLIENT_EVENT_TYPES.messageRemoved, cb);
}
export function onMessageUpdated(cb: (messageResource: Message) => void) {
  return _reactTo(CLIENT_EVENT_TYPES.messageUpdated, cb);
}
