import { createCommand } from "#base";
import { prisma } from "#database";
import { EmbedBuilder, TextChannel } from "discord.js";
import { selectProductsMenu } from "discord/components/selects/select-product.js";

createCommand({
    name: "create-ticket",
    description: "Enviar mensagem para abertura de tickets no canal configurado",

    async run(interaction) {
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
            await channel.send({ embeds: [ticketEmbed], components: [selectProductsMenu] });
            await interaction.reply({ content: "Enviado!", ephemeral: true });
        } catch (err) {
            await interaction.reply({ content: "Ocorreu um erro ao tentar enviar a mensagem de abertura.", ephemeral: true });
        }
    }
});