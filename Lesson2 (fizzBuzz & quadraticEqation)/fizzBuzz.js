function fizzBuzz() {
    for( let i = 1; i <= 100; i++) {
        let a = i % 15 === 0 && 'fizzBuzz';
        let b = i % 5 === 0 && 'fizz';
        let c = i % 3 === 0 && 'Buzz';
        console.log(a || b || c || i);
    }
    }
    fizzBuzz();