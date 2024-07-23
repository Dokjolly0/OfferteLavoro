import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../../services/offerte-lavoro.service.service';
import { offerte_lavoro_entity } from '../../entity/offerte_lavoro.entity';

@Component({
  selector: 'app-publish-job',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css'],
})

//Sono presi in automatico dal form html i valori inseriti dall'utente e vengono assegnati all'oggetto job
export class AddRequestComponent {
  job: offerte_lavoro_entity = {
    //id: '',
    title: '',
    description: '',
    dueDate: new Date(),
    retribution: 0,
  };

  constructor(private router: Router, private jobService: JobService) {}

  formatDateIsoStrig(date: Date): string {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    let timezoneOffset = -date.getTimezoneOffset();
    let sign = timezoneOffset >= 0 ? '+' : '-';
    let offsetHours = Math.floor(Math.abs(timezoneOffset) / 60)
      .toString()
      .padStart(2, '0');
    let offsetMinutes = (Math.abs(timezoneOffset) % 60)
      .toString()
      .padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMinutes}`;
  }

  onSubmit(): void {
    // Converting dueDate to a proper Date object
    this.job.dueDate = new Date(this.job.dueDate);
    this.job.dueDate = this.formatDateIsoStrig(this.job.dueDate);

    if (
      this.job.title === '' ||
      this.job.description === '' ||
      this.job.retribution <= 0 ||
      this.job.dueDate === null
    ) {
      alert('Compilare tutti i campi');
      return;
    }

    this.jobService.addJob(this.job).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error: any) => {
        // Stampa a console tutti i campi dell'oggetto job
        for (const key of Object.keys(this.job) as Array<
          keyof typeof this.job
        >) {
          const value = this.job[key];
          console.log(`Campo: ${key}, Valore: ${value}, Tipo: ${typeof value}`);
        }

        alert("Errore nella pubblicazione dell'annuncio: " + error.message);
        console.error("Errore nella pubblicazione dell'annuncio:", error);
      }
    );
  }
}
