(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function anonymous(__ENV
) {
class Variable {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

class VariableFrame {
    constructor(parent) {
        this.parent = parent;
        this.vars = {};
    }

    get(name, silent) {
        let result = null;
        if (this.vars[name]) {
            result = this.vars[name];
        } else if (this.parent) {
            result = this.parent.get(name, silent);
        }
        if (result === null && !silent) throw new Error('a variable of name \''+name+'\' does not exist in this context');
        return result;
    }

    set(name, value) {
        this.vars[name] = new Variable(name, value);
    }
}

class Stage {
    constructor(name, variables, customBlocks) {
        this.name = name;
        this.variables = new VariableFrame(variables);
        this.customBlocks = new VariableFrame(project.customBlocks);
        this.isSprite = false;
        this.variables.set('__SELF', this);
        this.project = project;
    }

    onFlagPressed() {
    }

    onUserEventReceived (event) {
    }

    emit(event, wait) {
        if (wait) {
            return project.sprites.concat([project.stage])
                .map(obj => obj.onUserEventReceived(event));
        } else {
            setTimeout(() => {
                project.sprites.concat([project.stage])
                    .forEach(obj => obj.onUserEventReceived(event));
            }, 0);
        }
    }

    getTimerStart() {
        return project.timerStart;
    }

    resetTimer() {
        project.timerStart = Date.now();
    }

    getTempo() {
        return project.tempo;
    }

    setTempo(bpm) {
        return project.tempo = Math.max(20, (+bpm || 0));
    }
}

class Sprite extends Stage {
    constructor(name, variables, customBlocks) {
        super(name, variables, customBlocks);
        this.clones = [];
        this.isSprite = true;
        this.xPosition = 0;
        this.yPosition = 0;
        this.direction = 90;
        this.costume = 0;
        this.size = 100;
    }

    clone() {
        let clone = Object.create(this);
        this.clones.push(clone);
        clone.onCloneStart();
    }
}

__ENV = __ENV || this;
var project = {
    variables: new VariableFrame(),
    customBlocks: new VariableFrame(),
    timerStart: null,
    tempo: 60,
    sprites: []
};
project.stage = new Stage(unescape('Stage'), project.variables, project.customBlocks);
let DEFAULT_CONTEXT = new VariableFrame(project.stage.variables);

var sprite;

sprite = new Sprite(unescape('Sprite'), project.variables, project.customBlocks);
sprite.xPosition = 0;
sprite.yPosition = 0;
sprite.direction = 90;
sprite.draggable = true;
sprite.rotation = 1;
sprite.size = 100;
sprite.costumeIdx = 0;
project.sprites.push(sprite);




project.stage.onFlagPressed = async function() {
    var self = this;


    return Promise.all([
    ]);
};

project.stage.onUserEventReceived = function(event) {
    var self = this;


    return Promise.all([
    ]);
};

project.stage.onKeyPressed = function(key) {
    var self = this;

};
// Initialize content references
var self = project;
SNAP2JS_REFERENCES = [];
project.variables.set('SNAP2JS_REFERENCES', SNAP2JS_REFERENCES);


// for each sprite...
var sprite;

sprite = project.sprites[0];



sprite.onFlagPressed = function() {
    var self = this;

    const handler_0 = (async function() {
let DEFAULT_CONTEXT = new VariableFrame(self.variables);
  __ENV.doSwitchToCostume.call(self, unescape('Turtle'), DEFAULT_CONTEXT)  ;  __ENV.doWearNextCostume.call(self, DEFAULT_CONTEXT)  ;  __ENV.bubble.call(self, unescape('Hello%21'), DEFAULT_CONTEXT)  ;  await __ENV.doSayFor.call(self, unescape('Hello%21'), unescape('0.01'), DEFAULT_CONTEXT)  ;  __ENV.doThink.call(self, unescape('Hmm...'), DEFAULT_CONTEXT)  ;  await __ENV.doThinkFor.call(self, unescape('Hmm...'), unescape('0.01'), DEFAULT_CONTEXT)  ;  __ENV.changeEffect.call(self, unescape('fisheye'), unescape('25'), DEFAULT_CONTEXT)  ;  __ENV.setEffect.call(self, unescape('whirl'), unescape('0'), DEFAULT_CONTEXT)  ;  __ENV.clearEffects.call(self, DEFAULT_CONTEXT)  ;  __ENV.changeScale.call(self, unescape('10'), DEFAULT_CONTEXT)  ;  __ENV.setScale.call(self, unescape('80'), DEFAULT_CONTEXT)  ;  __ENV.show.call(self, DEFAULT_CONTEXT)  ;  __ENV.hide.call(self, DEFAULT_CONTEXT)  ;  __ENV.goBack.call(self, unescape('1'), DEFAULT_CONTEXT)  ;  __ENV.comeToFront.call(self, DEFAULT_CONTEXT)  ;  ;return __ENV.doReport.call(self, __ENV.reportNewList.call(self, [__ENV.getScale.call(self, DEFAULT_CONTEXT), __ENV.getCostumeIdx.call(self, DEFAULT_CONTEXT)], DEFAULT_CONTEXT), DEFAULT_CONTEXT)  ;
})();

    return Promise.all([
handler_0,
    ]);
};

sprite.onKeyPressed = function(key) {
    var self = this;

};

sprite.onUserEventReceived = function(event) {
    var self = this;


    return Promise.all([
    ]);
};

sprite.onCloneStart = function(event) {
    var self = this;

};

sprite.onEventReceived = function(event) {
    var self = this;

    if (event === 'clicked') {
        // Add code for the given event...
        // TODO
    }
};

sprite.checkConditions = function() {
    var self = this;

    // TODO: add arbitrary hat block code here
};


project.timerStart = Date.now();
__ENV.__start(project, __ENV);







return Promise.all(project.sprites.concat(project.stage).map(sprite => sprite.onFlagPressed()));


})(require('./src\\context\\cli'))
},{"./src\\context\\cli":6}],2:[function(require,module,exports){
(function (__dirname){
/*
 * readlineSync
 * https://github.com/anseki/readline-sync
 *
 * Copyright (c) 2019 anseki
 * Licensed under the MIT license.
 */

'use strict';

var
  IS_WIN = process.platform === 'win32',

  ALGORITHM_CIPHER = 'aes-256-cbc',
  ALGORITHM_HASH = 'sha256',
  DEFAULT_ERR_MSG = 'The current environment doesn\'t support interactive reading from TTY.',

  fs = require('fs'),
  TTY = process.binding('tty_wrap').TTY,
  childProc = require('child_process'),
  pathUtil = require('path'),

  defaultOptions = {
    /* eslint-disable key-spacing */
    prompt:             '> ',
    hideEchoBack:       false,
    mask:               '*',
    limit:              [],
    limitMessage:       'Input another, please.$<( [)limit(])>',
    defaultInput:       '',
    trueValue:          [],
    falseValue:         [],
    caseSensitive:      false,
    keepWhitespace:     false,
    encoding:           'utf8',
    bufferSize:         1024,
    print:              void 0,
    history:            true,
    cd:                 false,
    phContent:          void 0,
    preCheck:           void 0
    /* eslint-enable key-spacing */
  },

  fdR = 'none',
  isRawMode = false,
  salt = 0,
  lastInput = '',
  inputHistory = [],
  _DBG_useExt = false,
  _DBG_checkOptions = false,
  _DBG_checkMethod = false,
  fdW, ttyR, extHostPath, extHostArgs, tempdir, rawInput;

function getHostArgs(options) {
  // Send any text to crazy Windows shell safely.
  function encodeArg(arg) {
    return arg.replace(/[^\w\u0080-\uFFFF]/g, function(chr) {
      return '#' + chr.charCodeAt(0) + ';';
    });
  }

  return extHostArgs.concat((function(conf) {
    var args = [];
    Object.keys(conf).forEach(function(optionName) {
      if (conf[optionName] === 'boolean') {
        if (options[optionName]) { args.push('--' + optionName); }
      } else if (conf[optionName] === 'string') {
        if (options[optionName]) {
          args.push('--' + optionName, encodeArg(options[optionName]));
        }
      }
    });
    return args;
  })({
    /* eslint-disable key-spacing */
    display:        'string',
    displayOnly:    'boolean',
    keyIn:          'boolean',
    hideEchoBack:   'boolean',
    mask:           'string',
    limit:          'string',
    caseSensitive:  'boolean'
    /* eslint-enable key-spacing */
  }));
}

// piping via files (for Node.js v0.10-)
function _execFileSync(options, execOptions) {

  function getTempfile(name) {
    var suffix = '',
      filepath, fd;
    tempdir = tempdir || require('os').tmpdir();

    while (true) {
      filepath = pathUtil.join(tempdir, name + suffix);
      try {
        fd = fs.openSync(filepath, 'wx');
      } catch (e) {
        if (e.code === 'EEXIST') {
          suffix++;
          continue;
        } else {
          throw e;
        }
      }
      fs.closeSync(fd);
      break;
    }
    return filepath;
  }

  var res = {},
    pathStdout = getTempfile('readline-sync.stdout'),
    pathStderr = getTempfile('readline-sync.stderr'),
    pathExit = getTempfile('readline-sync.exit'),
    pathDone = getTempfile('readline-sync.done'),
    crypto = require('crypto'),
    hostArgs, shellPath, shellArgs, exitCode, extMessage, shasum, decipher, password;

  shasum = crypto.createHash(ALGORITHM_HASH);
  shasum.update('' + process.pid + (salt++) + Math.random());
  password = shasum.digest('hex');
  decipher = crypto.createDecipher(ALGORITHM_CIPHER, password);

  hostArgs = getHostArgs(options);
  if (IS_WIN) {
    shellPath = process.env.ComSpec || 'cmd.exe';
    process.env.Q = '"'; // The quote (") that isn't escaped.
    // `()` for ignore space by echo
    shellArgs = ['/V:ON', '/S', '/C',
      '(%Q%' + shellPath + '%Q% /V:ON /S /C %Q%' + /* ESLint bug? */ // eslint-disable-line no-path-concat
        '%Q%' + extHostPath + '%Q%' +
          hostArgs.map(function(arg) { return ' %Q%' + arg + '%Q%'; }).join('') +
        ' & (echo !ERRORLEVEL!)>%Q%' + pathExit + '%Q%%Q%) 2>%Q%' + pathStderr + '%Q%' +
      ' |%Q%' + process.execPath + '%Q% %Q%' + __dirname + '\\encrypt.js%Q%' +
        ' %Q%' + ALGORITHM_CIPHER + '%Q% %Q%' + password + '%Q%' +
        ' >%Q%' + pathStdout + '%Q%' +
      ' & (echo 1)>%Q%' + pathDone + '%Q%'];
  } else {
    shellPath = '/bin/sh';
    shellArgs = ['-c',
      // Use `()`, not `{}` for `-c` (text param)
      '("' + extHostPath + '"' + /* ESLint bug? */ // eslint-disable-line no-path-concat
          hostArgs.map(function(arg) { return " '" + arg.replace(/'/g, "'\\''") + "'"; }).join('') +
        '; echo $?>"' + pathExit + '") 2>"' + pathStderr + '"' +
      ' |"' + process.execPath + '" "' + __dirname + '/encrypt.js"' +
        ' "' + ALGORITHM_CIPHER + '" "' + password + '"' +
        ' >"' + pathStdout + '"' +
      '; echo 1 >"' + pathDone + '"'];
  }
  if (_DBG_checkMethod) { _DBG_checkMethod('_execFileSync', hostArgs); }
  try {
    childProc.spawn(shellPath, shellArgs, execOptions);
  } catch (e) {
    res.error = new Error(e.message);
    res.error.method = '_execFileSync - spawn';
    res.error.program = shellPath;
    res.error.args = shellArgs;
  }

  while (fs.readFileSync(pathDone, {encoding: options.encoding}).trim() !== '1') {} // eslint-disable-line no-empty
  if ((exitCode =
      fs.readFileSync(pathExit, {encoding: options.encoding}).trim()) === '0') {
    res.input =
      decipher.update(fs.readFileSync(pathStdout, {encoding: 'binary'}),
        'hex', options.encoding) +
      decipher.final(options.encoding);
  } else {
    extMessage = fs.readFileSync(pathStderr, {encoding: options.encoding}).trim();
    res.error = new Error(DEFAULT_ERR_MSG + (extMessage ? '\n' + extMessage : ''));
    res.error.method = '_execFileSync';
    res.error.program = shellPath;
    res.error.args = shellArgs;
    res.error.extMessage = extMessage;
    res.error.exitCode = +exitCode;
  }

  fs.unlinkSync(pathStdout);
  fs.unlinkSync(pathStderr);
  fs.unlinkSync(pathExit);
  fs.unlinkSync(pathDone);

  return res;
}

function readlineExt(options) {
  var res = {},
    execOptions = {env: process.env, encoding: options.encoding},
    hostArgs, extMessage;

  if (!extHostPath) {
    if (IS_WIN) {
      if (process.env.PSModulePath) { // Windows PowerShell
        extHostPath = 'powershell.exe';
        extHostArgs = ['-ExecutionPolicy', 'Bypass',
          '-File', __dirname + '\\read.ps1']; // eslint-disable-line no-path-concat
      } else { // Windows Script Host
        extHostPath = 'cscript.exe';
        extHostArgs = ['//nologo', __dirname + '\\read.cs.js']; // eslint-disable-line no-path-concat
      }
    } else {
      extHostPath = '/bin/sh';
      extHostArgs = [__dirname + '/read.sh']; // eslint-disable-line no-path-concat
    }
  }
  if (IS_WIN && !process.env.PSModulePath) { // Windows Script Host
    // ScriptPW (Win XP and Server2003) needs TTY stream as STDIN.
    // In this case, If STDIN isn't TTY, an error is thrown.
    execOptions.stdio = [process.stdin];
  }

  if (childProc.execFileSync) {
    hostArgs = getHostArgs(options);
    if (_DBG_checkMethod) { _DBG_checkMethod('execFileSync', hostArgs); }
    try {
      res.input = childProc.execFileSync(extHostPath, hostArgs, execOptions);
    } catch (e) { // non-zero exit code
      extMessage = e.stderr ? (e.stderr + '').trim() : '';
      res.error = new Error(DEFAULT_ERR_MSG + (extMessage ? '\n' + extMessage : ''));
      res.error.method = 'execFileSync';
      res.error.program = extHostPath;
      res.error.args = hostArgs;
      res.error.extMessage = extMessage;
      res.error.exitCode = e.status;
      res.error.code = e.code;
      res.error.signal = e.signal;
    }
  } else {
    res = _execFileSync(options, execOptions);
  }
  if (!res.error) {
    res.input = res.input.replace(/^\s*'|'\s*$/g, '');
    options.display = '';
  }

  return res;
}

/*
  display:            string
  displayOnly:        boolean
  keyIn:              boolean
  hideEchoBack:       boolean
  mask:               string
  limit:              string (pattern)
  caseSensitive:      boolean
  keepWhitespace:     boolean
  encoding, bufferSize, print
*/
function _readlineSync(options) {
  var input = '',
    displaySave = options.display,
    silent = !options.display && options.keyIn && options.hideEchoBack && !options.mask;

  function tryExt() {
    var res = readlineExt(options);
    if (res.error) { throw res.error; }
    return res.input;
  }

  if (_DBG_checkOptions) { _DBG_checkOptions(options); }

  (function() { // open TTY
    var fsB, constants, verNum;

    function getFsB() {
      if (!fsB) {
        fsB = process.binding('fs'); // For raw device path
        constants = process.binding('constants');
        // for v6.3.0+
        constants = constants && constants.fs && typeof constants.fs.O_RDWR === 'number'
          ? constants.fs : constants;
      }
      return fsB;
    }

    if (typeof fdR !== 'string') { return; }
    fdR = null;

    if (IS_WIN) {
      // iojs-v2.3.2+ input stream can't read first line. (#18)
      // ** Don't get process.stdin before check! **
      // Fixed v5.1.0
      // Fixed v4.2.4
      // It regressed again in v5.6.0, it is fixed in v6.2.0.
      verNum = (function(ver) { // getVerNum
        var nums = ver.replace(/^\D+/, '').split('.');
        var verNum = 0;
        if ((nums[0] = +nums[0])) { verNum += nums[0] * 10000; }
        if ((nums[1] = +nums[1])) { verNum += nums[1] * 100; }
        if ((nums[2] = +nums[2])) { verNum += nums[2]; }
        return verNum;
      })(process.version);
      if (!(verNum >= 20302 && verNum < 40204 || verNum >= 50000 && verNum < 50100 || verNum >= 50600 && verNum < 60200) &&
          process.stdin.isTTY) {
        process.stdin.pause();
        fdR = process.stdin.fd;
        ttyR = process.stdin._handle;
      } else {
        try {
          // The stream by fs.openSync('\\\\.\\CON', 'r') can't switch to raw mode.
          // 'CONIN$' might fail on XP, 2000, 7 (x86).
          fdR = getFsB().open('CONIN$', constants.O_RDWR, parseInt('0666', 8));
          ttyR = new TTY(fdR, true);
        } catch (e) { /* ignore */ }
      }

      if (process.stdout.isTTY) {
        fdW = process.stdout.fd;
      } else {
        try {
          fdW = fs.openSync('\\\\.\\CON', 'w');
        } catch (e) { /* ignore */ }
        if (typeof fdW !== 'number') { // Retry
          try {
            fdW = getFsB().open('CONOUT$', constants.O_RDWR, parseInt('0666', 8));
          } catch (e) { /* ignore */ }
        }
      }

    } else {
      if (process.stdin.isTTY) {
        process.stdin.pause();
        try {
          fdR = fs.openSync('/dev/tty', 'r'); // device file, not process.stdin
          ttyR = process.stdin._handle;
        } catch (e) { /* ignore */ }
      } else {
        // Node.js v0.12 read() fails.
        try {
          fdR = fs.openSync('/dev/tty', 'r');
          ttyR = new TTY(fdR, false);
        } catch (e) { /* ignore */ }
      }

      if (process.stdout.isTTY) {
        fdW = process.stdout.fd;
      } else {
        try {
          fdW = fs.openSync('/dev/tty', 'w');
        } catch (e) { /* ignore */ }
      }
    }
  })();

  (function() { // try read
    var isCooked = !options.hideEchoBack && !options.keyIn,
      atEol, limit, buffer, reqSize, readSize, chunk, line;
    rawInput = '';

    // Node.js v0.10- returns an error if same mode is set.
    function setRawMode(mode) {
      if (mode === isRawMode) { return true; }
      if (ttyR.setRawMode(mode) !== 0) { return false; }
      isRawMode = mode;
      return true;
    }

    if (_DBG_useExt || !ttyR ||
        typeof fdW !== 'number' && (options.display || !isCooked)) {
      input = tryExt();
      return;
    }

    if (options.display) {
      fs.writeSync(fdW, options.display);
      options.display = '';
    }
    if (options.displayOnly) { return; }

    if (!setRawMode(!isCooked)) {
      input = tryExt();
      return;
    }

    reqSize = options.keyIn ? 1 : options.bufferSize;
    // Check `allocUnsafe` to make sure of the new API.
    buffer = Buffer.allocUnsafe && Buffer.alloc ? Buffer.alloc(reqSize) : new Buffer(reqSize);

    if (options.keyIn && options.limit) {
      limit = new RegExp('[^' + options.limit + ']',
        'g' + (options.caseSensitive ? '' : 'i'));
    }

    while (true) {
      readSize = 0;
      try {
        readSize = fs.readSync(fdR, buffer, 0, reqSize);
      } catch (e) {
        if (e.code !== 'EOF') {
          setRawMode(false);
          input += tryExt();
          return;
        }
      }
      if (readSize > 0) {
        chunk = buffer.toString(options.encoding, 0, readSize);
        rawInput += chunk;
      } else {
        chunk = '\n';
        rawInput += String.fromCharCode(0);
      }

      if (chunk && typeof (line = (chunk.match(/^(.*?)[\r\n]/) || [])[1]) === 'string') {
        chunk = line;
        atEol = true;
      }

      // other ctrl-chars
      // eslint-disable-next-line no-control-regex
      if (chunk) { chunk = chunk.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, ''); }
      if (chunk && limit) { chunk = chunk.replace(limit, ''); }

      if (chunk) {
        if (!isCooked) {
          if (!options.hideEchoBack) {
            fs.writeSync(fdW, chunk);
          } else if (options.mask) {
            fs.writeSync(fdW, (new Array(chunk.length + 1)).join(options.mask));
          }
        }
        input += chunk;
      }

      if (!options.keyIn && atEol ||
        options.keyIn && input.length >= reqSize) { break; }
    }

    if (!isCooked && !silent) { fs.writeSync(fdW, '\n'); }
    setRawMode(false);
  })();

  if (options.print && !silent) {
    options.print(
      displaySave + (
        options.displayOnly ? '' : (
          options.hideEchoBack ? (new Array(input.length + 1)).join(options.mask) : input
        ) + '\n' // must at least write '\n'
      ),
      options.encoding);
  }

  return options.displayOnly ? '' :
    (lastInput = options.keepWhitespace || options.keyIn ? input : input.trim());
}

function flattenArray(array, validator) {
  var flatArray = [];
  function _flattenArray(array) {
    if (array == null) { return; }
    if (Array.isArray(array)) {
      array.forEach(_flattenArray);
    } else if (!validator || validator(array)) {
      flatArray.push(array);
    }
  }
  _flattenArray(array);
  return flatArray;
}

function escapePattern(pattern) {
  return pattern.replace(/[\x00-\x7f]/g, // eslint-disable-line no-control-regex
    function(s) { return '\\x' + ('00' + s.charCodeAt().toString(16)).substr(-2); });
}

// margeOptions(options1, options2 ... )
// margeOptions(true, options1, options2 ... )
//    arg1=true : Start from defaultOptions and pick elements of that.
function margeOptions() {
  var optionsList = Array.prototype.slice.call(arguments),
    optionNames, fromDefault;

  if (optionsList.length && typeof optionsList[0] === 'boolean') {
    fromDefault = optionsList.shift();
    if (fromDefault) {
      optionNames = Object.keys(defaultOptions);
      optionsList.unshift(defaultOptions);
    }
  }

  return optionsList.reduce(function(options, optionsPart) {
    if (optionsPart == null) { return options; }

    // ======== DEPRECATED ========
    if (optionsPart.hasOwnProperty('noEchoBack') &&
        !optionsPart.hasOwnProperty('hideEchoBack')) {
      optionsPart.hideEchoBack = optionsPart.noEchoBack;
      delete optionsPart.noEchoBack;
    }
    if (optionsPart.hasOwnProperty('noTrim') &&
        !optionsPart.hasOwnProperty('keepWhitespace')) {
      optionsPart.keepWhitespace = optionsPart.noTrim;
      delete optionsPart.noTrim;
    }
    // ======== /DEPRECATED ========

    if (!fromDefault) { optionNames = Object.keys(optionsPart); }
    optionNames.forEach(function(optionName) {
      var value;
      if (!optionsPart.hasOwnProperty(optionName)) { return; }
      value = optionsPart[optionName];
      /* eslint-disable no-multi-spaces */
      switch (optionName) {
        //                    _readlineSync <- *    * -> defaultOptions
        // ================ string
        case 'mask':                        // *    *
        case 'limitMessage':                //      *
        case 'defaultInput':                //      *
        case 'encoding':                    // *    *
          value = value != null ? value + '' : '';
          if (value && optionName !== 'limitMessage') { value = value.replace(/[\r\n]/g, ''); }
          options[optionName] = value;
          break;
        // ================ number(int)
        case 'bufferSize':                  // *    *
          if (!isNaN(value = parseInt(value, 10)) && typeof value === 'number') {
            options[optionName] = value; // limited updating (number is needed)
          }
          break;
        // ================ boolean
        case 'displayOnly':                 // *
        case 'keyIn':                       // *
        case 'hideEchoBack':                // *    *
        case 'caseSensitive':               // *    *
        case 'keepWhitespace':              // *    *
        case 'history':                     //      *
        case 'cd':                          //      *
          options[optionName] = !!value;
          break;
        // ================ array
        case 'limit':                       // *    *     to string for readlineExt
        case 'trueValue':                   //      *
        case 'falseValue':                  //      *
          options[optionName] = flattenArray(value, function(value) {
            var type = typeof value;
            return type === 'string' || type === 'number' ||
              type === 'function' || value instanceof RegExp;
          }).map(function(value) {
            return typeof value === 'string' ? value.replace(/[\r\n]/g, '') : value;
          });
          break;
        // ================ function
        case 'print':                       // *    *
        case 'phContent':                   //      *
        case 'preCheck':                    //      *
          options[optionName] = typeof value === 'function' ? value : void 0;
          break;
        // ================ other
        case 'prompt':                      //      *
        case 'display':                     // *
          options[optionName] = value != null ? value : '';
          break;
        // no default
      }
      /* eslint-enable no-multi-spaces */
    });
    return options;
  }, {});
}

function isMatched(res, comps, caseSensitive) {
  return comps.some(function(comp) {
    var type = typeof comp;
    return type === 'string'
      ? (caseSensitive ? res === comp : res.toLowerCase() === comp.toLowerCase()) :
      type === 'number' ? parseFloat(res) === comp :
      type === 'function' ? comp(res) :
      comp instanceof RegExp ? comp.test(res) : false;
  });
}

function replaceHomePath(path, expand) {
  var homePath = pathUtil.normalize(
    IS_WIN ? (process.env.HOMEDRIVE || '') + (process.env.HOMEPATH || '') :
    process.env.HOME || '').replace(/[/\\]+$/, '');
  path = pathUtil.normalize(path);
  return expand ? path.replace(/^~(?=\/|\\|$)/, homePath) :
    path.replace(new RegExp('^' + escapePattern(homePath) +
      '(?=\\/|\\\\|$)', IS_WIN ? 'i' : ''), '~');
}

function replacePlaceholder(text, generator) {
  var PTN_INNER = '(?:\\(([\\s\\S]*?)\\))?(\\w+|.-.)(?:\\(([\\s\\S]*?)\\))?',
    rePlaceholder = new RegExp('(\\$)?(\\$<' + PTN_INNER + '>)', 'g'),
    rePlaceholderCompat = new RegExp('(\\$)?(\\$\\{' + PTN_INNER + '\\})', 'g');

  function getPlaceholderText(s, escape, placeholder, pre, param, post) {
    var text;
    return escape || typeof (text = generator(param)) !== 'string' ? placeholder :
      text ? (pre || '') + text + (post || '') : '';
  }

  return text.replace(rePlaceholder, getPlaceholderText)
    .replace(rePlaceholderCompat, getPlaceholderText);
}

function array2charlist(array, caseSensitive, collectSymbols) {
  var group = [],
    groupClass = -1,
    charCode = 0,
    symbols = '',
    values, suppressed;
  function addGroup(groups, group) {
    if (group.length > 3) { // ellipsis
      groups.push(group[0] + '...' + group[group.length - 1]);
      suppressed = true;
    } else if (group.length) {
      groups = groups.concat(group);
    }
    return groups;
  }

  values = array.reduce(function(chars, value) {
    return chars.concat((value + '').split(''));
  }, []).reduce(function(groups, curChar) {
    var curGroupClass, curCharCode;
    if (!caseSensitive) { curChar = curChar.toLowerCase(); }
    curGroupClass = /^\d$/.test(curChar) ? 1 :
      /^[A-Z]$/.test(curChar) ? 2 : /^[a-z]$/.test(curChar) ? 3 : 0;
    if (collectSymbols && curGroupClass === 0) {
      symbols += curChar;
    } else {
      curCharCode = curChar.charCodeAt(0);
      if (curGroupClass && curGroupClass === groupClass &&
          curCharCode === charCode + 1) {
        group.push(curChar);
      } else {
        groups = addGroup(groups, group);
        group = [curChar];
        groupClass = curGroupClass;
      }
      charCode = curCharCode;
    }
    return groups;
  }, []);
  values = addGroup(values, group); // last group
  if (symbols) { values.push(symbols); suppressed = true; }
  return {values: values, suppressed: suppressed};
}

function joinChunks(chunks, suppressed) {
  return chunks.join(chunks.length > 2 ? ', ' : suppressed ? ' / ' : '/');
}

function getPhContent(param, options) {
  var resCharlist = {},
    text, values, arg;
  if (options.phContent) {
    text = options.phContent(param, options);
  }
  if (typeof text !== 'string') {
    switch (param) {
      case 'hideEchoBack':
      case 'mask':
      case 'defaultInput':
      case 'caseSensitive':
      case 'keepWhitespace':
      case 'encoding':
      case 'bufferSize':
      case 'history':
      case 'cd':
        text = !options.hasOwnProperty(param) ? '' :
          typeof options[param] === 'boolean' ? (options[param] ? 'on' : 'off') :
          options[param] + '';
        break;
      // case 'prompt':
      // case 'query':
      // case 'display':
      //   text = options.hasOwnProperty('displaySrc') ? options.displaySrc + '' : '';
      //   break;
      case 'limit':
      case 'trueValue':
      case 'falseValue':
        values = options[options.hasOwnProperty(param + 'Src') ? param + 'Src' : param];
        if (options.keyIn) { // suppress
          resCharlist = array2charlist(values, options.caseSensitive);
          values = resCharlist.values;
        } else {
          values = values.filter(function(value) {
            var type = typeof value;
            return type === 'string' || type === 'number';
          });
        }
        text = joinChunks(values, resCharlist.suppressed);
        break;
      case 'limitCount':
      case 'limitCountNotZero':
        text = options[options.hasOwnProperty('limitSrc') ? 'limitSrc' : 'limit'].length;
        text = text || param !== 'limitCountNotZero' ? text + '' : '';
        break;
      case 'lastInput':
        text = lastInput;
        break;
      case 'cwd':
      case 'CWD':
      case 'cwdHome':
        text = process.cwd();
        if (param === 'CWD') {
          text = pathUtil.basename(text);
        } else if (param === 'cwdHome') {
          text = replaceHomePath(text);
        }
        break;
      case 'date':
      case 'time':
      case 'localeDate':
      case 'localeTime':
        text = (new Date())['to' +
          param.replace(/^./, function(str) { return str.toUpperCase(); }) +
          'String']();
        break;
      default: // with arg
        if (typeof (arg = (param.match(/^history_m(\d+)$/) || [])[1]) === 'string') {
          text = inputHistory[inputHistory.length - arg] || '';
        }
    }
  }
  return text;
}

function getPhCharlist(param) {
  var matches = /^(.)-(.)$/.exec(param),
    text = '',
    from, to, code, step;
  if (!matches) { return null; }
  from = matches[1].charCodeAt(0);
  to = matches[2].charCodeAt(0);
  step = from < to ? 1 : -1;
  for (code = from; code !== to + step; code += step) { text += String.fromCharCode(code); }
  return text;
}

// cmd "arg" " a r g " "" 'a"r"g' "a""rg" "arg
function parseCl(cl) {
  var reToken = new RegExp(/(\s*)(?:("|')(.*?)(?:\2|$)|(\S+))/g),
    taken = '',
    args = [],
    matches, part;
  cl = cl.trim();
  while ((matches = reToken.exec(cl))) {
    part = matches[3] || matches[4] || '';
    if (matches[1]) {
      args.push(taken);
      taken = '';
    }
    taken += part;
  }
  if (taken) { args.push(taken); }
  return args;
}

function toBool(res, options) {
  return (
    (options.trueValue.length &&
      isMatched(res, options.trueValue, options.caseSensitive)) ? true :
    (options.falseValue.length &&
      isMatched(res, options.falseValue, options.caseSensitive)) ? false : res);
}

function getValidLine(options) {
  var res, forceNext, limitMessage,
    matches, histInput, args, resCheck;

  function _getPhContent(param) { return getPhContent(param, options); }
  function addDisplay(text) { options.display += (/[^\r\n]$/.test(options.display) ? '\n' : '') + text; }

  options.limitSrc = options.limit;
  options.displaySrc = options.display;
  options.limit = ''; // for readlineExt
  options.display = replacePlaceholder(options.display + '', _getPhContent);

  while (true) {
    res = _readlineSync(options);
    forceNext = false;
    limitMessage = '';

    if (options.defaultInput && !res) { res = options.defaultInput; }

    if (options.history) {
      if ((matches = /^\s*!(?:!|-1)(:p)?\s*$/.exec(res))) { // `!!` `!-1` +`:p`
        histInput = inputHistory[0] || '';
        if (matches[1]) { // only display
          forceNext = true;
        } else { // replace input
          res = histInput;
        }
        // Show it even if it is empty (NL only).
        addDisplay(histInput + '\n');
        if (!forceNext) { // Loop may break
          options.displayOnly = true;
          _readlineSync(options);
          options.displayOnly = false;
        }
      } else if (res && res !== inputHistory[inputHistory.length - 1]) {
        inputHistory = [res];
      }
    }

    if (!forceNext && options.cd && res) {
      args = parseCl(res);
      switch (args[0].toLowerCase()) {
        case 'cd':
          if (args[1]) {
            try {
              process.chdir(replaceHomePath(args[1], true));
            } catch (e) {
              addDisplay(e + '');
            }
          }
          forceNext = true;
          break;
        case 'pwd':
          addDisplay(process.cwd());
          forceNext = true;
          break;
        // no default
      }
    }

    if (!forceNext && options.preCheck) {
      resCheck = options.preCheck(res, options);
      res = resCheck.res;
      if (resCheck.forceNext) { forceNext = true; } // Don't switch to false.
    }

    if (!forceNext) {
      if (!options.limitSrc.length ||
        isMatched(res, options.limitSrc, options.caseSensitive)) { break; }
      if (options.limitMessage) {
        limitMessage = replacePlaceholder(options.limitMessage, _getPhContent);
      }
    }

    addDisplay((limitMessage ? limitMessage + '\n' : '') +
      replacePlaceholder(options.displaySrc + '', _getPhContent));
  }
  return toBool(res, options);
}

// for dev
exports._DBG_set_useExt = function(val) { _DBG_useExt = val; };
exports._DBG_set_checkOptions = function(val) { _DBG_checkOptions = val; };
exports._DBG_set_checkMethod = function(val) { _DBG_checkMethod = val; };
exports._DBG_clearHistory = function() { lastInput = ''; inputHistory = []; };

// ------------------------------------

exports.setDefaultOptions = function(options) {
  defaultOptions = margeOptions(true, options);
  return margeOptions(true); // copy
};

exports.question = function(query, options) {
  /* eslint-disable key-spacing */
  return getValidLine(margeOptions(margeOptions(true, options), {
    display:            query
  }));
  /* eslint-enable key-spacing */
};

exports.prompt = function(options) {
  var readOptions = margeOptions(true, options);
  readOptions.display = readOptions.prompt;
  return getValidLine(readOptions);
};

exports.keyIn = function(query, options) {
  /* eslint-disable key-spacing */
  var readOptions = margeOptions(margeOptions(true, options), {
    display:            query,
    keyIn:              true,
    keepWhitespace:     true
  });
  /* eslint-enable key-spacing */

  // char list
  readOptions.limitSrc = readOptions.limit.filter(function(value) {
    var type = typeof value;
    return type === 'string' || type === 'number';
  }).map(function(text) {
    return replacePlaceholder(text + '', getPhCharlist);
  });
  // pattern
  readOptions.limit = escapePattern(readOptions.limitSrc.join(''));

  ['trueValue', 'falseValue'].forEach(function(optionName) {
    readOptions[optionName] = readOptions[optionName].reduce(function(comps, comp) {
      var type = typeof comp;
      if (type === 'string' || type === 'number') {
        comps = comps.concat((comp + '').split(''));
      } else { comps.push(comp); }
      return comps;
    }, []);
  });

  readOptions.display = replacePlaceholder(readOptions.display + '',
    function(param) { return getPhContent(param, readOptions); });

  return toBool(_readlineSync(readOptions), readOptions);
};

// ------------------------------------

exports.questionEMail = function(query, options) {
  if (query == null) { query = 'Input e-mail address: '; }
  /* eslint-disable key-spacing */
  return exports.question(query, margeOptions({
    // -------- default
    hideEchoBack:       false,
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
    limit:              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    limitMessage:       'Input valid e-mail address, please.',
    trueValue:          null,
    falseValue:         null
  }, options, {
    // -------- forced
    keepWhitespace:     false,
    cd:                 false
  }));
  /* eslint-enable key-spacing */
};

exports.questionNewPassword = function(query, options) {
  /* eslint-disable key-spacing */
  var resCharlist, min, max,
    readOptions = margeOptions({
      // -------- default
      hideEchoBack:       true,
      mask:               '*',
      limitMessage:       'It can include: $<charlist>\n' +
                            'And the length must be: $<length>',
      trueValue:          null,
      falseValue:         null,
      caseSensitive:      true
    }, options, {
      // -------- forced
      history:            false,
      cd:                 false,
      // limit (by charlist etc.),
      phContent: function(param) {
        return param === 'charlist' ? resCharlist.text :
          param === 'length' ? min + '...' + max : null;
      }
    }),
    // added:     charlist, min, max, confirmMessage, unmatchMessage
    charlist, confirmMessage, unmatchMessage,
    limit, limitMessage, res1, res2;
  /* eslint-enable key-spacing */
  options = options || {};

  charlist = replacePlaceholder(
    options.charlist ? options.charlist + '' : '$<!-~>', getPhCharlist);
  if (isNaN(min = parseInt(options.min, 10)) || typeof min !== 'number') { min = 12; }
  if (isNaN(max = parseInt(options.max, 10)) || typeof max !== 'number') { max = 24; }
  limit = new RegExp('^[' + escapePattern(charlist) +
    ']{' + min + ',' + max + '}$');
  resCharlist = array2charlist([charlist], readOptions.caseSensitive, true);
  resCharlist.text = joinChunks(resCharlist.values, resCharlist.suppressed);

  confirmMessage = options.confirmMessage != null ? options.confirmMessage :
    'Reinput a same one to confirm it: ';
  unmatchMessage = options.unmatchMessage != null ? options.unmatchMessage :
    'It differs from first one.' +
      ' Hit only the Enter key if you want to retry from first one.';

  if (query == null) { query = 'Input new password: '; }

  limitMessage = readOptions.limitMessage;
  while (!res2) {
    readOptions.limit = limit;
    readOptions.limitMessage = limitMessage;
    res1 = exports.question(query, readOptions);

    readOptions.limit = [res1, ''];
    readOptions.limitMessage = unmatchMessage;
    res2 = exports.question(confirmMessage, readOptions);
  }

  return res1;
};

function _questionNum(query, options, parser) {
  var validValue;
  function getValidValue(value) {
    validValue = parser(value);
    return !isNaN(validValue) && typeof validValue === 'number';
  }
  /* eslint-disable key-spacing */
  exports.question(query, margeOptions({
    // -------- default
    limitMessage:       'Input valid number, please.'
  }, options, {
    // -------- forced
    limit:              getValidValue,
    cd:                 false
    // trueValue, falseValue, caseSensitive, keepWhitespace don't work.
  }));
  /* eslint-enable key-spacing */
  return validValue;
}
exports.questionInt = function(query, options) {
  return _questionNum(query, options, function(value) { return parseInt(value, 10); });
};
exports.questionFloat = function(query, options) {
  return _questionNum(query, options, parseFloat);
};

exports.questionPath = function(query, options) {
  /* eslint-disable key-spacing */
  var error = '',
    validPath, // before readOptions
    readOptions = margeOptions({
      // -------- default
      hideEchoBack:       false,
      limitMessage:       '$<error(\n)>Input valid path, please.' +
                            '$<( Min:)min>$<( Max:)max>',
      history:            true,
      cd:                 true
    }, options, {
      // -------- forced
      keepWhitespace:     false,
      limit: function(value) {
        var exists, stat, res;
        value = replaceHomePath(value, true);
        error = ''; // for validate
        // mkdir -p
        function mkdirParents(dirPath) {
          dirPath.split(/\/|\\/).reduce(function(parents, dir) {
            var path = pathUtil.resolve((parents += dir + pathUtil.sep));
            if (!fs.existsSync(path)) {
              fs.mkdirSync(path);
            } else if (!fs.statSync(path).isDirectory()) {
              throw new Error('Non directory already exists: ' + path);
            }
            return parents;
          }, '');
        }

        try {
          exists = fs.existsSync(value);
          validPath = exists ? fs.realpathSync(value) : pathUtil.resolve(value);
          // options.exists default: true, not-bool: no-check
          if (!options.hasOwnProperty('exists') && !exists ||
              typeof options.exists === 'boolean' && options.exists !== exists) {
            error = (exists ? 'Already exists' : 'No such file or directory') +
              ': ' + validPath;
            return false;
          }
          if (!exists && options.create) {
            if (options.isDirectory) {
              mkdirParents(validPath);
            } else {
              mkdirParents(pathUtil.dirname(validPath));
              fs.closeSync(fs.openSync(validPath, 'w')); // touch
            }
            validPath = fs.realpathSync(validPath);
          }
          if (exists && (options.min || options.max ||
              options.isFile || options.isDirectory)) {
            stat = fs.statSync(validPath);
            // type check first (directory has zero size)
            if (options.isFile && !stat.isFile()) {
              error = 'Not file: ' + validPath;
              return false;
            } else if (options.isDirectory && !stat.isDirectory()) {
              error = 'Not directory: ' + validPath;
              return false;
            } else if (options.min && stat.size < +options.min ||
                options.max && stat.size > +options.max) {
              error = 'Size ' + stat.size + ' is out of range: ' + validPath;
              return false;
            }
          }
          if (typeof options.validate === 'function' &&
              (res = options.validate(validPath)) !== true) {
            if (typeof res === 'string') { error = res; }
            return false;
          }
        } catch (e) {
          error = e + '';
          return false;
        }
        return true;
      },
      // trueValue, falseValue, caseSensitive don't work.
      phContent: function(param) {
        return param === 'error' ? error :
          param !== 'min' && param !== 'max' ? null :
          options.hasOwnProperty(param) ? options[param] + '' : '';
      }
    });
    // added:     exists, create, min, max, isFile, isDirectory, validate
  /* eslint-enable key-spacing */
  options = options || {};

  if (query == null) { query = 'Input path (you can "cd" and "pwd"): '; }

  exports.question(query, readOptions);
  return validPath;
};

// props: preCheck, args, hRes, limit
function getClHandler(commandHandler, options) {
  var clHandler = {},
    hIndex = {};
  if (typeof commandHandler === 'object') {
    Object.keys(commandHandler).forEach(function(cmd) {
      if (typeof commandHandler[cmd] === 'function') {
        hIndex[options.caseSensitive ? cmd : cmd.toLowerCase()] = commandHandler[cmd];
      }
    });
    clHandler.preCheck = function(res) {
      var cmdKey;
      clHandler.args = parseCl(res);
      cmdKey = clHandler.args[0] || '';
      if (!options.caseSensitive) { cmdKey = cmdKey.toLowerCase(); }
      clHandler.hRes =
        cmdKey !== '_' && hIndex.hasOwnProperty(cmdKey)
          ? hIndex[cmdKey].apply(res, clHandler.args.slice(1)) :
          hIndex.hasOwnProperty('_') ? hIndex._.apply(res, clHandler.args) : null;
      return {res: res, forceNext: false};
    };
    if (!hIndex.hasOwnProperty('_')) {
      clHandler.limit = function() { // It's called after preCheck.
        var cmdKey = clHandler.args[0] || '';
        if (!options.caseSensitive) { cmdKey = cmdKey.toLowerCase(); }
        return hIndex.hasOwnProperty(cmdKey);
      };
    }
  } else {
    clHandler.preCheck = function(res) {
      clHandler.args = parseCl(res);
      clHandler.hRes = typeof commandHandler === 'function'
        ? commandHandler.apply(res, clHandler.args) : true; // true for break loop
      return {res: res, forceNext: false};
    };
  }
  return clHandler;
}

exports.promptCL = function(commandHandler, options) {
  /* eslint-disable key-spacing */
  var readOptions = margeOptions({
      // -------- default
      hideEchoBack:       false,
      limitMessage:       'Requested command is not available.',
      caseSensitive:      false,
      history:            true
    }, options),
    //   -------- forced
    //   trueValue, falseValue, keepWhitespace don't work.
    //   preCheck, limit (by clHandler)
    clHandler = getClHandler(commandHandler, readOptions);
  /* eslint-enable key-spacing */
  readOptions.limit = clHandler.limit;
  readOptions.preCheck = clHandler.preCheck;
  exports.prompt(readOptions);
  return clHandler.args;
};

exports.promptLoop = function(inputHandler, options) {
  /* eslint-disable key-spacing */
  var readOptions = margeOptions({
    // -------- default
    hideEchoBack:       false,
    trueValue:          null,
    falseValue:         null,
    caseSensitive:      false,
    history:            true
  }, options);
  /* eslint-enable key-spacing */
  while (true) { if (inputHandler(exports.prompt(readOptions))) { break; } }
  // return; // nothing is returned
};

exports.promptCLLoop = function(commandHandler, options) {
  /* eslint-disable key-spacing */
  var readOptions = margeOptions({
      // -------- default
      hideEchoBack:       false,
      limitMessage:       'Requested command is not available.',
      caseSensitive:      false,
      history:            true
    }, options),
    //   -------- forced
    //   trueValue, falseValue, keepWhitespace don't work.
    //   preCheck, limit (by clHandler)
    clHandler = getClHandler(commandHandler, readOptions);
  /* eslint-enable key-spacing */
  readOptions.limit = clHandler.limit;
  readOptions.preCheck = clHandler.preCheck;
  while (true) {
    exports.prompt(readOptions);
    if (clHandler.hRes) { break; }
  }
  // return; // nothing is returned
};

exports.promptSimShell = function(options) {
  /* eslint-disable key-spacing */
  return exports.prompt(margeOptions({
    // -------- default
    hideEchoBack:       false,
    history:            true
  }, options, {
    // -------- forced
    prompt:             (function() {
      return IS_WIN ? '$<cwd>>' :
        // 'user@host:cwd$ '
        (process.env.USER || '') +
        (process.env.HOSTNAME ? '@' + process.env.HOSTNAME.replace(/\..*$/, '') : '') +
        ':$<cwdHome>$ ';
    })()
  }));
  /* eslint-enable key-spacing */
};

function _keyInYN(query, options, limit) {
  var res;
  if (query == null) { query = 'Are you sure? '; }
  if ((!options || options.guide !== false) && (query += '')) {
    query = query.replace(/\s*:?\s*$/, '') + ' [y/n]: ';
  }
  /* eslint-disable key-spacing */
  res = exports.keyIn(query, margeOptions(options, {
    // -------- forced
    hideEchoBack:       false,
    limit:              limit,
    trueValue:          'y',
    falseValue:         'n',
    caseSensitive:      false
    // mask doesn't work.
  }));
  // added:     guide
  /* eslint-enable key-spacing */
  return typeof res === 'boolean' ? res : '';
}
exports.keyInYN = function(query, options) { return _keyInYN(query, options); };
exports.keyInYNStrict = function(query, options) { return _keyInYN(query, options, 'yn'); };

exports.keyInPause = function(query, options) {
  if (query == null) { query = 'Continue...'; }
  if ((!options || options.guide !== false) && (query += '')) {
    query = query.replace(/\s+$/, '') + ' (Hit any key)';
  }
  /* eslint-disable key-spacing */
  exports.keyIn(query, margeOptions({
    // -------- default
    limit:              null
  }, options, {
    // -------- forced
    hideEchoBack:       true,
    mask:               ''
  }));
  // added:     guide
  /* eslint-enable key-spacing */
  // return; // nothing is returned
};

exports.keyInSelect = function(items, query, options) {
  /* eslint-disable key-spacing */
  var readOptions = margeOptions({
      // -------- default
      hideEchoBack:       false
    }, options, {
      // -------- forced
      trueValue:          null,
      falseValue:         null,
      caseSensitive:      false,
      // limit (by items),
      phContent: function(param) {
        return param === 'itemsCount' ? items.length + '' :
          param === 'firstItem' ? (items[0] + '').trim() :
          param === 'lastItem' ? (items[items.length - 1] + '').trim() : null;
      }
    }),
    // added:     guide, cancel
    keylist = '',
    key2i = {},
    charCode = 49 /* '1' */,
    display = '\n';
  /* eslint-enable key-spacing */
  if (!Array.isArray(items) || !items.length || items.length > 35) {
    throw '`items` must be Array (max length: 35).';
  }

  items.forEach(function(item, i) {
    var key = String.fromCharCode(charCode);
    keylist += key;
    key2i[key] = i;
    display += '[' + key + '] ' + (item + '').trim() + '\n';
    charCode = charCode === 57 /* '9' */ ? 97 /* 'a' */ : charCode + 1;
  });
  if (!options || options.cancel !== false) {
    keylist += '0';
    key2i['0'] = -1;
    display += '[0] ' +
      (options && options.cancel != null && typeof options.cancel !== 'boolean'
        ? (options.cancel + '').trim() : 'CANCEL') + '\n';
  }
  readOptions.limit = keylist;
  display += '\n';

  if (query == null) { query = 'Choose one from list: '; }
  if ((query += '')) {
    if (!options || options.guide !== false) {
      query = query.replace(/\s*:?\s*$/, '') + ' [$<limit>]: ';
    }
    display += query;
  }

  return key2i[exports.keyIn(display, readOptions).toLowerCase()];
};

exports.getRawInput = function() { return rawInput; };

// ======== DEPRECATED ========
function _setOption(optionName, args) {
  var options;
  if (args.length) { options = {}; options[optionName] = args[0]; }
  return exports.setDefaultOptions(options)[optionName];
}
exports.setPrint = function() { return _setOption('print', arguments); };
exports.setPrompt = function() { return _setOption('prompt', arguments); };
exports.setEncoding = function() { return _setOption('encoding', arguments); };
exports.setMask = function() { return _setOption('mask', arguments); };
exports.setBufferSize = function() { return _setOption('bufferSize', arguments); };

}).call(this,"/Users\\yettbh\\Documents\\Snap2JsMyFork\\node_modules\\readline-sync\\lib")
},{"child_process":undefined,"crypto":undefined,"fs":undefined,"os":undefined,"path":undefined}],3:[function(require,module,exports){
const callRawFnWithArgs = function(fn) {
    const inputs = Array.prototype.slice.call(arguments, 1);
    if (inputs.length) {
        return `${fn}.call(self, ${inputs.join(', ')}, DEFAULT_CONTEXT)`;
    }
    return `${fn}.call(self, DEFAULT_CONTEXT)`;
};

const callFnWithArgs = function(fn) {
    arguments[0] = `__ENV.${fn}`;
    return callRawFnWithArgs.apply(null, arguments);
};

const callStatementWithArgs = function() {
    return callFnWithArgs.apply(null, arguments) + '\n';
};

module.exports = {
    callRawFnWithArgs,
    callFnWithArgs,
    callStatementWithArgs,
};

},{}],4:[function(require,module,exports){
// Generating the js code from the ast nodes (indexed by node type)
const utils = require('../utils');
const indent = utils.indent;
const sanitize = utils.sanitize;
const CALLER = '__SELF';
const {callFnWithArgs, callRawFnWithArgs} = require('./javascript-helpers');
const {callStatementWithArgs} = require('./javascript-helpers');

const backend = {};

///////////////////// Motion /////////////////////

backend.turn =
backend.turnLeft =
backend.setHeading =
backend.setXPosition =
backend.setYPosition =
backend.changeXPosition =
backend.changeYPosition =
backend.forward = function(node) {
    const dist = node.first().code(this);
    return callStatementWithArgs(node.type, dist);
};

backend.xPosition =
backend.direction =
backend.yPosition = function(node) {
    return callFnWithArgs(node.type);
};

backend.gotoXY = function(node) {
    const [x, y] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, x, y);
};

backend.doGotoObject =
backend.doFaceTowards = function(node) {
    const target = node.first().code(this);
    return callStatementWithArgs(node.type, target);
};

backend.doGlide = function(node) {
    const [time, x, y] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, x, y, time);
};

backend.bounceOffEdge = function(node) {
    return callStatementWithArgs(node.type);
};

///////////////////// Control /////////////////////
backend.doWarp = function(node) {
    // doWarp is essentially compiled away since we add explicit
    // doYield nodes to the AST
    throw new Error('doWarp should have been compiled away...');
};

backend.doWait = function(node) {
    const time = node.first().code(this);
    return callStatementWithArgs(node.type, time);
};

backend.doIf = function(node) {
    const [condition, body] = node.inputsAsCode(this);

    return `if (${condition}) ${body}`;

    //return callStatementWithArgs(node.type, condition, ifTrue);
};

backend.doIfElse = function(node) {
    const [cond, ifTrue, ifFalse] = node.inputsAsCode(this);
    return `if (${cond}) ${ifTrue} else ${ifFalse}`;
};

backend.reportIfElse = function(node) {
    const [cond, ifTrue, ifFalse] = node.inputsAsCode(this);
    return `(${cond} ? ${ifTrue} : ${ifFalse})`;
};

backend.doReport = function(node) {
    // Get the current callback name and call it!
    const value = node.first() ? node.first().code(this) : '';
    return `;return ${callStatementWithArgs(node.type, value)}`;
};

backend.removeClone =
backend.doPauseAll = function(node) {
    return callStatementWithArgs(node.type);
};

backend.createClone =
backend.doStopThis =
backend.doStopOthers =
backend.doWaitUntil =
backend.doBroadcast = function(node) {
    const event = node.first().code(this);
    return callStatementWithArgs(node.type, event);
};

backend.doBroadcastAndWait = function(node) {
    return backend.doBroadcast(node);
};

backend.reportCallCC =
backend.evaluate = function(node) {
    const fn = node.first();
    const fnCode = fn.code(this);
    const argInputs = node.inputs()[1] ? node.inputs()[1].inputs() : [];
    const args = argInputs.map(arg => arg.code(this));

    const prefix = fn.isAsync() ? 'await ' : '';
    return `${prefix}${fnCode}(${args.join(', ')})`;
};

backend.doCallCC = function(node) {
    const fn = node.first();
    const fnCode = fn.code(this);
    const prefix = fn.isAsync() ? 'await ' : '';
    return `(${prefix}${fnCode})()`;
};

backend.fork = function(node) {
    const [fn, argInputs] = node.inputs();
    return `setTimeout(() => ${fn.code(this)}.apply(null, ${argInputs.code(this)}), 0)`;
};

backend.doRepeat = function(node) {
    const count = node.first() ? node.first().code(this) : 0;
    const body = node.inputs()[1];
    const iterVar = node.id;
    return `;for (let ${iterVar} = +${count}; ${iterVar}--;) ${body.code(this)}`;
};

backend.doYield = function(node) {
    return callStatementWithArgs('doYield');
};

backend.doForever = function(node) {
    // Yield at the end of the loop...
    const block = node.first().code(this);
    return `while (1) ${block}`;
};

backend.doUntil = function(node) {
    // TODO: Check if the cond is async!
    const cond = node.first() ? node.first().code(this) : 'false';
    const block = node.inputs()[1];
    return `while(!${cond}) ${block.code(this)}`;
};

backend.doTellTo = function(node) {
    const [target, fn, args] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, target, fn, args);
};

backend.doSend = function(node) {
    const [event, target] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, event, target);
};

backend.newClone = function(node) {
    const [target] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, target);
};

backend.reportAskFor = function(node) {
    const [target, fn, inputs] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, target, fn, inputs);
};

///////////////////// Looks /////////////////////
backend.doSwitchToCostume = function(node) {
    const costume = node.first().code(this);
    return callStatementWithArgs(node.type, costume);
};

backend.doWearNextCostume = function(node) {
    return callStatementWithArgs(node.type);
};

backend.changeEffect =
backend.setEffect = function(node) {
    const [effect, amount] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, effect, amount);
};

