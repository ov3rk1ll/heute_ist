/* global Log, Module, moment */

/* Magic Mirror
 * Module: Compliments
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

Module.register("heute_ist",{

	// Module config defaults.
	defaults: {
		entries: new Array(),
		updateInterval: 20 * 1000,
		remoteFile: null,
		fadeSpeed: 4000
	},

	// Set currentweather from module
	currentWeatherType: "",

	// Define required scripts.
	getScripts: function() {
		return ["https://code.jquery.com/jquery-3.1.1.min.js"];
	},

	// Define start sequence.
	start: function() {
        var self = this;
		Log.info("Starting module: " + this.name);

		this.lastIndex = 0;
        var url = 'https://wrapapi.com/use/ov3rk1ll/welchertag/heute/1.0.0?wrapAPIKey=9DdIBAAhslUwgBf4lNREXTCgoqQk3wS2';
        
        var weatherRequest = new XMLHttpRequest();
		weatherRequest.open("GET", url, true);
		weatherRequest.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
                    var json = JSON.parse(this.response);
                    var payload = json.data.days;
                    
                    self.entries = payload;
                            
                    // Schedule update timer.
                    setInterval(function() {
                        self.updateDom(self.config.fadeSpeed);
                    }, self.config.updateInterval);
                    self.updateDom(self.config.fadeSpeed)
					
                    
				} else if (this.status === 401) {
					self.updateDom(self.config.animationSpeed);

					Log.error(self.name + ": Incorrect APPID.");
					retry = true;
				} else {
					Log.error(self.name + ": Could not load weather.");
				}
			}
		};
		weatherRequest.send();
	},

	/* complimentArray()
	 * Retrieve a random compliment.
	 *
	 * return compliment string - A compliment.
	 */
	nextEntry: function() {
        if(this.entries == undefined) return '...';
        this.lastIndex++;
        if(this.lastIndex >= this.entries.length){
            this.lastIndex = 0;
        }

		return this.entries[this.lastIndex];
	},

	// Override dom generator.
	getDom: function() {
		var complimentText = 'Heute ist ' + this.nextEntry();

		var compliment = document.createTextNode(complimentText);
		var wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "light small dimmed";
		wrapper.appendChild(compliment);

		return wrapper;
	},

	// Override notification handler.
	socketNotificationReceived: function(notification, payload, sender) {
		if (notification == "DAY_ITEMS") {
			this.entries = payload;
                    
            // Schedule update timer.
            var self = this;
            setInterval(function() {
                self.updateDom(self.config.fadeSpeed);
            }, this.config.updateInterval);
            this.updateDom(this.config.fadeSpeed)
		}
	},

});
