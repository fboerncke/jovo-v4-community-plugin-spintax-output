import {
  Jovo,
  HandleRequest,
  Plugin,
  PluginConfig,
  Extensible,
  InvalidParentError,
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
    jovo.$output.forEach((entry): void => {
      if ("message" in entry) {
        entry.message = processSpintaxExpression(entry.message as string);
      }
      if ("reprompt" in entry) {
        entry.reprompt = processSpintaxExpression(entry.reprompt as string);
      }
    });
  }

  getDefaultConfig(): PluginConfig {
    return {};
  }
}
