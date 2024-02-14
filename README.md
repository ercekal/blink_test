# Blink tech test

This is a simple react app which consumes a json file (the data for which lives in `/data/data.js`). It has only one page which lets you:

- View the sorted conversations (most recent at top)
- Select a conversation and see its messages in order (most recent at the bottom)
- Reply to messages in a conversation by typing in the text box and clicking send or pressing Enter
- Edit messages by clicking on them, updating the text that appears in the text box and clicking send or pressing Enter. Edited sessages has `Edited` tag

Other functionality:

- If a conversation has more messages than its height, the viewbox is automatically scrolled so that the last message is visible
- This also happens when a new message is added to a conversation
  
## Technical considerations

- `<ul>`, `<li>` and `Form` elements were used for accessibility
- Context API is used for state management
- Added `edited` property to `Message` in order to show an edited tag on the message, although this could be improved (see below)
  
## Improvements

- Instead of adding a boolean `edited` property to `Message`, I could have added a new datetime string property `created_at`. I could have used this as follows
  - When a `Message` is first created, the `created_at` and `last_updated` are set to the same datetime
  - If a `Message` is edited, the `last_updated` datetime is updated to current datetime
  - The `created_at` is used to order the messages so that edits don't cause the message to jump to the bottom of the list
  - The concept of `edited` can be understood if there's a difference between `created_at` and `last_updated`
- Due to time constraints, the test cases are limited. Currently it only tests is the context is using the right data. More tests could be added for the functions
- `handleEditMessage` and `handleSendMessage` functions could be refactored in one function
  
## Getting started

First you'll need to install your dependencies using yarn.

```sh
yarn
```

## Start the app

```sh
yarn start
```

## Running tests

```sh
yarn test
```
