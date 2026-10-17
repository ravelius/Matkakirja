# Valoseppä – luovutus 17.10.2026 aamu (09.0x, KOVA RAJA 41 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261017-aamuyo.md (0a5217ddf).
Viestit `send_message` TÄYDELLÄ id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, LR local_996d60ab-b4af-4172-ad31-f8e948f141a3, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03,
Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2. Päiväkirja: $D/JONO.md (kaikki rivit 03.45–09.0x lopussa). proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto.
Käännökset ja simut VAIN JU:n "KÄÄNNÖS NYT" / "SIMU NYT" -viesteillä; heti simun jälkeen "SIMU VAPAA" JU:lle. Omat appit _tyo:ssa ≤ 2 (vanhat T7:lle:
/Volumes/T7 4TB/Matkakirja-valoseppa/arkisto-20261017-0110/appit/). V4-appit suoraan T7:lle (Matkakirja-valoseppa/v4-appit).

## 0. ENSIMMÄISENÄ: KÄYNNISSÄ OLEVAT AJOT (nohup, $D/nohup-0930.zsh, alkoi 09.03)
1) **k66vesi-pari** (JU:n SIMU NYT k66, A26BC7D0 ~12 min): `pari-kuvat.zsh k66vesi` (appi t200-k65, vertailu k65). Kun JONO.md:ssä on
   "K66VESI-PARI VALMIS": **"SIMU VAPAA" JU:lle** → arkki $D/louvre1/lahi-L1-L3/k66vesi/arkki.jpg + pari-pyramidi.jpg katso → PT:lle 3 riviä
   (altaiden väri ennen 31,41,60 – mittaa samat kohdat (0.75,0.80)(0.15,0.88)(0.6,0.95) pyr-ats160:sta; kivi ennallaan; yö ilman juovia).
   k66vesi = VESIKOE: LR:n k64-geometria + sävy 0,80× + vesi-väri (syvyys/glb-vesi.py 0,085/0,105/0,12). Ei junaan sellaisenaan.
2) **valas k5 -käännös** (JU:n KÄÄNNÖS NYT, d0ee7ad3d → t202-valas-k5). Kun JONO.md:ssä "VALAS K5 KÄÄNNÖS": "KÄÄNNÖS VALMIS <sha>" JU:lle
   (sha kaanna.out:sta). Simu k5 (~15 min, iPad + iPhone) tulee JU:lta myöhemmin → `zsh $D/valas-havainne/k5/valas-k5.zsh --vain-kuvat`
   → arkki + valas-k5.mp4 PT:lle (PT vie omistajalle junan 199 lukituksen jälkeen). t200-k65 voi T7:lle, kun k66vesi on kuvattu.

## 1. TEHTY TÄLLÄ VUOROLLA
- **Louvre k64vs-pari** (06.30, appi fdf95fd5c pyramidi-lasi): kivi Codexin tasolla (L2 S 0,258 R/B 1,35 vs Codex 0,276/1,38), lasi näkyy.
  PT: KK:lle vasta, kun yön pystyjuovat + päivän mustat altaat korjattu.
- **k65-koodi** linssiseppa2/pyramidi-lasi 4a2069541 + master-yhdistys 169c804aa (appi b454b0408): (1) yöjuovat = KaupunkiYovalot-passin maamerkki-
  juovat OSM-vesimaskista LR:n altaisiin → vesimaskista omien mallien leikkaukset pois (OmatMallit.VesimaskinSolutLeikkauksissa,
  CesiumOmatMallit.AukiPaketti); (2) OmaMalli _OmaPeili (ValoKohteet.OmaPeiliOsuus 0,9 / karheusraja 0,12) taivasheijastus. Testit
  OmaVesiPeiliTestit, Linssit 1983/1983. **k65-pari 08.42: juovat POISSA ✓, altaat yhä tummat** → k66vesi (yllä).
- **LR-sopimus (09.0x):** yhteinen Louvre k66 = LR:n k65 (Horloge) -geometria + minun sävy 0,80× + glb-vesi.py. LR vie k65:n vasta junan 199
  lukituksen jälkeen polkuun /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/louvre/luuppi-vienti/glb/ ja lähettää md5:t (LOD0 ≈ 242,1 k).
  Silloin: louvre1/ketju.zsh <k66> 0.80 (--vain-savy, jos ketju sopii LR:n vientiin; tarkista lahde-polku) + glb-vesi.py lod0–2 → md5:t LR:lle
  → JU:lta SIMU (appi t200-k65 tai junan 199 jälkeinen) → pari PT:lle → KK. LR ei vie mitään ennen PT:n paria.
- **Valas** (havainne, ei junaan): k3 2031212b7 (PT hyväksyi rajauksen), k4 284b21b1b (vanupilvi pois), k5 d0ee7ad3d (ytimen verho harvemmaksi).
  Valopoikkeus 8113416da + liikepoikkeus 3b879d5a5 HYVÄKSYTTY VAIN HAVAINNEKUVAAN: **junaan EI yhtään poikkeusta** – heitin-/vastavalosävyt
  Valopohjaan (ValoKohteet) ja kameran sekoitus Liikepohjaan ennen kytkentää (PT 05.0x).
- **V4 ULKO:** pala 1–2 nollaero kuvattu (sävy sama, keskiarvo-ero ≤ 3/255; kamera eri ajoissa). **Pala 3 d2a4dcbe1** (valopohja-v4,
  wt/proto-linssiseppa2-v4): Valopohja.Filmi (KaupunkiFilmi volyymi 19 → 0) + Sumu/SumuVari/SumuPois/SumuLineaarinen/Ymparisto
  (KaupunkiKuva ymparisto 19 → 0); valovahti 1050 → 1012; tarkista 0; Linssit 1946/1946. Nollaero-pari JU:n jonossa:
  valopohja/V4p3/kaanna.zsh (→ T7 v4-pala3) + kuvat.zsh (pala 2 vs 3, iPhone 96044270).
- **Rodinin Kolme haamua vara-glb** puuttui ämpäristä → paketti _valmiit/taidemuseo-ranska-kolme-haamua-vara-vienti-20261017, JU vei 07.23, ?t= 200 → NS.
- **Codex-posti:** valaskirje kuitattu b936181ef (claude/postilaatikko).
- **Vapaalennon valkoiset talot** (PT kysyi): ei taantuma – automaattiajo vaihtaa Googlen Ioniin (Cesiumin OSM-rakennukset).

## 2. JONO (järjestys)
1) Kohta 0 (k66vesi → PT, SIMU VAPAA; k5-käännös → JU; k5-simu → PT).  2) Yhteinen Louvre k66 LR:n viennin jälkeen (yllä).
3) V4 pala 3 -nollaeropari (JU:n jono) → PT; sitten pala 4 (HDR-päätös kuvaparilla, KaupunkiKuvan urp 6 / globaali 11).
4) Valaan sävyt Valopohjaan + kamera Liikepohjaan, jos PT kytkee valaan junaan.  5) Savun jatkot + LR:n raketin valaisinpäät.
LS:n kompassilamppu (ValoKohteet.KompassiLamppu*) on masterissa; pyramidi-lasi-haarassa yhdistetty.
