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

    onUserMessageReceived() {
    }

    onKeyPressed() {
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
    console.log("onFlagPressed:");

    return Promise.all([
    ]);
};

sprite.onKeyPressed = function(key) {
    var self = this;
    console.log("onKeyPress:");

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

sprite.onUserMessageReceived = function(event) {
    var self = this;
    console.log("onUserMessageReceived:");


    const handler_0 = (async function() {
let DEFAULT_CONTEXT = new VariableFrame(self.variables);
  __ENV.doSetVar.call(self, unescape('serverMessage'), __ENV.variable.call(self, unescape('message'), DEFAULT_CONTEXT), DEFAULT_CONTEXT)  ;  __ENV.doSetVar.call(self, unescape('serverMessage'), __ENV.variable.call(self, unescape('message'), DEFAULT_CONTEXT), DEFAULT_CONTEXT)  ;  await __ENV.doSayFor.call(self, __ENV.variable.call(self, unescape('message'), DEFAULT_CONTEXT), unescape('2'), DEFAULT_CONTEXT)  ;
})();

    return Promise.all([
handler_0,
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





return [Promise.all(project.sprites.concat(project.stage).map(sprite => sprite.onFlagPressed())), Promise.all(project.sprites.concat(project.stage).map(sprite => sprite.onKeyPressed())), Promise.all(project.sprites.concat(project.stage).map(sprite => sprite.onUserMessageReceived()))];


})(require('./src\\context\\basic'))
},{"./src\\context\\basic":4}],2:[function(require,module,exports){
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

backend.eventHandlers.receiveSocketMessage = function(node, code) {
    return [
        '(async function() {',
        'let DEFAULT_CONTEXT = new VariableFrame(self.variables);',
        indent(code),
        '})();'
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
    return callStatementWithArgs.apply(node.type, args);
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

},{"../utils":6,"./javascript-helpers":2}],4:[function(require,module,exports){
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
    console.log('name:',name);
    console.log('val:', val);
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
context.doSocketMessage = function(name) {
    const messageTypes = this.project.stage.messageTypes;
    let args = Array.prototype.slice.call(arguments, 0);
    let msgTypeName = args.shift();

    args.pop();  // remove the execution context
    const target = args.pop();

    const msgType = messageTypes.find(type => type.name === msgTypeName) || DEFAULT_MSG_TYPE;
    const contents = {};
    msgType.fields.forEach((name, i) => contents[name] = args[i]);
    this.project.ctx.socket.sendMessageTo(target, msgType.name, contents);
    console.log(name);
};
module.exports = context;

},{"../utils":6,"./nop":5}],5:[function(require,module,exports){
// nop everything
const backend = require('../backend/javascript');
const nop = () => {};

var context = {};
Object.keys(backend).forEach(key => context[key] = nop);

// special cases
context.doYield = nop;
context.__start = nop;

module.exports = context;

},{"../backend/javascript":3}],6:[function(require,module,exports){
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
