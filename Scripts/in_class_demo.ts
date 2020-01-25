abstract class Person {
    // constructor
    constructor(public name: string, public age: number) {
        
    }

    // method
    saysHello(): void {
        console.log(`${this.name} says hello!`);
    }
}

class Student extends Person {
    constructor(public name: string, public age: number, public studentid: string) {
        super(name, age);
    }

    isStudying(): void {
        console.log(`${this.name} is studying`);
    }
}

let abby: Student = new Student("Abby", 20, "300");
abby.saysHello();
abby.isStudying();
