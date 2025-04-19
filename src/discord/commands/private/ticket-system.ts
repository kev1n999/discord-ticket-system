import { createCommand } from "#base";
import { ApplicationCommandType, EmbedBuilder } from "discord.js";
import { systemButtonsRow } from "discord/components/buttons/system-options.js";

createCommand({
    name: "ticket-system",
    description: "Configure ticket-system in the server",
    type: ApplicationCommandType.ChatInput,

    async run(interaction) {
        const embedDescription = `👋  Olá! Seja bem vindo ao painel para configurar o sistema de tickets neste servidor.\n\n**☕ | Opções disponíveis:**\n- 💬 Set-Channel: Definir canal de abertura\n- 📂 Select-Config: Definir selects\n- 📝 Embed-Config: Definir embed`;

        const embed = new EmbedBuilder({
            title: "⚙  | Sistema de Tickets - Configuração",
            description: embedDescription,
            footer: { text: "Selecione uma opção", iconURL: interaction.client.user.displayAvatarURL()},
            color: 0x2b2d31
        });

        await interaction.reply({ embeds: [embed], ephemeral: true, components: [systemButtonsRow] });
    }
});