# Natiivisepän luovutus 11.11.2026 klo 09.36

Edellinen: -0917 (17afbfbb2 + lisäykset 786e5d73a, 992fb26db) VOIMASSA paitsi alla päivitetyt. Syy: kontekstivahti 26 % (7.37).
Cron (klo 9.04 unity-julkaisut.py) ja vahti sessiokohtaisia: LUO UUDELLEEN. Vahti: Monitor
`bash /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/ajovahti/vahti.sh` (kattaa natiiviseppa-saapuminen-*, -laattalataus-*, -juoksu-*).
Iso iPad TAUOLLA 09.31 alkaen (error 22, JU:n launch-testi 15 min välein) → kaikki alla olevat iPad-ajot odottavat sitä (PT: mittaukset vain isolla).

## 1. SAAPUMISKOE 2 – mac-2 LUETTU, KK:lle lähetetty (kärki)
Tulos: _tyo/natiiviseppa/saapuminen/tulos-mac-2.md. K1–K4 toimivat (peite sumea, nimi+iskulause 1. kuvassa, häivytys "valmis, kesken –" 15,4 s, lähestyminen 2,7 s perillä).
Leikkaamaton tallenne KK:lle 09.3x (lokit/natiiviseppa-saapuminen-mac-2/saapuminen-koko.mp4), kopio PT.
AVOIN, KK:n vastaus odottaa: 36,9–37,9 s häivytyksen jälkeen kaupunki vaalea/latistunut, 38,1 s tarkka piirros kerralla (kamera 20° → AjaKeskustaanKiertaen,
piirroksen lähitaso vasta ajossa?) – tarjottu korjausta, jos KK haluaa pehmeän.
Toisen saapumisen kuvat n1–n3 väärissä kohdissa (oleta lukee koko lokin → löysi 1. saapumisen "peite alkaa"/"kierto 45"). iPad-skenaario
sk-ipad-saapuminen-muisti-1.txt KORJATTU (oleta "nimen napautuksesta" + odota 6 / 25). iPad-muisti-1/-2 (1c92f7cea) JU:n jonossa → muistihuippu KK:lle (katto 3940).

## 2. LAATTAMUISTI (PT:n sana 09.3x): SSE ei vipu → välimuisti/rasteri erikseen
SSE-1 luettu → _tyo/natiiviseppa/laattalataus/analyysi-2.md (+ pari-sse1-horisontti-16-32-64.png): horisontti sama 16/32/64; muisti seuraa rasterilaattoja (ov),
sse64 4887 Mt; historia 3676 vs. tuore tileset 2851 Mt. SSE-2 hylätty (198 × Curl 28, laatat vajaat).
UUSI wt /Users/Shared/Claude/wt/proto-natiiviseppa-laattamuisti (haara natiiviseppa/laattamuisti 31951d8c9 = juna-224 494595623 + komennot
`maasto rasteri <sse> <tekstuuri>` ja `maasto valimuisti <Mt>`, oletukset ennallaan, unity 0, pushattu natiivi-backup). EI junaan.
Ajot JU:lla (ajopyynto-ipad-muisti.md): sk-ipad-muisti-1 (välimuisti 64), -2 (+ rasteri 4), -3 (+ tekstuuri 1024) → lokit/natiiviseppa-laattalataus-muisti-{1,2,3}.
Luenta: python3 -I <scratchpad>/jaksot.py tapaan (N fp, A malloc/iogpu, U tex/Pallo/ov aikasarja); vertailu SSE-1 alkujakso 3513–3676 Mt.
PYSÄHDY kun huippu < 3200 Mt ilman näkyvää eroa (h80-muistiN ja lahin-muistiN; lahin-muisti1 = vertailu tekstuurille).
Ajon 3 voi perua: touch /Users/Shared/Claude/julkaisija-tyokalut/ns-laattamuisti-peru-3. Tulos PT:lle (3 riviä + tiedosto).

## 3. JUOKSUPELIN PIIRTO
- Kopio pois oletuksena 6f8e910ed (natiiviseppa/juoksu-piirto). JUNAEHDOKAS 474fb5642 (natiiviseppa/juoksu-kopio-ehdokas, wt proto-natiiviseppa-juoksukopio,
  = juna-224 494595623 + merge fb62178af+6f8e910ed, unity 0) → sha PT:lle 09.3x, PT kirjoittaa pt-ok:n.
