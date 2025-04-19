import { ActionRowBuilder, UserSelectMenuBuilder } from "discord.js";

// Select de usuários para adicionar novos ao canal de ticket
export const selectNewUser = new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(
    new UserSelectMenuBuilder({
        placeholder: "Selecione um usuário..." ,
        customId: "selected-new-user"
    })
.setDefaultUsers());

// Select para remover um usuário já adicionado do canal de ticket
export const selectedRemoveUser = new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(
    new UserSelectMenuBuilder({
        placeholder: "Selecione um usuário..." ,
        customId: "selected-remove-user"
    })
.setDefaultUsers());