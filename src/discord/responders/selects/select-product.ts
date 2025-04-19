import { createResponder, ResponderType } from "#base";
import { prisma } from "#database";
import { TicketDatabase } from "database/bases/ticket";
import { ChannelType, EmbedBuilder } from "discord.js";
import { firstButtons } from "discord/components/buttons/ticket-options";
import { getSelectMenuOptions } from "discord/components/selects/select-product";
import { emojis_mentions } from "discord/emojis/mentions.json";

createResponder({
    customId: "selected-option",
    types: [ResponderType.StringSelect], cache: "cached",

    async run(interaction) {
        const productName = interaction.values[0];
        const getCategoryId = await prisma.category.findUnique({ where: { id: 1 } });

        if (getCategoryId?.categoryId) {
            const ticketChannel = await interaction.guild?.channels.create({
                name: `📂-${interaction.member?.user.username}`,
                type: ChannelType.GuildText,
                parent: getCategoryId.categoryId,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id, 
                        deny: ["ViewChannel"]
                    },
                    {
                        id: interaction.user.id,
                        allow: ["ViewChannel", "SendMessages"]
                    }
                ]
            });

            await interaction.reply({
                content: `${emojis_mentions.set} Seu ticket foi aberto com sucesso em: ${ticketChannel?.toString()}\n-# ${emojis_mentions.warning2} Seja sempre paciente e respeitoso com a staff!`,
                ephemeral: true  
            });
            const selectMenuOptions = await getSelectMenuOptions();

            await interaction.message.edit({ components: [selectMenuOptions] });

            const embedTicketInfo = new EmbedBuilder({
                description: `# ${emojis_mentions.ticketopen} Ticket Aberto\n${emojis_mentions.set} Olá ${interaction.user.toString()}, seja bem vindo ao seu ticket!\n${emojis_mentions.set} Aguarde pacientemente pelo staff que irá atende-lô.`,
                color: 0x2b2d31,
                fields: [
                    { name: `${emojis_mentions.set} Cliente`, value: `${interaction.user.toString()} (ID: ${interaction.user.id})`, inline: true },
                    { name: `${emojis_mentions.set} Opção escolhida`, value: `\`${productName}\``, inline: false },
                ],
                footer: { text: "Simple Store - 2025" },
                thumbnail: { url: interaction.user.displayAvatarURL() }
            });
            
            const originalMessage = await ticketChannel?.send({
                embeds: [embedTicketInfo],
                components: [firstButtons]
            });

            await originalMessage?.pin();
            await ticketChannel?.bulkDelete(1);

            // Salva dados do cliente e canal do ticket
            new TicketDatabase(interaction.user.id, ticketChannel.id, originalMessage.id).registerTicket();
        } else {
            await interaction.reply({
                content: "Não encontrei a categoria definida!",
                ephemeral: true 
            });
        }
    }
});