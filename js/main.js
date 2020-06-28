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
        //clicco sul button generate per selezionare i brani in base al genere musicale
        $("#generate").click(function () {
          htmlAlbums(musicAlbums);
        });
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
    //faccio un ciclo per prendere ogni singolo elemento album fornitomi in array
    for (var i = 0; i < arrayMusicAlbums.length; i++) {
      //variabile che definisce ogni singolo elemento dell'array musicAlbums
      //singleMusicAlbum e' un oggetto
      var singleMusicAlbum = arrayMusicAlbums[i];
      // definisce il valore della chiave genre di ogni oggetto SingleMusicAlbum
      var singleAlbumGenre = singleMusicAlbum.genre.toLowerCase()
      //console.log(singleMusicAlbum);
      if(optionSelect === singleAlbumGenre) {
        //Creo il codice html con tutte le informazioni contenute nel mio ogetto singleMusicAlbum
        var html = template(singleMusicAlbum)
        //console.log(html);
        //Stampo il mio html compilato dentro a cds-container
        $(".cds-container").append(html)
        $(".cds-container").children().addClass("visible")
    }

    }
  }
});
