import { createResponder, ResponderType } from "#base";
import { colorModal, descriptionModal, footerModal, imageModal, titleModal } from "discord/components/modals/embed-settings.js";

// Envia a modal para definição do titúlo da embed
createResponder({
    customId: "title-button",
    types: [ResponderType.Button],

    async run(interaction) {
        await interaction.showModal(titleModal);
    }
});

// Envia a modal para definição da descrição da embed
createResponder({
    customId: "description-button",
    types: [ResponderType.Button],

    async run(interaction) {
        await interaction.showModal(descriptionModal);
    }
});

// Envia a modal para definição do footer da embed
createResponder({
    customId: "footer-button",
    types: [ResponderType.Button],

    async run(interaction) {
        await interaction.showModal(footerModal);
    }
});

// Envia a modal para definição da imagem da embed
createResponder({
    customId: "image-button",
    types: [ResponderType.Button],

    async run(interaction) {
        await interaction.showModal(imageModal);
    }
});

// Envia a modal para definição da cor da embed
createResponder({
    customId: "color-button",
    types: [ResponderType.Button],

    async run(interaction) {
        await interaction.showModal(colorModal);
    }
});