import { ButtonBuilder, ButtonStyle } from "discord.js";
import { ActionRowBuilder } from "discord.js";


// Botão para configurar o canal de abertura de tickets
const configChannelButton = new ButtonBuilder({
    label: "set-channel",
    style: ButtonStyle.Secondary,
    customId: "set-channel-button"
});

// Botão para configurar/personalizar embed da mensagem de abertura de tickets
const configEmbedButton = new ButtonBuilder({
    label: "set-embed",
    style: ButtonStyle.Secondary,
    customId: "set-embed-button"
});

// Botão para configurar a categoria onde serão criados os canais de atendimento/tickets
const configTicketCategory = new ButtonBuilder({
    label: "set-category",
    style: ButtonStyle.Secondary,
    customId: "set-category-button"
});


// Armazena/agrupa os botões/opções
export const systemButtonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents(configChannelButton, configEmbedButton, configTicketCategory);