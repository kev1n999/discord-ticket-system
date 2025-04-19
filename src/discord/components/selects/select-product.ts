import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";

const product1 = new StringSelectMenuOptionBuilder()
    .setLabel("🤖 | Bots")
    .setDescription("R$ 50")
    .setValue("bot1");
    
export const selectProductsMenu = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder({
        placeholder: "Selecione um produto...",
        customId: "selected-product"

}).addOptions(product1));