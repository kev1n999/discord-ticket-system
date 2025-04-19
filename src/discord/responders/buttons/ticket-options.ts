import { ResponderType } from "#base";
import { prisma } from "#database";
import { EmbedBuilder } from "@discordjs/builders";
import { createResponder } from "discord";
import { ChannelType, PermissionFlagsBits, TextChannel } from "discord.js";
import { rowOptionsUpdate, rowStaffOptions, rowTicketSetStatusButtons, rowUserOptions } from "discord/components/buttons/ticket-options";
import { selectedRemoveUser, selectNewUser } from "discord/components/selects/user-select";
import { emojis } from "discord/emojis/emojis_mentions";
import { isStaff } from "functions/has-staff";


createResponder({
    customId: "staff-painel-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        const isStaffRole = await isStaff(interaction.member);
        
        if (!isStaffRole) {
            await interaction.reply("Sem permissao");
            return;
        }

        await interaction.reply({ components: [rowStaffOptions], ephemeral: true, content: `${emojis.set} Selecione uma opção:` });
    }
});

createResponder({
    customId: "user-painel-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        const userClient = await prisma.ticket.findFirst({ where: { channelId: interaction.channel?.id, } });
        if (userClient?.userId === interaction.user.id) {
            await interaction.reply({ components: [rowUserOptions], ephemeral: true, content: `${emojis.set} Selecione uma opção:` });
        } else {
            await interaction.reply({ content: `${emojis.warning2} | Apenas o cliente pode usar este botão!`, ephemeral: true });
        }
    }
});

createResponder({
    customId: "set-status-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        const statusMsg = await interaction.reply({
            content: "Defina o status atual deste ticket:",
            components: [rowTicketSetStatusButtons],
            ephemeral: true 
        });

        setTimeout(() => {
            statusMsg.delete();
        }, 2500);
    }
});

createResponder({
    customId: "close-ticket-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        const ticketChannel = interaction.channel as TextChannel;

        if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
            await interaction.reply({ 
                content: "❌ | Não foi possível fechar este ticket.\n\n-# Você não possui as permissões necessárias;", 
                ephemeral: true 
            });
            return;
        } 

        const originalMessageId = await prisma.ticket.findFirst({ where: { userId: interaction.user.id, channelId: ticketChannel.id } });
        const original = interaction.channel?.messages.cache.get(originalMessageId?.messageId!);

        await ticketChannel.edit({
            permissionOverwrites: [
                { id: interaction.guild!.id, deny: "ViewChannel"}, 
                { id: interaction.user.id, deny: "ViewChannel" }
            ]
        });

        const embedTicketInfo = new EmbedBuilder({
            description: `# ${emojis.ticketclose} Ticket Finalizado.\n${emojis.set} Este ticket foi encerrado por ${interaction.user.toString()}`,
            color: 0x2b2d31,
            footer: { text: "Simple Store - 2025" },
        });

        await original?.edit({components: [rowOptionsUpdate], embeds: [embedTicketInfo] });
        await interaction.reply({ ephemeral: true, content: `${emojis.set} Você fechou este ticket com sucesso.` });
    }
});


createResponder({
    customId: "delete-ticket-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        const ticketChannel = interaction.channel as TextChannel;

        if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
            await interaction.reply({ 
                content: `${emojis.error} -# Você não possui as permissões necessárias;`, 
                ephemeral: true 
            });
            return;
        }

        try {
            await ticketChannel.delete(`Ticket deletado por: ${interaction.member}`);
        } catch (err) {
            console.error(err);

            await interaction.reply({
                content: "Ocorreu um erro ao tentar deletar este ticket. Tente deletar manulamente;",
                ephemeral: true 
            });
        }
    }
});

createResponder({
    customId: "add-user-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        await interaction.reply({ content: `${emojis.user} | Adicione um usuário neste ticket:`, components: [selectNewUser], ephemeral: true });
    }
});

createResponder({
    customId: "selected-new-user",
    types: [ResponderType.UserSelect], cache: "cached",

    async run(interaction) {
        const userId = interaction.values[0];
        const ticketChannel = interaction.channel as TextChannel;

        if (ticketChannel.members.has(userId)) {
            await interaction.reply({ content: `${emojis.warning2} | Este usuário já está neste ticket!`, ephemeral: true });
            return;
        }

        await ticketChannel.edit({
            permissionOverwrites: [
                { id: userId, allow: ["ViewChannel", "SendMessages"]}
            ]   
        });

        await interaction.reply({ content: `${emojis.set} Usuário adicionado com sucesso!`, ephemeral: true });
    }
});

createResponder({
    customId: "remove-user-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
            await interaction.reply({ 
                content: `${emojis.error} -# Você não possui as permissões necessárias;`,
                ephemeral: true 
            });
            return;
        }

        await interaction.reply({ content: `${emojis.user} | Selecione um usuário para ser removido deste ticket:`, components: [selectedRemoveUser], ephemeral: true });
    }
});

