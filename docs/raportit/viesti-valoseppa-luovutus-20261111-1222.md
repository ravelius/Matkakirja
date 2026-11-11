# Valosepän luovutus 11.11.2026 klo 12.22. Itsenäinen: vanhoja ei tarvitse lukea (korvaa 20261111-1133:n)

Syy: konteksti 27 % (pehmeä raja). Tili sami.reivinen@vvi.fi. Kotikansio /Users/Shared/Claude/Matkakirja-linssiseppa-2 (irrallinen originin main).
Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup` (natiivin "main" = `julkaisija/juna-224`). Ainoa worktree k33 =
`/Users/Shared/Claude/wt/proto-linssiseppa2-k33`, nyt haarassa `linssiseppa2/maa-piirros-a` 8693823d2, puhdas ja pushattu. Kuvat ja ajot vain JU:n
vuorolla. Id:t: PT `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31` ≤ 3 riviä; KK `local_d5f31591-21fa-4cb0-bab3-bcd3435d075a`; JU
`local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd`; NUI `local_4b84cd90-123f-46c5-bc07-75760ed4c80b`; Postivahti `local_1f31f830-9df5-41c1-8992-172e100af57f`.
Viestit mcp__ccd_session_mgmt__send_message id:llä. JU:n jonoloki `/Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt`.
HUOM: viesteissäni KK:lle ja JU:lle klo "13.0x" oli väärä aika; oikea ~12.18–12.20.

## LINJAT
- Näkyvä työ (3D, merkit, ilme, valikot, VALO): kuva ensin KK:lle, PT kopiona; junaan vasta KK:n sanalla. KK katsoo itse ja vaatii todisteen.
- Mac-kuvat tallenteen jälkeen ok vain haaroilla, joissa f2511a80f (juna-224 17fbf3e35 →). maa-piirros-a sisältää sen.

## 1. MAAN PIIRROS LÄHELTÄ A (kärki Kaupungit) – ODOTTAA KK:TA
Haara `linssiseppa2/maa-piirros-a` (juna-224 17fbf3e35 +3): 580e2aaca A v1 (PiirrosKerros.shader MaaLahelta, PiirrosKerros.cs _Terava/_KangasM
lahig-laatoille, Komennot.cs `piirros lahella paalle|pois`) · db6633918 portti varjostimeen pikselikohtaisesti (Mac-batchin Screen 640×480 teki
RuudunMpp:stä 4,3× → CPU-portti sammutti) · 8693823d2 v2 KK:n 12.08-linjalla (vaste = heikoin: harjanne 1,5 tx, askel 4 tx × 0,5, pitkänomaisuus;
voima smoothstep 0,06–0,12; muste vain vaalean maan vieressä 0,76–0,84; vahvuus 0,65). Unity-tarkistus 0 virhettä kaikissa; Shader-error 0 (580e, db66).
- PERUSLÖYDÖS (KK:lle lähetetty ~12.20): kallistetussa lähikamerassa (kallista 35, suunta 20) PiirrosKerros on häivytetty (kulmaOsa: täysi
  ≤ 0,25°, nolla ≥ 1° poikkeama kulmasta kallistus 0 / suunta 0). Tavoitekuvien kk-1 ja ajojen maa-a-1/2 sumea maa on STRIIMIKARTTAA
  (Cesium-pallon laatat), ei piirroksen lähitasoa. Siksi A ei näkynyt pelissä. KK päättää: (1) piirroksen oma kulma (työni kohdistuu tähän)
  vai (2) kallistettu näkymä → A striimikartan laattojen varjostimeen (Cesium-materiaali, omistaja selvitettävä). Suositin (1) ensin.
- ODOTTAA: JU Mac-ajo `_tyo/linssiseppa2/maapiirros/a-toteutus/sk-mac-maa-a-2.txt` (kallistus 0, suunta 0, panorointi tallenteessa) käännöksellä
  8693823d2 → `lokit/linssiseppa2-maa-a-3-8693823d2`. Tarkista parit a1/a2 … a7/a8 täysikokoisina rajauksina (erokuva: max-ero ×4) ja tallenne
  (viiva ei väreile), lähetä KK:lle polut + puutteet. iPad-ruutuajo `sk-ipad-maa-a-ruutu-1.txt` on PERUTTU kunnes KK on valinnut; uudelleen uudella
  sha:lla ja kallista 0 / suunta 0 (päivitä skenaario).
- KK:lla valinta jäljitelmistä v2/v3: `_tyo/linssiseppa2/maapiirros/a-toteutus/kk-2/` (LUE.md). v3 = tasa-arvokäyrä rakenteellisen reunan keskelle
  (jaljitelma3.py), ei varjostimessa. Jäljitelmät: jaljitelma.py (v1), jaljitelma2.py (v2), jaljitelma3.py (v3); laatat
  `_valmiit/pariisi-tasot-isoisa4-20261103-vienti-20261103/kohtaamiset/piirroskartta/pariisi/isoisa4-20261103/lahig-*.jpg` (ND lahig-1-1 1180 2,
  RK lahig-0-0 1650 1200).
- Mittakaava (KK kysyi 12.12): lähin 0,620 km kallistus 35, 2752 × 2064: teksel ≈ 6–7 px keskellä. Kysytty NUI:lta "kamera lähemmäs" -raja
  (vastaus odottaa); välitä KK:lle.
- Vanhat maa-a-1 (580e) ja maa-a-2 (db66) ovat vertailua: niissä piirros häivytetty, erot = pilvet, vesi, linnut.
- Havainto listaan (KK 12.12, ei tähän työhön): Seinen oikea ranta ND:n kohdalla katkeaa portaittain laatta-/tasosaumassa (maa-a-1 a1/a2).

## 2. PILVIEN VARJOT: levossa seis, iPad-todiste JU:lla
- Haara `linssiseppa2/pilvivarjo-pehmea` 51e33fb4f (kello käy vain kameran liikkuessa, 0,5 s liuku). ODOTTAA: JU iso iPad
  `_tyo/linssiseppa2/pilvivarjo/sk-ipad-pilvivarjo-todiste-2.txt` → lokit/linssiseppa2-pilvivarjo-todiste-ipad-2-51e33fb4f (laitekäännös alkoi 11.34).
  Tarkista: i2-lepo-0 = i2-lepo-10 (ero.py ~0 maassa), i2-liike-1/2 (kello nousee), i2-jalkeen-0 = -10, konsolissa seis/jatkuu ilman tiheää
  vuorottelua, kehysajat. Erokuvat `/opt/homebrew/bin/python3 _tyo/linssiseppa2/pilvivarjo/tyokalut/ero.py a b ulos 6`. Polut + puutteet KK:lle;
  KK:n sanalla MR JU:lle, pt-ok PT:ltä.

## 3. KYNÄ v4: junassa MR63 (224.70), odottaa PT:n 224.70.pt-ok (JU 11.5x). Ei toimia.

## 3b. VESITÄYTTÖ (erä B) 0829caa4e: ennallaan JU:lla (ajo 3, ohje `_tyo/linssiseppa2/vesitaytto/LUE.md`; hyväksyntä ≤ 20 ms → PT + MR).

## MUUT (ennallaan)
Saumat (506) odottavat KK:n suunnitelmaa. Mäkien varjostus (KK:n tavoite). Merenpohjan puristus 97b4f29a9 KS:n koelaatoilla. Kohokartan aurinko cd74573cd.

## TEKNIIKKA
PIL `/opt/homebrew/bin/python3 -I`; numpy/scipy ilman -I. Mac-skenaariot: `kallista` + `suunta` ennen `aja`; koko ipad, pistekerroin 0.465; Pariisin
talot `talot kansio /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/palat-v20-ryhma4` + `talot 1`. Lähin: `aja <lat> <lon> 0.0012 3` +
`pallo kerros pakota taysi`. Mac-batchissa Screen 640×480 (3D-kuva 2752×2064): älä käytä Screen-kokoa ruutumittoihin. iPad: `komento …` + `odota 3`,
kuva = `komento kuva X`. `sh Peli-testit/unity-tarkistus.sh` worktreessa. Luovutus plumbingilla origin/mainin päälle omaan haaraan.

## LISÄYS 12.3x (KK 12.22 ja NUI)
- KK VALITSI v2 (8693823d2); v3 hylätty. KK hyväksyi 12.12-selityksen (A tarpeen, teksel 6–7 px). EHDOT ennen iPadia: (1) A ei muuta maan
  keskikirkkautta eikä kylläisyyttä yli ±1 % viivattomalta alueelta; jäljitelmästä mitattu ND +0,16 % / RK −0,06 %, kylläisyys −0,2 % (KK:lle
  lähetetty) – mittaa sama pelikuvista (a3/b-kuvat, maski |ero| < 0,04 → keskiarvot L ja max−min). (2) Mac-todiste: neljä paria + 10 s
  laskeutuminen kaukaa lähimmälle ND:llä: ei rajaa, välähdystä eikä sävyhyppyä. KK mittaa itse. iPad vasta KK:n sanalla.
- JU:lla: maa-a-3 (`sk-mac-maa-a-2.txt`, parit + panorointi) ja maa-a-4 (`sk-mac-maa-a-4.txt`, b1–b4 + laskeutumistallenne 0,006 → 0,0012 8 s),
  molemmat 8693823d2, kallistus 0 / suunta 0. Tarkista ja lähetä KK:lle polut + mittaukset + puutteet.
- NUI: lähin ei muuttunut (KS c032134e7 IsoisaLahinLeveys 0,231 ≈ 0,78 km). PK:n cd0edaa29 "5× lähemmäs" (vasen tappi) mainittu KK:lle, ei tarkistettu.
- KK ei ole vielä vastannut 12.20-löydökseen (kallistettu kamera = striimikartta); jos KK haluaa A:n myös kallistettuun, se on eri kerros (Cesium).
- 12.4x: pilvivarjo-todiste-ipad-2 POIS JU:n jonosta (omistaja 12.21: ison iPadin ajot vain KK:n nimeämille valmiille kokonaisuuksille).
  Kysytty KK:lta, nimeääkö se ajettavaksi; ilman KK:n sanaa ei iPad-ajoja (myös maa A).
- PT 12.4x (omistaja 12.21–12.22, Raamattu 12.26.5): isolla iPadilla VAIN KK:n nimeämä valmis kokonaisuus viimeisenä tarkistuksena ennen
  versiota. Kokeet, välivaiheet ja mittaukset Macilla. ÄLÄ TILAA iPad-ajoa itse (ei maa A:n ruutuajoa, ei pilvivarjoa). Pilvivarjo-todiste-2 odottaa
  KK:n iPad-erää; maa A:n hyväksyntä KK:lta Mac-todisteilla (maa-a-3/4).

## LISÄYS 13.0x: KK:N PÄÄTÖS KERROKSISTA
(1) PIIRROKSEN OMA KULMA: v2 loppuun (ehdot ennallaan ±1 %; Mac-parit maa-a-3 + laskeutuminen maa-a-4). KK arvioi; junaan vain, jos ero näkyy ja
    on siisti (MR JU:lle KK:n sanalla, pt-ok PT:ltä).
(2) KALLISTETTU LÄHIKAMERA = varsinainen tavoite (napautus, kierto, vapaa kamera). EI varjostintyötä vielä. Ensin TOSIASIAT VIIDELLÄ RIVILLÄ
    KK:lle: mistä aineistosta striimikartan maa tulee lähellä, tarkin taso ja m/px lähimmällä kallistetulla kameralla, onko tarkempaa tasoa
    olemassa/tehtävissä ja muistihinta, viimeisenä vaihtoehtona viiva laattojen varjostimeen. Sumea maa voi olla laattatason katto → oikea korjaus
    tarkempi laatta. Kysymykset lähetetty KS:lle (local_7b57e35a-3a8e-4943-aba1-c960b9eb4671) ja NS:lle (local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870)
    ~13.0x; kokoa vastaukset. Uusi tavoitekuva (2):lle kallistetusta pelikuvasta vasta tosiasioiden jälkeen. Kaikki Macilla.
    Vihje: log "elävä kartta: … lähinäkymä … z17", "pallo kerros pakota: … striimikartan vesi". PT:lle pyydetty työlistarivi.
