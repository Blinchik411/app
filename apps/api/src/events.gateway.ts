import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import type { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: true } })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('ping')
  ping(@MessageBody() data: unknown) {
    return { event: 'pong', data };
  }
}
