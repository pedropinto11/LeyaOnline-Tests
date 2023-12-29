const assert = require("assert");
const { describe, it } = require("mocha");
const homePage = require("../pages/Homepage");
const searchPage = require("../pages/SearchPage");
const bookPage = require("../pages/BookPage");
const DriverFactory = require("../utils/DriverFactory");

describe("Test Suite", function () {
  this.timeout(30000);

  beforeEach(async function () {
    driver = await DriverFactory.createDriver();
    await homePage.goToHomepageFirstTime();
  });

  afterEach(async function () {
    await DriverFactory.quitDriver();
  });

  // it("Scenario 1", async function () {
  //   await homePage.searchText("George");

  //   await searchPage.clickOnSeeMoreWhileIsVisible();

  //   let bookTitles = await searchPage.getAllBookTitles();

  //   let isTitleAvailable = bookTitles.includes("O Triunfo dos Porcos");

  //   assert.equal(isTitleAvailable, true);
  // });

  it("Scenario 2", async function () {
    await homePage.searchText("1984");

    //await searchPage.clickOnSeeMoreWhileIsVisible();

    await searchPage.clickBookIfAvailableInList("1984");

    await searchPage.sleep();

    let bookAuthor = await bookPage.getAuthorName();
    let bookISBN = await bookPage.getISBN();

    let bookPages = await bookPage.getNumberOfPages();

    let bookDimensions = await bookPage.getBookDimensions();

    console.log(bookAuthor, bookISBN, bookPage, bookDimensions);


    assert.equal(bookAuthor, 'George Orwell');
    assert.equal(bookISBN, '9789722071550');

    assert.equal(bookPages, '344');

    assert.equal(bookDimensions, '235 x 157 x 23 mm');

  });
});
