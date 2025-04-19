import { prisma } from "#database";
import { createRow } from "@magicyan/discord";
import { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";

// Função que retorna todas as opções do select-menu que foram criadas pelo usuário
export async function getSelectMenuOptions() {
    const options = await prisma.selectOptions.findMany();

    const menuOptions = options.map(option => 
        new StringSelectMenuOptionBuilder({
            label: option.label,
            description: option.description!,
            value: option.value
        })
    );

    const selectMenu = new StringSelectMenuBuilder({
        placeholder: "Selecione uma opção...",
        customId: "selected-option"
    }).addOptions(menuOptions.slice(0, 25));

    return createRow(selectMenu);
};