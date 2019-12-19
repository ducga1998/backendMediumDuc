import amqplib from 'amqplib/callback_api'
let amqpConn = null
export default function start() {
    amqplib.connect(process.env.MQ_URL + "?heartbeat=60", function (err, conn) {
        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(start, 1000);
        }
        conn.on("error", function (err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });
        conn.on("close", function () {
            console.error("[AMQP] reconnecting");
            return setTimeout(start, 1000);
        });
        console.log("[AMQP] connected");
        amqpConn = conn;
        whenConnected();
    });
}
function whenConnected() {
    startPublisher();
    startWorker();
    
}
var pubChannel = null;
var offlinePubQueue = [];
function startPublisher() {
    amqpConn.createConfirmChannel(function (err, channel) {
        if (closeOnErr(err)) return;
        channel.on("error", function (err) {
            console.error("[AMQP] channel error", err.message);
        });
        channel.on("close", function () {
            console.log("[AMQP] channel closed");
        });
        pubChannel = channel
        const queue  = 'ductest'
        const msg = 'iam doing test mq'
        channel.assertQueue(queue, {
            durable: true
        });
        channel.sendToQueue(queue, Buffer.from(msg));
    });
}

export function publishMessage(exchange, routingKey, content) {
    try {
        pubChannel.publish(exchange, routingKey, content, { persistent: true },
            function (err, ok) {
                if (err) {
                    console.error("[AMQP] publish", err);
                    offlinePubQueue.push([exchange, routingKey, content]);
                    pubChannel.connection.close();
                }
            });
    } catch (e) {
        console.error("[AMQP] publish", e.message);
        offlinePubQueue.push([exchange, routingKey, content]);
    }
}
// A worker that acks messages only if processed succesfully
function startWorker() {
    amqpConn.createChannel(function (err, ch) {
        if (closeOnErr(err)) return;
        ch.on("error", function (err) {
            console.error("[AMQP] channel error", err.message);
        });

        ch.on("close", function () {
            console.log("[AMQP] channel closed");
        });

        ch.prefetch(10);
        ch.assertQueue("ductest", { durable: true }, function (err, _ok) {
            if (closeOnErr(err)) return;
            ch.consume("ductest", processMsg, { noAck: false });
            console.log("Worker is started");
        });

        function processMsg(msg) {
            work(msg, function (ok) {
                try {
                    if (ok)
                        ch.ack(msg);
                    else
                        ch.reject(msg, true);
                } catch (e) {
                    closeOnErr(e);
                }
            });
        }
    });
}

function work(msg, cb) {
    console.log("Got msg ", msg.content.toString());
    cb(true);
}

function closeOnErr(err) {
    if (!err) return false;
    console.error("[AMQP] error", err);
    amqpConn.close();
    return true;
}

// setInterval(function () {
//     publishMessage("", "ductest", new Buffer("work work work"));
// }, 1000);

start();