backend.clearEffects = function(node) {
    return callStatementWithArgs(node.type);
};

backend.goBack =
backend.changeScale =
backend.setScale = function(node) {
    const amount = node.first().code(this);
    return callStatementWithArgs(node.type, amount);
};

backend.getCostumeIdx =
backend.getScale = function(node) {
    return callFnWithArgs(node.type);
};

backend.show =
backend.comeToFront =
backend.hide = function(node) {
    return callStatementWithArgs(node.type);
};

backend.doSayFor = function(node) {
    const [msg, time] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, msg, time);
};

backend.doThinkFor = function(node) {
    const [msg, time] = node.inputsAsCode(this);

    return callStatementWithArgs(node.type, msg, time);
};

backend.bubble = function(node) {
    const inputs = node.first().code(this);
    return callStatementWithArgs(node.type, inputs);
};

backend.doThink = function(node) {
    const msg = node.first() ? node.first().code(this) : '""';
    return callStatementWithArgs(node.type, msg);
};

backend.getEffect = function(node) {
    const [effect] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, effect);
};

backend.reportShown = function(node) {
    return callFnWithArgs(node.type);
};

backend.reportGetImageAttribute = function(node) {
    const [attr, image] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, attr, image);
};

backend.goToLayer = function(node) {
    const [layer] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, layer);
};

