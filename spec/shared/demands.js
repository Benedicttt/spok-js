const yaml = require('js-yaml');
const fs = require('fs');
let file = fs.readFileSync('spec/panel/test_case/demands/test_case.yml', 'utf8')
const scenarios = yaml.safeLoad(file).demand;

let file_service = fs.readFileSync('spec/support/service.json')
let services_ids = JSON.parse(file_service).service

module.exports = {
    run_test_case_service: function(name_case) {
        it(`Go to page and check title ${page.demands.title}`,  () => {
            user_object.authorization(helper.user_email_last());

            go(page.demands.get);
            expect(browser.getTitle()).toEqual(page.demands.title);

            go(page.demands.new.get);
            expect(browser.getTitle()).toEqual(page.demands.new.title);
        });

        scenarios.service[`${name_case}`].selector.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                tag_selector.selectOption(key, value)
            })
        });

        scenarios.service[`${name_case}`].checkbox.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            if (Object.values(id)[0] === true) {
                it(`{ ${key}: ${value} }`, () => {
                    element(by.id(`${key}`)).click();
                    browser.sleep(100)
                })
            }
        });

        scenarios.service[`${name_case}`].input.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                element(by.id(`${key}`)).clear();

                if ( value === 'us') {
                    element(by.id(`${key}`)).sendKeys(services_ids.us.number)

                } else if ( value === 'we') {
                    element(by.id(`${key}`)).sendKeys(services_ids.we.number)

                } else {
                    element(by.id(`${key}`)).sendKeys(`${value}`)

                }
            })
        });

        scenarios.service[`${name_case}`].attributes.map(function(attribute){

                demands_shared.check_all_params(attribute)
            });
    },

    check_all_params: function(attribute) {
        let value = `${Object.values(attribute)[0]}`;
        let key = `${Object.keys(attribute)[0]}`;

        it(`{ ${key}: ${value} }`, () => {
            if (key === "advances" && value === 'true')      { demands_shared.advance_payment() }
            if (key === "demand_is_distributed" && value === 'true')  { demands_shared.demand_is_distributed() }
            if (key === "add_inventory" && value === 'true')          { demands_shared.add_inventory() }

            if (key === "click_buttons" && value === 'true') { demands_shared.buttons() }
            if (key === "check_statuses_return" && value === 'true')  { demands_shared.check_status_order_return() }
            if (key === "check_statuses_service" && value === 'true') { demands_shared.check_status_order_service() }
            if (key === "check_notify" && value === 'true')           { demands_shared.check_notify_for_demand() }

            let current_popup;
            if (key === "check_popup" && value === 'true') {
                for_css.wait_css(".btn-group .icon-info-sign", 2500);
                current_popup = element.all(by.css(".btn-group i.icon-info-sign")).get(0)
                current_popup.click();
                current_popup.isDisplayed();

                demands_shared.check_data_popup("SERVICE");
                demands_shared.check_data_popup("DDS");
                demands_shared.check_data_popup("DEMANDS");
            }
        });
    },

    run_test_case_return: function(name_case) {

        it(`Go to page and check title ${page.demands.title}`,  () => {
            user_object.authorization(helper.user_email_last());

            go(page.demands.get);
            expect(browser.getTitle()).toEqual(page.demands.title);

            go(page.demands.new.get);
            expect(browser.getTitle()).toEqual(page.demands.new.title);
        });

        scenarios.return[`${name_case}`].selector.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                tag_selector.selectOption(key, value)
            })
        });

        scenarios.return[`${name_case}`].checkbox.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            if (Object.values(id)[0] === true) {
                it(`{ ${key}: ${value} }`, () => {
                    element(by.id(`${key}`)).click();
                    browser.sleep(100)
                })
            }
        });

        scenarios.return[`${name_case}`].input.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                element(by.id(`${key}`)).clear();

                if ( value === 'us') {
                    element(by.id(`${key}`)).sendKeys(services_ids.us.number)

                } else if ( value === 'we') {
                    element(by.id(`${key}`)).sendKeys(services_ids.we.number)

                } else {
                    element(by.id(`${key}`)).sendKeys(`${value}`)

                }

            })
        });

        scenarios.return[`${name_case}`].attributes.map(function(attribute){

            let value = `${Object.values(attribute)[0]}`;
            let key = `${Object.keys(attribute)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                if (key === "advances" && value === 'true')      { demands_shared.advance_payment() }
                if (key === "demand_is_distributed" && value === 'true')  { demands_shared.demand_is_distributed() }
                if (key === "add_inventory" && value === 'true')          { demands_shared.add_inventory() }

                if (key === "click_buttons" && value === 'true') { demands_shared.buttons() }
                if (key === "check_statuses_return" && value === 'true')  { demands_shared.check_status_order_return() }
                if (key === "check_statuses_service" && value === 'true') { demands_shared.check_status_order_service() }
                if (key === "check_notify" && value === 'true')           { demands_shared.check_notify_for_demand() }

                let current_popup;
                if (key === "check_popup" && value === 'true') {
                    for_css.wait_css(".btn-group .icon-info-sign", 2500);
                    current_popup = element.all(by.css(".btn-group i.icon-info-sign")).get(0)
                    current_popup.click();
                    current_popup.isDisplayed();

                    demands_shared.check_data_popup("SERVICE");
                    demands_shared.check_data_popup("DDS");
                    demands_shared.check_data_popup("DEMANDS");
                }
            });
        });
    },

    //TODO: Add inventory
    add_inventory: function() {
        tag_selector.selectOption('demand_contractor_type_id', "--  На имущество")
        tag_selector.selectOption('demand_contractor_id', " Webazilla")

        for_css.wait_id('link_service_properties', 2000)
        element(by.id('link_service_properties')).click()

        for_css.wait_id('service_properties_amount', 2000)
        element(by.id('service_properties_amount')).sendKeys('1');
        element(by.id('service_properties_name')).sendKeys('--  На имущество');
        element.all(by.css('.btn-primary')).get(0).click()

        tag_selector.selectOption('demand_contractor_id', " Webazilla")
    },

    //TODO: Base template function for template `run test case`
    buttons: function() {
            browser.executeScript("$('#new_demand > div.form-actions > button')[0].click()")
            browser.sleep(3000)
            browser.executeScript("$('#new_demand > div.form-actions > button')[0].click()")

            let btn_last = element.all(by.css("button.btn-primary")).get(0);
            browser.wait(protractor.ExpectedConditions.visibilityOf(btn_last), 3000);
            browser.wait(EC.elementToBeClickable(btn_last.isEnabled()), 2500);
            btn_last.click()

            browser.sleep(1000)
            let expectedUrl = browser.baseUrl + '/demands';

            browser.wait(EC.urlContains(expectedUrl), 2500);
            browser.wait(EC.urlIs(expectedUrl), 2500);
            expect(browser.getCurrentUrl()).toEqual(expectedUrl);
    },

    //TODO:sign and pay
    check_status_order_return: function() {
        //TODO: SIGN
        for_css.wait_xpath("*//th[@class='span1'][9]/a[contains(text(), \"Подпись\")]/following::*/td[12]/a[@title=\"Подписать\"]/child::*", 3000)
        let sign_service = element.all(by.xpath("*//th[@class='span1'][9]/a[contains(text(), \"Подпись\")]/following::*/td[12]/a[@title=\"Подписать\"]/child::*")).get(0);
        sign_service.click();

        for_css.wait_xpath("//h3[contains(text(), \"Подпись заявки\")]", 2500)
            let btn_sign_service = "#modal > div.modal-footer > button.btn.btn-primary";
            element(by.css(btn_sign_service)).click()
            browser.navigate().refresh()

        //TODO: PAID
        for_css.wait_xpath('//*[@id="demands"]/tbody/tr[1]/td[13]/a', 3000)
            let icon_paid = element.all(by.xpath("*//th[@class='span1'][10]/a[contains(text(), \"Оплата\")]/following::*/td[13]/a[@title=\"Выставить на оплату\"]/parent::*/a")).get(0)
            icon_paid.click()

        for_css.wait_xpath("//h3[contains(text(), \"Выставление заявки на оплату\")]", 2500)
            browser.executeScript("$('#modal form').submit()")

        for_css.wait_xpath("//td[contains(text(), \"Комиссия:\")]", 2500)
            browser.executeScript("$('#modal form').submit()")

        //TODO: check success sign
        for_css.wait_xpath("//*[@id=\"demands\"]/tbody/tr/td[13]", 2500);
        browser.sleep(500);

        //TODO: unchecked is_paid in filter
        go(page.demands.get);

        for_css.wait_css("#filter_is_paid > label", 2500);
        element(by.css("#filter_is_paid > label")).click();

        browser.sleep(300);
        element(by.id('filter_all')).click();

        browser.sleep(300);
        browser.actions().mouseMove(element.all(by.css("button.btn-primary")).get(0), {x: 10, y: 10,}).click().perform();
        browser.sleep(1000);

        browser.actions().mouseMove(element.all(by.css("button.btn-primary")).get(0), {x: 10, y: 10,}).click().perform();
        browser.sleep(1000);

        helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 0, "Подписана");
        helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 1, "Оплачена");
    },

    check_status_order_service: function() {
        //TODO: SERVICE
        for_css.wait_xpath("*//th[@class='span1'][9]/a[contains(text(), \"Подпись\")]/following::*/td[11]/a[@title=\"Задать процент амортизации\"]/i", 3000)
        element.all(by.xpath('*//th[@class="span1"][9]/a[contains(text(), "Подпись")]/following::*/td[11]/a[@title="Задать процент амортизации"]/i')).get(0).click();

        for_css.wait_xpath("//h3[contains(text(), \"Число периодов амортизации имущества\")]", 5000)
        browser.sleep(3000)
        element.all(by.css('.btn-primary')).get(0).click()
        //
        // browser.sleep(3000)
        // browser.navigate().refresh()

        // for_css.wait_xpath("*//th[@class='span1'][9]/a[contains(text(), \"Подпись\")]/following::*/td[11]/a[@title=\"Подписать\"]/child::*", 3000)
        // let sign_service_last = element(by.xpath("*//th[@class='span1'][9]/a[contains(text(), \"Подпись\")]/following::*/td[11]/a[@title=\"Подписать\"]/child::*"));
        // sign_service_last.click();
        //
        // browser.executeScript("$('#modal form').submit()")
        // browser.navigate().refresh()


        // browser.sleep(2000)
        // for_css.wait_xpath("*//th[@class='span1'][9]/a[contains(text(), \"Подпись\")]/following::*/td[12]/a[@title=\"Подписать\"]/child::*", 3000)
        // let sign_service = element.all(by.xpath("*//th[@class='span1'][9]/a[contains(text(), \"Подпись\")]/following::*/td[12]/a[@title=\"Подписать\"]/child::*")).get(0);
        // sign_service.click();
        //
        // for_css.wait_xpath("//h3[contains(text(), \"Подпись услуги\")]", 2500)
        // element(by.css(".btn-primary")).click()

        // //TODO: SIGN
        // for_css.wait_xpath("*//th[@class='span1'][9]/a[contains(text(), \"Подпись\")]/following::*/td[12]/a[@title=\"Подписать\"]/child::*", 3000)
        // let sign_service = element.all(by.xpath("*//th[@class='span1'][9]/a[contains(text(), \"Подпись\")]/following::*/td[12]/a[@title=\"Подписать\"]/child::*")).get(0);
        // sign_service.click();
        //
        // for_css.wait_xpath("//h3[contains(text(), \"Подпись заявки\")]", 2500)
        // browser.executeScript("$('#modal form').submit()")
        // browser.navigate().refresh()
        //
        // //TODO: PAID
        // for_css.wait_xpath('//*[@id="demands"]/tbody/tr[1]/td[13]/a', 3000)
        // let icon_paid = element.all(by.xpath("*//th[@class='span1'][10]/a[contains(text(), \"Оплата\")]/following::*/td[13]/a[@title=\"Выставить на оплату\"]/parent::*/a")).get(0)
        // icon_paid.click()
        //
        // for_css.wait_xpath("//h3[contains(text(), \"Выставление заявки на оплату\")]", 2500)
        // browser.executeScript("$('#modal form').submit()")
        //
        // for_css.wait_xpath("//td[contains(text(), \"Комиссия:\")]", 2500)
        // browser.executeScript("$('#modal form').submit()")
        //
        // //TODO: check success sign
        // for_css.wait_xpath("//*[@id=\"demands\"]/tbody/tr/td[13]", 2500);
        // browser.sleep(500);
        //
        // //TODO: unchecked is_paid in filter
        // go(page.demands.get);
        //
        // for_css.wait_css("#filter_is_paid > label", 2500);
        // element(by.css("#filter_is_paid > label")).click();
        // element(by.id('filter_all')).click();

        // browser.sleep(10000);
        // browser.actions().mouseMove(element.all(by.css("button.btn-primary")).get(0), {x: 10, y: 10,}).click().perform();
        //
        // helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 0, "Подписана");
        // helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 3, "Подписана");
        // helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 4, "Оплачена");
    },

    check_data_popup: function(name) {

        if ( name == "DEMANDS" ){
            elem = element.all(by.css(".show_entities > a")).get(0);
            for_css.wait_css(".show_entities > a", 2500, 1);

            elem.getAttribute('href').then(function (value) {
                let id = value.match(/\d+/g).slice(-1)[0];
                let query = "/demands/highlight_demand?demand_id=";
                expect(value).toEqual(browser.baseUrl + query + id);
            })
        }

        if ( name == "SERVICE" ){
            elem = element.all(by.css(".show_entities > a")).get(1);
            for_css.wait_css(".show_entities > a", 2500, 1);

            elem.getAttribute('href').then(function (value) {
                let id = value.match(/\d+/g).slice(-1)[0];
                let query = "/services/highlight_service?service_id=";
                expect(value).toEqual(browser.baseUrl + query + id);
            })
        }

        if ( name == "DDS" ){
            elem = element.all(by.css(".show_entities > a")).get(2);
            for_css.wait_css(".show_entities > a", 2500, 2);

            elem.getAttribute('href').then(function (value) {
                let id = value.match(/\d+/g).slice(-1)[0];
                let query = "/fin_indicators/operations/highlight_operation?operation_id=";
                expect(value).toEqual(browser.baseUrl + query + id);
            })
        }
    },

    demand_is_distributed: function() {
        for_css.wait_id('demand_is_distributed', 2500);
        element(by.id('demand_is_distributed')).click();

        expect(element(by.id('demand_is_distributed')).getAttribute('checked')).toBeTruthy();

        for_css.wait_id('create_distribution', 2500);
        element(by.id('create_distribution')).click();
        for_css.wait_id('distribution_share', 2500);
        element(by.id('distribution_share')).sendKeys(1);
        element.all(by.css(".btn-primary")).get(0).click()

    },
    advance_payment: function() {
        for_css.wait_id('demand_is_advanced_payment', 2500);
        element(by.id('demand_is_advanced_payment')).click();
        expect(element(by.id('demand_is_advanced_payment')).getAttribute('checked')).toBeTruthy();
        for_css.wait_id('create_payment', 2500);
        element(by.id('create_payment')).click();
        for_css.wait_id('payment_amount', 2500);
        element(by.id('payment_amount')).sendKeys(101);

        element.all(by.css(".btn-primary")).get(0).click()
    },

    check_notify_for_demand: function() {
        browser.sleep(1000)
        let notify = element.all(by.css('#queue_regular_payment_notification > span > a'));
        expect(notify.get(0).isPresent()).toBe(true);

        notify.count().then(function (n) {
            for(let a = 0; a < n; a++){
                element.all(by.css('#queue_regular_payment_notification > span > a')).get(0).click();
                browser.sleep(500);
            }
            let first_notify = element(by.css('#queue_regular_payment_notification > span > a'));
            first_notify.isPresent() === true ? first_notify.click() : expect(first_notify.isPresent()).toBe(false);
        });
    }
};

