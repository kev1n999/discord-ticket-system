import { ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType } from "discord.js";

export const selectTicketCategory = new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(
    new ChannelSelectMenuBuilder({
        placeholder: "Selecione a categoria",
        customId: "selected-category"
    }).setDefaultChannels().setChannelTypes(ChannelType.GuildCategory)
);