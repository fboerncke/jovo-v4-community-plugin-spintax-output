/**
 * Starting with a text string which contains "spintax" expressions
 * this method selects a  * random string from all possible permutations
 * (there may be a lot!).
 *
 * Examples and possible outcome:
 *
 * "[Hello|Hi]" ==> "Hello" or "Hi"
 *
 * You are not limited to two variants, there may be multiple options in one spintax expression:
 * "[Hello|Hi|Cheerio|How do you do?|Welcome|Nice to have you here]" ==> "Hi" or "Welcome" or ...
 *
 * You can have multiple spintax expressions within a string description:
 * "[Hello|Hi] [my friend|again]" ==> "Hello again" or ...
 *
 * One option can be left empty to make parts of the text optional:
 * "[ | Good Bye]" ==> "" or "Good Bye"
 *
 * Nested spintax expressions are supported:
 * "[Hello|Hi] [|my [|best] friend ]" ==> "Hello", "Hi my friend", "Hello my best friend", ...
 *
 * @param text containing nested "spintax" expressions like "[Welcome|Hello]"
 * @returns one random string from all possible permuatations
 */
export function processSpintaxExpression(text: string): string {
  const regEx = new RegExp(/\[([^\[]+?)\]/);

  let matches = regEx.exec(text);
  while (matches !== null) {
    const options = matches[1].split("|");
    const random = Math.floor(Math.random() * options.length);
    text = text.replace(matches[0], options[random]);
    matches = regEx.exec(text);
  }

  // in created string replace multiple adjacent white
  // spaces with one space and trim the result
  const cleanText = text.replace(/\s+/g, " ").trim();
  return cleanText;
}
