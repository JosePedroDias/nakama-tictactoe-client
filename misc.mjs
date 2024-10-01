const charsetAll =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const charsetLower = "abcdefghijklmnopqrstuvwxyz0123456789";

const charsetLowerAlpha = "abcdefghijklmnopqrstuvwxyz";

function _generateRandomString(length, charset1, charset2) {
  let result = "";
  for (let i = 0; i < length; ++i) {
    const charset = i === 0 ? charset2 || charset1 : charset1;
    const idx = Math.floor(Math.random() * charset.length);
    result += charset[idx];
  }
  return result;
}

export function randomString(length) {
  return _generateRandomString(length, charsetAll);
}

export function randomIdentifier(length) {
  return _generateRandomString(length, charsetLower, charsetLowerAlpha);
}

export function getParam(key, fn) {
  let value = localStorage.getItem(key);
  if (!value) {
    value = fn();
    localStorage.setItem(key, value);
  }
  return value;
}

export function getDeviceId() {
  return getParam("_nk_deviceId_", () => randomString(8) + randomString(8));
}

export function getUsername() {
  return getParam("_nk_username_", () => "user_" + randomString(2));
}

export function getEmail() {
  return getParam(
    "_nk_email_",
    () => `${randomIdentifier(8)}@${randomIdentifier(4)}.com`,
  );
}

export function getPassword() {
  return getParam("_nk_password_", () => randomString(8));
}
