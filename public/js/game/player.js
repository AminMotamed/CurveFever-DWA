/** 
 * Class representing a player on the client side. This class
 * will take only necessary information from the server for
 * the display
 */
class Player {
  /**
   * @constructor
   *
   * @param {number} x: coordinate x
   * @param {number} y: coordinate y
   * @param {number} dir: direction of the snake
   * @param {number} size: size of the snake
   * @param {String} color: color of the snake
   */
  constructor(body, dir, score, size, color) {
    this.body = new Array();
    this.body.unshift(body);
    this.dir = new Array();
    this.dir.unshift(dir);
    this.score = score;
    this.size = size;
    this.color = color;
  }

  /**
   * @method Update the snake with the values given by the server.
   *
   * @param {number} x: coordinate x
   * @param {number} y: coordinate y
   * @param {number} score: score of the snake
   * @param {number} size: the size of the snake
   */
  update(body, dir, score, size) {
    if(this.body[0].x == body.x &&
       this.body[0].y == body.y)
      return;

    this.size = size || this.size;
    if(this.body.length == this.size)
      this.body.pop();
    this.body.unshift(body);
    this.updateDirection(dir);
    this.score = score || this.score;
  }

  /**
   * @method Update the snake direction with the new value given by the server.
   *
   * @param {number} nextDir: the new direction given by the server
   */  
  updateDirection(nextDir) {
    var updatedDir, currentDir = this.dir[0], lastDir = this.dir[this.dir.length-1];

    if(this.dir[0] == nextDir) {
      if(SNAKES_IMG_SRC[currentDir] == SNAKES_IMG_SRC["left"] ||
         SNAKES_IMG_SRC[currentDir] == SNAKES_IMG_SRC["right"])
        updatedDir = SNAKES_IMG_SRC["lr_body"];
      else
        updatedDir = SNAKES_IMG_SRC["ud_body"];
    }

    else {
      if(this.checkDirections(currentDir, nextDir, "left",  "down"))  updatedDir = SNAKES_IMG_SRC["ul_body"];
      if(this.checkDirections(currentDir, nextDir, "left",  "up"))    updatedDir = SNAKES_IMG_SRC["dr_body"];
      if(this.checkDirections(currentDir, nextDir, "right", "up"))    updatedDir = SNAKES_IMG_SRC["dl_body"];
      if(this.checkDirections(currentDir, nextDir, "right", "down"))  updatedDir = SNAKES_IMG_SRC["ur_body"];
      if(this.checkDirections(currentDir, nextDir, "up",    "right")) updatedDir = SNAKES_IMG_SRC["ul_body"];
      if(this.checkDirections(currentDir, nextDir, "up",    "left"))  updatedDir = SNAKES_IMG_SRC["ur_body"];
      if(this.checkDirections(currentDir, nextDir, "down",  "right")) updatedDir = SNAKES_IMG_SRC["dr_body"];
      if(this.checkDirections(currentDir, nextDir, "down",  "left"))  updatedDir = SNAKES_IMG_SRC["dl_body"];
    }
    this.dir[0] = updatedDir;
    this.dir.unshift(nextDir);
  }

  /**
   * @method Check if the directions of the snake are equal to the expected directions.
   *
   * @param {number} currentDir: the current direction of the snake
   * @param {number} nextDir: the next direction of the snake
   * @param {number} expectedCurrentDir: the expected current direction of the snake
   * @param {number} expectedNextDir: the expected next direction of the snake
   * @return {boolean} True if the expected directions are equal to the directions 
   * of the snake, else otherwise.
   */
  checkDirections(currentDir, nextDir, expectedCurrentDir, expectedNextDir) {
    if(SNAKES_IMG_SRC[currentDir] == SNAKES_IMG_SRC[expectedCurrentDir] &&
       SNAKES_IMG_SRC[nextDir] == SNAKES_IMG_SRC[expectedNextDir])
      return true;
    return false;
  }
}