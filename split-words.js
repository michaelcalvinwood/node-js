exports.chunks(string, chunk = 400, overlap = 200) { 
    const newArray = string.split(" "); 
    let count = 0;
    const text = [];
    while (count < newArray.length) {
        let temp = [];
        for (let i = count; i < count + chunk && i < newArray.length; ++i) temp.push(newArray[i]);
        text.push(temp.join(" "));
        count += chunk - overlap;
    }
    console.log('text', text);
 }; 

