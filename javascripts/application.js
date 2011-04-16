hw = (function() {
	var self = {
    places: null,
	      
	  init: function() {
	  FB.init({
      appId  : 165971536792687,
      status : true,
      cookie : true,
      xfbml  : true
    });

    FB.getLoginStatus(function(response) {
      if (response.session) {
        hw.places = new fbPlaces({token: response.session.access_token});
      } else {
    		$('#overlay').show();
      }
    });
    self.updateLocation();
  },

  bindActions: function() {
    $('#search_query').keypress(function(e) {
      if (e.which==13) {
        $('#categories li a').removeClass('active');
        e.preventDefault();
        hw.places.search($(this).val());
      }
    });

    $('#categories li.link a').click(function() {
      $('#categories li a').removeClass('active');
      hw.places.search(this.innerText);
      $(this).addClass('active');
    });
  },

  showError: function(msg) {
      // TODO Jakis boxik
      alert(msg);
        },

        setOwnLocation: function(latitude, longitude, accuracy) {
            hw_map.setMyPosition(latitude, longitude);
            hw_map.updateMyMarker();
        },

        updateLocation: function() {
            if (!navigator.geolocation) {
                self.showError('Geolocalisation not suppoorted!');
                return;
            }
            navigator.geolocation.getCurrentPosition(
                function(pos) {
                    self.setOwnLocation(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy);
                },
                function(error) {
                    var code = error.code
                    if (code == 1) {
                        return; // ignoruj
                    }
                    self.showError('Could not find your location.');
                }
            );
	    },
	};
	return self;
})();

jQuery(function($) {
	hw.init();
	hw.bindActions();
});
