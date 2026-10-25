# Päätoimittajan luovutus 25.10.2026 klo 03.50 (konteksti 30 %; tili vvi@vvi.fi)

Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10. Edellinen -20261025-0150 (lue vain tämä). Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-25-klo-0205-0349.md.
ALOITA: tuotannonohjauksen osio 0, node tools/raamattu-luku.mjs 7.47 (PT: luvut 7, 8, 9, 12, 14, 4.1, docs/tilinvaihto.md).
Session alussa: Asemataulu open, set_remote_control self, Monitor odottajat-vahti.py + codex-posti-vahti.sh, git fetch origin claude/postilaatikko.
Codex-posti: scratchpad/posti-laheta.sh "viesti" tiedosto. Omistaja nukkuu (00.49 alkaen); yö oletuksilla. Ei TF:ää ilman omistajan sanaa.

## 0. OMISTAJAN PÄÄTÖKSET (voimassa, ennallaan)
- Havainteesta identtiseksi = ULKOASU; paikat ja mitat oikeat (20.10. 07.30). Kaikki junaan 210; TF vasta omistajan sanasta. Kuvakulma 810.
- Alkulennon elokuvateksti "KIELLETTY KAUPUNKI" + "1914", Beijing pois (24.10. 23.52/23.53). Muistokupla 4 lautaspöytä (00.30).
- Vain valmiit palat juoksupeliin, rekvisiitat yksi kerrallaan, funktio ja paikka mietittynä (21.10. 10.18).

## 1. YÖN PT-PÄÄTÖKSET (oletuksella, kirjattu lokiin)
- Codex #947 nimiteksti HYVÄKSYTTY (posti 4c9837b09). NUI kytki: lahtomerkki-210 36faff8f6 (kuvasuhde korjattu, oli 2^n-skaalaus).
- PK: 03B kallistus 7° (ei 4°, PT:n oma ehto). Muurikujissa kamera (b) 5,0 m / 8,3 m taakse / ~18°, jousisiirtymä (kulma-810 kärki
  NS:lle, testi MuurikujanKameraLiukuu). 01 ja 03 pysyvät 810 v6:ssa. 05 kuvataan kujaportilta (−249,4, 382), ei Meridiaaniportilta.
- Lautaspöytä palatsiin: lähtökuja juhlasalin edessä, länsiväylä (−139,6, 420), lautaspoyta-210 9ef3b4332. Ei simu/iPad-välitestejä.
- Salit havainteen 04 mukaan: matot, sermit, maljakot, lyhdyt, kasvit, arkut pois (matot/sermit oli PT:n vanha linja); pylväät ø 0,6 m
  räystään korkeuteen 2,9 m levenevillä jalustoilla; palkisto vain ohut kehä (v39 umpipalkki hylätty: jäi kameran alle). Kaappi #955
  4 kpl. Penkki #954 HYLÄTTY (ristikko revennyt) → uusinta umpinaisilla reliefipaneeleilla #958 lähdekuva toimitettu, #959 Tripo kesken.
- Ämpärissä (JU): tausta-v46, rakennukset-v35 (kujaportin punaiset nastaovet), avoimet-v40 (sisältää v36–v38). 0 virhettä.

## 2. KÄYNNISSÄ (juna 210, ei TF:ää)
- NS: runko 3fdec1feb testeissä (+ grafiikka-211 2d67df7dc Metal-korjaus, NUI 36faff8f6). Lisättävä: grafiikka-211 bcb834541 (laatta,
  albedo × 0,78, kerroin 1,15), lautaspoyta-210 9ef3b4332, kulma-810 uusin kärki (PK lähettää), osoittimet tausta-v46/rakennukset-v35/
  avoimet-v40. Vihreä SHA → PT, PK, VS, NUI.
- VAKAVA VIKA KORJATTU: lattiavarjostin ei kääntynyt Metalissa (int-ternääri → as_type<half>), piha näkyi taivaana; VS 2d67df7dc + testi
  EiIntTernaariaMetalille. Varmista vihreästä rungosta, ettei Metal-virheitä.
- VS: pari 10 (v46/v35 + f4300b2f7 + Metal-korjaus) → täyttö ~0,35 viritys; tavoite aukio ~195 (oli 242), 05 oikea muuri ei mustaa,
  lattia/sokkeli lämmin kivi (ei sinertävä). VS kuittaa valon suoraan PK:lle.
- PK valon kuittauksen jälkeen: 03A/B (B 7°), 02/05 parit + muurikujan kameratesti ja ruutuaikavahti, lautaspöydän pelikuva (pöytä,
  rikkoutuminen, kupla 4), 04 juhlasali (−147,6, 420,5). PT tarkistaa täysikokoisina omistajan sanoja vasten ennen KK:ta.
- NUI: nimitekstin uudet kuvat (vaaka + pysty, iPad + iPhone) vihreästä rungosta → PT tarkistaa → KK omistajalle.
- LR: penkki #959 delivery-v2 → portti → avoimet-v41 + pari. Taulukko docs/raportit/havainne-810-kohdittain-20261025.md (LR:n haara).

## 3. AAMULLA
- OMISTAJAKYSYMYS KK:lle (vasta PT:n tarkistamilla kuvilla): "Havainne 03 näyttää Taihedianin lähempänä ja matalampana kuin oikea
  palatsi. Pidetäänkö oikeat mitat (suositus)?" Kuvat PK 03A (tavallinen) ja 03B (kallistus 7°).
- KK:lle tiedoksi: vuosi oli jo 1914; aurinko 45°; nimiteksti valmis kuvien kanssa; salien sisustus havainteen mukaan.
- Videot, kun ulkoasu (valo) kunnossa. Asemataulu: ElevenLabsin päivittäinen haku ASEMATAULU-ROOLI.md:hen (päivällä).

## 4. Opit
- Tarkista Codex-postin toimitukset nollauksen jälkeen: #947 oli toimitettu 00.02, mutta edellinen luovutus odotti sitä yhä.
- Simukäännöksen Metal-virheet näkyvät vain laitekäännöksessä; testi lisätty (EiIntTernaariaMetalille).
