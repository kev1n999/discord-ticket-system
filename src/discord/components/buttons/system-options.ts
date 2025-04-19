import { ButtonBuilder, ButtonStyle } from "discord.js";
import { ActionRowBuilder } from "discord.js";
import { emojis } from "discord/emojis/emojis_mentions";


// Botão para configurar o canal de abertura de tickets
const configChannelButton = new ButtonBuilder({
    label: "Canal de Texto",
    style: ButtonStyle.Secondary,
    customId: "set-channel-button",
    emoji: emojis.settings
});

// Botão para configurar/personalizar embed da mensagem de abertura de tickets
const configEmbedButton = new ButtonBuilder({
    label: "Embed",
    style: ButtonStyle.Secondary,
    customId: "set-embed-button",
    emoji: emojis.write
});

// Botão para configurar a categoria onde serão criados os canais de atendimento/tickets
const configTicketCategory = new ButtonBuilder({
    label: "Categoria",
    style: ButtonStyle.Secondary,
    customId: "set-category-button",
    emoji: emojis.folder
});

const setStaffRole = new ButtonBuilder({
    label: "Cargo Staff",
    style: ButtonStyle.Secondary,
    customId: "set-staffrole-button",
    emoji: emojis.option
});

const configSelectOptions = new ButtonBuilder({
    label: "Selects",
    style: ButtonStyle.Secondary,
    customId: "set-selects-button",
    emoji: emojis.list
});

// Armazena/agrupa os botões/opções
export const systemButtonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents(configChannelButton, configEmbedButton, configTicketCategory, configSelectOptions, setStaffRole);