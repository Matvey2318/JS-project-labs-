let arr1 = [1,2,3];
let arr2 = [11,22,33];
// // let arr = [];
// // function func(len) {
// //     for (let i = 0; i<len;i++){
// //         arr.push(arr1[i],arr2[i]);
// //     }
// //
// // }
// // func(arr1.length);
// // console.log(arr);


function Zip(a,b) {
    let args = [].slice.call(arguments);
    let shortest = args.length === 0 ? [] : args.reduce(function (a, b) {
        return a.length < b.length ? a : b
    });

    return shortest.map(function (_, i) {
        return args.map(function (array) {
            return array[i]
        })
    });
}

console.log(Zip(arr1,arr2));

