/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: external "express"
const external_express_namespaceObject = require("express");;
var external_express_default = /*#__PURE__*/__webpack_require__.n(external_express_namespaceObject);
;// CONCATENATED MODULE: external "express-validator"
const external_express_validator_namespaceObject = require("express-validator");;
;// CONCATENATED MODULE: external "bcryptjs"
const external_bcryptjs_namespaceObject = require("bcryptjs");;
var external_bcryptjs_default = /*#__PURE__*/__webpack_require__.n(external_bcryptjs_namespaceObject);
;// CONCATENATED MODULE: external "mongoose"
const external_mongoose_namespaceObject = require("mongoose");;
var external_mongoose_default = /*#__PURE__*/__webpack_require__.n(external_mongoose_namespaceObject);
;// CONCATENATED MODULE: external "validator"
const external_validator_namespaceObject = require("validator");;
var external_validator_default = /*#__PURE__*/__webpack_require__.n(external_validator_namespaceObject);
;// CONCATENATED MODULE: ./src/server/models/Users.ts



const UserSchema = new external_mongoose_namespaceObject.Schema({
    email: {
        type: String,
        require: 'Email address is required',
        validate: [(external_validator_default()).isEmail, 'Invalid email'],
        unique: true,
    },
    password: String,
    login: String,
}, {
    timestamps: true,
});
const User = external_mongoose_default().model('Users', UserSchema);
/* harmony default export */ const Users = (User);

;// CONCATENATED MODULE: external "jsonwebtoken"
const external_jsonwebtoken_namespaceObject = require("jsonwebtoken");;
var external_jsonwebtoken_default = /*#__PURE__*/__webpack_require__.n(external_jsonwebtoken_namespaceObject);
;// CONCATENATED MODULE: external "lodash"
const external_lodash_namespaceObject = require("lodash");;
;// CONCATENATED MODULE: ./src/server/utils/createJWToken.ts


/* harmony default export */ const createJWToken = ((user) => {
    const token = external_jsonwebtoken_default().sign({
        data: (0,external_lodash_namespaceObject.reduce)(user, (result, value, key) => {
            if (key !== 'password') {
                result[key] = value;
            }
            return result;
        }, {}),
    }, "UpFJfpWKYteH5rMHSxst" || 0, {
        expiresIn: "7d",
        algorithm: 'HS256',
    });
    return token;
});

;// CONCATENATED MODULE: ./src/server/routers/auth.routers.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const router = (0,external_express_namespaceObject.Router)();
router.post('/register', [
    (0,external_express_validator_namespaceObject.check)('email', 'Incorrect email.').isEmail(),
    (0,external_express_validator_namespaceObject.check)('password', 'Minimum field length 6 characters.').isLength({ min: 6 }),
    (0,external_express_validator_namespaceObject.check)('login', 'Minimum field length 1 characters.').isLength({ min: 1 }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0,external_express_validator_namespaceObject.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data during registration.',
            });
        }
        const postData = {
            email: req.body.email,
            password: req.body.password,
            login: req.body.login,
        };
        const candidate = yield Users.findOne({ email: postData.email });
        if (candidate) {
            return res.status(400).json({ message: 'Such user already exists.' });
        }
        const hashedPassword = yield external_bcryptjs_default().hash(postData.password, 12);
        const user = new Users({
            email: postData.email,
            password: hashedPassword,
            login: postData.login,
        });
        console.log(req.body);
        yield user.save();
        res.status(201).json({ message: 'User was created.' });
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again.' });
    }
}));
router.post('/login', [(0,external_express_validator_namespaceObject.check)('email', 'Enter correct email.').normalizeEmail().isEmail(), (0,external_express_validator_namespaceObject.check)('password', 'Введите пароль').exists()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0,external_express_validator_namespaceObject.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect login data.',
            });
        }
        const postData = {
            email: req.body.email,
            password: req.body.password,
        };
        const user = yield Users.findOne({ email: postData.email });
        if (!user) {
            return res.status(400).json({ message: 'User is not found.' });
        }
        const isMatch = yield external_bcryptjs_default().compare(postData.password, user.password);
        if (isMatch) {
            const token = createJWToken(user);
            console.log(req.body);
            res.json({
                status: 'success',
                token,
            });
        }
        else {
            res.status(403).json({
                status: 'error',
                message: 'Incorrect password or email',
            });
        }
    }
    catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again.' });
    }
}));
router.post('/getUserLogin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users.findOne({ _id: req.body.userId });
        return res.json(user.login);
    }
    catch (e) {
        return res.status(500).json({ message: 'Can not get user.' });
    }
}));
/* harmony default export */ const auth_routers = (router);

;// CONCATENATED MODULE: ./src/server/routers/export.routers.ts


const export_routers_router = (0,external_express_namespaceObject.Router)();
export_routers_router.use('/auth', auth_routers);
/* harmony default export */ const export_routers = (export_routers_router);

;// CONCATENATED MODULE: external "body-parser"
const external_body_parser_namespaceObject = require("body-parser");;
var external_body_parser_default = /*#__PURE__*/__webpack_require__.n(external_body_parser_namespaceObject);
;// CONCATENATED MODULE: external "cors"
const external_cors_namespaceObject = require("cors");;
var external_cors_default = /*#__PURE__*/__webpack_require__.n(external_cors_namespaceObject);
;// CONCATENATED MODULE: ./src/server/mongo.config.ts

external_mongoose_default().connect("mongodb+srv://student:1234qwer@cluster0.n1cm5.mongodb.net/app?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

;// CONCATENATED MODULE: ./src/server/Server.tsx





const server = external_express_default()();
server.use(external_cors_default()());
server.use(external_express_default().json());
server.use(external_body_parser_default().json());
server.use('/api', export_routers);
server.listen("3333", () => console.log(`Listening on port ${"3333"}`));

/******/ })()
;