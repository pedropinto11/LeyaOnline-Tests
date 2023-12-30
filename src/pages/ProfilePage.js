const { Builder, By, Key, until, wait } = require("selenium-webdriver");
var BasePage = require("../pages/BasePage");

// ELEMENTS IN HOMEPAGE

// CLOSING ELEMENTS

class ProfilePage extends BasePage {
  async getUrl() {
    return await this.getPageUrl();
  }
}

module.exports = new ProfilePage();
