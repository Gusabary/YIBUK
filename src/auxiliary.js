const generateArray = (length, defaultValue) => {
    let modelArray = [];
    modelArray[0] = defaultValue;
    modelArray[length - 1] = defaultValue;
    modelArray.fill(defaultValue, 0, length - 1);
    return modelArray;
}

const sort = (toBeSorted, sortBy) => {
    const len = toBeSorted.length;
    for (let i = 0; i < len - 1; i++)
        for (let j = i + 1; j < len; j++)
            if (toBeSorted[i][sortBy] > toBeSorted[j][sortBy]) {
                const tmp = toBeSorted[j]
                toBeSorted[j] = toBeSorted[i]
                toBeSorted[i] = tmp
            }
}

const contain = (content, filterKey) => {
    const strContent = content.toString();
    if (strContent.indexOf(filterKey) !== -1)
        return true;
    return false;
}

const filter = (toBeFiltered, filterBy, filterKey) => {
    let result = [];
    let startTime, endTime;
    for (let i = 0; i < filterBy.length; i++) {
        if (filterBy[i] === 'time') {
            startTime = Date.parse(filterKey[i].startTime)
            endTime = Date.parse(filterKey[i].endTime)
            break;
        }
    }
    toBeFiltered.forEach(element => {
        let isLeft = true;
        for (let i = 0; i < filterBy.length; i++) {
            if (filterBy[i] === 'time') {
                const orderTime = Date.parse(element.time)
                if (startTime > orderTime || endTime < orderTime) {
                    isLeft = false;
                    break;
                }
                continue;
            }
            if (!contain(element[filterBy[i]], filterKey[i])) {
                isLeft = false;
                break;
            }
        }
        if (isLeft)
            result.push(element)
    });
    return result;
}

const getCopy = (original) => {
    let copy = [];
    original.forEach((element) => {
        copy.push(element)
    })
    return copy;
}

export { generateArray, sort, getCopy,filter };