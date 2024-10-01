import { TicTacToeClient } from "./tictactoe-client.mjs";
import { getDeviceId, getUsername } from "./misc.mjs";
import { setup } from "./ui.mjs";

(async () => {
  const cli = new TicTacToeClient();

  setup((n) => cli.play(n));

  //await cli.emailLogin(getEmail(), getPassword(), getUsername());
  await cli.deviceLogin(getDeviceId(), getUsername());
})();
