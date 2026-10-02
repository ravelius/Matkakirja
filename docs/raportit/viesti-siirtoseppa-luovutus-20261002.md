# Siirtosepän luovutus 2.10.2026 klo 22.0x (Opus 5.5, high)

Edellinen luovutus: viesti-siirtoseppa-luovutus-20261001.md (ensilataus, ympäristö, osoittimet). Tämä korvaa sen jonon.

## JONON KÄRKI

1. **Linnan hahmojen jalkavarjo (omistaja 20.2x: "kävelijä tarvitsee vielä varjon jalkojensa alle") — EI VIELÄ NÄY.**
   Haara `siirtoseppa/linna-skin`, kärki **39a396e3** (KÄÄNNETTY 8219c063, app lokit/siirtoseppa-skin16-app).
   Toteutus: `DioraamaHahmot3D.LisaaKontaktivarjo` (levy jokaisen 3D-hahmon juuren alle, 17/17 syntyy, materiaali ok) +
   `Linssit/Resources/Varjostimet/DioraamaKontaktivarjo.shader`. Faktat simusta (lokit/siirtoseppa-skin10…15):
   - punainen levy, peitto 1, ZTest Always (`poikki skin varjokoe`) näkyy aina oikeassa paikassa ja koossa;
   - peitto 1 + LEqual näkyi (skin14 h-peitto_1, h-ztest_lequal_peitto_1.0), peitto 0,6–0,9 ei näkynyt edes Alwaysilla;
   - float-kentät, `Blend …, Zero One` ja kertova `DstColor Zero` (RGB 0,63, alfa 1) eivät tuoneet varjoa näkyviin.
   Juurisyy auki. Seuraava ajo on valmiina: `ajo-linna-skin.sh` + KOKEET, joissa sekoitus ja väri vaihtuvat ajon aikana
   (`poikki skin sekoitus=kerto|alfa|peite`, `rgba=r,g,b,a`, `ztest=always|lequal`, `veto=m`, `peitto=x`), ja analyysi
   `python3 tyokalut/siirtoseppa-ajot/varjo-analyysi.py <L>` (ero perustilaan talonpojan ympärillä, ruudukko). Ehdotettu sarja:
   `KOKEET="sekoitus=peite;ztest=always;rgba=0,1,0,1 ztest=lequal sekoitus=kerto;rgba=0.5,0.5,0.5,1 rgba=0.9,0.9,0.9,1 sekoitus=alfa;rgba=0,0,0,0.6 rgba=0,0,0,1 ztest=always;rgba=0,0,0,0.61"`
   `VIDEO=2 LAITE=iphone L=…/siirtoseppa-skin16 HASH=275a276538ace40a APP=…/siirtoseppa-skin16-app/Matkakirja3D.app ajo-linna-skin.sh`.
   HUOM muistio metal-half-vakiopuskuri.md (Päätoimittaja kirjasi "half"-juurisyyn) on luultavasti väärä — korjaa, kun syy selviää.
   Varjo on tarkoitus sitten pyytää Natiivisepältä junaan 130 (ilman testikomentoja tai niiden kanssa, ne ovat harmittomia).
2. **Linnan skinnatut hahmot** (omistaja loki 59b9df127, Linnanrakentajan CC0-mallit): moottori junassa 129 (6ad1ab62 + b126d548
   masterissa, BUILD 129). Näkyvät vain uudella paketilla: Linnanrakentajan uusin **275a276538ace40a** (10 henkilöä, 16 esiintymää,
   y-korjaukset fatabuuri/kappeli). Osoitin EI vaihdettu: Päätoimittaja vie omistajalle vasta varjon ja hahmoerän kuvien jälkeen.
   Omistaja: liike ok, moonwalk korjattu (LookRotation(−kasvot) skin-polulle), sävy v3 ok.

## Tämän päivän valmiit (2.10.)

- Linnan valikko + pienoiskartta + Muurinharja (omistaja 14.44 ja 17.4x): linna-valikko e36f8a51 junassa 127 (masterissa).
  Pienoiskartta OHJAUSNAPPI-iso-kehyksessä (Natiivi-UI b76b91a7), puhujan nimi kortin kapiteelina, Pulu kortin kulmalla.
- Linnan puhevuoro (luento ↔ linna, kertojan laatikko) linna-puhevuoro-4 2e0f060a, piikit linna-piikit-2 db3ed117 — masterissa.
- Mylly (pelit-9 30986585) masterissa.
- Skin-moottori: DioraamaGlb lukee skinit/animaatiot/float COLOR_0, `Ydin/Dioraama/DioraamaSekoitin.cs` (AnimationMixer-pariteetti,
  crossFade 0,25 s, kävely = reittinopeus × kesto / kavely_sykli_m), malli3d.skin-alakenttä (`Malli3d.NatiiviGlb`).

## Proto-worktreet

- `/Users/Shared/Claude/wt/proto-siirtoseppa-vesi` — nyt haarassa `siirtoseppa/linna-skin`.
- `/Users/Shared/Claude/wt/proto-siirtoseppa-pelit5` — `siirtoseppa/pelit-9` (masterissa, voi poistaa).

## Skriptit (proto-3d/tyokalut/siirtoseppa-ajot/)

- `ajo-linna-skin.sh` (HASH, APP, L; VIDEO=s, TILAT="keittio kappeli …", VETOT, KOKEET) — kuvat Muurinharja/keskushalli/huoneet,
  `poikki skin tila|valkoinen|kuva|varjokoe|varjo`, video. `varjo-analyysi.py`.
- `ajo-muurinharja.sh` (ENNEN/JALKEEN, LISA=1 laituri + Ajattelijat), `ajo-linna-valikko.sh`, `ajo-ristikatkaisu.sh`.
- Lokikansioon vain kuvat, konsoli ja YKSI uusin .app (Päätoimittaja 20.4x).

## Säännöt (ennallaan)

Käännös vain Julkaisijan NYT KÄÄNNÖS -viestillä (proto-kaanna.sh, nice 15; tarkista merge-SHA:n esivanhempi ennen .app-kopiota),
simulaattori vain SIMULAATTORI NYT -vuorolla (F989814A / D5900D45), lopuksi uninstall + shutdown + "simu vapaa". Merge-pyynnöt
Natiivisepälle, viestit Päätoimittajalle ≤ 8 riviä, osoitin vain omistajan OK:lla Päätoimittajan ja Julkaisijan kautta.
