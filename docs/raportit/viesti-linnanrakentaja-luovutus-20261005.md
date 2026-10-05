# Linnanrakentajan luovutus 5.10.2026 noin klo 06.1x (Opus high; tilinvaihto noin 07.15)

Päätoimittaja: `local_5df52e10-10e4-4b72-9554-0049db300dfe`. Siirtoseppä: `local_86d0c984-aeeb-430d-bc85-3112f27b9437`.
Natiiviseppä: `local_674b9ec4-e2f3-48e9-a810-a129f20a4f03`. Julkaisija: `local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914`.
Viestit SendMessage; jos socket on vanhentunut, mcp__ccd_session_mgmt__send_message session_id:llä.
Edellinen luovutus: `viesti-linnanrakentaja-luovutus-20261002.md`. Olavinlinnan avoimet: `olavinlinna-avoimet-20261004.md`.

## Junan 143 linna: Päätoimittaja valitsi AO-B:n 5.10. → yksi yhdistetty peili
- Paketti `_valmiit/olavinlinna-blender-v30` (MUUTOKSET.md): v29-ao (kontakti-AO kuoreen, keittiöön ja kappeliin) + 8k-valokartta
  + bilineaarinen täyttötasoitus. Blender **3d59b30a48c612f2** on ämpärissä. KOE-blender.json 00d88a2b8 on haarassa
  `linnanrakentaja-kuori-ao` (worktree `/Users/Shared/Claude/wt/linnanrakentaja-kuori-ao`).
- Peiliajo `vie-dioraama.yml` (kuiva=false, osoitin=false): run 37257924683. Tarkista tulos ja lähetä peilin hash
  Päätoimittajalle ja Siirtosepälle. Siirtoseppä kuvaa sen A:ta (c116f02f) vastaan, ja Päätoimittaja vie parin omistajalle osoitinpäätöksen yhteydessä.
- **Osoitinta ei vaihdeta.** Omistajan Run-rivi avainsanapaketille 8f4eb611 on tiedostossa `docs/raportit/osoitin-8f4eb611-omistajalle.md`
  (#3974 junassa 142).
- Haaran `linnanrakentaja-kuori-ao` PR junaan 143: pudota KOE-commitit b51d321a1 (fec08857) ja 00d88a2b8 vasta sitten, kun mainiin
  menevä blender.json on sovittu. Haarassa ovat työkalut 82169c00e (AO), 3ba0dc018 (tasoitus) ja 6d824aea9 (välitaso).
- Kuoriputki: `VALO=8192 AO_KERROIN=0.6 tools/dioraama/blender/kuori_putki.sh <kansio> <rakennus.json> --alkaen hamara`
  (noin 35 min). Hämärän 8k on 6×6 ja tehdään erikseen: `python3 /Users/Shared/Claude/proto-3d/tyokalut/astc6.py <hamara-8k.jpg>
  <ulos-8k-4x4.astcm> 6x6` (Xcoden TextureConverter, Highest). 4k ja 2k tulevat putken astc-vaiheesta (4×4).

## Tehdyt 5.10. (todisteet `_valmiit/linna-laatu/`)
- `ruutukuviokorjaus-stillit/`: 0,25 m:n ruutukuvio, juurisyynä lähin solu → bilineaarinen. HYVÄKSYTTY.
- `valo-4k-vs-8k/MITAT.md`: 8k-valo +1,15 Mt, GPU-muisti ennallaan. HYVÄKSYTTY junaan 143.
- Kevennys: `docs/raportit/linna-kevennys-ehdotus-20261005.md` + `kevennys/`. A (heijastus kevyellä kuorella, lodBias) ja
  C (yleisnäkymästä piiloon keskushalli, fatabuuri, keittiö) HYVÄKSYTTY Siirtosepälle, kun iPad-mittaukset
  (`poikki vesi heijastus 0`, `poikki kuori kevyt`) näyttävät tarpeen. B (normaali-LOD) HYLÄTTY repeämien vuoksi.
  Välitaso 0,80 M (`kevennys/ulkokuori_valitaso.glb`, `valitaso-stillit/`, tools/dioraama/blender/kuori_valitaso.py)
  on valmiina, EI peilissä; otetaan käyttöön vain, jos iPad-mittaus vaatii. D–F (hahmojen yhdistäminen, kuoren lohkot,
  piilopinnat 6,4 %) junan 143 jälkeen.

## Odottavat
- **Brotli** (haara `linnanrakentaja-zstd`, tools/dioraama/pakkaus.mjs): odottaa Natiivisepän dekooderia ja Siirtosepän katselmointia.
  PR junaan 143 ILMAN KOE-blender.jsonia 433b7c93 (pudota se). ZstdSharpia ei ladata.
- **Tavli** PR #3976: Bysantin ja Ottomaanin laudat vasta, kun Sisältökirjuri on tarkistanut viitekuvat.
- **Akustiikka** PR #3979: peili, kun Siirtoseppä pyytää (Steam Audio vasta omistajan luvalla, EI ladata ennen sitä).
- **JPEG-poisto** (v29+): vasta, kun Siirtosepän päivä-JPEG-natiivipolku on mennyt junalla läpi.
- Erä 1b ja jalkavarjon juurisyy (aloituksen mukaan): jalustat poistettu 4.10. (81a1a4198). Tarkista
  `olavinlinna-avoimet-20261004.md`, mitä niistä on yhä auki.

## Säännöt, jotka tulivat vastaan
- Kuoren varjostin piirtää **Cull Off** (DioraamaKuori.shader). Näkyvyysanalyysit siis molemmille puolille.
- Levy on 97 % täynnä: kopiot `cp -cR` (APFS-klooni). Älä jätä tulos-*-kansioita turhaan.
- Pitkät Blender-ajot perl fork+setsid. Älä käytä `pkill -f`, vain omaa pid:tä.
- `git stash` vain tagilla (jaettu pino), mieluummin WIP-commit.
