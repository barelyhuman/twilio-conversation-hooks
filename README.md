# @barelyhuman/twilio-conversations

Context based helpers for Twilio Conversations

## About

This is a collection of context callbacks that are built to
make it easier to handle the general events raised by twilio conversations's client SDK.

The library doesn't abstract 100% of the Twilio API but only plans to simplify the events that are most used and adds a few other helpers to make retrieval of data and conversations simpler.

While twilio provides a good event based stream to handle the conversation, remembering each event name and methods might get hard even when their lib is well typed. It's easier to remember function names that autocomplete themselves (totally based on my preferences)

## Install

Currently in a private registry, mail to ahoy@barelyhuman.dev if you'd like to make this public

## Usage

So, to use the library, let's compare a similar situation.

1. App Waits for init to show the list of chats
2. Select a conversation
3. Listen/Send messages to the conversation

```js
--- --- --- --- --- --- --- --- ---
// The imports being used
import {
  createClient,
  onInit,
  onConversationJoined,
  findConversations,
} from "@barelyhuman/twilio-conversations";

--- --- --- --- --- --- --- --- ---
// app.js
// you get back the original client from twilio, if you wish to use it
const client = createClient(token, {
  // ... any other options you'd pass to Twilio
});
--- --- --- --- --- --- --- --- ---
// chat-list.js
// in you component / page that lists all the conversations

const converstations = findConversations();

onInit(() => {
  console.log("twilio client initialized");
  setLoading(false);
});

const onNext = () => {
  let nextSet = [];
  if (conversations.hasNextPage) {
    nextSet = conversations.nextPage();
  }
  //   setState or assign whatever your framework supports
};

const onSelectConversation = (pressedOn) => {
  // Navigate to a single chat view / screen / page
  route.push(`/chat/${pressedOn.sid}`);
};

// listener logics
conversation.items.forEach(async (conversationResource) => {
  const { conversation, onMessageAdded: onMessageAddedToConv } =
    conversationResource;
  // get last message to show on the list.
  const message = await conversation.getMessage(1);
  // add it in your render state accordingly

  // add listeners for getting new messages
  onMessageAddedToConv((message) => {
    // update the last received message and update unread count as needed
    // or reget unread count from twilio's own helper functions
  });
});

--- --- --- --- --- --- --- --- ---
// chat.js

// find the conversation by sid
const conversationResource = findConversations(sid);
const { conversation, onMessageAdded } = conversationResource;

// listen to message addition
onMessageAdded((message) => {
  // message has the same props as twilio and has no modifications
});
```
