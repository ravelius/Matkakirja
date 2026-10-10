# Karttasepän luovutus 10.10.2026 aamu (noin 08.45, PT:n nollausraja 50 %)

Edellinen luovutus on `viesti-karttaseppa-luovutus-20261009-ilta.md`, jonka osio 4 on yön lokina. Tässä tiedostossa on vain voimassa oleva tila.

## 1. Ajossa / odottaa

- **Ei GPU-ajoja käynnissä.** ComfyUI PID 12915 (127.0.0.1:8189, T7) on joutilaana ja /free tehty. Sammutus vaatii killin, joten se tehdään vain omistajan luvalla.
- **Kone vapaa ma 12.10. asti** (muisti `kone-vapaa-ma-12-10`): nice 15, paistot yksi kerrallaan, ennen ti 13.10. aamua GUI-ajot pois.
- **Odottaa omistajaa:** Geotorget-tunnus (`LM_GEOTORGET_USER/PASS` tiedostoon `~/.matkakirja-avaimet-koodaus.zsh`). Sen jälkeen Tukholman maanpinta Lantmäteriet Markhöjdmodellista (CC0) → `maa-tukholma-lahi.png` 4 m (LS1 haluaa, koska GLO:n kadut ovat heikkoja) sekä Ortofoto/Laserdata. KL:n materiaalikäsittely odottaa omistajan v6j-päätöstä: ÄLÄ aloita.

## 2. Tekoälypinnat (T7 `/Volumes/T7 4TB/Matkakirja-karttaseppa/tekoalypinnat/`)

- **Työkalut:** `aja-nakymat.py <malli> <näkymät> <tunniste>` (mallit notre-dame, kuninkaanlinna, riddarholmen, prefektuuri, concorde, stadshuset; kehotteet, kiellot ja tile tunnisteen mukaan), `palat.py` (LR:n tekoaly_palat + --tile-voima/--palakansio), `aja-olavinlinna.py <n,…> <tunniste>` (seinät 1–16, s6 = katot paloina), `pinta.py` (STOP_NYT = yhteistoiminnallinen pysäytys), `savy2.py` (kylläisyys + keskiarvo), `luokkasavy.py` (sävy luokittain luokat.png:llä), `rh-v3.py`. Tauko: `touch STOP` (mallien välissä) tai `touch STOP_NYT` (heti).
- **Ohjauskuvat omille malleille:** `proto-3d/_tyo/karttaseppa/ohje-riddarholmen/ortho_ohje.py` (LR:n kopio + mallit rh, pp, co, sh; `ortho_ohje.diff`), kansiot `codex-ohje{,-pp,-co,-sh}/`. Merkinnät ja syötteet LR:n työkaluilla muuttamattomina. Näkymän nimi spiira on pakollinen torneille, koska ortho_merkinnat tuntee sen. **Kaava:** diff ja polku LR:lle → LR:n OK-rivi → vasta sitten GPU.
- **Toimitettu LR:lle (projisoitu, ellei toisin mainita):** ND v3, KL v2, Riddarholmen v3, Préfecture v1, Concorden obeliski v2, Stadshuset v1s (+ **lansi v2s**, toimitettu 08.24, projisointi LR:llä), Olavinlinnan seinät 1–5, s5 v3b, s7–s10, s11 v2t, kallio s12/s14/s16 v1s ja katot s6 v4s.
- **Opit:** vaalea pohja + tile 0,3 vaalentaa tiiltä → tile 0,15. Tummat tai kirkkaat sävyt korjataan jälkikäteen luokkasävyllä LR:n tavoitearvoihin. img2img-uusinnat (denoise 0,5–0,7) tuottivat HDR-mäisen tuloksen, jolloin v1:n väri + uusinnan luminanssin ylipäästö (s5 v3b) toimi.

## 3. Data LS1:lle ja LS2:lle (kaikki `proto-3d/_tyo/karttaseppa/`)

