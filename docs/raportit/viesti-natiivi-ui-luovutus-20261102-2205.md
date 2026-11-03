# Natiivi-UI: luovutus 2.11.2026 klo 22.05 (Codexin animaatiokuvat rungossa, pari ja video PT:llä)

Edellinen: viesti-natiivi-ui-luovutus-20261102-2112.md (käsitelty kokonaan). Syy: konteksti pehmeällä rajalla.

## Tehty 21.12 jälkeen
- **"Lintu 90° kääntynyt" oli virhetulkinta:** todistusajon 9ae133e6b pystyssä nopeasti lentänyt harmaa lintu oli pelin oma
  maalattu kyyhky (lähde etsimättä, ei animaatiokerroksesta). Väliaikaiset linnut näkyivät oikein vaakasiivin.
- **Ylitys 4156f5ee6:** aika koko 1,3 × leveyden reitille (ennen 9 s koko reitille → 4–6 s ruudulla, nyt ~8–9 s; todistus OK).
- **Codexin kuvat 743728bd7 (PT 21.4x, posti a1ba6db0f):** 3 venettä + 3 vanaa, kyyhky 4 asennossa ja kuumailmapallo. Pelikopiot
  `/Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/animaatiot-20261102/` (512²/256², LAHDE.md:ssä SHA:t; natiivit Codexin paketissa
  ennallaan). Veneet ja kyyhky ylhäältä kuvattuina kääntyvät täysin kulkusuuntaan, vana manifestin siirrolla (1020 px). Pallo
  ajelehtii erillisenä koristeena Boulognen metsästä Monceaun puistoon 3 m/s ja heiluu. Väliaikainen lintu ja sen valopoikkeus
  poistuivat. Komennot: `animaatiot kuvat <polku>|pois`, `animaatiot nayta pallo [korkeus]`, `veneet nayta i` (uudet veneet
  kytkimen ollessa päällä). unity-tarkistus 0 ja tarkista.sh ok. Haara natiivi-ui/pariisi-animaatiot-218, peili natiivi-backup
  peili/proto/…; worktree /Users/Shared/Claude/wt/proto-natiivi-ui-animaatiot.
- Todistus `proto-3d/lokit/todistus-animaatiot-743728bd7-20261102-2156/` OK (Exception 0); PT:lle `pt/pari-veneet.png` ja
  `pt/animaatiot-kooste.mp4` (viesti 22.0x). Skenaario ja ajoskripti: kopio alla.
- Codexille postilaatikkoon 07f73741f: vanan kärki haalea (rako perän ja vanan välissä), kuvat matalakontrastisia.
- Levy: 12 vanhaa omaa app-jako/natiivi-ui-*-kopiota poistettu (−8 Gt, käännös pysähtyi 25 Gt:n rajaan; swap 30 Gt).

## SEURAAJAN JONO
1. PT:n vastaus pariin ja videoon. Kuvien vienti ämpäriin (`<PariisiOsoite>animaatiot-20261102/`, 11 png:tä kansiosta yllä) vasta
   PT:n luvalla ja JU:n kautta; omistajan spritehyväksyntä on Codexin paketissa vielä kesken.
2. KS:n koonnin jälkeen: ReittiLat/Lon KS:n uudesta joen keskiviivasta, Sillat-rivit + SiltaVersio, sitten kytkin pois → oletus
   (junaan vasta PT:n luvalla). Juna 218:n veneet ja PiirrosKerros.Veneet.cs poistuvat samalla.
3. Codexin uusi otto (vana/kontrasti), jos tulee: uusi kansio animaatiot-<pvm> ja AnimaatioVersio-vakio.

Skenaario (todistusajo, `--laite ipad`, simu-lukko.sh kaari natiivi-ui yhteinen-iPad11, SIMU_MUISTIRAJA=16):
ui konsoli pois / ui kierto vaaka / tap 516 688 / odota 15 / komento syke jatkuva / komento veneet nayta 0 0.03 / odota 25 /
kuva 1-ennen / komento animaatiot kuvat <kansio> / komento animaatiot on / odota 5 / oleta-uusi 5 veneet 8/8, linnut 4/4, pallo 1/1 /
kuva 2-jalkeen / video 40 s / komento veneet nayta 1 0.012 / odota 15 / kuva + video 35 s / komento animaatiot nayta pallo 0.02 /
odota 15 / kuva + video 20 s / komento syke jaatyy.
