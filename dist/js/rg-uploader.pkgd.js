/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\n// load modules\nvar util = __webpack_require__(1);\nvar Queue = __webpack_require__(2);\nvar Uploader = __webpack_require__(3);\n\n/**\n * class RGUploader\n *\n * @param {Object} options\n */\nwindow.RGUploader = function (options) {\n\tvar _this = this;\n\n\t// set self\n\tvar self = this;\n\n\t// set options\n\tthis.options = $.extend({}, this.defaultOptions, options);\n\n\t/**\n  * @var {int} cuttentSize\n  */\n\tthis.currentSize = 0;\n\n\t/**\n  * update size\n  *\n  * @Param {int} current\n  */\n\tthis.updateSize = function (size) {\n\n\t\tvar $con = _this.$container;\n\n\t\t_this.currentSize += size;\n\n\t\tvar current = util.bytesToSize(_this.currentSize);\n\t\tvar total = util.bytesToSize(_this.options.limitSizeTotal);\n\n\t\tutil.findDOM($con, 'text', 'currentSize').text(current);\n\t\tutil.findDOM($con, 'text', 'totalSize').text(total);\n\t};\n\n\t// ACTION\n\tif (this.options.$container.length) {\n\t\t// set container element\n\t\tthis.$container = this.options.$container.eq(0);\n\n\t\t// init sub modules\n\t\tthis.queue = new Queue(this);\n\t\tthis.uploader = new Uploader(this);\n\n\t\t// update size\n\t\t// TODO : queue가 있으면 임포트하고나서 업데이트하기\n\t\tthis.updateSize(0);\n\t}\n};\n\n/*****************************\n * M E T H O D\n *****************************/\n\n/**\n * default options\n */\nRGUploader.prototype.defaultOptions = {\n\tuploadScript: '',\n\tautoUpload: true,\n\t$container: $('.rg-uploader'),\n\t$externalFileForm: $('#extUpload'),\n\tallowFileTypes: ['jpeg', 'png', 'gif'],\n\tlimitSize: 1000000,\n\tlimitSizeTotal: 3000000,\n\tqueue: {\n\t\theight: 150,\n\t\tlimit: 5,\n\t\tstyle: 'web',\n\t\tbuttons: [{\n\t\t\tname: '',\n\t\t\ticonName: '',\n\t\t\taction: function action() {}\n\t\t}]\n\t},\n\tplugin: [{}],\n\tuploadProgress: function uploadProgress() {},\n\tuploadComplete: function uploadComplete() {},\n\tuploadFail: function uploadFail() {}\n};\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/js/rg-Uploader.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/js/rg-Uploader.js?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("'use strict';\n\n// Util module\n\nmodule.exports = {\n\n\tname: 'Util',\n\n\t/**\n  * byte to size convert\n  *\n  * @Param {Number} bytes\n  * @Return {String}\n  */\n\tbytesToSize: function bytesToSize(bytes) {\n\t\tvar sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];\n\t\tif (bytes == 0) return '0';\n\t\tvar i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));\n\t\treturn Math.round(bytes / Math.pow(1024, i), 2) + '' + sizes[i];\n\t},\n\n\n\t/**\n  * find DOM\n  *\n  * @Param {Object} $con\n  * @Param {String} key\n  * @Param {String} name\n  * @Return {Object}\n  */\n\tfindDOM: function findDOM($con, key, name) {\n\t\treturn $con.find('[data-' + key + '=' + name + ']');\n\t},\n\n\n\t/**\n  * get unique number\n  *\n  * @Param {int} length\n  * @Return {int}\n  */\n\tgetUniqueNumber: function getUniqueNumber(length) {\n\t\tlength = length || 10;\n\t\tvar timestamp = +new Date();\n\n\t\tvar _getRandomInt = function _getRandomInt(min, max) {\n\t\t\treturn Math.floor(Math.random() * (max - min + 1)) + min;\n\t\t};\n\n\t\tvar ts = timestamp.toString();\n\t\tvar parts = ts.split(\"\").reverse();\n\t\tvar id = \"\";\n\n\t\tfor (var i = 0; i < length; ++i) {\n\t\t\tvar index = _getRandomInt(0, parts.length - 1);\n\t\t\tid += parts[index];\n\t\t}\n\n\t\treturn parseInt(id);\n\t}\n\n\t// TODO : detect touch 메서드 만들기\n\n};\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/js/Util.js\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/js/Util.js?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\n// load modules\nvar util = __webpack_require__(1);\n\nmodule.exports = function Queue(parent) {\n\tvar _this = this;\n\n\t/**\n  * @var {String} this.name\n  */\n\tthis.name = 'Queue';\n\n\t/**\n  * @var {Object} this.options\n  */\n\tthis.options = parent.options.queue;\n\n\t/**\n  * @var {Object} this.items\n  */\n\tthis.items = { ids: [], files: [] };\n\n\t/**\n  * @var {String} this.style\n  */\n\tthis.style = 'list';\n\n\t/**\n  * @var {Object} this.$queue\n  */\n\tthis.$queue = util.findDOM(parent.$container, 'element', 'queue').children('ul');\n\n\t/**\n  * @var {Object} this.$templete\n  */\n\tthis.$templete = util.findDOM(parent.$container, 'element', 'template');\n\n\t/**\n  * init event\n  *\n  */\n\tvar initEvent = function initEvent() {\n\t\tvar self = _this;\n\n\t\t// change queue style\n\t\tvar $selectQueueStyle = util.findDOM(parent.$container, 'element', 'selectQueueStyle');\n\t\tif ($selectQueueStyle.length) {\n\t\t\t$selectQueueStyle.children('button').on('click', function () {\n\t\t\t\tif ($(this).hasClass('on')) return false;\n\t\t\t\tself.changeStyle($(this).data('style'));\n\t\t\t});\n\t\t}\n\t};\n\n\t/**\n  * change style\n  *\n  * @Param {String} styleName\n  */\n\tthis.changeStyle = function (styleName) {\n\t\t// change style\n\t\tvar $selectQueueStyle = util.findDOM(parent.$container, 'element', 'selectQueueStyle');\n\t\t$selectQueueStyle.children('button').removeClass('on').filter('.style-' + styleName).addClass('on');\n\n\t\t_this.style = styleName;\n\t\t_this.$queue.removeClass().addClass('style-' + styleName);\n\t};\n\n\t/**\n  * add queue\n  *\n  */\n\tthis.add = function (file) {\n\t\t_this.items.ids.push(file.id);\n\t\t_this.items.files.push(file);\n\t};\n\n\t/**\n  * remove queue\n  *\n  */\n\tthis.remove = function (id) {};\n\n\t/**\n  * find item\n  *\n  * @Param {int} idName\n  * @Return {int}\n  */\n\tthis.findItem = function (idName) {\n\t\treturn _this.items.ids.indexOf(idName);\n\t};\n\n\t/**\n  * select queue element\n  *\n  * @Param {String} id\n  * @Return {Object}\n  */\n\tthis.selectQueueElement = function (id) {\n\t\treturn _this.$queue.children('li[data-id=' + id + ']');\n\t};\n\n\t/**\n  * add progress queue\n  *\n  * @Param {Object} res\n  */\n\tthis.addProgress = function (items) {\n\t\titems.forEach(function (item) {\n\t\t\t_this.add(item);\n\n\t\t\tvar $tmpEl = _this.$templete.children();\n\t\t\tvar $item = $tmpEl.children('.loading').clone();\n\n\t\t\t// input meta\n\t\t\t$item.attr('data-id', item.id);\n\t\t\tutil.findDOM($item, 'text', 'filename').text(item.name);\n\n\t\t\t// reset percentage\n\t\t\tutil.findDOM($item, 'element', 'progress').width('0%').find('em').text('0');\n\n\t\t\t// append element\n\t\t\t_this.$queue.append($item);\n\t\t});\n\t};\n\n\t/**\n  * updare queue\n  *\n  * @Param {Object} res\n  */\n\tthis.updateProgress = function (res) {\n\t\tvar $el = _this.$queue.children('li[data-id=' + res.id + ']');\n\t\tvar $progress = util.findDOM($el, 'element', 'progress');\n\t\tvar percent = parseInt(res.data.loaded / res.data.total * 100);\n\t\t$progress.width(percent + '%').find('em').text(percent);\n\t};\n\n\t/**\n  * change progress to complete queue\n  *\n  * @Param {Object} res\n  */\n\tthis.changeProgressToComplete = function (file) {\n\t\tvar id = file.id;\n\t\tvar $targetEl = _this.selectQueueElement(id);\n\t\tvar $el = _this.$templete.children().children('.complete').clone();\n\t\tvar item = _this.items.files[_this.findItem(id)];\n\n\t\t// set queue id\n\t\t$el.attr('data-id', id);\n\n\t\tvar $previewImages = util.findDOM($el, 'element', 'previewImage');\n\t\tvar $customButtons = util.findDOM($el, 'element', 'customButtons');\n\t\tvar $fileType = util.findDOM($el, 'text', 'filetype');\n\t\tvar $fileName = util.findDOM($el, 'text', 'filename');\n\t\tvar $state = util.findDOM($el, 'text', 'state');\n\t\tvar $fileSize = util.findDOM($el, 'text', 'filesize');\n\n\t\t$fileType.text(file.type);\n\t\t$fileName.text(file.name);\n\t\t$state.text('uploaded');\n\t\t$fileSize.text(util.bytesToSize(file.size));\n\n\t\t$previewImages.css('background-image', 'url(' + file.src + ')');\n\n\t\t// TODO : 선택 이벤트 등록 (터치도 고려필요함)\n\n\t\t// append complete queue and remove progress queue\n\t\t$targetEl.after($el).remove();\n\t};\n\n\t/**\n  * change progress to error queue\n  *\n  * @Param {String} message\n  * @Param {Object} file\n  */\n\tthis.changeProgressToError = function (message, file) {\n\t\tvar id = file.id;\n\t\tvar $targetEl = _this.selectQueueElement(id);\n\t\tvar $el = _this.$templete.children().children('.error').clone();\n\t\tvar item = _this.items.files[_this.findItem(id)];\n\n\t\t// set queue id\n\t\t$el.attr('data-id', id);\n\n\t\tvar $fileType = util.findDOM($el, 'text', 'filetype');\n\t\tvar $fileName = util.findDOM($el, 'text', 'filename');\n\t\tvar $state = util.findDOM($el, 'text', 'state');\n\n\t\t$fileType.text(file.type);\n\t\t$fileName.text(file.name);\n\t\t$state.text(message);\n\n\t\t// append error queue and remove progress queue\n\t\t$targetEl.after($el).remove();\n\n\t\tsetTimeout(function () {\n\t\t\t$el.remove();\n\t\t}, 3000);\n\t};\n\n\tthis.import = function (res) {\n\t\t// TODO : 외부에서 가져온 데이터로 큐 등록하기\n\t};\n\n\t// set queue height\n\tutil.findDOM(parent.$container, 'comp', 'queue').height(this.options.height);\n\n\t// init event\n\tinitEvent();\n\n\t// set style\n\tthis.changeStyle(this.options.style);\n};\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/js/Queue.js\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/js/Queue.js?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\n/**\n * Uploader component\n */\n\nvar fileUpload = __webpack_require__(4);\nvar util = __webpack_require__(1);\n\n/**\n * reset input[type=file]\n *\n * @param {Object} $el\n */\nfunction resetForm($el) {\n\t$el.replaceWith($el.clone(true));\n}\n\n// export\nmodule.exports = function Uploader(parent) {\n\tvar _this = this;\n\n\t/**\n  * @var {String} component name\n  */\n\tthis.name = 'Uploader';\n\n\t/**\n  * @var {Queue} queue\n  */\n\tthis.queue = parent.queue;\n\n\t/**\n  * @var {Object} upload elements\n  */\n\tthis.$uploadElement = null;\n\n\t/**\n  * @var {Array} readyItems\n  */\n\tthis.readyItems = [];\n\n\t/**\n  * @var {Boolean} uploading\n  */\n\tthis.uploading = false;\n\n\t/**\n  * get total ready items size\n  *\n  * @Param {Array} items\n  * @Return {int}\n  */\n\tvar getTotalReadySize = function getTotalReadySize(items) {\n\t\tvar size = 0;\n\t\tfor (var i = 0; i < items.length; i++) {\n\t\t\tsize += items[i].size;\n\t\t}\n\t\treturn size;\n\t};\n\n\t/**\n  * push ready upload files\n  *\n  * @Param {Object} el [type=file] element\n  */\n\tthis.pushReadyUploadFiles = function (el) {\n\t\tvar files = el.files;\n\t\tvar options = parent.options;\n\t\tvar limitCount = options.queue.limit;\n\t\tvar error = {\n\t\t\ttype: false,\n\t\t\textension: false,\n\t\t\tfilesize: false\n\t\t};\n\n\t\tfunction actError(type, message) {\n\t\t\tif (error[type] == false) {\n\t\t\t\talert(message);\n\t\t\t\terror[type] = true;\n\t\t\t}\n\t\t}\n\n\t\t// check file count\n\t\tif (files.length > limitCount) {\n\t\t\talert('파일은 총 ' + options.queue.limit + '개까지 업로드할 수 있습니다.');\n\t\t\treturn false;\n\t\t}\n\n\t\tif (options.limitSizeTotal < getTotalReadySize(_this.readyItems) + getTotalReadySize(files)) {\n\t\t\talert('업로드할 수 있는 용량이 초과되었습니다.');\n\t\t\treturn false;\n\t\t}\n\n\t\t// check items and add items ready for upload\n\t\tfor (var i = 0; i < files.length; i++) {\n\t\t\tif (!files[i].type) {\n\t\t\t\tactError('type', '잘못된 형식의 파일입니다.');\n\t\t\t\tcontinue;\n\t\t\t};\n\n\t\t\t// check file extension\n\t\t\tif (options.allowFileTypes.indexOf(files[i].type.split('/')[1]) < 0) {\n\t\t\t\tactError('extension', '허용되지 않는 파일은 제외됩니다.');\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\t// check file size\n\t\t\tif (files[i].size > options.limitSize) {\n\t\t\t\tactError('filesize', '허용하는 용량을 초과한 파일은 제외됩니다.');\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\t// set unique id\n\t\t\tfiles[i].id = util.getUniqueNumber();\n\n\t\t\t// push upload item\n\t\t\t_this.readyItems.push(files[i]);\n\t\t}\n\n\t\tparent.queue.addProgress(_this.readyItems);\n\t};\n\n\t/**\n  * play upload\n  *\n  */\n\tthis.playUpload = function () {\n\t\tif (!_this.readyItems.length) return false;\n\n\t\t_this.uploading = true;\n\n\t\tif (parent.options.uploadScript) {\n\t\t\tfileUpload(parent.options.uploadScript, _this.readyItems[0], function (type, response, file) {\n\t\t\t\t// remove complete item\n\t\t\t\tswitch (type) {\n\t\t\t\t\tcase 'progress':\n\t\t\t\t\t\t_this.uploadProgress(response, file);\n\t\t\t\t\t\tbreak;\n\t\t\t\t\tcase 'complete':\n\t\t\t\t\t\t_this.uploadComplete(response, file);\n\t\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t});\n\t\t} else {\n\t\t\t// TODO : make local upload\n\t\t}\n\t};\n\n\t/**\n  * upload progress event\n  *\n  * @Param {Object} res\n  * @Param {File} file\n  */\n\tthis.uploadProgress = function (res, file) {\n\t\tparent.queue.updateProgress({\n\t\t\tid: file.id,\n\t\t\tdata: res\n\t\t});\n\t};\n\n\t/**\n  * upload complete event\n  *\n  * @Param {Object} res\n  * @Param {File} file\n  */\n\tthis.uploadComplete = function (res, file) {\n\t\tswitch (res.state) {\n\t\t\tcase 'success':\n\t\t\t\tfile.src = res.response.src;\n\t\t\t\tparent.queue.changeProgressToComplete(file);\n\t\t\t\tparent.updateSize(file.size);\n\t\t\t\tbreak;\n\t\t\tcase 'error':\n\t\t\t\tparent.queue.changeProgressToError(res.response.message, file);\n\t\t\t\tbreak;\n\t\t}\n\n\t\t_this.readyItems.splice(0, 1);\n\n\t\t// play callback\n\t\tif (parent.options.uploadComplete) {\n\t\t\tparent.options.uploadComplete(file);\n\t\t}\n\n\t\t// next upload\n\t\tif (_this.readyItems.length) {\n\t\t\t_this.playUpload();\n\t\t} else {\n\t\t\t_this.uploading = false;\n\t\t}\n\t};\n\n\t/**\n  * init event\n  *\n  */\n\tthis.initEvent = function () {\n\t\tvar self = _this;\n\t\tvar $el = parent.$container.find('[data-element=addfiles]');\n\t\tvar $extEl = parent.options.$externalFileForm;\n\n\t\t// check upload element in container\n\t\tif (!$el.length) return;\n\n\t\t_this.$uploadElement = $el;\n\n\t\t// assign external upload element\n\t\tif ($extEl.length) {\n\t\t\t_this.$uploadElement = _this.$uploadElement.add($extEl);\n\t\t}\n\n\t\t// init change event\n\t\t_this.$uploadElement.on('change', function (e) {\n\t\t\t// check auto upload\n\n\t\t\tif (parent.options.autoUpload) {\n\t\t\t\t// push upload items\n\t\t\t\tself.pushReadyUploadFiles(e.currentTarget);\n\n\t\t\t\t// reset form\n\t\t\t\tresetForm($(e.currentTarget));\n\n\t\t\t\t// start upload\n\t\t\t\tif (!_this.uploading) {\n\t\t\t\t\tself.playUpload();\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\t};\n\n\tthis.initEvent();\n};\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/js/Uploader.js\n ** module id = 3\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/js/Uploader.js?");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("'use strict';\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol ? \"symbol\" : typeof obj; };\n\n/**\n * File upload class\n *\n * @author : redgoose\n * @param {String} action 파일처리 백엔드 url\n * @param {File} file\n * @param {Function} callback\n * @return void\n */\nvar FileUpload = function FileUpload(action, file, callback) {\n\tvar xhr = new XMLHttpRequest();\n\n\tif (typeof FormData === 'function' || (typeof FormData === 'undefined' ? 'undefined' : _typeof(FormData)) === 'object') {\n\t\tvar formData = new FormData();\n\t\tformData.append('file', file);\n\n\t\txhr.open('post', action, true);\n\t\txhr.upload.addEventListener('progress', function (e) {\n\t\t\tif (callback) {\n\t\t\t\tcallback('progress', uploadProgress(e), file);\n\t\t\t}\n\t\t}, false);\n\t\txhr.addEventListener('load', function (e) {\n\t\t\tif (callback) {\n\t\t\t\tcallback('complete', uploadSuccess(e.target), file);\n\t\t\t}\n\t\t});\n\t\txhr.send(formData);\n\t} else {\n\t\tif (callback) {\n\t\t\tcallback('complete', {\n\t\t\t\tstate: 'error',\n\t\t\t\tresponse: {\n\t\t\t\t\tmessage: 'not support browser'\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\t}\n};\n\n/**\n * upload progress\n * \n * @Param {XMLHttpRequestProgressEvent} e\n * @Return {object}\n */\nvar uploadProgress = function uploadProgress(e) {\n\tif (e.lengthComputable) {\n\t\treturn { loaded: e.loaded, total: e.total };\n\t}\n};\n\n/**\n * upload success\n *\n * @Param {XMLHttpRequestProgressEvent} e\n * @Param {File} file\n * @Return {Object}\n */\nvar uploadSuccess = function uploadSuccess(e, file) {\n\tif (e.readyState == 4) {\n\t\tswitch (e.status) {\n\t\t\tcase 200:\n\t\t\t\tvar response = e.responseText;\n\t\t\t\ttry {\n\t\t\t\t\treturn JSON.parse(decodeURIComponent((response + '').replace(/\\+/g, '%20')));\n\t\t\t\t} catch (e) {\n\t\t\t\t\treturn {\n\t\t\t\t\t\tstate: 'error',\n\t\t\t\t\t\tresponse: {\n\t\t\t\t\t\t\tmessage: response\n\t\t\t\t\t\t}\n\t\t\t\t\t};\n\t\t\t\t}\n\t\t\t\tbreak;\n\t\t\tcase 404:\n\t\t\t\treturn {\n\t\t\t\t\tstate: 'error',\n\t\t\t\t\tresponse: {\n\t\t\t\t\t\tmessage: '404 - File not found'\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t\tbreak;\n\t\t\tcase 403:\n\t\t\t\treturn {\n\t\t\t\t\tstate: 'error',\n\t\t\t\t\tresponse: {\n\t\t\t\t\t\tmessage: '403 - Forbidden file type'\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t\tbreak;\n\t\t\tdefault:\n\t\t\t\treturn {\n\t\t\t\t\tstate: 'error',\n\t\t\t\t\tresponse: {\n\t\t\t\t\t\tmessage: 'Unknown Error'\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t\tbreak;\n\t\t}\n\t}\n\n\treturn {\n\t\tstate: 'error',\n\t\tresponse: {\n\t\t\tmessage: 'Unknown Error'\n\t\t}\n\t};\n};\n\n// export\nmodule.exports = FileUpload;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/js/FileUpload.js\n ** module id = 4\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/js/FileUpload.js?");

/***/ }
/******/ ]);