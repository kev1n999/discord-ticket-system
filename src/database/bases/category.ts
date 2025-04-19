import { prisma } from "#database";

interface CategorySettings {
    categoryId: string;

    saveCategory(): Promise<void>
};

export class TicketCategory implements CategorySettings {
    constructor(public categoryId: string) {};

    /**
     * Método para salvar e armazenar o ID da categoria selecionada nas opções de configuração
     * Esse ID será usado para definir onde será criado os canais/tickets no servidor
     */
    async saveCategory(): Promise<void> {
        const existing = await prisma.category.findUnique({
            where: { id: 1 },
        });
        
        if (existing) {
            await prisma.category.update({
                where: { id: 1 },
                data: {
                    categoryId: this.categoryId,
                    id: 1 
                }
            });
        } else {
            await prisma.category.create({
                data: {
                    id: 1,
                    categoryId: this.categoryId 
                }
            });
        }
    }
};