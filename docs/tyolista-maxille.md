# Työlista Maxille (Fable-tason max-sessio)

Ajetaan 17.8.2026, kun viikkokreditit ovat uusiutuneet. Omistaja
perustaa tälle työlle OMAN session ja nostaa sen ajattelun
max-tasolle; nykyinen Fable-sessio pysyy orkesterinjohtajana
high-tasolla (perustaa session, katselmoi ja mergaa). Max-sessio on
FABLE-ROOLIN sessio: se saa kirjoittaa Raamattuun ja kaanoniin.
Haara: `claude/fable-max-remontti`; raportti viesti-fable.md:llä.

## 1. Pelin moduulirakenne (omistajan tilaus 16.8.2026)

Mieti ja suunnittele peliin SELKEÄ MODUULIRAKENNE — suunnitelma
ensin, toteutus vasta omistajan hyväksynnän jälkeen:

- Mitkä ovat pelin moduulit? (esim. lauta ja kartat · kaupunkilehdet ·
  Matkailijan opas · liput · äänet ja lukija · Viisas Pöllö ·
  tarina/matkakirja · työhuone · jakelu/peili — rajaus on Maxin
  harkittava, ei annettu.)
- Kullekin: vastuu, datapaketit, rajapinnat muihin moduuleihin.
- Koodijakoehdotus: ui.js on paisunut (~14 000 riviä) — miten se
  jaetaan moduulien mukaisiin tiedostoihin turvallisesti ja missä
  järjestyksessä; sama arvio css/styles.css:lle.
- Tulos: suunnitelmadokumentti, joka esitellään omistajalle
  hyväksyttäväksi ennen yhtään koodimuutosta.

## 2. Dokumenttiremontti (Raamatun toteutuslistalta, KIIREELLINEN)

- Tavoite (omistaja 16.8.2026): Raamattu on AINOA linjauslähde;
  sen rinnalla vain roolitus-/malliohjeistus sekä moduulikohtaiset
  ohjeet siisteinä omina md-tiedostoinaan — jaottelu kohdan 1
  moduulirakenteen mukaan.
- Inventoi docs-kansio: mikä on päällekkäistä Raamatun kanssa,
  mikä vanhentunutta (→ docs/arkisto/), mikä moduuliohjetta.
- Pura päällekkäisyydet: linjaukset Raamattuun (yksi paikka),
  tekniset ohjeet moduulitiedostoihin, viittaukset kuntoon.
- Ohjedokumenttien kartta (Raamatun viimeinen osio) ja
  tests/dokumentit.test.mjs ajan tasalle joka vaiheessa.
- Iso urakka: tee vaiheittain, checkpoint-commit per osa-alue.
