import { Client, ClientOptions } from "@twilio/conversations";
import { CLIENT_EVENT_TYPES } from "./enums";

export let client: Client;

// internal to the sdk
export const _reactTo = <T extends typeof CLIENT_EVENT_TYPES>(
  event: T[keyof T],
  cb: (...params: any) => void
) => {
  if (!client) {
    throw new Error("client not connected...");
  }
  client.addListener(event as any, cb);
  const unsubscribe = () => client.removeListener(event as any, cb);
  return { client, unsubscribe };
};

/**
 * Create a usable twilio client, requires the same parameters as a
 * normal twilio client constructor
 *
 * returns a partially initialized Twilio Client
 *
 * use onInit to find out when the client is ready
 * */
export function createClient(
  token: string,
  options?: ClientOptions,
  forceNew: Boolean = false
) {
  if (client && !forceNew) {
    return client;
  }
  client = new Client(token, options);
  return client;
}

/**
 * Hook function that will trigger your callback function once the client has initialized completely
 * to be used when you need to start the application, trigger a token check here or using the `onTokenAboutToExpire` hook
 *
 * The ReactionCallback here receives nothing as params
 */
export function onInit(cb: () => void) {
  function reactionHandler(state: any) {
    if (state === "initialized") {
      cb && cb();
    }
  }

  return _reactTo(CLIENT_EVENT_TYPES.stateChanged, reactionHandler);
}

export function getClient() {
  return client;
}
