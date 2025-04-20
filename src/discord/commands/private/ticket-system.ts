import { createCommand } from "#base";
import { ApplicationCommandType, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { systemButtonsRow } from "discord/components/buttons/system-options.js";
import { emojis } from "discord/emojis/emojis_mentions";

const imageURL = "https://media.discordapp.net/attachments/1360683138791248013/1363578173249294617/c9798e06-0364-40b0-825f-8c8edca34857.png?ex=68068aa2&is=68053922&hm=fbafdd63a64f9a81416d9c060ca62eb46050755db0b134cb8c3917c40f2bcb0f&=&format=webp&quality=lossless";

const embedDescription = `# ${emojis.settings} | Sistema de Tickets - Configuração\n${emojis.set}  Olá! Seja bem vindo ao painel para configurar o sistema de tickets neste servidor.\n\n**${emojis.raio} | Opções disponíveis:**\n\n${emojis.set} Canal de Texto: Definir canal de abertura\n${emojis.set} Embed: Definir embed\n${emojis.set} Categoria: Definir categoria dos tickets\n${emojis.set} Selects: Criar ou remover opções de abertura\n${emojis.set} Cargo Staff: Definir o cargo da staff.`;

export const originalEmbed = new EmbedBuilder({
    description: embedDescription,
    footer: { text: "Selecione uma opção"},
    color: 0x2b2d31,
    image: { url: imageURL }
});

createCommand({
    name: "config_ticket_system",
    description: "Configure o sistema de tickets para este servidor!",
    type: ApplicationCommandType.ChatInput,

    async run(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            await interaction.reply({ content: `${emojis.error} | Você não possui as permissões necessárias para o uso deste comando.`, ephemeral: true });
                return;
        }

        await interaction.reply({ embeds: [originalEmbed], ephemeral: true, components: [systemButtonsRow] });
    }
});