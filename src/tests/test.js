const assert = require("assert");
const { describe, it } = require("mocha");
const homePage = require("../pages/Homepage");
const searchPage = require("../pages/SearchPage");
const bookPage = require("../pages/BookPage");
const DriverFactory = require("../utils/DriverFactory");
const checkoutPage = require("../pages/CheckoutPage");
const profilePage = require("../pages/ProfilePage");

describe("Test Suite", function () {
  this.timeout(50000);

  beforeEach(async function () {
    driver = await DriverFactory.createDriver();
    await homePage.goToHomepageFirstTime();
  });

  afterEach(async function () {
    await DriverFactory.quitDriver(driver);
  });

  it("Search for 'George' and validate the book 'O Triunfo dos Porcos' appears in the list and contains the description the words 'Quinta Manor' in  description.", async function () {
    let searchText = "George";
    let bookTitle = "O Triunfo dos Porcos";

    await homePage.searchText(searchText);
    await searchPage.clickOnSeeMoreWhileIsVisible();

    let bookTitles = await searchPage.getAllBookTitles();

    let isTitleAvailable = bookTitles.includes(bookTitle);

    assert.equal(
      isTitleAvailable,
      true,
      `The title "${bookTitle}" does not exist".`
    );
    await searchPage.clickBookIfAvailableInList(bookTitle);

    let bookDescription = await bookPage.getBookDescription();

    assert.equal(
      bookDescription.includes("Quinta Manor"),
      true,
      `The description doesn't contain "Quinta Manor"`
    );
  });

  it("Search for '1984' and validate: Author = 'George Orwell', ISBN = '9789722071550', Pages = '344', Dimensions = '235 x 157 x 23 mm'.", async function () {
    await homePage.searchText("1984");

    await searchPage.clickBookIfAvailableInList("1984");

    let bookAuthor = await bookPage.getAuthorName();
    let bookISBN = await bookPage.getISBN();
    let bookPages = await bookPage.getNumberOfPages();
    let bookDimensions = await bookPage.getBookDimensions();

    assert.equal(
      bookAuthor,
      "george orwell",
      `Book author "${bookAuthor} is different from "george orwell".`
    );
    assert.equal(
      bookISBN,
      "9789722071550",
      `ISBN "${bookISBN} is different from "9789722071550".`
    );
    assert.equal(
      bookPages,
      "344",
      `Pages "${bookPages} is different from "344".`
    );
    assert.equal(
      bookDimensions,
      "235 x 157 x 23 mm",
      `Dimensions "${bookDimensions} are different from "235 x 157 x 23 mm".`
    );
  });

  it("Verify that the book '1984' and 'A Quinta dos Animais' has the same author.", async function () {
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

  it("Add the book '1984' to the basket and validate that the number of items is 1.", async function () {
    await homePage.searchText("1984");

    await searchPage.clickBookIfAvailableInList("1984");

    await bookPage.clickBuyBook();

    await checkoutPage.goToCheckoutPageByUrl();

    let totalBooksInCart = await checkoutPage.getNumberOfBooksInCart();

    assert.equal(
      totalBooksInCart,
      1,
      `The total books in the cart "${totalBooksInCart}" is different from 1`
    );
  });

  it("Change the background to dark mode.", async function () {
    await homePage.clickDarkMode();

    let icon = await homePage.getClassNameFromDarkModeIcon();

    assert.equal(
      icon,
      "nav-icon icon-moon",
      `The icon "${icon}" is not a moon. Dark mode is not enabled`
    );
  });

  it("When clicking in the profile, you are redirected to the login screen.", async function () {
    await homePage.goToProfile();

    let url = await profilePage.getPageUrl();

    assert.equal(
      url.includes("/login"),
      true,
      `The redirected page is not the login page: ${url}`
    );
  });

  it("When you click on the home button, you are redirected to the homepage", async function () {
    let searchText = "1984";

    await homePage.searchText(searchText);

    debugger;

    await homePage.clickHomeBtn();

    let url = await homePage.getPageUrl();

    assert.equal(
      url,
      "https://www.leyaonline.com/pt/",
      `Not redirected to the homepage. Redirected to: ${url}`
    );
  });
});
