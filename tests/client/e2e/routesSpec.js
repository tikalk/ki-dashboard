
describe('E2E: Testing Routes', function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });

  it('should jump to list path when / is accessed', function() {
    browser().navigateTo('#/');
    expect(browser().location().path()).toBe('list');
  });

});