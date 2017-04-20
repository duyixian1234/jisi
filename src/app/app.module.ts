import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { LineEditorComponent } from './line-editor/line-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    LineEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [EditorComponent, LineEditorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
