import { createResponder, ResponderType } from "#base";
import { prisma } from "#database";
import { createRow } from "@magicyan/discord";
import { EmbedBuilder, RoleSelectMenuBuilder } from "discord.js";
import { rowEmbedOptions } from "discord/components/buttons/embed-options.js";
import { selectsConfigOptions } from "discord/components/buttons/system-options";
import { removeOptionsModal } from "discord/components/modals/remove-options";
import { selectsModal } from "discord/components/modals/seletcs-create";
import { selectTicketCategory } from "discord/components/selects/select-category.js";
import { selectChannel } from "discord/components/selects/select-channel.js";
import { emojis } from "discord/emojis/emojis_mentions";

// Envia o select para definição do canal de texto da abertura
createResponder({
    customId: "set-channel-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        await interaction.reply({
            content: `${emojis.settings} | Defina qual será o canal de texto responsável pela abertura de tickets:`,
            components: [selectChannel],
            ephemeral: true 
        });
    }
});

// Painel de opções para configuração e personalização da embed
createResponder({
    customId: "set-embed-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        const embedConfig = new EmbedBuilder({
            title: "⚙  | Configuração - Embed",
            description: "Aqui você pode personalizar a embed responsável pela abertura de tickets.\n\n**📝Opções disponíveis:**\n- Title: Definir titúlo\n- Description: Definir descrição\n- Footer: Definir final\n- Image: Definir imagem/banner",
            footer: { text: "Escolha uma opção"},
            color: 0x2b2d31
        });

        await interaction.reply({
            components: [rowEmbedOptions],
            embeds: [embedConfig],
            ephemeral: true 
        });
    }
});

// Envia o select para definição da categoria dos canais de ticket
createResponder({
    customId: "set-category-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        await interaction.reply({
            content: `${emojis.settings} | Defina qual será a categoria responsável pelos canais/tickets abertos:`,
            components: [selectTicketCategory],
            ephemeral: true 
        });
    }
});

// Envia o select para a definição do cargo da staff
createResponder({
    customId: "set-staffrole-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        const selectRole = createRow(
            new RoleSelectMenuBuilder({
                placeholder: "Defina o role de staff",
                customId: "selected-staff-role"
            }).setDefaultRoles()
        );

        await interaction.reply({ components: [selectRole], ephemeral: true, content: `${emojis.settings} | Defina qual será o cargo responsável pela staff:` });
    }
});

// Envia o painel de opções para criação ou remoção de opções do ticket-menu
createResponder({
    customId: "set-selects-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        await interaction.reply({ components: [selectsConfigOptions], ephemeral: true });
    }
});

// Limpa todas as opções criadas do select-menu
createResponder({
    customId: "clear-options",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        const counterOptions = await prisma.selectOptions.count();

        if (counterOptions < 1) {
            await interaction.reply({ content: `${emojis.error} | Você ainda não adicionou/criou nenhuma opção!`, ephemeral: true });
            return;
        }

        await prisma.selectOptions.deleteMany();

        await interaction.reply({ content: `${emojis.set} Todas as opções foram deletadas com sucesso.`, ephemeral: true });
    }
});

// Remove uma opção específica a partir do label dela no select-menu
createResponder({
    customId: "remove-options",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        await interaction.showModal(removeOptionsModal);
    }
});

// Envia a modal responsável pela criação das opções no select-menu
createResponder({
    customId: "create-options",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        await interaction.showModal(selectsModal);
    }
});