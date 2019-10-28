const config = require('../config');

module.exports = {
  beforeEach(browser) {
    browser
      .url('https://login.live.com/')
      .waitForElementVisible('.middle')
      .assert.containsText('#idA_PWD_SwitchToCredPicker', 'Sign-in options')
      .assert.titleContains('Sign in to your Microsoft account')
  },

  afterEach(browser) {
    browser.end();
  },

  'Positive Test: Sign In'(browser) {
    browser
      .assert.elementPresent('#idSIButton9')
      .setValue('input[type=email]', config.email)
      .click('#idSIButton9')
      .waitForElementVisible('#displayName')
      .assert.containsText('#displayName', config.email)
      .setValue('input[type=password]', config.password)
      .click('input[type=submit]')
      .waitForElementVisible('#home-index')
      .assert.titleContains('Microsoft account | Home')
      .assert.urlContains('account.microsoft.com')
      .assert.containsText('#loaded-home-banner-profile-section > div.personal-info > h1 > a', config.name)
  },
  'Negative Test: Sign In With Invalid email'(browser) {
    browser
      .assert.elementPresent('#idSIButton9')
      .setValue('input[type=email]', 'hhagfsteunnskei@mail.com')
      .click('#idSIButton9')
      .assert.containsText('#usernameError', 'That Microsoft account doesn\'t exist. Enter a different account or ')
  },
  'Negative Test: Sign In With Invalid Password'(browser) {
    browser
      .assert.elementPresent('#idSIButton9')
      .setValue('input[type=email]', config.email)
      .click('#idSIButton9')
      .waitForElementVisible('#displayName')
      .assert.containsText('#displayName', config.email)
      .setValue('input[type=password]', 'hhdyteytejdjd')
      .click('input[type=submit]')
      .waitForElementVisible('#passwordError')
      .assert.containsText('#passwordError', 'Your account or password is incorrect. If you don\'t remember your password, ')
  }
};
