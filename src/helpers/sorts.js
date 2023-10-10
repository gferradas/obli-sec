export const sortByName = (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    let rtn = nameA > nameB ? 1 : -1;

    if (nameA === nameB) {
        rtn = a.price > b.price ? 1 : -1;
    }

    return rtn;
};

export const sortByNameDesc = (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    let rtn = nameA < nameB ? 1 : -1;

    if (nameA === nameB) {
        rtn = a.price > b.price ? 1 : -1;
    }

    return rtn;
}


export const sortByPrice = (a, b) => {
    const priceA = a.price;
    const priceB = b.price;
    let rtn = priceA > priceB ? 1 : -1;

    if (priceA === priceB) {
        rtn = a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
    }

    return rtn;
};

export const sortByPriceDesc = (a, b) => {
    const priceA = a.price;
    const priceB = b.price;
    let rtn = priceA < priceB ? 1 : -1;

    if (priceA === priceB) {
        rtn = a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
    }

    return rtn;
};
