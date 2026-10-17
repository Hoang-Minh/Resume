import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocBlock } from '../ui/doc-block';

@Component({
  selector: 'mn-cs-admin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DocBlock],
  templateUrl: './cs-admin.html',
  styleUrl: './case-study.scss',
})
export class CsAdmin {}
