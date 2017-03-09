
var socket = io('http://localhost:3000');
// socket.on('test', update)


// function



function update(message) {
  $('#text-holder').text($('#text-holder2').text())
  $('#text-holder2').text(message);
  $('#text-holder2').css('color', defaultPalette[300][_.random(19)])
}


function randomChange(text) {
  let len = text.split(" ")
  let rand = chance.integer({
    min: 0,
    max: len.length - 1
  })
  if (chance.bool()) {


    len.splice(rand, chance.integer({
      min: 2,
      max: 6
    }))

  } else {
    len.unshift(chance.state({
      full: true
    }))
  }
  return len.join(" ")


}
let pulser = setInterval(() => socket.emit('test', randomChange($('#text-holder').text())), 1000);

function* socketIterator(arr) {
  let ar = arr;
  while (ar.length) {
    console.log(ar)
    let inp = yield ar.pop()
    if (inp) {
      ar.unshift(inp)
    }
  }

}


function toggleOn(button) {
  $(button).off('click').text("start").css('background-color', "rgb(105, 148, 112)")
  $(button).on('click', e => {
    socket.on('test', update);
    toggleOff(button);

  })
}
function toggleOff(button) {
  button.off('click').text("pause").css('background-color', "rgb(205, 110, 110)")
  button.on('click', e => {
    socket.removeListener('test', update);
    toggleOn(button)
  })
}

$(() => {
  toggleOn($('button'))
})
