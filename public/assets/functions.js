const socket = io();

socket.emit('askAppData');
socket.on('getAppData', showData);

function showData(data){console.log(data);
    document.getElementById('lastUpdate').innerHTML = data.commit.date;
    document.getElementById('author').innerHTML = data.user.name + "@" + data.user.username;
    document.getElementById('branch').innerHTML = data.branch;
    document.getElementById('commit').innerHTML = data.commit.message;
    document.getElementById('commitUrl').innerHTML = data.commit.url;
}