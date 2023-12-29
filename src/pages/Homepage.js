const { Builder, By, Key, until, wait } = require("selenium-webdriver");
var BasePage = require("../pages/BasePage");
var webdriver = require("selenium-webdriver");
var SearchPage = require("../pages/SearchPage");

let BASE_URL = "https://www.leyaonline.com/pt/";

// ELEMENTS IN HOMEPAGE

let searchInputId = "searchbar-large";
let cookiesPopupRejectId = "cookiescript_reject";
let searchFilterCss = 'div.search-filter-btn';

// CLOSING ELEMENTS

class HomePage extends BasePage {
  async goToHomepageFirstTime() {
    await this.goToUrl(BASE_URL);
    await this.maximizeWindow();
    await this.findAndClickElementById(cookiesPopupRejectId);
    await this.waitUntilElementIsLocated(By.id(searchInputId));
  }

  async searchText(text) {
    await this.searchTextById(searchInputId, text);
    await this.waitUntilElementIsLocated(By.css(searchFilterCss));
    await this.sleep();
  }
}

module.exports = new HomePage();
