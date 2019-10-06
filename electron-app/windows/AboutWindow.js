const path = require('path');
const { BrowserWindow } = require('electron');
// We will use the next module for apropriate positioning. We should display About page in the center of the screen.
const Positioner = require('electron-positioner');

class AboutWindow {
    constructor() {

        let htmlPath = 'file://' + path.join(__dirname, '..') + '/pages/about_page.html'

        this.window = new BrowserWindow({
            show: false,
            width: 300,
            height: 336,
            frame: false,
            backgroundColor: '#E4ECEF',
            webPreferences: {
                nodeIntegration: true //enable require in html page
            }
        })

        this.window.loadURL(htmlPath);

        // About Window will disappear in blur.
        this.window.on('blur', () => {
            this.window.hide();
        });

        // On show - we should display About Window in the center of the screen.
        this.window.on('show', () => {
            let positioner = new Positioner(this.window);
            positioner.move('center');
        });
    }
}

module.exports = AboutWindow;