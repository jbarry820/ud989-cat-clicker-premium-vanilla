
var CatController = function(params) { this.init(params); };

CatController.prototype = {

    catListView: false,
    catView: false,
    adminView: false,

    init: function(params) {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        this.catListView = new CatListView({
            controller: this,
            cats: model.cats
        });
        this.catView = new CatView({
            controller: this
        });
        this.adminView = new AdminView({
            controller: this
        });
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        console.log(document.getElementById('cat-count'));
        this.catView.render();
    },

    // increments the counter for the currently-selected cat
    addToCounter: function() {
        //console.log(model.currentCat.clickCount);
        this.catView.render();
    },

    // hides the admin form
    hideAdmin: function() {
        this.adminView.init();
    },

    // fill the admin form
    fillAdmin: function() {
        this.adminView.unhideForm();
    },

    // cancel the admin form
    cancelAdmin: function() {
        this.adminView.cancelForm();
    },

    // save the admin form
    saveAdmin: function() {
        console.log('octopus.saveAdmin');
        model.currentCat.clickCount = parseInt(document.getElementById('adminCatClicks').value);
        this.catView.render();

        //octopus.addToCounter(document.getElementById('adminCatClicks').value);
        /*newCount = document.getElementById('adminCatClicks').value.toString();
        //newCount = octopus.getCurrentCat().clickCount;
        //countFromModel = model[octopus.getCurrentCat()];
        countFromModel = octopus.getCurrentCat().clickCount;
        octopus.getCurrentCat().clickCount = newCount;
        countFromHtml = document.getElementById('cat-count').textContent;
        countFromHtml = newCount;
        console.log(countFromHtml);*/
        //catView.render();
    }
};
