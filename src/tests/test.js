const assert = require("assert");
const { describe, it } = require("mocha");
const { Builder, Key, By, until } = require("selenium-webdriver");
const BasePage = require('../pages/BasePage');

describe("Test Suite", function () {
  let driver = new Builder().forBrowser("chrome").build();
  this.timeout(30000);

  beforeEach(async function () {
    await driver.get("https://www.leyaonline.com/pt/");
    await driver.manage().window().maximize();
    await driver.findElement(By.id("cookiescript_reject")).click();
    await driver.wait(until.elementLocated(By.id("searchbar-large")), 10000);
  });

  it("Scenario 1", async function () {
    await driver
      .findElement(By.id("searchbar-large"))
      .sendKeys("George", Key.RETURN);

    await driver.wait(until.elementLocated(By.xpath("//nav/ol/li[2]")), 10000);

    const seeMoreElement = await driver.findElement(By.className("vermais"));

    while (
      (await BasePage.doesElementExist(driver, By.xpath("//div[3]/div/div/a"))) == true
    ) {
      await driver.executeScript(
        "window.scrollTo(0, document.body.scrollHeight);"
      );
      await driver.sleep(1000);
      await seeMoreElement.click();
      await driver.sleep(1000);
    }

    let bookTitleElements = await driver.findElements(By.xpath("//div[2]/h6"));

    const bookTitles = await Promise.all(
      bookTitleElements.map(async (element) => {
        return await element.getText();
      })
    );

    let isTitleAvailable = bookTitles.includes("O Triunfo dos Porcos");
    assert.equal(isTitleAvailable, true);
  });
});
