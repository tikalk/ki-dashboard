
describe('E2E: Testing Controllers', function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });

  it('should have a working list page that loads the controller', function() {
    browser().navigateTo('#list');
    //try removing the controller and this will fail
    expect(element('#wrapper').html()).toContain('ListCtrl');
  });

});