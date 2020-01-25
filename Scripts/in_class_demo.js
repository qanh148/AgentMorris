"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    // constructor
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    // method
    Person.prototype.saysHello = function () {
        console.log(this.name + " says hello!");
    };
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, age, studentid) {
        var _this = _super.call(this, name, age) || this;
        _this.name = name;
        _this.age = age;
        _this.studentid = studentid;
        return _this;
    }
    Student.prototype.isStudying = function () {
        console.log(this.name + " is studying");
    };
    return Student;
}(Person));
var abby = new Student("Abby", 20, "300");
abby.saysHello();
abby.isStudying();
//# sourceMappingURL=in_class_demo.js.map