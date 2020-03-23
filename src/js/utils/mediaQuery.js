class mediaQuery {

    constructor (size, callback) {
        this.mql = window.matchMedia(size);
        this.mql.addListener((e) => this.test(e, callback));
        this.test(this.mql, callback);
    }

    test(e, callback) {
        if (e.matches) {
            callback.success();
        } else {
            callback.failure();
        }
    }
}

export default mediaQuery;

