angular.module('starter.filckr', [])
.factory('Filckr', function ($http) {
    ///***
    //api  that   we worked  on it 
    //https://www.flickr.com/services/api/explore/flickr.photos.search
    ///https://www.flickr.com/services/api/flickr.photos.search.html
    /////***

    var apiUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3898c033176ccdac7398996e6f0dabc2&user_id=147555230%40N02&format=json&nojsoncallback=1';
    return {
        getfilckr: function () {
            return $http.get(apiUrl).then(function (response) {
                console.log(response);
                return response.data;
            })
        }
    };
});