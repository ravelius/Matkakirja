# Natiivisepän luovutus 9.11.2026 klo 17.09

Edellinen: git show efd4a0caf:docs/raportit/viesti-natiiviseppa-luovutus-20261109-1556.md (tiedostojako VS:n kanssa: kohta 7 luovutuksessa -1503).
Sessio Natiiviseppä local_0f7f169f-…, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi. Nollauksen syy: konteksti 25 % (7.37).
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py,
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …").
Varjostimen regenerointi (VS:n ohje): repon juuresta `python3 -I "Assets/Matkakirja/Shaders/Cesium/Lahde~/tee_tileset.py"
/Users/Shared/Claude/proto-3d/Matkakirja-proto-mac/Library/PackageCache/com.cesium.unity@D454711FBE38/Source/Runtime/Resources Assets/Matkakirja/Shaders/Cesium`
ja sen jälkeen `git checkout -- Assets/Matkakirja/Shaders/Cesium/MatkakirjaRasteri.shadersubgraph`. HLSL kääntyy vasta ajossa.

## TEHTY 16.18–17.09 (kaikki KOE, ei junaan; proto-3d, paikalliset haarat, ei pushia)
FPV-VUORET (haara natiiviseppa/fpv-vuoret, worktree /Users/Shared/Claude/wt/proto-natiiviseppa-fpv-vuoret), järjestyksessä:
- 71f01f72c LiukuLahi 0 oletus (PT 16.1x: liuku ei paranna); HUD-mittakaava = lennon kerroin lennon alussa (k2-lento näyttää oikean korkeuden).
- Ajo -4 (l-15 | l-2 | l-2-d28, Chamonix 45.93 6.87 → Mont Blanc 11 km, HUD 5 000 m) → PT: k2 + D kertoimen mukaan.
- 6b65fd42b D = DPerus 28 000 × k/15 (k2 → 3 733); FpvLento.D = lennon arvo (VS:n FpvMaalaus lukee häivytyksen 4 D … 10 D siitä); `fpv d m` = DPerus.
- 366a772a4 + f148f46d6 (regeneroitu .shadergraph): OMISTAJA 16.39 generoitu LÄHIKORKEUSVAIHTELU. KORKEUS_RUNKO: _fpvKorkeus (slotti 10) =
  (amplitudi m oikeaa, täysi m, häipyy m, pisin aalto m); harjanne-fBm 3 oktaavia (3 200/1 600/800 m), × (0,35 + 3 × jyrkkyys) / 1,75, vain h 400 → 1 500 m yllä,
  oktaavi häipyy kun L < 2,5 % etäisyydestä; normaali kallistetaan äärellisin eroin (30 m). C#: KorkeusKerroin.FpvVaihteluM = 180 (Lahi 12 km, Kauko 35 km,
  Aalto 3 200), FpvKorkeus(bool); FpvLento kytkee lennon alussa/lopussa (OnDestroy vain jos uusi lento ei jo alkanut); komento `fpv vaihtelu m [lähi kauko aalto]`.
- Ajo -5 (v-0/180/300, sama kamera kuin -4): varjostin kääntyi, MUTTA ero vain huipun pyöristyksessä (rinteellä ≈ ±20 m oikeaa) → PT: ei näytettävä.
- da6a62eba = merge NUI 14f9398b8 (valkoinen tietorivi + pallon nimi; PT:n pyyntö "rebase" → tehty mergenä, koska VS on yhdistänyt sha:t omaan haaraansa).
- VS:n kanssa SOVITTU: NS = KORKEUS_RUNKO + _fpvKorkeus + KorkeusKerroin/FpvLento; VS = MAALAUS_RUNKO + FpvMaalaus.cs (linssiseppa2/fpv-vuoret-k2), HAMARA_RUNKOn
  FPV B -lohkoon kumpikaan ei koske nyt. VS yhdistää sha:ni (viimeksi kerrottu da6a62eba).

HUIPPUNIMET (haara natiiviseppa/huippunimet, 49f7825ca): ajo -4 c-k2 ~13 vs ennen ~25 nimeä (usva 192 → 58, mutta "kiinteä" 21 → 114). Ajo -5
(sk-huippunimet-3: c-k2 kiinteä | c-k2-vapaa `ui kiintealadonta 0`) → PT 17.0x: VAPAA PAREMPI (kiinteässä Tête Noire × Tête de la Combaz, La Tête du Truc × Mont Joux).

## SEURAAVA (järjestyksessä)
1. EF FA natiiviseppa-fpv-vuoret-7-ipad-da6a62eba (JU jonossa; sk-fpv-vuoret-7: Vallée Blanche 45.88 6.90, nokka 207°, 4 600 m maaston yllä k2,
   kamera −12°, v-0 | v-400 | v-800 | v-1200 samasta kamerasta). Katso (sips -Z 1000), valitse YKSI arvo, jolla ero näkyy KOKO ETUALALLA mutta luonnollinen
   → FpvVaihteluM oletukseksi (KorkeusKerroin.cs, vain C#) → pari v-0 | v-valittu (pari.py, sama rajaus) PT:lle 3 rivillä + rivi VS:lle uudesta sha:sta.
   Jos ero yhä heikko: verteksiväli rajoittaa (Cesiumin laatat) tai amplitudikaava (/1,75, jyrkkyyskerroin) – nosta kaavaa, ei vain parametria; HLSL vain KORKEUS_RUNKOon.
2. HUIPPUNIMET, PT 17.0x: "vapaa" (kiinteä ladonta pois) linjaksi huippunimille? HUOM: kiinteä ladonta on yleinen koe (Raamattu 2.216); älä kytke pois koko
   kartalta – selvitä PT:ltä, tarkoittaako "vapaa" huippunimet kiinteän ladonnan ulkopuolelle (KiinteaRivi(r) Nimikerros.cs ~r. 1148: lisää ehto luokalle
   elava-huippu) vai pelkkä vertailu. Jäljellä molemmissa: ylärivin kaukaiset nimet (Col du Mont-Lachat, Col de Tricot, Le Prarion) harjanteen päällä ja limittäin
   ylälaidassa, "Pointe de Chal…" katkeaa Ranska-valitsimen alle → KARSI kaukaiset UI-nappien alta (ruudun reuna -tarkistus Nimikerros.cs ~r. 856:
   lisää UI-nappien suorakulmiot / yläkaista) ja limittäiset. Lokit lokit/natiiviseppa-huippunimet-5-ipad-49f7825ca (c-k2, c-k2-vapaa).
   Pari (vapaa ennen/jälkeen) PT:lle, sitten KK:lle. Skenaario-pohja _tyo/natiiviseppa/sk-huippunimet-3.txt.
3. Jos jono tyhjä: PT "JONO TYHJÄ: Natiiviseppä".
Kuvat ≤ 1000 px (sips -Z 1000 kopio scratchpadiin). Arviot kirjattu lokikansioihin NS-arvio.txt (fpv-vuoret-4, huippunimet-4).
