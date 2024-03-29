window.onload = function() {
  var player = document.getElementById('mover');
  var canvas = document.querySelector('canvas');
  const image = document.getElementById('foguete');
  const enemyImg = document.getElementById('meteoro');
  const alienImg = document.getElementById('alienigenas');
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  var ctx = canvas.getContext("2d");
    
  player.addEventListener("click", function(){
  function startGame() {
    var mouse = {
      x: innerWidth / 2,
      y: innerHeight -149
    };
      
    player.addEventListener("touchmove", function(event) {
      var rect = player.getBoundingClientRect();
      var root = document.documentElement;
      var touch = event.changedTouches[0];
      var touchX = parseInt(touch.clientX);
      var touchY = parseInt(touch.clientY) - rect.top - root.scrollTop;
      event.preventDefault();
      mouse.y = touchY;
      mouse.x = touchX;
    });

    var laserWidth = 6;
    var laserHeight = 8;
    var lasers = [];
    var score = 0;
    var health = 0;
      
    image.width = 150;
    image.height = 150;

    var enemies = [];
    var enemyWidth = 100;
    var enemyHeight = 100;
      
    var alienWidth = 150;
    var alienHeight = 150;
    var aliens =  [];
       // enemyImg.style.transform = 'rotate(45deg)';
    function draw() {
      var imageX = player.width / 2 - image.width;
      var imageY = player.height - image.height;

      imageX = mouse.x - image.width / 2;
      imageY = mouse.y - image.height / 2;

      ctx.drawImage(image, imageX, imageY, image.width, image.height);
    } 
      
    function drawLaser(x, y) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - 20);
      ctx.strokeStyle = '#ff0401';
      ctx.lineWidth = laserWidth;
      ctx.lineHeight = laserHeight;
      ctx.stroke();
    }

    function spawnLaser() {
      const newLaser = {
        x: mouse.x - laserWidth / 2,
        y: mouse.y - image.height / 2,
        width: laserWidth,
        height: laserHeight
      };
      lasers.push(newLaser);
      setTimeout(spawnLaser, 300);
    }
    spawnLaser();

    function spawnEnemy() {
      var enemyX = Math.random() * (innerWidth - enemyWidth);
      var enemyY = -enemyHeight;
      var enemySpeed = 4;
      var newEnemy = {
        x: enemyX,
        y: enemyY,
        width: enemyWidth,
        height: enemyHeight,
        speed: enemySpeed
      };
       score++;
      enemies.push(newEnemy);
      setTimeout(spawnEnemy, 300);
    }
      function spawnAliens() {
      var alienX = Math.random() * (innerWidth - alienWidth);
      var alienY = -alienHeight;
      var alienSpeed = Math.random()*4.0;
      var newAlien = {
        x: alienX,
        y: alienY,
        width: alienWidth,
        height: alienHeight,
        speed: alienSpeed,
        hits: 0  
      };
          score++;
      aliens.push(newAlien);
      setTimeout(spawnAliens, 20000);
    }
     function restartGame() {
            enemies = [];
            lasers = [];
            aliens = [];
            spawnEnemy();
        } 
    spawnEnemy();
    spawnAliens();  
    function Collision(a,b) {
      return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
      );
    }
    ctx.font = "1.5em Arial";
    function animate() {
      requestAnimationFrame(animate);
      ctx.beginPath();
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.fillStyle = 'white';
      ctx.fillText("player:" + health, 5, 50); 
      ctx.fillText("score:" + score, innerWidth-290, 50); 
        
      for (var i = 0; i < lasers.length; i++) {
        lasers[i].y -= 8;
        drawLaser(lasers[i].x, lasers[i].y);

        if (lasers[i].y < 0) {
          lasers.splice(i, 1);
          i--;
        }
      }
      for (var k = 0; k < enemies.length; k++) {
        ctx.drawImage(
          enemyImg,
          enemies[k].x,
          enemies[k].y,
          enemies[k].width,
          enemies[k].height
        );
        enemies[k].y += enemies[k].speed;
        if (enemies[k].y > innerHeight) {
          enemies.splice(k, 1);
            if (score > health){
                health = score;
            }
            alert("Game over!           " + " score:"+ score + "                      recorde atual:" + health);
            restartGame();
            score = 0;
        }
      }
      for (var j = enemies.length - 1; j >= 0; j--) {
        for (var l = lasers.length - 1; l >= 0; l--) {
          if (Collision(enemies[j], lasers[l])) {
            enemies.splice(j, 1);
            lasers.splice(l, 1);
              break;
          }
        }
      }
        for(var h=0; h < aliens.length; h++){
         ctx.drawImage(
          alienImg,
          aliens[h].x,
          aliens[h].y,
          aliens[h].width,
          aliens[h].height
        );
        aliens[h].y += aliens[h].speed;
        if (aliens[h].y > innerHeight) {
          aliens.splice(h, 1);
            if (score > health){
                health = score;
            }
            alert("Game over!           " + " score:"+ score + "                      recorde atual:" + health);
            restartGame();
            score = 0;
        }
      }
        
     for(var hh = aliens.length-1; hh >= 0; hh--){
      for(var hhh = lasers.length-1; hhh >= 0; hhh--){
        if(Collision(aliens[hh], lasers[hhh])){
            aliens[hh].hits++;
            if (aliens[hh].hits >= 5) {
                aliens.splice(hh, 1);
            }
          lasers.splice(hhh, 1);
            break;
        }
      }
    } 
    
    draw();
    }
    animate();
  };
  startGame();
 });
};
