const { Builder, By, Key, until, wait } = require("selenium-webdriver");
var BasePage = require("../pages/BasePage");

let BASE_URL = "https://www.leyaonline.com/pt/";

// ELEMENTS IN HOMEPAGE

let searchInputId = "searchbar-large";
let cookiesPopupRejectId = "cookiescript_reject";
let searchFilterCss = "div.search-filter-btn";
let darkModeId = "darkmode";
let darkModeIcon = "#darkmode a i";

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

  async clickDarkMode() {
    await this.findAndClickElementById(darkModeId);
  }

  async getClassNameFromDarkModeIcon() {
    let icon = await this.findElementByCss(darkModeIcon);
    return await icon.getAttribute("class");
  }
}

module.exports = new HomePage();
