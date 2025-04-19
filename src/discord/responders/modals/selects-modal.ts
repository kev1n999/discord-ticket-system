import { ResponderType } from "#base";
import { prisma } from "#database";
import { createResponder } from "discord";
import { emojis } from "discord/emojis/emojis_mentions";

createResponder({
    customId: "selects-modal",
    types: [ResponderType.ModalComponent],

    async run(interaction) {
        const label = interaction.fields.getTextInputValue("input-label");
        const description = interaction.fields.getTextInputValue("input-description");
        const value = interaction.fields.getTextInputValue("input-value");

        if (label.length > 10) {
            await interaction.reply({ content: `${emojis.error} | Label muito longa!`, ephemeral: true });
            return;
        } else if (label.length < 1) {
            await interaction.reply({ content: `${emojis.error} | Label inválida!`, ephemeral: true });
            return;
        }

        await prisma.selectOptions.create({
            data: { label: label, description: description, value: value }
        });

        await interaction.reply({ content: `${emojis.settings} | Opção criada com sucesso!`, ephemeral: true });
    }
});