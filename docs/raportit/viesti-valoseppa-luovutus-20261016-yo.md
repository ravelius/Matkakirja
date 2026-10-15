# Valoseppä – luovutus 16.10.2026 yö (00.2x, KOVA RAJA 35 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261015-ilta6.md.
Viestit `send_message` id:llä (/Users/Shared/Claude/osoitekirja.md); PT local_5df52e10 (≤ 3 riviä + polut). Käännös ja simu Julkaisijalta
(local_5cb16c00). D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2. Jono: $D/JONO.md (TILA-osiot 23.3x ja 00.0x lopussa).

## 0. ENSIMMÄISENÄ: SIMU A26BC7D0 ON VALOSEPÄLLÄ (Julkaisija tauotti vahtinsa 00.16 → muista SIMU VAPAA)
Käynnissä 00.21 alkaen (luovuttajan taustaprosessi; voi katketa session nollauksessa):
`{ kuvat-k14-pari.zsh (VALMIS) ; KOPIO=… zsh $D/testi196-vuoro.zsh }` → loki $D/testi196-vuoro.log, vaiheet omiin .out-tiedostoihin:
video $D/iss-nyt/video.out (ALKAA/LOPPU-rivit siellä), kierrokset $D/<ilmiö>/kierrokset/kN/aja-kierros.out.
Appi = testi-196 f9ece96cf (⊇ 71b921f0e: iss-efektit + Pelikoodarin ukkoshaku + väreily + Siirtosepän nousu-kortti) kopiona
/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa-2/197724cb-e98d-4e80-9fa5-7a95edfed852/scratchpad/t196/Matkakirja3D.app
(sama sisältö: $D/tulivuoret/app/, ellei Julkaisija ole kääntänyt päälle).
1. Tarkista `pgrep -fl testi196-vuoro`. Jos kuollut: katso viimeinen LOPPU-rivi .out-tiedostoista ja aja puuttuvat itse:
   video `VAREILY=1 APP=<app> zsh $D/iss-nyt/aja-video.zsh f9ece96cf`, kierrokset `APP=<app> zsh $D/<ilmiö>/aja-kierros.zsh N f9ece96cf`
   (salamat 3, tulivuoret 6, pimennys 1, perseidit 1, hurrikaani 1, vanat 1, revontulet 11; mkdir -p kierrokset/kN ensin).
2. Sen jälkeen samalla varauksella (Julkaisija: "kuuluu samaan varaukseesi"): etsimen A/B, kun yovalot-tele-196 on KÄÄNNETTY
   → `APP=$D/yovalot-tele/app/Matkakirja3D.app zsh $D/yovalot-tele/aja.zsh a0f1f82a0` (iPad-simu A26BC7D0).
3. SIMU VAPAA Julkaisijalle heti viimeisen ajon jälkeen.

## 1. PT:n järjestys (00.2x, sitova): 1) 23.12-video 2) etsimen kipinöinti 3) Louvre LOD0-peitto + uusi pari (LR arvioi)
### 1) 23.12-video (omistajan päätös 15.10. 23.12, loki paatokset-2026-10.md): KATSO video ITSE ennen PT:tä
- Tuloskansio: $D/iss-nyt/ajot/<mmdd-HHMM>/tuloskansio.txt → .mp4:t raketti-vareily, iss-nyt-salamat, iss-nyt-perseidit,
  iss-nyt-auringonnousu + kuvat r1, v1, v2, a1–a4; tila.txt (salamat/tähdenlennot/väreily-lokirivit).
- Riskit: raketin väreilyn miinuspassi (sama tekniikka kuin VesiPinta.shader) nähdään vasta nyt; aurinko live-Cupolassa vain
  muutama pikseli → porrastus näkyy parhaiten a4 (pakotettu litistys). Auringonnousu kohdevalikon kautta (`kohokohta.auringonnousu`).
