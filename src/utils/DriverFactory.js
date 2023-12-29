const { Builder } = require("selenium-webdriver");

class DriverFactory {
  static async createDriver(browserName = "chrome") {
    switch (browserName.toLowerCase()) {
      case "chrome":
        return await new Builder().forBrowser("chrome").build();
      default:
        throw new Error("Unsupported Browser");
    }
  }
  static async quitDriver(driver) {
    await driver.quit();
  }
}

module.exports = DriverFactory;
