// Botões para gerenciamento de tickets

import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { emojis_mentions } from "discord/emojis/mentions.json";

// Botão com opções para a staff
const staffPainel = new ButtonBuilder({
    label: "Ações da Staff",
    style: ButtonStyle.Secondary,
    customId: "staff-painel-button",
    emoji: emojis_mentions.option
});

// Botão com opções para o usuário
const userPainel = new ButtonBuilder({
    label: "Ações do Usuário",
    style: ButtonStyle.Secondary,
    customId: "user-painel-button",
    emoji: emojis_mentions.user
});

// Botão para adicionar novos usuários ao ticket
const addNewUser = new ButtonBuilder({
    label: "Usuário",
    style: ButtonStyle.Secondary,
    customId: "add-user-button",
    emoji: emojis_mentions.sinal_mais
});

// Botão para remover usuário do canal de ticket
const removeUser = new ButtonBuilder({
    label: "Usuário",
    style: ButtonStyle.Secondary,
    customId: "remove-user-button",
    emoji: emojis_mentions.sinal_menos
});

// Botão para definir status do ticket atual
const setTicketStatus = new ButtonBuilder({
    label: "Status",
    style: ButtonStyle.Secondary,
    customId: "set-status-button",
    emoji: emojis_mentions.raio 
});

/**
 * Botão para fechar ticket atual
 * -> Reseta as permissões do cliente, garantindo que ele não tenha mais acesso ao canal do ticket que foi fechado;
 */
const closeTicketButton = new ButtonBuilder({
    label: "Fechar",
    style: ButtonStyle.Secondary,
    customId: "close-ticket-button",
    emoji: emojis_mentions.close
});

// Botão para deletar o canal do ticket atual
const deleteTicketButton = new ButtonBuilder({
    label: "Deletar",
    style: ButtonStyle.Danger,
    customId: "delete-ticket-button",
    emoji: emojis_mentions.lixeira
});

// Botão de definição para status pendente
const setPendente = new ButtonBuilder({
    label: "Pendente",
    style: ButtonStyle.Secondary,
    customId: "pendente-button",
    emoji: emojis_mentions.pendente
});

// Botão de definição para status em desenvolvimento
const setDevelopment = new ButtonBuilder({
    label: "Em desenvolvimento...",
    style: ButtonStyle.Secondary,
    customId: "desenvolvimento-button",
    emoji: emojis_mentions.development
});

// Botão de definição para status finalizado
const setExit = new ButtonBuilder({
    label: "Finalizado",
    style: ButtonStyle.Secondary,
    customId: "finalizado-button",
    emoji: emojis_mentions.finalizado
});

// Botão para definição para status entregue
const setEntregue = new ButtonBuilder({
    label: "Entregue",
    style: ButtonStyle.Secondary,
    customId: "entregue-button",
    emoji: emojis_mentions.box 
});

export const firstButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
    staffPainel,
    userPainel
);

// Row para agrupar botões de opções da staff
export const rowStaffOptions = new ActionRowBuilder<ButtonBuilder>().addComponents(
    setTicketStatus,
    closeTicketButton,
    addNewUser,
    removeUser,
);

// Row para agrupar opções do usuário
export const rowUserOptions = new ActionRowBuilder<ButtonBuilder>().addComponents(
    closeTicketButton
);

// Row para agrupar botões de opções de definição de status do ticket
export const rowTicketSetStatusButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
    setPendente, setDevelopment, setExit, setEntregue
);

// Agrupa apenas os botões de deletar e fechar ticket(Após a finalização) 
export const rowCloseAndDeleteButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
    closeTicketButton,
    deleteTicketButton
);

// Row que atualiza os components após o encerramento do ticket
export const rowOptionsUpdate = new ActionRowBuilder<ButtonBuilder>().addComponents(
    deleteTicketButton
);