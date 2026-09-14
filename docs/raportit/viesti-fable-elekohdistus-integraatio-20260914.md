# Fablelle: v1879 elekohdistuksen integraatioportti

Päiväys: 14.9.2026
Pohja: `origin/main` `e344d5e7d8e9025718afd585439ac76031855ac7` (v1879)
Valmisteluhaara: `codex/europe-cue-sync-20260914`

## Tämänhetkinen pysäytysportti

Omistaja kuuntelee ensin Fablen uuden Ateena + Sofia -Livia-pilotin. Älä aja
yhtään uutta TTS-synteesiä, forced alignmentia tai muiden 38 Livia-
repliikin erää ennen omistajan kuunteluhyväksyntää ja Fablen kuittaamaa
lopullista Livia-MP3/SHA-sarjaa. Horation julkaistu 40 kaupungin sarja on
erillinen ja muuttumaton, mutta ensimmäinen tuotantokohdistus tehdään silti
H/L-kaupunkiparina vasta kun saman kaupungin lopullinen Livia-ääni on valittu.

Sisilia, Islanti, Alpit, Lappi ja Tromssa säilyvät vanhoina nelikkoina:
teksti + MP3 + kohdistus + runtime. Niitä ei oteta 40 uuden kaupungin ajoon,
eikä niiden vanhoja cue-tiedostoja sidota uuteen ääneen.

## Valmis ilmainen integraatiokorjaus

1. `tools/kohdista-pulu-eleet.mjs` hyväksyy nyt myös aidon
   `completed-with-errors`-kuljetuskuoren, mutta palauttaa siitä vain
   `generated`-rivit. `validation-failed` ei koskaan päädy kohdistukseen.
2. Koko alkuperäisen erän `batchId` lasketaan uudelleen kaikista kuitin
   riveistä ja alkuperäisessä järjestyksessä. Todistus käyttää kuitin
   täsmällisesti sallittua vanhaa tai uutta reseptiä eikä generaattorin
   kulloisiakin oletuksia. Siksi sekä vanha R2-kuitti että uusi
   `postprocess: { kind: "none" }` -kuitti säilyvät todennettavina
   generaattorin myöhemmän muutoksen jälkeen. Seitsemästä onnistuneesta
   rivistä ei tehdä uutta tekaistua kuittia.
3. Jokaiselta hyväksytyltä riviltä tarkistetaan source commit, visible/TTS-
   teksti ja SHA:t, voice/model/settings, jälkikäsittely, staging/final-
   objektipolut, promotion-tila sekä raw- ja final-artefaktien nimi, SHA,
   tavumäärä ja todellinen kesto. `postprocess: { kind: "none" }` vaatii,
   että raw ja final ovat sama tavujono.
4. Horation `generoi-luennat.yml` välittää `kaupungit`-rajauksen nyt sekä
   kuivaan tarkistukseen että oikeaan kohdistusajoon. Ennen korjausta
   `kaupungit=ateena` olisi kohdistanut kuitin kaikki kymmenen kaupunkia.
5. Vain `completed-with-errors` saa sisältää ohitettavan
   `validation-failed`-rivin. Tavallinen `completed` hylätään, jos siinä on
   epäonnistunut rivi. Kaupunki- ja repliikkiavainduplikaatit tarkistetaan
   koko kuoresta ennen onnistuneiden suodatusta.

Julkisen alkuperäisen L-erä 1 -kuitin
`pulu-b3a8d61baa0c4dd24123.completed.json` lukutarkistus palauttaa tällä
portilla täsmälleen seitsemän kaupunkia:

`ateena, sofia, istanbul, sarajevo, wien, madrid, rooma`

Bukarest, Pariisi ja Berliini jäävät pois niiden alkuperäisen
`validation-failed`-tilan perusteella. Tämä on vanhan R2-sarjan
vastakoe; jos omistaja valitsee uuden ei-ffmpeg-pilotin, kohdistuksessa
käytetään vain sen uutta lopullista kuittia ja uusia SHA-tunnuksia.

Myös uuden Ateena + Sofia -pilotin aito julkinen kuitti
`pulu-c4a91d1229f96eaac265.completed.json` läpäisee saman kokonaisen kuitin
vastakokeen ja palauttaa täsmälleen kaupungit `ateena, sofia`. Vastakoe on
vain GET-luku; se ei käynnistä synteesiä tai kohdistusta eikä ole omistajan
kuunteluhyväksyntä.

## Raakatuotoksissa ei ole ilmaisia ajoituksia

Nykyiset H/L-ajot hakivat tavallisen MP3-vastauksen ja tallensivat sen
`arrayBuffer`-tavuina. Kuitit sisältävät raw/final-ääniartefaktit, mutta eivät
merkki-, sana- tai alignment-aikoja. Niistä ei voi palauttaa oikeaa
sisältökohdistusta ilman erillistä forced-alignment-tulosta. Sanamäärään,
merkkimäärään tai MP3:n kokonaiskestoon perustuvaa arviota ei saa merkitä
kohdistukseksi.

## Ensimmäinen oikea H/L-portti omistajan hyväksynnän jälkeen

Kaupunki: Ateena. Aja kaksi rajattua kohdistusta peräkkäin, ei rinnakkain:

1. Horatio: kuitti
   `https://media.matkakirja.app/audio/receipts/horatio/horatio-9c5b6e4dd75608cdbe8e.completed.json`,
   `kaupungit=ateena`.
2. Livia: Fablen kuittaama uuden pilotin lopullinen completed-kuitti,
   `repliikit=ateena-3`. Älä käytä vanhaa R2-kuittia, jos uusi pilotti
   valitaan.
3. Tarkista kummastakin tuotettu JSON julkisesta versionoidusta MP3:n
   sisaravaimesta: HTTP 200, JSON:n audio-SHA ja tavumäärä = juuri soiva MP3,
   teksti-SHA = v1879/pilotin lopullinen teksti, kaikki ankkurit tasan kerran.
4. Aja oikealla etenevällä audioelementillä: `playing`, kasvava
   `currentTime`, jokainen cue oikealla lauseella, pause/resume ja seek ilman
   vanhan cuen ryöppyä, luonnollinen loppu lepoon. Horatiolla tarkista
   kuuntelureaktio; Livialla sisältöele.

Vasta kun Ateenan molemmat puolet läpäisevät tämän portin, kohdista loput
39 uutta kaupunkia niiden omilla lopullisilla kuiteilla. Lopuksi vaaditaan
40/40 Horation aikaleimat, 40/40 Livian eledata, exact runtime-sidonta ja
erillinen kuuntelukatselmus. Viittä vanhaa kaupunkia ei lasketa uudelleen.

## Integrointi Fablen ääniputkihaaraan

Fablen `claude/bold-ride-vow4ki-aaniputki` muuttaa samaa Livia-kohdistimen
reseptitarkistusta. Konfliktia ratkaistaessa säilytä molemmat:

- Fablen kaksi eksplisiittisesti sallittua sointipolvea;
- tämän haaran koko kuitin batchId/provenance-tarkistus;
- `completed-with-errors`-kuoren vain onnistuneet rivit -suodatus;
- raw/final-SHA- ja ei-käsittelyä-tavuyhtälö;
- Horation yhden kaupungin rajaus molemmissa workflow-askelissa.

Tässä valmistelussa ei ole tehty API-kutsuja, TTS-synteesiä, forced
alignmentia, R2-kirjoituksia, kuvamuutoksia, versiopäivitystä tai julkaisua.
