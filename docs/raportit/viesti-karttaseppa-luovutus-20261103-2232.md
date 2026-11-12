# Karttaseppä: luovutus 3.11.2026 klo 22.32 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-2132.md (3ea5c4abd). Syy: konteksti 26 % (7.37).
Y = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-ylaviisto-20261103/` (python `/opt/homebrew/opt/python@3.14/bin/python3`
ilman -I:tä), C = `/Users/Shared/Claude/proto-3d/_tyo/codex/`, OK = `/Users/Shared/Claude/proto-3d/_kirjasto/kartta-osat/`.
Codex-posti: wt/karttaseppa-postilaatikko → `git fetch` + `git checkout --detach origin/claude/postilaatikko`, posti/…md, commit, push HEAD:claude/postilaatikko.

## PÄÄTÖKSET (toteutettu)
- **Omistaja 22.09: MALLI G = d0191a334 `pariisi-koko-kaupunki-G-tyyli.png` (sha 692ff29f…), EI G-v4.** G:ssä tornit levenevät ylöspäin.
  OK/RAKENNUSPERIAATE.md kohta 3 ja OK/NAHTAVYYSALUE.md korjattu; NAHTAVYYSALUE.md:ssä G-suhdetaulukko (× Seinen leveys:
  ND julkisivu 2,2, tornit 3,6; Eiffel 6,8; Louvre 7,8). Louvre 2,5× / Eiffel 3× -kertoimia ei ollut missään.
- **Omistaja 22.14:** nähtävyys saa levitä TAKANA olevan joen ja rannan päälle; edessä ja sivuilla joki auki, ei katkaista.
- KK 22.0x: ND k3 ei käyttöön; A2 k4 koekäyttöön (tummat pihat jos tarpeen, ei uutta tilausta).

## TEHTY
1. **A2 kortteli k4** (tilaus 5c061e16b + pohjakorjaus ad0f3ee89, toimitus #1946, kuittaus cfd124abf): Y/TARKISTUS-a2-k4.md.
   Pelissä VS:n commitissa d64f74a56 = Y/tarkistus-a2-k4/k4-pihat-tummat-katot-2029.png (pihat ×0,72 Y/pihat-tummiksi-k4.py,
   katot 2029:n siniharmaaksi Y/katot-2029-k4.py). JU:n k10-ajo kuvaa sen; VS kertoo tuloksen.
2. **ND k3** (#1945, kuittaus cfd124abf): sijainti oikein, kirkko liian pieni → hylätty. Y/TARKISTUS-nd-k3.md.
3. **ND k4** väärä malli 53512fa0b → SEIS e18b31b15 → korjattu oikealla G:llä f359c4117 + takajoki-lisäys 6250e9546
   (ohje Y/ohje-nd-k4-g.py). Toimitus #1952–1953 (kuittaus cefae1dc7): kirkko erinomainen, ympäristö/alfa pielessä →
   kirkko leikattu koodilla Y/leikkaa-nd-k4.py (julkisivu (620,578), skaala 1,0, laivan alaosa rantaviivaan), sävy →
   **Y/tarkistus-nd-k4/nd-k4-kirkko-savy.png** (taso pohjan ruudukossa). PT:lle 22.3x → KK. Y/TARKISTUS-nd-k4.md.
4. **21.54 molemmat taustaajot kuolivat** ilman virhettä (T7-symlinkki hetken katki) → uudelleen 22.0x.

## AVOIN (järjestyksessä)
0. **YÖTYÖ ENSIN (PT 22.5x; omistaja 22.31 "Koita saada Pariisin kartta tehtyä kokonaan", KK hyväksyy yöllä):** tilaa Codexilta
   HETI rinnakkain nähtävyysalueet ND k4:n tapaan, yksi tilaus per alue, tärkein ensin: Louvre, Hôtel de Ville, Oikeuspalatsi +
   Sainte-Chapelle, Saint-Jacques, Eiffel, Sacré-Cœur, Panthéon, Riemukaari, Invalides, Opéra. Ohje: scratchpad/keskustelukanava/
   suunnitelmat/20261103-pariisi-ylaviisto-ja-osakirjasto.md osio YÖ 3.–4.11. Mallina C/pariisi-nahtavyysalue-notre-dame-20261103/k4/
   (pohja + maski + vesimaski + ohjekuva G:stä skaalattuna Y/ohje-nd-k4-g.py, suhteet OK/NAHTAVYYSALUE.md). OPPI ND k4:stä:
   Codex piirtää nähtävyyden hyvin, mutta ympäristö ja alfa eivät osu ruudukkoon → pyydä vain nähtävyys läpinäkyvällä taustalla
   ja leikkaa + istuta koodilla (Y/leikkaa-nd-k4.py), ei ympäristön uudelleenmaalausta.
   **PT 22.5x: KK hyväksyi ND k4:n "laiva kokonaan"** (suora rantaleikkaus hylätty): EI suoria leikkausreunoja rantaan.
   Järjestys: Louvre, HdV, Oikeuspalatsi + Sainte-Chapelle, Saint-Jacques, sitten muut. Jokaisesta pari G:tä vasten PT:lle.
   ND:n laiva kokonaan -taso TEHTY ja lähetetty NS:lle 22.5x: Y/tarkistus-nd-k4/laiva-kokonaan/nd-k4-laiva-kokonaan-savy.png
   (`LAIVA_KOKONAAN=1 python Y/leikkaa-nd-k4.py ...`).
1. ~~ND k4: KK:n päätös~~ RATKAISTU 22.5x (laiva kokonaan, NS:llä).  Vanha teksti:: käyttöön leikattuna vai laiva kokonaan (vaihtoehto Y/tarkistus-nd-k4/nd-k4-VAIHTOEHTO-
   laiva-kokonaan.jpg; leikkaus näkyy suorana reunana sivukanavan kohdalla). Hyväksynnän jälkeen taso NS:lle/VS:lle peliin.
2. **A2 k4: VS:n k10-tulos** (JU). Jos katot/pihat vielä väärin: säädä Y/katot-2029-k4.py [voima] tai Y/pihat-tummiksi-k4.py [kerroin].
3. **Taustaajot** (Monitor uudelleen): tasankoketju pid 65143 (Y:n sisar tasangot-poltto-20261103/ketju.sh; odottaa joutilasta ≥ 10 min,
   jatkaa 110/144 shardista; ketju.valmis / ketju.virhe), esittelypaikkasilmukka pid 68441 (silmukka.log; HUOM: silmukka tulkitsee
   tapetun ajon valmiiksi, tarkista ajo-muut.log:n loppu). Jatkot kuten 19.40-luovutuksen AVOIN 4–5.
4. Vanhat: v7/v8 iso-pari (JU), pitkät ruudut (seuraava mittaus).
