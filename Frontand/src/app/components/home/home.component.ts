import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../../services/offerte-lavoro.service.service';
import { offerte_lavoro_entity } from '../../entity/offerte_lavoro.entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  jobs: offerte_lavoro_entity[] = [];
  filteredJobs: offerte_lavoro_entity[] = [];
  searchTerm: string = '';
  refreshInterval: any;

  constructor(private router: Router, private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
    this.refreshInterval = setInterval(() => this.loadJobs(), 30000); // Aggiorna ogni 30 secondi
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe(
      (data: offerte_lavoro_entity[]) => {
        this.jobs = data;
        this.filteredJobs = this.filterJobs(data, this.searchTerm);
        console.log('Offerte di lavoro:', this.jobs);
      },
      (error: any) => {
        console.error('Errore nel recuperare le offerte di lavoro:', error);
      }
    );
  }

  toggleRecent(): void {
    this.filteredJobs = this.filteredJobs.sort(
      (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );
  }

  deleteJob(id: string): void {
    this.jobService.deleteJob(id).subscribe(
      () => {
        this.loadJobs();
      },
      (error: any) => {
        console.error("Errore nell'eliminare l'offerta di lavoro:", error);
      }
    );
  }

  editJob(id: string): void {
    this.router.navigate([`/update/${id}`]);
  }

  searchJobs(): void {
    this.filteredJobs = this.filterJobs(this.jobs, this.searchTerm);
  }

  filterJobs(
    jobs: offerte_lavoro_entity[],
    term: string
  ): offerte_lavoro_entity[] {
    term = term.trim().toLowerCase();
    if (term === '') {
      return jobs;
    } else {
      return jobs.filter((job) => job.title.toLowerCase().includes(term));
    }
  }

  onSearchKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchJobs();
    }
  }

  hidePlaceholder(event: FocusEvent): void {
    const target = event.target as HTMLInputElement;
    target.placeholder = '';
  }

  showPlaceholder(event: FocusEvent): void {
    const target = event.target as HTMLInputElement;
    target.placeholder = 'Cerca lavoro...';
  }
}
