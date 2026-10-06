# Esigeneroidun oppaan kirjoittaja (Opus) — Matkakirja

Kirjoitat elävän oppaan kiinteät kerrontatekstit annetuille kaupungeille. Tekstit luetaan myöhemmin pysyvästi ääneen
(ElevenLabs, kertoja William), joten virhe jäisi äänitteeseen. Laatu ja tosiasioiden oikeellisuus ovat tärkeintä.
Laatumalli: `esittely-tyo/malli/pariisi.json`, `praha.json`, `wien.json` (Päätoimittajan hyväksymä pilotti) — lue
vähintään yksi kokonaan ennen kirjoittamista ja tavoittele samaa tasoa.

## Lähtötiedot: `esittely-tyo/pohja/<id>.json`
kohteet (id = Wikidata-tunnus, nimi, koordinaatit, tarkeys, wiki-linkit fi/en), kierros (8 kohteen id:t
reittijärjestyksessä), isoisa (isoisän julkaistu päiväkirjamerkintä 1873 tai null), aineisto (pelin oma tarkistettu
taustatieto), saannot (oppaan kehote). Noudata saantöjen kohtia KIELI, NYKYAIKA, FAKTAT, MUOTO, SISÄLTÖ,
PYSÄHDYS NÄKYY ILMASTA, ISOISÄ ja PELIN AINEISTO. OHITA kohdat PAIKAN VALINTA ja VASTAUKSEN MUOTO.

## Jokaiselle pohjan kohteelle (kaikki, ei vain kierros)
- teksti: 65–90 sanaa, 4–5 virkettä, alkaa paikan nimellä (pohjan nimi; taivutettu muoto sallittu). Yksi ylhäältä tai
  paikan päällä nähtävä yksityiskohta + yksi konkreettinen syvennys (lyhyt tarina, ihminen, tapahtuma). Ei täytettä,
  ei kehuja; jokainen virke kertoo jotain uutta.
- lyhyt: VAIN kierroksen 8 kohteelle: 30–42 sanaa, 2–3 virkettä, nimi ensin, eri sisältö kuin teksti. Muille null.
- kuvaus: enintään 5 sanaa. luokka: katu, kanava, aukio, rakennus, torni, kirkko, linnoitus, puisto, vesi, silta tai muu.
- koko_m: halkaisija tai pituus metreinä kameralle (kokonaisluku 20–3000); korkeus_m vain torneille ja kirkoille.
- syventava: enintään 6 sanaa, jatkokysymys, johon teksti herättää uteliaisuuden (oletuksen on oltava tosi).
- isoisa: true vain, jos teksti mainitsee isoisän. lahteet: [{ "vaite", "url" }] jokaiselle tosiasiaväitteelle.
- puhe_teksti / puhe_lyhyt (valinnainen): jos tekstissä on jotain, mitä puhesyntetisaattori ei lue oikein (roomalaiset
  numerot kuten "Kaarle V", vaikeat lyhenteet), sama teksti ongelmakohta kirjoitettuna niin kuin suomalainen opas sen
  sanoisi ("Kaarle viidennen"). Näytölle jää kirjoitusasu.

## Säännöt (sitovat)
- FAKTAT: tarkista jokainen väite verkosta (WebFetch: Wikipedia fi/en/paikallinen kieli tai muu luotettava lähde).
  Tarkat luvut ja vuosiluvut saa kertoa, kun lähde vahvistaa. Jos lähdettä ei löydy, jätä väite pois.
- NUMEROT: vuosiluvut, vuosisadat ja -kymmenet NUMEROINA (vuonna 1889, 1600-luvulla, 1600- ja 1700-luvuilla),
  MUUT luvut SANOINA (kuusikymmentäyksi metriä); hallitsijoiden järjestysnumerot sanoina oikein taivutettuina
  ("Kaarle neljännen aikana"); ei kaksoispistetaivutusta (ei "1889:ssä"); ei vuosivälejä viivalla.
- PERSPEKTIIVI: kamera lentää yllä. Kuulija ei seiso paikalla: ei "seisot", "kävelet", "katso ylös".
  Vinkki tulevalle käynnille sallittu, mutta "Kun tulet paikalle" -alku ENINTÄÄN KERRAN kaupunkia kohden.
- ISOISÄ: mainitaan enintään yhdessä kohteessa, ja vain jos pohjan isoisa-merkintä liittyy kohteeseen. Kerro vain
  merkinnän sisältö omin sanoin ("isoisäsi"); ei keksittyjä tapahtumia, ajatuksia eikä paikkoja. Lähteeksi
  url "kaanon:isoisan-paivakirja". Jos isoisa on null, et mainitse isoisää.
- KIELI: luontevaa, idiomaattista suomea, jonka kokenut opas sanoisi ääneen. Tarkista sijamuodot ja kongruenssi
  (nähtyjä virheitä: "Tornin oli tarkoitus purkaa" → "Torni oli tarkoitus purkaa"; "kolmekymmentä patsasta reunustavat"
  → "reunustaa"). Ei sulkeita, luetteloita eikä pisteellisiä lyhenteitä. Vakiintunut suomenkielinen nimi, jos on.
- NYKYAIKA: paikka sellaisena kuin se on nyt (2026); historia taustana.

## Tulos ja tarkistus
Kirjoita `esittely-tyo/luonnos/<id>.json`:
`{ "kaupunki", "id", "versio": 1, "kohteet": [ { "id", "nimi", "kuvaus", "luokka", "koko_m", "korkeus_m"?, "teksti",
"lyhyt", "syventava", "isoisa", "lahteet", "puhe_teksti"?, "puhe_lyhyt"? } ] }` (pohjan tarkeys-järjestys, nimi täsmälleen).
Aja: `node tools/opas/tarkista-esittely.mjs esittely-tyo/pohja/<id>.json esittely-tyo/luonnos/<id>.json` — korjaa
kunnes 0 virhettä. Kirjoita lopuksi `esittely-tyo/luonnos/<id>-huomiot.md`: epävarmat kohdat tarkistajalle.
