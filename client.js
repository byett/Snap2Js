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

    return Promise.all([
    ]);
};

sprite.onKeyPressed = function(key) {
    var self = this;

    (async function() {
if (key === unescape('up%20arrow')) {
let DEFAULT_CONTEXT = new VariableFrame(self.variables);
  __ENV.doSocketMessage.call(self, unescape('message%20and%20address'), __ENV.variable.call(self, unescape('serverMessage'), DEFAULT_CONTEXT), {    }, __ENV.variable.call(self, unescape('serverMessage'), DEFAULT_CONTEXT), DEFAULT_CONTEXT)  ;
}
})();


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


project.variables.set(unescape('message'), unescape('0'));
project.variables.set(unescape('serverMessage'), unescape('0'));





return Promise.all(project.sprites.concat(project.stage).map(sprite => sprite.onFlagPressed()));


})(require('./src\\context\\nop'))
},{"./src\\context\\nop":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"../utils":5,"./javascript-helpers":2}],4:[function(require,module,exports){
// nop everything
const backend = require('../backend/javascript');
const nop = () => {};

var context = {};
Object.keys(backend).forEach(key => context[key] = nop);

// special cases
context.doYield = nop;
context.__start = nop;

module.exports = context;

},{"../backend/javascript":3}],5:[function(require,module,exports){
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
