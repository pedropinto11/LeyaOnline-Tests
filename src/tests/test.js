const assert = require("assert");
const { describe, it } = require("mocha");
const homePage = require("../pages/Homepage");
const searchPage = require("../pages/SearchPage");
const bookPage = require("../pages/BookPage");
const DriverFactory = require("../utils/DriverFactory");
const checkoutPage = require("../pages/CheckoutPage");

describe("Test Suite", function () {
  this.timeout(30000);

  beforeEach(async function () {
    driver = await DriverFactory.createDriver();
    await homePage.goToHomepageFirstTime();
  });

  afterEach(async function () {
    await DriverFactory.quitDriver(driver);
  });

  it("Scenario 1", async function () {
    await homePage.searchText("George");

    await searchPage.clickOnSeeMoreWhileIsVisible();

    let bookTitles = await searchPage.getAllBookTitles();

    let isTitleAvailable = bookTitles.includes("O Triunfo dos Porcos");

    assert.equal(isTitleAvailable, true, `The title "O Triunfo dos Porcos" does not exist".`);
  });

  it("Scenario 2", async function () {
    await homePage.searchText("1984");

    await searchPage.clickBookIfAvailableInList("1984");

    let bookAuthor = await bookPage.getAuthorName();
    let bookISBN = await bookPage.getISBN();
    let bookPages = await bookPage.getNumberOfPages();
    let bookDimensions = await bookPage.getBookDimensions();

    assert.equal(bookAuthor, "george orwell", `Book author "${bookAuthor} is different from "george orwell".`);
    assert.equal(bookISBN, "9789722071550", `ISBN "${bookISBN} is different from "9789722071550".`);
    assert.equal(bookPages, "344", `Pages "${bookPages} is different from "344".`);
    assert.equal(bookDimensions, "235 x 157 x 23 mm", `Dimensions "${bookDimensions} are different from "235 x 157 x 23 mm".`);
  });

  it("Scenario 3", async function () {
    await homePage.searchText("1984");

    await searchPage.clickBookIfAvailableInList("1984");

    let firstBookAuthor = await bookPage.getAuthorName();

    await homePage.searchText("A Quinta dos Animais");

    await searchPage.clickBookIfAvailableInList("A Quinta dos Animais");

    let secondBookAuthor = await bookPage.getAuthorName();

    assert.equal(
      firstBookAuthor,
      secondBookAuthor,
      `First book "${firstBookAuthor}" is different from the second "${secondBookAuthor}".`
    );
  });

  it("Scenario 4", async function () {
    debugger;
    await homePage.searchText("1984");

    await searchPage.clickBookIfAvailableInList("1984");

    await bookPage.clickBuyBook();

    await checkoutPage.goToCheckoutPageByUrl();

    let totalBooksInCart = await checkoutPage.getNumberOfBooksInCart();

    assert.equal(totalBooksInCart,1);
  });
});
