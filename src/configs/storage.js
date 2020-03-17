const setItem = (key, value) => {
    if (!key) return;
    value = JSON.stringify(value);
    window.localStorage.setItem(key, value);
}

const getItem = (key) => {
    if (!key) return;
    let value = JSON.parse(window.localStorage.getItem(key));
    return value;
}

export {
    setItem,
    getItem
}