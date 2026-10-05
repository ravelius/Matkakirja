# Siirtosepän luovutus 5.10.2026 — TILA KLO 23.1x (Opus 5.5, high)

## Nyt (23.1x)

- **Juna 144 lähti** (e95826b4: kaupunkikuva 79a3582c, oppaan kamera OpasKuvaus 7d2a70ec + Linssisepän forbidHoles).
- **Juna 145 (kokoaa Natiiviseppä/Linssiseppä):** kappeli = siirtoseppa/linna-146 767fb0e3 (ele-kytkentä + polvillaan puhuminen)
  + siirtoseppa/kappeli-145 0ca128fd (puhujakuva natiivi-ui/puhujakuva-145 6f733f2e + kytkentä); koe 792745f0 todennettu
  (lokit/siirtoseppa-kap145pk). Oppaan tapit (OpasOhjaus 2de41125), kaukokulmat 7ce44e1c ja korostus OpasKorostusKuva 46f452cb
  ovat lontoossa (daeb60d2) — korostusta ei vielä nähty simussa.
- **Osoitin:** db8630b07d17411d todennettu BUILD 143:lla ja koe 3:lla (lokit/siirtoseppa-kap143/-kap144); Päätoimittaja antaa
  omistajalle Run-rivin.
- **Juna 146:** siirtoseppa/kortti-napautus 85c0a6bb (huoneen nimi 3 s, kortti ja nimilaput vain napautuksesta) — odottaa
  käännös- ja simuvuoroa (Julkaisija): ENNEN 792745f0 / JÄLKEEN samalla polulla oikeilla tapeilla (ajo-kortti-tapit.sh, TAP NYT →
  simupaneelista tap → touch $L/<N>/tap-huone|tap-tyhja). Lisäksi linna-146 58636d47 (pään pystykatse ≤ 12°).
- **TYÖTAPA (Päätoimittaja 23.1x):** vika toistetaan oikeilla napautuksilla ennen korjausta; ilman toistoa ei SHA:ta.
- Final IK 60ba4251, Steam Audio cdfe7acd, vesi 1a4e4804: tila Päätoimittajalle 22.4x (146–147).

## Aiempi tila 19.5x


- **Kaupunkikuva junaan 144 — HYVÄKSYTTY (Päätoimittaja 19.5x):** `siirtoseppa/kaupunki-kuva` @ **79a3582c**, worktree
  `wt/proto-siirtoseppa-kk`, Linssisepän `linssiseppa/lontoo`:n päällä, vain `Linssit/Unity/KaupunkiKuva.cs` (tilaa
  `CesiumKaupunki.Avattu/Suljettu`). Junan oletus: Google-SSE 16 (Päätoimittajan muistikatto), MSAA 4x, anisotropia 8–16; sumu
  ja Volume POIS. Viritys ilman käännöstä: laitteen `Documents/kaupunki-kuva-asetukset.txt` (google/maasto/rakennus/msaa/sumu/
  sumualku/sumuloppu/sumualkumin/sumuloppumin/volume/savytys/kontrasti/saturaatio/hehku), A/B `Documents/kaupunki-kuva-pois.txt`.
  Kuvat `proto-3d/lokit/siirtoseppa-kaupunki3/` (A–D, pari-A-B*.png). Sumun/värien viritys jatkuu junan jälkeen; kuvapari
  Päätoimittajalle ennen kuin mitään kytketään päälle. Skripti `ajo-kaupunki-kuva.sh` (KIERROKSET, ASETUKSET_<k>, UIKOMENTO).
- **Final IK** jatkuu: `siirtoseppa/final-ik` @ **60ba4251** (kädet esineisiin, kadet[]-lukija + testi; Grounder pois
  polvistujilta) — ajamatta; appi poistettu levyn takia, käännös uudelleen. Linnanrakentajan esimerkkipeili 9b44d146
  (fatabuurin hoitaja, pulpetti). Skripti `ajo-vuoro-kadet.sh`.

## Aiempi tila 17.3x


