# Natiivisepän luovutus 7.10.2026 (tilin 5 tunnin tauko 13.45–15.00)

Luovuttaja: Natiiviseppä (Opus 5.5, high). Edellinen: viesti-natiiviseppa-luovutus-20261005-iltapaiva.md (käytännöt voimassa).
Tarkempi lokirivistö: muisti natiiviseppa-tila-20261003.md (uusin rivi ylimpänä).

## ALOITUSVIESTI (Päätoimittaja herättää klo 15.00 jälkeen)

Olet Natiiviseppä (Opus, high). Lue tämä osio, MEMORY.md ja natiiviseppa-tila-20261003.md. Kytke Remote Control päälle.
Juna-SHA:t otetaan vain PÄÄTOIMITTAJAN suoralla kuittauksella; käännökset, simut ja iPad vain Julkaisijan NYT-viestillä.
Tarkista ensin taustalla jatkuneiden ajojen tulokset (alla) ja kerro ne Julkaisijalle ja PÄÄTOIMITTAJALLE.

## TILA 14.0x (tauko peruttu 13.47)

- **Mac lepo:** 13.36-ajon "vika" oli mittausvirhe (selain peitti ikkunan → oikein "piilossa"). mac-cpu.sh korjattu (ikkuna
  400,100 ja eteen open -a + napsautus; C = sovellus piilotettu cmd+H, koska Spacen vaihtoa ei saa automatisoitua).
  4975a36c (Cesium suspendUpdate + piirtoväli 30 piilossa): A 16,3 / B 7,5 / C 3,0 % (TF 159 ~15 % kaikissa).
  **755597cf** (+ runInBackground pois piilossa) Julkaisijan jonossa ~14.14 → mac-cpu.sh → luvut Päätoimittajalle.
- **FACEIT:** 14.02-ajo: A-peili a0e53749 antaa nyt latausvirheen (12.48 toimi) → kysytty Siirtosepältä, ajo pysäytetty.

## TAUON TILA (13.34)

- **Mac TF 160 LADATTU** (run 37606997700 success; app lokit/natiiviseppa-mac-tf-160-d8b0e0fc, fi.matkakirja.peli, build 160).
- **Mac lepo -dev 28da7435** käännetty (lokit/natiiviseppa-mac-lepo-28da7435, Nakyvyys-symboli mukana). mac-cpu.sh jälkeen-ajo
  käynnistetty 13.34 setsid → lokit/natiiviseppa-mac-cpu/jalkeen-28da7435/cpu.txt (+ "Mac-ikkuna"-lokirivit). Tarkista ja lähetä
  luvut Päätoimittajalle (ennen A 14,8 / B 14,9 / C 15,5 %; tavoite C < 2 %). Sen jälkeen Mac-intro-kaappaus ja panorointi.
- **LEPO-MITTAUS 13.36 (28da7435) — VIKA, EI VIELÄ PÄÄTOIMITTAJALLE:** A 3,7 / B 4,0 / C 4,4 / D 4,6 %. Lokissa vain YKSI rivi
  "Mac-ikkuna piilossa → 1 fps" koko ajon ajan → MatkakirjaMacSyote_Nakyvyys palautti bitin 0 = 0 myös näkyvänä, joten peli oli
  1 fps:ssä kaikissa tiloissa (A:kin). Tutki: kutsutaanko pääsäikeeltä (AppKit-ominaisuudet muualta = roskaa → dispatch_sync main
  tai NSWindowDidChangeOcclusionStateNotification-tarkkailija, joka päivittää atomista tilaa), onko Unityn ikkuna [NSApp windows]-
  listassa, occlusionState-arvo. Lisäksi 1 fps maksaa silti ~4 % → tavoite < 2 % vaatii myös esim. Cesiumin/taustasäikeiden
  pysäytyksen tai OnDemandRendering-välin. Ikkuna oli eri paikassa (560,50 1440×928), joten napsautukset eivät osuneet: aseta
  mac-cpu.sh:ssa ikkunan paikka (System Events set position/size) ennen napsautuksia. Mac TF 161:een vasta korjattuna.
- **FACEIT-uusinta KESKEN**: ipad-faceit-aabb.sh korjattu (rivinumero ilman välilyöntejä — se hylkäsi hyvät jaksot; lämmityksen
  jälkeen linssi pois + 30 s). Viimeisin ajo 13.23 kaatui: devicectl "application failed to launch (error 10002, Invalid
  argument)" — todennäköisesti edellisen konsoliajon tappamisen jälkeen. 15.00 jälkeen: tarkista iPad (devicectl list devices),
  aja `perl … faceit-uusinta-ajo.sh` (Julkaisijan lupa on), tulos lokit/natiiviseppa-faceit-uusinta.txt → yksi rivi Päätoimittajalle.
