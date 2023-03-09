# BK's Live Events

Bk's Live Events is a ticketing app built for fun to play with different technologies. The application follows a microservice architecture for deploying a more fault tolerant application in k8s clusters. The application has common features you would expect a Stubhub or Ticketmaster to have such as 
- Users can list a ticket for events like concerts or sports for sale
- People can purchase those tickets
- Anyone can list tickets for sale and purchase tickets
- When users attempt to purchase ticket, the ticket gets 'locked' for a duration of time. The user has to purchase that ticket within that time frame.
- When tickets are locked, no one else can purchase the ticket. After a specified duration of time the ticket will unlock. 
- Ticket prices can be edited only when unlocked

## Technologies

The following is a list of some of the technologies used to build this application. 

- Typescript
- Next.js
- Node.js
- React.js
- Redux
- Redis
- mongoDB
- Kubernetes
- Docker
- Skaffold
