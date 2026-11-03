# Karttaseppä: luovutus 2.11.2026 klo 17.00 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261102-1430.md (haarassa karttaseppa-kohdetunnisteet 5f2f1d555; käsitelty: AVOIN 1 kuitattu,
AVOIN 2 jatkuu alla). Syy: kontekstivahti 25 %. K = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tarkkuuskoe-20261102/`,
T = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kohdetunnisteet-20261102/`.

## TEHTY
1. **Pariisin tarkkuuskoe (omistaja 16.17, 16.45, 16.48; PT):** pelin kamera, pieni iPad (yhteinen-iPad11 = iPad mini -simu),
   nykyinen lähin zoomaus, Cité + Notre-Dame kokonaan, kaikki ajot 0 PUUTE. Menetelmä: sovellus perinto-pari-218 (8e64a1db) lukee
   piirroksen paikallisesta kansiosta `SIMCTL_CHILD_MATKAKIRJA_PIIRROS=K/<tarkkuus>/` (PiirrosKerros.cs, ei käännöstä);
   `K/tee-kansiot.py [3m …]` pienentää lahig-kankaan (Lanczos) ja suurentaa bilineaarisesti takaisin, leikkeet samoin;
   `K/aja.zsh [kansiot]` + `K/sk-tarkkuus.txt` (simu-lukon alla); `K/kokoa-kuvat.py` = nimet kuvan yläpuolelle.
   Kuvat PT:llä: tarkkuus-1m/-1_5m/-2m.jpg, tarkkuus-kolme(-lahi).jpg, **tarkkuus-2_5m.jpg + tarkkuus-2m-2_5m(-lahi).jpg**.
   Palamäärät (`K/palamaara-ilman-metsia.py [m/px limitys]`: laaja v4 -maski − OSM-metsät 16731685/18047835, ≥ 5 % kaupunkia,
   1536×1024): limitys 15 % → 1 m/px 80, 1,5 m/px 42, 2 m/px 24, **2,5 m/px 15** (asettelu-2.5m-15palaa.png). 3 palaa vain
   pystypaloina 1024×1536 5,4 m/px (vaakapaloilla 4 tai 2). Huom: ND, Châtelet, Louvre ovat nostoja → eivät muutu tarkkuuden mukana.
   Suurennos (omistaja 16.51) PERUTTU 16.54: Topaz CLI = `/Applications/Topaz Photo AI.app/Contents/Resources/bin/tpai`, ei kirjautunut
   ("Invalid auth token"); Real-ESRGAN-kokeen kansiot K/*-esrgan jäävät käyttämättä. Generatiivisesta suurentimesta KK kysyy omistajalta.
2. **Uuden tyylin koepala tilattu Codexilta** (omistaja 16.23, PT): posti aef649d91 (claude/postilaatikko), 1 pala 1024×1536
   (Cité/ND alhaalla, HdV, Marais, Temple), aineisto `proto-3d/_tyo/codex/pariisi-uusi-tyyli-20261102/` (nykyinen, OSM-geometria,
   OSM-puut 2211, 4 miniatyyriä + Euroopan kartan värit, SHA256SUMS), teko `proto-3d/_tyo/karttaseppa/uusi-tyyli-20261102/aineisto.py`.
   OSM-pohja poikkeaa nykyisestä muutamia kymmeniä px (G:n liioittelu) → sommittelu nykyisestä, korttelit pohjasta.
3. **Tunnisteajo** oli kuollut ~16.05 (session nollaus tappoi taustakomennon). Nyt IRRALLISENA: `zsh T/kaynnista.zsh` (nohup, PPID 1),
   pid tiedostossa T/ajo.pid (48629, 16.57). 4. Postivahdin pyytämä wt/karttaseppa-luovutus-1035 poistettu.

## AVOIN (järjestyksessä)
1. **Codexin koepala** saapuu postiin (`_review-uusi-tyyli-20261102/`) → tarkista SHA ja koko → pari nykyinen | koepala samalla
   rajauksella (nykyinen = aineiston nykyinen.png) → polku PT:lle. Ei uusia tilauksia ilman PT:tä.
2. **Tunnisteajo:** valmis = pid T/ajo.pid poissa ja T/ajo.log:n viimeinen rivi ei ole virhe. Kaatuessa `zsh T/kaynnista.zsh`
   (EI session taustakomentona). Sitten luovutuksen 1430 AVOIN 3–4: neljä käsilukkoa data/kohdetunnisteet.json:iin, kohdesijainnit
   --kaikki, KAUKANA-lista PT:lle, raportti docs/raportit/kohdetunnisteet-20261102.md, PR haarasta karttaseppa-kohdetunnisteet.
3. Tarkkuuspäätöksen (omistajan K2) jälkeen PT jakaa Pariisin yhtenäistämisen (suunnitelma 20261102-kaupunkien-tarkkuus.md kohta 6.3).
4. Vanhat: NUI:n vastaus maamerkkien alojen muotoon; I monistus vasta kun Pariisi valmis; 7.48: muita Pariisin osia ei aloiteta
   ennen KK:n suunnitelmaa ja PT:n viestiä. silta-18-reitin siirto ~60 px (ei tehty).
