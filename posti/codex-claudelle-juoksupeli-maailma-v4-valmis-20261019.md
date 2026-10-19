# Codex → Claude: juoksupelin ympäristöpaketti v4 valmis paikallisesti (19.10.2026)

Omistajan pyytämä erillinen juoksupelin grafiikkatyö on edennyt rajattuun v4-toimitukseen. Tämä täydentää työskentelyilmoitusta 5886a46bdad18f1e9f5ef547cac73e1efb0c11a4 ja PT:n kuittausta cf5f8020c3f69dfa4ea19e36f4aafb76020ec244. Pelin koodia tai sen tuotantohaaroja ei muutettu. Peliin tuonti ja toiminnan hyväksyntä ovat erillisiä vaiheita.

## Toimitus

Juuri: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-maailma-v4-20261019/`

- `claude-maailma-v4.zip` — 134890365 tavua, 177 tiedostoa.
- SHA256: `5d4d0e98de081cbf480eeaa3e3c47bd0d8002f2c1a728d07e5e1bd649d022f72`.
- `HANDOFF.md` — tuonti, koordinaatit, mitat, lähteet ja avoimet integraatiokokeet.
- `checkpoint.json` — stage=complete; ZIPin ulkopuolella, samassa juuressa.
- `qa/package-verification.json` — CRC ja kaikkien arkistotiedostojen SHA256 tarkistettu.
- `preview/index.html` — paikallinen katselusivu, video ja kuva-arkit.
- `preview/pihalta-huoneisiin-ja-muurille.mp4` — 22,208 s / 533 ruutua / 24 fps; SHA256 `7fe87e9340f9cbc464af31121fe11d00f3c550009ad83be6be123470b019bb86`.

## Sisältö

10 visuaalista osaa ja 10 collision-osaa sekä molempien yhdistelmäversiot: 22 GLB:tä ja 22 FBX:tä. Neljä eriväristä huonetta (juhlasali, työhuone, varasto, puutarha), huonekierto ja oviliitokset, piha, ramppi, kääntyvä ja katkeileva muuri sekä kattotasanne. Olemassa olevia Tripo-esineitä ja kaupungin hallimallia hyödynnettiin; neljä omenan poimintapistettä on merkitty manifestiin. Puyi v7 toimii esikatseluhahmona.

Osat ovat jo maailman koordinaateissa: tuo identiteettitransformilla. Älä lisää manifestin aiempia sijoituksia toistamiseen äläkä käytä yhdistelmämaailmaa ja sen samoja osia päällekkäin. Visualissa on 266412 kolmiota / 1997 mesh-solmua; collision-yhdistelmässä 2844 / 200. Osakohtainen näkyvyys, batching ja laitemittaus tarvitaan.

## Tarkistettu ja avoinna

22 GLB:n rakenneauditointi ja 22 FBX:n takaisinluku läpäisty. Reittigraafin 55 reunaa ja 19308 tukinäytettä tarkistettu staattisesti. Videon 533 kameraruudussa hahmon projektio mahtuu kuvaan ja kohdistussäde on vapaa; oven lähennykset pehmennetty. Koko MP4 purkautuu virheettä. Näyteruudut katsottu, mutta tämä ei ole pelin runtime- tai fysiikkatesti.

Video näyttää pihan, kaksi huonetta ja rampin muurin alkuun, takaa yläviistosta. Se ei esitä hyppyaukon ylitystä tai katolle saapumista; katon esikatselu on still-kuvana. Kameran ennakointi hyödyntää tunnettua tulevaa reittiä, joten se ei ole valmis Unity-kamera. Esikatselunopeus noin 2,74 m/s poikkeaa pelin nopeuksista. Ohjain, hyppyjen ajoitus, vartijoiden jatkuminen huoneiden läpi, poiminnat, omenan lentorata, jalkakontaktit/IK, colliderien täydentäminen pihan vapaalle alueelle, URP ja mobiilisuorituskyky jäävät vastaanottajan integraatioon. Katso HANDOFF.md ja qa/QA.md.

V2, V3 ja lähdemallit säilyvät muuttumattomina. V4:n uudet Tripo-jobit, krediitit ja kuvageneroinnit: 0. Ei asennuksia, käyttöoikeusmuutoksia tai ostoja. GLB/FBX/ZIP ovat paikallisella T7-levyllä, eivät gitissä.

## Hahmopyyntöjen peruutus

#436/#437-lisäkorjaukset lopetettiin #439:n mukaisesti (lähdecommit 07910288f162702b712d0735c7fc3b61257626c3, blob 4089982c316ceb5bab48a2294c91263a356fc111; koko sisältö varmennettu). Vain alkuarvio tehtiin ja säilytettiin erillisessä corrections-20261019-pt-436-437-kansiossa. Hahmomalleja tai tekstuureja ei muutettu. Omistaja ohjaa jatkotyötä suoraan.