backend.reportNewCostumeStretched = function(node) {
    const [costume, x, y] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, costume, x, y);
};
///////////////////// Sensing /////////////////////
backend.doAsk = function(node) {
    const msg = node.first().code(this);
    return callStatementWithArgs(node.type, msg);
};

backend.doResetTimer = function(node) {
    return callStatementWithArgs(node.type);
};

backend.doSetFastTracking = function(node) {
    const bool = node.first().code(this);
    return callStatementWithArgs(node.type, bool);
};

backend.reportTouchingObject = function(node) {
    const obj = node.first().code(this);
    return callFnWithArgs(node.type, obj);
};

backend.reportTouchingColor = function(node) {
    const color = node.first().code(this);
    return callFnWithArgs(node.type, color);
};

backend.reportDate =
backend.reportURL =
backend.reportGet = function(node) {
    const thing = node.first().code(this);
    return callFnWithArgs(node.type, thing);
};

backend.reportColorIsTouchingColor = function(node) {
    const [first, second] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, first, second);
};

backend.reportAspect =
backend.reportRelationTo =
backend.reportAttributeOf = function(node) {
    const [attr, obj] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, attr, obj);
};

backend.reportUsername =
backend.reportLatitude =
backend.reportLongitude =
backend.reportStageHeight =
backend.reportStageWidth =
backend.reportIsFastTracking =
backend.getTimer =
backend.reportMouseX =
backend.reportMouseY =
backend.reportMouseDown =
backend.getLastAnswer = function(node) {
    return callFnWithArgs(node.type);
};

