import { Component } from '@angular/core';

interface Student {
  ligne : number;
  firstName: string;
  lastName: string;
  ine : string;
  nip : string;
  username : string;
  email : string;
}

@Component({
  selector: 'app-add-students-csv',
  templateUrl: './add-students-csv.component.html',
  styleUrls: ['./add-students-csv.component.scss']
})
export class AddStudentsCsvComponent {

  file_csv:File | null = null;
  contenue!:string;
  students: Student[] = [];
  ligne!:number;
  errorMessage!:string ;
  error:boolean = false;

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.file_csv = selectedFile;
      this.ligne = 1;
      this.errorMessage = "Certaines lignes de votre fichier CSV ont été ignoré car elles présentes des anomalys à la ligne : "
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const fileContent = fileReader.result as string;
        // Analyser le contenu CSV et le convertir en tableau d'objets d'étudiants
        this.students = this.parseCSVToStudents(fileContent);
      };
      fileReader.readAsText(selectedFile); // Lire le contenu du fichier en tant que texte
    }
  }

  removeFile(){
    this.file_csv = null;
    this.error =false;
  }

  parseCSVToStudents(csvData: string): Student[] {
    const lines = csvData.split('\n');
    const result: Student[] = [];
    const expectedColumns = ['ine', 'first_name', 'last_name', 'nip', 'email', 'username']; // Colonnes attendues
    let headers: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const currentLine = lines[i].split(',');

      if (i === 0) {
        headers = currentLine.map(header => header.trim()); // Récupérer les en-têtes
      } else if (currentLine.length === expectedColumns.length) {
        const student: Student = {
          ligne : this.ligne ++ ,
          username: this.getValueByColumnName('username', headers, currentLine),
          firstName: this.getValueByColumnName('first_name', headers, currentLine),
          lastName: this.getValueByColumnName('last_name', headers, currentLine),
          ine: this.getValueByColumnName('ine', headers, currentLine),
          nip: this.getValueByColumnName('nip', headers, currentLine),
          email: this.getValueByColumnName('email', headers, currentLine),
        };

        result.push(student);
      }
      else {
        if (this.error === true){
          this.errorMessage += ' - '
        }
        this.errorMessage += `${i}`
        this.error = true;  
      }
    }

    return result;
  }


  getValueByColumnName(columnName: string, headers: string[], currentLine: string[]): string {
    const columnIndex = headers.indexOf(columnName);
    return (columnIndex !== -1) ? currentLine[columnIndex].trim() : '';
  }
}
