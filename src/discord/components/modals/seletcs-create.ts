import { ActionRowBuilder } from "@discordjs/builders";
import { ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export const selectsModal = new ModalBuilder({
    title: "Criar Opções",
    customId: "selects-modal"
});

const inputLabel = new TextInputBuilder({
    label: "Defina o label",
    customId: "input-label",
    required: true,
    style: TextInputStyle.Short,
});

const descriptionLabel = new TextInputBuilder({
    label: "Defina a descrição",
    customId: "input-description",
    required: true,
    style: TextInputStyle.Short
});

const inputValue = new TextInputBuilder({
    label: "Defina o valor",
    customId: "input-value",
    required: true,
    style: TextInputStyle.Short
});

selectsModal.addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(inputLabel),
    new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionLabel),
    new ActionRowBuilder<TextInputBuilder>().addComponents(inputValue),
);