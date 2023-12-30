const { By } = require("selenium-webdriver");
var BasePage = require("../pages/BasePage");

let BASE_URL = "https://www.leyaonline.com/pt/";

// ELEMENTS IN HOMEPAGE

let searchInputId = "searchbar-large";
let cookiesPopupRejectId = "cookiescript_reject";
let searchFilterCss = "div.search-filter-btn";
let darkModeId = "darkmode";
let darkModeIconCss = "#darkmode a i";
let profileCss = "div.header-icons div.dropdown";
let homeBtnCss = "div .header-logo.header-logo-big";

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
    let icon = await this.findElementByCss(darkModeIconCss);
    return await icon.getAttribute("class");
  }

  async goToProfile() {
    await this.findAndClickElementByCss(profileCss);
  }

  async clickHomeBtn() {
    await this.findAndClickElementByCss(homeBtnCss);
  }
}

module.exports = new HomePage();
