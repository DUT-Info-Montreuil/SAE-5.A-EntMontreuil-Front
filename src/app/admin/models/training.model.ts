export class Training {
    id!: number;              // Unique identifier for the training
    name!: string;            // Name of the training
    id_Degree!: number;       // ID of the associated degree

    // Additional fields for UI interactions
    isEditing: boolean = false;
    updatedName!: string;     // To hold the updated name during editing

    constructor(id: number, name: string, id_Degree: number) {
        this.id = id;
        this.name = name;
        this.id_Degree = id_Degree;
    }
}
