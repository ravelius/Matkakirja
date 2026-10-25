# Pelikoodarin luovutus 25.10.2026 klo 05.35 (Postivahdin kova raja 35 %)

## Tila lyhyesti

- Juna 210 auki. Runko 029bb8aa1 (NS, vihreä) sisältää kulma-810 e2814b8e0, kaukopuut-07 c18a8a0b5 ja VS:n Metal 2923706a4.
- **Ajossa luovutushetkellä:** omistajan kuvat juoksupelistä rungosta 029bb8aa1 (JU:n OK, L2 vapautettu, simut 123B4B25 + 39644E75).
  Skripti scratchpadissa `v7b.sh` (loki `v7b.log`); iPad-osuus valmis (havainne-04-ipad-v7, havainne-03ab-v7), iPhone-osuus käynnissä
  (kulma-810-pari-v7, reitti-v7, lautaspoyta-palatsi-v7, havainne-04-v7, havainne-07-v7 → proto-3d/lokit/). Lopuksi vertailu.sh 04.
  **Seuraaja: kun ajo päättyy, lähetä JU:lle "SIMU VAPAA"**, tarkista kuvat ja vie PT:lle (kuvat ilman tekstiä, Raamattu 7.32).

## Haarat (proto, /Users/Shared/Claude/wt/)

| Haara | Kärki | Tila |
|---|---|---|
| pelikoodari/verkko-paallekkaiset | 965d67df1 | PT kuittasi junaan 210 (lukituseste). NS:lle ilmoitettu, ei vielä rungossa. |
| pelikoodari/kaukopuut-07 | c18a8a0b5 | rungossa 029bb8aa1 (kaukopuut, keskipuut, lahipuut-v3) |
| pelikoodari/kulma-810 | e2814b8e0 | rungossa |
| pelikoodari/havainne-210 | b215c456c | vertailu.sh: kohta 04 (−147,6, 420,5) |

## Tehty tässä vuorossa

1. **Reitti punainen (LT 211k-029) → 965d67df1:** juurisyy päällekkäiset verkon linjat (pakotettu linja keskilinjan rivillä) → 2–4 solmua
   samaan kohtaan 0 m:n kujin → "suoraan" + umpi risteys samassa kohdassa → kompastus ja U-käännös (botti sukkuloi 17 m:n kujaa
   (−158, 190,6), kompastus 34 m:n välein; myös juhlasalin edessä (−138, 408)). Ei regressio: sama 59ecb6703:n koodilla offline.
   Korjaus Kokoa:ssa (sama risteys = sama solmu). Oikealla datalla solmuja 1891 → 1541, kompastukset 9+9 → 0. Testi
   PaallekkaisetLinjatYhdeksiSolmuiksi. Juoksu 103/103, Drone 25/25, unity-tarkistus 0.
2. **Kaukopuut (havainne 810/07):** halvat latvukset puut.json-puille; kortilliset vain korkealta kamerasta (yli 25 m, täysi 60 m,
   rasterihäivytys), korteittomat (lahipuut-v3:n 630 pihapuuta) aina 40 m:n takana (JUOKSU_KORTTI-lähipiilotus). Kortit tunnistetaan
   LOD0-taustasta (KorttiRuudukko, 2 m). QA `ui juoksupeli palatsi kaukopuut 0|1`; testikamera nostaa näkyvyyden (07-kuva).
3. Skenaariot: sk-juoksupeli-04-sali.txt, sk-juoksupeli-07-yleiskuva.txt (proto-3d/tyokalut/pelikoodari-ajot/).
4. Levy: app-pelikoodari-v6/-v6b/-v6c/-polku poistettu (PT), v6d ja v7 jäljellä.

## Avoimet (PT:lle vastattu rivillä 05.35)

- Käännösnykäykset 12/9 (raja 8): osuvat 0,5–3 s kompastusten jälkeen → oletettavasti poistuvat 965d67df1:llä; varmistus LT:n seuraavassa ajossa.
- 217 ms:n ruutu (1ja t 126,8 s, 2,1 s ohjauksen luovutuksesta): juoksun alun ensimmäinen raskas ruutu, ei reitistä; lokissa ei syytä
  (merkinnät "päivitys 1 ms") → selvitettävä (lämmitys? sisäpiha s 466–480 J-ajossa).
- 04 iPad-havainto: penkit ja kaapit tummaa puuta, ei mattoja eikä sermejä, pylväät leveillä jalustoilla; lattia lähes valkoinen
  (havainteessa viileä harmaa → VS/LR), päädyn ovi tavallinen punainen pariovi (havainteessa ristikko).
- PT: havainne-editori käytettävissä vertailuihin ilman simua (natiivi-ui/havainne-editori-210 9a5832355).
- Löydös LR:lle annettu: pihojen puut (tehty lahipuut-v3).
