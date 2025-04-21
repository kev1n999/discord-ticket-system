import { ResponderType } from "#base";
import { prisma } from "#database";
import { createResponder } from "discord";
import { TextChannel } from "discord.js";
import { getSelectMenuOptions } from "discord/components/selects/select-product";
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

        const channelId = await prisma.textChannel.findUnique({ where: {id : 1} });
        const selectMessage = await prisma.messageSelect.findUnique({ where: { id: 1 }});

        const textChannel = interaction.guild?.channels.cache.get(channelId!.channelId) as TextChannel;

        if (!textChannel) {
            await interaction.reply({ content: `${emojis.set} A opção \`${label}\` foi removida com sucesso do select!`, ephemeral: true });            return;
        } else if (!selectMessage?.messageId) {
            await interaction.reply({ content: `${emojis.set} A opção \`${label}\` foi removida com sucesso do select!`, ephemeral: true });            return;
        }

        const message = textChannel.messages.cache.get(selectMessage.messageId);

        const updatedSelect = await getSelectMenuOptions();
        await message?.edit({ components: [updatedSelect] });
    }
});