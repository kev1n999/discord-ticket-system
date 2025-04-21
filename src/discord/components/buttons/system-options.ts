import { createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";
import { ActionRowBuilder } from "discord.js";
import { emojis } from "discord/emojis/emojis_mentions";


// Botão para configurar o canal de abertura de tickets
const configChannelButton = new ButtonBuilder({
    label: "Canal de Texto",
    style: ButtonStyle.Secondary,
    customId: "set-channel-button",
    emoji: emojis.settings
});

// Botão para configurar/personalizar embed da mensagem de abertura de tickets
const configEmbedButton = new ButtonBuilder({
    label: "Embed",
    style: ButtonStyle.Secondary,
    customId: "set-embed-button",
    emoji: emojis.write
});

// Botão para configurar a categoria onde serão criados os canais de atendimento/tickets
const configTicketCategory = new ButtonBuilder({
    label: "Categoria",
    style: ButtonStyle.Secondary,
    customId: "set-category-button",
    emoji: emojis.folder
});

// Botão para definir o cargo da staff
const setStaffRole = new ButtonBuilder({
    label: "Cargo Staff",
    style: ButtonStyle.Secondary,
    customId: "set-staffrole-button",
    emoji: emojis.option
});

// Botão para abrir configuração de opções do select-menu
const configSelectOptions = new ButtonBuilder({
    label: "Selects",
    style: ButtonStyle.Secondary,
    customId: "set-selects-button",
    emoji: emojis.list
});

// Botão para adicionar opções ao select-menu
const addOptions = new ButtonBuilder({
    label: "Criar Opções",
    style: ButtonStyle.Secondary,
    customId: "create-options",
    emoji: emojis.sinal_mais
});

// Botão para remover todas/limpar as opções do select-menu
const clearOptions = new ButtonBuilder({
    label: "Limpar Opções",
    style: ButtonStyle.Secondary,
    customId: "clear-options",
    emoji: emojis.lixeira
});

// Botão para remover uma opção do select-menu
const removeOption = new ButtonBuilder({
    label: "Remover Opções",
    style: ButtonStyle.Secondary,
    customId: "remove-options",
    emoji: emojis.sinal_menos
});

// Botão para voltar à mensagem anterior
export const anteriorMessage = createRow(
    new ButtonBuilder({
        style: ButtonStyle.Secondary,
        customId: "voltar-button",
        emoji: emojis.home
    })
);

// Armazena/agrupa os botões/opções
export const systemButtonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents(configChannelButton, configEmbedButton, configTicketCategory, configSelectOptions, setStaffRole);
export const selectsConfigOptions = new ActionRowBuilder<ButtonBuilder>().addComponents(addOptions, clearOptions, removeOption);