- **JUNA 161 KUITATUT (Päätoimittaja 13.3x, kokoa tauon jälkeen BUILD 160 d8b0e0fc:n päälle):** LS1 esitys-giza **741625b8d**
  (ehto: Giza vain kokeilukytkimen takana), eleet-2 **67728f0b**, kirjoitusääni **074c95a3**, kehittaja-tf **767c70eb** (⊇ 270992bd),
  kaupunkipallot **aa32b618b**, worldview-vakiot LS2:lta (SHA kysyttävä LS2:lta). EI VIELÄ: NUI pariisi-esitys (uusi SHA tauon
  jälkeen stilleistä, EI 5c3d45e6), Macin vSync + lepo 28da7435 (CPU-luvut ensin; vSync 107fabeb on 074c95a3:ssa — jos lepo ei
  ehdi, kysy Päätoimittajalta, meneekö 074c95a3 vSyncin kanssa). LS1 torjunnan kesto / NUI lippurivi: tarkista Päätoimittajalta.

## TILA HETI

- **BUILD 159 = master b00c06f7**; TF 159 ja Mac TF 159 ladattu. Mac TF -työnkulku: proto3d-mac-testflight.yml
  (`mac-kaanna.sh <SHA> 1.1 <build>` MATKAKIRJA_APPSTORE=1 + MATKAKIRJA_BUNDLE_ID=fi.matkakirja.peli, kopio
  lokit/natiiviseppa-mac-tf-<build>-<sha>, lataus vasta Julkaisijan luvalla).
- **BUILD 160 = proto master d8b0e0fc** (12.5x: juna/b13 603cfd8a → 2309f55d, juna.log kirjattu). Julkaisija tekee
  muutosloki-PR:n ja TF 160:n; Mac TF 160 (`mac-kaanna.sh d8b0e0fc 1.1 160`, APPSTORE=1) vasta Julkaisijan luvalla.
  Mac-kaanna 074c95a3 (dev) vasta NUI pariisi-esityksen jälkeen Julkaisijan uudella KÄÄNNÖS NYT -viestillä.
- **JUNA 161 -korjaukset:** haara natiiviseppa/juna161-korjaukset **074c95a3** (wt/proto-natiiviseppa-kirjoitus) =
  kirjoituskoneääni f222e5eb (Aloitusnakyma soittaa Tehoste("pen") sanoittain, kuten webin KIRJOITUSRYTMI; iOS + Mac) +
  Mac vSync 107fabeb (Ruudunpaivitys: Macilla vSyncCount = näyttö/fps, oli 0 → repeämä) + lokirivi "MATKAKIRJA ruutu: Mac vSync".
  - KÄÄNNETTY 12.53 (yhdistelmä af5922b95, polku ilmoitettu Julkaisijalle, LS1:lle ja LS2:lle): iOS-yhdistelmä 074c95a3+47622521f(LS1 yövalot)+e16d100db(LS2 pallo-puoli), loki
    lokit/kaannospalvelu/20261007-124705-*.log, app-kopio lokit/natiiviseppa-juna161-koe/. Valmistuttua appin polku ja
    yhdistelmän SHA Julkaisijalle, LS1:lle ja LS2:lle. Sitten mac-kaanna 074c95a3 (dev, 1.1).
  - iOS TODENNETTU 13.01 (Päätoimittajalle ilmoitettu): lokit/natiiviseppa-savu161-ennen/intro-ennen-aani.wav (a5b381a7) vs
    natiiviseppa-savu161b/intro-jalkeen-aani.wav (af5922b9), molemmat "Laita äänet päälle" + Aloita seikkailu, kaappaa 16:
    puhe kohdistuu 0,99, jälkeen 19 lyöntiä yli puheen (yläkaista > +10 dB), ennen 0. ÄÄNET PÄÄLLE TARVITAAN (pois = mykistys).
  - Päätoimittaja KUITTASI kirjoitusäänen junaan 161. VSync + Macin lepo kuitataan Mac-todennuksen jälkeen.
  - MACIN AUTOMAATTINEN LEPO (Päätoimittaja 13.0x, omistajan Mac TF: ~30 % CPU piilossa): **28da7435** (sama haara, 074c95a3:n
    päällä). MatkakirjaMacSyote_Nakyvyys (occlusionState/isMiniaturized/isHidden/isActive+keyWindow) → Ruudunpaivitys.MacLepo:
    piilossa 1 fps + AudioListener.pause, ei valittuna ≤ 10 fps (ääni soi), vSync-jakaja > 4,5 → vSyncCount 0. Lokirivi
    "MATKAKIRJA ruutu: Mac-ikkuna …". unity-tarkistus 0 virhettä (Mac ja iOS).
  - MAC-KÄÄNNÖS: mac-kaanna **28da7435** (dev, 1.1) Julkaisijan jonossa 15.00 jälkeen (LS1 gizan perään). Sitten
    `zsh lokit/natiiviseppa-skriptit/mac-cpu.sh "<proto-3d/Matkakirja-proto-mac/Build/mac/Matkakirja 3D.app>" lokit/natiiviseppa-mac-cpu/jalkeen-28da7435`
    (A valittuna, B näkyy ei valittuna = ikkunaton Tyhja.app etualalla, C kokonäyttö toisessa Spacessa, D takaisin) + intro-kaappaus
    + nopea panorointi. ENNEN (TF 159, aloitusnäkymä): A 14,8 %, B 14,9 %, C 15,5 %, D 15,5 % (lokit/natiiviseppa-mac-cpu/ennen-159).
    Tavoite C < 2 %. Luvut Päätoimittajalle. Huom: mac-cpu.sh:n napsautukset eivät edenneet aloitusnäkymästä (sama tila jälkeen-ajossa).
  - Mac repeämä ENNEN: TF 159 -kopiolla lokit/natiiviseppa-mac-repeama/ennen-panorointi.mov (hiiri veda 700 550 1300 550 0.25 16).
    screencapture tallentaa koostetun pinnan, joten repeämä ei näy kuvissa; juurisyy on koodissa (vSyncCount 0).
