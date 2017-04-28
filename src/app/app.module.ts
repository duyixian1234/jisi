import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {appRoutingProviders, routing} from './app.routes';
import {EditorComponent} from './editor/editor.component';
import {LineEditorComponent} from './line-editor/line-editor.component';
import {StoreService} from './store.service';

@NgModule({
  declarations: [AppComponent, EditorComponent, LineEditorComponent],
  imports: [BrowserModule, FormsModule, HttpModule, routing],
  providers: [StoreService, appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
