export class Modal {
    constructor(selector) {
        this.name = selector;
        this.toggle = document.querySelector(`[data-modal='${this.name}']`);
        this.box = document.querySelector(this.name);
        this.inner = this.box.querySelector('.modal__inner');
        this.closeBtn = this.box.querySelector('.js-modal-close');
        this.scrollbarWidth = 17;
        this.overlay = null;
        this.active = false;
        this.init();
    }

    init() {
        this._registerHandler();
    }

    _openModal(item) {
        this._createOverlay();
        this._blockedScreenScroll();
        item.style.display = 'block';
        item.style.paddingRight = `${this.scrollbarWidth}px`;
        item.classList.add('active');
    }

    _closeModal(item) {
        item.style.display = 'none';
        item.classList.remove('active')
        this._unblockedScreenScroll();
        this._removeOverlay();
    }

    _registerHandler() {
        this.toggle.addEventListener('click', () => {

            window.modals.map(modal => {
                modal.active ? modal._closeModal(modal.box) : false
            })

            this._openModal(this.box);
            this.active = true;
        });

        this.closeBtn.addEventListener('click', () => {
            this._closeModal(this.box);
        });
        this.box.addEventListener('click', (e) => {
            if (!this.inner.contains(e.target)) {
                this._closeModal(this.box);
            }
        });

    }

    _createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.classList = 'modal-overlay';
        this.overlay.style.overflowY = 'scroll';
        document.body.append(this.overlay);
        this.scrollbarWidth = this.overlay.offsetWidth - this.overlay.clientWidth;
    }

    _removeOverlay() {
        this.overlay.remove();
    }

    _blockedScreenScroll() {
        document.body.style.paddingRight = `${this.scrollbarWidth}px`;
        document.body.classList.add('modal-open');
    }

    _unblockedScreenScroll() {
        document.body.style.paddingRight = '';
        document.body.classList.remove('modal-open');
    }
}
