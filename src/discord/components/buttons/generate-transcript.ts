import { ButtonBuilder, ButtonStyle } from "discord.js";
import { emojis } from "discord/emojis/emojis_mentions";

// Botão responsável por gerar um arquivo HTML contendo o histórico do canal atual
export const generateTranscriptButton =new ButtonBuilder({
        label: "Gerar Transcript",
        customId: "generate-transcript-button",
        style: ButtonStyle.Success,
        emoji: `${emojis.footer}`
});