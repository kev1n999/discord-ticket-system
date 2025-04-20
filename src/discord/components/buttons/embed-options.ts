// Botões para configuração/personalização da embed do sistema de ticket.

import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { emojis } from "discord/emojis/emojis_mentions";

// Botão para definir titúlo da embed
const titleButton = new ButtonBuilder({
    label: "Title",
    style: ButtonStyle.Secondary,
    customId: "title-button",
    emoji: emojis.link
});

// Botão para definir descrição da embed
const descriptionButton = new ButtonBuilder({
    label: "Description",
    style: ButtonStyle.Secondary,
    customId: "description-button",
    emoji: emojis.write
});


// Botão para definir imagem/banner da embed
const imageButton = new ButtonBuilder({
    label: "Image",
    style: ButtonStyle.Secondary,
    customId: "image-button",
    emoji: emojis.image
});

// Botão para definir footer da embed
const footerButton = new ButtonBuilder({
    label: "Footer",
    style: ButtonStyle.Secondary,
    customId: "footer-button",
    emoji: emojis.footer
});

// Botão para definir cor da embed, a partir do código HEX(Hexadecimal)
const colorButton = new ButtonBuilder({
    label: "Color",
    style: ButtonStyle.Secondary,
    customId: "color-button",
    emoji: emojis.color 
});

// Row para agrupar botões de opções para definição da embed da mensagem de abertura de tickets
export const rowEmbedOptions = new ActionRowBuilder<ButtonBuilder>().addComponents(
    titleButton,
    descriptionButton,
    footerButton,
    imageButton,
    colorButton 
);