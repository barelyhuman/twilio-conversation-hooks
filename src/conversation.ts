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
  onMessageAdded: (cb: (messageResource: Message) => void) => Conversation;
  onMessageRemoved: (cb: (messageResource: Message) => void) => Conversation;
  onMessageUpdated: (
    cb: (data: {
      message: Message;
      updateReasons: MessageUpdateReason[];
    }) => void
  ) => Conversation;
  onParticipantJoined: (cb: (participant: Participant) => void) => Conversation;
  onParticipantLeft: (cb: (participant: Participant) => void) => Conversation;
  onParticipantUpdated: (
    cb: (data: {
      participant: Participant;
      updateReasons: ParticipantUpdateReason[];
    }) => void
  ) => Conversation;
  onRemoved: (cb: (conversation: Conversation) => void) => Conversation;
  onTypingEnded: (cb: (participant: Participant) => void) => Conversation;
  onTypingStarted: (cb: (participant: Participant) => void) => Conversation;
  onUpdated: (
    cb: (data: {
      conversation: Conversation;
      updateReasons: ConversationUpdateReason[];
    }) => void
  ) => Conversation;
}

function createHooks(conversation: Conversation) {
  const hooks: ConversationHooks = {
    conversation: conversation,
    sendMessage(...params) {
      return conversation.sendMessage(...params);
    },
    onMessageAdded(cb) {
      conversation.on("messageAdded", cb);
      return conversation;
    },
    onMessageRemoved(cb) {
      conversation.on("messageRemoved", cb);
      return conversation;
    },
    onMessageUpdated(cb) {
      conversation.on("messageUpdated", cb);
      return conversation;
    },
    onParticipantJoined(cb) {
      conversation.on("participantJoined", cb);
      return conversation;
    },
    onParticipantLeft(cb) {
      conversation.on("participantLeft", cb);
      return conversation;
    },
    onParticipantUpdated(cb) {
      conversation.on("participantUpdated", cb);
      return conversation;
    },
    onRemoved(cb) {
      conversation.on("removed", cb);
      return conversation;
    },
    onTypingEnded(cb) {
      conversation.on("typingEnded", cb);
      return conversation;
    },
    onTypingStarted(cb) {
      conversation.on("typingStarted", cb);
      return conversation;
    },
    onUpdated(cb) {
      conversation.on("updated", cb);
      return conversation;
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
export async function findConversations(args: object | null | string): Promise<
  | ConversationHooks
  | (Paginator<Conversation> & {
      items: ConversationHooks[];
    })
> {
  if (!client) {
    bail(
      "Please make sure to initialize the client before using this function"
    );
  }

  if (typeof args === "string") {
    const conversation = await client.getConversationBySid(args);
    return createHooks(conversation);
  }

  const conversations = await paginatorModifier(() =>
    client.getSubscribedConversations(args)
  );

  return conversations;
}

async function paginatorModifier(fetcher: () => Promise<any>): Promise<
  Paginator<Conversation> & {
    items: ConversationHooks[];
  }
> {
  const data = await fetcher();
  return Object.assign(data, {
    prevPage: () => paginatorModifier(data.prevPage),
    nextPage: () => paginatorModifier(data.nextPage),
    items: data.items.map(createHooks),
  });
}
