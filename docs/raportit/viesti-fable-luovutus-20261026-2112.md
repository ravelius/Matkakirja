# Päätoimittajan luovutus 26.10.2026 klo 21.12 (tili sami.reivinen@vvi.fi, PT local_8d8ebf72, konteksti 28 %)

Id:t: /Users/Shared/Claude/osoitekirja.md. Edellinen -20261026-1737. Taulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy.
Omistaja ON PAIKALLA tänä iltana (21.02: "pitää saada jo tänään valmista") → polut KK:lle sitä mukaa kuin PT on tarkistanut.

## 0. TÄNÄÄN ILLALLA KK:LLE LUVATUT (21.03 aikataulu)
1. Latauskuva VAAKA: omistaja HYVÄKSYI 21.05 ("Kelpaa"). PYSTY ~22.00: Codex tekee pohjat (nastakuvio + kumireuna pois, tasainen
   kangas-/huopapohja), PK tarkistaa → PT katsoo jalkojen lähikuvan → KK. Kuvat proto-3d/_tyo/pelikoodari/latauskuva-211/.
2. Kartta ~22.30 (KS): isot kaupungit (Manchester, Liverpool, Leeds, Sheffield, Birmingham) kauempaa ja kohdemerkintöjen EDELLE;
   pallon köysi alkuperäisen mittainen, ei koskaan nappulan/maamerkin yli; Lontoon 0,15° nimien latausvika (1/758 nimeä, kun
   Englanti → Lontoo heti; karsinta?). Kansio proto-3d/_tyo/karttaseppa/omistajalle-kartta-20261026/ → PT tarkistaa (myös video
   oikein päin, nimet näkyvät) → KK. KK palautti edellisen version nimistä ja köydestä.
3. Kuvakulma ~23.00 (PK): vaakan 3 vikaa (halli-08 oranssi kamera katossa, 3 piilojaksoa työhuone ×2 + kujaportti-3, aukio-03
   harmaa) → 4–6 kuvaa rungolla 8ff161997+ → PT → KK.
4. Pylväät ja seinät havainne | peli (omistaja 21.08) ~22.15 (NUI, havainne-editori) → PT → KK.
5. Elävyysvideo: tuskin tänään (tausta-v57 hylätty 2×). Kerro KK:lle, jos ehtii.

## 1. JUNA 211 runko NS 8ff161997 (testit vihreät, ei laitekäännöstä; lukitus/TF vain omistajan pyynnöstä)
- Tänään sisään: VS muurikate + kattolukitus (vinosauma pois, 90217b18b/fc6441df6), PK portin reuna 190d1ae15, PK latauskuva
  29e97a344 → 00b45e868 (saappaat, leima 12°), NUI palkki b628f881c (täyttyy oikeasti, ura), KS väistö 61ca03f47, NUI lokikansio.
- VS tarkista_leivonta.py 5c13d3414 haarassa muurikate-211 42a3c19d7 → NS:lle tulossa. Tekotapa 4 järjestys PR 5255 mergetty.
- LR tausta-v57: tuplakasvot poistettu, mutta 20.47-leivonta tummensi 06:n ja aukio A:n + varjokolmiot (f-taihemen runko.003);
  VS ehdotti toisen muutoksen perumista. EI väliaikaisversiota (PT). Seuraava: puhdas v57 + tarkistus 0 → VS:n pari → PT → NS.

## 2. CODEX (KK 18.1x "Voiko työtä tehostaa?" → tuotannonohjaus luku 4, PR 5254)
- Jono ≥ 2 aina. Nyt: muistokuvat 21/29 (Codex 21.08: 29 korjattu, 21 QA-hylkäys, tehtävät 999–1000 → PK tarkistaa),
  pystylatauskuvan pohjat. Olavinlinna täytteeksi (omistaja 21.09): NS kartoittaa ja tilaa 3–5 kerrallaan.
- Codexin hiljaisuuden syy (Codex 20.58): sen postivahti löytää tilaukset, mutta työn käynnistys jää "sessioiden ohjaustyökalu ei
  käytettävissä" → herätys vain omistajan Codex-ikkunasta. Postivahti hälyttää 60 min hiljaisuudesta → yksi rivi KK:lle.
- Alkuintro Košice/Vilna = omistajan päätös (ei introa lainkaan), Ateena Kreikan lupasäännön takana; työlista päivitetty.

## 3. MUUT
- NUI:n proto-haarat (aarrevideo, juoksu-nimet-208, uni-smaragdi-204) natiivi-backupissa, worktreet poistettu. juoksu-nimet-208:ssa
  juoksun aikaiset alueiden nimet (Meridiaaniportti …) – EI omistajan pyyntöä; ehdota omistajalle juoksupelin viimeistelyssä.
- Levy kävi 69 Gi (JU:n simukäännös), nousi 80 Gi:hin; JU siivoaa vuoron jälkeen, NS:n ehdokas-wt 4,9 Gi tarkistettava.
- Loki tänään: TEHOSTUS (18.50), LATAUSKUVA VAAKANA HYVÄKSYTTY, OLAVINLINNA CODEXILLE + PYLVÄÄT/SEINÄT (tässä PR:ssä).
- OPPI: PT hyväksyi latauskuvan lenkkareineen ja kartan pitkän köyden – KK löysi. Tarkista jalat/asut ja irtoviivat aina
  omistajan aiempia päätöksiä vasten (tuotannonohjaus luku 4).
