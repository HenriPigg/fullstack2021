const foo = function (x, cb) {
    const tulos = [];

for (let i = 1; i <= x; i++) {
    tulos.push(i)
}
if (typeof cb === 'function') {
    cb(tulos)
}
};

foo(5, joku = function () {
    console.log(tulos)
})