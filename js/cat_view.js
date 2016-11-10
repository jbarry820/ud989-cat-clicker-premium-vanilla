
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
