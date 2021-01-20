"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calendarReducer = void 0;
var local_actions_1 = require("./local-actions");
var calendarReducer = function (state, action) {
    switch (action.type) {
        case local_actions_1.actionTypes.SET_START_DATE:
            return __assign(__assign({}, state), { startDate: action.payload });
        case local_actions_1.actionTypes.SET_END_DATE:
            return __assign(__assign({}, state), { endDate: action.payload });
        case local_actions_1.actionTypes.SET_HOVERED_DATE:
            return __assign(__assign({}, state), { hoveredDate: action.payload });
        case local_actions_1.actionTypes.SET_MONTH_VIEW:
            return __assign(__assign({}, state), { currentMonthView: action.payload });
        case local_actions_1.actionTypes.SET_YEAR_VIEW:
            return __assign(__assign({}, state), { currentYearView: action.payload });
        case local_actions_1.actionTypes.SET_MONTH_LABEL:
            return __assign(__assign({}, state), { monthLabel: action.payload });
        case local_actions_1.actionTypes.SET_YEAR_LABEL:
            return __assign(__assign({}, state), { yearLabel: action.payload });
        case local_actions_1.actionTypes.SET_WEEKS:
            return __assign(__assign({}, state), { weeks: action.payload });
        case local_actions_1.actionTypes.SET_MONTH_LABEL_NEXT:
            return __assign(__assign({}, state), { monthLabelNext: action.payload });
        case local_actions_1.actionTypes.SET_YEAR_LABEL_NEXT:
            return __assign(__assign({}, state), { yearLabelNext: action.payload });
        case local_actions_1.actionTypes.SET_WEEKS_NEXT:
            return __assign(__assign({}, state), { nextWeeks: action.payload });
        default: {
            throw new Error("Unhandled type: " + action.type);
        }
    }
};
exports.calendarReducer = calendarReducer;
