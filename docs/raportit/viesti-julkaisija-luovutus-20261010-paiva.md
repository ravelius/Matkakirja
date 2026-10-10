# Julkaisijan luovutus 10.10.2026 päivä (~12.15, nollausraja 50 %)

Juokseva loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80). Pitolista: `julkaisija-tyokalut/pidossa.txt`.
NOLLAUSRAJA 50 % (omistaja 08.3x, Raamattu #4327): kirjoita luovutus, kun konteksti ylittää 50 % (`get_usage`).

## 0. PÄIVITYS 14.00 (TF 177 VALMIS, tilinvaihto – lue ensin)

- **TF 177 (juna 176) TestFlightissa iOS + Mac, sisäisillä:** BUILD 177 = 3d0c8c4a74ee7abbe2c4b492c43e49973f2fe4c2
  (juna/b13 3bb291169). iOS TF 38045859955 → VALID id de01f563 (sisäinen 38046677422, 13.58). Mac 38045904847 → VALID
  id 9283cd4f (13.54). Ulkoinen ohitettu (tf177-ei-ulkoista). Muutosloki #4345 67705386b (Natiivisepän 4 riviä proosaksi
  validaattorin 3 lauseen / 280 merkin rajaan; teksti julkaisija-tyokalut/muutosloki-177-proosa.txt). muistiajo-177.txt OK 0.57.
- **#4346 MERGED 6eba562f1:** iOS-sisäinen tarkistus löysi ensin Mac-buildin samalla numerolla → työnkulut antavat nyt
  `--alusta IOS` (Mac jo MAC_OS). Jatkossa: jos iOS- ja Mac-build samalla numerolla, tarkista VALID-id:t eri.
- **TAUKO (omistaja 12.5x):** vain bugikorjaustyöt, kunnes tilinvaihto on tehty. Pidossa (pidossa.txt): #4344 (Karttaseppä),
  LS1 museo2-simu, LS1 Mac-toisto, LS2 Pekingin vesikuvat. LS1:n KIIRE 2 (iPadin kohdemerkit) → seuraava juna tilinvaihdon jälkeen;
  LS1:n johtolanka: TF 176:sta puuttuu 68f860e85 (EnhancedTouch-suojaus), TF 177:ssä on → vika voi olla jo korjattu.
- **Jono 14.00:** LS1 diag-käännös pallomerkit-176-ilman-et (~4 min) → simu iPad11 BDB4E6B6 (~5 min, vahti 16 pid 68105).
  Muuten lukko ja simut vapaat. LS1 pyytää lukon Julkaisijalta myös diagnoosikäännöksiin (sovittu).

## 0a. PÄIVITYS 12.35

- **Tila 12.35:** käännöslukko VAPAA, lukkojono tyhjä. Simussa LS2 A26BC7D0 (~12.45 asti; muistivahti 16 käynnissä,
  pid 15443). Simujono: LS2 → **LS1 museo2** (`simuvuoro-museo2.zsh e325c3bb7`, iPad 00CF62C2 + iPhone T7-UDID BD64C8E4,
  ~15 min, vahdit 16) → muut. Vanha vahti 8362879F (Siirtoseppä, simu jo alhaalla) jäi pyörimään, harmiton.
- **Roolit tietävät paluusta** (12.33 viesti PT:lle, Natiivisepälle, NUI:lle, LS1:lle, LS2:lle, Siirtosepälle, Pelikoodarille,
  Sisältökirjurille). Natiiviseppää pyydetty lähettämään BUILD 177:n täysi SHA + muutosloki PT:n kautta lukituksen jälkeen.
- **ETUSIJA vuoroissa:** NUI:n ja LS1:n TF 176 -korjaukset → Natiivisepän muistiajo (muistiajo-177.txt) → muut.
- **TF 177 (juna 176) -resepti, iOS + Mac heti Natiivisepän lukituksen jälkeen:**
  1. `muutosloki-api.sh 177 "<PT:n hyväksymä teksti>"` → muutosloki-merge-SHA.
  2. `tf-kaynnista.sh 177 <BUILD 177 täysi SHA> <muutosloki-merge-SHA>` (tf177-ei-ulkoista on jo luotu → vain sisäinen).
  3. Mac: Natiiviseppä ajaa `mac-kaanna.sh <SHA> 1.1 177` (phonon-bundlejen pysyvä korjaus Rakennus.MacOS:issa junassa 177) →
     `gh workflow run proto3d-mac-testflight.yml --ref main -f build=177 -f lataa=true -f sisainen_ryhma=true`.
  4. "TestFlightissa" PT:lle vasta Applen VALIDin jälkeen (molemmat alustat erikseen).

