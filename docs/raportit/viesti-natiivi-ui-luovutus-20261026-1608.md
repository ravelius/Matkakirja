# Natiivi-UI: luovutus 26.10.2026 klo 16.08 (kova raja 80 %, Postivahti)

Korvaa -20261025-0531:n. Tili vvi@vvi.fi. PT = local_5df52e10-10e4-4b72-9554-0049db300dfe, KK = local_6088bfc8-24ad-4659-a322-5e4ed78c89b7,
JU = local_d8cad7de-3ff8-4f4b-8787-baa80836e175, NS = local_8254cd90-9a85-4d61-8a06-085e7562f05f, PK = local_4b3286ad-3ff4-4ca0-9d8f-feab0680bef6,
LR (Lavastaja) = local_15010198-38f5-44fd-a643-011ac655a5ff, VS = local_f3b04fb1-df57-4da8-80c9-d297a95f504e, KS = local_eec7f158-d9f3-4b93-9368-c50935bd19ab.
Simut: iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A, iPad11 F7513985-C8BC-4E97-8D29-9C9BD420E962 (vuoro JU:lta, raja 2 käynnissä, lopuksi "SIMU VAPAA").
Viestiraja: kun SendMessage pysähtyy, mcp__ccd_session_mgmt__send_message session-id:llä.
Estot (PT 26.10. 10.1x): metal-tarkistus.sh / MetalTarkistus.Kaanna ei ennen VS:n korjausta; ei screencapturea; L1:n Unity-ajot JU:n
ilmoituksen mukaan. Hiljainen tunti: ei testejä, kun omistaja käyttää Macia.

## VALMIIT JUNASSA 211 (kaikki natiiviseppa/juna-211:ssä)
- Juoksun latauspalkki (omistaja 26.10. 13.32 "lisäksi pitää lisätä latauspalkit"): natiivi-ui/juoksu-latauspalkki-211 5abdf79e6.
  Todellinen eteneminen (Peli: JuoksuLatausEdistyminen + 5 testiä; JuoksuSokkeloMaailma.LatausValmiit/LatausYhteensa; JuoksuV4Maailma.LatausOsuus),
  paikka joka ruudussa otsikkokuvasta: pysty otsikon alle, vaaka otsikon yläpuolelle (PT 15.0x; PK:n VaakaOtsikko 2d0455df3 → seuraa uutta kuvaa).
  Kuvat: proto-3d/lokit/latauspalkki-20261026-1440/ (simu, pysty+vaaka) ja latauspalkki-vaaka-20261026-1520/ (editori, vaaka). PT:lle lähetetty,
  KUITTAUS AVOIN. Odottaa: Codexin 2560×1180-vaakakuva + KEISARI-RAJAT.json (posti/latauskuva-valokuva-20261026/, PK ilmoittaa) → tarkistus
  "palkki ei keisarin rajan sisällä" ja kuvat uudesta vaakakuvasta PT:lle.
- Tietoja: elävän kartan tekijämaininta (KS:n pyyntö): natiivi-ui/tietoja-elava-kartta-211 8316b51cc.
- Havainne-editori: oletus REF/RUNKO juna-211 (b6), eri Unity-version REF → VIKA (3e64c8d20); esikatselun oma datakansio
  "Matkakirja 3D esikatselu" (9c854518e, ajotestattu 15.04/15.16); leveys.py + testit (79b5abab9); tuntematon komento → VIKA, paketit lokiin,
  pakettitarkistus, lämmitysruutu, pintatarkistus (aiemmat). LR:lle lupa havainne-ajoille annettu (eristys mukana).

## MITTAUKSET (25.10., docs/raportit/havainne-mittaus-20261025.md, main)
- Omistaja 11.31: koko pysyy (korkeus 1,0), kujat 02 ja 05 levennetään (LR). Sovittu LR:n kanssa: 02 muurit 6,6 m + reunaporras 0,95 m, väylä 4,7;
  05 muurit 9,0 m + porras 0,75 m, aukko 6,8 m. LR:n ehdotus 2 mitattu (< 10 % havainteesta), PT kuittasi; kolmikot omistajalle, kun LR vaihtaa
  reunaportaan värin.

## AVOIMET
- Nimitekstin 4 kuvaa uudelleen VS:n valon jälkeen (PT ilmoittaa rungon); tarkista piha täysikokoisena (ei puhki).
- Mittariajo VS:n valoparille ja LR:n kujapareille, kun PT pyytää (havainne-editori juna-211:n editori.sh:lla).
- Esikatselun lokikansio on minuuttikohtainen (esikatselu-YYYYMMDD-HHMM): samaan minuuttiin osuvat ajot jakavat kansion (huomio, ei korjattu).
- Proto-worktreet jäljellä (ei mergetty): proto-natiivi-ui-aarrevideo, -juoksu-nimet-208, -uni-smaragdi-204.

## Opit
- zsh: "$REF:Assets…" tulkitaan modifieriksi (:A, :P) → aina ${REF}:polku git show -komennoissa.
- Havainnekuva mitataan aina pelikameran perusasennolla (3,8 m / 14,2°, 38,8°), ei pelin nostetulla kujakameralla; vain kuvassa näkyvät pisteet
  (tyokalut/havainne/leveys.py).
- latausIsa.layout voi olla NaN, kun latauskuva tulee näkyviin → asettelu joka ruudussa, ei vain GeometryChanged-kutsussa.
- ui puu ohittaa alle 16 pt korkeat elementit (3 pt palkki ei näy puussa).
