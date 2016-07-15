// load modules
const util = require('./Util.js');


module.exports = function Queue(parent) {

	/**
	 * @var {String} this.name
	 */
	this.name = 'Queue';

	/**
	 * @var {Object} this.options
	 */
	this.options = parent.options.queue;

	/**
	 * @var {Object} this.items
	 */
	this.items = { ids: [], files: [] };

	/**
	 * @var {String} this.style
	 */
	this.style = 'list';

	/**
	 * @var {Object} this.$queue
	 */
	this.$queue = util.findDOM(parent.$container, 'element', 'queue').children('ul');

	/**
	 * @var {Object} this.$templete
	 */
	this.$templete = util.findDOM(parent.$container, 'element', 'template');


	/**
	 * init event
	 *
	 */
	var initEvent = () => {
		var self = this;

		// change queue style
		let $selectQueueStyle = util.findDOM(parent.$container, 'element', 'selectQueueStyle');
		if ($selectQueueStyle.length)
		{
			$selectQueueStyle.children('button').on('click', function(){
				if ($(this).hasClass('on')) return false;
				self.changeStyle($(this).data('style'));
			});
		}
	};

	/**
	 * change style
	 *
	 * @Param {String} styleName
	 */
	this.changeStyle = (styleName) => {
		// change style
		let $selectQueueStyle = util.findDOM(parent.$container, 'element', 'selectQueueStyle');
		$selectQueueStyle.children('button').removeClass('on').filter('.style-' + styleName).addClass('on');

		this.style = styleName;
		this.$queue.removeClass().addClass('style-' + styleName);
	};

	/**
	 * add queue
	 *
	 */
	this.add = (file) => {
		this.items.ids.push(file.id);
		this.items.files.push(file);
	};

	/**
	 * remove queue
	 *
	 */
	this.remove = (id) => {

	};

	/**
	 * find item
	 *
	 * @Param {int} idName
	 * @Return {int}
	 */
	this.findItem = (idName) => {
		return this.items.ids.indexOf(idName);
	}


	/**
	 * select queue element
	 *
	 * @Param {String} id
	 * @Return {Object}
	 */
	this.selectQueueElement = (id) => {
		return this.$queue.children('li[data-id=' + id + ']');
	};

	/**
	 * add progress queue
	 *
	 * @Param {Object} res
	 */
	this.addProgress = (items) => {
		items.forEach((item) => {
			this.add(item);

			let $tmpEl = this.$templete.children();
			let $item = $tmpEl.children('.loading').clone();

			// input meta
			$item.attr('data-id', item.id);
			util.findDOM($item, 'text', 'filename').text(item.name);

			// reset percentage
			util.findDOM($item, 'element', 'progress').width('0%').find('em').text('0');

			// append element
			this.$queue.append($item);
		});
	};

	/**
	 * updare queue
	 *
	 * @Param {Object} res
	 */
	this.updateProgress = (res) => {
		let $el = this.$queue.children('li[data-id=' + res.id + ']');
		let $progress = util.findDOM($el, 'element', 'progress');
		let percent = parseInt((res.data.loaded / res.data.total) * 100);
		$progress.width(percent + '%').find('em').text(percent);
	};

	/**
	 * change progress to complete queue
	 *
	 * @Param {Object} res
	 */
	this.changeProgressToComplete = (file) => {
		let id = file.id;
		let $targetEl = this.selectQueueElement(id);
		let $el = this.$templete.children().children('.complete').clone();
		let item = this.items.files[this.findItem(id)];

		// set queue id
		$el.attr('data-id', id);

		let $previewImages = util.findDOM($el, 'element', 'previewImage');
		let $customButtons = util.findDOM($el, 'element', 'customButtons');
		let $fileType = util.findDOM($el, 'text', 'filetype');
		let $fileName = util.findDOM($el, 'text', 'filename');
		let $state = util.findDOM($el, 'text', 'state');
		let $fileSize = util.findDOM($el, 'text', 'filesize');

		$fileType.text(file.type);
		$fileName.text(file.name);
		$state.text('uploaded');
		$fileSize.text(util.bytesToSize(file.size));

		$previewImages.css('background-image', 'url(' + file.src + ')');

		// TODO : 선택 이벤트 등록 (터치도 고려필요함)

		// append complete queue and remove progress queue
		$targetEl.after($el).remove();
	};

	/**
	 * change progress to error queue
	 *
	 * @Param {String} message
	 * @Param {Object} file
	 */
	this.changeProgressToError = (message, file) => {
		let id = file.id;
		let $targetEl = this.selectQueueElement(id);
		let $el = this.$templete.children().children('.error').clone();
		let item = this.items.files[this.findItem(id)];

		// set queue id
		$el.attr('data-id', id);

		let $fileType = util.findDOM($el, 'text', 'filetype');
		let $fileName = util.findDOM($el, 'text', 'filename');
		let $state = util.findDOM($el, 'text', 'state');

		$fileType.text(file.type);
		$fileName.text(file.name);
		$state.text(message);

		// append error queue and remove progress queue
		$targetEl.after($el).remove();

		setTimeout(() => {
			$el.remove();
		}, 3000);
	};


	this.import = (res) => {
		// TODO : 외부에서 가져온 데이터로 큐 등록하기
	};


	// set queue height
	util.findDOM(parent.$container, 'comp', 'queue').height(this.options.height);

	// init event
	initEvent();

	// set style
	this.changeStyle(this.options.style);
};