## 0b. PÄIVITYS 12.4x

- **TF 176 VALMIS molemmilla alustoilla:** iOS (VALID, sisäinen 11.24) ja **Mac TF 176** ajo 38040911547 (VALID, sisäinen).
  Mac-uusinta tarvittiin: Steam Audion PlugIns/phonon.bundle + audioplugin_phonon.bundle ilman CFBundleIdentifieriä (altool
  90276/90334); Natiiviseppä korjasi käsin, pysyvä korjaus Rakennus.MacOS:iin junaan 177.
- **OMISTAJA 12.4x (PT):** "kaikki korjauspyynnöt seuraavaan julkaisuun, julkaisu heti kun valmiit" → **TF 177 (juna 176) iOS + Mac
  heti Natiivisepän lukituksen jälkeen.** Vuoroissa ETUSIJA: NUI:n ja LS1:n TF 176 -korjaukset → Natiivisepän muistiajo → muut.
  Muutosloki Natiiviseppä → PT → Julkaisija. tf177-ei-ulkoista luotu; muistiajo-177.txt tulee Natiiviseppältä.
  Resepti: muutosloki-api.sh 177 "<teksti>" → tf-kaynnista.sh 177 <BUILD 177 täysi SHA> <muutosloki-merge-SHA> → Mac:
  Natiivisepän mac-kaanna.sh … 1.1 177 → `gh workflow run proto3d-mac-testflight.yml --ref main -f build=177 -f lataa=true
  -f sisainen_ryhma=true`. "TestFlightissa" PT:lle vasta Applen VALIDin jälkeen.
- PR:t #4341 (983a58c67), #4342 (4c1f8178c), #4343 (6f7a16b6a, pollo-julkaisu success) MERGETTY.
- Jono 12.4x: lukko vapaa; simussa LS2 A26BC7D0 (~12.45 asti) → LS1 museo2 (2 simua, `simuvuoro-museo2.zsh e325c3bb7`,
  iPad 00CF62C2 + iPhone T7-UDID BD64C8E4). Siirtosepän vaihearkki 648e2395f tehty 12.29. NUI pallo tehty 12.3x.

## 1. Jono (12.15, vanhentunut – ks. kohta 0) (12.15)

