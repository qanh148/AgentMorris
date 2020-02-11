export class KeyboardInput {
    constructor() {
        this._keyMap = new Map();
        this._isDownMap = new Map();
        document.addEventListener("keydown", (event) => {
            if (this._keyMap.has(event.key) // exists
                && !this._isDownMap.get(event.key)) { // is not held
                this._keyMap.get(event.key).down();
                this._isDownMap.set(event.key, true);
            }
        });
        document.addEventListener("keyup", (event) => {
            if (this._keyMap.has(event.key)) {
                this._keyMap.get(event.key).up();
                this._isDownMap.set(event.key, false);
            }
        });
    }
    addKey(key, keyMap) {
        if (this._keyMap.has(key)) {
            console.log(`Key ${key} already in use`);
        }
        else {
            this._keyMap.set(key, keyMap);
            this._isDownMap.set(key, false);
        }
    }
    removeKey(key) {
        this._keyMap.delete(key);
        this._isDownMap.delete(key);
    }
}
// any file containing a top-level import or export is considered a module.
// Also we should use direct file modules instead of namespaces
// https://www.typescriptlang.org/docs/handbook/modules.html
// https://stackoverflow.com/questions/40267190/typescript-2-0-how-can-i-reference-objects-in-the-same-namespace-but-in-a-sub-f/43023392#43023392
// exports is not defined
// CommonJS isn't installed (which defines exports)
// https://stackoverflow.com/questions/43042889/typescript-referenceerror-exports-is-not-defined
// https://stackoverflow.com/questions/19059580/client-on-node-uncaught-referenceerror-require-is-not-defined
// Module doesn't have to be the same as Target
// https://stackoverflow.com/questions/41993811/understanding-target-and-module-in-tsconfig
// Ultimately, switched over to es6 modules
//# sourceMappingURL=KeyboardInput.js.map