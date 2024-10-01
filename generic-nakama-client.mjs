import {
  Client,
} from "https://cdn.jsdelivr.net/npm/@heroiclabs/nakama-js@2.8.0/+esm";
import { getOpcodeName } from './messages.mjs';
import { HOST, PORT, SECURE, SERVER_KEY } from './config-local.mjs';
//import { HOST, PORT, SECURE, SERVER_KEY } from './config-playrealm.mjs';

const td = new TextDecoder();

const LOG_IO = false;

export class GenericNakamaClient {
  constructor() {
    this.client = new Client(SERVER_KEY, HOST, PORT, SECURE);
  }

  async emailLogin(email, password, username) {
    this.session = await this.client.authenticateEmail(email, password, true, username);
    this.onceLoggedIn();
  }

  async deviceLogin(deviceId, username) {
    this.session = await this.client.authenticateDevice(deviceId, true, username);
    this.onceLoggedIn();
  }

  async onceLoggedIn() {
    this.socket = this.client.createSocket(SECURE);
    await this.socket.connect(this.session, true);

    //console.log(this.session);

    const result = await this.client.rpc(this.session, this.matchRpc, {});
    const matchId = result.payload.matchIds[0];

    this.socket.onmatchdata = (matchState) => {
      let { op_code, data } = matchState;
      data = td.decode(data);
      const data2 = data !== undefined ? JSON.parse(data) : null;
      if (LOG_IO) {
        console.warn(`<- ${getOpcodeName(op_code)}(${op_code}) ${data}`);
      }
      if (this.onMatchReceive) {
        this.onMatchReceive(op_code, data2);
      } else {
        console.log("absent onMatchReceive!", op_code, data2);
      }
    };

    this.match = await this.socket.joinMatch(matchId);

    document.title = `${this.session.username} (${this.session.user_id.substring(0, 5)}) match ${matchId.substring(0, 5)}`;
  }

  matchSend(op_code, data) {
    const data2 = data !== undefined ? JSON.stringify(data) : null;
    if (LOG_IO) {
      console.warn(`-> ${getOpcodeName(op_code)}(${op_code}) ${data}`);
    }
    return this.socket.sendMatchState(
      this.match.match_id,
      op_code,
      data2,
    );
  }
}
