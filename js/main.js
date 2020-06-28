// myJavaScript
$(document).ready(function() {
  //Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
  $.ajax(
    {
      url: "https://flynn.boolean.careers/exercises/api/array/music",
      method: "GET",
      success: function(data, state) {
        var musicAlbums = data.response
        //sleziono un genere musicale indicandolo attraverso il form optionSelect
        htmlAlbums(musicAlbums);

      },
      error: function (request, state, error) {
        alert("Error: " + error);
      }
    }
  );

  //Servendoci di handlebars stampiamo tutto a schermo.
  function htmlAlbums(arrayMusicAlbums) {
    //Richiamo handelbars e lo collego al mio template attraverso id
    var source = $("#cd-template").html();
    //Handelbars compila il mio template
    var template = Handlebars.compile(source);
    //Variabile che indica il valore di select
    var optionSelect = $("#music_genre").val()
    //Assegno un valore a selectedMusicGenre
    //In base al valore scelto mostro una serie di risultati
    $("select#music_genre").change(function(){
      //variabile che contiene il valore option di selected
      console.log($("select#music_genre").val())
      var selectedMusicGenre = $(this).children("option:selected").val();
      console.log(selectedMusicGenre)
      //Variabile che rappresenta il div in cui dovro` stampare i risultati
      var cdsContainer = $(".cds-container");
      cdsContainer.html("")
      //faccio un ciclo per prendere ogni singolo elemento album fornitomi in array
      for (var i = 0; i < arrayMusicAlbums.length; i++) {
        //variabile che definisce ogni singolo elemento dell'array musicAlbums
        //singleMusicAlbum e' un oggetto
        var singleMusicAlbum = arrayMusicAlbums[i];
        // definisce il valore della chiave genre di ogni oggetto SingleMusicAlbum
        var singleAlbumGenre = singleMusicAlbum.genre.toLowerCase()
        //Stampo tutti i risultati indipendentemente dal genre musicale
        if (selectedMusicGenre === "all") {
          //Creo il codice html con tutte le informazioni contenute nel mio ogetto singleMusicAlbum
          var html = template(singleMusicAlbum)
          //Stampo il mio html compilato dentro a cds-container
           cdsContainer.append(html)
        }
        //Stampo solo i risultati che hanno come genre musicale quello indicato in select input
        else if(selectedMusicGenre === singleAlbumGenre) {
          //Creo il codice html con tutte le informazioni contenute nel mio ogetto singleMusicAlbum
          var html = template(singleMusicAlbum)
          //Stampo il mio html compilato dentro a cds-container
           cdsContainer.append(html)
        }
      }
    });
  }
});
