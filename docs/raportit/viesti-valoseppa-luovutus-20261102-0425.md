# Valosepän luovutus 2.11.2026 klo 04.25

Syy: konteksti 26 % (pehmeä raja). Edellinen: viesti-valoseppa-luovutus-20261102-0150.md (pysyvät työtavat -20261101-2124.md ja
-2220.md, voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (02.11. 04.07–04.2x).
Uudet mittarit `_tyo/linssiseppa2/skriptit-20261031/`: seinamuoto.py (punaisen seinän vaihtelu, aurinko/varjo erikseen),
seinaprofiili.py (seinän pystyprofiili sarakkeittain), taivasmittari.py (taivaan sininen, pilvet, leikkautuneet > 250).
HUOM: aja mittarit `python3` ilman -I:tä (numpy on käyttäjän site-packagesissa).

## ERÄ: työlistan rivi 52 (juna 218) "Juoksupelin seinät, koristeet ja taivas havainnekuvien tasolle"
Worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-seinat218`, haara linssiseppa2/seinat-218 (runko 217 60bd5c356 + alla), pushattu.
Lähtökoonti: lokit/havainne-editori-20261102-040855 (kaikki 8, 60bd5c356).

### PT:LLÄ KUITTAUKSESSA (lähetetty 04.24)
- **9fa1eee3e** (+ 8fdd4ee15): taivas "puhkipalanut" = pilvet leikkautuivat 255:een (67 % pilvipikseleistä, sininen B 255; havainne
  230–245, 0–2 % yli 250). JuoksuTaivas: panoraaman ylävalojen olka suurimmasta kanavasta (`_JuoksuTaivasKuva`, QA `valo savy taivaskuva
  k polvi katto w`), oletus 1/0,45/0,70: pilvet 243–246, 0–1 % yli 250; sininen 139/178/238 (havainne 135/195/253, hieman syvempi).
  Koe lokit/esikatselu-20261102-041830 (t0 pois, t1 = oletus, t2 .5/.75 pilvet 248–252 ja 2–13 % leikkautuu, t3, t4).
  Kuva taivas-koonti.jpg siellä. Kuittauksen jälkeen: pyyntö NS:lle (runko 218), tarkista ancestry.

### SEINIEN "MUOTO" (selvitetty, työ kesken)
- Aurinkoiset punaiset seinät litteät: log-L p5–p95 peli 0,09–0,52 vs havainne 0,52–0,69 (02 .23/.52, 03 .14/.58, 06 .09/.60).
- EI pystyliuku: pelin räystäsliuku tummentaa yläosaa jo enemmän kuin havainne (−0,22…−0,26 vs −0,06…−0,13), ja se koskee muureja
  (muoto1, esikatselu-20261102-041421).
- SYY (lähikuvat, scratchpadin seinat-lahi): havainteessa räystäät, kannattimet ja friisit heittävät auringossa vinon varjon seinälle,
  ja rappauksessa on näkyvä karhea rae. Pelissä räystään alla oleva seinä on täysin valaistu (01, 05) = todennäköisesti myös omistajan
  videon "puuttuvat varjot".
- **varjo1 AJOSSA** (`varjo1-ajo.zsh`, loki varjo1.log, kohdat 01/05: e0 oletus | e1 `valo leivonta 0` | e2 `valo heitto 1` | e3 molemmat).
  Tulkinta: jos e1/e3 näyttää räystään varjon seinällä → leivotulla seinällä elävä varjo ei näy (JuoksuValaistusVarjolla / leivottu
  korvaa), tai leivonnasta puuttuu räystäiden varjo (Lavastajan leivonta). Jos ei näy missään → räystäät eivät heitä elävää varjoa
  (JuoksuV4Maailma.Valo.cs heittäjät, koko/etäisyys). Korjaus = varjon puuttumisen korjaus, ei valon yleislinjan muutos, mutta
  kuittaus PT:ltä ennen NS:ää.
- Rappausrae: k21 RappausKorkeus 4 mm (JuoksuLattia) – havainteessa rae selvästi näkyvämpi; toinen vaihe varjon jälkeen.
- Vihreä boordi / syvennykset / ikkunat = malli (Lavastaja/Codex), ei VS.

## LISÄTEHTÄVÄ (PT 04.2x, rivin 52 jälkeen, juna 218)
Leivontakynnys l < 0,04 → täysi taivastäyttö tulkitsee tummat leivotut tekselit (0,01–0,04, esim. marmorikaide p05 0,024) puuttuviksi
ja sinistää syvät varjot. LAV korjasi porttikäytävät mallikohtaisella alarajalla (lisäys 225 dfd0040be, kuva
bugit-217/vika14/holvi-alaraja-ennen-jalkeen.jpg). Tee yleinen korjaus: puuttuva näyte erilleen tummasta (oma merkintä/alfa), sitten LAV:n
alaraja voidaan poistaa. Rivi PT:lle.

## Worktreet (proto-3d)
- wt/proto-linssiseppa2-seinat218: linssiseppa2/seinat-218 (tämä erä).
- wt/proto-linssiseppa2-vahti216 (kamera06-217, rungossa) ja wt/proto-linssiseppa2-varjo216 → poistettavissa. wt/proto-linssiseppa2-k17 jää.

## LISÄYS 04.3x (PT)
- 9fa1eee3e (taivas) KUITATTU → NS:lle junaan 218; seuraaja tarkistaa ancestryn NS:n vastauksesta.
