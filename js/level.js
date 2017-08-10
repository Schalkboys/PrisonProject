Level = function(game, mapName, tilesetImageName) {
    this.map = game.add.tilemap(mapName);
    this.map.addTilesetImage("tileset", tilesetImageName);
    
    this.backgroundLayer = this.map.createLayer("background");
    this.backgroundLayer.fixedToCamera = false;
    
    this.blockedLayer = this.map.createLayer("blocked");
    this.map.setCollisionBetween(1, 1000, true, "blocked");
    
    this.backgroundLayer.resizeWorld();
    
    //find objects in a Tiled layer that contain a propperty called "type" equal to a certain value
    //copied and pasted form https://gamedevacademy.org/html5-phaser-tutorial-top-down-games-with-tiled/
    findObjectsByType = function(type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function(element) {
            if(element.type === type) {
                //convert from Tiled's bottom left coordinate system to Phasers
                //top left coordinate system
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    }

    //get players position
    let playerTile = findObjectsByType("player", this.map, "spawn")[0];
    this.playerPosition = new Phaser.Point();
    this.playerPosition.x = playerTile.x;
    this.playerPosition.y = playerTile.y;
    
    this.guardTiles = findObjectsByType("guard", this.map, "spawn");
    

}
