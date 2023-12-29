const { Builder, By, Key, until } = require("selenium-webdriver");
var BasePage = require("./BasePage");
const BookPage = require("./BookPage");

// ELEMENTS IN SEARCHPAGE

let bookTitleCss = "h6.book-title";
let seeMoreCss = "a.vermaisajax";
let bookImageXpath = "//section[4]/div/div[2]/div[1]/a[1]/div[1]/div/img";

// CLOSING ELEMENTS

class SearchPage extends BasePage {
  async clickOnSeeMoreWhileIsVisible() {
    while ((await this.doesElementExist(By.css(seeMoreCss))) == true) {
      await this.scrollToElement(By.css(seeMoreCss));
      (await this.findElementByCss(seeMoreCss)).click();
    }
  }

  async clickBookOfIndex(index) {
    let bookTitleElements = await this.findElementsByLocator(
      By.css(bookTitleCss)
    );
    await bookTitleElements[index].click();
  }

  async clickBookIfAvailableInList(matchingTitle) {
    let bookTitles = await this.getAllBookTitles();

    if (bookTitles.find((title) => title.includes(matchingTitle))) {
      const index = bookTitles.indexOf(matchingTitle);
      await this.clickBookOfIndex(index);
      await this.waitUntilElementIsLocated(By.xpath(bookImageXpath));
      this.sleep();
    }
  }

  async getAllBookTitles() {
    let bookTitleElements = await this.findElementsByLocator(
      By.css(bookTitleCss)
    );
    const bookTitlesArray = [];
    for (const element of bookTitleElements) {
      const title = await element.getText();
      bookTitlesArray.push(title);
    }
    return bookTitlesArray;
  }
}

module.exports = new SearchPage();
