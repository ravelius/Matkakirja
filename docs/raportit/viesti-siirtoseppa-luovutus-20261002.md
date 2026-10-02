# Siirtosepän luovutus 2.10.2026 klo 22.1x — LOPULLINEN (tilinvaihto, Opus 5.5, high)

TILINVAIHTO 22.1x: koesarjan simuajo (SIMULAATTORI NYT 22.10) keskeytettiin ennen käynnistystä — F989814A:ta ei käytetty,
koesarja on ajamatta. Jalkavarjon tila: 0592decd (alfakanava ennallaan) TODENNETTU EI TOIMIVAKSI 21.20; myös b126d548,
7859df3e ja 84406601 todennettu ei toimiviksi; kärki 39a396e3 (koesarjan testikomennot) käännetty, ajamatta.
Peilipaketit (osoitinta ei vaihdettu): 5de728bc349cc54a = kaikki 10 skinnattua henkilöä; 275a276538ace40a = sama + y-korjaukset
(fatabuuri +0,10, kappalainen +0,22) — uusin. Skin-osoitin (2abec0c9 → 5de728bc/275a2765 tai seuraaja) vain omistajan OK:lla
Päätoimittajan ja Julkaisijan kautta, Päätoimittaja vie kysymyksen omistajalle vasta jalkavarjon ja hahmoerän kuvien jälkeen.


Edellinen luovutus: viesti-siirtoseppa-luovutus-20261001.md (ensilataus, ympäristö, osoittimet). Tämä korvaa sen jonon.

## JONON KÄRKI

**PÄIVITYS 22.47 (uusi tili): JALKAVARJO RATKAISTU.** Juurisyy: varjo piirtyi koko ajan (pikselimittaus: lattia ~0,6 jalkojen alla
skin14–17), kerroin 0,63 oli vain liian heikko. Korjaus kerroin 0,3 = proto `siirtoseppa/linna-skin` **4d324efa**, käännös ad36e7a5,
simutodennus F989814A 22.44 (lokit/siirtoseppa-skin18, erän 1b kuvat 7 huoneesta, 0 virhettä). Merge-pyyntö Natiivisepälle junaan 130
ja kuvat Päätoimittajalle lähetetty 22.47. Avoin: skin-osoitin 2abec0c9 → 275a2765 omistajan OK:lla (kohta 2). Alla oleva kohta 1 on historiaa.
SEURAAVA (Päätoimittaja 22.5x): Linnanrakentaja korjaa muurinharjan reitin (vartija kulkee talonpojan läpi videolla 3,9–5,0 s) ja
tarkistaa 7 huonetta → uudella peilillä kuvaa muuttuneet huoneet + muurinharjan video (ajo-linna-skin.sh, simuvuoro Julkaisijalta) → Päätoimittajalle.
Juna 130: 4d324efa koostumuksessa 4e1f150f, skin-osoitin pysyy 2abec0c9:ssä.
TEHTY 22.59: peili 01fb6118 (Linnanrakentaja) kuvattu, lokit/siirtoseppa-skin19 (Muurinharja+video, keittiö) → Päätoimittajalle; odottaa sen arviota.

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
