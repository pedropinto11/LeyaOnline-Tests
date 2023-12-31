const { By, Key, until } = require("selenium-webdriver");
const DriverFactory = require("../utils/DriverFactory");

class BasePage extends DriverFactory {
  constructor(driver) {
    super(driver);
    this.driver = driver;
  }

  async findElementById(id) {
    await driver.wait(until.elementsLocated(By.id(id)));
    return await driver.findElement(By.id(id));
  }

  async findElementByXpath(xpath) {
    await driver.wait(until.elementsLocated(By.xpath(xpath)));
    return await driver.findElement(By.xpath(xpath));
  }

  async findElementByLocator(locator) {
    await driver.wait(until.elementsLocated(locator));
    return await driver.findElement(locator);
  }

  async findElementByCss(css) {
    await driver.wait(until.elementsLocated(By.css(css)));
    return await driver.findElement(By.css(css));
  }

  async findElementsByCss(css) {
    await driver.wait(until.elementsLocated(By.css(css)));
    return await driver.findElements(By.css(css));
  }

  async findTextByCss(css) {
    await driver.wait(until.elementsLocated(By.css(css)));
    let element = await driver.findElement(By.css(css));
    return await element.getText();
  }

  async findAndClickElementById(id) {
    let element = await this.findElementById(id);
    await element.click();
  }
  async findAndClickElementByCss(css) {
    let element = await this.findElementByCss(css);
    await element.click();
  }

  async findAndClickElementByXpath(xpath) {
    const element = await this.findElementByXpath(xpath);
    await element.click();
  }

  async findElementsByLocator(locator) {
    await this.waitUntilElementIsLocated(locator);
    return await driver.findElements(locator);
  }

  async doesElementExist(locator) {
    const elements = await this.findElementsByLocator(locator);
    return elements.length > 0;
  }

  async getPageUrl() {
    return await driver.getCurrentUrl();
  }

  async goToUrl(url) {
    await driver.get(url);
  }

  async searchTextById(id, searchText) {
    const searchInput = await this.findElementById(id);
    await searchInput.sendKeys(searchText, Key.RETURN);
  }

  async sleep(time = 2000) {
    await driver.sleep(time);
  }

  async waitUntilElementIsLocated(locator, timeout = 10000) {
    await driver.wait(until.elementLocated(locator), timeout);
  }

  async maximizeWindow() {
    await driver.manage().window().maximize();
  }

  async scrollToElement(elementLocator) {
    let attempts = 0;
    let maxAttempts = 5;
    while (attempts < maxAttempts) {
      try {
        await driver.wait(async () => {
          const element = await this.findElementByLocator(elementLocator);
          return (await element.isEnabled()) && (await element.isDisplayed());
        }, 5000);
        break;
      } catch (error) {
        await driver.executeScript(
          "window.scrollTo(0, document.body.scrollHeight);"
        );
        await driver.sleep(1000);
        attempts++;
      }
    }
  }

  async scrollToVisibleElement(element) {
    const maxScrollAttempts = 10;

    for (let attempt = 0; attempt < maxScrollAttempts; attempt++) {
      await driver.executeScript(
        'arguments[0].scrollIntoView({behavior: "smooth", block: "center", inline: "center"});',
        element
      );
      await this.sleep(1000);
      const isElementVisible = await element.isDisplayed();
      if (isElementVisible) {
        break;
      }
    }
  }

  async killDriver() {
    await driver.quit();
  }
}

module.exports = BasePage;
