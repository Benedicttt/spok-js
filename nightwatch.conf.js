const seleniumServer = require('selenium-server');
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

require('nightwatch-cucumber')({
  cucumberArgs: ['--require', 'features/step_definitions','--format', 'node_modules/cucumber-pretty', '--format', 'json:reports/cucumber-report.json', 'features']
});

module.exports = {
  src_folders: "features",
  output_folder: 'reports',
  custom_assertions_path: '',
  live_output: false,
  disable_colors: false,
  test_workers: true,
  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    log_path: 'logs/',
    host: '127.0.0.1',
    port: 4444,
    // cli_args: {
    //   "webdriver.chrome.driver": "./node_modules/chromedriver/bin/chromedriver",
    //   "webdriver.gecko.driver": "./node_modules/geckodriver/bin/geckodriver"
    // }
  },
  test_settings: {
    default: {
      launch_url: 'http://localhost:3000',
      selenium_port: 4444,
      selenium_host: '127.0.0.1',
      desiredCapabilities: {
        browserName: 'firefox',
			  marionette: true
      },
      screenshots : {
        enabled: true,
        on_error: true,
        on_failure: true,
        path: './screenshots/default_firefox'
      },
    },
    chrome: {
			desiredCapabilities: {
        browserName: "chrome",
				javascriptEnabled: true
      },
      screenshots : {
        enabled: true,
        on_error: true,
        on_failure: true,
        path: './screenshots/chrome'
      }			
		},

		chrome_headless: {
      desiredCapabilities: {
        browserName: "chrome",
        javascriptEnabled: true,
        chromeOptions: {
          args: [
              "headless",
              "disable-web-security",
              "ignore-certificate-errors",
              "no-sandbox", 
              "disable-gpu"
            ]
          },
      },
      screenshots : {
        enabled: true,
        on_error: true,
        on_failure: true,
        path: './screenshots/chrome_headless'
      }
		},

		firefox: {
			desiredCapabilities: {
			  browserName: "firefox",
			  marionette: true
      },
      screenshots : {
        enabled: true,
        on_error: true,
        on_failure: true,
        path: './screenshots/firefox'
      }
    }
  }
};
