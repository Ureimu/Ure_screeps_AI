var link_sp_m = {
    run: function () {
        var linkFrom = [
            Game.getObjectById('5f0cf8a0f326cd3e1ebb9232'),
        ];
        var linkTo = [
            Game.getObjectById('5f09c71ff1837985d4e0693f'),
        ];
        for (var i = 0, j = linkFrom.length; i < j; i++) {
            if (linkFrom[i] != null && linkTo[i] != null) {
                linkFrom[i].transferEnergy(linkTo[i]);
            }
        }
    }
};
module.exports = link_sp_m;
