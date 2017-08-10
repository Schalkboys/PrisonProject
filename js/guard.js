const Guard = function(game, x, y, blockedLayer) {
    
    this.velocityBase = 200;
    this.velocty = this.velocityBase;
    
    this.sprite = game.add.sprite(x, y, "guard-head");
    game.physics.arcade.enable(this.sprite);

    this.sprite.anchor.setTo(0.5, 0.5);
   
    this.walkDirStop  = -1;
    this.walkDirUp    =  0;
    this.walkDirDown  =  1;
    this.walkDirLeft  =  2;
    this.walkDirRight =  3;
    this.walkDir = this.walkDirStop;

    this.update = function() {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

        switch(this.walkDir) {
            case this.walkDirUp:
                this.sprite.body.velocity.y = 200;
            break;

            case this.walkDirDown:
                this.sprite.body.velocity.y = -200;
            break;

            case this.walkDirLeft:
                this.sprite.body.velocity.x = -200;
            break;

            case this.walkDirRight: 
                this.sprite.body.velocity.x = 200;
            break;

            case this.walkDirStop:
            break;
        }
        
        game.physics.arcade.collide(this.sprite, blockedLayer);

    }

    this.AIStateIdle   = 0;
    this.AIStateSearch = 1;
    this.AIStateAttack = 2;
    this.AIState = this.AIStateIdle;

    this.updateAi = function(player) {

        switch(this.AIState) {
            
            case this.AIStateIdle:
                //basic idle behavior
                var changeDir = game.rnd.integerInRange(0, 20);

                if(changeDir !== 0)
                    return;
        
                this.walkDir = game.rnd.integerInRange(-1, 3);
            break;

            case this.AIStateSearch:
            break;

            case this.AIStateAttack:
            break;

    }
}