- **Juna 144 — merge-pyyntö Natiivisepällä:** `siirtoseppa/linna-144` @ **03d02ee8** (linna-143 b10669da + Natiivi-UI kortti-tiivis a7757d06).
  Päätoimittaja KUITTASI 15.4x. Todisteet: Pulun oikea tap jonottaa keskustelun ajan (`lokit/siirtoseppa-pulutap2/`), lähempi
  keskustelukamera, kortti otsikkoriviksi, ennen/jälkeen (`lokit/siirtoseppa-ennen-jalkeen/`). Käännös vaatii
  `MATKAKIRJA_KIRJASTOT=…/unity-paketit-siirtoseppa/kirjastot` (Cinemachine + Splines). Osoitin TF 144:n jälkeen **56e98a88**
  (#4003, mainista; tarkistettu junan 144 koeapilla 5f257c20 16.55, 0 virhettä).
- **Juna 145 — merge-pyyntö Natiivisepällä:** `siirtoseppa/linna-145` @ **12eeab86** (= linna-144 + 6f7ac8f5 ele-kytkentä
  `vuorot[].ele` → glb-leike `ele_<ele>` kertaliikkeenä + 12eeab86 ele-loki). Päätoimittaja KUITTASI 17.3x; Laitetestaaja
  kuittaa rutiinin, Päätoimittaja katsoo videon `lokit/siirtoseppa-ele2/ik/kappeli-ik1/tallenne-aanella.mp4` ennen VIE 12.
  Eleet näkyvät tuotannossa vasta elepeilillä (#4004, Linnanrakentajan 1f75d8ed-sisältö).
- **Final IK** (omistaja osti 5.10.): `siirtoseppa/final-ik` @ **19944f2d**, worktree `wt/proto-siirtoseppa-fik`. Paketti
  `_lahteet/unity-paketit-siirtoseppa/Final IK.unitypackage`; gitissä vain ajonaikaiset kansiot (ei demoja), LAHTEET.md
  (Asset Store EULA: vain yksityinen proto-git). Tarkistusta varten esikäännetty `dll/RootMotion.FinalIK.dll` (symlinkki
  kirjastot-kansioon). Vaihe 1 FBBIK + GrounderFBBIK (`DioraamaHahmot3D.IK.cs`, päivitys käsin Sekoittimen jälkeen, lattiat
  MeshCollider kerros 30, `poikki ik 0|1`, jalkamittari lokiin). Mittaus (c5cbba3a): kirjuri portailla >5 cm poikkeamat
  65 % → 35 %; seisovat ennallaan. 19944f2d (Grounder pois istuvilta/polvistuvilta) EI vielä ajettu. Seuraavat: Aim IK ja
  Interaction System odottavat Linnanrakentajan dataa (pyydetty 17.3x). iPad-mittaus vasta junaehdokkaana (Päätoimittaja).
- **Steam Audio:** kappelin kaiku leivottu (`siirtoseppa/steam-audio` cdfe7acd, RT60 1,30/1,01/0,85 s, 7 kt); odottaa
  Natiivisepän laitekäännöstä ja iPad-A/B:tä. Ei junaan 144/145.
- **Puhujakuva-koe** (`siirtoseppa/puhujakuva-koe` 1ae53205) odottaa Codexia; ei junaan.
- Skriptit (`proto-3d/tyokalut/siirtoseppa-ajot/`): ajo-linna-ik.sh (OSAT, KAMERA_<huone>), ajo-linna-pulutap.sh,
  ajo-linna-ennen-jalkeen.sh, ajo-vuoro-1715.sh / -1730.sh. Appi: `lokit/siirtoseppa-fik-app` (c5cbba3a) ja
  `lokit/siirtoseppa-juna144koe-app` (5f257c20). Simupaneelin detach irrottaa kaikkien laitteiden paneelit — älä käytä.

## Aiempi tila 14.2x

## Nyt (14.2x)
- **Proto-haarat (kaikki ilman pushia, proto-git):**
  - `siirtoseppa/linna-143` @ 5c12cc5c (worktree wt/proto-siirtoseppa-141): Cinemachine (e9a7915b, blendikäyrä e5c7867b), laineiden uusinta,
    Pulu vain napautuksesta + kuunnelma ainoa keskustelu (cf079e40), kohtaukset v2 -tuki (vuorot, puhuva hahmo, faktat kohteisiin f57f3e20, 7dd23594),
    latauspalkki (3be07c30, todennettu Natiivi-UI 1e32f0b1) + natiivi-ui/latauspalkki mergetty + kytkentä. App lokit/siirtoseppa-5c12-app (fc420a3b).
    MR Natiivisepälle vasta kun Cinemachine ja Pulu-todiste kuitattu (Laitetestaaja toiminnallinen, Päätoimittaja sisältö).
  - `siirtoseppa/latauspalkki-kytkenta` @ da6b8a27 (wt/proto-siirtoseppa-lp): master + latauspalkki + vain LatausOsuus → Natiivisepälle junaan 144.
  - `siirtoseppa/tavli` @ ea02bae1: KUITATTU, MR Natiivisepällä (TF vasta otsikkokorjauksen kanssa, Natiivi-UI 46b62059).
  - `siirtoseppa/vesi` @ 1a4e4804: Stylized Water 3 A/B (oletus pois); kuva vielä huonompi kuin oma (ei heijastusta) → jatkotyö.
  - `siirtoseppa/steam-audio` @ 11518dbd: kappelin leivottu kaiku (DioraamaKaiku, agentin suunnitelma docs-steam-audio-suunnitelma.md),
    simulaattorissa pois. SEURAAVAKSI: leivonta `nice -n 15 tyokalut/kaiku-leivonta.sh kappeli` (Julkaisijan Unity-batch-vuoro) →
    Natiivisepän laitekäännös + koko → iPad A/B (poikki kaiku 0|1) Päätoimittajalle.
- **Odottaa simuvuoroa (~15.05, 25 min):** `ajo-linna-v3.sh` (VANHA=lokit/juna-1.1.143-81ac41ea, UUSI=lokit/siirtoseppa-5c12-app,
  HASH=Linnanrakentajan v3-peili) = osoitinehto: TF 143 lukee v3-datan; Pulu-todiste (ajo-linna-pulu.sh); kirjuri/soutaja (ajo-linna-hahmot.sh
  KIERROKSET=A AHASH=c97dd7e515c71824).
- **v3-äänet:** Pelikoodari _valmiit/linna-kohtaukset-v3; Linnanrakentajalle datasäännöt (kasikirjoitus vain pulu-lenna+taulu, kuunnelma
  kertoja + keskustelu vuoroineen, nimi tyhjä). Osoitinvaihto vasta Päätoimittajan todisteen jälkeen.
- **Käännöksissä aina** `MATKAKIRJA_KIRJASTOT=/Users/Shared/Claude/proto-3d/_lahteet/unity-paketit-siirtoseppa/kirjastot`.
- **Kehitystahti (#3992):** VIE 12 ja 20; toiminnallinen kuittaus ensin Laitetestaajalta; todistusajo (tyokalut/todistusajo) kun Pelikoodari
  ilmoittaa mykistyksen valmiiksi.

## Aiempi tila 11.05

## Nyt (päivitetty 11.05)
- **Tavli KUITATTU** (Päätoimittaja ~10.55): proto `siirtoseppa/tavli` @ **ea02bae1** (tekstit HYVÄKSYTTY + laudat v2), merge-pyyntö Natiivisepällä.
  EHTO: TF vain yhdessä Natiivi-UI:n otsikkokorjauksen kanssa ("TAVL I", kapiteelin kirjainväli; tilattu Natiivi-UI:lta). Muuten juna 144.
  Todisteet oikeilla sim-tapeilla: kaappaukset/siirtoseppa-20261005/tavli-laudat-simtap-1052.png (käännös ddbadb73). Simulaattorin tap-lupa on nyt voimassa (omistaja 10.51).
- **Cinemachine vaihe 1**: proto `siirtoseppa/linna-143` @ **c6271398** (e9a7915b Cinemachine + 0fb2fc7b laineiden uusinta + c6271398 blendin pehmennys).
  A/B 566fb9a1 tehty (lokit/siirtoseppa-cm-ab, video kaappaukset/linna-cinemachine-AB-566fb9a1.mp4): levossa ero Ytimeen 0,000 m, napautus pehmeä;
  huippunopeus ~30 % jousta suurempi → c6271398 (blendi + 0,6 s). Käännös jonossa ~11.45, simu ~12.10 (ajo-linna-cm.sh, vain cinemachine-kierros riittää).
  KÄÄNNÖKSET: aina `MATKAKIRJA_KIRJASTOT=/Users/Shared/Claude/proto-3d/_lahteet/unity-paketit-siirtoseppa/kirjastot` (esitarkistuksen ScriptAssemblies ilman Cinemachinea).
- **Laineet/tuuli** (Natiivisepän löydös): Aanisoitin.HaePooli uusii Levylle-latauksen 2/5/12 s (0fb2fc7b); A/B:ssä laineet soivat.
- **Stylized Water 3**: proto `siirtoseppa/vesi` @ fb7f7ab2 (yksityinen proto-git, _Demo pois, LAHTEET.md ehtoineen; ei vielä koodissa, vaihe 5).
- **Steam Audio 4.8.1** ladattu (_lahteet/unity-paketit-siirtoseppa, sha256 = GitHub): iOS-kirjastot vain laite-arm64 → simukäännöksissä pois-kytkin; ääni-A/B vain laitteella. Natiiviseppä kuittaa koon (lipo, .app-koko, UnityFramework) ennen junaa. Vaihe 6.
- **Latvus-pari** (27022c94 vs 22968114) toimitettu Linnanrakentajalle; osoitin vaihdettu 22968114:ään 10.45.
- Linnanrakentajan hahmo/Gaia-suositus: natiivikohdat tarkistettu (docs/raportit/suositus-hahmot-gaia-20261005.md, hänen haarassaan).

## Aiempi tila 06.1x

Edellinen luovutus on `viesti-siirtoseppa-luovutus-20261002.md` (5.10. osiot 02.0x ja 05.2x). Tämä korvaa sen jonon.

## Juna 142 — KUITATTU, merge-pyynnöt Natiivisepällä

- **Mylly:** `siirtoseppa/mylly-142` @ **b2f9b0a1**, worktree `wt/proto-siirtoseppa-mylly`, masterin 9663df99 päällä.
  - ✕ → Poistu, JULISTE-otsikko, lippu piiloon, yksi Pelit-rivi.
  - `Aanet.RekisteroiTehoste(omaIsku)`.
  - `Pulu.Peita` → `StyleKeyword.Null`.
  - Vahvistus 1,6 ja lisä-äänet (siirto, mylly, voitto, häviö).
- **Linna:** `siirtoseppa/linna-palaute-142` @ **f531743e**, juna/b13:n päällä.
  - Kameran jousi ja orbit, käsipyöritys 360°.
  - Äänet: ryhmät, väistö, mitatut tasot, huoneäänet vain huoneessa.
  - Avainsanat, kuorivalinta hampurilaiseen, Laiturin leikkauskorjaus.
  - Aanisoitin: saumattomat linssisilmukat.
- **Avainsanadata:** Linnanrakentajan PR (peili 8f4eb611) sai OK:ni. Osoitin on omistajan päätös.
- **360°-veto:** Laitetestaaja todentaa (minulla ei ollut simulaattoripaneelin lupaa).

## Juna 143 — linna (haara `siirtoseppa/linna-143`, worktree `wt/proto-siirtoseppa-141`)

- **Commitit:**
  - **da00c9c6** sauman ristihäivytys 50 ms
  - **e1fdf532** Timeline (DioraamaTimeline + Kertoja-, Jakso- ja AvainsanaKlippi)
  - **b03ef429** Timeline oletuksena päällä (Päätoimittaja). A/B-todiste: lokit/siirtoseppa-linna-timeline, ero ≤ 1 ms, napautus identtinen.
  - **bdd5be5e** teardown-kilpa: DioraamaYmparisto ei pakkaa sulkeutuvan linnan tekstuureja; testikomento `poikki pakota-virhe N`.
  - Kärki **024a098d**.
- **TEHTY 06.13:** teardown todistettu (N 15–75, 0 NRE, lokit/siirtoseppa-linna-virhe).
- ~~**AVOIN, todiste:**~~ viiden N:n latausvirhe (`ajo-linna-virhe.sh`, `APP=lokit/siirtoseppa-linna143b-app` = 698bf6d6).
  - Simuvuoro on noin 06.25 Julkaisijalta.
  - Hyväksyntä: 0 NRE ja "poikki: latausvirhe" joka N:llä.
  - Tulos Päätoimittajalle.
- **TEHTY 06.32:** osoitin-A/B c116f02f vs **27022c94** (AO-B + 8k + tasoitus + avainsanat) kuvattu TF 142:n junan appilla, kuvat Päätoimittajalla; osoitin on omistajan aamupäätös.
- ~~**AVOIN, AO-B valittu:**~~ Linnanrakentaja tekee yhdistetyn peilin (AO-B + 8k + tasoitus).
  - Kuvaa se A:ta (c116f02f) vastaan: `ajo-linna-ao.sh`, vaihda B:n hash.
  - Kuvat Päätoimittajalle omistajan osoitinpäätöstä varten.
- **Odottaa omistajan latauslupaa** (aamun kortti): Cinemachine 3.1.7 + Splines 2.9.1 ja Steam Audio. Suunnitelma: `docs/raportit/linna-unity-suunnitelma-20261005.md`, vaiheet 1, 2b ja 6.
- **Odottaa Päätoimittajan hyväksyntää:** Linnanrakentajan kevennykset A (heijastus kevyellä kuorella) ja C (tilat pois vain yleisnäkymän levossa) (`docs/raportit/linna-kevennys-ehdotus-20261005.md`).
- **iPad-mittaus 00008103** Julkaisijan vuorolla, kun 143 on koottu:
  - fps (mediaani ja 1 %:n alin) junan 142 tasoon nähden
  - muisti
  - Brotli-purun kokonaisaika ja pääsäikeen piikit ensimmäisellä avauksella
  - Linnanrakentajan mittaukset `poikki vesi heijastus 0` ja `poikki kuori kevyt`
- **Muiden työt:**
  - Linssiseppä: tilt-shift ja Volume (vaihe 3). Huone/yleisnäkymä tulee `ViimeisinNakyma.KohdeTila`sta.
  - Natiiviseppä: Brotli (`natiiviseppa/zstd` acb4462a, katselmoitu ja hyväksytty).

## Juna 143 — Tavli (haara `siirtoseppa/tavli` @ **9169187b**, worktree `wt/proto-siirtoseppa-tavli`)

- **Suunnitelma:** `docs/raportit/tavli-suunnitelma-20261005.md` (HYVÄKSYTTY). Botin poikkeama on hyväksytty: helppo valitsee 35 %:n todennäköisyydellä satunnaisesti 8 parhaasta, normaali tekee 10 %:n todennäköisyydellä satunnaisen vuoron.
- **Tehty:**
  - Säännöt, botti ja Peli-testit (412/412).
  - UI Kafeneio-laudalla, 3D-nopat, äänet, Ateenan kohtaaminen, Pelit-rivi.
  - Osuma-ala ± 1 saraketta.
- **Simutodisteet:** `docs/raportit/kaappaukset/siirtoseppa-20261005/tavli-*`
  - oikea polku
  - osuma-ala oikeilla napautuksilla
  - heitto, siirto, lyönti, palkki, poisto ja voitto
- **EI TF:ään** ennen Sisältökirjurin tekstejä (paikkatekstit TODO). Sisältökirjuri aloittaa aamulla.
- **Linnanrakentajalta tulossa:** Bysantti- ja Ottomaani-laudat esikuvatarkistuksen jälkeen. Akustiikkaverkot v1 ovat `_valmiit/olavinlinna-akustiikka-v1/` (Steam Audio, vaihe 6).

## Skriptit ja todisteet

- **Skriptit:** `proto-3d/tyokalut/siirtoseppa-ajot/`
  - `ajo-linna-todennus.sh`, `-kappeli.sh`, `-ao.sh`, `-timeline.sh` ja `-virhe.sh`
  - `ajo-mylly-aani.sh` (kaveri + botti)
  - `ajo-tavli.sh` (rivin napautus 237 258 pt, osuma-ala 61 301 → 84 452)
  - `tallenne-yhdista.py`
- **Todisteet:** `docs/raportit/kaappaukset/siirtoseppa-20261005/` (ei committoitu).

**Huom:** levysiivous tyhjentää vanhoja lokit/*-app-kansioita (levy 97 %), joten käännä uudelleen tai käytä junan appia (lokit/juna-1.1.142-*).