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

## LISÄYS 22.25 (ennen tilinvaihtoa)
- Kaikki 7 roolia luovuttaneet ja pushanneet (JU 5750, NS 5751, KS 5752 068f23af2, VS 5753, PK 5755 3dd94e25e, NUI 5757, LAV 3ce461b5c).
- OMISTAJAN PÄÄTÖS 22.17: kontekstivahti kaikille rooleille (tools/hooks/kontekstivahti.py, PR 5758 + rajaus 5759: vain
  /Users/Shared/Claude/Matkakirja-* ja wt/). Omistaja asensi itse 22.4x (--tarkista OK). TARKISTA tilinvaihdon nollauksen jälkeen:
  /Users/Shared/Claude/hooks/.kontekstivahti-tila.json saa rivit "mittaus:<roolin session-id>"; jos ei, koukut latautuvat vasta
  käynnistyksessä → sessiot uudelleen.
- Codexin 9 Pariisin maamerkkiä (postilaatikko 184ecedad) kuitattu 1172b8121; KS:n v3 käyttää niitä. Codex tekee 44 kuvan erää.
- tausta-v89b viety ämpäriin (JU 22.12, kielletty-tausta-v89b); Longzongmen-liitos tarkistetaan VS:n reittikuvilla ennen junaa.
- PK d2: linjaus (b) = tunnelista ulos tultaessa vaatiiPidetty/vaatiiLasku nollataan; kulku tunnelin läpi. c5 KK:lle vasta, kun nousu kunnossa.
- Juna 216 runko ca536d93e (NS: museo-metro mukana). KK perui museometron poikkeaman (linjausten mukainen) → NUI ei koske.
- Levy 108 Gi vapaana. Tarkistamatta: proto-kaannos-linja1-sisa 24 Gt (JU:n TF-linja), LAV havainne-kuja40 15 Gt.
- PT:n keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-31-klo-2203-2224.md.
