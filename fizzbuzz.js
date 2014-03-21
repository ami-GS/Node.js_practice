function fizzbuzz(n){
	if (n > 100) return;

	if (n % 15 == 0) {
		console.log(n, "fizzbuzz");
		}
	else if (n % 3 == 0) {
		console.log(n, "fizz");
		}
	else if (n % 5 == 0) {
		console.log(n, "buzz");
		}
	fizzbuzz(n+1);
}

fizzbuzz(1);
