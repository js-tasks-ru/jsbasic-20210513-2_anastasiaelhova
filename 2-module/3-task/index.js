let calculator = {
    arg1: null,
    arg2: null,
    read(a,b) {
        this.arg1 = Number(a);
        this.arg2 = Number(b);
    },
    sum() {
        return this.arg1 + this.arg2;
    },
    mul() {
        return this.arg1 * this.arg2;
    }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
