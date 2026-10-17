import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocBlock } from '../ui/doc-block';

@Component({
  selector: 'mn-cs-taxbill',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DocBlock],
  templateUrl: './cs-taxbill.html',
  styleUrl: './case-study.scss',
})
export class CsTaxbill {}
