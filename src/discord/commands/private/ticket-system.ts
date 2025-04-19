import { createCommand } from "#base";
import { ApplicationCommandType, EmbedBuilder } from "discord.js";
import { systemButtonsRow } from "discord/components/buttons/system-options.js";
import { emojis } from "discord/emojis/emojis_mentions";

createCommand({
    name: "ticket-system",
    description: "Configure ticket-system in the server",
    type: ApplicationCommandType.ChatInput,

    async run(interaction) {
        const embedDescription = `# ${emojis.settings} | Sistema de Tickets - Configuração\n${emojis.set}  Olá! Seja bem vindo ao painel para configurar o sistema de tickets neste servidor.\n\n**${emojis.raio} | Opções disponíveis:**\n\n${emojis.set} Canal de Texto: Definir canal de abertura\n${emojis.set} Embed: Definir embed`;

        const embed = new EmbedBuilder({
            description: embedDescription,
            footer: { text: "Selecione uma opção"},
            color: 0x2b2d31
        });

        await interaction.reply({ embeds: [embed], ephemeral: true, components: [systemButtonsRow] });
    }
});