# Porttikäytävä keittiön tasolle — kartoitus ja työsuunnitelma (Linnanrakentaja 12.10.2026 23.4x)

Linnan laajennuksen 1. erä (omistaja 23.0x, PT hyväksyi suunnitelman; LS2 tekee natiiviin tilakohtaisen "taso"-kuvauksen).

## Nykytila (kävelyosa porttikaytava-T102)
- Lähde `olavinlinna-kavely-v1/lahde/kavely.py` r. 215–247 `porttikaytava()`, OSAT r. 1316, PINTA kivi r. 1352, MARKYYS 0,25 r. 1360,
  naapurit ulkoalue + vesiportti r. 1341; syöte `lahde/reitti.json` (alku (−32,6; −5,6; 20,0), loppu (−26,1; −2,74; 10,6)).
- Pituus 11,43 m, suunta 55,3° (kierto_y 0,9658), leveys 4,3 → 1,9 m, ramppi 10,23 m (−5,60 → −3,42, 12,0°) + 4 askelta (0,30 × 0,17)
  tasolle −2,74. Seinät 0,8 m laatikoita, korkeus 2,6 + 0,4; holvi rappausta 3 särmällä. Rajat x −35,0…−25,2, z 10,05…21,66, y −5,71…−0,07.
- Paketti: `kavely/porttikaytava-T102{,-tormays,-kavely}.glb` (434 / 432 / 156 kolmiota), valoatlas `kavely/valot/porttikaytava-T102{,-512}.jpg`
  (vain valo, ei väriä, ei tulta). osat.json-avain `porttikaytava-T102` (ei `tila`-kenttää). Merkit: ovet alku/loppu, reitti pelaaja-7/8.

## Totuusraportti (#4417, kohta 7)
1499 E 102: n. 10,75 m, leveys 1,8–2,9 m, keskiosa kiviholvattu, lattia MUKULAKIVEÄ VESIKOURUINEEN, nousu 0,7 m (peli 2,86 m — pelin oma,
pidetään kävelyn vuoksi, TULKINTA). Ei vesipeiliä, ei soihtua sisällä (lyhty/kynttilä), ei ritilää/nostosiltaa ilman TULKINTA-merkintää.

## Keittiön ketju (malli)
`olavinlinna-keittio-koehuone-v1/`: rakenna.py (tila, valot, merkit, UV1) → leivo.py (albedo 8k, emissio 4k, irradianssi 4k 2048 näytettä,
luotaimet.json) → jalki.zsh (yhdista.py RGBM + ASTC, savy.py kevyt, vie.py glb extras.pinta + liekki-/valo-/sade-solmut, sijoittelu) →
detalji.py, savu.py, tormays.py. Keittiökohtaista: kuori.py (seinät C1..C5, TK, AUKOT), kalusteet.py, rakenna.py (merkit, kuu, peitto),
leivo.py r. 50 (luotainhila), vie.py (objekti keittio-g102). Yleistä: kk.py, materiaalit.py, kuori.seina(), yhdista.py, savy.py, astc.py,
detalji.py, leivo.py:n albedo/irr-osat. Budjetti: huippu ≤ 150 k / kevyt ≤ 40 k; albedo 8k 39,8 Mt + irr 4k 22,4 Mt; HDR-huone ~0,9–1,0 Gt
muistissa (LS2) → yksi huippuhuone kerrallaan.

## Työsuunnitelma (porttikäytävä v1)
1. Uusi kansio `_valmiit/olavinlinna-porttikaytava-v1/lahde/`: `kaytava.py` = paikallinen (s, w, y) -koordinaatisto (s pitkin käytävää 55,3°,
   w poikittain), kaltevat ja kapenevat seinät (kalkittu/rapattu luonnonkivi Kohokuviolla, kosteusraja), oikea kiviholvi keskiosaan,
   lattia mukulakivi (uusi materiaali, kivet geometriana huipussa) + kaksi vesikourua, 4 askelta, ovipielet. Geometria seuraa
   kavely.py:n rajoja (seinien sisäpinnat = törmäys), joten kävely- ja törmäysglb:t pysyvät ennallaan (ei botin jumiriskiä).
2. Valot: 2 seinälyhtyä (kynttilä, liekki-tyhjät 00-lyhty / 01-lyhty) + yötaivas aukoista; ei soihtua. Esineistö KCD2-tiheydellä: köysikieppi,
   tynnyri, kärryn pyörä seinää vasten, olkia lattialla, ämpäri (Poly Haven CC0 + omat; budjetin rajoissa).
3. Leivonta keittiön leivo.py/yhdista.py:n yleisillä osilla → valot/ HDR-albedo + irr RGBM + luotaimet.json; vienti v3e-rakenteella
   (tila-id porttikaytava-t102, glb/ huippu+kevyt, esineet/ + astc/, sijoittelu-<taso>-v1.json).
4. Ennen | jälkeen -pari PT:lle samasta kulmasta (Blender-esikatselu + LS2:n pelikuva) → LS2 kytkee tason → Siirtoseppä botti → iPad-muistiajo.
5. Samassa erässä keittiön halon haalea monikulmioverkko pois (PT 23.2x): v3d_tuli.py halkeamat() → vain kohinapohjaiset hiussäröt.
