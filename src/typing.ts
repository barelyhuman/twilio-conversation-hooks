import { Participant } from ".";
import { _reactTo } from "./client";
import { CLIENT_EVENT_TYPES } from "./enums";

export function onTypingEnded(cb: (participant: Participant) => void) {
  return _reactTo(CLIENT_EVENT_TYPES.typingEnded, cb);
}

export function onTypingStarted(cb: (participant: Participant) => void) {
  return _reactTo(CLIENT_EVENT_TYPES.typingStarted, cb);
}
