const socket = io()

socket.on('message', (message) => {
    console.log(message);
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        if (error) {
            return console.log(error)
        }

        console.log('Message delivered');
    })
})

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation isn\'t supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition(position => {
        console.log('hiihasdf')
        console.log(position)
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location shared');
        })
    })
})
