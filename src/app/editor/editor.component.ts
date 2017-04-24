import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {utc} from 'moment';
import * as io from 'socket.io-client';

import {ArticleSyncService} from '../article-sync.service';
import {Article} from '../common/article';
import {Paragraph} from '../common/paragraph';
import {ParagraphAdd} from '../common/paragraph-add';
import {StoreService} from '../store.service';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: [
    './editor.component.css'
  ],
})
export class EditorComponent implements OnInit {
  private article: Article;
  private articleSync: ArticleSyncService;
  @ViewChild('_title') private titleElement: ElementRef;
  @ViewChild('_author') private authorEditElement: ElementRef;
  constructor(private store: StoreService) {}

  ngOnInit() {
    let remote: any;
    this.article = {
      _rev: '0_1111111111111111',
      title: '无标题',
      author: 'user0',
      pidList: [0],
      nextPid: 0,
      content: {0: {author: 'user0', content: 'To be edited', time: utc()}},
    };
    this.store.load().then(response => {
      remote = response;
      this.article = remote;
    });
    this.articleSync = new ArticleSyncService(this.article);
  }
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
    this.articleSync.edit(paragraph);
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
    this.articleSync.add(data.pid);
  }
  save() { this.store.save(this.article); }
}
