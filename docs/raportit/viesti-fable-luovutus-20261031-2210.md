# PT:n luovutus 31.10.2026 klo 22.10

Edellinen: viesti-fable-luovutus-20261031-2155.md (lue sekin; tämä on vain lisäys). Viestit aina id:llä. Osoitteet: /Users/Shared/Claude/osoitekirja.md.

## TILA: VIIKKO 90 % → LUOVUTUKSET (Raamattu 12.21), TILINVAIHTO EDESSÄ
- PT käski 22.0x kaikki aktiiviset roolit luovuttamaan. Valmiit: JU df220a815 (PR 5750), NS dff7fd126 (PR 5751),
  KS caf71436d (PR 5752), VS 094895ff7 + cea778bee (PR 5753), LAV 3ce461b5c (lavastaja/luovutus-159). Odottaa: NUI, PK.
- KK:lle kerrottu (TOIMI TARVITAAN -lista omistajalle tilinvaihdosta). Postivahti: älä nollaa ennen tilinvaihtoa; ilmoita 92 %.

## OMISTAJAN PÄÄTÖS 22.06 (tehty, PR 5754, lokissa, työlistalla)
- Tilinvaihtoon tarkistus ennen kuin työ jatkuu: docs/tilinvaihto.md kohta 7.5. `node tools/tyotavat/tilinvaihto-valmis.mjs`
  tarkistaa nyt myös lyhyet id:t (local_<8>), kotikansioiden juuren .md:t ja ~/.claude/CLAUDE.md:n.
- Löytyneet vanhat id:t: Matkakirja-posti/NOLLAUS.md (Postivahti korjaa), scratchpad/keskustelukanava/aloitus.md (KK korjaa),
  docs/aloitusviestit/aanittaja.md (lepäävä rooli, ei korjattu). SEURAAVA PT: aja työkalu heti tilinvaihdon jälkeen, korjaa, rivi KK:lle.

## PARIISI (junan ehto)
- KS:n koepala r3-c4 v2 (_tyo/karttaseppa/pariisi-pohja/koepala/r3-c4-g2-v2-vs-G.jpg): vaaleus, kadut, Seine oikein; EI kuitattu.
  v3-korjaukset (katot harja + 2 sävyä + kattoikkunat/savupiiput, isommat harvemmat korttelit ja korkeus ~1,5×, puut 2–3× pyöreinä
  riveinä, kivilaiturit, lämpimät julkisivut + vahvempi mustekehys): docs/raportit/viesti-karttaseppa-pariisi-v3-korjaukset-20261031.md.
  Seuraava KS tekee v3:n → PT kuittaa → koko kaupunki (55 laattaa). Ei ennen tilinvaihtoa.

## VALO / K06
- Sauman syy: ulkorengas 3-2:n leipomaton lattia (ei tausta, ei LOD). LAV: ulkorengas-v10 (SHA 3cf8ab80147d) ja tausta-v89b
  (+ PK:n Longzongmen-liitos, ec03c59ef662). tausta-v90 vain jos sauma jää.
- VS:n pari 06 uusinta pari-k06k.zsh valmiina, ei käynnistetty → seuraava VS ajaa tilinvaihdon jälkeen → PT → KK → omistaja.
- PK:n LOD-erä (06fed34e2, 8d0ce1dec): LOD0-palat 06: 1→2, kujat 4→8/6, muisti ennallaan. PT: EI junaan 216.
- PK reitti-216: 24ab63986 (portin jälki ennakossa), 693ac624d (Longzongmen-liitos); d2 = c5-ehdokas v89:llä jonossa.

## Säännöt, jotka opin
- Tarkistustyökalun regex näki vain täydet id:t; lyhyet jäivät → tieto "katosi" tilinvaihdossa. Tarkista aina molemmat muodot.
