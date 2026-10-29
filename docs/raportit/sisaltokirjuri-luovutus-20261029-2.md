# Sisältökirjuri: luovutus 29.10.2026 (täydentää -20261029-1)

Tila: PT:n kiire (viikkoraja 97 %) → agentit pysäytetty, luovutus mainiin.

## Valmista (PR:t JU:n jonossa tai mergattu)
- Mergattu: 5550 Slovakia, 5551 Islanti, 5556 Montenegro, 5558 Pohjois-Makedonia, 5559 Albania (maakunta), 5508 Požega.
- Auki (JU mergeää): 5562 Malta, 5563 Kypros, 5565 Luxemburg, 5566 Latvia, 5569 Valko-Venäjä, 5570 Liettua. Raportit docs/raportit/maakuntatekstit-<maa>-20261029.md.
- Rikotut-historiat (juoksupeli): valmis ja PK:n haarassa (8d8611882); ei jatkoa SK:lle.

## Kesken
- Bosnia ja Hertsegovina (BIH, 18 avainta): agentit pysäytetty ennen tulosta, mitään ei kirjoitettu eikä haaraa pushattu. Aloita alusta: avaimet kahteen JSON-tiedostoon (federaation kantonit 10; Republika Srpskan alueet 7; Brčko), aluetyypit "kantoni" / "alue" / "Brčkon piiri", yksi neutraali virke entiteetistä, asukasluvut 2013 tai pois.

## Seuraavaksi
- Bosnia (yllä). Mikrovaltiot (AND, MCO, SMR, VAT, LIE) ja Kosovo puuttuvat pakista ja kartta-aineistosta: Karttaseppä lisää avaimet ensin (PT:n pyynnöstä), vasta sitten SK. TUR/RUS odottavat PT:n ratkaisua Euroopan/Aasian rajasta. Muut maanosat vasta omistajan päätöksellä.
- Työtapa: docs/tuotanto/reseptit/maakuntateksti-koko-maakunta.md; haara per maa origin/mainista tässä checkoutissa (muita worktreetä ei ole); agentit kirjoittavat vain scratchpadiin; korjaukset skriptillä; `node tools/sisalto/maakuntateksti-aseta.mjs <ISO3> tekstit.json` + `node --test tests/maakunnat-luonnehdinnat.test.mjs`.

## Opitut asiat (uudet)
- Rinnakkaiset maa-agentit (5 kerralla) toimivat: avaimet JSON-tiedostoina, jokainen maa omaan haaraansa, agentit vain scratchpadiin.
- Eri agenttien asukasluvut tulevat eri vuosilta (Liettua: 2023 vs 2021): hae yksi taulukko (citypopulation.de/en/<maa>/admin) ja korvaa luvut skriptillä ennen asetusta.
- Tuoreen lukijan ohitin pienillä maillani (3–10 lyhyttä tekstiä): luin ja korjasin itse; poistin ranking-, tarkkaluku- ja vuosiväitteet.
- Kuramaa (ei Kuurinmaa) on pelin yhteinen nimi (maakunnat-nimet.js, paikallisaarteet).
- Luxemburgin piirit lakkautettu 2015, mutta kartta-avaimet säilyneet: teksti "entinen piiri", asukasluvut 2014.
