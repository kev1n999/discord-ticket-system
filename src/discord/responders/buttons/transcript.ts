import { ResponderType } from "#base";
import { createResponder } from "discord";
import { createTranscript } from "discord-html-transcripts";
import { PermissionFlagsBits } from "discord.js";
import { emojis } from "discord/emojis/emojis_mentions";
import { isStaff } from "functions/has-staff";

// Função que gera um arquivo HTML contendo o histórico do canal atual do ticket
createResponder({
    customId: "generate-transcript-button",
    types: [ResponderType.Button], cache: "cached",

    async run(interaction) {
        const has_staff = await isStaff(interaction.member);

        if (!has_staff || !interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return;
        }
        
        const ticketChannel = interaction.channel;

        const attachment = await createTranscript(ticketChannel!);

        await ticketChannel?.send({ files: [attachment], content: `${emojis.set} Transcript gerado para este canal:` });
    }
});