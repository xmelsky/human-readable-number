module.exports = function toReadable(number) {
    const template = {
        0: {
            0: "zero",
            1: "one",
            2: "two",
            3: "three",
            4: "four",
            5: "five",
            6: "six",
            7: "seven",
            8: "eight",
            9: "nine"
        },
        1: {
            1: "eleven",
            2: "twelve",
            3: "thirteen",
            4: "fourteen",
            5: "fifteen",
            6: "sixteen",
            7: "seventeen",
            8: "eighteen",
            9: "nineteen"
        },
        2: {
            1: "ten",
            2: "twenty",
            3: "thirty",
            4: "forty",
            5: "fifty",
            6: "sixty",
            7: "seventy",
            8: "eighty",
            9: "ninety"
        },
        3: i => template[0][i] + " hundred",
        4: i => template[0][i] + " thousand"
    };
    strNum = number.toString();
    const result = [];
    for (let i = strNum.length - 1; i >= 0; i--) {
        switch (true) {
            case result.length < 1:
                if (strNum.match(/0[1-9]$|^\d$/))
                    result.push(template[0][strNum[i--]]);
                else if (strNum.match(/[1-9]0$/))
                    result.push(template[2][strNum[--i]]);
                else if (strNum.match(/1\d$/))
                    result.push(template[1][strNum[i--]]);
                else if (strNum.match(/[2-9]\d$/))
                    result.push(
                        `${template[2][strNum[i - 1]]} ${
                            template[0][strNum[i]]
                        }`
                    ) && i--;
                else if (strNum.match(/[1-9]0{2}$/))
                    result.push(template[3](strNum[(i -= 2)]));
                break;
            default:
                result.push(template[3](strNum[i]));
        }
    }
    return result.reverse().join(" ");
};
