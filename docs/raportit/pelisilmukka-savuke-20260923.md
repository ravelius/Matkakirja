# Pelattavan silmukan savuke: ensimmäinen ajo simulaattorissa (23.9.2026)

Ensimmäinen ajo Pelikoodarin `Peli-testit/silmukka-30s.txt`-käsikirjoituksella
simulaattorissa (README-silmukka.md:n mukaan "silmukkaa ei ole vielä ajettu
simulaattorissa"). Työkalu: `tools/mittaus/aja-pelisilmukka-savuke.mjs`
(uusi, toistettava). Proto-master `160f175` (Natiiviseppä: "erä 4 + luennat +
NakymaPeitetty + Natiivi-UI:n tilarivi/kaupunkikortti"), simulaattori
iPhone 18 Pro (1572C658…).

## Tulos: 1/6 tarkistuspistettä OK

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

**Tämä on todennäköisesti odotettu seuraus Natiiviseppän samassa käännöksessä
mainitusta UI-muutoksesta** ("Natiivi-UI:n tilarivi/kaupunkikortti") — EI
välttämättä bugi pelilogiikassa, vaan testikäsikirjoitus on jäänyt jälkeen
uudesta UI-vuosta (kaupunkikortti lienee uusi välivaihe ennen matkavalintaa).
En osaa sanoa varmasti kumpi — raportoin havainnon, en arvaa korjausta.

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

Pelikoodarin/Natiiviseppän päätettäväksi: päivitetäänkö `silmukka-30s.txt`
uuteen kaupunkikortti-välivaiheeseen (lisää esim. `valitse-kortti`-komento
tai vastaava), vai onko kaupunkikortin pitänyt johtaa suoraan dialogiin eikä
tehnyt niin (oikea bugi). Kun käsikirjoitus on ajan tasalla, tämä savuke
ajetaan uudelleen jokaisen VP:n jälkeen kuten sulavuusportti.
