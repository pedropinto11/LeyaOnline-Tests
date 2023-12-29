class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async doesElementExist(driver, locator) {
    const elements = await driver.findElements(locator);
    return elements.length > 0;
  }

  

  // Common methods for interacting with elements can go here
}

module.exports = BasePage;