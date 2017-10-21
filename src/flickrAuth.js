

Flickr.authenticate(flickrOptions, function(error, flickr) {
  var uploadOptions = {
    photos: [{
      title: "test",
      tags: [
        "happy fox",
        "test 1"
      ],
      photo: __dirname + "/test.jpg"
    },{
      title: "test2",
      tags: "happy fox image \"test 2\" separate tags",
      photo: __dirname + "/test.jpg"
    }]
  };

  Flickr.upload(uploadOptions, FlickrOptions, function(err, result) {
    if(err) {
      return console.error(error);
    }
    console.log("photos uploaded", result);
  });
});
