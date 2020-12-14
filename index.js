var map;
var directionsDisplay;
var minhaLocalizacao;
var directionsService = new google.maps.DirectionsService();

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var latlng = new google.maps.LatLng(-8.1190844, -34.9049149);

  var options = {
    zoom: 15,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("mapa"), options);
  directionsDisplay.setMap(map);
}



$(document).ready(function() {
  initialize();
 
  // PEGANDO LOCALIZACAO DO USUÁRIO
  var localizar = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          minhaLocalizacao = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
          console.log(minhaLocalizacao);
        });
    } else {
      console.log("Navegador não suporta Geolocalização!");
    }
  };
  localizar();

  $("#formMap").submit(function(event) {
    event.preventDefault();

    var enderecoPartida = $("#txtEnderecoPartida").val();
    var enderecoChegada = $("#txtEnderecoChegada").val();

    var request = {
      origin: minhaLocalizacao,
      destination: enderecoChegada,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
    });
  });
});
