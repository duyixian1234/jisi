import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

@Injectable()
export class DocumentService {
  constructor(@Inject(DOCUMENT) private document: any) {}
  setTitle(title: string) { this.document.title = title; }
  getDomain():string{
    return this.document.domain;
  }
}