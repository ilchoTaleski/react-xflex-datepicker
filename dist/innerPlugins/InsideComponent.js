"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var InsideComponent = function (_a) {
    var children = _a.children, _b = _a.onOutsideClick, onOutsideClick = _b === void 0 ? function () { } : _b, _c = _a.onOutsideMouseOver, onOutsideMouseOver = _c === void 0 ? function () { } : _c;
    var node = react_1.useRef();
    react_1.useEffect(function () {
        var handleClick = function (e) {
            if (node.current && node.current.contains(e.target)) {
                // inside click
                return;
            }
            onOutsideClick(e);
        };
        var handleMouseOver = function (e) {
            if (node.current && node.current.contains(e.target)) {
                // inside click
                return;
            }
            onOutsideMouseOver(e);
        };
        if (typeof document !== 'undefined') {
            document === null || document === void 0 ? void 0 : document.removeEventListener('mouseover', handleMouseOver);
            document === null || document === void 0 ? void 0 : document.addEventListener('mousedown', handleClick);
            document === null || document === void 0 ? void 0 : document.addEventListener('mouseover', handleMouseOver);
        }
        return function () {
            if (typeof document !== 'undefined') {
                document === null || document === void 0 ? void 0 : document.removeEventListener('mousedown', handleClick);
                document === null || document === void 0 ? void 0 : document.removeEventListener('mouseover', handleMouseOver);
            }
        };
    }, [onOutsideMouseOver]);
    return react_1.default.createElement("div", { ref: node }, children);
};
exports.default = InsideComponent;
