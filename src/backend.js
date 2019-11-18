// Generating the js code from the ast nodes (indexed by node type)
const utils = require('./utils');
const indent = utils.indent;
const sanitize = utils.sanitize;
const CALLER = '__SELF';
const callRawFnWithArgs = require('./backend-helpers').callRawFnWithArgs;
const callFnWithArgs = require('./backend-helpers').callFnWithArgs;
const callStatementWithArgs = require('./backend-helpers').callStatementWithArgs;

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

backend.reportAttributeOf = function(node) {
    const [attr, obj] = node.inputsAsCode(this);
    return callFnWithArgs(node.type, attr, obj);
};

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

backend.getTempo = function(node) {
    return callFnWithArgs(node.type);
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

    return [
        `function() {`,
        indent(prepCode),
        indent(`let DEFAULT_CONTEXT = new VariableFrame(self.variables);`),
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
    return callFnWithArgs(node.type, sanitize(node.value));
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

module.exports = backend;
