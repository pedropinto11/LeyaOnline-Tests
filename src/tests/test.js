const assert = require("assert");
const { describe, it } = require("mocha");
const { Builder, Key, By, until } = require("selenium-webdriver");
const homePage = require("../pages/Homepage");
const searchPage = require("../pages/SearchPage");

describe("Test Suite", function () {
  this.timeout(30000);

  beforeEach(async function () {
    homePage.goToHomepageFirstTime();
  });

  it("Scenario 1", async function () {
    homePage.searchText("George");

    searchPage.clickOnSeeMoreWhileIsVisible();
  });
});

// //
// let bookTitleElements = await driver.findElements(By.xpath("//div[2]/h6"));

// const bookTitles = await Promise.all(
//   bookTitleElements.map(async (element) => {
//     return await element.getText();
//   })
// );

// let isTitleAvailable = bookTitles.includes("O Triunfo dos Porcos");
// assert.equal(isTitleAvailable, true);