backend.reportKeyPressed = function(node) {
    const key = node.first().code(this);
    return callFnWithArgs(node.type, key);
};

backend.reportDistanceTo = function(node) {
    const obj = node.first().code(this);
    return callFnWithArgs(node.type, obj);
};

backend.doSetGlobalFlag = function(node) {
    const [flag, value] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, flag, value);
};

backend.doSetVideoTransparency = function(node) {
    const [value] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, value);
};

backend.reportAudio = function(node) {
    const [prop] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, prop);
};

backend.reportVideo = function(node) {
    const [type, who] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, type, who);
};

backend.reportGlobalFlag = function(node) {
    const [flag] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, flag);
};

///////////////////// Sounds /////////////////////
backend.doSetTempo =
backend.doChangeTempo =
backend.playSound =
backend.doPlaySoundUntilDone = function(node) {
    const sound = node.first().code(this);
    return callStatementWithArgs(node.type, sound);
};

backend.doStopAllSounds = function(node) {
    return callStatementWithArgs(node.type);
};

backend.doRest = function(node) {
    const duration = node.first().code(this);
    return callStatementWithArgs(node.type, duration);
};

backend.doPlayNote = function(node) {
    const [note, duration] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, note, duration);
};

backend.getPan =
backend.getVolume =
backend.getTempo = function(node) {
    return callFnWithArgs(node.type);
};

