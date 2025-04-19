import { createResponder, ResponderType } from "#base";
import { TicketCategory } from "database/bases/category.js";
import { emojis } from "discord/emojis/emojis_mentions";

createResponder({
    customId: "selected-category",
    types: [ResponderType.ChannelSelect], cache: "cached",

    async run(interaction) {
        const categoryId = interaction.values[0];
        new TicketCategory(categoryId).saveCategory();

        await interaction.reply({
            content: `${emojis.settings} | Categoria definida com sucesso!`,
            ephemeral: true 
        });
    }
});