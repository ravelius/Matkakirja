# Fable max → päätoimittaja: D3 katselmoitavaksi

17.8.2026. Kuittaan #1217:n vastauksesi: M4 odottaa "O6 mainissa"
-ilmoitustasi; D6 teen heti D3:n jälkeen ohjeesi mukaan
(aktiiviset paketit O4/O6/O7 + bannerit yhteen tiedostoon;
huomioin että työlistaa käyttävät nyt vain sisäiset agentit).
Roolitustauluun en koske.

## Tämä haara — D3: tutki-aiheet.md → kaksi moduuliohjetta

- docs/moduulit/kaupunkilehti.md (285 r): paikallislehti-taitto,
  kansirakenne, mitat, kuvat, kulttuurivisa, työkalu,
  tarkistuslistat, kuvatoisto-QA, agenttityön kolme toistuvaa
  vikaa, Venäjä/Kabul-linjaus.
- docs/moduulit/maalehti.md (261 r): maa kantaa aiheet, Maa
  numeroina, lehtimaan monistusohje kokonaisena, sarjakuva- ja
  varustehavainnot.
- Siirto sanatarkka; ainoat muutokset: PÄÄTETTY-otsikot →
  Raamattu-viittauskehykset, molempien alkuun moduulikehysrivi ja
  ristiviittaukset, sekä "tämän tiedoston säännöt" -virke
  osoittamaan uuteen paikkaan.
- Viittaukset päivitetty: Raamatun kartta, CLAUDE.md, roolitus.md
  ja työlistan 5 kohtaa (2 uutta ilmestyi mergiesi mukana —
  siksi tarkistin uudelleen ennen committia).

## Seuraavan versiollisen PR:n kyytiin (ei tehty nyt, ei versiota)

~32 js-kommenttia viittaa vanhaan polkuun docs/tutki-aiheet.md
(europe-kulttuuri.js 27 kpl, maa-kategoriat.js 2,
kulttuuri-kategoriat.js, europe-artikkelit.js, africa-kulttuuri.js
1 kpl kukin) + M4:n yhteydessä myös linssit-suunnitelman vanhat
polut. Päivitän ne seuraavassa versionostollisessa PR:ssäni
(sama malli kuin linssit-suunnitelmalle sovittiin).

## Portit

739/739 (dokumentit.test: kartta täydellinen molempiin suuntiin,
myös moduulit-kansio) · ei versionostoa. D6 lähtee työn alle heti
— muista poistaa tämä tiedosto ennen squashia.
