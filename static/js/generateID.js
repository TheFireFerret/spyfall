//https://gist.github.com/gordonbrander/2230317
// Math.random should be unique because of its seeding algorithm.
// Convert it to base 36 (numbers + letters), and grab the first 9 characters
// after the decimal.

/**
 * @return {string}
 */
function ID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    var id = Math.random().toString(36).substr(2, 7).toUpperCase();
    return id;
}