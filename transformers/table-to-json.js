function jsonDoc({ headers, row }) {
    for (i = 0; i < headers.length; i++) {
        if (typeof headers[i] == 'string') {
            this[headers[i]] = row[i]
        }else{
            if (headers[i].type == 'number'){
                
                this[headers[i].value] = isNaN(Number(row[i])) ? row[i] : Number(row[i])
            }else{
                this[headers[i].value] = row[i]                
            }            
        }
    }
}

function tableToJSON({ headers, rows }){
     
    let collection = [];
    
    for (const row of rows) {
        collection.push(new jsonDoc({ headers, row }))
    }

    return collection

}

module.exports = { tableToJSON };