createResponder({
    customId: "selected-remove-user",
    types: [ResponderType.UserSelect], cache: "cached",

    async run(interaction) {
        const userId = interaction.values[0];
        const ticketChannel = interaction.channel as TextChannel;

        if (!ticketChannel.members.has(userId)) {
            await interaction.reply({ content: `${emojis.warning2} | Este usuário não está neste ticket!`, ephemeral: true });
            return;
        }

        await ticketChannel.edit({
            permissionOverwrites: [
                { id: userId, deny: ["ViewChannel"]}
            ]   
        });

        await interaction.reply({ content: `${emojis.set} Usuário removido com sucesso!`, ephemeral: true });
    }
});

// Define o status como Pendente
createResponder({
    customId: "pendente-button",
    types: [ResponderType.Button], cache: "cached",
    
    async run(interaction) {
        const ticketChannel = interaction.channel as TextChannel;
        const guildChannels = interaction.guild.channels.fetch();

        let pendenteCategory = (await guildChannels).find(
            (channel) => channel?.type === ChannelType.GuildCategory && channel.name.toLowerCase() === "pendente"
        );

        if (!pendenteCategory) {
            pendenteCategory = await interaction.guild.channels.create({
                type: ChannelType.GuildCategory,
                name: "pendente"
            });
        }

        if (ticketChannel.parent?.id === pendenteCategory.id) {
            await interaction.reply({ content: `${emojis.warning2} | Este ticket já está definido como **pendnete**!`, ephemeral: true });
            return;
        }

        await ticketChannel.edit({ parent: pendenteCategory.id });
        await interaction.reply({ content: `${emojis.pendente} | O status deste ticket foi atualizado para **pendente**.`, ephemeral: true })
    }
});

// Define o status como Finalizado
createResponder({
    customId: "finalizado-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        const ticketChannel = interaction.channel as TextChannel;
        const guildChannels = interaction.guild.channels.fetch();

        let finalizadoCategory = (await guildChannels).find(
            (channel) => channel?.type === ChannelType.GuildCategory && channel.name.toLowerCase() === "finalizado"
        );

        if (!finalizadoCategory) {
            finalizadoCategory = await interaction.guild.channels.create({
                type: ChannelType.GuildCategory,
                name: "finalizado"
            });
        }

        if (ticketChannel.parent?.id === finalizadoCategory.id) {
            await interaction.reply({ content: `${emojis.warning2} | Este ticket já está definido como **finalizado**!`, ephemeral: true });
            return;
        }

        await ticketChannel.edit({ parent: finalizadoCategory.id });
        await interaction.reply({ content: `${emojis.finalizado} | O status deste ticket foi atualizado para **finalizado**.`, ephemeral: true });
    }
});


// Define o status como Em Desenvolvimento
createResponder({
    customId: "desenvolvimento-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        const ticketChannel = interaction.channel as TextChannel;
        const guildChannels = interaction.guild.channels.fetch();

        let desenvolvimentoCategory = (await guildChannels).find(
            (channel) => channel?.type === ChannelType.GuildCategory && channel.name.toLowerCase() === "em desenvolvimento"
        );

        if (!desenvolvimentoCategory) {
            desenvolvimentoCategory = await interaction.guild.channels.create({
                type: ChannelType.GuildCategory,
                name: "em desenvolvimento"
            });
        }

        if (ticketChannel.parent?.id === desenvolvimentoCategory.id) {
            await interaction.reply({ content: `${emojis.warning2} | Este ticket já está definido como **Em desenvolvimento**!`, ephemeral: true });
            return;
        }

        await ticketChannel.edit({ parent: desenvolvimentoCategory.id });
        await interaction.reply({ content: `${emojis.development} | O status deste ticket foi atualizado para **em desenvolvimento**.`, ephemeral: true });
    }
});


// Define o status como Entregue
createResponder({
    customId: "entregue-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        const ticketChannel = interaction.channel as TextChannel;
        const guildChannels = interaction.guild.channels.fetch();

        let entregueCategory = (await guildChannels).find(
            (channel) => channel?.type === ChannelType.GuildCategory && channel.name.toLowerCase() === "entregue"
        );

        if (!entregueCategory) {
            entregueCategory = await interaction.guild.channels.create({
                type: ChannelType.GuildCategory,
                name: "entregue"
            });
        }

        if (ticketChannel.parent?.id === entregueCategory.id) {
            await interaction.reply({ content: `${emojis.warning2} | Este ticket já está definido como **entregue**!`, ephemeral: true });
            return;
        }

        await ticketChannel.edit({ parent: entregueCategory.id });
        await interaction.reply({ content: `${emojis.box} | O status deste ticket foi atualizado para **entregue**.`, ephemeral: true });
    }
});
