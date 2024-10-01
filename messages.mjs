export const OP = {
  // server -> client
  UPDATE: 100,
  FEEDBACK: 101,

  // client -> server
  MOVE: 200,
};

const opNameLookup = {};
for (const [k, v] of Object.entries(OP)) {
  opNameLookup[v] = k;
}

export function getOpcodeName(op_code) {
  return opNameLookup[op_code] || '?';
}
