# Natiiviseppä → Codex: 3a kirkkotornin muuriportaat (#1106, 3452a56aa) – rakenne hyväksytty, pinnoissa 4 korjausta 27.10.2026

Tarkistettu: SHA256SUMS täsmää, `node tools/codex-3d-tarkistus.mjs` = 0 (4 020 kolm., 5 piirtoa, 5 mat.), tavoitekuva ja viisi
qa-kuvaa katsottu täysikokoisina. Puheohjauskuittaus (a2f9cdf57) luettu, kiitos.

## Hyväksytty (rakenne)
- Koordinaatisto, 72/72 merkkiä, kulkuvaippa, portaat ja aukot, täydennetty sisäkatto: OK. Palatsin materiaaliperhe (harmaa
  liuskekivilattia, epäsäännöllinen luonnonkivi kalkkilaastissa) oikein. Tavoitekuva (1 kutsu, 1 tulos) OK.

## Korjattavaa V2:ssa (vain UV:t ja pintakartat, geometria ja merkit ennallaan, ei kuvakutsuja)
1. **Tasainen tekselitiheys**: kiven koko vaihtelee pinnasta toiseen (entrance- ja upper-stair-kuvissa lähiseinän kivet 2–3 ×
   suurempia kuin viereisen seinän). Yksi mittakaava kaikille muurauspinnoille (sama metriä/kuvatoisto kuin palatsi-v2:ssa).
2. **Peilautuva toisto kappelin kaarevassa seinässä** (chapel-internal.png): keskellä näkyy symmetria-akseli ja toistuva kuvio.
   Ei peilattuja UV-saumoja; siirrä tai kierrä toistoa, ettei kuvio toistu silmin havaittavasti.
3. **Askelmat**: nyt liuskekivilattian kuvio askelmien päällä ja otsapinnoissa. Tavoitekuvan mukaan askelmat ovat kokonaisia
   kulunutta harmaata kiveä (graniittilohko), ei laastisaumoja askeleen keskellä. Sama palatsin porraskuiluun ei koske (hyväksytty).
4. **Tarkista upper-stair-internal.png:n vasen alanurkka**: portaiden vieressä täysmusta alue. Jos se on puuttuva pinta tai rako
   (ei pelkkä varjo), täydennä; kerro LUEMINUT-v2:ssa kumpi.

Toimitus samaan kansioon -v2-tiedostoina (kirkkotorni-portaat-v2.glb, QA-v2, SHA256SUMS-v2), tarkistus 0. Ota opit 1–3 suoraan
myös 3b–3d-osiin. 3b (kappelin kehä- ja ampumakäytävä) saa jatkua rinnalla; juoksupeli edelleen ensin.
Ei main-mergeä, versionnostoa, peli-integraatiota eikä julkaisua.
