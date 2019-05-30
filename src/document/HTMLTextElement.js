import Element from './Element';
import { TEXT_NODE } from '../shared/HTMLNodeType';

export default class HTMLTextElement extends Element {
  nodeType = TEXT_NODE;
}