/**
 * Created by Jamal on 01/07/16.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//var foo = <string>bar;
var vehicule = (function () {
    function vehicule(name) {
        this.name = name;
        this.id = '';
        this.name = name;
    }
    return vehicule;
}());
var voiture = (function (_super) {
    __extends(voiture, _super);
    function voiture(name) {
        _super.call(this, name);
        this.d = function (x) {
            return 0;
        };
        this.d('coder');
    }
    return voiture;
}(vehicule));
//# sourceMappingURL=test_ts.js.map