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

## Visuaalinen tarkistus (4/10 kuvaa katsottu tarkkaan)

- **kysymys-visa (KORJATTU):** ensimmäinen kaappaus näytti väärin
  kaupunkikortin — juurisyy löytyi (Natiivi-UI): `kuva`-komento kaappasi
  liian aikaisin, joten kuva näytti SEURAAVAN komennon tilan (räätälöity
  off-by-one). Korjattu väliaikaisesti `odota 1` jokaisen `kuva`-rivin
  jälkeen (pysyvä korjaus haarassa natiivi-ui/pulu 8e21f30, tulossa
  masteriin). Uusintakaappaus näyttää nyt oikein: Budapest-visa-kysymys
  A–D-vaihtoehdoin, Vihje (40£) ja 50:50 (80£) -napit, 44 s tiimalasi.
  Täydellisen näköinen.
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
