Player = function(game, x, y, blockedTileLayer) {
    
    //velocity
    this.velocityBase = 200;
    this.velocity = this.velocityBase;
    
    this.currGraphic = "prisoner-head-front";
    
    //sprite
    this.sprite = game.add.sprite(x, y, this.currGraphic);
    game.physics.arcade.enable(this.sprite);
    game.camera.follow(this.sprite);

    this.sprite.anchor.setTo(0.5, 0.5);
   
    //noise
    this.noiseLevelNone  = 0;
    this.noiseLevelQuiet = 1;
    this.noiseLevelLoud  = 2;
    this.noiseLevel = this.noiseLevelQuiet;
    
    this.update = function() {
        this.sprite.body.velocity.y = 0;
        this.sprite.body.velocity.x = 0;
        
        if(keyUp.isDown) 
            this.sprite.body.velocity.y = -this.velocity;

         else if(keyDown.isDown) 
            this.sprite.body.velocity.y = this.velocity;


        if(keyLeft.isDown)
            this.sprite.body.velocity.x = -this.velocity;
        
        else if(keyRight.isDown)
            this.sprite.body.velocity.x = this.velocity;


        if(keySneak.isDown)  {
            this.velocity = this.velocityBase / 2;
            this.noiseLevel = this.noiseLevelNone;
        } else if(keySprint.isDown) {
            this.velocity = this.velocityBase * 2;
            this.noiseLevel = this.noiseLevelLoud;
        } else {
            this.velocity = this.velocityBase;
            this.noiseLevelQuiet;
        }

        game.physics.arcade.collide(this.sprite, blockedTileLayer);

    }
    
}
