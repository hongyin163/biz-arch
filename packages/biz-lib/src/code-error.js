
export default class CodeError extends Error {
    constructor(code, content) {
        super(content);
        this.code = code;
    }
}