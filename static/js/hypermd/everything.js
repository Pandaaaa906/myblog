// Import&Export all HyperMD components except PowerPacks
// (This file is also used to generate all-in-one bundle)
//
// **DO NOT EDIT!** This file is generated by script.
//
// @see dev/HyperMD.config.js
//

(function (mod){ //[HyperMD] UMD patched!
  /*commonjs*/  ("object"==typeof exports&&"undefined"!=typeof module) ? mod(null, exports, require("./core"), require("./mode/hypermd"), require("./addon/insert-file"), require("./addon/read-link"), require("./addon/hover"), require("./addon/click"), require("./addon/paste"), require("./addon/fold"), require("./addon/fold-image"), require("./addon/fold-link"), require("./addon/fold-code"), require("./addon/fold-math"), require("./addon/fold-emoji"), require("./addon/fold-html"), require("./addon/table-align"), require("./addon/mode-loader"), require("./addon/hide-token"), require("./addon/cursor-debounce"), require("./keymap/hypermd")) :
  /*amd*/       ("function"==typeof define&&define.amd) ? define(["require","exports","./core","./mode/hypermd","./addon/insert-file","./addon/read-link","./addon/hover","./addon/click","./addon/paste","./addon/fold","./addon/fold-image","./addon/fold-link","./addon/fold-code","./addon/fold-math","./addon/fold-emoji","./addon/fold-html","./addon/table-align","./addon/mode-loader","./addon/hide-token","./addon/cursor-debounce","./keymap/hypermd"], mod) :
  /*plain env*/ mod(null, (this.HyperMD = this.HyperMD || {}), HyperMD, HyperMD.Mode, HyperMD.InsertFile, HyperMD.ReadLink, HyperMD.Hover, HyperMD.Click, HyperMD.Paste, HyperMD.Fold, HyperMD.FoldImage, HyperMD.FoldLink, HyperMD.FoldCode, HyperMD.FoldMath, HyperMD.FoldEmoji, HyperMD.FoldHTML, HyperMD.TableAlign, HyperMD.ModeLoader, HyperMD.HideToken, HyperMD.CursorDebounce, HyperMD.KeyMap);
})(function (require, exports, core_1, Mode, InsertFile, ReadLink, Hover, Click, Paste, Fold, FoldImage, FoldLink, FoldCode, FoldMath, FoldEmoji, FoldHTML, TableAlign, ModeLoader, HideToken, CursorDebounce, KeyMap) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(core_1);
    exports.Mode = Mode;
    exports.InsertFile = InsertFile;
    exports.ReadLink = ReadLink;
    exports.Hover = Hover;
    exports.Click = Click;
    exports.Paste = Paste;
    exports.Fold = Fold;
    exports.FoldImage = FoldImage;
    exports.FoldLink = FoldLink;
    exports.FoldCode = FoldCode;
    exports.FoldMath = FoldMath;
    exports.FoldEmoji = FoldEmoji;
    exports.FoldHTML = FoldHTML;
    exports.TableAlign = TableAlign;
    exports.ModeLoader = ModeLoader;
    exports.HideToken = HideToken;
    exports.CursorDebounce = CursorDebounce;
    exports.KeyMap = KeyMap;
});
