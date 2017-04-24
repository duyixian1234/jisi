import {Moment} from 'moment';
export interface Article {
  _rev?: string;
  title: string;
  author: string;
  pidList: Array<number>;
  nextPid: number;
  content: ContentArray;
}
export interface ContentArray {
  [index: number]: Line;
}
interface Line {
  author: string;
  content: string;
  time: Moment;
}