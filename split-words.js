exports.splitWords = (string, chunk = 400, overlap = 125) => { 
    const words = string.split(' ');

    const len = words.length;

    // remove any possible long character strings that may not be actual words
    for (let i = len - 1; i >= 0; --i) {
        if (words[i].length > 50) words.splice(i, 1);
    }

    let index = 0;
    const chunks = [];    
    while (index < words.length) {
        let curChunk = [];
        for (let i = index; i < index + chunk; ++i) curChunk.push(words[i]);
        chunks.push(curChunk.join(' '));
        index += chunk - overlap;
    }

    for (let i = chunks.length - 1; i >= 0; --i) {
        let firstPeriod = chunks[i].indexOf('.');
        let lastPeriod = chunks[i].lastIndexOf('.');
        if (firstPeriod === -1 || lastPeriod === -1 || firstPeriod === lastPeriod) {
            chunks.splice(i, 1);
        } else {
            chunks[i] = chunks[i].substring(firstPeriod + 1, lastPeriod+1);
        }
    }

    return chunks;

 }; 