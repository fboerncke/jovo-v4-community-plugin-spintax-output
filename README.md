# PLease note: This plugin and project is work in progress ...

# Spintax Output Plugin

[![NPM](https://nodei.co/npm/jovo-community-plugin-spintax-output.png)](https://nodei.co/npm/jovo-community-plugin-spintax-output/)

## Overview

Spintax is a compact notation to write down a variety of strings. This plugin for the [Jovo Framework](https://github.com/jovotech/jovo-framework) allows you to use "Spintax" expressions like `"[Welcome|Hello|Hi!]"` in your output.

The plugin searches Spintax expressions within your `"message"` and `"reprompt"` entries and will replace those with one random utterance from all the possible permutations (there may be a lot!).

If there is no Spintax the string remains unchanged except for that all multiple whitespaces are cleaned up.

The resulting string is the utterance the user will receive from the system.

## What does spintax look like?

The appearance may remind some of you of regular expressions. But spintax is not about matching strings and having less options the interpretation is simple as you will see in a second.

Below are some examples and some possible outcomes:

- Let's start simple:

  `"[Hello|Hi]" ==> "Hello" or "Hi"`

- You are not limited to two variants, there may be multiple spintax expressions in one string:

  `"[Hello|Hi|Cheerio|How do you do?|Welcome|Nice to have you here]" ==> "Hi" or "Welcome" or ...`

- You can have multiple spintax expressions within a string description:

  `"[Hello|Hi] [my friend|again]" ==> "Hello again" or "Hi my friend" or ...`

- One option can be left empty to make parts of the text optional:

  `"[ | Good Bye]" ==> "" or "Good Bye"`

- Nested spintax expressions are supported. This makes spintax a powerful tool:

  `"[Hello|Hi] [|my [|best] friend ]" ==> "Hello", "Hi my friend", "Hello my best friend", ...`

## Why should I use Spintax?

Consider this:

- For sure you want users to launch your voice app very often.

- For sure users will complain **your voice app is boring** if they have to listen to the same utterances over and over again

Spintax can help you to bring variety into your utterances.

## Install

Install the plugin into your Jovo project:

`npm install jovo-community-plugin-spintax-output --save`

Register the plugin in:

app.js:

```javascript
const { SpintaxOutputPlugin } = require("jovo-community-plugin-spintax-output");

app.use(
  // ... base imports
  new SpintaxOutputPlugin()
);
```

app.ts:

```typescript
import { SpintaxOutputPlugin } from "jovo-community-plugin-spintax-output";

app.use(
  // ... base imports
  new SpintaxOutputPlugin()
);
```

# How to start

Replace your whatever `WELCOME_MESSAGE` with something like `"[Welcome|Hello|Hi!]"` and launch you voice app/skill/action multiple times. 

Notice the difference?

# License

Apache V2
