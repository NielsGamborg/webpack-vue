const timeFilter = function(value){
    if (!value) return '';
    //var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var days = ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag']
    var date = new Date(value);
    var newValue = days[date.getDay()] + ', ' + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() +
        ', ' + date.getHours() + ':' + ('0' + (date.getMinutes().toString())).slice(-2);
    return newValue;
}

export {timeFilter};