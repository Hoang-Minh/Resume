# Portfolio

Minh Nguyen's portfolio site. Its design language is a **public financial record**: the
site presents itself as a government filing rather than a marketing page, because the work
it describes is government property tax systems. Terms below are the vocabulary of that
metaphor — use them in class names, component names, and conversation.

## Language

**Record**:
The site as a whole, understood as a public filing rather than a marketing page. A record
is verifiable, dated, and cites its sources.
_Avoid_: Page, site, landing page (when referring to the design concept)

**Operable record**:
A Record that the reader can act on — sort it, filter it, resolve a citation, deep-link to
a view — rather than only read. The site's capability is demonstrated by being operable,
not by being decorated.
_Avoid_: Interactive site, app-like, dynamic

**Ledger**:
The list of work entries, presented as ruled rows with a body column and a reference
column. Each row is an entry in the record, not a marketing card.
_Avoid_: Portfolio grid, project cards, showcase

**Reference column**:
The narrow right-hand column (`--margin-col`) that carries provenance for the claim beside
it — where a figure came from, what period it covers, who published it.
_Avoid_: Sidebar, aside, margin note (the last is acceptable prose, not a name)

**Block**:
One row of the document: a reading column paired with its Reference column. Implemented as
`<mn-block>` with a `[ref]` slot.
_Avoid_: Section, row, container

**Figure**:
A number that carries weight and must be verifiable — 886,000 bills, $9.7 billion. A Figure
is always tabular-numeric and always linked to its source.
_Avoid_: Stat, metric, highlight

**Eyebrow**:
A record label above a heading, used only where the thing it labels genuinely has a
category or a date. Not decoration.
_Avoid_: Kicker, tag, label

### Structure

**Masthead**:
The opening of the Record. It carries the claim — one sentence holding who, what, and
scale — set as the largest type on the site. Not a hero; a masthead states what the
document is.
_Avoid_: Hero, banner, intro, above-the-fold

**Evidence band**:
The single inverted, full-Bleed band directly beneath the Masthead, carrying the Figure and
its source. It is the only inverted ground on the page, so inversion continues to mean
"this is the proof."
_Avoid_: CTA band, stats section, highlight strip

**Progressive quieting**:
The Record's governing rhythm: each section is set quieter than the one above it — narrower
track, smaller type, lower contrast — because each matters less than the one above it. The
page descends from claim to footnote.
_Avoid_: Alternating sections, striping, visual rhythm

### Case study

**Dek**:
The italic line beneath a case study's title that states what the piece is really about.
One sentence, never a summary of the whole page.
_Avoid_: Subtitle, tagline, subhead

**Facts sheet**:
The cover data of a case study — role, dates, stack, access — each cell carrying its own
hairline so the group reads as a filing's front matter rather than a caption.
_Avoid_: Meta, details, project info

**Pull**:
A sentence lifted out of the prose because it is the point of the page. Set larger than any
heading around it and marked with an accent edge. At most one or two per case study.
_Avoid_: Blockquote, callout, highlight

**Limit**:
A stated limitation the author is flagging rather than hiding — a known weakness, written
down on purpose. Its accent edge marks it as volunteered, not discovered.
_Avoid_: Caveat, disclaimer, warning

### Layout tracks

Three nested widths. Which track an element sits in is a design decision, not an
accident — the alternation between them is what gives the Record its rhythm.

**Document track**:
The 52rem track that carries the Record's body: the reading column plus its Reference
column. Prose never leaves this track.
_Avoid_: Container, wrapper, shell (the class is `.shell`; the concept is the Document track)

**Display track**:
The wider ~72rem track that carries display elements — the masthead, section headings, the
Ledger. Wider than reading comfort allows, because these are looked at rather than read.
_Avoid_: Wide container, full width

**Bleed**:
Edge-to-edge, no track. Reserved for grounds that change color — the inverted bands.
_Avoid_: Full width, full bleed section, hero band

### Emphasis

**Weight**:
How much emphasis an entry earns relative to the others (`primary` | `secondary`). Partie
carries less weight than the county work and is rendered to look like it.
_Avoid_: Priority, featured, rank