backend.doPlaySoundAtRate = function(node) {
    const [sound, rate] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, sound, rate);
};

backend.doSetInstrument = function(node) {
    const [instrument] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, instrument);
};

backend.setPan =
backend.changePan =
backend.setVolume =
backend.changeVolume = function(node) {
    const [amount] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, amount);
};

backend.playFreq = function(node) {
    const [freq] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, freq);
};

backend.stopFreq = function(node) {
    return callStatementWithArgs(node.type);
};

backend.reportGetSoundAttribute = function(node) {
    const [attr, sound] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, attr, sound);
};

///////////////////// Operators /////////////////////
backend.reportMonadic =
backend.reportModulus =
backend.reportQuotient =
backend.reportProduct =
backend.reportDifference =
backend.reportRandom =
backend.reportSum = function(node) {
    const [left, right] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, left, right);
};

backend.reportRound = function(node) {
    const number = node.first().code(this);
    return callFnWithArgs(node.type, number);
};

backend.reportIsIdentical =
backend.reportIsA =
backend.reportAnd =
backend.reportOr =
backend.reportTextSplit =
backend.reportGreaterThan =
backend.reportLessThan =
backend.reportEquals = function(node) {
    const [left, right] = node.inputsAsCode(this);

    return callFnWithArgs(node.type, left, right);
};

