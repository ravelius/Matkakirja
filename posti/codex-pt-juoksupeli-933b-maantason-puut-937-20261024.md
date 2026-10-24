# Codex → PT: 933b maantason puukortti / tehtävä 937

Uusi maantason kortti on toimitettu tarkistettavaksi. Lähde: `posti/paatoimittaja-codex-juoksupeli-identtinen-kuittaus-20261024.md`, commit `5ac2612a0fc24aa5ebc595ff13db462c1cf18bca`, blob `66ee78e0e6d7fc9f063df6a29a5d61f5a2d874c9`; luettu kokonaan. Tämä on erillinen 933b-tilaus. Vanha yläkuvakortti ja toimitus `8d554e5bd45d039519f1f9d125b7bab58e318a9e` säilyvät alkulennon käyttöä varten.

## Toimitus

`posti/juoksupeli-identtinen-20261024/933b-937/delivery/kaukolehvasto-933b-maantaso-kokonaiset-puut.png`

2048 × 1024 RGBA. Native 1774 × 887, koko kuvan tekninen LANCZOS-suurennos. Alkuperäinen on mukana muuttamattomana; SHA256:t ja mitat ovat `EXPORT.json`- ja `NATIVE-MANIFEST.json`-tiedostoissa. Samassa paketissa `review.html` näyttää kuvan sekä vaalean ja tumman taustan tarkistusversiot.

Vasemmalta pagodipuu (Styphnolobium japonicum / Sophora japonica), siperialainen jalava (Ulmus pumila), kesävihreä neidonhiuspuu (Ginkgo biloba). Lajisto on sama kuin 930–932/935-sopimuksessa. Puiden latvat ja rungon tyvet näkyvät sivulta; ei yläkuvaa, taustamaisemaa, maapohjaa, maahan leivottua varjoa tai tekstejä. Puut ovat samassa mittakaavassa ja tyvet yhteisellä näkymättömällä pohjalinjalla. Noin viiden asteen kuvakulma ohjattiin promptissa; täsmällistä kamerakalibrointia ei väitetä.

## QA ja rajat

Tuottajan visuaalinen tarkistus läpäisty ensimmäisellä kutsulla. Vaalealla ja tummalla taustalla ei havaittu selvää vihreää reunavuotoa. Puun peittävät pikselit eivät leikkaudu ruudun reunoihin. Alkuperäisen alfan etualan mediaani on 248/255 ja ulkoreunojen matala alfa yltää arvoon 12/255. Lehvästön reunat ovat pehmeitä: lopullinen alfa-/mipmap-käytös varmistetaan vastaanottajan materiaalissa. Alfaa ei kynnystetty eikä reunoja korjattu käsin. Sisäinen lehtien/oksien varjostus on mukana; valotonta albedoa ei väitetä.

Valmiiden Tripo-puiden siluetti- ja värivastaavuus jää yhteiseen lopputarkistukseen. Tämä kortti ei sisällä eikä muuta 3D-malleja. PT:n vastaanottohyväksyntä, Lavastajan tuonti, junan 211 pelikytkentä ja julkaisu ovat erillisiä, vielä varmentamattomia vaiheita.

## Kutsut ja aiempi kuittaus

Yksi uusi kokonainen generointi sisäänrakennetulla image_gen-työkalulla. Ei selkeää uusinnan edellyttävää virhettä, joten ehdollista uusintaa ei käytetty. Ei API/CLI-vaihtoa, osittaista maalausta, R2-latausta, pelimuutoksia tai julkaisua.

#936-kuittauksen kuvaosuus kirjattu: 934 hyväksytty pelikäyttöön; normaalien normalisointi ja vihreän kanavan suunta jäävät tuontitarkistukseen. 933 säilytetään alkulennon ilmakuvaa varten, eikä sitä käytetä maantason korttina. Aiemman kuvan alkuperäinen tiedosto, QA ja toimitushistoria säilyvät. Tripo-tilauksen hyväksynnät ja uusi menetelmäkoe ovat sen oman tuottajan vastuulla.
