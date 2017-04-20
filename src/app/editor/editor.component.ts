import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  doc = {
    title: '无标题',
    author: 'user0',
    paragraphList: [0],
    max: 0,
    content: {0: {author: 'user0', content: 'To be edited'}},
  };
  socket = io.connect('http://localhost:5000');
  @ViewChild('_title')
  titleElement: ElementRef;
  @ViewChild('_author')
  authorEditElement: ElementRef;
  constructor() {}

  ngOnInit() {
    this.socket
        .on('edit', data => this.doc.content[data.id] = {
          author: data.author,
          content: data.content
        })
        .on('new', data => {
          console.log(data);
          if (this.doc.paragraphList.indexOf(data[1]) < 0) {
            this.doc.max += 1;
            this.doc.paragraphList.splice(
                this.doc.paragraphList.indexOf(data[0]) + 1, 0, data[1]);
            this.doc.content[data[1]] = {author: data[2], content: ''};
          }
        });
  }
  changeTitle() {
    this.doc.title = this.titleElement.nativeElement.innerHTML;
  }
  changeAuthor() {
    if (this.authorEditElement.nativeElement.innerHTML !== '') {
      this.doc.author = this.authorEditElement.nativeElement.innerHTML;
    } else {
      this.doc.author = 'user0';
      this.authorEditElement.nativeElement.innerHTML = this.doc.author;
    }
  }
  edit(data: any) {
    this.doc.content[data.id] = {author: this.doc.author, content: data.content};
    this.socket.emit('edit', data);
  }
  add(data: any) {
    this.doc.max += 1;
    this.doc.paragraphList.splice(
        this.doc.paragraphList.indexOf(data.id) + 1, 0, this.doc.max);
    this.doc.content[this.doc.max] = {author: this.doc.author, content: ''};
    this.socket.emit('new', [data.id, this.doc.max, this.doc.author]);
  }
}
