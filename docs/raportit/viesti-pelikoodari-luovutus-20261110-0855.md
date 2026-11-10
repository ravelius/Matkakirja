# Pelikoodari: luovutus 10.11.2026 klo 08.55

Korvaa kaikki aiemmat. Edellinen: `git show c58434a19:docs/raportit/viesti-pelikoodari-luovutus-20261110-0615.md` (hoidettu).
Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu (remote natiivi-backup), NYT haaralla pelikoodari/liiku-napautus-224.
Kuvat ≤ 1000 px. Viestit send_messagella session-id:llä. Python ilman -I:tä (paitsi tyolista.py).
TYÖLISTA ON JONO (omistaja 07.40): T=/Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py;
`python3 -I $T seuraava PK` | `tehty "OTSIKKO" "mitä, sha, kuvat"` (seuraava nousee → aloita heti) | `este "OTSIKKO" "syy"`.

## TEHTY TÄLLÄ VUOROLLA
- Lontoon nimiäänet: testi 8 nimeä → omistaja 06.36 "Kelpaa, koko otto" → 99 nimeä 1 otto (492 kr), peliin 944047ea2 (KohdeNimiaanet
  kaupunkikohtaiseksi: pariisi + lontoo 20 km), media lontoo-nimet-v1 VIETY (JU 06.58), junassa 224 (6fc74dc14). Mac-ajo: Pariisi soi,
  Lontoo ladattu, Leicester väistyi soivan Trafalgarin luennon tieltä (oikein). Työ: proto-3d/_tyo/pelikoodari/lontoo-nimet-20261110/.
- Peukalotikku: kaikki osat junassa 224, Mac-pari 7227a9788 | 6fc74dc14 + sivuliike → PT kuittasi valmiiksi (sivuliike 4,7 km:ssä
  ~7 km / 3 s, ennallaan kunnes omistajan palaute). Pariisin nimirivit (130 nimeä + 26 alkua) merkitty valmiiksi.
- LEVY: 7 worktreetä NAS:lle Matkakirja-arkisto/pelikoodari/worktreet-20261110 + worktree remove (erot vain NAS:n ._-tiedostot), 42 Gi vapaana.
- iPhone-latausajo (juoksu ennen 77b1641de / jälkeen linkki): JU:n jonossa, omistaja 06.34 "Ei nyt" iPhonen kytkentään.
  sk + laiteosa: _tyo/pelikoodari/juoksu-leivottu/sk-iphone-lataus-224.txt, aja-iphone-lataus.zsh. Kun tulos: taulukko iPad | iPhone PT:lle
  (iPad: kylmä 38,0 s, lämmin 15,0 s, huippu 3818 Mt, TULOS-yhd-1.md).

## TYÖN ALLA: Pariisi: Liiku loitontaa Ranskan tasolle (jonon NYT-työ)
- Syy löydetty: Liiku-nappi TOIMII; vika oli QA-komennossa: Unityn panel.Pick antoi samalle pisteelle (690,980) vanhan tuloksen.
  Koe 2 (lokit/pk-liiku-napautus-koe2-ipad-28bcfd438): 7 s perumisesta viereinen piste 689,979 osui ja loitonsi Ranskaan (kuvat katsottu).
- Korjaus 0beb2c539 (natiivi-backup pelikoodari/liiku-napautus-224 = 6fc74dc14 + diagnoosirivi 28bcfd438 + viereinen Pick ennen poimintaa
  UiKomennot.Napauta/Koske), unity 0, peli 893/893. JU AJAA todistusta: lokit/pk-liiku-napautus-korjaus-ipad-0beb2c539
  (sk _tyo/pelikoodari/liiku-224/sk-liiku-napautus-224.txt). Odotus: kolmas napautus (690,980) 7 s perumisesta → "kerros 20 … mk-liiku__nappi"
  + "ui liiku: loitonnus pariisi" + kuva l3 Ranskan taso. → pari (l2-peru | l3) PT:lle → `tehty` → junaan 224 PT:n kuittauksella.

## JONO
1. TAUSTA v130 (omistaja 08.52 Kelpaa uusi lattia; PT 08.5x): kulkutarkistus tehty (vain 22 glb muuttui, kulku = palatsi-esto-v40, OK → PT).
   Kun JU on vienyt _valmiit/juoksupeli-kk-lavastaja-tausta-v130-vienti-20261110: JuoksuSokkeloMaailma.Palatsi.cs TaustaKansio
   "kielletty-tausta-v129/" → v130 (+ kommentti), oma haara junan 224 päälle, testit; sitten juoksu-leivonta.py lista (juoksu-leivonta-lista.txt)
   → paketti → JU vienti; iPad-ajo ennen junaa. ÄLÄ muokkaa lattian geometriaa/valoa.
2. Työlistan seuraavat: Peukalorenkaat, Sauvan sivuliike kiertää keskikohdetta (`python3 -I $T seuraava PK`).
3. iPhone-latausajon tulos (yllä), kun JU ilmoittaa.

Testit työpuussa: `cd Linssit-testit && sh unity-tarkistus.sh`, `sh kaanna.sh` Kartta-/Linssit-/Peli-testit (sh, ei zsh).
