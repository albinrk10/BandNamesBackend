// const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');


const bands = new Bands();


bands.addBand(new Band('Tokio Hotel'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Metallica'));

console.log(bands);

// //Mensajes de sockets
// io.on('connection', client => {
//     console.log('Cliente conectado');

//     client.emit('active-bands', bands.getBands());

//     client.on('disconnect', () => {
//         console.log('Cliente desconectado');
//     });

//     client.on('mensaje', (payload) => {
//         console.log('Mensaje,', payload);

//         io.emit('mensaje', { admin: 'Nuevo mensaje' });
//     });

//     client.on('emitir-mensaje', (payload) => {
//         // console.log(payload);
//         // io.emit('nuevo-mensaje', payload); //emite a todos
//         client.broadcast.emit('nuevo-mensaje', payload); //emite a todos menos al que lo emitio
//     });
// });


module.exports = function (io) {
    io.on('connection', client => {
        console.log('Cliente conectado');

        client.emit('active-bands', bands.getBands());

        client.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
        client.on('mensaje', (payload) => {
            console.log('Mensaje,', payload);

            io.emit('mensaje', { admin: 'Nuevo mensaje' });
        });
        client.on('vote-band', (payload) => {
            bands.voteBand(payload.id);
            io.emit('active-bands', bands.getBands());
            console.log(payload);
        });
        //escuchar: add-band
        client.on('add-band', (payload) => {
            console.log(payload);
            const newBand = new Band(payload.name);
            bands.addBand(newBand);
            io.emit('active-bands', bands.getBands());
        });
        //escuchar: delete-band
        client.on('delete-band', (payload) => {
            console.log(payload);
            bands.deleteBand(payload.id);       
            io.emit('active-bands', bands.getBands());
        });


        // client.on('emitir-mensaje', (payload) => {
        //     // console.log(payload);
        //     // io.emit('nuevo-mensaje', payload); //emite a todos
        //     client.broadcast.emit('nuevo-mensaje', payload); //emite a todos menos al que lo emitio
        // });
        
    });


};
