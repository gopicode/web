console.clear()

var ShapeProto = {
    init: function(w, h) {
        this.width = w;
        this.height = h;
    },
    draw: function() {
        console.log('Shape draw', this.width, this.height);
    },
    calcArea: function() {
        console.log('Shape area', this.width * this.height);
    }
}

var CircleProto = {
    init: function(w, h, r) {
        this.width = w;
        this.height = h;
        this.radius = r;
    },
    draw: function() {
        Console.log('Circle draw', this.width, this.height, this.radius);
    }
}

CircleProto.__proto__ = ShapeProto;

function Circle() {
    var obj = Object.create(Circle);
    obj.init.apply(obj, arguments);

}

var c1 = Circle(5, 10, 20);
var c2 = Circle(2, 4, 8);

c1.draw();
c2.calcArea();
