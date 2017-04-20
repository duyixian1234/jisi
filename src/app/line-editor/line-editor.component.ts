import {AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

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
  @Output() editor = new EventEmitter<any>();
  @Output() add = new EventEmitter<any>();
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
    this.editor.emit({id: this.id, author: this.author, content: this.content});
  }
  leave() { this.edited = false; }
  new_(event: KeyboardEvent) {
    event.preventDefault();
    this.add.emit({author: this.author, id: this.id});
  }
}
