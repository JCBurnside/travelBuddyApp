import { TravelBuddyAppPage } from './app.po';

describe('travel-buddy-app App', () => {
  let page: TravelBuddyAppPage;

  beforeEach(() => {
    page = new TravelBuddyAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
