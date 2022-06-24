import {
  Jovo,
  HandleRequest,
  Plugin,
  PluginConfig,
  Extensible,
  InvalidParentError,
  MessageValue,
} from "@jovotech/framework";

import { processSpintaxExpression } from "./SpintaxOutputProcessor";

/**
 * This plugin will search and process the output object for
 * 'message' and 'reprompt' entries in case they contain
 * 'spintax' expressions.
 */
export class SpintaxOutputPlugin extends Plugin {
  mount(extensible: Extensible) {
    if (!(extensible instanceof HandleRequest)) {
      throw new InvalidParentError(this.constructor.name, HandleRequest);
    }
    extensible.middlewareCollection.use(
      "before.response.output",
      (jovo: Jovo) => {
        this.processSpintaxExpressionsInOutput(jovo);
      }
    );
  }

  processSpintaxExpressionsInOutput(jovo: Jovo) {
    jovo.$output.forEach((entry) => {
      if ("message" in entry) {
        if (Array.isArray(entry.message)) {
          let messageArray = entry.message;
          messageArray = messageArray.map((message: MessageValue) => {
            return this.processSpintaxedOutputElement(message);
          });
          entry.message = messageArray;
        } else {
          entry.message = this.processSpintaxedOutputElement(
            entry.message as string
          );
        }
      }

      if ("reprompt" in entry) {
        if (Array.isArray(entry.reprompt)) {
          let repromptArray = entry.reprompt;
          repromptArray = repromptArray.map((message: MessageValue) => {
            return this.processSpintaxedOutputElement(message);
          });
          entry.reprompt = repromptArray;
        } else {
          entry.reprompt = this.processSpintaxedOutputElement(
            entry.reprompt as string
          );
        }
      }
    });
  }

  /**
   *
   * @param spintaxedOutputElement may be a string or an object like {text: string, speech: string} but no Array
   * @returns
   */
  processSpintaxedOutputElement(
    spintaxedOutputElement: MessageValue
  ): MessageValue {
    if (typeof spintaxedOutputElement === "string") {
      spintaxedOutputElement = processSpintaxExpression(
        spintaxedOutputElement as string
      );
    } else if (typeof spintaxedOutputElement === "object") {
      // structure is something like {text: string, speech: string}
      if ("text" in spintaxedOutputElement) {
        spintaxedOutputElement.text = processSpintaxExpression(
          spintaxedOutputElement.text as string
        );
      }
      if ("speech" in spintaxedOutputElement) {
        spintaxedOutputElement.speech = processSpintaxExpression(
          spintaxedOutputElement.speech as string
        );
      }
    }
    return spintaxedOutputElement;
  }

  getDefaultConfig(): PluginConfig {
    return {};
  }
}
