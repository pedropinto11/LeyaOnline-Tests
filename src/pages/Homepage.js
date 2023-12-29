const { Builder, By, Key, until, wait } = require("selenium-webdriver");
var BasePage = require("../pages/BasePage");
var webdriver = require("selenium-webdriver");
var SearchPage = require("../pages/SearchPage");

let BASE_URL = "https://www.leyaonline.com/pt/";

// ELEMENTS IN HOMEPAGE

let searchInputId = "searchbar-large";
let cookiesPopupRejectId = "cookiescript_reject";
let searchBreadcrumbCss = "li.breadcrumb-item.active";

// CLOSING ELEMENTS

class HomePage extends BasePage {
  goToHomepageFirstTime() {
    this.goToUrl(BASE_URL);
    this.maximizeWindow();
    this.findAndClickElementById(cookiesPopupRejectId);
    this.waitUntilElementIsLocated(By.id(searchInputId));
  }

  searchText(text) {
    this.searchTextById(searchInputId, text);
    this.waitUntilElementIsLocated(By.css(searchBreadcrumbCss));
  }
}

module.exports = new HomePage();
