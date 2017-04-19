import { JisiEditorPage } from './app.po';

describe('jisi-editor App', () => {
  let page: JisiEditorPage;

  beforeEach(() => {
    page = new JisiEditorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
