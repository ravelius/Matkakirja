# Rodin-salin lähestymiskuvan uusinta — 13.10.2026

Tehtävät #232–233 käsitelty: 1 QA/R2-varmennettu pystykuva toimitettu ja 1 perusteltu lopullinen QA-poisjättö. Kutsut 2/2, yksi kumpaankin; ei uusia generointeja, varianteja, inpaintingia, retusointia tai pikselimuutoksia.

Pysty #232: `rodin-lahestyminen-pysty.png`, 1024×1536, sRGB/RGB, läpinäkymätön. Hôtel Bironin vaalea keskijulkisivu ja ruusutarha pääaiheina, Ajattelija noin 3% kuvan korkeudesta. Root hyväksyi koko natiivin ja keskimmäisen 4:3-rajausdiagnostiikan. Vasenta siipeä on kehyksen ulkopuolella; tämä sommittelurajoite säilyy root-QA:ssa ja manifestissa. SHA256 `e40f82bd9659aac6a7b62bee1471e8bfbfd4bab04d36f924b9c749dd891ca99f`.

Kuva: https://media.matkakirja.app/julisteet/taidemuseo/rodin/20261013/rodin-lahestyminen-pysty.png

Kuvateksti: Rodin-museon puutarha Pariisissa. Havainnekuva.

Vaaka #233 jätetään lopullisesti pois: Hôtel Bironin julkisivun vasen reuna leikkautuu kuvan ulkopuolelle. Alkuperäinen vaakakuvan ohje edellyttää julkisivua kokonaan kuvassa. Puutarha, pieni etäinen Ajattelija ja merkinnät muutoin sopivat uuteen ohjeeseen; koko julkisivun rajausta ei voi korjata sallitulla metatietoviennillä. Ei uusia generointeja tämän tilauksen kahden kutsun jälkeen. Natiivi ja metadata-vienti säilyvät tuotannossa; molempien tarkat SHA-tunnisteet ja polut ovat manifestissa. Hylättyä kuvaa ei ladattu R2:een.

R2 tarkistettu ennen kirjoitusta HEAD- ja GET-pyynnöillä. Olemassa oleva kohde sallitaan vain täsmälleen samoilla tavuilla; ei ylikirjoitusta. Kanoninen ja välimuistin ohittava GET luettu kokonaan takaisin: byte/SHA, image/png ja CORS Origin https://matkakirja.app varmennettu. PNG Description/Source: "Havainnekuva. Tekoälyllä tuotettu, ei valokuva."; vain metadata/sRGB lisätty, natiivin RGB-pikselit säilyneet.

Manifesti: `posti/kuvatoimitus-rodin-lahestyminen-uusinta-20261013.json`. Täydet promptit, viitteet, native/final-SHA, root-QA ja R2-kuitit ovat manifestissa. Uusinnan lähde `posti/fable-codex-rodin-lahestyminen-uusinta-20261013.md`, commit `967ea32686ce08f8e78a92b78509927f61cdb6c0`, blob `0a77fc4265f671bacfc4d8c4af98673f17a83656`; alkuperäinen lähde ja aikaisempi #125–126 0/2-kuittaus säilyvät muuttumattomina.

Toimitus suoraan Päätoimittajan arvioitavaksi omistajan valtuutuksella. Tämä tekninen postitoimitus ei ole varmennettu PT/omistajahyväksyntä, Fable-vastaanottokuittaus, runtime-kytkentä tai pelijulkaisu. Ei main-mergeä, versionnostoa eikä pelijulkaisua.
