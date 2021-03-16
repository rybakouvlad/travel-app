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
    filepath: {
        type: String,
        unique: true,
    },
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

;// CONCATENATED MODULE: ./src/server/auth.middleware.tsx

const auth = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Auth error' });
        }
        const decoded = external_jsonwebtoken_default().verify(token, "UpFJfpWKYteH5rMHSxst");
        req.user = decoded.data._doc;
        next();
    }
    catch (e) {
        return res.status(401).json({ message: 'Auth error' });
    }
};
/* harmony default export */ const auth_middleware = (auth);

;// CONCATENATED MODULE: external "shortid"
const external_shortid_namespaceObject = require("shortid");;
var external_shortid_default = /*#__PURE__*/__webpack_require__.n(external_shortid_namespaceObject);
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
router.post('/upload', auth_middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users.findOne({ _id: req.user._id });
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        const sampleFile = req.files.file;
        const fileName = external_shortid_default().generate() + '.jpg';
        const uploadPath = `${"./server/assets/img/users"}` + '/' + fileName;
        sampleFile.mv(uploadPath, function (err) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.status(500).send(err);
                }
                user.filepath = fileName;
                yield user.save();
                res.status(200).send('File uploaded!');
            });
        });
    }
    catch (error) { }
}));
router.post('/getImg', auth_middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users.findOne({ _id: req.user._id });
        return res.json(user.filepath);
    }
    catch (e) {
        return res.status(500).json({ message: 'Can not get user.' });
    }
}));
/* harmony default export */ const auth_routers = (router);

;// CONCATENATED MODULE: ./src/server/models/Country.ts


const CountrySchema = new external_mongoose_namespaceObject.Schema({
    alpha2: String,
    name_by: String,
    name_ru: String,
    name_en: String,
    capital_by: String,
    capital_ru: String,
    capital_en: String,
    description_by: String,
    description_ru: String,
    description_en: String,
    currency: String,
});
const Country = external_mongoose_default().model('Country', CountrySchema);
/* harmony default export */ const models_Country = (Country);

;// CONCATENATED MODULE: ./src/server/routers/country.routes.ts
var country_routes_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const country_routes_router = (0,external_express_namespaceObject.Router)();
country_routes_router.get('/all/:lang', (req, res) => country_routes_awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_Country.find({});
        return res.status(200).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Can not get date.' });
    }
}));
country_routes_router.get('/:lang/:name', (req, res) => country_routes_awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_Country.findOne({ alpha2: req.params.name });
        if (!data) {
            return res.status(500).json({ message: 'Can not get date.' });
        }
        const result = {
            alpha2: data.alpha2,
            currency: data.currency,
            name: '',
            capital: '',
            description: '',
        };
        switch (req.params.lang) {
            case 'ru':
                result.name = data.name_ru;
                result.capital = data.capital_ru;
                result.description = data.description_ru;
                break;
            case 'by':
                result.name = data.name_by;
                result.capital = data.capital_by;
                result.description = data.description_by;
                break;
            case 'en':
                result.name = data.name_en;
                result.capital = data.capital_en;
                result.description = data.description_en;
                break;
            default:
                break;
        }
        return res.status(200).json(result);
    }
    catch (e) {
        return res.status(500).json({ message: 'Can not get date.' });
    }
}));
country_routes_router.post('/set', (req, res) => country_routes_awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = new models_Country({
            alpha2: req.body.alpha2,
            name_ru: req.body.name_ru,
            name_by: req.body.name_by,
            name_en: req.body.name_en,
            capital_ru: req.body.capital_ru,
            capital_by: req.body.capital_by,
            capital_en: req.body.capital_en,
            description_ru: req.body.description_ru,
            description_by: req.body.description_by,
            description_en: req.body.description_en,
            currency: req.body.currency,
        });
        yield data.save();
        return res.status(200).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Can not get date.' });
    }
}));
/* harmony default export */ const country_routes = (country_routes_router);

;// CONCATENATED MODULE: ./src/server/models/Image.ts


const ImageSchema = new external_mongoose_namespaceObject.Schema({
    name_by: String,
    name_ru: String,
    name_en: String,
    country: { type: external_mongoose_namespaceObject.Schema.Types.ObjectId, ref: 'Country' },
    path: String,
    description_by: String,
    description_ru: String,
    description_en: String,
});
const Image = external_mongoose_default().model('Image', ImageSchema);
/* harmony default export */ const models_Image = (Image);

