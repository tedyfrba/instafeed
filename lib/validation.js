const moment = require('moment');
const { object, string, number, date, mixed, array } = require('yup')

module.exports = {
    validate: validate,
    validateWithYup: validateWithYup
}

function validate(jsonString) {
    try {
        const art = jsonString;

        if (isRequired(art.id)
            || isEmpty(art.id)
            || !isString(art.id)
            || art.id.length !== 36
            )
            console.log("Wrong value type: id");

        if (isRequired(art.title)
            || isEmpty(art.title)
            || !isString(art.title)
            || art.title.length > 255
            )
            console.log("Wrong value type: title");

        if (isRequired(art.author)
            || isEmpty(art.author)
            || !isString(art.author)
            || art.author.length > 100
            )
            console.log("Wrong value type: author");

        if (isRequired(art.modifiedAt)
            || isEmpty(art.modifiedAt)
            || isDateValidFormat(art.modifiedAt)
            || !isDateInPast(art.modifiedAt)
            )
            console.log("Wrong value type: modifiedAt");

        if (isDateValidFormat(art.publishedAt)
            || !isDateInPast(art.publishedAt)
            )
            console.log("Wrong value type: publishedAt");

        if ( (!isRequired(art.publishedAt) && 
             (isRequired(art.url) || isEmpty(art.url)) && !checkHTTPS(art.url) )
              )
            console.log("Wrong value type: url");

        if (isEmpty(art.keywords)
            || art.keywords.length < 1 || art.keywords.length > 3
            || !checkItemsString(art.keywords)
            )
            console.log("Wrong value type: keywords");

        if (isRequired(art.readMins)
            || !isNumber(art.readMins)
            || art.readMins < 0
            || art.readMins < 1 || art.readMins > 20
            )
            console.log("Wrong value type: readMins");

        if (isRequired(art.source)
            || !checkValuesOf(art.source,  new Array("ARTICLE", "BLOG", "TWEET", "NEWSPAPER"))
            )
            console.log("Wrong value type: source");
    } catch(err) {
        console.log('Error parsing JSON string:', err)
    }
}

function isRequired(str) {
    return !str;
}

function isEmpty(str) {
    return str.length === 0 || str === "" || str === 'undefined';
}

function isString(str) {
    return typeof str === 'string';
}

function isNumber(str) {
    return typeof str === 'number';
}

function isDateValidFormat(date) {
    if (!date)
        return false;
    else
        return !moment(date, 'MM/DD/YYYY', true).isValid();
}

function isDateInPast(date) {
    if (!date)
        return true;
    else
        return moment(date, 'MM/DD/YYYY', true).diff(moment()) < 0;
}
function checkHTTPS(str) {
    return !!str && str.substring(0, 8) === 'https://'
}

function checkItemsString(col) {
    var result = true;
    col.forEach(function(e, i, arr) {
        if(!isString(e)) result = false;
    });
    return result;
}

function checkValuesOf(str, col) {
    var result = false;
    col.forEach(function(e, i, arr) {
        if(str === e) result = true;
    });
    return result;
}

function validateWithYup(jsonString) {
    
    const today = new Date();

    let schema = object().shape({
      id: string().required().length(36),
      title: string().required().max(255),
      author: string().required().max(100),
      modifiedAt: date().required().max(today),
      publishedAt: date().max(today),
      url: string().url(),
      keywords: array().of(string()).min(1).max(3),
      readMins: number().required().positive().integer().min(1).max(20),
      source: mixed().oneOf(new Array("ARTICLE", "BLOG", "TWEET", "NEWSPAPER")),
    });

    schema
      .validate(jsonString)
      .then(function (valid) {
        valid; // => true
      })
      .catch(function (err) {
        console.log(err);
        err.name; // => 'ValidationError'
        err.errors; // => [{ key: 'field_too_short', values: { min: 18 } }]
      });
}
