import { Participant } from ".";
import { _reactTo } from "./client";
import { CLIENT_EVENT_TYPES } from "./enums";

export function onParticipantJoined(cb: (participant: Participant) => void) {
  return _reactTo(CLIENT_EVENT_TYPES.participantJoined, cb);
}

export function onParticipantLeft(cb: (participant: Participant) => void) {
  return _reactTo(CLIENT_EVENT_TYPES.participantLeft, cb);
}

export function onParticipantUpdated(cb: (participant: Participant) => void) {
  return _reactTo(CLIENT_EVENT_TYPES.participantUpdated, cb);
}
