# PT:n luovutus 30.10.2026 klo 21.20

Edellinen: viesti-fable-luovutus-20261030-1920.md. Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-30-klo-2012-2116.md.
Viestit aina id:llä (mcp__ccd_session_mgmt__send_message; SendMessage pysähtyy 10 viestiin). Osoitteet: /Users/Shared/Claude/osoitekirja.md.

## Tehty
- OMISTAJAN PÄÄTÖKSET 19.22 kirjattu: automaattinen tiivistys pois (idleCompaction false, 7.37 + tilinvaihto.md kohta 6, PR 5653);
  tilinvaihdossa kaikki sessiot nollataan heti aluksi, myös KK ilman korttia (7.37 + tilinvaihto.md kohta 1, PR 5654).
- Valo (VS): nopein tapa = instanssien elävä varjo (4b54413d7) + taustan ja rakennusten uusintaleivonta auringolla 30°/188°, arvio 8–12 h;
  86 ruudun atlaksia EI. Omistajan neljä varjoehtoa (KK 19.3x) ovat valmiin määritelmä: yksi aurinko, tarkista_leivonta = 0,
  sovitetut parit + lähikuvat reunoista, muurivarjot iPadilla kerran. VS:n ensimmäinen varjo- ja kaskadipari olivat mitättömiä
  (pelin oletus = vertailuvalo, omistaja 27.10. 10.56) → PT:n kuittaus peruttu; uusinnat `valo vertailu 0`.
- Unity 6.7 (NS+VS, KOOSTE /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/grafiikka67/KOOSTE.md): iPad Pro = Ultra (varjot 4096, MSAA 4).
  STP paras (11,7 ms, ei jetsamia), kaskadit 2 iPadilla EI (+6–12 ms, vain Mobile), AgX hylätty, GRD/APV/Forward+/SSAO/SSR EI.
  Jetsam ei 216-regressio (vain restart-toistossa, myös b6:lla); juna 216 ~14,7 ms vs 213 ~12,2 ms; b7:llä enemmän muistivaroituksia.
- NUI juoksu-valmis (Videopelit-osio kaikille 2.185 + NaytaPaikka) ja PK osasarja-v4 9ae1b6277 (esto v22 ämpärissä 21.11) junassa:
  juna 216 runko 3f30ef0cb, testit vihreät.
- Linjan 2 tilavuoto korjattu (NS 70f507343: PlayerPrefs + datakansio nollataan ajon alussa); syy PK:n 12 m:n kameraan.
- Asemataulu: hoitajan cron 30 min (perus) + Postivahti herättää Boostin aikana (omistajan kortti 14.10. 23.39); laitteet.py rooli
  työkansiosta (PR 5661). PT:n taulutiedostojen ts aina ms-lukuna (muisti asemataulu-ylatason-ts).
- Luovutukset mainissa: VS 5655/5658, PK 5656/5662, NS 5657, NUI 5660.

## Kesken (jono)
1. JUNAN 216 LÄHTÖEHTO: osasarja-v4 toi regression kujille 02/05 (vasemman muurin kivijalassa porras ja vaalea nauha;
   P = /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/piirrokset-20261030/v4-parit-5). PT kuittasi parin virheellisesti, KK huomasi.
   LAV korjaa etusijalla (arvio pyydetty) → PK kokoaa → omistajalle VAIN sovitettu pari peli vs havainne. Jos ei ehdi: v4 pois (NS:llä kirjattu).
2. LAV: rakennukset-v86 leivonnassa (1 Blender, valmis ~05.30); tausta-v82 + muurikate-v30: tarkista_leivonta 3520 vikaa →
   taustan uusinta TUPLAT=1 + kujan 1-3 lattiakorjaus VASTA rakennusten jälkeen (ei kahta Blenderiä: swap 24/24,5 Gt).
3. VS: METAL 4b54413d7 + uusintaparit (valo vertailu 0) + STP vs MSAA -kuvanlaatupari; ota 70f507343 työkalupuuhun.
4. PK: kiinteä siemen nyt (~1 h); aukeavat portit vain, jos pelaaja ei jo voi valita reittiä risteyksissä (PK selvittää ensin).
5. Valoerän lopuksi kortti KK:n kautta: laitetaanko valo peliin oletuksena päälle (nyt vertailuvalo).
6. Levy ~95 Gi, swap ~24 Gt; alle 90 Gi → PT pysäyttää LAV:n leivonnan väliaikaisesti (Postivahti ilmoittaa). T7:lle ei enää siirrettävää.
7. Tilinvaihto arviolta su 1.11. ~10–12: KAIKKI sessiot nollataan heti aluksi (uusi 7.37).

## Säännöt, jotka opin
- Katso pari itse ennen kuittausta ja vertaa vanhaan: näkyvä uusi ero = regressio, ei "tekijän selitys riittää".
- Valopari aina `valo vertailu 0`; oletuksena peli on vertailuvalossa.
- Asemataulun junat: edistys 0–5, TF-rivin teksti alkaa "Uutta (pvm klo; myös Macille):", eteneminen.json osoittaa avoimeen junaan.
