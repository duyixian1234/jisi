import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {utc} from 'moment';
import * as io from 'socket.io-client';

import {Article, ContentArray} from '../common/article';
import {Paragraph} from '../common/paragraph';
import {ParagraphAdd} from '../common/paragraph-add';
import {StoreService} from '../store.service';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: [
    './editor.component.css', '../fabric.components.min.css',
    '../fabric.min.css'
  ],
})
export class EditorComponent implements OnInit {
  private article: Article;
  private socket = io.connect('http://localhost:5000');
  @ViewChild('_title') private titleElement: ElementRef;
  @ViewChild('_author') private authorEditElement: ElementRef;
  constructor(private store: StoreService) {
    this.article = {
      _rev: '0_1111111111111111',
      title: '无标题',
      author: 'user0',
      pidList: [0],
      nextPid: 0,
      content: {0: {author: 'user0', content: 'To be edited', time: utc()}},
    };
    this.store.load().then(response => { this.article = response; });
    this.socket
        .on('edit', (data: Paragraph) => {
          this.article.content[data.pid] = {
            author: data.author,
            content: data.content,
            time: utc(data.time)
          }
        })
        .on('new', data => {
          if (this.article.pidList.indexOf(data[1]) < 0) {
            const time = utc(data.time);
            this.article.nextPid += 1;
            this.article.pidList.splice(
                this.article.pidList.indexOf(data[0]) + 1, 0, data[1]);
            this.article.content[data[1]] = {
              author: data[2],
              content: '',
              time: time
            };
          }
        });
  }

  ngOnInit() {}
  changeTitle() {
    this.article.title = this.titleElement.nativeElement.innerHTML;
  }
  changeAuthor() {
    if (this.authorEditElement.nativeElement.innerHTML !== '') {
      this.article.author = this.authorEditElement.nativeElement.innerHTML;
    } else {
      this.article.author = 'user0';
      this.authorEditElement.nativeElement.innerHTML = this.article.author;
    }
  }
  edit(paragraph: Paragraph) {
    this.article.content[paragraph.pid] = {
      author: this.article.author,
      content: paragraph.content,
      time: utc(paragraph.time)
    };
    this.socket.emit('edit', {
      pid: paragraph.pid,
      author: this.article.author,
      content: paragraph.content
    });
  }
  add(data: ParagraphAdd) {
    this.article.nextPid += 1;
    this.article.pidList.splice(
        this.article.pidList.indexOf(data.pid) + 1, 0, this.article.nextPid);
    this.article.content[this.article.nextPid] = {
      author: this.article.author,
      content: '',
      time: utc()
    };
    this.socket.emit(
        'new', [data.pid, this.article.nextPid, this.article.author]);
  }
  save() {
    this.store.save(this.article)
        .then(response => this.article._rev = response.rev);
  }
}
