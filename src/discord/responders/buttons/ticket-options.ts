import { ResponderType } from "#base";
import { prisma } from "#database";
import { EmbedBuilder } from "@discordjs/builders";
import { createResponder } from "discord";
import { PermissionFlagsBits, TextChannel } from "discord.js";
import { rowOptionsUpdate, rowStaffOptions, rowTicketSetStatusButtons, rowUserOptions } from "discord/components/buttons/ticket-options";
import { selectedRemoveUser, selectNewUser } from "discord/components/selects/user-select";
import { emojis } from "discord/emojis/emojis_mentions";

createResponder({
    customId: "staff-painel-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        await interaction.reply({ components: [rowStaffOptions], ephemeral: true, content: `${emojis.set} Selecione uma opção:` });
    }
});

createResponder({
    customId: "user-painel-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        await interaction.reply({ components: [rowUserOptions], ephemeral: true, content: `${emojis.set} Selecione uma opção:` });
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

        const originalMessageId = await prisma.originalMessage.findUnique({ where: { id: 1 } });
        const original = interaction.channel?.messages.cache.get(originalMessageId?.messageId!);

        await ticketChannel.edit({
            permissionOverwrites: [
                { id: interaction.guild!.id, allow: "ViewChannel"}
            ]
        });

        await interaction.reply({ content: "-# ✅ | Ticket salvo como: finalizado", ephemeral: true });

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
                content: `${emojis.error} | Não foi possível deletar este ticket.\n\n-# Você não possui as permissões necessárias;`, 
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
        if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
            await interaction.reply({ 
                content: `${emojis.error}.\n-# Você não possui as permissões necessárias;`,
                ephemeral: true 
            });
            return;
        }

        await interaction.reply({ content: "-# 👤 | Selecione um usuário para adicionar:", components: [selectNewUser], ephemeral: true });
    }
});

createResponder({
    customId: "remove-user-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
            await interaction.reply({ 
                content: `${emojis.error} | Não foi possível deletar este ticket.\n\n-# Você não possui as permissões necessárias;`,
                ephemeral: true 
            });
            return;
        }

        await interaction.reply({ content: "-# 👤 | Selecione um usuário para remover:", components: [selectedRemoveUser], ephemeral: true });
    }
});


createResponder({
    customId: "pendente-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        await interaction.reply("Em andamento...");
    }
});

createResponder({
    customId: "finalizado-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        await interaction.reply("Em andamento...");
    }
});

createResponder({
    customId: "desenvolvimento-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        await interaction.reply("Em andamento...");
    }
});

createResponder({
    customId: "entregue-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        await interaction.reply("Em andamento...");
    }
});