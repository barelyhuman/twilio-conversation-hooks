import { User } from "@twilio/conversations";
import { _reactTo } from "./client";
import { CLIENT_EVENT_TYPES } from "./enums";
export type { User };

export function onUserSubscribed(cb: (user: User) => void) {
  return _reactTo(CLIENT_EVENT_TYPES.userSubscribed, cb);
}

export function onUserUnsubscribed(cb: (user: User) => void) {
  return _reactTo(CLIENT_EVENT_TYPES.userUnsubscribed, cb);
}

export function onUserUpdated(cb: (user: User) => void) {
  return _reactTo(CLIENT_EVENT_TYPES.userUpdated, cb);
}
