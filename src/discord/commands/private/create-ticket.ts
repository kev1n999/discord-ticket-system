import { createCommand } from "#base";
import { prisma } from "#database";
import { EmbedBuilder, PermissionFlagsBits, TextChannel } from "discord.js";
import { getSelectMenuOptions } from "discord/components/selects/select-product";
import { emojis } from "discord/emojis/emojis_mentions";

createCommand({
    name: "enviar_ticket",
    description: "Ativa a mensagem para abertura de tickets!",

    async run(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            await interaction.reply({ content: `${emojis.error} | Você não possui as permissões necessárias para o uso deste comando.`, ephemeral: true });
            return;
        }
        
        const channelId = await prisma.textChannel.findUnique({ where: {id : 1} });

        if (!channelId) {
            await interaction.reply({ content: "Você ainda não definiu nenhum canal de texto!", ephemeral: true });
            return;
        } 

        const channel = interaction.guild.channels.cache.get(channelId.channelId) as TextChannel;
        const embedSettings = await prisma.embed.findUnique({ where: { id: 1} });
        
        if (!embedSettings?.title && !embedSettings?.description && !embedSettings?.footer && !embedSettings?.color && !embedSettings?.image) {
            await interaction.reply({ content: "Você ainda não configurou nenhuma alteração na embed!", ephemeral: true });
            return;
        }

        const ticketEmbed = new EmbedBuilder({
            title: embedSettings.title!,
            description: embedSettings.description!,
            footer: { text: embedSettings.footer! },
            color: Number(embedSettings.color),
            image: { url: embedSettings.image! }
        });

        try {
            const selecteMenuOptions = await getSelectMenuOptions();
            await channel.send({ embeds: [ticketEmbed], components: [selecteMenuOptions] });
            await interaction.reply({ content: "Enviado!", ephemeral: true });
        } catch (err) {
            await interaction.reply({ content: "Ocorreu um erro ao tentar enviar a mensagem de abertura.", ephemeral: true });
        }
    }
});