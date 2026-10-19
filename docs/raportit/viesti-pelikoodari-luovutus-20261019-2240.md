# Pelikoodarin luovutus 19.10.2026 klo 22.40 (Postivahdin KOVA RAJA 35 %)

Edellinen: viesti-pelikoodari-luovutus-20261019-2200.md. Rooli: Pelikoodari (Opus, high). Proto-repo paikallinen (ei pushia).

## KÄYNNISSÄ NOLLAUSHETKELLÄ
- Ei omia ajoja. JU kääntää proto **319044008** → `_tyo/julkaisija/kamera-206e-app` (~22.45) ja ilmoittaa SIMU NYT NS:n runkosimun
  (930142989) jälkeen. (kamera-206d-app = e946ea2fd, ei käytetä.)

## ENSIN: SIMU 206e (kamera + ympäristö) → kuvaparit PT + KK → sha NS:lle
1. SIMU NYT:sta: `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/simu-juoksu-206d/aja.zsh /Users/Shared/Claude/proto-3d/_tyo/julkaisija/kamera-206e-app/Matkakirja3D.app`
   taustalle (iPhone + iPad ~12 min; tulos lokit/todistus-juoksu-206d-{iphone,ipad}-*). Sitten **SIMU VAPAA JU:lle** (VS tulivuoret seuraava).
2. Kuvat täysikokoisina. ENNEN = lokit/todistus-juoksu-206b-{iphone-20261019-2203,ipad-20261019-2208} samat J1, U1–U5, Y1.
   - Näkymä: pystyssä leveämpi (iPhone vaaka 33° → 49°, pysty 90°; iPad 51° → 60°). Tarkista vääristymä reunoilla ja Puyin koko;
     jos 90° liikaa, säädä DroneNosto.PystyMax / UlkoVaaka (testi PystyssaLeveampiVaakakentta).
   - M1/M2: ympäristö (keisarillinen piha muurikäytävän vasemmalla, rinnakkainen muurikäytävä oikealla); U3/U4 portaat katolle oikealla.
     Tarkista: lattiat eivät välky (moduulit 3 cm alempana), ei esineitä reitillä, fps (+157 k kolmiota; pitkat-ruudut.txt, kehysajat).
   - V1 vartija sivulla näkyy ajoissa.
   - Kuvaparit `_tyo/pelikoodari/raportit/pari.py`/`pari_raketti.py` mallilla → `kuvapari-206e-*.png` → PT (local_8d8ebf72-…) + KK (local_8e4fcfed-…).
3. PT:n OK:lla NS:lle (local_fcc10552-…): liitä e946ea2fd + 319044008 (haara pelikoodari/juoksupeli-207; merge-tree b3a5cfc65:n kanssa puhdas).

## HAARAT JA TILA (proto)
- **pelikoodari/juoksupeli-207** (wt/proto-pelikoodari-kerattavat-206) = JUNA 206: 6b2209e39 → 4c336fe5e (☰ ei avaa loppukorttia) →
  c3974d435 (loppukortin aikana ei kehotetta/mittareita/nappeja; molemmat NS:n rungossa 91a88c396) → e946ea2fd (kenttä kuvasuhteen mukaan,
  DroneNosto.PystyKentta) → 319044008 (Lisaosat += "ymparisto"). Peli 647/647, tarkista.sh 0.
- **pelikoodari/viittakainalo-207** (wt/proto-pelikoodari-viittakainalo-207): 5c80c6ec5 (hahmot-v3 = Codexin viittakainalo,
  GlbLeikeLainaus.Kohdista: lainattujen liikkeiden lantio viitan Armature-skaalaan) + ae531d72b (QA `hahmot kohdistus 0|1`) + cherry-pickit.
  Simu OK c672dcf5 (todistus-viitta-207-iphone-20261019-2227); **PT 22.4x: OK 206:een** (NS:lle sanottu; hahmot-v3 ämpärissä 22.13).
  Testi CodexinViittakainaloJosSaatavilla (JUOKSU_VIITTA3 + JUOKSU_PERUS2). Lantion ero ei erotu 8,5 m kamerasta – todiste testi.
- Raketti-Pulu 8eb6e1945 (c8494c7db): simu OK, vaihdot 39 → 4; PT OK 206:een. Lähteet-nimet 2c9c676a2 jo masterissa (c72195ae4).
- Äänet v2: Äänittäjä OK, ei tasomuutoksia (5c5caa7cf).

## YMPÄRISTÖ (omistaja 22.27–22.28, PT 22.3x) – työkalut _tyo/pelikoodari/ymparisto/
- tee_ymparisto.py (moduulit + sijainnit + reitti-/osatarkistus), kartta.py (yläkuva: törmäysmalli + reitti + lisä-glb), rajat.py,
  kartta-ymparisto.png. Ämpäri juoksupeli/maailma-v4/avoimet-v2/ymparisto.glb (320eb64e…, VIETY 22.37). Muutos = uusi nimi (ymparisto-2).
- Tiedostojako: VS = JuoksuV4Maailma.Valo.cs/.Jalki.cs, varjostimet, farClip/UniversalAdditionalCameraData (minä en koske);
  Lavastaja = kaukomaisema.glb + Lisaosat-rivi omassa haarassaan 319044008:n päällä; minä = kamera (DroneNosto, kamera-osa) ja ympäristö.
- Jatko aamuksi tarvittaessa: west x −30…−18 / z 0…60 vielä tyhjä; liito-alue (x 28–40, z 82–96) pidettävä vapaana.

## MUUT AVOIMET (ennallaan)
- Rakettivideo Mac-tallenteena yöllä (_tyo/pelikoodari/mac-rakettivideo/aja.zsh); Mac WASD 4814ab2d1; hiha-uv1 kainalopatch c7d85b1a.
