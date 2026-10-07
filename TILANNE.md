# TILANNE: kaupunkiesittelyjen toimituksellinen tarkistus

Haara `fable-esittely-tarkistus` (pohjana `pelikoodari-esittely-pilvi`).
Pysäytetty 7.10.2026 Päätoimittajan käskystä (omistajan päätös, 5 tunnin raja). Jatkettu 7.10.2026 uudessa pilvisessiossa.

## JATKOSESSION TILA (päivitetään jokaisen aallon jälkeen)

Toimeksianto on nyt repossa: `esittely-tyo/OHJE-toimituksellinen-tarkistus.md`.
Verkko todettu auki tässäkin sessiossa (WebFetch toimii).

Työ ajetaan neljässä aallossa, kussakin neljä opus-ali-agenttia, kaksi kaupunkia per agentti.
Aallon jälkeen fragmenttiraportit yhdistetään `esittely-tyo/TARKISTUS-PAATOIMITTAJA.md`:hin
ja aalto committataan + pushataan.

| Aalto | Kaupungit | Tila |
|---|---|---|
| 1 | amsterdam, ateena (VALMIS) / barcelona, bergen (VALMIS) / berliini, bryssel (VALMIS) / budapest, bukarest (VALMIS) | VALMIS |
| 2 | dublin, edinburgh (VALMIS) / firenze, granada (käynnissä) / helsinki, islanti (käynnissä) / kosice, krakova (käynnissä) | käynnissä |
| 3 | kreeta, lissabon (käynnissä) / ljubljana, luxemburg / madrid, marseille / oslo, sevilla | osin käynnissä |
| 4 | sisilia, sofia / tampere, tukholma / valletta, venetsia / vilna | ei aloitettu |
| 5 | TARKISTAJA-agentti käy koko diffin läpi | ei aloitettu |

Agentit ajetaan liukuvasti: kun pari valmistuu, se committataan heti ja seuraava pari käynnistyy (max 4 rinnakkain).
Valmis kaupunki = muutokset committattu JA fragmentti liitetty TARKISTUS-PAATOIMITTAJA.md:hin.
Katkon jälkeen: "käynnissä"-merkityt parit aloitetaan alusta (tiedostot `git checkout` -palautetaan ensin).

## Mitä on tehty

- **Haara luotu ja pushattu:** `fable-esittely-tarkistus` lähtee commitista `9710c46` (pilvityön loppu).
- **Lähtötilanne varmistettu koneellisesti:** `tools/opas/tarkista-esittely.mjs` ajettiin kaikille 31
  tarkistettavalle kaupungille — **0 virhettä kaikissa**. Huomiomäärät vaihtelevat 1–24 (hyväksyttyjä tyyppejä:
  "ei ala paikan nimellä" suomenkielisen etusanan takia, "avaus puuttuu" koska avaus on erillisessä .md:ssä).
- **Verkko todettiin auki:** WebFetch ja WebSearch TOIMIVAT tässä ympäristössä. Tämä on olennainen ero
  pilvisessioon, jossa WebFetch oli estetty ja faktat tarkistettiin pelkistä hakuotteista
  (ks. PILVI-RAPORTTI.md, "Poikkeamat"). Jatkossa jokainen fakta voidaan ja pitää tarkistaa avaamalla lähde.
- **Löydöstyyppi 4 (avauksen kierroslause) tarkistettu koneellisesti KAIKILLE 31 kaupungille:**
  jokaisen `avaukset/<id>.md`-tiedoston lause "Kierros alkaa X:stä" vastaa pohjan `kierros`-listan ensimmäistä
  kohdetta. **Ei yhtään poikkeamaa.** Tämä löydöstyyppi on siis kokonaan kunnossa, eikä sitä tarvitse enää etsiä.
- **Raportin runko kirjoitettu:** `esittely-tyo/TARKISTUS-PAATOIMITTAJA.md` (committattu, pushattu). Sisältää
  tarkistuksen laajuuden ja seitsemän löydöstyypin kuvauksen. Muutoskirjaukset lisätään merkin
  `<!-- MUUTOKSET-ALKAA -->` jälkeen kaupungeittain.
- **Ali-agenttien toimeksianto kirjoitettu** (seitsemän löydöstyyppiä, sitovat säännöt, kiellot, raporttimuoto).
  Toimeksianto oli session omassa scratchpadissa, joka katoaa kontin mukana — **se on kirjoitettava uudelleen**,
  tai parempi: tallennettava tällä kertaa repoon (esim. `esittely-tyo/OHJE-toimituksellinen-tarkistus.md`),
  jotta jatkosessio ei aloita tyhjästä.

## Mitä on jäljellä

