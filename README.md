# simple tictactoe nakama client in vanilla js

You can find the server counterpart to this here: https://github.com/JosePedroDias/nakama-tictactoe

## reference nakama docs

- https://heroiclabs.com/docs/nakama/client-libraries/javascript/
- https://heroiclabs.com/docs/nakama/api/client/index.html
- https://heroiclabs.github.io/nakama-js/
- https://heroiclabs.github.io/nakama-js/classes/nakama_js.Client.html#authenticateEmail
- https://heroiclabs.github.io/nakama-js/classes/nakama_js.Client.html#authenticateDevice
- https://heroiclabs.github.io/nakama-js/classes/nakama_js.Client.html#rpc

## host locally in https/tls

```
sudo apt install libnss3-tools
sudo apt install mkcert
mkcert -install
mkcert localhost
./serve-https.py
```
