# Horatio–Livia Eurooppa — tekninen tuotantotila 13.9.2026

## Tila

Euroopan kaikki 45 kaupunkia on tuotettu hyväksytyistä teksteistä sekä
Horatiolle että Livialle. Jokainen lopullinen MP3 ja sen kohdistustiedosto on
luettu takaisin julkisesta, versionoidusta R2-osoitteesta ja tarkistettu
tuotantokuittia vasten. Live-avaimia ei ole ylikirjoitettu.

- Horatio: 45/45 MP3 + 45/45 `.aikaleimat.json`
- Livia: 45/45 MP3 + 45/45 `.eleet.json`
- Livian Sofia 5–14: kymmenen aiemmin hyväksyttyä ääntä käytetään uudelleen;
  niitä ei generoitu eikä siirretty
- muiden maanosien ääniin tai kuviin ei koskettu
- kaikki uudet objektit ovat muuttumattomia ja versionoituja, joten aiemmat
  versiot säilyvät palautusta varten

Tämä tila todistaa audio-objektit ja niiden metadatan. Se ei vielä tarkoita
mergeä, pelijulkaisua, kuunteluhyväksyntää eikä hyväksyntää asennetussa
Safari-sovelluksessa.

## Tuotantokuitit

### Horatio

- `https://media.matkakirja.app/audio/receipts/horatio/horatio-3aaeabde9b4f5c76a85d.completed.json` (10)
- `https://media.matkakirja.app/audio/receipts/horatio/horatio-8270eb898650a10b5b52.completed.json` (2)
- `https://media.matkakirja.app/audio/receipts/horatio/horatio-76d54c364286603fc619.completed.json` (10)
- `https://media.matkakirja.app/audio/receipts/horatio/horatio-45f5631bb111d44e3965.completed.json` (10)
- `https://media.matkakirja.app/audio/receipts/horatio/horatio-060d6943e71f7efb9820.completed.json` (10)
- `https://media.matkakirja.app/audio/receipts/horatio/horatio-1d5aa6a08222250d94c8.completed.json` (3)

### Livia

- `https://media.matkakirja.app/aanet/pulu/kuitit/pulu-68f01fabb4a9d7ce6c2b.completed.json`
- `https://media.matkakirja.app/aanet/pulu/kuitit/pulu-c8223a43f6c9ab4c7102.completed.json`
- `https://media.matkakirja.app/aanet/pulu/kuitit/pulu-4c9887599f47a6c6f89f.completed.json`
- `https://media.matkakirja.app/aanet/pulu/kuitit/pulu-59c0127dcbec81ed4566.completed.json`
- `https://media.matkakirja.app/aanet/pulu/kuitit/pulu-d3df5cd49362e0f6a952.completed.json`
- `https://media.matkakirja.app/aanet/pulu/kuitit/pulu-d93f186a007678c0aa11.completed.json`

## Takaisinluku ja sidonta

Horatiolla kuusi kuittia kattavat 45 yksilöllistä kaupunkia. Jokaisesta
versionoidusta osoitteesta tarkistettiin HTTP-luku, MP3:n SHA-256 ja tavumäärä
sekä kohdistuksen kaupunki, teksti, tekstin SHA-256, äänen SHA-256, tavumäärä
ja ei-tyhjä sanakohdistus. Tulos: `45/45`, virheitä `0`.

Livian vastaavassa tarkistuksessa kaikki 45 versionoitua MP3-tiedostoa ja
niiden `.eleet.json`-tiedostot läpäisivät hash-, teksti- ja audiosidonnan.
Tulos: `45/45`, virheitä `0`.

## Epäonnistunut esiajo ja korjaus

Workflow-ajo `34727287764` epäonnistui suunnitteluvaiheessa ennen ElevenLabs-
API-kutsua ja ennen R2-varauksen tekoa. Välilyönnein annettu kaupunkilista
tulkittiin yhdeksi kaupungiksi. Ajosta ei syntynyt MP3:ta, objektia eikä
maksullista API-kutsua.

Parseri hyväksyy nyt sekä välilyönnit että pilkut. Regressiotesti ja kymmenen
kaupungin kuiva ajo läpäisivät. Onnistuneet lopulliset Horatio-ajot olivat
`34726709720`, `34726980653`, `34727438969` ja `34727707133`; vastaavat
kohdistusajot olivat `34726889505`, `34727155833`, `34727610723` ja
`34727841893`. Ensimmäisten 12 kaupungin kohdistusajot olivat `34726578130`
ja `34726652477`.

## Jäljellä olevat julkaisuportit

1. Runtime-karttojen 45/45 versionoitujen osoitteiden ja kestojen testaus.
2. Koordinaattorin PR, CI, merge, versionosto ja julkaisu.
3. Julkaistun `https://matkakirja.app`-originin kaupungin ja tilan mukainen QA.
4. Safari/asennetun sovelluksen tarkistus samoissa tiloissa.
5. Omistajan varsinainen kuunteluhyväksyntä.

Kuuntelussa tarkistetaan lisäksi, etteivät ohjaustagit kuulu sanoina, näkyvä
teksti ja puhe vastaavat toisiaan, rytmi ja tunne ovat hyväksytyt ja tiedoston
loppu käyttäytyy oikein. Hash- ja kohdistus-QA eivät korvaa kuuntelua.

## Palautus

Kaikki uudet ääni- ja kohdistusobjektit ovat versionoituja. Jos runtime- tai
kuuntelu-QA epäonnistuu, pelikoodin osoitekartta voidaan palauttaa aiempaan
versioon poistamatta tai ylikirjoittamatta yhtään aiempaa tai uutta objektia.
