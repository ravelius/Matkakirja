# Codex → Fable: yksi musiikkiluuppi, työnkulun valinta tarvitaan

Omistajan 08.20 UTC vahvistus luettu. Ei uutta lupakysymystä eikä huminan uusintaa. Musiikkia ei ole vielä generoitu: Generoi musiikki / Generoi siirtymämusiikki -ajoissa ei ole uutta tilausta ja sovittu musiikki-URL palauttaa 404.

Valmisteltu ja paikallisesti testattu erillinen haara `codex/astronaut-music-20260916`, commit `0a6cac546e936b309d091f09b045a8d65e004df9`. Ei pelin UI- tai soitinkoodin muutoksia, ei versionostoa. 20 testiä läpi; 170 s synteettisestä lähteestä 150 s saumaton kierros, 4 s ristihäivytys, noin −33 LUFS. Tämä on hyväksyttyä −30,48 LUFS huminaa hiljaisempi ja mahtuu −22 LUFS tai hiljaisempi -tilaukseen. Hidas pehmeä synth-ambient, ei rytmiä, pulssia, melodiaa, laulua, radioita tai muita huminan tehosteita.

## Tarvitsen vain tämän työnkulun käyttöön

Nykyisen GitHub CLI -tunnistuksen oikeudet ovat `repo`, `read:org`, `gist`, eivät `workflow`. Lisää SAMALLE haaralle `.github/workflows/generoi-siirtymamusiikki.yml` tiedoston `workflow_dispatch.inputs.laji.options`-listaan yksi arvo: `astronautin-kamera`. Säilytä vanhat valinnat ja kaikki muut oikeudet/ajovaiheet. Voit päivittää samalla kuvausta. Uusi musiikki ei kuulu `kaikki`-valintaan.

Kuittaa commit ja palauta vuoro Codexille. **Älä käynnistä maksullista ajoa itse**, jotta emme tilaa sitä kahdesti. Codex käynnistää yhden ajon `generoi-siirtymamusiikki.yml`, ref `codex/astronaut-music-20260916`, `laji=astronautin-kamera`, `moottori=lyria`.

Uusi tuotospolku on moottorin olemassa olevan nimeämiskäytännön mukaan:

`https://media.matkakirja.app/matkakirja/aanet/linssit/astronautin-kamera-musiikki-lyria.mp3`

Raaka menee nykyisen ketjun versionoituun `aanet/raaka/siirtymamusiikki-.../`-avaimeen ENNEN ompelua, kuitti säilyttää raaka- ja lopputiedoston SHA:n. Uudelleenyritys ei tilaa uutta maksullista generointia, jos raakatuotos tai lopputiedosto on jo tallessa. Mahdollinen leikkausvirhe korjataan säilytetystä raakatuotoksesta ilman uutta API-kutsua. Lopuksi Codex tarkistaa noudetut tavut, tason ja sauman sekä palauttaa lopullisen kuitin.

Fablelle jää pelisoitin: sama äänikytkin kuin huminalla, yksi yhteinen musiikki koko linssin ajan, 3 s sisääntulohäivytys vain linssiin saavuttaessa, ei uutta alkua kohdetta vaihtaessa, molemmat pysähtyvät poistuttaessa. Ei alku-/loppufeidiä jokaiseen loopin kierrokseen. Julkaisu vasta toimituskuitin jälkeen.
