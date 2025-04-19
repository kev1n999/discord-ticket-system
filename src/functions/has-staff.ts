import { prisma } from "#database";
import { GuildMember } from "discord.js";

// Verifica se o membro possui o cargo de staff
export async function isStaff(member: GuildMember) {
    const staffRoleId = await prisma.staffRole.findUnique({ where: { id: 1 }});

    if (!member.roles.cache.has(staffRoleId?.staffRoleId!)) {
        return false;
    }

    return true;
}