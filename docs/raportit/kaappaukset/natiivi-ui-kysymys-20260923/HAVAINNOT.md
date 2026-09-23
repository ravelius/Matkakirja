# Natiivi-UI: kysymysnäkymän kuvasarja, ensimmäinen tarkistus (23.9.2026)

Proto-master `0244858` ("Linssirungon ja kysymysnäkymän .metat, kohtaus"),
simulaattori iPhone 18 Pro, UI-testit/README.md:n "kuvasarja
kysymysnäkymän tarkistukseen (erä 3)" -komennoilla. Ääni mykistetty ajon
ajaksi. 10/10 kuvaa ja täysi loki syntyivät onnistuneesti, ei virheitä
`ui-loki.txt`:ssä.

## Fonttitarkistus: OK

Konsolikaappauksesta (`simctl launch --console`, ei `log show` — Unityn
Debug.Log-rivit eivät näkyneet `log show --predicate process==`-haulla
tällä simulaattorilla, syytä ei selvitetty tarkemmin):

```
MATKAKIRJA ui: Kone = American Typewriter Regular
MATKAKIRJA ui: KoneLihava = American Typewriter Semibold
```

iOS:n järjestelmäfontti löytyi molemmille painoille. Ei
"Paneeli puuttuu" -varoitusta koko 8 s käynnistyskaappauksessa eikä
myöhemmin ui-komentojen aikana.

## Muut löydökset konsolista

Ainoat varoitukset olivat simulaattorin GPU-emuloinnin tekstuurimuoto-
varoituksia (`RGBA Compressed ASTC6X6 ... not supported, decompressing
texture`) — tunnettu simulaattori-only-rajoite, ei odoteta oikealla
laitteella. Ei poikkeuksia (exception), ei kaatumisia.

## Visuaalinen tarkistus (3/10 kuvaa katsottu tarkkaan)

- **kysymys-visa**: näyttää kaupunkikortin (Lontoo, aarrekysymys-esikatselu,
  45 s tiimalasi, "Tutki kaupunkia" -nappi) — EI itse monivalintakysymystä
  vielä. Jos tarkoitus oli näyttää suoraan visa-kysymyksen
  vastausvaihtoehdot, tämä ei täsmää; jos tarkoitus oli näyttää
  esikatselukortti ensin, tämä on oikein. En osaa päätellä kumpi ilman
  lisätietoa — tarkistakaa te.
- **kysymys-tulos**: TÄYSI monivalintanäkymä (A–D, oikea B korostettu
  vihreällä, "Oikein!"-banneri, palkinto +640 £ / +1, lähdeteksti,
  "Jatka matkaa" -nappi) — täydellisen näköinen, ei visuaalisia vikoja.
- **kysymys-pulma (kukko)**: Painter2D-piirros (tuulikukko) renderöityi
  siististi, teksti ja otsikko oikein.

Kaikissa kolmessa katsotussa kuvassa näkyy sama pieni **"Development
Console" -palkki** ruudun alareunassa (punertava alleviivaus). Sama
elementti kaikissa kolmessa, kiinteässä paikassa — näyttää Unityn
Development Build -konsolin vakiopalkilta (piilotettuna/tiivistettynä),
ei ilmeinen bugi, mutta merkitsen sen näkyviin siltä varalta ettei sen
pitäisi näkyä lopullisessa käännöksessä.

## Ei tarkistettu

Loput 7 kuvaa (vaite, kuva, lippu, kuunvaiheet, kaksintaistelu,
tapahtumakortti) — vain lokista todennettu että ne syntyivät oikean
kokoisina ilman virhettä, ei katsottu visuaalisesti yksitellen. Katso
itse tarvittaessa: `docs/raportit/kaappaukset/natiivi-ui-kysymys-20260923/`.
