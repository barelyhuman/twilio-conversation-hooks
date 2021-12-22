import {
  Conversation,
  ConversationUpdateReason,
  Message,
  MessageUpdateReason,
  Paginator,
  Participant,
  ParticipantUpdateReason,
  SendEmailOptions,
  SendMediaOptions,
} from "@twilio/conversations";
import { client, _reactTo } from "./client";
import { CLIENT_EVENT_TYPES } from "./enums";
import { bail } from "./error";

export type {
  Conversation,
  SendMediaOptions,
  MessageUpdateReason,
  Message,
  Participant,
  ParticipantUpdateReason,
  ConversationUpdateReason,
};

/**
 * The param structure received by
 * onConversationAdded,onConversationJoined,onConversationLeft,onConversationRemoved
 * comes with hook functions connected to the conversation these are extracted from
 */
export interface ConversationHooks {
  conversation: Conversation;
  sendMessage: (
    message: string | FormData | SendMediaOptions | null,
    messageAttributes?: any,
    emailOptions?: SendEmailOptions | undefined
  ) => Promise<number>;
  onMessageAdded: (cb: (messageResource: Message) => void) => {
    conversation: Conversation;
    unsubscribe: () => Conversation;
  };
  onMessageRemoved: (cb: (messageResource: Message) => void) => {
    conversation: Conversation;
    unsubscribe: () => Conversation;
  };
  onMessageUpdated: (
    cb: (data: {
      message: Message;
      updateReasons: MessageUpdateReason[];
    }) => void
  ) => { conversation: Conversation; unsubscribe: () => Conversation };
  onParticipantJoined: (cb: (participant: Participant) => void) => {
    conversation: Conversation;
    unsubscribe: () => Conversation;
  };
  onParticipantLeft: (cb: (participant: Participant) => void) => {
    conversation: Conversation;
    unsubscribe: () => Conversation;
  };
  onParticipantUpdated: (
    cb: (data: {
      participant: Participant;
      updateReasons: ParticipantUpdateReason[];
    }) => void
  ) => { conversation: Conversation; unsubscribe: () => Conversation };
  onRemoved: (cb: (conversation: Conversation) => void) => {
    conversation: Conversation;
    unsubscribe: () => Conversation;
  };
  onTypingEnded: (cb: (participant: Participant) => void) => {
    conversation: Conversation;
    unsubscribe: () => Conversation;
  };
  onTypingStarted: (cb: (participant: Participant) => void) => {
    conversation: Conversation;
    unsubscribe: () => Conversation;
  };
  onUpdated: (
    cb: (data: {
      conversation: Conversation;
      updateReasons: ConversationUpdateReason[];
    }) => void
  ) => { conversation: Conversation; unsubscribe: () => Conversation };
}

function createHooks(conversation: Conversation) {
  const hooks: ConversationHooks = {
    conversation: conversation,
    sendMessage(...params) {
      return conversation.sendMessage(...params);
    },
    onMessageAdded(cb) {
      const _event = "messageAdded";
      conversation.addListener(_event, cb);
      const unsubscribe = () => conversation.removeListener(_event, cb);
      return { conversation, unsubscribe };
    },
    onMessageRemoved(cb) {
      const _event = "messageRemoved";
      conversation.addListener(_event, cb);
      const unsubscribe = () => conversation.removeListener(_event, cb);
      return { conversation, unsubscribe };
    },
    onMessageUpdated(cb) {
      const _event = "messageUpdated";
      conversation.addListener(_event, cb);
      const unsubscribe = () => conversation.removeListener(_event, cb);
      return { conversation, unsubscribe };
    },
    onParticipantJoined(cb) {
      const _event = "participantJoined";
      conversation.addListener(_event, cb);
      const unsubscribe = () => conversation.removeListener(_event, cb);
      return { conversation, unsubscribe };
    },
    onParticipantLeft(cb) {
      const _event = "participantLeft";
      conversation.addListener(_event, cb);
      const unsubscribe = () => conversation.removeListener(_event, cb);
      return { conversation, unsubscribe };
    },
    onParticipantUpdated(cb) {
      const _event = "participantUpdated";
      conversation.addListener("participantUpdated", cb);
      conversation.addListener(_event, cb);
      const unsubscribe = () => conversation.removeListener(_event, cb);
      return { conversation, unsubscribe };
    },
    onRemoved(cb) {
      const _event = "removed";
      conversation.addListener(_event, cb);
      const unsubscribe = () => conversation.removeListener(_event, cb);
      return { conversation, unsubscribe };
    },
    onTypingEnded(cb) {
      const _event = "typingEnded";
      conversation.addListener(_event, cb);
      const unsubscribe = () => conversation.removeListener(_event, cb);
      return { conversation, unsubscribe };
    },
    onTypingStarted(cb) {
      const _event = "typingStarted";
      conversation.addListener(_event, cb);
      const unsubscribe = () => conversation.removeListener(_event, cb);
      return { conversation, unsubscribe };
    },
    onUpdated(cb) {
      const _event = "updated";
      conversation.addListener(_event, cb);
      const unsubscribe = () => conversation.removeListener(_event, cb);
      return { conversation, unsubscribe };
    },
  };
  return hooks;
}

