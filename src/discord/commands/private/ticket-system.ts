import { createCommand } from "#base";
import { ApplicationCommandType, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { systemButtonsRow } from "discord/components/buttons/system-options.js";
import { emojis } from "discord/emojis/emojis_mentions";

createCommand({
    name: "config_ticket_system",
    description: "Configure o sistema de tickets para este servidor!",
    type: ApplicationCommandType.ChatInput,

    async run(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            await interaction.reply({ content: `${emojis.error} | Você não possui as permissões necessárias para o uso deste comando.`, ephemeral: true });
                return;
        }
        
        const embedDescription = `# ${emojis.settings} | Sistema de Tickets - Configuração\n${emojis.set}  Olá! Seja bem vindo ao painel para configurar o sistema de tickets neste servidor.\n\n**${emojis.raio} | Opções disponíveis:**\n\n${emojis.set} Canal de Texto: Definir canal de abertura\n${emojis.set} Embed: Definir embed\n${emojis.set} Categoria: Definir categoria dos tickets\n${emojis.set} Selects: Criar ou remover opções de abertura\n${emojis.set} Cargo Staff: Definir o cargo da staff.`;

        const embed = new EmbedBuilder({
            description: embedDescription,
            footer: { text: "Selecione uma opção"},
            color: 0x2b2d31
        });

        await interaction.reply({ embeds: [embed], ephemeral: true, components: [systemButtonsRow] });
    }
});