| Aineisto | Kansio | Tila |
|---|---|---|
| Yövalot (katuvalot, valaistut tiet ja kohteet, rantavalot) | `yovalot-20261010/` | LS1 |
| Ikkunavalot 1536², 8 m (R = osuus, G = K) | `yovalot-20261010/yovalot-ikkunat-<id>.png` | LS1 kytki (ikkunavalot-175) |
| Maanpinta 4 m (Pariisi IGN MNT, Tukholma GLO ilman rakennuksia) | `maa-20261010/` | **ämpärissä** kartta/korkeus/v1 (vain Pariisi) |
| Kadut ajosuuntineen | `kadut-20261010/` | LS1 (seuraaja kytkee) |
| Utu (aerosoli) 8 settiä | `ilmakeha-aerosoli-20261009/` | **ämpärissä** ilmakeha/aerosoli-v1 |
| Pilvet (METAR, pohja, peitto, matala, paksuusarvio) | `pilvet-kaudet-20261010/` | **ämpärissä** ilmakeha/pilvet-v1 |
| Veden väri ja sameus (S2, SWIR-korjattu) | `vesivari-20261010/` | **ämpärissä** vesi/vari-v1 |
| Strömmen–Norrström-aluenosto (index-v6, tukholma5) | `vesi-aluenosto-20261010/` | LS2:n haara vesi-v6-174. Vienti LS2:n kuvaparin jälkeen (paketti tehdään silloin, LAHTEET pohjana v5) |
| Olavinlinnan veden väri | `vesivari-olavinlinna-20261010/` | LR:lle ja LS2:lle 08.4x, ei ämpärissä (vienti LS2:n pyynnöstä) |

- **Työkalut** (T7 `vesimaski/`): `yovalot.mjs`, `yovalot-rikasta.py`, `rakennusvalot.mjs`/`.py`, `kadut.mjs`, `korkeus-maa.mjs`, `aluenosto.py`, `vesivari.mjs` (+ argumentti `olavinlinna`), `vesivari-kaudet.py`. T7 `pilvet-metar/pilvet-kaudet.py`.
- **Toiveet seuraaviin:** LS2 haluaa vesiverkon seuraavaan versioon palaan vesi-tunnisteen (Seine/Mälaren/Saltsjön, raja Slussenissa). Kaukomaata (S2 v1p/yo-v1p) ei kytketä (PT B), ja tiedostot jäivät ämpäriin.

## 4. Viimeinen erä

- Olavinlinnan veden väri: `vesivari.mjs … olavinlinna` (Kyrönsalmi 2 kohtaa, Haapavesi, Pihlajavesi; talven jää suodatetaan sinisen < 0,002 perusteella) → `vesivari-kaudet.py` → `_tyo/karttaseppa/vesivari-olavinlinna-20261010/`. **VALMIS 08.41:** suositus Kyrönsalmi kesä (syvä 0,001/0,003/0,005, 0,9 FNU). Talvi on jäätä, ja Haapavesi osui maalle (1 kuva), joten sitä ei käytetä. Toimitettu LR:lle ja LS2:lle.
- **ALUENOSTON LAAJENNUS (09.0x, LS2 c2d26ff51: Strömmen–Skeppsholmen 420 m musta Blasieholmen/Nybroviken):** `_tyo/karttaseppa/vesi-aluenosto-20261010b/` vertailupari `index-v7a.json` (tukholma6a, uudet alueet yhteensä 2,0 m) ja `index-v7b.json` (tukholma6b, 3,0 m). Uudet alueet Blasieholmen–Skeppsholmsbron ja Nybroviken–Skeppsholmen–Djurgården, Norrström/Strömmen ennallaan (päällekkäin suurempi). Työkalu T7 `vesimaski/aluenosto2.py` purkaa syötteen vanhan aluenoston ennen uutta (Δ 0 → v6 bitilleen). Googlen laattoja ei mitattu (PT:n linjaus), tasot LS2:n 0,4/1,5/3 m -parin mukaan. Odottaa LS2:n kuvaparia → valittu versio vientiin.
