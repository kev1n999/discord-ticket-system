import { createResponder, ResponderType } from "#base";
import { TextChannel } from "database/bases/channel.js";

createResponder({
    customId: "selected-channel",
    types: [ResponderType.ChannelSelect],

    async run(interaction) {
        const selectedChannel = interaction.values[0];
        new TextChannel(selectedChannel).saveTextChannel();

        await interaction.reply({
            content: `Canal de texto configurado com sucesso! (<#${selectedChannel}>)`,
            ephemeral: true 
        });
    }
});