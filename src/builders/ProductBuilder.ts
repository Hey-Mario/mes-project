export class ProductBuilder {
  private name: string;
  private description?: string;

  constructor(name: string) {
    this.name = name;
  }

  setName(name: string): ProductBuilder {
    this.name = name;
    return this;
  }

  setDescription(description: string): ProductBuilder {
    this.description = description;
    return this;
  }

  build() {
    return {
      name: this.name,
      description: this.description,
    };
  }
}