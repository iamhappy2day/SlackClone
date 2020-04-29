// import io from '/socket.io/socket.io.js'
// import io from 'socket.io/node_modules/socket.io-client';

const socket = io('http://localhost:9000');

socket.on('connect', () => {
  console.log(socket.id);
});

//todo listen from nsList, which is a list of all the namespaces
socket.on('nsList', (nsData) => {
  const namespacesDiv = document.querySelector('.namespaces');
  namespacesDiv.innerHTML = '';
  nsData.forEach((el) => {
    namespacesDiv.innerHTML += `<div class='namespace' endpoint = ${el.endpoint}><img src="${el.img}"/></div>`;
  });

  //todo add a click listeners to each namespace
  let namespaceDivs = document.querySelectorAll('.namespace');
  namespaceDivs = Array.from(namespaceDivs);

  namespaceDivs.map((nsDiv) => {
    nsDiv.addEventListener('click', () => {
        let endpoint = nsDiv.getAttribute('endpoint')
        console.log(endpoint)
    });
  });
});
