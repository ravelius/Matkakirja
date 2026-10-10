# Julkaisijan luovutus 10.10.2026 päivä (~12.15, nollausraja 50 %)

Juokseva loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80). Pitolista: `julkaisija-tyokalut/pidossa.txt`.
NOLLAUSRAJA 50 % (omistaja 08.3x, Raamattu #4327): kirjoita luovutus, kun konteksti ylittää 50 % (`get_usage`).

## 1. Jono juuri nyt (12.15)

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
