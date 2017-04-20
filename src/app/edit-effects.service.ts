import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EditEffectsService {

  constructor(private actions$:Actions) { }

  // tslint:disable-next-line:member-ordering
  @Effect() changeTitle$ = this.actions$
    .ofType('changeTitle').subscribe(payload =>payload);


}
