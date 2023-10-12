import { Listener } from "./Listener";
import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from "./TicketCreatedEvent";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
        console.log('Event data ', data);

        msg.ack();
    }
}