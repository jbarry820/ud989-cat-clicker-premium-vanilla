
/* ======= Model ======= */

var model = {
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};


/* ======= Octopus ======= */

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


/* ======= View ======= */

var CatView = function(params) { this.init(params); };

CatView.prototype = {

    controller: false,

    init: function(params) {
        var that = this;
        for (var i in params)
            this[i] = params[i];

        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.countElem = document.getElementById('cat-count');
        this.catImageElem = document.getElementById('cat-img');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            that.controller.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var that = this;
        // update the DOM elements with values from the current cat
        var currentCat = this.controller.getCurrentCat();
        //var currentCat = CatController.prototype.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var CatListView = function(params) { this.init(params); };

CatListView.prototype = {

    controller: false,
    cats: false,

    init: function(params) {
        for (var i in params)
            this[i] = params[i];

        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        var that = this;
        // get the cats we'll be rendering from the octopus

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < that.cats.length; i++) {
            // this is the cat we're currently looping over
            cat = that.cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    that.controller.setCurrentCat(catCopy);
                    //console.log(catCopy);
                    CatView.prototype.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

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

// make it go!
var octopus = new CatController();

