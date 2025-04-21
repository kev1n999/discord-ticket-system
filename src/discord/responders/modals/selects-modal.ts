import { ResponderType } from "#base";
import { prisma } from "#database";
import { createResponder } from "discord";
import { TextChannel } from "discord.js";
import { getSelectMenuOptions } from "discord/components/selects/select-product";
import { emojis } from "discord/emojis/emojis_mentions";

createResponder({
    customId: "selects-modal",
    types: [ResponderType.ModalComponent],

    async run(interaction) {
        const label = interaction.fields.getTextInputValue("input-label");
        const description = interaction.fields.getTextInputValue("input-description");
        const value = interaction.fields.getTextInputValue("input-value");

        if (label.length > 25) {
            await interaction.reply({ content: `${emojis.error} | Label muito longa!`, ephemeral: true });
            return;
        } else if (label.length < 1) {
            await interaction.reply({ content: `${emojis.error} | Label inválida!`, ephemeral: true });
            return;
        }

        // Cria e armazena uma nova opção ao select-menu
        await prisma.selectOptions.create({
            data: { label: label, description: description, value: value }
        });

        const channelId = await prisma.textChannel.findUnique({ where: {id : 1} });
        const selectMessage = await prisma.messageSelect.findUnique({ where: { id: 1 }});
        
        const textChannel = interaction.guild?.channels.cache.get(channelId!.channelId) as TextChannel;

        if (!textChannel) {
            await interaction.reply({ content: `${emojis.settings} | Opção criada com sucesso!\n-# Não se esqueça de definir um canal de texto!`, ephemeral: true });
            return;
        } else if (!selectMessage?.messageId) {
            await interaction.reply({ content: `${emojis.settings} | Opção criada com sucesso!`, ephemeral: true });
            return;
        }

        const message = textChannel.messages.cache.get(selectMessage.messageId);
        await interaction.reply({ content: `${emojis.settings} | Opção criada com sucesso!`, ephemeral: true });

        const updatedSelect = await getSelectMenuOptions();
        await message?.edit({ components: [updatedSelect] });
    }
});