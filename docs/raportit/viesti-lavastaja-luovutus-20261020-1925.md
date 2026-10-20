# Lavastajan luovutus 20.10.2026 klo 19.25 (Opus, medium)

Edellinen: `viesti-lavastaja-luovutus-20261020-1750.md` (70c46e621). Työkalut, opit ja säännöt ovat ennallaan. PT:lle enintään 3 riviä.

## ENSIN (uusi Lavastaja)
1. **Louvren Tripo-henkilöt → juna 209** (omistaja 19.12 PT:n kautta "käytä niitä"): proto-haara `lavastaja/louvre-tripo-liike` 2dada40f9
   (worktree `/Users/Shared/Claude/wt/proto-lavastaja-monalisa`, pohja natiiviseppa/juna-208 00aefd136). Merge-pyyntö lähetetty NS:lle
   (local_a9af6995) 19.2x. Proto-repolla ei ole etärepoa, joten haara on paikallinen.
   - `MuseoHenkilot.Paalla = true`. k1 (Codexin nainen, luuranko idle + walk) kävelee gg:ssä Ytimen `MuseoKavijat`-simulaatiolla.
     Walk-tahti on mitattu glb:stä (2 × 1,28 m / 2,333 s, `KavelySykliM`/`KavelyKestoS`). k2 ja vartija ovat kiinteitä esteitä
     (`MuseoKavijat.LisaaKiintea`, uusi `Ydin/Museo/MuseoKavijatKiinteat.cs`).
   - Testit: `MuseoKiinteatTestit` 1/1, Linssit 2184/2184, tarkista.sh ok. NS kirjasi 209-jonoon (yhdistää, kun 208 on lukittu).
   - LS 19.3x: opaskierros ei tarvitse muutoksia. VARAUS: jos `museo elama 1` laitetaan päälle Louvressa, kaksi simulaatiota eivät näe toisiaan → siirrä k1 Elaman simuun.
   - Älä aja kaanna.sh:ta ja tarkista.sh:ta yhtä aikaa (sama rakennus-dll → Abort trap 6).
2. **k2:n ja vartijan luuranko** (omistaja 19.23 hyväksyi): PT tilasi Codexilta samaan `louvre-kavijat-v2`-toimitukseen (idle + walk).
   Kun ne tulevat: media `louvre-ihmiset-v1`:n rinnalle (vienti JU), k2 `Kavelevat`-listaan; vartija pysyy tuolilla idlellä (tarkista mitoitus).
3. **Codex PT738-K1…K4** (4 uutta kävijää, posti 7ccc398a2): kokoa, kun ne tulevat. Ne lisätään `Paikat`/`Kavelevat`-listaan tai
   `MuseoKavijaMallit`iin, sen mukaan, ovatko ne Tripo-luurankomalleja.
4. **Codex PT734–737 → rakennukset-v13**: 19.25 vielä 0 glb:tä. Ohje on edellisessä luovutuksessa (pohja v12).
5. **Niken jalusta → juna 209** (omistaja 19.47, PT 19.5x): Codexin Tripo-jalusta (marmorinen laivan keula, posti 1d373f09d) tulee
   Salon Carrén päätyyn, nykyiseen paikkaan sc-nike (sali.json veistospaikat, jalusta ala (0, 0, −7,5), koko 2,2 × 2,4 × 3,2; Nike y 2,4).
   Portaikkoa ei tilata. Syy: sali-GLB:stä puuttuu jalusta, ja MuseoRakennus.cs:n väliaikainen laatikko (r. ~480) poistetaan, kun GLB
   latautuu, joten Nike leijuu. Kun keula tulee: mitoita niin, että sen yläpinta on Niken alapinnan tasolla (tai säädä paikka_y), lisää se
   veistokseksi tai jalustamalliksi MuseoRakennukseen ja vie media JU:lla. Kuva: Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261020/kk-1947-louvre-nike-ilman-jalustaa.png.
6. **Juoksupeli j9/j10-ilme → juna 209 eteenpäin, Louvren 209-työn JÄLKEEN** (omistaja 20.14, PT + PK 20.2x; havainnekuvat posti/juoksupeli-havainnekuvat-20261017b/):
   (1) VALMIS 20.5x: avoimet-v2:n 4 huonetta (juhlasali, tyohuone, puutarha, varasto) kuja-75:n molemmin puolin, ulkoseinä reunamuurin
       paikalla. Työkalut: `avoimet_sijoitus.py` → `avoimet/sijoitus.json`, `peking_tausta.py` 4. argumentti (AV-alueet), `aja_tausta_v7.zsh`
       → `peking/tausta8`, `pakkaa_tausta_v7.zsh` → `_valmiit/juoksupeli-kk-tausta-peking-v7-vienti-20261020/` (SHA256SUMS 8096cc91371b, mukana
       avoimet-sijoitus.json), `esikatsele_avoimet.py` → `esikatselu/avoimet-t8-lod0-*.png`. Ovet (16, säteillä auki) PK:lle, vienti JU:lle,
       NS:lle 209-jonoon. PK kytkee huoneet ja TaustaKansio v7 sekä porttiaukot pohja.json-muuriin kujan ovien kohdalle.
   (2) Kasvit ja puut pihoille: ruukkukasvit, granaattiomenapuut ja männyt (Tripo Codexilta).
   (3) VAIN Tripo: leluesteiden tilalle esineet (arkut, maljakot, pöydät, kantotuolit) ja eunukit luurangolla. Kun mallit ovat valmiit,
       mallien nimet PK:lle, joka vaihtaa esteet. Lavastajan tilausjärjestys PK:lle 20.2x: eunukit → esteet → kasvit.
7. **Pulu**: oma lippu `MuseoPulu.Paalla` pysyy pois. Koodikyyhky on omistajan hylkäämä. Tripo-Pulu v3 on omistajan katselussa KK:n kautta,
   ja se tarvitsee linturigin ja liikkeet ennen kuin se kytketään.

## LINJAUS (omistaja 19.25 PT:n kautta, pysyvä): "käytä vain tripo Malleja"
Kaikki hahmot, eläimet, esineet, koristeet ja kalusteet tehdään Tripolla Codexin kautta, ei käsin tai koodilla. Codexin koristeet 751–756
siirtyvät Tripoon. TARKENNUS omistaja 19.28: koskee vain UUSIA malleja; vanhoja ei etsitä eikä muuteta. Rakennukset-v13 jatkuu normaalisti.
PT 19.4x PÄÄTTI: 208 lähtee ennallaan. Junassa 209 Mona Lisan katsojat ja kävijät vaihdetaan Tripo-kävijöihin (PT738-K1…K4 + k1, k2, vartija),
ja vaihdon jälkeen Quaternius-ihmiset (kavijat-v1/v2) pois kokonaan, ei sekaisin. Odottaa Codexin toimitusta (louvre-kavijat-v2).

## Valmiit tällä vuorolla
- Tausta-v6 oli jo valmis (459cd7ebb2a4). Rivi "JONO TYHJÄ" lähetettiin PT:lle 18.1x.
- **Meridiaaniportin keskiaukko** (omistaja 18.39): säteillä tarkistettu auki läpi asti (lod0/1/2, törmäys, tausta-v6). Ei korjausta.
  PK:lle mitat: keskilinja x = 13,186 − 0,0355·(z + 380,906), z −394,70…−367,12, leveys 6,0, lattia 0, holvi 6,0 → laki 9,0.
  PK otti ne käyttöön (palaute-208 7980a4cb9, drone 4 m:n korkeudella). Skriptiä ei säilytetty (scratchpad).