**Varsinaista tarkistustyötä ei ole vielä tehty yhdellekään kaupungille.** Neljä ali-agenttia (opus) oli
käynnissä 16 kaupungilla, mutta ne olivat kaikki vielä luku- ja faktantarkistusvaiheessa, kun pysäytys tuli.
**Yhtään `korjattu/*.json`- tai `avaukset/*.md`-tiedostoa ei muutettu** — työpuu on puhdas, eikä keskeneräisiä
tiedostoja ole. Mitään ei siis tarvitse perua eikä siivota.

Jäljellä: löydöstyypit 1, 2, 3, 5, 6 ja 7 kaikille 31 kaupungille:

| Erä | Kaupungit | Tila |
|---|---|---|
| A | amsterdam, ateena, barcelona, bergen | ei aloitettu |
| B | berliini, bryssel, budapest, bukarest | ei aloitettu |
| C | dublin, edinburgh, firenze, granada | ei aloitettu |
| D | helsinki, islanti, kosice, krakova | ei aloitettu |
| E | kreeta, lissabon, ljubljana, luxemburg | ei aloitettu |
| F | madrid, marseille, oslo, sevilla | ei aloitettu |
| G | sisilia, sofia, tampere, tukholma | ei aloitettu |
| H | valletta, venetsia, vilna | ei aloitettu |

Lisäksi jäljellä: erillinen TARKISTAJA-agentti käy muutokset läpi, muutosten kirjaus
`TARKISTUS-PAATOIMITTAJA.md`:hin, ja koneellisen tarkistimen uudelleenajo (0 virhettä) jokaiselle muutetulle
kaupungille.

## Mistä jatketaan

1. `git fetch origin fable-esittely-tarkistus && git checkout fable-esittely-tarkistus`
2. Lue `CLAUDE.md`, `esittely-tyo/OHJE-kirjoittaja.md`, `esittely-tyo/OHJE-tarkistaja.md`,
   `esittely-tyo/PILVI-RAPORTTI.md` ja tämä tiedosto.
3. Kirjoita ali-agenttien toimeksianto uudelleen (ks. yllä) ja **tallenna se repoon**, älä scratchpadiin.
4. Aja erät A–H ali-agenteilla mallilla opus, enintään neljä rinnakkain. Ohita löydöstyyppi 4 (jo tarkistettu).
5. Kullekin kaupungille muutosten jälkeen:
   `node tools/opas/tarkista-esittely.mjs esittely-tyo/pohja/<id>.json esittely-tyo/korjattu/<id>.json` → 0 virhettä.
6. Kirjaa jokainen muutos `esittely-tyo/TARKISTUS-PAATOIMITTAJA.md`:hin (kaupunki, kohde, kenttä, vanha → uusi,
   syy, lähde-URL) ja myös kaupungit, joista ei löytynyt korjattavaa.
7. Lopuksi erillinen TARKISTAJA-agentti käy muutokset läpi.
8. Committaa ja pushaa `fable-esittely-tarkistus`. Ei PR:ää, ei mergeä, ei ääniä.

**Kannattaa committata erä kerrallaan** (kuten pilvityössä kaupunki kerrallaan), jotta seuraava katkos ei hävitä
valmista työtä. Tämä sessio menetti noin kymmenen minuuttia agenttien tutkimustyötä, koska mitään ei ollut vielä
kirjoitettu levylle.

## Huomioita jatkajalle

- Pilvityön jäljelle jääneet epävarmuudet on listattu `esittely-tyo/PILVI-RAPORTTI.md`:n osiossa
  "Jäljelle jääneet epävarmuudet" kaupungeittain. Ne annettiin ali-agenteille mukaan, ja ne kannattaa antaa
  uudelleen — nyt ne voi oikeasti ratkaista, koska verkko on auki.
- Erityisesti NYKYAIKA-riskit, jotka kannattaa tarkistaa ensin: **Budapest/Gellért-kylpylä** (remontti,
  mainittu vuosina 2028–2029), **Edinburgh/palmuhuoneet** (uudelleenavaus syksyllä 2026),
  **Budapest/kansallisgalleria ja -kirjasto** (siirtymässä pois linnasta), **Vilna/Gediminasin torni**
  (museon aukiolo 2026).
- Krakovan pohjassa on kirjoitusvirhe: nimi "Barbaakani" (oikein Barbakaani). `nimi`-kenttä pidetään pohjan
  mukaisena, koska tarkistin vertaa sitä pohjaan; pohja kannattaa korjata erikseen.
- Koko aineiston laajuus: 31 kaupunkia, 383 kohdetta, 247 kierroskohdetta, 1915 Kysy-kysymystä.
