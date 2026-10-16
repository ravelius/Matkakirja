# Karttasepän luovutus 16.10.2026 klo 20.4x (Postivahti: kova raja 38 %)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md`, PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261016-ilta.md` (a301a8f0a).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Aja git fetch origin, lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261016-ilta2.md`
> KOKONAAN (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. JATKA KOHDASTA 1.

## 1. AVOIN: Kiinan dynastiat, PR #4720 odottaa CI:tä ja mergeä (Julkaisija/PT)

- Haara `karttaseppa-kiinan-rajat` (worktree `/Users/Shared/Claude/wt/karttaseppa-kiinan-rajat`), viimeisin 7029baf97: kaikki 19 vuotta,
  faktatarkistuksen 8 korjausta (Sisältökirjurin raportti `docs/raportit/kiinan-dynastiat-faktatarkistus-20261016.md`, #4722),
  värit omistajan 20.35 säännöllä (Qing #41709c, ulkoiset viileät / kiinalaiset lämpimät, Xiongnu #5f7b69).
- **Pelin data** `data/linssit/kiinan-dynastiat/kiinan-dynastiat.json`, muoto `MUOTO.md` (Linssiseppä LUKITSI; peli lukee sen,
  proto `linssiseppa/kiinan-dynastiat`). Jokaisen datamuutoksen jälkeen rivi Linssisepälle (local_771b401b-…): sha + vuosien määrä.
- Työkansio T7 `/Volumes/T7 4TB/Matkakirja-karttaseppa/kiinan-dynastiat/`: `skriptit/` (rajat.py + vuodet_a/b/c.py, piirra.py,
  vie.py, pallokuva.py = vain oma tarkistus, EI omistajalle/haaraan), Python `venv-tyokalut/bin/python`. Kaava muutokseen:
  muokkaa skriptit → `piirra.py <kaikki vuodet pilkuin>` → `vie.py tulos/kiinan-dynastiat.json` → kopioi skriptit (ei pallokuva.py),
  `tulos/rajat-*.geojson`, json ja MUOTO.md haaraan → commit → push → Linssisepälle rivi.
- Avoimet (ei tilattu): aukot ilman toimintaa (turkkilaiset 589, uiguurit 790, Dali, 950-kuningaskuntien pääkaupungit),
  tarinarivit 1912 ("käytännössä itsenäisiä, tasavalta vaati") ja 1644 (syyskuu) Sisältökirjurille PT:n kautta.
- Mergen jälkeen: poista worktree `wt/karttaseppa-kiinan-rajat`.

## 2. Tämän vuoron valmiit (kuitattu PT:lle)

| Erä | Toimitus |
|---|---|
| Dynastiat 19/19 + korjaukset + värit | #4720 (yllä) |
| OPAS_SALLITUT 7 pääkaupunkia | #4713 MERGED f8111eec0 (esittely-v2a viety 20.20); worktree poistettu |
| Juna 198 pääkaupungit | 11 mitattu (`proto-3d/_tyo/karttaseppa/paakaupungit-3d-198/TULOS.md`): vain Varsova SALLITTU mittarilla, mutta oppaan omista kulmista (vapaa lento) SSE-laikku sumea → POIS; Tallinna/Sarajevo lähikulmassa litteät → POIS; Vaduz POIS; muut POIS. 0 lisäystä, PT kuittasi linjan (POIS ja poikkeukset "ei nyt") |
| still.mjs | ETAISYYS/KALLISTUS/TSV-ympäristömuuttujat ja Googlen laattavirheiden laskenta (`paakaupungit-3d-198/skriptit/`) |

## Muistiinpanot

- Oppaan kamerakulmat natiivista: avaus 5000 m / 25° pystystä (OpasSilmukka), kierto 220–2200 m / 25–78° (OpasOhjaus),
  vapaa lento ≤ 12 km r_m-alueella (OpasVapaaLento). Uusien kaupunkien testi niistä, ei pelkästä mittarista (PT 16.10.).
- Pitkät ajot setsid-kaavalla (muisti `pitkat-ajot-setsid-irrotus`).
