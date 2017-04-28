import 'rxjs/add/operator/toPromise';

import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {Article} from './common/article';
import {DocumentService} from './document.service';
@Injectable()
export class StoreService {
  private url:string;
  constructor(private http: Http, private document: DocumentService) {
    this.url = 'http://' + this.document.getDomain() + ':5984/jisi/';
  }
  load(id: string): Promise<Article> {
    return this.http.get(this.url + id)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleErrorSilent);
  }
  save(id: string, article: Article): Promise<any> {
    return this.http.put(this.url + id, article)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }
  create(id: string, article: Article): Promise<any> {
    return this.http.put(this.url + id, article)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleErrorSilent);
  }
  remove(id: string, rev: string): Promise<any> {
    return this.http.delete(this.url + id + '?rev=' + rev)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleErrorSilent);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);  // for demo purposes only
    return Promise.reject(error.message || error);
  }
  private handleErrorSilent(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
