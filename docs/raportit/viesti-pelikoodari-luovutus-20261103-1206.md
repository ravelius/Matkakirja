# Pelikoodari: luovutus 3.11.2026 klo 12.06 – juna 218

Edellinen: -20261103-0957 (bf5fcbcaa) – voimassa, ellei alla toisin. Syy: konteksti (hook 25 %).
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218 (paikallinen), kärki **d02658dc8**.
Testit: bash Peli-testit/kaanna.sh (EI zsh) 804/804; zsh tyokalut/tarkista.sh → unity-tarkistus 0.

## Tehty 10.0x–12.06
- **Juna 218 (PT kuittasi 10.2x):** pelikoodari/juna-218-z **eb2b057bc** = natiiviseppa/juna-218 8d18d7047 + sali-218z 9cf0c1c2c
  + LAV:n friisi (osasarja-v8 + tausta-v115, esto-v38) + liikepoikkeus Esikatselu.cs:486. JU kuittasi; paketit ämpärissä.
  Worktree /Users/Shared/Claude/wt/proto-pelikoodari-juna218z. taso1b-218z 0/7/0/12 ≤ 218y 0/13/0/14.
- **218aa-taulukko** (sali-218b/taulukko-218aa.md, PT kuittasi): ei voittajaa, junassa pysyy 218z. xf-218aa:n 834 massaruutua ovat
  tallenteen jälkeen (maalihyppy) → ei vikaa (korjattu PT:lle).
- **LAV-kytkennät kapea-reitti-218:aan** (EIVÄT vielä junassa; junaan PT:n editoriparikuittauksen jälkeen):
  f7cd1b75a osasarja-v7 → 8b303cc30 v8 (ämpärissä oli eri v7) → f8dd0bcaa v9 (reunakivi) → **d02658dc8 v10** (kansikivi, sävy;
  SHA256SUMS c439b6a8bf2e). LAV tekee editoriparin 01/02/03b PT:lle. Junaan: juna-218-z:n v8 → v10 (yksi rivi Osasarja.cs).
- **Kameran sivusuoja** (PT 11.2x: räystäs/kattotapaus kamerasuojaan): ty s 58,6 = portin tunnelissa kamera 1,2 m akselin sivussa
  pielen massassa, KameraSuoja ei löydä vapaata rintaa kohti LapikulkuLahin 2 m:n ulkopuolelta.
  5238f873c KameraSivuSuoja (DroneNosto.cs, testi KameraSivuSuojaTunnelinAkselille) + **c50c8c5ee** kohde keisarin polulta
  (KameraPolku) tai suunnan mukaan, lyhyempi toimiva. Loki "kamerasuoja sivusiirto".
  218ab (vain suunta): ty massassa 60 (ei apua, 1 ruutu). **218ac** (runko pelikoodari/sali-218ac **3066749f0** = juna-218-z +
  5238f873c + c50c8c5ee): **ty massassa 57 → 34**, reunassa 103 → 150, piilossa 25, vetoja 74.
- Tripo: vedenkantajan kaato vastattu postilaatikkoon e75d9464d (2 × 2–3 s kaato oikea/vasen, täydet ämpärit, vesisolmut
  pelisopimukseksi, pyydetty kaatoaukkojen ja astian aukon paikat). Arkiset hahmot nyt Tripolta (PT 10.4x).

## Käynnissä / SEURAAVA
1. **218ac-sarja JU:lla L1** (ketju-ac.zsh ty xf th yk cx tj cc ys taso1b; loki julkaisija-tyokalut/l1-218ac.log; ty valmis 12.05).
   Valmiina: `cd /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218b; python3 -I mittari-taulukko.py yk-218z yk-218ac cx-218z
   cx-218ac tj-218z tj-218ac ty-218z ty-218ac th-218z th-218ac xf-218z xf-218ac cc-218z cc-218ac ys-218z ys-218ac taso1b-218z taso1b-218ac`
   → taulukko-218ac.md (otsikko kuten taulukko-218aa.md) + PT:lle ≤ 3 riviä. Mittari tuntee -218ab/-218ac.
   Jos 218ac parempi (massassa pienempi, taso1b ≤ 0/7/0/12): ehdota PT:lle 5238f873c + c50c8c5ee juna-218-z:n päälle.
2. ty-218ac:n jäljelle jäävät 34 ruutua: jaksot 203,4 (3), 203,8 (16), 205,1 (12) s; katso unity.log "sivusiirto"/"rakennusmassassa".
   Reunassa kasvoi (kamera tunnelin akselilla kapeassa tunnelissa) – arvioi, onko haitta.
3. Ennallaan: tj massassa 44, ys 46–47 (salit-218l-havainnot.md). 218ab-hakemisto (ty + xf) vain vertailuun.
4. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/pelikoodari-20261103-1206.