- **Muut juna 161 -ehdokkaat (odottavat Päätoimittajan SHA-vahvistusta):** LS1 torjunnan kesto, Siirtoseppä eleet-2 **67728f0b**
  (korvaa 1ca51a6b; kytkimet poikki eleet / poikki puolilahi), NUI lippurivin kielikorjaus, NUI kehittaja-tf **767c70eb**
  (korvaa 270992bd ja bb05c48a; testaajatilan pois kytkentä sulkee sen avaamat esittelylinssit, apurahakortin linssit jäävät). kehittaja-tf todennetaan App Store -käännöksellä: ilman koodia ei Kehittäjä-riviä; testaajakoodilla
  (Päätoimittajalla) kaikki linssit ja vapaa liikkuminen ilman Kehittäjä-riviä; täydellä koodilla (POLLO_KEHITTAJAKOODI
  tiedostossa ~/.matkakirja-avaimet-koodaus.zsh) kaikki, myös Giza-kytkin. Koodia ei lokiin eikä viesteihin.
- **iPad FACEIT ABAB MITÄTÖN** (lokit/natiiviseppa-ipad-faceit-20261007-1248, ilmoitettu Päätoimittajalle + Siirtosepälle): A peitto-tilassa
  300/300 piirretty (16,68 ms, GPU 9,4 ms), B jäi paikallaan-tilaan (piirretty 2–108), pari 2:n poikkileikkaus aukesi 5 min viiveellä.
  UUSINTA PÄÄTETTY (Päätoimittaja 13.1x): 15.00 jälkeen Julkaisijan iPad-vuorolla
  `perl -e 'use POSIX; exit if fork; setsid; exec "zsh", @ARGV' lokit/natiiviseppa-skriptit/ipad-faceit-aabb.sh` (lohkot A B B A, lämmitys +
  2 jaksoa, tilavahti 300/300 peitto, hylkäys), sitten `python3 faceit-analyysi.py <O>` → YKSI RIVI Päätoimittajalle:
  FACEIT-hinta ms ja raja 0,3 ms. faceit-analyysi.py regex korjattu (rivi\s+).
  SIIRTOSEPÄN SYY: DioraamaLevyvalimuisti.SiivoaVanhat pitää vain nykyisen paketin → jokainen A↔B-vaihto lataa erot uudelleen
  (Wi-Fi minuutteja). Uusinnassa: odota ennen "tila kappeli" lokia 'saapuminen alkaa|latausvirhe' (aikaraja 600 s) + 20 s, ja aja
  lohkoina AABB / BBAA (yksi vaihto, ensimmäinen avaus lämmittää).
- **Actions-ajurit** siirretty /Users/Shared/Claude/actions-runner(-2) (muisti actions-ajurit-shared-polussa).
