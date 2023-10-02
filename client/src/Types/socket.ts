export interface ServerToClientEvents {
  online: (id: string, online: boolean) => void;
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: String) => void) => void;
  msg: (message: string) => void;
}

export interface ClientToServerEvents {
  connect: (id: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
