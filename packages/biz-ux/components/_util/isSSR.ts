export default () => {
    if (typeof window === 'undefined' && typeof global === 'object') {
        return true;
    }
    return false;
}
