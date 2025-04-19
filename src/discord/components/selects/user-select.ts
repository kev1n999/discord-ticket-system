import { ActionRowBuilder, UserSelectMenuBuilder } from "discord.js";

// Select de usuários para adicionar novos ao canal de ticket
export const selectNewUser = new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(
    new UserSelectMenuBuilder({
        placeholder: "Selecione um usuário..." ,
        customId: "selected-new-user"
    })
.setDefaultUsers());

export const selectedRemoveUser = new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(
    new UserSelectMenuBuilder({
        placeholder: "Selecione um usuário..." ,
        customId: "selected-remove-user"
    })
.setDefaultUsers());