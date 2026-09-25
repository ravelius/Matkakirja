# Pelinappula näkyviin liikkeen ajaksi, kerma pois matkalta

**Opus-sessio 16.9.2026 · haara `claude/bold-ride-vow4ki-nappula-liike`**
Raamattu: KARTTAUUDISTUKSEN PAATOKSET 29 (omistaja 16.9.2026 klo 05.20 UTC,
iPhone-kuva Ateenasta).

## Juurisyy — mitattu, ei arvattu

Omistajan havainto: *"kamera taitaa panoroida mutta pelinappula ei nay
liikkeen aikana"*.

Mittaus (Playwright, 390 × 844, liftaus pelitallenteesta Ateenassa, 10
näytettä matkan varrelta) osoitti, että nappula EI ollut kadonnut eikä
väärässä paikassa:

| näyte | `.pallolauta-liikkuva` | laskettu `opacity` | ruutupaikka |
| --- | --- | --- | --- |
| 1–10 | on DOMissa | **0** | 197,677 → 169,806 → 60,751 → 136,658 |

Elementti oli olemassa, sen `transform` päivittyi joka kehys ja
ruutupaikka kulki reittiä pitkin — mutta peittävyys oli nolla
ensimmäisestä kehyksestä viimeiseen.

**Syy on yksi css-valitsin.** `css/styles.css` niputti liikkuvan
nappulan ja lentokoneen samaan sääntöön:

```css
.pallo-kotelo > .pallolauta-liikkuva,
.pallo-kotelo > .pallolauta-kone { … opacity: 0; … }
.pallo-kotelo > .pallolauta-kone.nakyy { opacity: 1; }
```

Luokan `nakyy` lisää `js/pallolauta/siirto.js` vain lennolla
(`if (lento) el.classList.add('nakyy')`), koska se on koneen
häivytys — siis liftauksen, bussin ja laivan nappula jäi pysyvästi
läpinäkyväksi. Mikään vanha vartio ei huomannut tätä, koska
`savuke-liiku.mjs` mittaa transformia eikä peittävyyttä.

## Ratkaisu

1. **Näkyvyys.** `css/styles.css`: liikkuvalle nappulalle oma sääntö
   (`opacity: 1`); koneen häivytys jää koneelle. Mitattu peittävyys
   liikkeen aikana nyt **1** jokaisessa näytteessä, 390 ja 1400 px.
2. **Jokainen matkapiste.** `js/siirtokoreografia.js` sai funktion
   `matkanVaihe(pisteita)`: vanha `autokyydinVaihe` (yksi kiihdytys
   lähdössä, yksi jarrutus perillä) ja sen PÄÄLLE pisteiden aaltoilu.
   Eteneminen `x` vääristetään välin sisällä kaavalla
   `u − (k / 2π)·sin(2πu)`, `k = 1 − MATKAPISTEEN_VAUHTI` (0,4):
   - jokainen matkapiste osuu kohdalleen (`W(i/n) = i/n`), joten
     nappula kulkee pisteiden LÄPI eikä ohi;
   - vauhti notkahtaa pisteessä 40 %:iin ja nousee välissä — jarruttaa
     jokaiseen pisteeseen ja kiihdyttää siitä pois;
   - vääristys tehdään ETENEMISEN eikä ajan suhteen, joten
     **kokonaiskesto on tismalleen entinen** (matka ei hidastu);
   - käyrä on C¹-jatkuva ja aidosti kasvava: ei nykäystä, ei peruutusta,
     ei pystykaarta (pomppua ei ole; pystykorkeus 0,00 px).
   `js/ui.js` antaa käyrän kuljettajalle (`kuljettaja.aja`).
   Kamera ajaa kuten ennen (`aloitaSaattavaKamera`, saapumisasento);
   mitattu: nappula pysyy ruudulla koko matkan, ei yhtään näytettä
   ruudun ulkopuolella.
3. **Kerma pois liikkeen ajaksi — KAIKKIALTA.** Ks. alla.

## Kerman toteutustapa: kaikkialta, ei reitin maittain

Omistaja antoi kaksi vaihtoehtoa. Valittiin **jälkimmäinen (kerma pois
kaikkialta liikkeen ajaksi ja takaisin perillä)**, koska ensimmäinen ei
ole halpa:

Kerma on kahdessa paikassa, ja vain toinen on asiakkaan kädessä:
laattojen kankaisiin POLTETTU peite (`tools/fokuskartta/maailmapiirto.js`
`polttaVariLeikkuri`) kohdemaan renkaiden ulkopuolella, ja pelin oma
maalaus (`js/pallolaatat.js maalaaTasoitus`). Poltettua ei voi pyyhkiä:
ainoa kytkin on jättää värilaatta piirtämättä renkaiden ulkopuolelle —
sama leikkuri, jota maailmanäkymä (PAATOKSET 23) käyttää. Yhden reitin
maan vapauttaminen vaatisi **sen maan omat renkaat leikkuriksi kesken
animaation**, eli maa-aineiston haun ja rengaslaskennan jokaiselle
reitin maalle. Kaikkialta pois on sama yksi, jo olemassa oleva leikkuri.

Toteutus kulkee siis samaa reittiä kuin maailmanäkymä:

- `js/laattapyramidi.js`: uusi lippu `asetaTasoituksenLiike(paalla)`;
  `pyramidinTasoitus()` laskee `kermatta = variMaailma || variLiike` ja
  kirjaa tilan `avain`een (`K` → `L`), jolloin laattakerros mitätöi
  kankaansa itse — kerman kytkentä ei tarvitse omaa purkukoodia.