- Kunnossa → PT:lle ≤ 3 riviä + polku; PT näyttää omistajalle. Viat → korjaa haaroissa (alla) → uusi käännös testi-196:sta.
### Haarat (proto-3d, worktreet /Users/Shared/Claude/wt/proto-linssiseppa2-*)
- iss-efektit-196 2c8a87a41 (= vanat-196 + salamat-196 v3 + ISS nyt + pelikoodari/iss-ukkoset-196 3e4adfe3e): IssIlmiot (Ydin,
  AsetaUkkoset/Nakyvat/meteoriparvikalenteri/ParviLahde/PakotaLive; testit IssIlmiotTestit 4/4), Salamat elävät myrskyt, Tahdenlennot
  elävä parvi, IssIlmioValvoja, IssUkkosHaku (PK). Pelikoodarin 6f899a2ad EI otettu tarkoituksella: haku vain Simu.Livessä, ettei
  testipakotus korvaa `nyt testi` -ukkosia (kerrottu PK:lle).
- vareily-196 4ffe2b2f0 (agentti): Vareily.cs, RakettiVareily.shader, KyydinAurinko litistys/häikäisy, Avaruus LiveNousu. Kytkin pois → ennallaan.
- testi-196 71b921f0e (kierroksiin, EI junaan) = kaikki yllä + revontulet v7 + siirtoseppa/nousu-kortti-196 (ristiriita KyydinTaivas/
  KyydinAurinko ratkaistu = vareily-196:n versio, identtinen).
- yovalot-tele-196 a0f1f82a0 (pelikoodari/iss-kamera-195 94627484b päällä): Yokuori _PisteKontrasti (maaseutu harvemmaksi/himmeämmäksi
  l < 0,25, kaupungit ennallaan; A/B `astro kyyti pisteet 0|1`). Käännös L2-jonossa → $D/yovalot-tele/app/.
- Junaan (kun PT kuittaa videon/parin): NS:lle iss-efektit-196 ja vareily-196 (molemmat kytkimien takana), yovalot-tele-196 erikseen.
### 3) Louvre (louvre1/)
- Parit valmiit: k11 (uusinta), k13, k14, k14s; havainnot + RGB HAVAINNOT-v2.md. LR:lle ja PT:lle kerrottu.
- LÖYDÖS: kulmassa B (147 m) peli näyttää LOD0:n → LOD1:n syvyysleivonta (louvre1/syvyys/, paketti v6k18-lv2f-k14s, portti 0)
  ei näy siinä. PT hyväksyi 00.2x: leivottu peitto + syvyys myös LOD0:aan.
- LOD0-leivonta KÄYNNISSÄ Opus-agentilla (luovuttajan ali-agentti; jos katkeaa, aja uudelleen samalla ohjeella: leivo.py-pohja
  louvre1/syvyys/, lähde _valmiit/louvre-v1/glb k14 23.55 – älä muuta; tulos syvyys/glb/louvre_lod0.glb; GPU-budjetti +25 Mt;
  vaihtoehdot verteksiväri-AO / occlusionTexture UV1 (tarkista Cesium-tuki) / yksikäsitteinen tekstuuri).
- Paketointi: `python3 -I rakenna.py <nimi> syvyys/glb` (uusi 2. argumentti). HUOM: omat_mallit_ktx2.py:n rajatarkistus antaa väärän
  VIRHEEN, kun yksi materiaali → 13 solmua yhdistyy (maailmarajat täsmäävät); viimeistele käsin: kopioi nd3/v6k18 + ktx/louvre +
  ktx/mallit.json pakettiin ja aja `omat_mallit_ktx2.py --portti <paketti>` (0 virhettä k14s:ssä).
- Ajo: kopioi kuvat-v2f-k14s.zsh → uusi nimi/OMAT/L (sed k14s → …), `A=<app> zsh …`; pari `python3 $D/pari-taysi.py …`.
- Kuvaskripti: omat191/kuvat-utu-mykistetty.sh tukee nyt ALOITUSODOTUS (oletus 30; käytä 150 – hidas verkko jätti k11:n aloitusruutuun).

## 2. Muut
- JONO.md:n vanhat kohdat (kierrokset seitsemälle, revontulet v7, Peking PT284) jatkuvat videon jälkeen PT:n järjestyksessä.
- Worktreet uudet: proto-linssiseppa2-iss-efektit, -vareily, -yovalot (+ vanhat ks. ilta6-luovutus).
