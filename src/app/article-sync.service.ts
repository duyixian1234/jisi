import {Injectable} from '@angular/core';
import {utc} from 'moment';
import * as io from 'socket.io-client';

import {Article} from './common/article';
import {Paragraph} from './common/paragraph';

@Injectable()
export class ArticleSyncService {
  socket = io.connect('http://localhost:5000');
  constructor(private article: Article) {
    this.socket
        .on('edit',
            (data: Paragraph) => {
              const time = utc(data.time);
              console.log(time.format());
              article.content[data.pid] = {
                author: data.author,
                content: data.content,
                time: time
              }
            })
        .on('new', data => {
          if (article.pidList.indexOf(data[1]) < 0) {
            const time = utc(data.time);
            article.nextPid += 1;
            article.pidList.splice(
                article.pidList.indexOf(data[0]) + 1, 0, data[1]);
            article.content[data[1]] = {
              author: data[2],
              content: '',
              time: time
            };
          }
        });
  }
  edit(paragraph: Paragraph) {
    this.socket.emit('edit', {
      pid: paragraph.pid,
      author: this.article.author,
      content: paragraph.content
    });
  }
  add(pid: number) {
    this.socket.emit('new', [pid, this.article.nextPid, this.article.author]);
  }
}
