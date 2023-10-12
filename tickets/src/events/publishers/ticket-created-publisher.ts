import { Publisher, Subjects, TicketCreatedEvent } from "@ticketmister/lib";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

