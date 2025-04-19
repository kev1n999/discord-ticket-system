/**
 * -> Armazena o canal de texto definido
 * -> Será o canal onde terá a mensagem para a abertura dos tickets
 */

import { prisma } from "#database";

interface TextChannelConfig {
    channelId: string;

    saveTextChannel(): Promise<void>;
};

export class TextChannel implements TextChannelConfig {
    constructor(public channelId: string) {};

    async saveTextChannel(): Promise<void> {
        const existing = await prisma.textChannel.findUnique({
            where: { id: 1 },
        });

        if (existing) {
            await prisma.textChannel.update({
                where: { id: 1 },
                data: {
                    channelId: this.channelId
                }
            });
        } else {
            await prisma.textChannel.create({
                data: { id:1, channelId: this.channelId }
            });
        }
    }
};