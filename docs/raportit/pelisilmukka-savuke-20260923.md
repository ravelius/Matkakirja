# Pelattavan silmukan savuke: ensimmäinen ajo simulaattorissa (23.9.2026)

Ensimmäinen ajo Pelikoodarin `Peli-testit/silmukka-30s.txt`-käsikirjoituksella
simulaattorissa (README-silmukka.md:n mukaan "silmukkaa ei ole vielä ajettu
simulaattorissa"). Työkalu: `tools/mittaus/aja-pelisilmukka-savuke.mjs`
(uusi, toistettava). Proto-master `160f175` (Natiiviseppä: "erä 4 + luennat +
NakymaPeitetty + Natiivi-UI:n tilarivi/kaupunkikortti"), simulaattori
iPhone 18 Pro (1572C658…).

## Ensimmäinen ajo (viralliset silmukka-30s.txt): 1/6 tarkistuspistettä OK

Silmukka KÄYNNISTYY ja tallentaa tilat oikein (uusi-peli, tila-tarkistus
toimivat) — `1-alku` täsmää odotettuun täydellisesti. Kaikki tästä eteenpäin
epäonnistuu SAMASTA syystä:

```
44.14 napauta lontoo → ok [Kartta]
47.14 odota-tila → AIKARAJA: odotettiin Dialogi, tila Kartta [Kartta]
48.66 valitse bussi → VIRHE matkavalinta ei ole auki [Kartta]
```

`napauta lontoo` suoritetaan ilman virhettä, mutta silmukan tila EI siirry
`Kartta`→`Dialogi`:hin kuten README-silmukka.md:n taulukko odottaa. Sen sijaan
`tila`-tarkistuksen `kortti`-kenttä muuttuu `null` → `"lontoo"` heti napautuksen
jälkeen — matkavalinnan sijaan avautuu jokin UUSI välitila
("kaupunkikortti"?), jota `silmukka-30s.txt` ei vielä osaa käsitellä
(`odota-tila dialogi` ei koskaan täyty, `valitse bussi` epäonnistuu koska
oikea dialogi ei ole auki).

**Vahvistettu (Pelikoodari + Fable 23.9.): ei bugi.** Kaupunkikortti on
tarkoituksellinen välivaihe, ja vika oli testikäsikirjoituksessa. Pelikoodari
lisäsi uuden `liiku kaupunki` -testikomennon ja päivitti `silmukka-30s.txt`:n
(kortista jatketaan `liiku`-rivillä matkavalintaan) — muutos on haarassa
`pelikoodari/kysymys-ui`, merge Natiiviseppältä kesken. Yksi odotusarvo
muuttui samalla: `1-alku` on nyt vaiheessa **Toiminta** (ei Heitto), koska
erä 4:n tutkiminen purkaa liftauksen esivalinnan — ei vaikuta tähän
tarkistuslistaan (vaihetta ei tarkisteta).

## Väliajo ennen mergeä: 5/5 sovellettavaa tarkistuspistettä OK

Pelikoodarin ohjeistamana ohitin kaupunkikortin `matka kaupunki tapa`
-komennolla (toimii jo nyt, sama proto-master 160f175) validoidakseni
ydinlogiikan ennen `liiku`-mergeä. Väliaikainen käsikirjoitus:
`tools/mittaus/silmukka-30s-ohitus.txt`, ajuri:
`tools/mittaus/aja-pelisilmukka-ohitus-savuke.mjs`. `2-dialogi`-tarkistuspiste
jätetty pois (ei sovellu ohitukseen — kortti/dialogi-UI:ta ei testata tällä).

```
216.81 matka lontoo bussi → ok [Matkalla]
218.42 odota-tila → ok Lehti [Lehti]      (Lontooseen saavuttu, lehti auki)
222.44 sulje-lehti → ok [Kartta]
223.44 matka pariisi liftaus → ok [Matkalla]
225.06 odota-tila → ok Lehti [Lehti]      (Pariisiin saavuttu, lehti auki)
228.07 sulje-lehti → ok [Kartta]
```

**Kaikki 5 tarkistuspistettä täsmäsivät odotettuun** (sijainti, raha 300→250,
päivä 1, aika aamu→keskipäivä) — matka-, lehti- ja tallennuslogiikka toimivat
oikein. Ainoa löydös koko kierroksesta oli kaupunkikortin puuttuva
testikomento, joka on jo korjattu (mergeä odottamassa). Ei kaatumisia
kummallakaan ajolla.

**Lopullinen 6/6-ajo virallisella (liiku-komennollisella) `silmukka-30s.txt`:llä
tehdään heti kun `pelikoodari/kysymys-ui` on mergetty masteriin** — ilmoitan
sen jälkeen erikseen.

## Muut havainnot

- Kaikki `peli-tila-*.json`-tiedostot syntyivät oikein, `raha`/`päivä`/`aika`
  pysyivät alkuarvoissa (300/1/aamu) koko ajon — matka ei koskaan
  käynnistynyt, joten mikään ei kuluttanut rahaa/aikaa. Looginen seuraus
  yllä olevasta, ei erillinen vika.
- `sulje-lehti → VIRHE lehti ei ole auki` — sama syyketju (lehti ei koskaan
  avautunut, koska matka ei käynnistynyt).
- Ei kaatumisia, ei poikkeuksia — sovellus pysyi vakaana koko 40 s ajon.
- Ääni mykistettiin ajon ajaksi ja palautettiin (uusi työkalu tekee tämän
  automaattisesti).

## Toistettavuus

`node tools/mittaus/aja-pelisilmukka-savuke.mjs` — kopioi
`Peli-testit/silmukka-30s.txt`:n simulaattorin `Documents/peli-komento.txt`:ksi,
odottaa 40 s, tarkistaa jokaisen `peli-tila-*.json`:n README-silmukka.md:n
taulukkoa vasten, mykistää äänen ajaksi. Vaatii boot-tun simulaattorin jossa
`app.matkakirja.proto3d` on asennettuna.

## Seuraava askel

1. Odota `pelikoodari/kysymys-ui` (liiku-komento) merge masteriin.
2. Aja `tools/mittaus/aja-pelisilmukka-savuke.mjs` (virallinen
   `silmukka-30s.txt`, päivitetty) uudelleen — tavoite 6/6.
3. Poista väliaikainen ohitussavuke kun virallinen kattaa saman.
4. Ajetaan jatkossa jokaisen VP:n jälkeen kuten sulavuusportti.
