import {AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {duration, Moment, utc} from 'moment';

import {Paragraph} from '../common/paragraph';
import {ParagraphAdd} from '../common/paragraph-add';

@Component({
  selector: 'app-line-editor',
  templateUrl: './line-editor.component.html',
  styleUrls: ['./line-editor.component.css']
})
export class LineEditorComponent implements OnInit, AfterViewInit,
                                            AfterViewChecked {
  @Input() id: number;
  @Input() author: string;
  @Input() content: string;
  @Input() time: Moment;
  @Output() paragraph = new EventEmitter<Paragraph>();
  @Output() add = new EventEmitter<ParagraphAdd>();
  edited = false;
  @ViewChild('line_editor')
  lineEditorElement: ElementRef;
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {
    if (this.id !== 0) {
      this.lineEditorElement.nativeElement.innerHTML = '';
      this.lineEditorElement.nativeElement.focus();
    }
  }
  ngAfterViewChecked() {
    if (!this.edited) {
      this.lineEditorElement.nativeElement.innerHTML = this.content;
    }
  }
  edit() {
    this.edited = true;
    this.content = this.lineEditorElement.nativeElement.innerHTML;
    this.paragraph.emit({
      pid: this.id,
      author: this.author,
      content: this.content,
      time: utc().format()
    });
  }
  leave() { this.edited = false; }
  new_(event: KeyboardEvent) {
    event.preventDefault();
    this.add.emit({author: this.author, pid: this.id});
  }
}
