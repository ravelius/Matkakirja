# Julkaisijan luovutus 18.10.2026 klo 06.4x (PT: nollaus)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -100). Edellinen: `viesti-julkaisija-luovutus-20261018-yo.md`.
Osoitekirja /Users/Shared/Claude/osoitekirja.md (TILINVAIHTO 18.10., uudet id:t). Levy 40 Gi (06.41). Levyvahti `levyvahti-l2.zsh` käynnissä (kuolee nollauksessa → käynnistä uudelleen).

## 0. ENSIN
- **TF 201 EI VIELÄ.** Lataus vasta PT:n "LUKITSE 201" + TF-luvan jälkeen (PT tarkistaa kuvat täysikokoisina → KK hyväksyy).
- **Kuvakäännös 5 = natiiviseppa/juna-201 9288ca434 → 263cd9253** (06.37, L1), app `/Users/Shared/Claude/proto-3d/_tyo/julkaisija/juna201-kuva5-app`.
  Sisältää d60107576 + VS aeca9a712 + LS kaanaan-häät 4417ce5b2 + LS museo-himmeä 4fb30be2c (KK 8). NS testit vihreät 2071/607/508.
  **Kuvausjono (kuvaparit, ei videota), yksi kerrallaan:** PK ISS-pöytä (iPhone BD64C8E4 + iPad 00CF62C2; SIMU NYT annettu 06.37)
  → LR kehykset v3 + 2 muunnelmaa (iPhone BD64C8E4 pysty) → KS Kiinan 3 korjausta (iPad yksin) → VS opas→ISS-maa + Kööpenhamina
  (iPhone 8D1FD618 + iPad A26BC7D0) → LS KK 8 + Kaanaan häät (iPhone BD64C8E4 ~5). Kukin vie polut PT:lle.
- **Kuvakäännös 6 tulossa** NS:n lukitusehdokkaasta (51caa5120 + NUI 0ba132aca + VS 4f1b0db13): NS lähettää SHA:n → käännä mallilla
  `julkaisija-tyokalut/juna201-kuvakaannos5.zsh` (sed SHA + kansio juna201-kuva6-app; L1 jos vapaa, muuten L2 PROTO_LINJA=2) → kuvaavat NUI:n seuraaja ja VS.
- **Kuvaajien jälkeen simulle**: PK galleria arkki 5b 45dbf6b20 → c7bd33bd (käännetty L2 06.33): `pelikoodari-galleria200j.zsh` odottaa gatea →
  `touch /Users/Shared/Claude/julkaisija-tyokalut/simu-vapaa-galleria-j` (iPad 00CF62C2 ~6) → todistus PK + LR (lokit/todistus-galleria-arkki4b-200j-*).
  Sitten KS taistelut-kaikki 0189ce37f → d4817e212 (`_tyo/karttaseppa/kiina-taistelut-kaikki-app`, iPad YKSIN ~8) → SIMU NYT KS.
- L1 ja L2 vapaat 06.37. NS:n laitekäännökset A/B + LampoMittari tehty (02.16).

## 1. TÄNÄÄN 01.04–06.40 (lyhyesti)
- Kuvakäännökset 201: 1 73bca3b3a→bfc99a3d6 (01.27), 2 f51e44545→60c76c43d (02.03), 3 ad1b9e604→7dd24a810 (06.08, ei kuvattu),
  4 d60107576→b656d1792 (06.15, NUI kohdevalikko + kokoruutu OK), 5 9288ca434→263cd9253 (06.37).
- KS Kiina v6–v10 + taistelut-kaikki käännetty ja ajettu (v10 a56b4af62 05.54). VS iss-nakyvyys-202 useita (ef1c180f3 viimeisin oma).
- VIETY ämpäriin: s2-indeksi-v2h (01.52), raketti-aanet-v14 (05.32), Peking piilo p361sn1 (06.22, osoitin uusin.json → p361sn1, KK:lle rivi).
- Galleria arkki 5 b11dcbc12 → 4fa0015f ajettu 06.09 (PUUTE: komento ei kuitattu, konsoli hiljaa 37 s kuormassa) → PK.

## 2. OPIT
- Raskas iPad-simu EI rinnakkain kahden iPhone-ajon kanssa (KS v8 kaatui 02.06: konsoli jäätyi). Iso ajo yksin.
- Odottajan vaihto toiseen SHA:han on turvallinen, kun se ei ole lukossa (`cat /tmp/matkakirja-kaannospalvelu*.lukko/kuka`); tapa skripti + proto-kaanna-odottaja, sed, käynnistä uudelleen.
- Junan kärkeen: muut L1-odottajat SIGSTOP + taustavahti (`ks-jatka-201-4-jalkeen.zsh`-malli) SIGCONT kun juna lukossa.
- PT:n ja NS:n ristikkäiset viestit (kuva 5 9cc0 ↔ 9288): toimi uusimman PT:n linjauksen mukaan ja kuittaa kaikille kerralla.
