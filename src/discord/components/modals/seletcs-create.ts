import { ActionRowBuilder } from "@discordjs/builders";
import { ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

// Modal para criar opções no select-menu
export const selectsModal = new ModalBuilder({
    title: "Criar Opções",
    customId: "selects-modal"
});

// Input para definir o label da opção
const inputLabel = new TextInputBuilder({
    label: "Defina o label",
    customId: "input-label",
    required: true,
    style: TextInputStyle.Short,
});

// Input para definir a descrição da opção
const descriptionLabel = new TextInputBuilder({
    label: "Defina a descrição",
    customId: "input-description",
    required: true,
    style: TextInputStyle.Short
});

// Select para definir o valor da opção
const inputValue = new TextInputBuilder({
    label: "Defina o valor",
    customId: "input-value",
    required: true,
    style: TextInputStyle.Short
});

// Adiciona os inputs ao modal
selectsModal.addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(inputLabel),
    new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionLabel),
    new ActionRowBuilder<TextInputBuilder>().addComponents(inputValue),
);