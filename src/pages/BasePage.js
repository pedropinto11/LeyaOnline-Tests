var webdriver = require("selenium-webdriver");
const { By, Key, until } = require("selenium-webdriver");
var driver = new webdriver.Builder().forBrowser("chrome").build();
driver.manage().setTimeouts({ implicit: 10000 });

class BasePage {
  constructor() {
    global.driver = driver;
  }

  findElementById(id) {
    driver.wait(until.elementsLocated(By.id(id)));
    return driver.findElement(By.id(id));
  }
  findElementByCss(css) {
    driver.wait(until.elementsLocated(By.css(css)));
    return driver.findElement(By.css(css));
  }

  findAndClickElementById(id) {
    this.waitUntilElementIsLocated(By.id(id));
    driver.findElement(By.id(id)).click();
  }

  findElementsByLocator(locator) {
    driver.wait(until.elementsLocated(locator));
    return driver.findElements(locator);
  }
  findElementsByXpath(xpath) {
    driver.wait(until.elementsLocated(By.xpath(xpath)));
    return driver.findElements(By.xpath(xpath));
  }
  findElementsByCss(css) {
    driver.wait(until.elementsLocated(By.css(css)));
    return driver.findElements(By.css(css));
  }

  doesElementExist(locator) {
    const elements = this.findElementsByLocator(locator);
    return elements.length > 0;
  }

  goToUrl(url) {
    driver.get(url);
  }
  searchTextByCss(css, searchText) {
    driver.findElement(By.css(css)).sendKeys(searchText, Key.RETURN);
  }

  searchTextById(id, searchText) {
    driver.findElement(By.id(id)).sendKeys(searchText, Key.RETURN);
    driver.wait(until.elementLocated(By.id(id)));
  }

  clickById(id) {
    driver.findElement(By.id(id)).click();
  }

  sleep(seconds) {
    var e = new Date().getTime() + seconds * 1000;
    while (new Date().getTime() <= e) {}
  }

  scrollToTheBottomOfPage() {
    driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
    driver.sleep(1000);
  }

  waitUntilElementIsLocated(locator, timeout = 10000) {
    driver.wait(until.elementLocated(locator), timeout);
  }

  maximizeWindow() {
    driver.manage().window().maximize();
  }
}

module.exports = BasePage;
