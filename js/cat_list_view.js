
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

                    /* Begin Bug Fix ******************************************/
                    /*
                    /* CatView.prototype.render is a class method, you need to 
                    /* instead render the instance of CatView that exists in the 
                    /* CatController.
                    /*
                    /**/
                    
                    //CatView.prototype.render();
                    that.controller.catView.render();
                    
                    /* End Bug Fix ********************************************/
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};