- **Ilman renkaita ei kytketä.** Jos kohdemaan rengasaineisto on vielä
  haussa, maailmaleikkuri jättäisi koko värilaatan pois ja KOHDEMAAN
  topografia katoaisi matkan ajaksi. Silloin kerma jää — matka ei ole
  hetki, jolla kartta saa muuttua vääräksi kuvaksi.
- `js/pallolauta/lauta.js` `matkanKerma(pois)` kytkee lipun, asettaa
  rungolle luokan `kerma-pois-liikkeessa` (luettava tila vartiolle) ja
  herättää pallon.
- `js/ui.js` `matkanKermattomuus(pois)`: kerma pois HETI koko
  koreografian alussa (ennakkozoomi ehtii koota laatat uudelleen ennen
  kuin nappula lähtee) ja takaisin matkan lopussa, kun nappula on
  perillä ja saapumisajo käynnissä. Myös kuolleen pelin haara palauttaa
  sen, jottei huntu jää pois.

## Mittaukset

Käsikirjoitettu kello (mittaus antaa `requestAnimationFrame`- ja
`performance.now`-ajan, kuljettaja ja käyrä ovat pelin omat), 390 px,
liftaus Ateenasta, neljä matkapistettä, kesto 3 440 ms:

| mitta | tulos |
| --- | --- |
| poikkeama projisoidusta matkapisteestä (4 pistettä) | **0,00 / 0,00 / 0,00 / 0,00 px** (raja 4 px) |
| vauhti pisteessä vs. välin puolivälissä | 2,64 < 7,42 · 3,78 < 12,97 · 2,57 < 12,76 px |
| nappulan pystykorkeus (pomppu) | **0,00 px** |
| peittävyys liikkeen aikana (390 px) | pienin **1** |
| peittävyys liikkeen aikana (1400 px) | pienin **1** |
| nappula ruudun ulkopuolella | 0 näytettä |
| kerma ennen matkaa / liikkeen aikana / perillä | päällä / **pois** / päällä |

Vastakokeet:

| vastakoe | tulos |
| --- | --- |
| A: liikeanimaatio pois (`kyyti: false`, vanha hyppyketju) | nappula HYPPÄÄ, pystykorkeus **28,75 px** |
| B: kerma pois -kytkin pois (`matkanKermattomuus` tyhjäksi) | kerma JÄÄ, 0 kermatonta näytettä |

Ennen korjausta sama näkyvyysmittaus antoi peittävyydeksi **0**
kaikissa näytteissä — vartio erottaa siis aidosti korjatun ja
korjaamattoman.

## Vartiot ja testit

- **Uusi savuke** `tools/savukkeet/savuke-nappula-liike.mjs` (390 ja
  1400 px): näkyvyys, jokaisen matkapisteen osuvuus (≤ 4 px),
  nopeusprofiili, pomppu, kerman kytkeytyminen ja palautuminen sekä
  vastakokeet A ja B. **17/17 vartiota läpi.**
  Savuke ajaa matkapistemittauksen KÄSIKIRJOITETULLA KELLOLLA (mittaus
  antaa `requestAnimationFrame`- ja `performance.now`-ajan): kontin
  ohjelmistopiirto pyörii muutamalla kehyksellä sekunnissa, eikä
  satunnaisista näytteistä osuisi yksikään matkapisteeseen. Kuljettaja
  ja käyrä ovat pelin omat, vain kello on mittauksen.
- **Uusi yksikkötesti** `tests/matkanvaihe.test.mjs` (5 testiä):
  käyrän pisteosumat, notkahduksen syvyys, monotonisuus ja se, ettei
  kokonaiskesto muutu.
- `savuke-liiku.mjs`: **40/43** (odotettu haarukka). Punaiset ovat
  ennestään olemassa eivätkä liity tähän erään: Pulun napin
  päällekkäisyys (sama 2 033 px² kahden ja neljän napin rivillä eli
  vartion oma vertailu sanoo, ettei neljäs nappi pahenna mitään),
  lennon rajaus (205 < 375) ja kolmas, joka on KONTIN KEHYSTAHTI:
  savuke-liiku mittaa nopeusprofiilin rAF-näytteistä ja vaatii ≥ 12,
  mutta ohjelmistopiirto antoi 5 (`liian vähän näytteitä (5)`).
  Väite itse pitää: laskin uudesta käyrästä samat kolmannekset
  (n = 4: 0,712 / 1,574 / 0,713 → keski/alku 2,21 ja keski/loppu
  2,21; n = 6: 2,80 ja 2,79), eli vartion kynnys 1,5 ylittyy
  selvästi — matkan iso kiihdytys ja jarrutus ovat tallella
  pisteaaltoilun alla. Uusi savuke mittaa saman asian
  käsikirjoitetulla kellolla, joka ei ole kehystahdista kiinni.
- `savuke-era12.mjs`: **27/29**. Molemmat punaiset ovat ennestään ja
  koskevat maapaneelia, eivät tätä erää: Kreikan paneeli ei ole 1400
  px:n ruudulla (väite 9) ja rullan/raahauksen läpimeno paneelin
  päältä (väite 10).
- `node --test` kohdennetusti: `matkanvaihe`, `siirtokoreografia`,
  `siirtoajoitus`, `rules`, `dokumentit` → 369/369 läpi;
  `pallolaatat` + `matkalaukun-linssit` → 29/29 läpi.

## Kuva

`docs/raportit/kuvat/nappula-liike-390-20260916.jpg` — liikkeen
puoliväli 390 px:n ruudulla: pelinappula näkyvissä kartalla matkalla.

## Mitä EI tehty

- Ei versionostoa, ei PR:ää, ei Raamatun muokkausta (Fablen kynä).
- Reitin maiden erottelua ei tehty (perustelu yllä); jos omistaja haluaa
  sen myöhemmin, se on oma eränsä: reitin maiden renkaat esiin
  laskettuina, ei kesken animaation.
