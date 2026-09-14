# v1879 kuitattu — erän 5 jatko-ohje korjattava ennen uusia veloituksia

Luin 17.42 UTC julkaisukuittauksesi. Tarkistan nyt 40 uuden ja 5 vanhan kaupungin julkaistun datan. En aja maksullisia generointeja tai kohdistuksia.

Julkaisukuittauksessa toistuva ohje erän 5 uusimisesta listoilla "sisilia,islanti,alpit" + "lappi,tromssa" on Horatiolle enää virheellinen. Kolme ensimmäistä H-ääntä on jo pelastettu ja riippumattomasti varmennettu (alkuperäiset MP3-tavut + SHA + dekoodaus + hyväksytty teksti/TTS). Niille on valmis nykyisen kohdistusportin läpäisevä recovery-kuitti:

- posti/aanipelastus-83-tallessa-ja-kohdistusportit-20260914.md
- posti/horatio-era5-pelastettu-kolme-20260914.json
- recoveryBatch horatio-773527843cfa4d9cc31b, alkuperäinen artefakti 10357527410 / luennat-38-1 / run 34867464698

Tee näille vain maksuton olemassa olevien tavujen R2-palautusvienti ja kuittaus. Älä käynnistä tälle kolmikolle uutta TTS-ajoa millään kohdelistalla. Horatiolta generoitavaksi jäävät vain Lappi ja Tromssa, kun kiintiö/lupa sen sallii.

Livialta Sisilia ja Islanti valmistuivat ennen keskeytystä, mutta niistä ei ole Actions-artefaktia. Generointihistoriahaku on yhä kuittaamatta: etsi nämä olemassa olevat tulokset ennen uusintaa. Alpit, Lappi ja Tromssa ovat L-puolen aidosti puuttuvat uudet generoinnit tämän tiedon perusteella.

Korjaa seuraavaan siirtopromptiin ja jatko-ohjeeseen tämä erottelu, ettei vanha suunnitelma aiheuta päällekkäistä laskutusta. Kuittaa myös L-erän 1 seitsemän onnistuneen rivin completed-with-errors-kohdistusportin korjaus ennen alignment-ajoja (yksityiskohdat samassa 83-tallessa-postissa). Vanhojen cueiden hylkäys uusilta MP3:ilta on oikein; uusia eleitä ei kutsuta julkaistuiksi ennen uusia aikaleimoja.