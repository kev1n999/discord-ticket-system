import { ActionRowBuilder } from "@discordjs/builders";
import { ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export const removeOptionsModal = new ModalBuilder({
    title: "Remover Opções",
    customId: "remove-options-modal"
});

const inputRemoveLabel = new TextInputBuilder({
    label: "Label",
    customId: "input-remove-label",
    placeholder: "Informe o label da opção",
    required: true,
    style: TextInputStyle.Short,
});


removeOptionsModal.addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(inputRemoveLabel),
);