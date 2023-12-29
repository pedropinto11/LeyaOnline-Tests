const { By } = require("selenium-webdriver");
var BasePage = require("./BasePage");

let CHECKOUT_PAGE_URL = "https://www.leyaonline.com/pt/loja/carrinho.php";
// ELEMENTS IN SEARCHPAGE

let checkoutTitleCss = ".h0";
let totalBooksInCartCss = "div:nth-child(2) form input";

// CLOSING ELEMENTS

class CheckoutPage extends BasePage {
  async goToCheckoutPageByUrl() {
    await this.goToUrl(CHECKOUT_PAGE_URL);
    await this.waitUntilElementIsLocated(By.css(checkoutTitleCss));
  }

  async getNumberOfBooksInCart() {
    const inputElements = await this.findElementsByCss(totalBooksInCartCss);
    let totalBooksOrdered = 0;

    for (const inputElement of inputElements) {
      const inputValue = await inputElement.getAttribute("value");
      const numberOfBooks = parseInt(inputValue, 10);
      if (!isNaN(numberOfBooks)) {
        totalBooksOrdered += numberOfBooks;
      }
    }
    console.log(totalBooksOrdered);
    return totalBooksOrdered;
  }
}

module.exports = new CheckoutPage();
