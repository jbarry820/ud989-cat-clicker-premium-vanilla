
var AdminView = function(params) { this.init(params); };

AdminView.prototype = {

    controller: false,

    init: function(params) {
        var that = this;
        for (var i in params)
            this[i] = params[i];

        // store the DOM element for easy access later
        this.adminElem   = document.getElementById('adminForm');
        this.adminButton = document.getElementById('admin_button');
        this.adminElem.style.display = "none";
        this.cancelElem  = document.getElementById('cancel_button');
        this.saveElem    = document.getElementById('save_button');
        this.saveElem.style.display = 'none';
        this.cancelElem.style.display = 'none';
        this.CatName     = document.getElementById('adminCatName');
        this.Url         = document.getElementById('adminCatURL');
        this.Clicks      = document.getElementById('adminCatClicks');

        this.adminButton.addEventListener('click', function(){
            that.controller.fillAdmin();
        });

        this.cancelElem.addEventListener('click', function(){
            that.controller.cancelAdmin();
        });

        this.saveElem.addEventListener('click', function(){
            that.controller.saveAdmin();
        });

        // render this view (update the DOM elements with the right values)
        //this.render();
    },

    unhideForm: function() {
        document.getElementById('adminForm').style.display = "block";

        this.saveElem.style.display = "block";
        this.cancelElem.style.display = "block";

        var adminCat = this.controller.getCurrentCat().name;
        this.CatName.value = adminCat;

        var adminUrl = this.controller.getCurrentCat().imgSrc;
        this.Url.value = adminUrl;

        var adminClicks = this.controller.getCurrentCat().clickCount;
        this.Clicks.value = adminClicks;
    },

    cancelForm: function() {
        document.getElementById('adminForm').style.display = "none";
        this.saveElem.style.display = "none";
        this.cancelElem.style.display = "none";
    },

    saveForm: function() {
        this.controller.saveAdmin();
    }
};
