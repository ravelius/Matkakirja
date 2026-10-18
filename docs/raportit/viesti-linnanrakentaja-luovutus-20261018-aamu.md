# Linnanrakentajan luovutus 18.10.2026 klo 08.2x (Opus) – kova raja 37 % (Postivahti)

Edellinen luovutus: `viesti-linnanrakentaja-luovutus-20261018-yo.md` (1c309e97f). Viestit lähetetään AINA session id:llä
(`/Users/Shared/Claude/osoitekirja.md`). PT:lle enintään 3 riviä, ja polut ovat absoluuttisia.

## 1. ENSIN: omistajan "Kaksi kehystä" (18.10. 08.10, PT 08.2x, juna 202)

- **Omistajan kuva:** `/Users/Shared/Claude/Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261018/kaksi-kehysta-0810.png`.
  Kuvassa on La Belle Jardinière. Pelin suorakaidekehys ja kuvan oma Louvren kaarikehys ovat päällekkäin, ja tekijärivi on maalauksen päällä.
- **Tavoite (PT):** jokaisella maalauksella on täsmälleen yksi aidon näköinen kultakehys.
- **1) Lista – TEHTY:**
  - Kaikki 115 museoteosta on käyty läpi (Alankomaat 64, Ranska 51), lähteenä pelin JPEG-varat
    `https://media.matkakirja.app/taidemuseo/<maa>/<seina_lahde>`.
  - Ainoa museokehys on **louvre-inv-602**.
  - Oma lista: `/Users/Shared/Claude/proto-3d/_valmiit/louvre-kehykset-201/yksi-kehys-202/LISTA.md` (+ arkki-1…4, kulmat.png).
  - LS:n lista (sama tulos): `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa/taidemuseo-ranska/kehyslista-20261018.md`.
  - Reunukset, joita EI poisteta kehyksenä:
    - inv-611 Castiglione: paljas kangas ja tumma reuna, noin 3–4 % sivua kohti. Mahdollinen erillinen rajaus, PT päättää.
    - orsay-rf-2511 Seurat: taiteilijan maalaama reunus, älä poista.
  - **Tarkistamatta:** `Resources/Museo/muotokuvat/` (40 taiteilijamuotokuvaa, eivät ole seinäteoksia). Tarkista, näytetäänkö niitä kehyksessä.
- **2) Korjaus – TEHTY, odottaa kuvakäännöstä:**
  - Proto `linnanrakentaja/yksi-kehys-202` **05833ad6e** (natiiviseppa/juna-202 2ba609861:n päällä), worktree
    `/Users/Shared/Claude/wt/proto-linnanrakentaja-kehykset`.
  - Muutos: teokset.json louvre-inv-602 `"muoto": "kaari"` kuten 777. Kuvan kehys peittyy kaaren ulkopuolen syvennykseen (KaariVari),
    ja pelin kultakehys (v4) jää ainoaksi kehykseksi.
  - Testi KaariteosRanskassa on päivitetty. Linssit 2074/2074, tarkista 0.
  - Haara on lähetetty NS:lle.
  - LS ehdotti lisäksi kenttää `"kehys_kuvassa": true`. Sitä ei tehty, koska kaari riittää. Lisää kenttä, jos PT haluaa sen luetteloon.
- **3) Kuvapari – KESKEN:**
  - Kun NS:n kuvakäännös sisältää 05833ad6e:n ja JU antaa SIMU NYT, aja
    `zsh /Users/Shared/Claude/proto-3d/tyokalut/linnanrakentaja-ajot/ajo-yksi-kehys-202.zsh <app>`.
    Skenaario `sk-yksi-kehys-202.txt` on kierrostilassa: y1 pysähdys, y2 Auto Zoomin jälkeen, y3 vertailukuva 777.
  - **ENNEN-kuva:** `/Users/Shared/Claude/proto-3d/lokit/todistus-louvre-kehykset201k8-kierros-iphone-20261018-0803/kuvat/z2-602-autozoom.png`.
  - **Tarkista täysikokoisina:**
    - yksi kehys
    - kulmissa ei kultaa eikä vaaleaa juovaa
    - **tekijärivi ei kehyksen eikä kankaan päällä** – omistajan kuvassa oli vanha kangas-Auto Zoom; junan 201 661c71873 jo sovittaa
      kehyksen, mutta varmista myös käsin zoomattuna
  - Lopuksi arkki ennen|jälkeen → PT.
