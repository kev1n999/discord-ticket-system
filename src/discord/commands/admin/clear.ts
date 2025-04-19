/**
 * Comando para limpar mensagens em um chat/canal de texto do servidor;
 * Só pode ser utilizado por administradores do servidor
 */

import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType, PermissionFlagsBits, TextChannel } from "discord.js";

createCommand({
    name: "clear",
    description: "Limpa uma certa quantidade de mensagens no canal de texto atual.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "amount",
            description: "Quantidade de mensagens que serão deletadas no chat atual.",
            type: ApplicationCommandOptionType.Number,
            required: true 
        }
    ],

    async run(interaction) {
        const amount = interaction.options.getNumber("amount");
        const channel = interaction.channel as TextChannel;

        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            await interaction.reply({
                content: "⚠ | Você não tem as permissões necessárias para a utilização deste comando.",
                ephemeral: true 
            });
            return;
        }

        if (channel.isTextBased()) {
            try {
                const deletedMessages = await channel.bulkDelete(amount!);
                if (deletedMessages.size === 0) {
                    await interaction.reply({
                        content: "O chat atual não possui nenhuma mensagem válida para ser deletada.",
                        ephemeral: true 
                    });
                    return;
                }

                await interaction.reply({
                    content: `✅ | Foram deletadas ${deletedMessages.size} mensagens em ${channel.toString()}`,
                    ephemeral: true 
                });
            } catch (err) {
                await interaction.reply({
                    content: `Ocorreu um erro ao tentar deletar as mensagens em ${channel.toString()}`,
                    ephemeral: true 
                });
            }
        }
    }
});