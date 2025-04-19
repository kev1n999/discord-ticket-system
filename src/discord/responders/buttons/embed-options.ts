import { createResponder, ResponderType } from "#base";
import { colorModal, descriptionModal, footerModal, imageModal, titleModal } from "discord/components/modals/embed-settings.js";

createResponder({
    customId: "title-button",
    types: [ResponderType.Button],

    async run(interaction) {
        await interaction.showModal(titleModal);
    }
});

createResponder({
    customId: "description-button",
    types: [ResponderType.Button],

    async run(interaction) {
        await interaction.showModal(descriptionModal);
    }
});

createResponder({
    customId: "footer-button",
    types: [ResponderType.Button],

    async run(interaction) {
        await interaction.showModal(footerModal);
    }
});

createResponder({
    customId: "image-button",
    types: [ResponderType.Button],

    async run(interaction) {
        await interaction.showModal(imageModal);
    }
});

createResponder({
    customId: "color-button",
    types: [ResponderType.Button],

    async run(interaction) {
        await interaction.showModal(colorModal);
    }
});