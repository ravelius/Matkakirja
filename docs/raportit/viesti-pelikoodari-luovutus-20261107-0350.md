# Pelikoodari: luovutus 07.11.2026 klo 03.50

Korvaa kaikki aiemmat. Lue myös `git show ee5465047:docs/raportit/viesti-pelikoodari-luovutus-20261107-0326.md` kohdat 3–6 (Lontoon rajat ja työkalut) ja `git show dd4c12680:docs/raportit/viesti-pelikoodari-luovutus-20261106-2208.md` kohdat 3–5 (juoksupelin avoimet, ohjaus, opit). **Työ nyt: JU:n ajo `sk-x` on jonossa. Katso kuvat, rivit KK:lle ja PT:lle.** Nollaus pehmeällä rajalla (25 %), ei työn loppu.

## 1. Seuraavaksi: juoksupeli, taso 1 (PT 03.3x, ei junaan)
PT: "avoin ovilehti peittää keisarin, kynnysviesti, esineen rikkoutuminen ja kiinniotto katsomatta, sekä katsomatta jääneet oikea käännös ja Taso läpi. Yhdellä ajolla. Kartta odottaa LAV:n sanaa. Kuvat täysikoossa, rivit KK:lle ja PT:lle."
- **Ajo:** `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/vapaa-1/sk-x.txt`, proto `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, sha `36aa43ed3`, 11 kuvaa, noin 15 min. L2, jonossa NUI:n kahden lyhyen ajon takana (JU 03.4x, pid 40043). Oletuskoko ja -kerroin. **Lokit `/Users/Shared/Claude/proto-3d/lokit/pelikoodari-juoksu-x-36aa43ed3`.** JU kuittaa tähän sessioon; jos ei kuittausta, tarkista kansio ja kysy JU:lta.
- **Tarkista lokista sha ja se, että `kaanna ... seina` -rivit eivät palauttaneet "ei"** (kuvien pitkät ruudut voivat myöhästyttää reittiä; lisäsin 0,5 s varan).
- **Kuvat ja mitä katsoa:**
  - `k1`, `k2`: oikea käännös, kamera ja keisari.
  - `x1`: liike ovelle, peittääkö lehti keisarin. `x2`: pysähdys ovella (-189,49; 419,08), kynnysviesti. Kameran väistö on 0,7 m oven kohdalla; lokista "kamera väistää ovilehteä".
  - `o1`, `o2`: kiinniotto ja ote (`kiinni` = kirii kintereille). `o3`: otteessa uupuminen ja loppukortti, koodissa `dcad62532`, ei ole nähty pelistä.
  - `t1`, `t2`: Taso läpi. 5.11. kortti peitti keisarin yläosan, katso yhä.
  - `r1`, `r2`: kukkaruukku ja yleishuuto (`292afcef2`, PT: ei junaan ennen kuin nähty). Viimeisenä, koska `oleta-uusi` voi katkaista ajon. JU ei aja uudelleen.
- **Ei testaa:** rajaviestiä (`RajaEdessa`, 493 rajaa, koodattu `35140432d`). Reitti rajalle puuttuu. Kerro PT:lle, että se jää näkemättä.
- **Ei ole mukana:** peukalorenkaiden häivytys liikkeessä, ensikertalaisen opetus ja oikea laite.
- **Koodi:** proto ei sisällä rungon uusinta kärkeä. Jos koodi muuttuu, yhdistä ensin runko (`natiivi-backup/julkaisija/runko-219-muisti`, 03.4x `1104d0994`; tarkista JU:lta, onko NUI-yhdistelmä varsinainen runko).

## 2. Lontoo E4, valmis, tulos KK:lla ja PT:llä (KK ei ole kuitannut)
Proto `/Users/Shared/Claude/wt/proto-pelikoodari-lod-diag`, haara `pelikoodari/lontoo-b`, kärki `fdbf8a0ef` (natiivi-backup). Ei junaan. Kuvat `lokit/pelikoodari-lontoo-e4-fdbf8a0ef`, parit `lokit/pelikoodari-e4-parit/`.
- **Sieni:** St Paul'sin poikkilaivan puolipyöreä kuisti, säde 8,6 m → 5,6 m (OSM z ±43,5, `sp-ilma.jpg`). Molemmat päät. 2,5×:ssä osin talon takana.
- **Möhkäle:** London Bridgen asema, OSM way/140152277, noin 54 000 m², 3 kerrosta. Jäi paikalleen.
- **Tower Bridge:** uusi komento `ohjelmakohteet akselit <x> <y> <z> <nimi>` (x pituus). Suositus 1 2 1,5: päät rannoilla, eteläreuna hipoo yhtä taloa itäpäässä. 1,15: itäpään torni talon päällä. VS kuittasi luvut. VS:n epäily pään 2,9 m:n ilmaraosta (y kertoo myös `TornisiltaPinnan`) ei näy 45°:ssa, matalalta katsomatta.
- **Väri:** `SpKivi` `DDD0B6` ja muut `Sp`-värit, vaalea Portland-kivi (VS). Pieni ero, harmaat katot pitävät mallin viileänä.
- **Oikea koko on oletus,** kunnes omistaja päättää. Suositukseni menee aamun korttiin (KK).
- **VS:n valo `97c06af37` ei ole tässä haarassa.** E4 on vertailukelpoinen E3:n kanssa, mutta uutta valoa ei ole Lontoon kuvissa.
- Ei 4×-ajoa (KK). KK 03.25: "Kun nämä on tehty, seuraava työ PT:ltä" = kohta 1.

## 3. Yhä avoinna
- **Kartta (juoksupeli)** odottaa LAV:n sanaa ennallaan.
- Lontoo: 2D-kuvamerkki mallin edessä laitteella (kerrottu NUI:lle, tarkistamatta F3:sta). Varjot: talot eivät heitä varjoa Pariisissakaan. Kainalo: muut kaupungit aamuun PT:lle.

## 4. OPIT
- `echo ====`, `print ===` kaatuvat zsh:ssa; `--include=*.cs` ilman lainausmerkkejä kaatuu (no matches), lainaa globit.
- Outo muoto: rajaa 4×, ja vertaa OSM:n jalanjälkeen ja viitekuvaan ennen kuin korjaat.
- Väriä ei tuoda toisesta rakennuksesta: VS huomasi, että St Paul's on Portland-kiveä, ei hiekkakiveä. Kysy mallin tekijältä ennen ajoa, niin sha ei vaihdu jonossa.
- Lyhyt ajo: E4 6 kuvaa 3 minuutissa, kun muuttumattomat kuvat jätettiin pois.
