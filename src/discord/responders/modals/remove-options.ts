import { ResponderType } from "#base";
import { prisma } from "#database";
import { createResponder } from "discord";
import { emojis } from "discord/emojis/emojis_mentions";

createResponder({
    customId: "remove-options-modal",
    types: [ResponderType.ModalComponent], cache: "cached",

    async run(interaction) {
        const label = interaction.fields.getTextInputValue("input-remove-label");

        const selectedOption = await prisma.selectOptions.findFirst({ where: { label: label } });

        if (!selectedOption) {
            await interaction.reply({ content: `${emojis.error} | Não existe nenhuma opção no select com esse nome(\`${label}\`)!`, ephemeral: true });
            return;
        } 

        await prisma.selectOptions.deleteMany({ where: { label: label } });
        await interaction.reply({ content: `${emojis.set} A opção \`${label}\` foi removida com sucesso do select!`, ephemeral: true });
    }
});