const socket = io();

socket.emit('askAppData');
socket.on('getAppData', showData);

function showData(data){console.log(data);
    document.getElementById('ver').innerHTML = data.version;
    document.getElementById('des').innerHTML = data.description;
}