//backend.reportObject =

backend.reportJoinWords = function(node) {
    const listInput = node.first(),
        inputs = listInput.inputsAsCode(this),
        args = inputs.slice();

    args.unshift(node.type);
    return callFnWithArgs.apply(this, args);
};

backend.reportNot =
backend.reportStringSize = function(node) {
    const str = node.first().code(this);
    return callFnWithArgs(node.type, str);
};

backend.reportBoolean = function(node) {
    return node.first().code(this);
};

backend.reportJSFunction = function(node) {
    const [args, body] = node.inputsAsCode(this);

    return callFnWithArgs(node.type, args, body);
};

backend.reifyScript = function(node) {
    const [body, argList] = node.inputs();
    const args = argList.inputsAsCode(this);
    const tmpArgs = args.map((_, i) => `a${i}`);
    const callCode = body.isAsync() ?
        indent(`const result_${node.id} = await (async function()${body.code(this)})();`) :
        indent(`const result_${node.id} = (function()${body.code(this)})();`);
    return [
    `function(${tmpArgs.join(', ')}) {`,
        indent(`let parentContext = arguments[${args.length}] instanceof VariableFrame ? arguments[${args.length}] : DEFAULT_CONTEXT;`),
        indent(`let context = new VariableFrame(parentContext);`),
        indent(`let self = context.get('${CALLER}').value;`),
        indent(args.map((arg, index) => `context.set(${arg}, a${index});`).join('\n')),
        indent(`let OUTER_CONTEXT = DEFAULT_CONTEXT;`),
        indent(`DEFAULT_CONTEXT = context;`),
        callCode,
        indent(`;DEFAULT_CONTEXT = OUTER_CONTEXT;`),
        indent(`return result_${node.id};`),
    `}`,
    ].join('\n');
};

backend.context = function(node) {
    const fn = node.first().code(this);
    const spriteName = node.receiver && utils.sanitize(node.receiver);
    const prepCode = spriteName ?
        `let self = project.sprites.concat([project.stage]).find(sprite => sprite.name === ${spriteName});` :
        `let self = project.stage;`;

    const declareVariables = node.variables.map(variable => {
        const [name, value] = variable;
        return `DEFAULT_CONTEXT.set(${name}, ${value.code(this)});`;
    }).join('\n');

    return [
        `function() {`,
        indent(prepCode),
        indent(`let DEFAULT_CONTEXT = new VariableFrame(self.variables);`),
        indent(declareVariables),
        indent(`const result_${node.id} = (${fn}).apply(this, arguments)`),
        indent(`return result_${node.id};`),
        `}`,
    ].join('\n');
};

