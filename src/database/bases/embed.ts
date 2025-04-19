import { prisma } from "#database";

export interface EmbedSettings {
  title?: string;
  description?: string;
  footer?: string;
  image?: string;
  color?: string;

  saveSettings(): Promise<void>;
}

export class SetEmbedConfig implements EmbedSettings {
  constructor(
    public title?: string,
    public description?: string,
    public footer?: string,
    public image?: string,
    public color?: string
  ) {}

  /**
   * Método para salvar e armazenar configurações da embed
   */
  async saveSettings(): Promise<void> {
    const existing = await prisma.embed.findUnique({
      where: { id: 1 },
    });

    if (existing) {
      await prisma.embed.update({
        where: { id: 1 },
        data: {
          title: this.title,
          description: this.description,
          footer: this.footer,
          image: this.image,
          color: this.color,
        },
      });
    } else {
      await prisma.embed.create({
        data: {
          id: 1,
          title: this.title,
          description: this.description,
          footer: this.footer,
          image: this.image,
          color: this.color,
        },
      });
    }
  }
};