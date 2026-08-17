# Viesti Fablelle: M5a valmis (v818)

Fable Max raportoi. Lehden sivukoneisto on nyt oma moduulinsa.

## Mitä tehtiin

- **js/lehti.js (uusi, 1 185 riviä):** ui.js:n rivit 8907–10061 siirrettiin
  mallin B mukaan (funktiot saavat `ui`-parametrin). 21 vietyä funktiota,
  mm. rakennaSivut, naytaTutkiSivu, avaaMaalehti, renderArticle,
  renderMaastoArtikkeli, varustaLukija, openWiki.
- **js/ui-apurit.js (+61 riviä):** kehittäjätila (kehittajaTilaPaalla,
  asetaKehittajaTila) ja wiki-välimuistit (cachedSummary, cachedImage)
  muuttivat tänne, koska sekä ui.js, lehti.js että main.js tarvitsevat ne
  — muuten olisi syntynyt tuontikehä.
- **js/ui.js:** 15 462 → 14 260 riviä (yhteensä 19 167 → 14 260,
  −25,6 % remontin alusta).
- sw.js SHELL, build-standalonen MODULES-lista ja kaksi testipolkua
  (maa-otsikot, rules) päivitetty samassa paketissa.

## Ratkaisut, jotka kaipaavat katselmointisilmää

1. **Seitsemän ohutta delegaattoria** jäi UI-luokkaan (naytaTutkiSivu,
   avaaMaalehti, avaaSisallysvalikko, sijoitaLehtiKaiutin, varustaLukija,
   avaaRaamattuLehti, avaaTilanneLehti). Syy: pollo.js, lukija.js,
   nahtavyydet.js ja main.js kutsuvat näitä ui-olion kautta, ja suora
   tuonti lehti.js:stä olisi tehnyt kehän. Delegaattorit ovat yhden rivin
   välityksiä.
2. **Puhdas siirto, ei tilamuutosta:** lehtitilan kentät (ui.arrival*,
   ui.tutki*, ui.maanSivut) jäivät UI-olioon suunnitelman salliman
   välivaiheen mukaisesti. Suunnitelman luvussa mainittu lehtitila-olion
   kokoaminen on erillinen, valinnainen jatkoaskel — päätettäväksi
   omistajan kanssa M-sarjan jälkeen.

## Portit

- `node --test tests/*.test.mjs`: **# pass 739 / # fail 0**
- tarkista-kaksoisavaimet: ei kaksoisavaimia
- tarkista-niputus: 107 moduulia, ei törmäyksiä
- build-standalone: OK (9 646 kt)
- savuke-dist: 5/6 — ainoa FAIL on tunnettu pöllön hereillä-tila,
  joka on jo jonossasi (ei liity tähän muutokseen)

## Seuraavaksi

M5b odottaa: kuvataitto, sää, uutiset ja maalehden etusivukoneisto
(piirraLehtiKuvat, naytaLehtiSaa, naytaMaaUutiset, piirraMaaEtusivu ym.)
ovat yhä ui.js:ssä. Aloitan kun tämä on mainissa.

Muista poistaa viesti-fable.md ennen squashia.
