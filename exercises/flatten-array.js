const input =
[
    18, 26,
    [
        33,
        [
            14, 25,
            [
                76, 87, 19,
                [
                    210,
                    [
                        15,
                        [62, 43],
                        24, 65
                    ],
                    18
                ], 10
            ], 38
        ],
        49
    ],
    24, 52, 92
];

function flatten(input, output = []) {
    input.forEach(item => {
        Array.isArray(item) ? flatten(item, output) : output.push(item)
    })
}

const output = [];
flatten(input, output);
console.log(JSON.stringify(input, null, 4));
console.log(JSON.stringify(output, null, 4));
