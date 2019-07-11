import HTMLTextElement from './HTMLTextElement';

export default function createTextNode (text) {
  const element = new HTMLTextElement(text);
  element.textContext = text;

  return element;
}