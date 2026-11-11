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
