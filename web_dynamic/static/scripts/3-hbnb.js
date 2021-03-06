//returns if box is checked

let checked = {};
$(document).ready(function () {
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      checked[$(this).data('id')] = $(this).data('name');
    } else {
      delete checked[$(this).data('id')];
    }
    $('div.amenities h4').html(function () {
      let amenities = [];
      Object.keys(checked).forEach(function (key) {
	amenities.push(checked[key]);
      });
      if (amenities.length === 0) {
	return ('&nbsp');
      }
      return (amenities.join(', '));
    });
  });

  $.get("http://0.0.0.0:5001/api/v1/status/", function (data, status) {
    if (data.status === "OK") {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  //
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    dataType: 'json',
    contentType: "application/json",
    success: function(data) { placesFunction(data) },
  });

  function placesFunction(places)
  {
    $(places).each(function (index, place) {
      $.get('http://0.0.0.0:5001/api/v1/users/' + place.user_id, function (owner) {
	$('SECTION.places').append('<article><div class="title"><h2>' + place.name + '</h2><div class="price_by_night">' + '$' + place.price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place.max_guest + ' Guests' + '</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place.number_rooms + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place.number_bathrooms + ' Bathroom</div></div><div class="user"><strong>Owner: </strong>' + owner.first_name + ' ' + owner.last_name + '</div><div class="description">' + place.description + '</div></article>');
      });
    });
  }

});
