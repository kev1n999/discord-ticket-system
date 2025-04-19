import { createResponder, ResponderType } from "#base";
import { EmbedBuilder } from "discord.js";
import { rowEmbedOptions } from "discord/components/buttons/embed-options.js";
import { selectTicketCategory } from "discord/components/selects/select-category.js";
import { selectChannel } from "discord/components/selects/select-channel.js";

createResponder({
    customId: "set-channel-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        await interaction.reply({
            content: "-# Selecione o canal de texto para o ticket-system:",
            components: [selectChannel],
            ephemeral: true 
        });
    }
});

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

createResponder({
    customId: "set-category-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        await interaction.reply({
            content: "Selecione a categoria que deseja definir para os canais de atendimento. (Essa categoria será onde os canais de atendimento serão criados)",
            components: [selectTicketCategory],
            ephemeral: true 
        });
    }
})