- **Lukossa:** LS1 museo-kombo-176 48c4d9f28 → linssiseppa-app/museo-kombo-176.
- **Simussa:** LS2 A26BC7D0 ~20 min (kupola A/B + ND edestä, .app lokit/linssiseppa2-app-cupola-bae9b17), alkoi 12.11, vahti 16.
- **Lukkojono:** Siirtoseppä 023c37675 (esittely-vaiheet-v46z, kaksoiskäynnistyksen korjaus) → käännös + heti simu 8362879F.
- **Simujono:** LS1 museo2 (~15 min, `simuvuoro-museo2.zsh <kombo-SHA>`, iPad 00CF62C2 + iPhone, T7-UDID BD64C8E4 = LS1:n "D0D2CD1E")
  → Siirtoseppä 8362879F. LS2:n Pekingin pari myöhemmin (#4343 mergetty 6f7a16b6a → pollo-julkaisu).
- Päivällä enintään 2 simua; Natiivisepän 6.7-työt aina kärkeen. Simu saa pyöriä käännöksen rinnalla (juna/TF edelle).
- Muistivahti jokaiselle simulle: `perl … setsid … simu-muistivahti.zsh <TÄYSI UDID> 16` (kevyt 12).
  HUOM: `pgrep … | head -1 || perl …` ei käynnistä vahtia (putken paluuarvo) → `pgrep -f … >/dev/null || perl …`.

## 2. TF:t

- **TF 175 HYLÄTTY (Apple ITMS-90208)** → **TF 176 = 175:n sisältö** (BUILD 86ef3b3e6, Unity 6.7), PT 11.0x vaihtoehto A.
  iOS TF 176 ajo 38037110537 → Apple VALID, sisäisessä ryhmässä (38037565015, 11.24). Ulkoinen ohitettu (ulkoinen-kielletty).
  **Junan 176 sisältö lähtee buildinumerolla 177** (haara- ja osoitinnimiä …-176 ei muuteta; PT kirjaa numeroinnin).
- **Mac TF 176** ajo 38040658364 (lataa + sisäinen), Natiivisepän .app Matkakirja-proto-mac/Build/mac. Odottaa Applen VALIDia →
  rivi PT:lle ("TestFlightissa" vasta käsittelyn jälkeen). MatkakirjaMacSyote.bundle minos 13.0 (kuten Mac 172) – jos Apple valittaa,
  Natiiviseppä korjaa junaan 177.
- muistiajo-176.txt = 175:n tulos (OK d85e703fc 0.72). tf176-ei-ulkoista asetettu.

## 3. Päivän korjaukset (pysyvät)

- **6.7-editori sisäisellä levyllä** /Applications/Unity/Hub/Editor/6000.7.0b4 (symlinkki /Users/Shared/Claude/unity/6000.7.0b4 → sinne).
  Syy: launchd/Actions-ajot (juna-vahti, runner) jumittuivat T7-editorin open()/opendir-kutsuihin. T7-kopio jää varalle; Natiiviseppä
  ei poista sitä ilman ilmoitusta. Käännöskopion vanhat T7-polkuiset Bee-dagit siirretty Library/Bee-t7-vanha-20261010/.
- **proto-kaanna.sh:** LuoPallo unity-vahdin alla + 1 uusinta jumissa; kopio_puhtaaksi EXIT-trapissa (myös VIKA-poluilla).
  Varmuuskopiot .ennen-luovahti-20261010, .ennen-exit-siivous-20261010.
- **TF-työnkulku:** #4334 (käynnistysjumi → 30 s + uusinta), #4338 (UnityRuntime.framework MinimumOSVersion = deployment target;
  pysyvä korjaus Natiivisepän juna-176:ssa e9c29facd), #4340 (käsiajo → ::error + exit 1 ohitussyyn kanssa; "jo ladattu" vain yöajolle).
- **tf-ketju-pohja.sh** pysähtyy VIRHE-riviin, jos "Lähetä TestFlightiin" ei ole success (ei sisäistä ajoa).
- **vie-paketti.sh:** .astc/.astcm → application/octet-stream. Iso paketti: aja `--osa=I/4` rinnakkain perl setsid -irrotuksella
  (taidemuseon ASTC katkesi kahdesti ilman yhteenvetoa; jatko onnistui, "oli jo" ohitetaan).
- yo-testflight-viimeisin.txt palautettu c47bded2c:ksi (176:n uusintaa varten), varmuuskopio .ennen-176-20261010.

## 4. Osoittimet ja viennit

- uusin-4 = **v6k9** (v6k6 + ND-parvis v3h, PT 11.4x). v6k5 (kaupungintalo) EI vientiin ennen LR:n v2:ta.
- Taidemuseo ämpärissä: taidemuseo/alankomaat/{lahde (teokset.json, teokset.v2.json, teokset.patsaat.v2/.v2.1/.v2.2.json, kuvat/),
  patsaat/, grafiikka/ (+ teokset.grafiikka.v2.1.json), astc-v1/ (5344), astc-v1/patsaat/ (101), sali-v1/ (18)}.
- Muut: vesi-v7 (Karttaseppä; kytkentä LS2:n haarassa erikseen), opas-havainnekuvat (95), olavinlinna-vaihe-esittely-v2.
- Levy ~72 Gi (6.7-editori 15 Gt sisäisellä). 13 appikopiota NAS:lla (lokit/), linssiseppa2-app-173pbr2 palautettu.

## 5. PR:t

- Taustalla merge-vihreana: **#4341** (webin ikäkysely, e0e6d8163; worker #4337 on tuotannossa, esilento sallii x-matkakirja-aikuinen)
  ja **#4342** (kartalla vain kaupungin oma kappale + aloituslento ilman musiikkia, a31a95421; ajetaan #4343:n jälkeen samalla
  merge-ketjulla). Tarkista, että molemmat mergettiin (`gh pr view`).
- Mergetty tänään: #4327, #4332, #4334, #4335 (POLLO_IP_SUOLA-secret luotu), #4336, #4337, #4338, #4339, #4340, #4343.

## 6. Kielletyt tavat

Ei `zsh -c`/`bash -c`/eval → skriptit tiedostoon. Ei rm muuttujapoluilla. Ei pkill -f laajoilla kuvioilla (vain oma pid).
