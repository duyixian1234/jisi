import 'rxjs/add/operator/toPromise';

import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import {Article} from './common/article';

@Injectable()
export class StoreService {
  private url = 'http://127.0.0.1:5984/jisi/001';
  constructor(private http: Http) {}
  load(): Promise<Article> {
    return this.http.get(this.url)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }
  save(article: Article): Promise<any> {
    return this.http.put(this.url, article)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);  // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
