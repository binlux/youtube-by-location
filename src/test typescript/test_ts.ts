/**
 * Created by Jamal on 01/07/16.
 */

//var foo = <string>bar;

abstract class vehicule {
    private id: string = '';

    constructor(private name: string) {
        this.name = name;
    }
}

class voiture extends vehicule {

    private d: Function = (x: string) => {
        return 0
    };

    constructor(name: string) {
        super(name);
        this.d('coder');
    }


}
