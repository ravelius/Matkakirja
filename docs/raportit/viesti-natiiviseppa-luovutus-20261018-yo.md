# Natiivisepän luovutus 18.10.2026 klo 00.4x (PT: ei uusia töitä → luovutus)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt.
Jono (lopusta alkuun = uusin tila): natiiviseppa-skriptit/juna201/jono-201.txt. Viestit AINA session id:llä osoitekirjasta (PT local_5df52e10-…, JU local_5cb16c00-…).
Edellinen luovutus: viesti-natiiviseppa-luovutus-20261017-yo.md (taustat: kokoruutu-lepo, LampoMittari, opitut).

## TILA: JUNA 201 AUKI – EI LUKITTU, EI BUILD 201:TÄ

- OMISTAJA PYYSI JULKAISUA 00.18 ("julkaise kun nämä valmiit" / "kaikki junaan 201", PT 00.21): juna 201 pysyy auki, kunnes alla odottavat ovat mukana.
  TF-lataus vasta kun ne ovat rungossa. Ei laitetestejä; automaattiset testit normaalisti.
- **Runko natiiviseppa/juna-201 (wt/proto-natiiviseppa-ehdokas) = 21d5712be**, puhdas, peili natiivi-backup peili/proto/natiiviseppa/juna-201 = 21d5712be.
  Testit 21d5712be VIHREÄT: Linssit 2015, Peli 607, Kartta 508, tarkista 0, peili 0.
  Sisältö c83357f52:n päälle (kaikki PT/KK kuittaamia): NUI maakunta-suoraan fef47c0aa (57777f2b6) · PK juoksupeli harmaa 99a83b3d9 (71820d9a4) ·
  NUI lasipohja/astroselite 00228d16d (4e7ea994d) · PK juoksupeli ☰ › Pelit › Keskeneräiset 78cd48f9d (21d5712be; omistaja 00.10: EI Kehittäjä › Kokeet).
- **ODOTTAA (kukin KK:n hyväksymänä, PT ilmoittaa):** NUI kehysnappien häivytys + ⚙-ratas (säädöt vain siitä) · Valoseppä ISS-kohdevalikko ilman ikkunaa +
  pysäytyskuvapohja (siirtyi NUI:lta) · LS Mona Lisan suora kävely + pyramidin kontaktivarjo. Yhdistä yksi kerrallaan: `git merge-tree --write-tree <runko> <sha>`
  (puhdas?) → `git merge --no-ff` viestillä "Juna 201: <rooli> <haara> <sha> (…)" → `zsh juna201/testit201.sh` (ei yhdistämistä testiajon aikana) → SHA PT:lle.
- **Todistekäännös** 21d5712be: KÄÄNNETTY 0fee93fbb 00.26 (L1) → lokit/natiiviseppa-app-201-lukitus-sim (LS:n Mona Lisa -kuvat siitä; ei lukitse201-b:tä).
  Pariisi-simu 00.27–00.31: lokit/todistus-pariisi-201-ipad-20261018-0027 (poikkeukset 0; kipsipalloja ei erotu → PT:lle kerrottu). Lukitusajoa EI ole käynnissä.
- Muutosloki: #4831 MERGED = M 90a41f5d5 (23.50). Uusille muutoksille ei muutoslokilisäystä (PT, merkkiraja) ellei PT toisin sano.
- Lukitusehto R2: media.matkakirja.app/opas/pallokierros-v13/koopenhamina.json 200 (25800 t, tarkistettu 23.52).
- Varapohja natiiviseppa/juna-201-vara caca4a083 (57777f2b6 + astro, ilman juoksupeliä, TESTAAMATON) – vanhentunut, ei käytössä.

## LUKITUS (kun PT sanoo LUKITSE 201)
1. Runko vihreä → build201-viesti.txt: lisää omistajan 00.18 pyyntö 23.21:n rinnalle (sanatarkasti PT:n viestistä) ja testirivi.
2. JU:lle KÄÄNNÖS NYT → `nohup zsh …/juna201/lukitse201-ajo.sh <runko> > proto-3d/lokit/natiiviseppa-lukitse201-ajo.txt 2>&1 &` (ylikirjoittaa todisteappin, ok).
3. KÄÄNNETTY → `cd /Users/Shared/Claude/proto-3d/Matkakirja-proto && zsh …/juna201/lukitse201-b.sh <runko> "<KÄÄNNETTY-rivi>" "ohitettu (omistaja 23.21/00.18 ilman testejä)" "<testirivi>"`
   (master = 94a8a360c tarkistetaan; juna/b29) → BUILD 201 -sha JU:lle (TF iOS) + PT:lle. Mac: JU:n TF NYT → `nohup zsh …/juna201/mac201.sh <runko>`.

## LEVY (PT:n pyyntö)
- Poistettu: wt/natiiviseppa-muutosloki-201, wt/proto-natiiviseppa-metat-201.
- BUILD 201:n jälkeen: wt/proto-natiiviseppa-kokoruutu-201 (yhdistetty), appit lokit/natiiviseppa-app-200-lukitus-sim + natiiviseppa-mac-tf-200 (201 varmistettu ensin).
  wt/proto-natiiviseppa-tyokalut on YHTEINEN – ei poisteta.

## AVOIN (ennallaan edellisestä luovutuksesta)
- LampoMittari A (94a8a360c) | B (BUILD 201) iPad Pro 13:lla JU:n vuorolla, kun omistaja ei käytä laitetta – PT 00.21: ei laitetestejä nyt.
- Unity-beetaseuranta CronCreate "4 9 * * *" (istuntokohtainen → luo uudelleen).
