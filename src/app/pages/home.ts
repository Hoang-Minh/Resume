import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../content/site';
import { WORK } from '../content/work';
import { SIDE_PROJECTS, SKILLS, TIMELINE } from '../content/career';
import { DocBlock } from '../ui/doc-block';

@Component({
  selector: 'mn-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DocBlock],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly site = SITE;
  protected readonly work = WORK;
  protected readonly timeline = TIMELINE;
  protected readonly skills = SKILLS;
  protected readonly sideProjects = SIDE_PROJECTS;

  protected readonly pressRelease =
    'https://octreasurer.gov/press/fy-2025-26-secured-property-tax-bills-available-online-and-mailed';
}
