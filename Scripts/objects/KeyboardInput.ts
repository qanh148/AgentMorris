
import { Key } from "../../node_modules/ts-key-enum/Key.enum";

export class KeyboardInput {
    private _key:Key;

    constructor(key:Key) {
        this._key = key;
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