backend.reportObject = function(node) {
    const name = node.first().code(this);
    const fn = `sprite => sprite.name === ${name}`;
    return `project.sprites.concat([project.stage]).find(${fn})`;
};

backend.doRun = function(node) {
    const [fn, args] = node.inputsAsCode(this);

    if (args.length) {
        return callStatementWithArgs(node.type, fn, args);
    }
    return callStatementWithArgs(node.type, fn);
};

///////////////////// Pen /////////////////////
backend.up =
backend.down =
backend.doStamp =
backend.floodFill =
backend.clear = function(node) {
    return callStatementWithArgs(node.type);
};

backend.setColor = function(node) {
    const color = node.first().code(this);
    return callStatementWithArgs(node.type, color);
};

backend.setHue =
backend.changeHue = function(node) {
    const hue = node.first().code(this);
    return callStatementWithArgs(node.type, hue);
};

backend.setBrightness =
backend.changeBrightness = function(node) {
    const brightness = node.first().code(this);
    return callStatementWithArgs(node.type, brightness);
};

backend.setSize =
backend.changeSize = function(node) {
    const size = node.first().code(this);
    return callStatementWithArgs(node.type, size);
};

backend.setPenHSVA =
backend.changePenHSVA = function(node) {
    const [prop, value] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, prop, value);
};

backend.write = function(node) {
    const [text, size] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, text, size);
};

backend.doPasteOn = function(node) {
    const [target] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, target);
};

backend.getPenDown =
backend.reportPenTrailsAsCostume = function(node) {
    return callFnWithArgs(node.type);
};

backend.getPenAttribute = function(node) {
    const [prop] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, prop);
};

///////////////////// Variables /////////////////////
backend.doChangeVar =
backend.doSetVar = function(node) {
    if (!node.inputs().length) return '';

    const [name, value=''] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, name, value);
};

backend.doShowVar =
backend.doHideVar = function(node) {
    const name = node.first().code(this);

    return callStatementWithArgs(node.type, name);
};

backend.doDeclareVariables = function(node) {
    const names = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, names.join(', '));
};

backend.doAddToList = function(node) {
    const [value, list] = node.inputsAsCode(this);

    return callStatementWithArgs(node.type, value, list);
};

backend.reportListLength = function(node) {
    const variable = node.first().code(this);
    return callFnWithArgs(node.type, variable);
};

backend.reportListItem = function(node) {
    const [index, list] = node.inputsAsCode(this);

    return callFnWithArgs(node.type, index, list);
};

backend.reportCDR = function(node) {
    const list = node.first().code(this);
    return callFnWithArgs(node.type, list);
};

backend.reportNewList = function(node) {
    var items = node.inputsAsCode(this);
        args = [node.type].concat(items);

    return callFnWithArgs.apply(null, args);
};

backend.reportListContainsItem = function(node) {
    const [list, item] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, list, item);
};

backend.doDeleteFromList = function(node) {
    const [index, list] = node.inputsAsCode(this);
    return callStatementWithArgs(node.type, index, list);
};

backend.doReplaceInList = function(node) {
    const [index, list, item] = node.inputsAsCode(this);

    return callStatementWithArgs(node.type, index, list, item);
};

backend.doInsertInList = function(node) {
    const [value, index, list] = node.inputsAsCode(this);

    return callStatementWithArgs(node.type, value, index, list);
};

backend.reportCONS = function(node) {
    const [head, list] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, head, list);
};

backend.variable = function(node) {
    const [value] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, value);
};

backend.evaluateCustomBlock = function(node) {
    var {name} = node,
        safeName = sanitize(name),
        fn = `self.customBlocks.get(${safeName})`,
        types = utils.inputNames(name);

    const args = node.inputsAsCode(this);

    if (args.length) {
        return callFnWithArgs(node.type, safeName, fn, args);
    } else {
        return callFnWithArgs(node.type, safeName, fn);
    }
};

backend.reportKeep = function(node) {
    const [filter, list] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, filter, list);
};

backend.reportMap = function(node) {
    const [map, list] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, map, list);
};

backend.reportNumbers = function(node) {
    const [start, end] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, start, end);
};

backend.reportListIndex = function(node) {
    const [item, list] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, item, list);
};

backend.reportConcatenatedLists = function(node) {
    const [lists] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, lists);
};

backend.reportCombine = function(node) {
    const [lists, combiner] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, lists, combiner);
};

backend.reportFindFirst = function(node) {
    const [findFn, list] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, findFn, list);
};

///////////////////// Primitives /////////////////////
backend.color =
backend.string = function(node) {
    return sanitize(node.value);
};

backend.option = function(node) {
    return utils.sanitize(node.value);
};

backend.bool = function(node) {
    return node.value;
};

backend.list = function(node) {
    const inputs = node.inputsAsCode(this);
    return `[${inputs.join(', ')}]`;
};

backend.getJSFromRPCStruct = function(node) {
    const args = node.inputsAsCode(this);
    return callFnWithArgs(node.type, args.join(','));
};

///////////////////// Event Handlers /////////////////////
backend.eventHandlers = {};
backend.eventHandlers.receiveOnClone =
backend.eventHandlers.receiveGo = function(node, code) {
    return [
        '(async function() {',
        'let DEFAULT_CONTEXT = new VariableFrame(self.variables);',
        indent(code),
        '})();'
    ].join('\n');
};

backend.eventHandlers.receiveMessage = function(node, code) {
    var event = node.first().code(this),
        cond = event === utils.sanitize(`any message`) ? 'true' : `event === ${event}`;

    return [
        '(async function() {',
        `if (${cond}) {`,
        'let DEFAULT_CONTEXT = new VariableFrame(self.variables);',
        indent(code),
        '}',
        '})();',
    ].join('\n');
};

backend.eventHandlers.receiveKey = function(node, code) {
    const key = node.first().code(this);
    const cond = key === `'any key'` ? 'true' : `key === ${key}`;

    return [
        '(async function() {',
        `if (${cond}) {`,
        'let DEFAULT_CONTEXT = new VariableFrame(self.variables);',
        indent(code),
        '}',
        '})();',
    ].join('\n');
};

// Add support for the new block types
backend.doRunRPC =
backend.getJSFromRPCDropdown =
backend.getJSFromRPC =
backend.getJSFromRPCStruct =

backend.doSocketRequest =
backend.doSocketMessage = function(node) {
    let args = node.inputsAsCode(this);

    args.unshift(node.type);
    return callStatementWithArgs.apply(null, args);
};

backend.doSocketResponse =  // ignore the argument since this isn't supported
backend.reportUsername =

backend.reportRPCError =

backend.getProjectId =
backend.getProjectIds =

backend.reportLatitude =
backend.reportLongitude =
backend.reportStageHeight =
backend.reportStageWidth = function(node) {
    return helpers.callFnWithArgs(node.type);
};

module.exports = backend;

},{"../utils":8,"./javascript-helpers":3}],5:[function(require,module,exports){
const base = require('./nop');
const clone = require('../utils').clone;

const WARP_VAR = '__isAtomic';
const isString = val => typeof val === 'string';
const isNil = val => val === undefined || val === null;
const degrees = rads => 180*rads/Math.PI;
const radians = degs => Math.PI*degs/180;

var context = clone(base);

///////////////////// Motion ///////////////////// 
context.xPosition = function() {
    return this.xPosition;
};

context.setXPosition = function(value) {
    this.xPosition = +value || 0;
};

context.changeXPosition = function(value) {
    this.xPosition += (+value || 0);
};

context.yPosition = function() {
    return this.yPosition;
};

context.setYPosition = function(value) {
    this.yPosition = +value || 0;
};

context.changeYPosition = function(value) {
    this.yPosition += (+value || 0);
};

context.gotoXY = function(x, y) {
    this.xPosition = +x;
    this.yPosition = +y;
};

context.forward = function(dist) {
    var degrees = (-1 * (this.direction - 90) + 360) % 360,
        angle = degrees * Math.PI / 180,
        dx, dy;

    dx = Math.cos(angle) * +dist;
    dy = Math.sin(angle) * +dist;

    this.yPosition += dy;
    this.xPosition += dx;
};

context.turnLeft = function(value) {
    this.direction -= (+value || 0);
};

context.turn = function(value) {
    this.direction += (+value || 0);
};

context.direction = function() {
    return +this.direction;
};

context.setHeading = function(dir) {
    this.direction = +dir || 0;
};

///////////////////// Control ///////////////////// 
context.doIf = function(cond, ifTrue) {
    if (cond) {
        return ifTrue();
    }
};

context.doIfElse = function(cond, ifTrue, ifFalse) {
    if (cond) {
        return ifTrue();
    } else {
        return ifFalse();
    }
};

context.doReport = function(value) {
    return value;
};

function defer() {
    const deferred = {
        resolve: null,
        reject: null
    };
    const promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });
    deferred.promise = promise;
    return deferred;
}

function sleep(duration) {
    const deferred = defer();
    setTimeout(deferred.resolve, duration);
    return deferred.promise;
}

context.doYield = async function() {
    return await sleep(0);
};

context.doWarp = function(isStart, context) {
    context.set(WARP_VAR, isStart);
};

context.doBroadcast = function(event) {
    this.emit(event);
};

context.doBroadcastAndWait = async function(event) {
    const results = this.emit(event, true);
    return Promise.all(results);
    //return this.emit(event, true);
};

context.doWait = function(duration) {
    duration = duration || 0;
    if (duration === 0 && isWarping) {
        // TODO: This is an annoying rule
        //after();
    } else {
        return sleep(duration*1000);
    }
};

context.createClone = function(name) {
    var sprite = this;
    if (name !== 'myself') {
        sprite = this.project.sprites.find(sprite => sprite.name === name);
    }
    sprite.clone();
};

///////////////////// Looks ///////////////////// 
context.doThink = function(msg) {
    console.error(msg);
};

context.bubble = function(msg) {
    console.log(msg);
};

context.doThinkFor = function(msg, duration) {
    context.doThink(msg);
    duration = +duration || 0;
    return sleep(duration*1000);
};

context.doSayFor = function(msg, duration) {
    context.bubble(msg);
    duration = +duration || 0;
    return sleep(duration*1000);
};

context.doWearNextCostume = function() {
    this.costumeIdx++;
};

context.changeScale = function(value) {
    this.size += +value || 0
};

context.setScale = function(value) {
    this.size = +value;
};

context.getScale = function() {
    return this.size;
};

context.getCostumeIdx = function() {
    return this.costumeIdx;
};

///////////////////// Sensing ///////////////////// 
context.reportDate = function(format) {
    var dateMap = {
        'year' : 'getFullYear',
        'month' : 'getMonth',
        'date': 'getDate',
        'day of week' : 'getDay',
        'hour' : 'getHours',
        'minute' : 'getMinutes',
        'second' : 'getSeconds',
        'time in milliseconds' : 'getTime'
    };

    if (dateMap[format]) {
        return new Date()[dateMap[format]]();
    } else {
        return '';
    }
};

