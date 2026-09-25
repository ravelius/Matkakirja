# Opus 2 → Fable: Astronautin kameran ääni 20.9.2026

Haara `opus2-astro-aani` (pohja `origin/v1973-prep`). Omistajan tilaus
klo 14.40.

## Humina EI ollut rikki — tämä on tärkein tulos

Tilauksessa oletettiin, ettei humina soi ("ei kytketty? äänet pois?
vartija?"). **Mittasin ennen kuin korjasin, ja humina soi.** Olemassa
oleva `tools/savukkeet/savuke-astro-aani.mjs` mittaa selaimen omasta
äänigraafista, ei koodista, ja se antoi **24/24 läpi jo ennen yhtäkään
muutostani**: linssiin tultaessa syntyy `AudioBufferSourceNode`,
`loop === true`, puskuri 84 s, gain nousee nollasta tavoitteeseen
0,2609 kahdessa sekunnissa. Sama molemmilla näkymillä.

Tarkistin myös aineiston: humina on ämpärissä (HTTP 200, 1 345 091
tavua, sama koko kuin koodin kommentti lupaa) ja CORS on kunnossa
GET-pyynnöllä (`access-control-allow-origin` palautuu; HEAD ei sitä
näytä, mikä hämäsi minua hetken).

**Syy siihen, ettei humina kuulu, oli toinen: musiikki jäi päälle sen
päälle.** Se on sama asia kuin tilauksen toinen kohta.

## Juurisyy: hiljennys ei koskenut musiikkiin lainkaan

`vaiennaAanet` (js/linssit/satelliitti.js) kutsui
`hiljennaAmbienssi(LINSSIN_HILJENNYS)`, joka kutsuu
`asetaMusiikkitila('linssi', true)`. Musiikkivalitsin **aloittaa**
rivillä:

```js
if (!Object.hasOwn(TILARAIDAT, nimi)) return;
```

`TILARAIDAT` tuntee vain `lehti` ja `matkalaukku`, ja linssin syy on
`linssi` (js/siirtymamusiikki.js `LINSSIN_HILJENNYS`). **Kutsu palasi
tekemättä mitään eikä sanonut siitä.** Kaupungin pohjaraita jäi siis
soimaan koko linssin ajaksi, ja aseman humina (−30,48 LUFS, pohjaväri
eikä kappale) jäi sen alle.

Tuntemattoman nimen sietokyky on tarkoituksellinen — kaikkia
hiljennyssyitä ei ole nimetty raidaksi — joten korjaus **ei ole taulun
laajentaminen** vaan se, että linssi sanoo suoraan mitä haluaa.

## Korjaus

1. **`stopPohjaMusiikki()` linssiin tultaessa.** Pysäytys eikä
   vaimennus: tilaus oli musiikki pois, ei hiljaisemmaksi. Paikka jää
   muistiin, joten sama raita palaa samaan kaupunkiin.
2. **Ja pysyy kiinni koko linssin ajan.** Tämän löysin savukkeesta:
   kertaluontoinen pysäytys piti linssiin tultaessa, mutta väite kaatui
   heti kun savuke käänsi musiikkikytkimen pois ja takaisin päälle —
   kytkimen paluu ajaa `syncAmbience`n, joka käynnistää kaupungin raidan
   uudestaan kesken linssin. Nyt `vaiennaAanet` kuuntelee
   musiikkitilaa ja pysäyttää raidan uudelleen niin kauan kuin linssi on
   auki. Huminaan tämä ei kosketa: se on eri soitin ja seuraa kytkintä
   kuten ennenkin.
3. **Palautus linssin jälkeen** kulkee `syncAmbience`n kautta kuten
   ennen; jos ui on purettu (savuke, testi), `kaynnistaPohjaMusiikki()`
   hoitaa sen, ettei raita jää pysyvästi kiinni.

## Savuke

Laajensin olemassa olevaa `tools/savukkeet/savuke-astro-aani.mjs`:ää
kolmella väitteellä — uusi savuke olisi toisintanut sen koko
äänigraafimittauksen.

| väite | mitä |
|---|---|
| alkuehto | taustamusiikki **soi** ennen linssiä (ilman tätä väite 7 mittaisi tyhjää) |
| 7 | linssin aikana pohjaraita on kiinni |
| 7b | musiikkikytkimen kääntö linssissä ei palauta raitaa |
| 7c | linssin jälkeen musiikki soi taas eikä humina soi |

**32/32 läpi** molemmilla näkymillä (työpöytä ja puhelin).
`node --test tests/*.test.mjs`: **3 750 testiä, 0 punaista**.

Väite 7 on mitattava vain oikeassa kohdassa: siirsin sen linssin
avauksen viereen, koska savukkeen oma kytkintesti (väite 4) ajaa
musiikin takaisin päälle myöhemmin. Ensimmäisellä yrityksellä väite
kaatui juuri siitä — ja se kaatuminen oli oikeassa, ks. kohta 2 yllä.

## Mitä jäi auki

- **Jos omistajan musiikkikytkin on POIS, humina ei soi.** Humina on
  `musiikkiPaalla()`-kytkimen takana (LISÄYS 8, oma päätöksensä, ja
  `tests/satelliitti.test.mjs` vartioi sitä). Humina on kuitenkin
  äänimaisemaa eikä kappale, joten kytkin voi olla väärä paikka sille.
  **En muuttanut tätä omin päin**, koska se kumoaisi kirjatun päätöksen
  ja vartijan. Jos omistaja kuuntelee ilman musiikkia, tämä on se syy —
  kysy häneltä, saako huminan irrottaa musiikkikytkimestä.
- **Laitteella en mitannut.** Savuke ajaa Chromiumin lipulla
  `--autoplay-policy=no-user-gesture-required`, eli autoplay-estoa ei
  mitata. Soittimessa on sitä varten vahti
  (`kuunteleReitityksenAvautumista`), mutta iOS:n käytös jää
  vahvistamatta.
