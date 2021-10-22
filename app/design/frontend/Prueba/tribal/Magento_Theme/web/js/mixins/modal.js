define(
    [
        'jquery',
        'ko',
        'Magento_Ui/js/modal/modal'
    ], function ($, ko, modal) {
        var mixin = {
            initialize: function () {
                this._super();
                this.enableModal = ko.observable(false);
            },
            existsCookiModal: function () {
                const cookie_ = $.cookie("modal");
                if (cookie_) {
                    return true;
                } else {
                    return false;
                }
            },
            openModal: function () {

                if (this.enableModal() ||  this.existsCookiModal()) {
                    return
                }
                const options = {
                    type: 'popup',
                    title: 'Bienvenido',
                    modalClass: "modal-bienvenido",
                    responsive: true,
                    innerScroll: false,
                    buttons: [{
                        text: $.mage.__('Cerrar'),
                        class: 'action-primary',
                        click: function () {
                            this.closeModal();
                        }
                    }]
                }
                modal(options, "#container-modal");
                $("#container-modal").modal('openModal');
                var date = new Date();
                var minutes = 5;
                date.setTime(date.getTime() + (minutes * 60 * 1000));
                $.cookie('modal', date, {path: '/', expire: date});
                this.enableModal(true);
            },
        }
        return function (target) {
            return target.extend(mixin)
        }
    }
);

