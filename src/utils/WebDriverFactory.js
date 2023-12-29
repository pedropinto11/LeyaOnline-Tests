const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

class WebDriverFactory {
  static createChromeDriver() {
    return new Builder().forBrowser("chrome").build();
  }
}
