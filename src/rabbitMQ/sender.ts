#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
const sendMessage = (channel) => {
    var queue = 'ductest';
    var msg = 'Hello World!';

    channel.assertQueue(queue, {
        durable: false
    });
    channel.sendToQueue(queue, Buffer.from(msg));

    console.log(" [x] Sent %s", msg);
}
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

       sendMessage(channel)
    });
    // setTimeout(function() {
    //     connection.close();
    //     process.exit(0);
    // }, 500);
});