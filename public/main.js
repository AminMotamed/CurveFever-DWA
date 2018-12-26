/*
 * Variable undefined lors des sockets.on (pb de binding?) => rAF
 * Probleme avec les listen
 */
"use strict"
window.onload = main;

var _wW = window.innerWidth;
var _wH = window.innerHeight;

function main() {
  var socket = io.connect('http://localhost:8080');

  var display = new Display(_wW, _wH);
  display.init();
  var game = new Game(socket, display);

  onKeyDown();
  onKeyUp();

  game.init();
  game.run();
}