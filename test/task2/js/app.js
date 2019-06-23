class Program {
    constructor() {
        this.emptyPlaceholder = " ";
        this.parseExpression = new RegExp("([-+]?)(\\d+)");
    }

    Main() {
        this.Permute("", 8, 3, 0);
    }


    Permute(str, depth, symbols, currentDepthIndex) {
        if (currentDepthIndex < depth) {
            currentDepthIndex++;
            for (let i = 0; i < symbols; i++) {
                let copy = str;
                copy += this.GetSymbol(i);
                this.Permute(copy, depth, symbols, currentDepthIndex);
            }
        } else {
            let resultExpression = this.Merge(str);
            let matches = this.parseExpression.match(resultExpression);
            let sum = 0;
            for (let item of matches) {
                sum += parseInt(matches[item]);

            }
            //this.Sum(matches);
            if (sum === 100) {
                console.log(resultExpression + "=100");
            }
        }
    }

    // Sum(matches) {
    //     let sum = 0;
    //     for (let item of matches) {
    //         sum += parseInt(matches[item]);
    //
    //     }
    // }

    Zip() {
        let args = [].slice.call(arguments);
        let shortest = args.length === 0 ? [] : args.reduce(function (a, b) {
            return a.length < b.length ? a : b
        });
        if (shortest === 0) {
            console.log('error');
        } else {

            return shortest.map(function (_, i) {
                return args.map(function (array) {
                    return array[i]
                })
            });

        }
    }

    Merge(symbols) {
        let numbers = "123456789";
        let strin = "";
        if (symbols.length !== (numbers.length - 1)) {
            console.log('Error');
        } else {
            let pairs = this.Zip(numbers,symbols + this.emptyPlaceholder, (n, s) => `${n}${s}`);
            return strin.concat(pairs).replace(this.emptyPlaceholder, "");
        }
    }


    GetSymbol(code) {
        switch (code) {
            case 1:
                return "+";
            case 2:
                return "-";
            default:
                return this.emptyPlaceholder;
        }
    }
}
(new Program).Main();