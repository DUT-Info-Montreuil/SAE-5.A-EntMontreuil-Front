import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/core/services/students.service';

interface Student {
  ligne : number;
  firstName: string;
  lastName: string;
  ine : string;
  nip : string;
  username : string;
  email : string;
}

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-add-students-csv',
  templateUrl: './add-students-csv.component.html',
  styleUrls: ['./add-students-csv.component.scss']
})
export class AddStudentsCsvComponent implements OnInit {

  file_csv!:any;
  contenue!:string;
  students: Student[] = [];
  ligne!:number;
  errorMessageRequete!:string ;
  transmettre!:boolean;
  detailMessage:string = "Détails : Le fichier CSV doit contenir les colonnes [ first_name - last_name - username - ine - nip - email ], veuillez vérifié si toutes les valeurs sont bien présentes et qu'il n'y a pas d'espace à la fin du fichier.";
  displayModalPassword:boolean = false;
  allPassword!:any;
  cols!: Column[];
  exportColumns!: ExportColumn[];

  constructor(private studentsService : StudentsService, private router: Router){}

  ngOnInit() {

    this.cols = [
        { field: 'username', header: 'Identifiant' },
        { field: 'password', header: 'Mot de passe' }
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
}

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.transmettre = true;
      this.file_csv = selectedFile;
      this.ligne = 1;
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const fileContent = fileReader.result as string;
        // Analyser le contenu CSV et le convertir en tableau d'objets d'étudiants
        this.students = this.parseCSVToStudents(fileContent);
      };
      fileReader.readAsText(selectedFile); // Lire le contenu du fichier en tant que texte

      //REQUETE
      this.studentsService.verifyCSV(selectedFile).subscribe({
        next: (response) => {
          if (response.valide_csv) {
            this.transmettre = false;
          }
          
        },
        error: (loginError) => {
          if (loginError.status === 400) {
            this.errorMessageRequete = "ERREUR : " + loginError.error.error
          } else {
            this.errorMessageRequete = "Impossible de ce connecté à l'api"
          }
        }
      });
      
    }
  }

  removeFile(){
    this.file_csv = null;
    this.transmettre = true;
    this.errorMessageRequete = ""
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
      }
    }
    return result;
  }

  getValueByColumnName(columnName: string, headers: string[], currentLine: string[]): string {
    const columnIndex = headers.indexOf(columnName);
    return (columnIndex !== -1) ? currentLine[columnIndex].trim() : '';
  }

  onSubmitFile(){
    this.studentsService.addStudentCSV(this.file_csv).subscribe({
      next: (response) => {
        if(response.password){
          console.log(response.password)
          this.allPassword = response.password;
          this.displayModalPassword = true;
        }
        
        
      },
      error: (loginError) => {
        console.log(loginError.error.error)
      }
    });
  }

  closeModalPassword(){
    this.displayModalPassword= false;
    
  }
  exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
          const doc = new jsPDF.default('p', 'px', 'a4');
          (doc as any).autoTable(this.exportColumns, this.allPassword);
          doc.save('mot_de_passe.pdf');
      });
  });
  }
}
