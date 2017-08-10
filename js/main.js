//keyboard layout
var keyUp;
var keyDown;
var keyLeft;
var keyRight;

var keySneak;
var keySprint;

const MainState = {
    preload: function() {
        this.load.image("prisoner-head-front", "res/prisoner/head-front.png");
        this.load.image("prisoner-head-side",  "res/prisoner/head-side.png");
        this.load.image("prisoner-head-back",  "res/prisoner/head-back.png");

        this.load.image("guard-head", "res/guard/head.png");

        this.load.tilemap("test-map",
                "res/maps/test/test-1.json",
                null,
                Phaser.Tilemap.TILED_JSON);
        this.load.image("test-map-tiles", "res/maps/tiles/tileset.png");
    },

    create: function() {
        //setup controls
        keyUp    = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        keyDown  = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        keyLeft  = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        keySneak  = game.input.keyboard.addKey(Phaser.Keyboard.X);
        keySprint = game.input.keyboard.addKey(Phaser.Keyboard.C); 
        

        level = new Level(this, "test-map", "test-map-tiles");
       
        this.player = new Player(this,
                level.playerPosition.x, level.playerPosition.y,
                level.blockedLayer);
        
        this.guards = Array();
        
        //don't use Array.foreach()!
        //You can't access member vars from callbacks
        for(var i = 0; i < level.guardTiles.length; i++) {
            this.guards.push(new Guard(this,
                        level.guardTiles[i].x, level.guardTiles[i].y,
                        level.blockedLayer));
        }

    },

    update: function() {
        this.player.update();
         
        this.guards.forEach(function(guard) {
            guard.update();
            guard.updateAI(this.player);
        });
    }
}

var game = new Phaser.Game(1600, 900, Phaser.AUTO, "game-area", MainState);
