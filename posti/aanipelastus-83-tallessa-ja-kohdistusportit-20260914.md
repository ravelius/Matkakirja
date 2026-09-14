# Codex: 80 R2-ääntä varmennettu, kolme Horatiota pelastettu ilman uutta generointia

## Riippumaton tarkistus

Luin kaikki yhdeksän completed-kuittia ja hain jokaisen 80 julkisen MP3:n tavut. **80/80 HTTP 200, tavumäärä ja SHA-256 täsmäävät kuitteihin**, 80 eri hahmo/kaupunki-paria. Sanat/TTS/sävyresepti täsmäävät hyväksyttyyn lähteeseen. Lähdecommitien eron tarkistus: 6e3a07e8 → 439bf050 muuttaa vain tools/generoi-pulu.mjs:n 20 → 30 s katon ja kommentin; hyväksytyt tekstit eivät muuttuneet.

## Kolme H-ääntä varmasti tallessa — älä äänitä uudelleen

Latasin GitHub-artefaktin **10357527410 / luennat-38-1**, run 34867464698. ZIP SHA-256 vastaa GitHubia: 2a7906bb3795596dc0c288c1e4bcddfa1b1ab56f7638366b559738a8c8d06cf5. Se sisältää alkuperäisen viisirivisen osatuloskuitin sekä kolme oikeaa MP3:a:

- sisilia: 275061 tavua; SHA e96df42e91d18e9d934b13d7b0e996a1f767375375dc4e0e377f29300d4be239; tuotantokesto 17.162 s.
- islanti: 349039 tavua; SHA 5c7274267ccc38d23e9819c9b3ec1b65344ca316cb93f0bf545b03e1c911c9cf; tuotantokesto 21.786 s.
- alpit: 437647 tavua; SHA 795b40630bad65cd8087d69799f3dbe0ad43b16474879070a07233f66d1c68e4; tuotantokesto 27.324 s.

Kaikki kolme dekoodattiin loppuun virheittä ja verrattiin hyväksyttyihin näkyviin/TTS-teksteihin sekä kuitin tavumääriin ja SHA:hin. Uudemman paikallisen ffproben gapless-kestot 17.12 / 21.76 / 27.28 s poikkeavat alkuperäisen ffproben täydet MPEG-kehykset sisältävistä luvuista vain 26–44 ms; täysi kehysmäärä todentaa alkuperäisen kuitin kestot. Tavuja ei käsitelty eikä muutettu.

Paikallinen pysyvä varmuuskopio:
/Users/samireivinen/Documents/Codex/2026-09-11/pulu-jatko-2026-09-11/output/audio-rescue-20260914/horatio-batch5

## Maksuton palautusversion vienti

Alkuperäinen viisirivinen osatulostiedosto ei kelpaa nykyiseen H-kohdistusporttiin, koska Lappi ja Tromssa ovat failed. Älä merkitse niitä onnistuneiksi, älä muuta alkuperäistä planned-kuittia äläkä ohita vartijaa.

Valmistin kolmelle jo onnistuneelle äänelle **johdetun recovery-kuitin**, jossa alkuperäinen run, artifact, ZIP-SHA, sourceCommit ja sourceBatchId säilyvät. Samat MP3-tavut saavat uuden kolmen rivin varastointierän **horatio-773527843cfa4d9cc31b**, retryOf=horatio-9ac94d7e1f8142beb972. Tämä EI ole uusi TTS-ajo. Kuitti: `posti/horatio-era5-pelastettu-kolme-20260914.json` tässä postilaatikkohaarassa.

Kuitin 3/3 riviä läpäisevät sellaisenaan nykyisen tools/kohdista-luennat.mjs kuittirivit()-portin, kaikki tarkistukset päällä. Toimi näin:

1. Lataa alkuperäinen luennat-38-1-artefakti; varmista ZIP-SHA sekä kolme MP3-SHA:ta yllä.
2. Siirrä vain nämä olemassa olevat tavut recovery-kuitin objectKeys.staging- ja objectKeys.final-avaimiin normaalilla R2-vientioikeudellasi. Tarkista kohteet ensin; jos sama SHA on jo olemassa, käytä sitä, älä ylikirjoita eri tavuja.
3. GET-takaisinlue jokainen final-osoite ja vertaa SHA/tavumäärä. Vasta tämän jälkeen julkaise recovery-kuitti osoitteeseen audio/receipts/horatio/horatio-773527843cfa4d9cc31b.completed.json; vaihda recovery.uploadState tämän todellisen siirron mukaiseksi ja lisää varmennusaika. Säilytä alkuperäisen lähde-erän kuitti ja todisteet.
4. Käytä myöhemmin tämän palautuskuitin URLia kolmen H-äänen forced alignmentiin, kun krediittejä on. Ei ELEVEN_API_KEY:tä palautusvientityölle, ei TTS-kutsuja, ei uusia veloituksia.

## Toinen kohdistusblokkeri: Livia-erä 1:n seitsemän onnistunutta

pulu-b3a8d61baa0c4dd24123.completed.json on completed-with-errors. Nykyinen tools/kohdista-pulu-eleet.mjs kuittirivit() hylkää tämän kokonaan ennen rivien tarkistusta, joten suoraan kuitin syöttäminen kohdista-ajolle EI onnistu.

Varmistin seitsemän onnistuneen rivin tiedot ja MP3-tavut erikseen kaikkia nykyisiä riviportteja käyttäen. Vanhassa tiedostossa on lisäksi kolme validation-failed-riviä, jotka on jo korvattu erän 1 uusinnalla. Korjaa onnistuneen osatuloksen käsittely rajatusti ennen kohdistusta: säilytä alkuperäinen kuitti/provenanssi, käsittele vain generationStatus=generated-rivit, älä päästä hylättyjä rivejä läpi. Testeihin sekatulos sekä SHA/voice/TTS-vastakokeet. Älä muuta tuettua status-arvoa vain completediksi ja väitä koko kymmenen erää valmiiksi. Älä generoi onnistunutta seitsemää uudelleen.

## Jäljellä

80 ääntä R2:ssa + 3 H-ääntä paikallisesti ja GitHub-artefaktissa = **83 eri käyttökelpoista alkuperäistä tallessa**, joista kolmen R2-palautus vielä tekemättä. Seitsemästä jäljellä olevasta kohteesta Livia Sisilia/Islanti valmistuivat lokin mukaan, mutta niiden ajo ei tallentanut artefaktia ja kaatui ennen vientiä. Tarkista ElevenLabs-historia / muut olemassa olevat kopiot ensin; älä vielä uusi. H Lappi/Tromssa ja L Alpit/Lappi/Tromssa ovat aidosti ilman onnistunutta generointia tämän ajon perusteella.

En tehnyt maksullisia kutsuja, krediittiostoja, R2-kirjoituksia, kohdistuksia, julkaisuja enkä tekstimuutoksia. Palauta maksuttoman siirron sekä historiahaun tulos.