# Natiivisepän luovutus 10.11.2026 klo 10.45

Edellinen: -0958 (71c1557fd, lisäys 10.1x käsitelty). Syy: kontekstivahti 25 % (7.37). Kansio Matkakirja-3d-selvittaja. Älä poista mitään.
Työkansio: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/, lokit /Users/Shared/Claude/proto-3d/lokit/. Repo proto-3d/Matkakirja-proto, remote natiivi-backup.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (session oma; /opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …").
PT 10.4x (sitova): Pont du Gard: esilataus napautukseen (tai lähestyessä) → iPad-mittaus JU:lla muistihinta + sumean ajan pituus ennen/jälkeen → pari PT:lle.
ISS: kupolin suojaprofiili ja tärinä Mac-ajon mukaan, korjaus koehaaraan, ei junaan ilman paria. b2 ja muistiosuus: tulokset PT:lle; osuus junaan vasta kortin jälkeen.

## 1. YKSI TARKKUUS b2 (työlista NYT) – Mac AJETTU 10.39, luettu osittain
- wt /Users/Shared/Claude/wt/proto-natiiviseppa-yksitarkkuus, haara natiiviseppa/yksi-tarkkuus ab0bb5f67 (pito koko eleen ajan, ei "ladattu"-ehtoa,
  max 5 s; komento maasto yksitaso pito <s>|pois [ladattu]). Testit 744/744.
- Tulos lokit/natiiviseppa-yksi-tarkkuus-mac-b2: hyppy.py yu-ele.mp4 → suurin 763, yli 100 solua 45 ruutua (yritys 2: 766/53, yritys 1: 757/76, nyky 518/71).
  Kärkiruudut 1068, 333, 2470, 1784, 2523, 1872. Pidot: 11 loppui: 5 × lepo (2,3 s), 6 × KORKEUS (0,7–4,7 s): nipistys 0,2↔0,5 = ×2,5 > YksiTasoPitoKorkeusSuhde 2,0.
  → Hyppy tulee todennäköisesti pidon päättyessä korkeusehtoon kesken nipistyksen. TEE: katso kärkiruudut (ffmpeg select → parit-1:n tapaan),
  päätä: korkeussuhde 4 (kokeile komentoa, jos lisäät; muisti!) vai (a) liikevalinta lähemmäs lepoa. Kirjaa tulos.md:n loppuun, pari lepo+ele PT:lle.
  iPad-muisti b2 (> 4080 → a) ei vielä pyydetty.
## 2. MUISTIOSUUS (omistaja 10.23 "Kyllä, kokeena", PT 10.2x) – iPad JU:lla (OA, käännösvuoro)
- wt /Users/Shared/Claude/wt/proto-natiiviseppa-muistiosuus, haara natiiviseppa/muistiosuus efdb68d93 (juna 224 e46b3f251 +): Linssit/Ydin/Kierros/MuistiOsuus.cs
  (VIKA = 80 % × (fp + os_proc_available käynnistyksessä), jarrun portaat PieniMuistihata × raja/5100 ≥ 1), Kartta/LaitteenMuistiraja.cs, MuistiVahti.VikaRajaMt
  ominaisuudeksi, komento pallo jarru osuus <0,5–0,95>|pois|paalle. Linssit-testit + unity-tarkistus 0.
- Ajopyyntö _tyo/natiiviseppa/muistiosuus/ajopyynto-1.md, sk-osuus.txt (= muistikaton Pariisi + ISS) ×2 kylmää → lokit/natiiviseppa-muistiosuus-{1,2}.
  KUN VALMIS: huippu, VIKA-raja ALKU-rivillä (~6550), "iOS:n muistivaroitus"-rivit (käykö järjestelmä väliin), jarrutasot; vertaa muistikaton pariisi-ajoihin
  (jaksot.py). Tulos tulos.md + rivi PT:lle. Junaan vasta kortin jälkeen.
## 3. PONT DU GARD SUMEA – Mac luettu, KORJAUS TEKEMÄTTÄ (PT 10.4x: tee)
- _tyo/natiiviseppa/pontdugard/tulos.md: hidas kylmä lataus (65 → 71 → 98 % 4/16/36 s), ei esilatausta napautuksessa (UI/NahtavyysEsittely.cs
  Napautus l.133 → Esittele l.161 → AjaOletus l.294; lento 2,2 s LentoS l.57, kierto 40 s, 135°). Nappula.cs:586–594 rakentaa EsilataaKohde-laatikon
  (KarttaKerrokset.cs:1391; huom: vain Laattapalvelimen Z5–Z9 + Sentinel, EI Cesium-pallon paloja) → tarvitaan myös esilatauskamera kierron loppuasentoon
  (vrt. SaapumisEnnakko/RakettiLaukaisu ennakkokamerat; PalloMuistiJarru.EsilatausEstetty kunnioitettava). Mahd. kierto alkaa vasta ≥ 95 % (max ~6 s).
- Omistajan kuva pahempi (ei jokia/teitä) → laitteella jarru? muistikattoajosta (sk-katto-pariisi, kuva katto-maakartta-pdg) jarrurivit.
- Tee koehaara juna-224:n päälle, Mac-ajo + iPad ennen/jälkeen JU:lla → pari PT:lle.
## 4. ISS TÄRINÄ + KUPOLI – Mac JU:lla (OB, mac-yleis 30 min)
- wt /Users/Shared/Claude/wt/proto-natiiviseppa-iss, haara natiiviseppa/iss-tarina 50bab43fc (vain editori: kamera.txt:hen fov/kierto/kehys).
  _tyo/natiiviseppa/iss-tarina/{ajopyynto-1.md, sk-iss-mac-1.txt, tulos.md} → lokit/natiiviseppa-iss-tarina-1 (tallenteet iss-a, iss-b-v2 = raketti kamera v2 1;
  kuvat iss-kupoli-{normaali,suoja08,suoja10}).
- Kupoli: syyehdokas CupolaKerros.cs:80 – M1-iPad (iPad13,*) koko ISS-kyyti suojaprofiilissa (renderScale 0,8 SuojaSkaala, MSAA 1, bloom pois, 30 fps).
  Yövalot 224.11: ei yhteyttä nähty (tulos.md). Ehdotus suoja ilman skaalausta (renderScale 1); hinta ~16–32 Mt, GPU/lämpö iPadilla (peli lampo skaala 1).
- Tärinä: ei lähiorigo. Ehdokkaat (tulos.md): PalloKierto.LaskeAsento maastorako ilman hystereesiä (l.3106–3118), RakettiLaukaisu.PaivitaKello (l.419–445)
  + Nousu.KameraV2 pois (Nousu.cs:233), AsetaLahikuva vs RakettiPulu. KUN AJETTU: kamera.txt → etäisyys kameran ja ISS/maan välillä / fov per kuva,
  edestakainen heilunta A:ssa, poistaako v2. Korjaus koehaaraan, pari PT:lle.
## 5. Ennallaan JU:lla (ks. -0958): ISS C 630e6bc31, kertojan viive, muistikatto 3+3 (jaksot.py → tulos.md, rivi PT:lle ja KK:lle).

## VIESTIT TÄLLÄ VUOROLLA
JU: ajopyynnöt b2, muistiosuus, iss-tarina (kaikki kuitattu; b2 ajettu 10.39). PT 10.39: kolmen rivin tila. KK: ei viestiä (osoitekirja: roolit eivät viesti KK:lle; PT välittää).
Sivuhavainto PT:lle kirjattu tulos.md:hen: "Briançon"-nimi Rhônen varrella pdg-b/c-16:ssa (nimiaineisto).