/**
 * Triggered when the current participant is added to a conversation,
 * you can read the twilio docs to know when and how this is fired
 */
export function onConversationAdded(
  cb: (conversation: ConversationHooks) => void
) {
  return _reactTo(
    CLIENT_EVENT_TYPES.conversationAdded,
    (conversation: Conversation) => {
      const hookedVersion = createHooks(conversation);
      cb(hookedVersion);
    }
  );
}

/**
 * Triggered when the current participant has joined a conversation,
 * you can read the twilio docs to know when and how this is fired
 */
export function onConversationJoined(
  cb: (conversation: ConversationHooks) => void
) {
  return _reactTo(
    CLIENT_EVENT_TYPES.conversationJoined,
    (conversation: Conversation) => {
      const hookedVersion = createHooks(conversation);
      cb(hookedVersion);
    }
  );
}

/**
 * Triggered when the current participant leaves a conversation,
 * you can read the twilio docs to know when and how this is fired
 */
export function onConversationLeft(
  cb: (conversation: ConversationHooks) => void
) {
  return _reactTo(
    CLIENT_EVENT_TYPES.conversationLeft,
    (conversation: Conversation) => {
      const hookedVersion = createHooks(conversation);
      cb(hookedVersion);
    }
  );
}

/**
 * Triggered when the current participant is removed from a conversation,
 * you can read the twilio docs to know when and how this is fired
 */
export function onConversationRemoved(
  cb: (conversation: ConversationHooks) => void
) {
  return _reactTo(
    CLIENT_EVENT_TYPES.conversationRemoved,
    (conversation: Conversation) => {
      const hookedVersion = createHooks(conversation);
      cb(hookedVersion);
    }
  );
}

/**
 * **Experimental!**
 *
 * **Note:** please know that the API might change
 *
 * get conversation items from twilio, you can use the conversation `sid` to get a single conversation or
 * send and object of arguments or null for getting all subscribed conversations
 */
export async function findConversations(
  args?: object | string
): Promise<ConversationHooks | PaginatorConversationHooks> {
  if (!client) {
    bail(
      "Please make sure to initialize the client before using this function"
    );
  }

  if (typeof args === "string") {
    const conversation = await client.getConversationBySid(args);
    return createHooks(conversation);
  }

  const conversations = toConversationHooksPaginator(
    await client.getSubscribedConversations(args)
  );

  return conversations;
}

export type PaginatorConversationHooks = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  items: ConversationHooks[];
  nextPage: () => Promise<PaginatorConversationHooks>;
  prevPage: () => Promise<PaginatorConversationHooks>;
};

function toConversationHooksPaginator(
  data: Paginator<Conversation>
): PaginatorConversationHooks {
  return {
    ...data,
    items: data.items.map(createHooks),
    nextPage: () => data.nextPage().then(toConversationHooksPaginator),
    prevPage: () => data.prevPage().then(toConversationHooksPaginator),
  };
}
