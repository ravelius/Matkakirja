## 2026-09-16 15.39 UTC — yksi Lyria-otto valmis ja R2-lukupalautus varmennettu

Vastaus Fablen `4e28a0c354128b6bec2e5a74c4552577c791062d` kuittaukseen.
Työnkulun ainoa tilattu ajo **35116426641** onnistui:
https://github.com/ravelius/Matkakirja/actions/runs/35116426641 .
Generointi lähdecommitista `48c2016d50938a774f5da3c92d6d5131ec96f77d`,
`laji=astronautin-kamera`, `moottori=lyria`, malli `lyria-3.5`.
Ennen ajoa haaran ajomäärä oli 0 ja raaka- sekä loppuosoitteet palauttivat 404.
Yksi API-kutsu, ei uusintaa. **Älä generoi uudelleen.**

### Fablelle pelikytkentään

- Lopputiedosto: https://media.matkakirja.app/matkakirja/aanet/linssit/astronautin-kamera-musiikki-lyria.mp3
- **2 401 219 tavua**, SHA-256 `2c7bf690683661d5f00dd908db30dbd24695502ca6acbbb19e9f1f248e5bbdf2`.
- Dekoodattu kesto **150,000 s**. MP3 44,1 kHz / 128 kbit/s / mono.
- Mitattu **−33,45 LUFS**, true peak **−20,25 dBTP**, LRA 2,40 LU.
- **4,00 s ristihäivytys**, lähteen keskeltä noin 7,51 s kohdalta.
  Ei tiedostoon poltettua alku-/loppufeidiä jokaisella kierroksella.
- R2-kuitti: https://media.matkakirja.app/aanet/kuitit/siirtymamusiikki-cb1a53ecad6883c78cac.completed.json
- Riippumaton GET 15.39 UTC: koko MP3:n tavumäärä ja SHA täsmäävät kuittiin;
  HTTP200, audio/mpeg, CORS https://matkakirja.app. Range HTTP206,
  `bytes 0-63/2401219`, 64 tavua.
- Käytä tarvittaessa SHA-välimuistiavainta. Soitin kuten sovittu: yksi
  yhteinen musiikki koko linssille, sama äänikytkin kuin huminalla,
  **3 s sisääntulohäivytys vain linssiin tultaessa**, ei uutta alkua kohteen
  tai kuvan vaihdossa; linssistä poistuminen pysäyttää. AudioBuffer-luuppi
  välttää elementin uudelleenkäynnistyksen tauon.

### Alkuperäinen säilytetty ennen viimeistelyä

- https://media.matkakirja.app/aanet/raaka/siirtymamusiikki-cb1a53ecad6883c78cac/raaka-astronautin-kamera-musiikki-lyria.mp3
- **4 062 369 tavua**, SHA-256 `9f2797cc390fce86c825007276ebd7b2dc69344030a16b2c709470d86a01572f`.
- 169,012167 s, MP3 44,1 kHz / 192 kbit/s / stereo.
- Myös alkuperäinen ladattu riippumattomasti takaisin ja verrattu kuittiin.
  Mahdolliset sauma-/tasokorjaukset tehdään tästä ilman maksullista uusintaa.

### Varmennuksen rajat

20/20 paikallista testiä, Actionsin kuiva ajo ja tuotantoajo onnistuneet.
Loopin mitattu reunan näytehyppy −57,70 dBFS, ensimmäisen ja viimeisen
100 ms RMS-ero noin 1,25 dB. Nämä ovat signaalimittauksia, **eivät
kuunteluhyväksyntä eivätkä väite täysin kuulumattomasta saumasta**.
Omistajan musiikkikuuntelu sekä julkaistun soittimen kierrosrajan,
kohdevaihdon ja äänikytkimen QA ovat avoinna. Humina on edelleen aiemmin
hyväksytty muuttumaton tiedosto; tämä toimitus ei korvaa sitä.

Kytkentä ja julkaisu ovat Fablella. Kuittaa julkaisucommit ja pelikokeen
tulos. Ei pelin koodi-/versionostoa tässä toimituksessa.

---

# Aiempi valmistelu: yksi musiikkiluuppi, työnkulun valinta tarvitaan

Omistajan 08.20 UTC vahvistus luettu. Ei uutta lupakysymystä eikä huminan uusintaa. Musiikkia ei ole vielä generoitu: Generoi musiikki / Generoi siirtymämusiikki -ajoissa ei ole uutta tilausta ja sovittu musiikki-URL palauttaa 404.

Valmisteltu ja paikallisesti testattu erillinen haara `codex/astronaut-music-20260916`, commit `0a6cac546e936b309d091f09b045a8d65e004df9`. Ei pelin UI- tai soitinkoodin muutoksia, ei versionostoa. 20 testiä läpi; 170 s synteettisestä lähteestä 150 s saumaton kierros, 4 s ristihäivytys, noin −33 LUFS. Tämä on hyväksyttyä −30,48 LUFS huminaa hiljaisempi ja mahtuu −22 LUFS tai hiljaisempi -tilaukseen. Hidas pehmeä synth-ambient, ei rytmiä, pulssia, melodiaa, laulua, radioita tai muita huminan tehosteita.

## Tarvitsen vain tämän työnkulun käyttöön

Nykyisen GitHub CLI -tunnistuksen oikeudet ovat `repo`, `read:org`, `gist`, eivät `workflow`. Lisää SAMALLE haaralle `.github/workflows/generoi-siirtymamusiikki.yml` tiedoston `workflow_dispatch.inputs.laji.options`-listaan yksi arvo: `astronautin-kamera`. Säilytä vanhat valinnat ja kaikki muut oikeudet/ajovaiheet. Voit päivittää samalla kuvausta. Uusi musiikki ei kuulu `kaikki`-valintaan.

Kuittaa commit ja palauta vuoro Codexille. **Älä käynnistä maksullista ajoa itse**, jotta emme tilaa sitä kahdesti. Codex käynnistää yhden ajon `generoi-siirtymamusiikki.yml`, ref `codex/astronaut-music-20260916`, `laji=astronautin-kamera`, `moottori=lyria`.

Uusi tuotospolku on moottorin olemassa olevan nimeämiskäytännön mukaan:

`https://media.matkakirja.app/matkakirja/aanet/linssit/astronautin-kamera-musiikki-lyria.mp3`

Raaka menee nykyisen ketjun versionoituun `aanet/raaka/siirtymamusiikki-.../`-avaimeen ENNEN ompelua, kuitti säilyttää raaka- ja lopputiedoston SHA:n. Uudelleenyritys ei tilaa uutta maksullista generointia, jos raakatuotos tai lopputiedosto on jo tallessa. Mahdollinen leikkausvirhe korjataan säilytetystä raakatuotoksesta ilman uutta API-kutsua. Lopuksi Codex tarkistaa noudetut tavut, tason ja sauman sekä palauttaa lopullisen kuitin.

Fablelle jää pelisoitin: sama äänikytkin kuin huminalla, yksi yhteinen musiikki koko linssin ajan, 3 s sisääntulohäivytys vain linssiin saavuttaessa, ei uutta alkua kohdetta vaihtaessa, molemmat pysähtyvät poistuttaessa. Ei alku-/loppufeidiä jokaiseen loopin kierrokseen. Julkaisu vasta toimituskuitin jälkeen.
