# Lämpö: laitemittaus iPad Pro 13 (25.9.2026, Natiiviseppä)

Raamattu: NATIIVI PELI ETUSIJALLE → LÄMPÖ JA VIRRANKULUTUS NATIIVISSA, kohta 4 (mittari; laite Natiivisepälle Fablen käskyllä).
Laite iPad Pro 12,9" 5. sukupolvi (M1, iPad13,8, UDID 00008103…), kaapelissa. Mittarit (Fable 25.9. klo 18.5x): thermalState ja
kehysaika. Akkuprosentti jätetään pois, koska lataus vaikuttaa molempiin mittauksiin yhtä lailla. Jakso lokit/natiiviseppa-skriptit/
lampojakso.sh: 10 min, jossa aloitus Ateenaan, kartta levossa ja liikkeessä, kaupunkilehti auki 3 min, radiolinssi 2 min ja lepo.
Lokirivit "MATKAKIRJA lampo {…}" (pelikoodari/lampo-mittari de8fbec8) ja "MATKAKIRJA kehysajat {…}" (KehysMittari).

## Build 15 (master 6ab9d45c + mittari, testihaara testi/b15-lampo dd6a0237), 25.9. klo 18.31–18.42

- Käännös **Development** (laite.sh: MATKAKIRJA_KEHITYS=1), laite valmiiksi lämmin.
- thermalState **2 (serious)** koko 11 minuutin ajan, alusta loppuun (0 nominal … 3 critical).
- Kehysaika (KehysMittari, p50): aloituksessa 33–42 ms, sen jälkeen **59–70 ms (≈ 15 fps) myös levossa**. Tavoite on 8,33 ms
  (120 Hz), ja lampo-rivin fps oli jakson keskiarvona 14–16.
- **LÖYDÖS:** pallo piirtyy levossakin täydellä kuormalla ja jää kuumana 60–70 ms:n kehykseen. Syyt ovat lepopiirron puute
  (build 15 piirtää ja käsittelee laatat täydellä taajuudella, KehysMittari nostaa targetFrameRaten 120:een) sekä serious-tilan
  kuristus. Build 16:n lämpöerä korjaa tämän: Pelikoodarin Ruudunpaivitys ja OnDemandRendering sekä Natiivisepän PallonLepo,
  HDR, varjot, anturi ja lokitus.
- Loki: proto-3d/lokit/lampo/b15-ipad13/konsoli.txt, vaiheet.txt.

## Seuraavaksi

1. Build 15 uudelleen **Release**-käännöksellä (laite.sh ilman MATKAKIRJA_KEHITYS=1), laite jäähtyneenä (thermal 0–1 alussa).
2. Build 16 samoin lämpöerän jälkeen. Vertailuun thermalState-käyrä ja kehysaika (levossa, liikkeessä, lehti ja linssi).
