import { Publisher, Subjects, TicketCreatedEvent, TicketUpdatedEvent } from "@ticketmister/lib";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
