// Modal para setar titúlo da embed
// Modal para setar descrição da embed
// Modal para setar footer da embed
// Modal para setar imagem da embed

import { ActionRowBuilder } from "@discordjs/builders";
import { ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";


export const titleModal = new ModalBuilder({
    title: "Definir titúlo",
    customId: "title-modal"
});

export const descriptionModal = new ModalBuilder({
    title: "Definir descrição",
    customId: "description-modal"
});

export const footerModal = new ModalBuilder({
    title: "Definir footer",
    customId: "footer-modal"
});

export const imageModal = new ModalBuilder({
    title: "Definir imagem",
    customId: "image-modal"
});

export const colorModal = new ModalBuilder({
    title: "Definir cor(HEX)",
    customId: "color-modal"
});


// Inputs/Fields

const titleInput = new TextInputBuilder({
    label: "Qual será o titúlo?",
    customId: "title-input",
    style: TextInputStyle.Short
});

const descriptionInput = new TextInputBuilder({
    label: "Qual será a descrição?",
    customId: "description-input",
    style: TextInputStyle.Paragraph
});

const footerinput = new TextInputBuilder({
    label: "Qual será o footer",
    customId: "footer-input",
    style: TextInputStyle.Short
});

const imageInput = new TextInputBuilder({
    label: "Qual será a imagem?",
    customId: "image-input",
    style: TextInputStyle.Short
});

const colorInput = new TextInputBuilder({
    label: "Coloque o valor da cor em HEX",
    customId: "color-input",
    style: TextInputStyle.Short 
});

// Titúlo
const titleInputRow = new ActionRowBuilder<TextInputBuilder>().addComponents(titleInput);
titleModal.addComponents(titleInputRow);

// Descrição
const descriptionInputRow = new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionInput);
descriptionModal.addComponents(descriptionInputRow);

// Footer
const footerInputRow = new ActionRowBuilder<TextInputBuilder>().addComponents(footerinput);
footerModal.addComponents(footerInputRow);

// Imagem
const imageInputRow = new ActionRowBuilder<TextInputBuilder>().addComponents(imageInput);
imageModal.addComponents(imageInputRow);

const colorInputRow = new ActionRowBuilder<TextInputBuilder>().addComponents(colorInput);
colorModal.addComponents(colorInputRow);