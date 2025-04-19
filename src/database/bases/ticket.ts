import { prisma } from "#database";

interface TicketData {
    userId: string;
    channelId: string;
    messageId: string;

    registerTicket(): Promise<void>;
};

export class TicketDatabase implements TicketData {
    constructor (public userId: string, public channelId: string, public messageId: string) {};

    // Método para salvar e armazenar informações quando um ticket for aberto
    async registerTicket(): Promise<void> { 
        await prisma.ticket.create({
            data: {
                userId: this.userId,
                channelId: this.channelId,
                messageId: this.messageId
            }
        });
    }
};