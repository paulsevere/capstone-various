#!/usr/bin/env node

const {watch} = require('chokidar')
const fs = require('fs');
const {EditorState, convertFromRaw} = require('draft-js')
const io = require('socket.io-client');

let socket = io.connect('http://localhost:3001');
socket.on('connect', function() {
  console.log('connected')
  socket.emit('message', "WOW its working from the CLI")
})


function createWatch() {
  let target = process.argv[2]
  watch(target).on('change', event => {
    socket.emit()
  })
}


function readStream() {
  let target = process.argv[2]
  let stream = fs.createReadStream(__dirname + "/" + target);
  stream.on('open', console.log)
}


function createEditorState(text) {
  convertFromRaw({
    entityMap: {},
    blocks: [
      {
        type: 'code-block',
        text
      }
    ]
  })
}
// readStream();
// createWatch();
