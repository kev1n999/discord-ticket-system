import { createResponder, ResponderType } from "#base";
import { TextChannel } from "database/bases/channel.js";
import { emojis } from "discord/emojis/emojis_mentions";

createResponder({
    customId: "selected-channel",
    types: [ResponderType.ChannelSelect],

    async run(interaction) {
        const selectedChannel = interaction.values[0];
        new TextChannel(selectedChannel).saveTextChannel();

        await interaction.update({
            content: `${emojis.settings} | Canal de texto configurado com sucesso! (<#${selectedChannel}>)`,
        });
    }
});