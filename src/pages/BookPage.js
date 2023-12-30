var BasePage = require("./BasePage");

// ELEMENTS IN SEARCHPAGE

let authorNameCss = "a.nome_autor";
let bookDetailsCss = "._sinpose-address ul";
let isbnCss = bookDetailsCss + " li:nth-child(1)";
let numberOfPagesCss = bookDetailsCss + " li:nth-child(6)";
let bookDimensionsCss = bookDetailsCss + " li:nth-child(5)";
let buyBookXpath = "//div[4]/div/div[2]/div/a";
let bookDescriptionId = '_65901c767480a';

// CLOSING ELEMENTS

class BookPage extends BasePage {
  async getAuthorName() {
    return String(await this.findTextByCss(authorNameCss)).toLowerCase();
  }
  async getISBN() {
    let isbn = await this.findTextByCss(isbnCss);
    const startIndex = isbn.indexOf("ISBN: ") + "ISBN: ".length;
    const endIndex = isbn.length;
    return isbn.substring(startIndex, endIndex).trim();
  }
  async getNumberOfPages() {
    let pages = await this.findTextByCss(numberOfPagesCss);
    const startIndex = pages.indexOf("Páginas: ") + "Páginas: ".length;
    const endIndex = pages.length;
    return pages.substring(startIndex, endIndex).trim();
  }
  async getBookDimensions() {
    let dimensions = await this.findTextByCss(bookDimensionsCss);
    const startIndex = dimensions.indexOf("Dimensões: ") + "Dimensões: ".length;
    const endIndex = dimensions.length;
    return dimensions.substring(startIndex, endIndex).trim();
  }

  async clickBuyBook() {
    await this.findAndClickElementByXpath(buyBookXpath);
  }

  async getBookDescription(){
    return await this.findTextById(bookDescriptionId);
  }
}

module.exports = new BookPage();
