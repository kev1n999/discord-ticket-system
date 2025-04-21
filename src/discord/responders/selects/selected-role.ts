import { ResponderType } from "#base";
import { prisma } from "#database";
import { createResponder } from "discord";
import { emojis } from "discord/emojis/emojis_mentions";

createResponder({
    customId: "selected-staff-role",
    types: [ResponderType.RoleSelect], cache: "cached",

    async run(interaction) {
        const roleId = interaction.values[0];
        await prisma.staffRole.create({ data: { id: 1, staffRoleId: roleId } });
        
        await interaction.update({ content: `${emojis.settings} | Cargo da staff foi definido com sucesso.` });
    }
});