import { ResponderType } from "#base";
import { prisma } from "#database";
import { createResponder } from "discord";
import { anteriorMessage } from "discord/components/buttons/system-options";
import { emojis } from "discord/emojis/emojis_mentions";

createResponder({
    customId: "selected-staff-role",
    types: [ResponderType.RoleSelect], cache: "cached",

    async run(interaction) {
        const roleId = interaction.values[0];
        const register = await prisma.staffRole.findUnique({ where: { id: 1} });

        if (register?.staffRoleId.includes(roleId)) {
            await interaction.reply({ content: `${emojis.warning2} | O cargo que você selecionou já está definido.`, ephemeral: true });
            return;
        }

        await prisma.staffRole.upsert({
            where: { id: 1 },
            update: { staffRoleId: roleId },
            create: { id: 1, staffRoleId: roleId }
        });
        
        await interaction.update({ content: `${emojis.settings} | Cargo da staff foi definido com sucesso.`, components: [anteriorMessage] });
    }
});