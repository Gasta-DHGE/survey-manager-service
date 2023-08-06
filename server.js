import * as dotenv from 'dotenv';
import Fastify from 'fastify';
import closeWithGrace from 'close-with-grace';
import appService from './app.js';
dotenv.config();

const { ADDRESS = 'localhost', PORT = '3000' } = process.env;

const app = Fastify({
  logger: true
});
app.register(appService);

const closeListeners = closeWithGrace({ delay: process.env.FASTIFY_CLOSE_GRACE_DELAY || 500 }, async function ({ signal, err, manual }) {
  if (err) {
    app.log.error(err);
  }
  await app.close();
});

app.addHook('onClose', async (instance, done) => {
  closeListeners.uninstall();
  done();
});

app.listen({ host: ADDRESS, port: PORT }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
