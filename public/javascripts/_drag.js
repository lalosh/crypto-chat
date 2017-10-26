let socket = io();

function drop_handler(ev) {
 
   console.log("Drop");
      ev.preventDefault();
      // If dropped items aren't files, reject them
      let filesArray = [];
      var dt = ev.dataTransfer;
      if (dt.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i=0; i < dt.items.length; i++) {
          if (dt.items[i].kind == "file") {
            var f = dt.items[i].getAsFile();
            filesArray.push(f);
            console.log(" file[" + i + "].name = " + f.name);
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (var i=0; i < dt.files.length; i++) {
          console.log(" file[" + i + "].name = " + dt.files[i].name);
        }  
      }

      filesBeforeSend = filesArray;
      socket.emit('sendFiles',filesBeforeSend);

}

function dragover_handler(ev) {
  console.log("dragOver");
  // Prevent default select and drag behavior
  ev.preventDefault();
}

function dragend_handler(ev) {
  console.log("dragEnd");
  // Remove all of the drag data
  var dt = ev.dataTransfer;
  if (dt.items) {
    // Use DataTransferItemList interface to remove the drag data
    for (var i = 0; i < dt.items.length; i++) {
      dt.items.remove(i);
    }
  } else {
    // Use DataTransfer interface to remove the drag data
    ev.dataTransfer.clearData();
  }
}


    var enc = new TextDecoder();


socket.on('recvFiles',function(filesArray){
  for (let i = 0; i < filesArray.length; i++) {
  
    let arr = new Uint8Array(filesArray[i]);
    console.log(enc.decode(arr));

  }

})

///////////////
