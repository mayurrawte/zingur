import { ZingurPage } from './app.po';

describe('zingur App', () => {
  let page: ZingurPage;

  beforeEach(() => {
    page = new ZingurPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
