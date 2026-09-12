# Horatio–Livia Eurooppa-pilotti — koonti Fablelle 12.9.2026

Luonnos-PR: https://github.com/ravelius/Matkakirja/pull/2325  
Haara: `codex/europe-texts-20260912`  
Commit: `aa3a61d7b5c422d132f6ef06c1c64dfd521ebcc2`  
Pohja: `dd7154a3902ff49cc93ffb36380700bbd713ba98`

Tämä on yksi yhteinen neljän kaupungin pilotti:
- Marseille: runtime
- Ateena: ensisaapuminen
- Sarajevo: rauhallinen pohdinta
- Venetsia: romanssipoikkeus

## Mitä luonnoksessa on

- Horatio: tiivistetty näkyvä teksti ja sanasta sanaan sama, tagillinen TTS-ehdokas.
- Livia: yksi 125 merkkiin mahtuva nykykaupunkiin sidottu puhekupla.
- Pysyvät semanttiset cue-ID:t ja täsmälliset tekstiankkurit.
- Kaupunkikohtaiset sisältö-, kuva-, fakta- ja audiokortit:
  `docs/raportit/horatio-livia-pilottikortit-20260912.md`
- 45 kaupungin myöhempi, ei-päällekkäinen eräjono:
  `docs/raportit/horatio-livia-eurooppa-tyojono-20260912.md`
- Marseille P2 liitetty toiseksi Pulu-kuvaksi vasta hyväksynnän ja mediareadbackin jälkeen.

Marseille P2:
- URL: https://media.matkakirja.app/matkakirja/pulu-cam/20260912/pulu-cam-marseille-02-v2-5218c67d5b38.jpg
- SHA-256: `5218c67d5b3868d83854107900a88da7acd1597efc8d035a52401255daf52464`
- readback: 200, JPEG, 1536×1024, sRGB, full decode, CORS `https://matkakirja.app`

## Tarvittavat ääni- ja alignment-päätökset

Älä julkaise muuttuneita tekstejä nykyisillä äänillä tai aikaleimoilla.

Horatio:
- uudet `eleven_v3`-ajot: ateena, marseille, sarajevo, venetsia
- käytä nykyistä Viisas Kertoja -ääntä, ellei kaanonpäätös muuta sitä
- tuota jokaiselle uusi SHA-256, tekstitiiviste ja forced alignment

Livia:
- uudet ajot: `ateena-3`, `marseille-3`, `sarajevo-3`, `venetsia-3`
- tuotantoäänen valinta odottaa yhä päätöstä
- tee lopulliset cue-rajat vasta valmiista äänestä; käsikirjoituksessa ei ole arvattuja millisekunteja

Tässä työssä ei ole tehty maksullisia ääniajoja.

## Testit ja tunnetut portit

- pilotin sisältövartio: 3/3 PASS
- pilotin sisältövartio + fokusvirta: 45/45 PASS
- laajempi kohdennettu ajo: 109/111 PASS

Kaksi tarkoituksellista hylkäystä:
1. Livian vanhat äänitiivisteet eivät vastaa uusia repliikkejä.
2. Marseillen Horation v2-aikaleimat on sidottu vanhaan tekstiin.

## HOLD — ei mergeä tai julkaisua

Tarvitaan vielä:
- kaanon- ja tekstiversion hyväksyntä
- uudet audio/hash/alignment-artefaktit
- animaatiovetäjän `cityExplain` / cue-runtime-integraatio ja keskeytystestit
- CI
- julkaistun pelin tarkistus oikeissa kaupunki- ja saapumistiloissa osoitteessa `matkakirja.app`

Ateena- ja Sarajevo-P2:t odottavat pilotin hyväksyntää. Ne tehdään yksi kuvakohtainen brief kerrallaan. Venetsian nykyiset P1–P5 säilyvät samassa järjestyksessä.

## Erilliset kaanonhavainnot

Älä korjaa näitä sivulauseessa pilotin PR:ssä ilman omaa päätöstä:
- Marseillen packin Fort Saint-Jean -teksti sanoo 1660; MuCEMin mukaan nykyisen linnoituksen rakentaminen alkoi 1668.
- Sarajevon Livnon hevosten `1950-luku` ei saanut luotettavaa vahvistusta; osa aineistosta sijoittaa vapauttamisen 1970-luvulle.
- Ateenan nykyinen kuvateksti väittää liian vahvasti, että valokuva teki Troijan kullasta puheenaiheen kaikkialla Euroopassa.

Vastaa tähän postilaatikkotiedostoon tai PR:ään kaanonpäätöksellä ja ääniajon etenemisellä.