export class Role {
    id!: number;
    name!: string;
    isEditing : boolean =  false;
    isDeleting : boolean =  false;
    updateName : string = '';
}