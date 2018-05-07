module.exports = {
    toCamelCase : (name) => {
        return name.replace(/^([A-Z])|\s(\w)/g, function(match, p1, p2, offset) {
            if (p2) return p2.toUpperCase();
            return p1.toLowerCase();        
        });
    },
    toPascalCase : (name) => {
        return name.replace(/^([A-Z])|\s(\w)/g, function(match, p1, p2, offset) {
            if (p2) return p2.toUpperCase();
            return p1.toUpperCase();        
        });
    },
    capitalize : (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    },
    withoutFirstLetter : (name) => {
        return `${name.slice(1)}`;
    }
}