- Heijastuksen rajaus ja PaivitaKappaleet JÄTETTY (mittaus: ei hyötyä; peli GPU-sidottu). PT kuittasi.
- Isot vivut KK:lle valittavaksi (PT: kuvaa muuttavat = KK:n päätös, EI junaan ennen valintaa): parit _tyo/natiiviseppa/juoksu-piirto/vivut/
  (msaa −10,8 + keisari/reunat 100 %, varjot p1 −9,4 / p2 −4,7, leivheitto −5,7), kopio PT.
- "Varjo vain lähelle" -välimuoto: sk-juoksu-varjomatka.txt (perus / varjomatka 80 / 40, P1+P2 jäädytettynä), ajopyynto-varjomatka.md JU:lla
  (käännös 474fb5642) → lokit/natiiviseppa-juoksu-varjomatka-1. Luenta: juoksu-piirto/lue.py <kansio>; pari samasta kehyksestä + ms-kaista → KK, kopio PT.

## 4. Muut ennallaan (-0917 kohta 4).

## VIESTIT TÄLLÄ VUOROLLA
PT: SSE-1-luenta; kopio pois + jätetyt; junaehdokas 474fb5642; vipuparit (kopio); mac-2 (kopio).
JU: laattamuisti 1–3 ajopyyntö; varjomatka-ajopyyntö. KK: vipuparit; mac-2-tallenne + avoin 37–38 s.

## LISÄYS 09.4x: KK:n valinnat (kaksi viestiä 09.4x)
JUOKSUPELI: 1) leivotut eivät heitä elävää varjoa → TEHTY 41bbbc320 (natiiviseppa/juoksu-kopio-ehdokas = 474fb5642 + LeivotutHeittavat false, unity 0)
= UUSI JUNAEHDOKAS, PT:lle pt-ok:ta varten. 2) varjot kokonaan pois EI; odottaa varjomatka 80/40 -paria (peruste: hahmon ja lähipuiden varjot säilyvät,
kaukana ei pelaajan mukana kulkevaa rajaa). 3) MSAA: (a) 2× samasta kehyksestä → lisätty sk-juoksu-varjomatka.txt:hen (P1/P2-msaa2, -msaa0; JU ajaa 41bbbc320:llä),
(b) AVOIN: 8 s juoksutallenne MSAA pois | 4× (sama reitti, iPad tai Mac iPad-koossa) – kattotiilien/saumojen välke liikkeessä. KK: 2×, jos yli puolet säästöstä, muuten pois.
4) vastattu KK:lle: tavoite 33 ms; seuraavat vivut (piirtotarkkuus 0,80→0,70, lehvästön ylipiirto, taivas/kaukomaa) vasta parien ja KK:n sanan jälkeen.
SAAPUMINEN ennen junaa (KK, mac-2 katsottu: selvä parannus), TEE wt proto-natiiviseppa-saapuminen (1c92f7cea):
 1) häivytys vasta LOPULLISESSA ulkoasussa (tarkka piirros + talot ruudulla; 36,9–38,1 s vaalea/latistunut → tarkka kerralla = ydinvika pienempänä). EI pehmennystä:
    viimeinen kuva pysyy, kunnes lopullinen tila; jos tilaa ei voi tunnistaa luotettavasti, kerro KK:lle mitä puuttuu. (Epäily: piirroksen lähitaso/talot vasta
    kameran 20°→AjaKeskustaanKiertaen-ajossa; valmius mitataan ennen ajoa → mittaa valmius ajon loppunäkymästä tai aja kamera loppuasentoon peitteen alla.)
 2) odotuksessa kuvat jatkavat kiertoa samalla liu'ulla alusta (nyt viimeinen kuva liikkumatta 31–36 s), ruutu ei saa jäätyä.
 3) iskulause ~1/3 nimen korkeudesta, sama fontti (nyt hiusviiva).
 4) näkyvä rauhallinen ~3 s kallistus jyrkemmästä (niin jyrkästä kuin valmis alue sallii) 45°:een ja suoraan kiertoon (omistaja: "liukua suoraan ylhäältä ~45°").
 Sitten mac-3 (korjaa myös n-sarjan oleta-rivit kuten iPad-skenaariossa) + iPadin muistihuippu KK:lle.