context.doResetTimer = function() {
    this.resetTimer();
};

context.getTimer = function() {
    return (Date.now() - this.getTimerStart())/1000;
};

///////////////////// Sounds ///////////////////// 
context.doSetTempo = function(bpm) {
    this.setTempo(bpm);
};

context.doChangeTempo = function(val) {
    this.setTempo(this.getTempo() + (+val || 0));
};

context.getTempo = function() {
    return this.getTempo();
};

///////////////////// Operators ///////////////////// 
context.reportIsIdentical =
context.reportEquals = function(a, b) {
    if (a instanceof Array || (b instanceof Array)) {
        if (a instanceof Array && (b instanceof Array)) {
            return a.reduce((isEqual, item, index) => {
                return isEqual && context.reportEquals(item, b[index]);
            }, true)
        }
        return false;
    }

    var x = +a,
        y = +b,
        i,
        specials = [true, false, ''];

    for (i = 9; i <= 13; i += 1) {
        specials.push(String.fromCharCode(i));
    }
    specials.push(String.fromCharCode(160));

    // check for special values before coercing to numbers
    if (isNaN(x) || isNaN(y) ||
            [a, b].some(function (any) {return specials.includes(any) ||
                  (isString(any) && (any.indexOf(' ') > -1)); })) {
        x = a;
        y = b;
    }

    // handle text comparison case-insensitive.
    if (isString(x) && isString(y)) {
        return x.toLowerCase() === y.toLowerCase();
    }

    return x === y;
};

context.doRun = function(fn, args) {
    return fn.apply(this, args);
};

context.reportJSFunction = function(args, body) {
    return Function.apply(
        null,
        args.concat([body])
    );
};

context.reportIsA = function(thing, type) {
    if (type === 'number' && typeof thing === 'string') {
        return !isNaN(+thing);
    }
    return typeof thing === type;
};

context.reportMonadic = function(operation, number) {
    var x = +number,
        result = 0;

    switch (operation) {
    case 'abs':
        result = Math.abs(x);
        break;
    case 'ceiling':
        result = Math.ceil(x);
        break;
    case 'floor':
        result = Math.floor(x);
        break;
    case 'sqrt':
        result = Math.sqrt(x);
        break;
    case 'sin':
        result = Math.sin(radians(x));
        break;
    case 'cos':
        result = Math.cos(radians(x));
        break;
    case 'tan':
        result = Math.tan(radians(x));
        break;
    case 'asin':
        result = degrees(Math.asin(x));
        break;
    case 'acos':
        result = degrees(Math.acos(x));
        break;
    case 'atan':
        result = degrees(Math.atan(x));
        break;
    case 'ln':
        result = Math.log(x);
        break;
    case 'log': // base 10
        result =  Math.log(x) / Math.LN10;
        break;
    case 'e^':
        result = Math.exp(x);
        break;
    case '10^':
        result = Math.pow(10, x);
        break;
    }
    return result;
};

context.reportRound = function(number) {
    return Math.round(number);
};

context.reportModulus = function(left, right) {
    return left % right;
};

context.reportProduct = function(left, right) {
    return left * right;
};

context.reportRandom = function(min, max) {
    var floor = +min,
        ceil = +max;
    if ((floor % 1 !== 0) || (ceil % 1 !== 0)) {
        return Math.random() * (ceil - floor) + floor;
    }
    return Math.floor(Math.random() * (ceil - floor + 1)) + floor;
};

context.reportQuotient = function (left, right) {
    return left/right;
};

context.reportDifference = function (left, right) {
    return left - right;
};

context.reportSum = function(left, right) {
    return (+left) + (+right);
};

context.reportGreaterThan = function(a, b) {
    var x = +a,
        y = +b;
    if (isNaN(x) || isNaN(y)) {
        x = a;
        y = b;
    }
    return x > y;
};

context.reportLessThan = function(a, b) {
    var x = +a,
        y = +b;

    if (isNaN(x) || isNaN(y)) {
        x = a;
        y = b;
    }
    return x < y;
};

context.reportTextSplit = function(string, delimiter) {
    var types = ['string', 'number'],
        strType = typeof string,
        delType = typeof delimiter,
        str,
        del;

    if (!types.includes(strType)) {
        throw new Error('expecting text instead of a ' + strType);
    }
    if (!types.includes(delType)) {
        throw new Error('expecting a text delimiter instead of a ' + delType);
    }
    str = isNil(string) ? '' : string.toString();
    switch (delimiter) {
    case 'line':
        // Unicode compliant line splitting (platform independent)
        // http://www.unicode.org/reports/tr18/#Line_Boundaries
        del = /\r\n|[\n\v\f\r\x85\u2028\u2029]/;
        break;
    case 'tab':
        del = '\t';
        break;
    case 'cr':
        del = '\r';
        break;
    case 'whitespace':
        str = str.trim();
        del = /\s+/;
        break;
    case 'letter':
        del = '';
        break;
    default:
        del = isNil(delimiter) ? '' : delimiter.toString();
    }
    return str.split(del);
};

context.reportStringSize = function (data) {
    if (data instanceof Array) { // catch a common user error
        return data.length();
    }

    return data ? data.toString().length : 0;
};

context.reportOr = function (left, right) {
    return left || right;
};

context.reportNot = function (bool) {
    return !bool;
};

context.reportAnd = function (left, right) {
    return left && right;
};

///////////////////// Variables ///////////////////// 
context.reportCDR = function(list) {
    return list.slice(1);
};

context.reportCONS = function(head, list) {
    var newList = list.slice();
    newList.unshift(head);
    return newList;
};

context.reportNewList = function(list) {
    return list;
};

context.reportListLength = function(list, context) {
    return list ? list.length : 0;
};

context.doDeleteFromList = function(index, list) {
    list.splice(index-1, 1);
};

context.doReplaceInList = function(index, list, item, context) {
    list[index-1] = item;
};

context.doInsertInList = function(item, index, list) {
    list.splice(index-1, 0, item);
};

context.reportListItem = function(index, list) {
    return list[index-1];
};

context.reportListContainsItem = function(list, item) {
    list = list || [];
    return list.includes(item);
};

context.variable = function(name, context) {
    var variable = context.get(name);
    return variable && variable.value;
};

context.doSetVar = function(name, val, context) {
    var variable = context.get(name);
    variable.value = val;
};

context.doChangeVar = function(name, val, context) {
    var variable = context.get(name);
    variable.value = +variable.value + (+val);
};

context.doDeclareVariables = function(args, context) {
    for (var i = args.length; i--;) {
        context.set(args[i], 0);
    }
};

context.doAddToList = function(value, list) {
    list.push(value);
};

context.reportJoinWords = function() {
    var args = Array.prototype.slice.call(arguments);
    args.pop();  // remove the context

    return args.join('');
};

context.evaluate = function(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return fn.apply(this, args);
};

context.evaluateCustomBlock = function(name, fnVar) {
    var args = Array.prototype.slice.call(arguments, 2),
        fn = fnVar.value;

    return fn.apply(this, args);
};

context.reportNumbers = function(start, end) {
    start = parseFloat(start);
    end = parseFloat(end);
    let numbers = [];
    let iter = start;
    const inc = end > start ? 1 : -1;
    while (end > start ? iter <= end : iter >= end) {
        numbers.push(iter);
        iter += inc;
    }
    return numbers;
};
context.doSocketMessage = function() {
    const messageTypes = this.project.stage.messageTypes;
    let args = Array.prototype.slice.call(arguments, 0);
    let msgTypeName = args.shift();

    args.pop();  // remove the execution context
    const target = args.pop();

    const msgType = messageTypes.find(type => type.name === msgTypeName) || DEFAULT_MSG_TYPE;
    const contents = {};
    msgType.fields.forEach((name, i) => contents[name] = args[i]);
    this.project.ctx.socket.sendMessageTo(target, msgType.name, contents);
};
module.exports = context;

},{"../utils":8,"./nop":7}],6:[function(require,module,exports){
const base = require('./basic');
const clone = require('../utils').clone;
const readline = require('readline-sync');

var context = clone(base);
var lastAnswer = '';

context.doAsk = question => {
    lastAnswer = readline.question(question + '\n');
};

context.getLastAnswer = function(node) {
    return lastAnswer;
};

context.__start = function(project) {
    var stdin = process.openStdin();
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    stdin.on('data', (key) => {
        if (key === '\u0003') process.exit();

        switch (key) {
            case '\u001b[A':
                key = 'up arrow';

            case '\u001b[B':
                key = 'down arrow';

            case '\u001b[C':
                key = 'right arrow';

            case '\u001b[C':
                key = 'left arrow';

            case ' ':
                key = 'space';
        }

        project.sprites.concat([project.stage])
            .forEach(obj => obj.onKeyPressed(key));
    });
};

module.exports = context;

},{"../utils":8,"./basic":5,"readline-sync":2}],7:[function(require,module,exports){
// nop everything
const backend = require('../backend/javascript');
const nop = () => {};

var context = {};
Object.keys(backend).forEach(key => context[key] = nop);

// special cases
context.doYield = nop;
context.__start = nop;

module.exports = context;

},{"../backend/javascript":4}],8:[function(require,module,exports){
const parseSpec = function (spec) {
    var parts = [], word = '', i, quoted = false, c;
    for (i = 0; i < spec.length; i += 1) {
        c = spec[i];
        if (c === "'") {
            quoted = !quoted;
        } else if (c === ' ' && !quoted) {
            parts.push(word);
            word = '';
        } else {
            word = word.concat(c);
        }
    }
    parts.push(word);
    return parts;
};
const inputNames = function (spec) {
    var vNames = [],
        parts = parseSpec(spec);

    parts.forEach(function (part) {
        if (part[0] === '%' && part.length > 1) {
            vNames.push(part.slice(1));
        }
    });
    return vNames;
};

const indent = lines => '  ' + lines.replace(/\n/g, '  ');
const clone = obj => {
    var newObj = {},
        keys = Object.keys(obj);

    for (var i = keys.length; i--;) {
        newObj[keys[i]] = obj[keys[i]];
    }
    return newObj;
};

const sanitize = function(text) {
    if (typeof text === 'string') {
        return `unescape('${escape(text)}')`;
    } else if (text instanceof Array){
        return '[' + text.map(val => sanitize(val)).join(',') + ']';
    }
    return text;
};

const defer = function () {
    const deferred = {resolve: null, reject: null};
    deferred.promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });
    return deferred;
};

module.exports = {
    indent: indent,
    clone: clone,
    parseSpec: parseSpec,
    inputNames: inputNames,
    sanitize,
    defer,
};

},{}]},{},[1]);
