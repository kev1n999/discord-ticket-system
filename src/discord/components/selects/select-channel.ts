import { ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType } from "discord.js";

export const selectChannel = new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(
    new ChannelSelectMenuBuilder({
        placeholder: "Defina o canal de texto...",
        customId: "selected-channel"
        
}).setDefaultChannels().setChannelTypes(ChannelType.GuildText));