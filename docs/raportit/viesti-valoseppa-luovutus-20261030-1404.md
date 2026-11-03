# Valosepän luovutus 30.10.2026 klo 14.04

Worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`, haara **linssiseppa2/loiva-216**, kärki **84d490f44**. Haara on tehty
rungon aea0353cd (juna 216, Unity b7) päälle. Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`.

## Tehty: k24 loivat seinät (PT 13.3x)
Tehtävä: Meridiaaniportin sivukäytävien sisäseinissä kivijalka ja rappaus näkyivät pystyraitoina. Tavoite oli omistajan
rajauksen `portti06-sivuaukko-havainne.png` mukaan: tasainen punainen rappaus ja harmaassa kivijalassa vaakasuorat kerrokset.

Juurisyy (kokeet `esikatselu-20261030-133114`):
- Geometria on kunnossa: käytävän seinä on yksi tasainen nelikulmio noin 25 m matkalla ja sillä on yksi normaali.
  Mallissa olevat päällekkäiset kolmiot ovat etelän julkisivussa, eivät käytävissä.
- Rappauksen raidat tulevat varjostimen pystysuuntaisista kohinajuovista. Pintakuvien kanssa ne ovat RappausVaihtelun
  valumia (vaakajakso 0,6 m), ilman pintakuvia JuoksuSeinaSavyn kulumaa (0,43 m). Raidat näkyivät myös kokeessa
  `valo pinnat 0`. Kun seinää katsotaan loivassa kulmassa, juovat puristuvat kapeiksi raidoiksi.
- Kivijalan raidat ovat säännöllisiä, jakso noin 8 px, ja ne seuraavat perspektiiviä. Lähde on sokkeli-v03-kuvan toistojakso
  (kaksi kiveä kerroksessa), pystysaumojen normaalit ja kivikohtainen sävy. Mip-siirtymä `valo kuvabias 3` ei muuttanut niitä.

Korjaus: kytkin `_JuoksuK24` / `Valopohja.JuoksuK24`, oletuksena päällä, QA `valo k24 0|1` (vaikuttaa heti). Mitta on
pikselin vaakaulottuma seinällä jaettuna pystyulottumalla: edestä 1, käytävän sivuseinä noin 3. Häivytys tapahtuu
välillä 1,6–2,6.
- **JuoksuLattia (rappaus):** `RappausVaihtelu(r, t, ft)` häivyttää laikut ja valumat.
- **JuoksuMaailma (kivijalka _KujaKivi 2 ja jalusta 4):**
  - Pohjaväri lasketaan kerroksen keskiarvona, neljällä GRAD-näytteellä u-akselin suuntaan (u = 0, ¼, ½, ¾).
  - Normaalikartan vaakakallistus (tn.x) poistetaan.
  - Kivisävy annetaan kerroksittain (id.y), ja sen häivytys (hiv) mitoitetaan pystysuunnan pikselikoon mukaan.

Pari 06 (rungon aea0353cd päällä, keisari 0,12/0,11): `/Users/Shared/Claude/proto-3d/lokit/havainne-editori-20261030-140135/06`.
Sivuaukon ennen/jälkeen-kuva: `06/sivuaukko-ennen-jalkeen.png` (ennen = PT:n pari 130227). Rappaus on tasainen, kivijalassa
kivet ja kerrokset näkyvät eikä pystyraitoja ole. A/B-kuvat k24 0/1: `esikatselu-20261030-133623` (`k24-pois`/`k24-paalla`, lähikuvat `k24-lahella*`).

## Kesken / seuraavaksi
1. PT:n kuittaus parista 06, sitten 84d490f44 NS:lle junaan 216. Testiajo (Metal ja testit) on ajamatta.
2. JuoksuSeinaSavy (k1-reitti ilman pintakuvia) piirtää yhä raitoja loivassa kulmassa. Pelissä pintakuvat ovat päällä,
   joten tätä ei korjattu. Korjaus vaatisi fwidth-arvon parametrina.
3. Hylätty haara linssiseppa2/kaytava-215 (81169914c): käytävähämärä peruttu omistajan linjauksella 09.06, ei junaan.

## Opit
- editori-sovitettu.sh:ssä (pk6) ei ole kohdan 06 testikameraa. PT:n kehys (keisari 0,12) saadaan lisäämällä
  `06 "2.5 6.2 3 51"`; kopio on scratchpadissa `editori-06tk.sh`.
- Raitojen syy löytyy nopeimmin rivikeskiarvoprofiilista: jos jakso kasvaa kohti kameraa, raidat ovat maailmaan kiinnittyneitä.
  Tämän jälkeen käydään läpi `valo pinnat 0` ja `kuvabias`.
