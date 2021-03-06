const electron = require('electron');
const ipc = electron.ipcMain;
const path = require('path');
const glob = require('glob');

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const debug = /--debug/.test(process.argv[2]);
console.log(process.argv);

function createWindow () {
  // prepare main window creation
  var windowOptions = {
    width: 800,
    height : 600,
    minWidth: 680,
    title: "My boilerplate"
  };

  // Create the browser window.
  mainWindow = new BrowserWindow(windowOptions);

  // and load the index.html of the app.
  //mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.loadURL(`file://${__dirname}/login.html`);
  //mainWindow.loadURL(`file://${__dirname}/editor.html`);

  // Launch fullscreen with DevTools open, usage: npm run debug
  if (debug) {
    console.log("DEBUG MODE ENABLED");
    mainWindow.webContents.openDevTools();
    mainWindow.maximize();
    require('devtron').install();
}

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

/**
 * Load view js into main process
 */
function loadViews () {
  require(path.join(__dirname, 'views/login/login.main.js') );
  require(path.join(__dirname, 'views/editor/editor.main.js') );
  return;

  // temporary disable
  var files = glob.sync(path.join(__dirname, 'views/**/*.main.js'));
  files.forEach(function (file) {
    console.log("[main-process] loading "+file);
    require(file);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  createWindow();
  loadViews();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipc.on('load-layout',function(event,arg){
  const layout = arg.layout;
  console.log("changing layout to "+layout);
    mainWindow.loadURL(`file://${__dirname}/${layout}.html`);
});

let credential = {
  "username" : null,
  "password" : null
};

ipc.on('req-save-credential', function(event,cred){
  credential = cred;
});

ipc.on('req-read-credential', function(event,cred){
  credential = cred;
  event.sender.send('resp-read-credential', credential);
});


function saveCredentials(username, password) {

}

function getCredentials() {
  return "ee";
}
