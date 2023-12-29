const { Builder, By, Key, until } = require("selenium-webdriver");
var BasePage = require("./BasePage");

// ELEMENTS IN SEARCHPAGE

let seeMoreCss = "span.vermais";

// CLOSING ELEMENTS

class SearchPage extends BasePage {
  clickOnSeeMoreWhileIsVisible() {
    const seeMoreElement = this.findElementByCss(seeMoreCss);
    console.log(this.doesElementExist(By.css(seeMoreCss)));
    while (this.doesElementExist(By.css(seeMoreCss)) == true) {
      this.scrollToTheBottomOfPage();
      seeMoreElement.click();
    }
  }
}

module.exports = new SearchPage();