;// CONCATENATED MODULE: ./src/server/routers/image.routers.ts
var image_routers_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const image_routers_router = (0,external_express_namespaceObject.Router)();
image_routers_router.post('/all/:lang', (req, res) => image_routers_awaiter(void 0, void 0, void 0, function* () {
    try {
        const country = yield models_Country.findOne({ alpha2: req.body.alpha2 });
        const data = yield models_Image.find({ country: country._id });
        return res.status(200).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Can not get date.' });
    }
}));
image_routers_router.post('/set', (req, res) => image_routers_awaiter(void 0, void 0, void 0, function* () {
    try {
        const country = yield models_Country.findOne({ alpha2: req.body.alpha2 });
        const data = new models_Image({
            name_ru: req.body.name_ru,
            name_by: req.body.name_by,
            name_en: req.body.name_en,
            description_ru: req.body.description_ru,
            description_by: req.body.description_by,
            description_en: req.body.description_en,
            path: req.body.path,
            country: country._id,
        });
        yield data.save();
        return res.status(200).json(data);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Can not set image.' });
    }
}));
/* harmony default export */ const image_routers = (image_routers_router);

;// CONCATENATED MODULE: ./src/server/models/Raiting.ts


const RaitingSchema = new external_mongoose_namespaceObject.Schema({
    rating: Number,
    comment: String,
    image: { type: external_mongoose_namespaceObject.Schema.Types.ObjectId, ref: 'Image' },
    user: { type: external_mongoose_namespaceObject.Schema.Types.ObjectId, ref: 'User' },
    login: String,
    filepath: String,
}, {
    timestamps: true,
});
const Raiting = external_mongoose_default().model('Raiting', RaitingSchema);
/* harmony default export */ const models_Raiting = (Raiting);

;// CONCATENATED MODULE: ./src/server/routers/raiting.routers.ts
var raiting_routers_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const raiting_routers_router = (0,external_express_namespaceObject.Router)();
raiting_routers_router.post('/getAll', (req, res) => raiting_routers_awaiter(void 0, void 0, void 0, function* () {
    try {
        const raitings = yield models_Raiting.find({ image: req.body.imageId }).populate({ path: 'user', model: Users });
        return res.json(raitings);
    }
    catch (e) {
        return res.status(500).json({ message: 'Can not get raitings' });
    }
}));
raiting_routers_router.post('/set', auth_middleware, [(0,external_express_validator_namespaceObject.check)('comment', 'Enter comment.').exists()], (req, res) => raiting_routers_awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0,external_express_validator_namespaceObject.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Comment is incorrect.',
            });
        }
        const raiting = new models_Raiting({
            rating: req.body.raiting,
            comment: req.body.comment,
            image: req.body.imageId,
            user: req.user._id,
            login: req.user.login,
            filepath: req.user.filepath,
        });
        yield raiting.save();
        res.status(201).json({ message: 'Raiting created.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again.' });
    }
}));
/* harmony default export */ const raiting_routers = (raiting_routers_router);

;// CONCATENATED MODULE: ./src/server/routers/export.routers.ts





const export_routers_router = (0,external_express_namespaceObject.Router)();
export_routers_router.use('/country', country_routes);
export_routers_router.use('/auth', auth_routers);
export_routers_router.use('/image', image_routers);
export_routers_router.use('/raiting', raiting_routers);
/* harmony default export */ const export_routers = (export_routers_router);

;// CONCATENATED MODULE: external "body-parser"
const external_body_parser_namespaceObject = require("body-parser");;
var external_body_parser_default = /*#__PURE__*/__webpack_require__.n(external_body_parser_namespaceObject);
;// CONCATENATED MODULE: external "cors"
const external_cors_namespaceObject = require("cors");;
var external_cors_default = /*#__PURE__*/__webpack_require__.n(external_cors_namespaceObject);
;// CONCATENATED MODULE: external "express-fileupload"
const external_express_fileupload_namespaceObject = require("express-fileupload");;
var external_express_fileupload_default = /*#__PURE__*/__webpack_require__.n(external_express_fileupload_namespaceObject);
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
server.use(external_express_fileupload_default()());
server.use('/api', export_routers);
server.use('/assets', external_express_default().static('./server/assets/img'));
server.listen("3333", () => console.log(`Listening on port ${"3333"}`));

/******/ })()
;