- **Simun käyttö:** iPhone BD64C8E4, ajotyökalu `wt/proto-linssiseppa-kierrokset195/tyokalut/todistusajo/todistusajo.sh` (ks. ajo-*.zsh).
  - Vapaassa tilassa (`kavele teos`) Auto Zoom ei toimi.
  - Kierroksella pysähdys on `linssi museo siirry N` (kierros.json).
  - Odota ≥ 26 s, koska 14 s:n kohdalla kävely on vielä kesken.

## 2. TEHTY 18.10. 00.40–08.2x (juna 201, kaikki PT:n hyväksymiä)

- **Louvren kehykset v1 → v4:** v4 = **661c71873** junassa 201, hyväksytty.
  - Kulta 206/186/128, haja 0,3, kiilto 0,8, karheus 0,38, painauma 0,35, ympäristö 0,5, veisto 0,45 / 3 mm.
  - Varjostimen `_VeistoPainauma`.
  - QA `museo louvrekulta r g b [haja kiilto karheus painauma ymp]`.
  - Arkit `/Users/Shared/Claude/proto-3d/_valmiit/louvre-kehykset-201/ARKKI-*.png`.
- **Auto Zoom sovittaa kehyksen ulkoreunan** (sama 661c71873): `MuseoKierros.KehysSovitus` = Ulkomitat kehysprofiilillisella paikalla.
  - Pystyruudussa pysähdys jo rajaa kehyksen, joten zoom ohittuu (kerroin 1,00).
  - Kuva 8 (007c891a2): 602 ja Kaanaan häät näkyvät kokonaan kehyksineen kierroksella ja vapaassa kulussa (LS 7c8fad260).
  - KK: Kaanaan häät = LS:n "kokonaan pystyruudussa".
- **Kartan yhtenäistys arkki 5:** PT palautti nappulan kaksoisvarjon ja pyramidin ison soikion.
  - PK teki e8a0e3bb7 (nappula yksi tumma rengas, pallon varjo korin alle) ja LS teki 3b4117a67 (pyramidi pohjan kokoinen + reunus).
  - PK yhdistää ne ja ajaa JU-ajon sk-galleria-arkki4b, minkä jälkeen kuvat tulevat LR:lle. **Odottaa PK:n kuvia** → lähikuva-arkki PT:lle,
    esineittäin samalla kameralla (`_valmiit/kartan-pienoismallit-v1/ARKKI-5-lahikuvat.png` mallina).
  - Hyväksynnän jälkeen kirjoitetaan luku "Kartan pienoismallit" 3D-pohjaan.
- **Tivolin Codex v2** (tilaus 9f0efea5f): toimitusta ei ole vielä tullut, `git ls-tree -r --name-only origin/claude/postilaatikko | grep tivoli-aidot`.
- **Junaan 202 (KK 07.5x):** La Belle Jardinièren otsikko peittää maalauksen yläosan Auto Zoomin jälkeen. Tämä kuuluu kohdan 1 tekijärivitarkistukseen.

## Opit

- **Vapaa tila ei ole kierros:** QA "kavele teos" ei käynnistä Auto Zoomia. Tarkista lokista ("autozoom …") ennen kuin päättelet mitään kuvista.
- **Commit vasta testien jälkeen:** commit tehtiin kerran ennen testiä, ja viestiin jäi väärä "testit läpi". Korjattiin amendilla ennen jakoa.
- **Teoskuvat ovat pelin omassa mediavarastossa:** `media.matkakirja.app/taidemuseo/<maa>/` + teokset.json `kuva.seina_lahde`.
  Paikallinen kopio Ranskasta: `/Volumes/T7 4TB/koodaus/proto-3d-sisaltokirjuri-20261014/taidemuseo-ranska-20261013/lataus/seina/`.
- **QA-säätökomento säästää käännöksiä:** yksi käännös ja kolme muunnelmaa samasta asennosta. Arvot kiinnitetään vasta valinnan jälkeen.
