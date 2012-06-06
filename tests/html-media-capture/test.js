test("Input File Capture", function() {
  var input = document.createElement("input");

  input.type = "file";

  assert( "capture" in input, "input[type='file'].capture supported" );
});

// test("MediaFile", function() {
//   var MediaFile = H.API( window, "MediaFile", true );
//
//   assert( !!MediaFile, "MediaFile exists" );
// });
//
//
// test("MediaFileData", function() {
//   var MediaFileData = H.API( window, "MediaFileData", true );
//
//   assert( !!MediaFileData, "MediaFileData exists" );
// });
