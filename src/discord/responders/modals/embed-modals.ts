import { createResponder, ResponderType } from "#base";
import { SetEmbedConfig } from "database/bases/embed.js";


const embedConfig = new SetEmbedConfig();

createResponder({
    customId: "title-modal",
    types: [ResponderType.ModalComponent], cache: "cached",

    async run(interaction) {
        const title = interaction.fields.getTextInputValue("title-input");
        embedConfig.title = title;
        await embedConfig.saveSettings();

        await interaction.reply({
            content: `✅ Título definido com sucesso!`,
            ephemeral: true
        });
    }
});

createResponder({
    customId: "description-modal",
    types: [ResponderType.ModalComponent], cache: "cached",

    async run(interaction) {
        const description = interaction.fields.getTextInputValue("description-input");
        embedConfig.description = description;
        await embedConfig.saveSettings();

        await interaction.reply({
            content: `✅ Descrição definida com sucesso!`,
            ephemeral: true
        });
    }
});

createResponder({
    customId: "footer-modal",
    types: [ResponderType.ModalComponent], cache: "cached",

    async run(interaction) {
        const footer = interaction.fields.getTextInputValue("footer-input");
        embedConfig.footer = footer;
        await embedConfig.saveSettings();

        await interaction.reply({
            content: `✅ Footer definido com sucesso!`,
            ephemeral: true
        });
    }
});

createResponder({
    customId: "image-modal",
    types: [ResponderType.ModalComponent], cache: "cached",

    async run(interaction) {
        const imageUrl = interaction.fields.getTextInputValue("image-input");
        embedConfig.image = imageUrl;
        await embedConfig.saveSettings();

        await interaction.reply({
            content: `✅ Imagem definida com sucesso!`,
            ephemeral: true
        });
    }
});

createResponder({
    customId: "color-modal",
    types: [ResponderType.ModalComponent], cache: "cached",

    async run(interaction) {
        const color = interaction.fields.getTextInputValue("color-input");
        embedConfig.color = color;
        await embedConfig.saveSettings();

        await interaction.reply({
            content: `✅ Cor definida com sucesso!`,
            ephemeral: true
        });
    }
});