import { _reactTo } from "./client";
import { CLIENT_EVENT_TYPES } from "./enums";

export function onTokenAboutToExpire(cb: (ttl: number) => void) {
  return _reactTo(CLIENT_EVENT_TYPES.tokenAboutToExpire, cb);
}
export function onTokenExpired(cb: () => void) {
  return _reactTo(CLIENT_EVENT_TYPES.tokenExpired, cb);
}
