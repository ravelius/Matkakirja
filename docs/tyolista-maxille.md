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

## 3. Viestintäprotokolla (todettu 17.8.2026, reittitesti PR #1207)

PR-kommentti EI herätä sessiota, kun kommentti tulee samalta
GitHub-tilitä (ravelius) — tilaus suodattaa omat tapahtumat.
Todettu protokolla: SISÄLTÖ AINA GITIIN (Fable → Max: kommentti
avoimeen kanava-PR:ään tai viesti-max-tiedosto; Max → Fable:
viesti-fable.md + push), ja HERÄTYS omistajan yhden rivin
tönäisyllä — tönäisyn ei tarvitse referoida sisältöä, Max lukee
aktivoituessaan aina kanava-PR:n kommentit ja tuoreen mainin.

## 4. Tuotantosuunnitelma: jäljellä olevat kaupungit ja maat (omistajan tilaus 17.8.2026)

Kun nykyinen remonttiurakka (M-vaiheet + D-vaiheet) on valmis,
mieti YHDESSÄ FABLEN KANSSA suunnitelma siitä, miten jäljellä
olevat kaupungit ja maat saadaan tehtyä mahdollisimman NOPEASTI
mutta myös TALOUDELLISESTI järkevästi. Kaikki työtavat saa
kyseenalaistaa. Huomioi ainakin:

- PARVILUPA (omistaja 17.8.2026): Fable saa käyttää
  agenttiparvia (Workflow-orkestrointia) kaupunki- ja
  maalehtityössä. Suunnitelman pitää kertoa, MITEN parvea
  käytetään fiksusti — sijaisen mitattu oppi: tekstityö ja
  faktahaku rinnakkain toimii, mutta Commons-kuvahaku EI
  rinnakkaistu (IP-kohtainen rajoitus, 2 ytimen katto) vaan
  kuuluu yhteen tahdistettuun jonoon.
- Työvoimamalli: Fablen sisäiset agentit (ei herätysongelmaa,
  raportti tulee automaattisesti) vs. erilliset sessiot vs. Fable
  itse — ja mikä työ kuuluu millekin.
- Toimivat tekniikat, jotka monistetaan kaavaksi: erälisenssi-
  tarkistus (50 nimeä/kutsu), kontaktiarkkikatselu, kategoriahaku
  hakusanojen sijaan (välttämätön ei-latinalaisissa maissa),
  Actions-ajurit avaimellisiin töihin (generointi, kuvanouto),
  hybridimalli miniatyyreissä (v812).
- Sisältökaavat: mikä on kaupungin/maan minimikokoonpano — HUOM
  omistajan sitova päätös 17.8.: VAIN kaupunkilehti ja maalehti,
  EI tarinakaarta (Raamattu, Kaupungit) — ja missä järjestyksessä
  erät kannattaa ajaa; monistusvaroitukset (hyvaTietaa-muoto ym.).
- Talous: mittaa kustannus per kaupunki nykytavalla (API-kulut +
  token-kulut) ja esitä mihin kannattaa panostaa ja mistä karsia.
- Laatuportit, jotka EIVÄT jousta: lisenssit API:sta, kuvat
  silmin, faktat lähteistä, yksi generointiotto.
- Tulos: suunnitelmadokumentti omistajan hyväksyttäväksi ennen
  toimeenpanoa.
