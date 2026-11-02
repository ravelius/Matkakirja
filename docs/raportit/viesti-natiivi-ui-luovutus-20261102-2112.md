# Natiivi-UI: luovutus 2.11.2026 klo 21.12 (Pariisin animaatioiden runko, lintukuvan kierto auki)

Edellinen: viesti-natiivi-ui-luovutus-20261102-2007.md (käsitelty kokonaan). Syy: konteksti pehmeällä rajalla.

## Tehty 20.07 jälkeen
- **Nimikerros d0e48231c EI runkoon** (NS:n A/B ×2: pitkiä/suurin 89/183, 93/142 → 101/150, 87/142; GC:n lähde on taustasäie,
  NS:n työ). PT kuittasi. Haara natiivi-ui/nimikerros-218 jää odottamaan, eikä sitä viedä eteenpäin ilman PT:n pyyntöä.
- **Pariisin animaatiot (omistaja 20.36, PT hyväksyi suunnitelman 20.4x):** suunnitelma ja tila
  `/Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/pariisi-animaatiot-uusi-tyyli-20261102.md`. PT:n päätös: kuumailmapallo on erillinen
  koriste kaukana opaspallosta, ja opaspallo pysyy ennallaan. Vanavesi on lisätty Codexin tilaukseen (KS 8fd78feb1).
  Palajako on sovittu KS:n kanssa; ruudukko on `_tyo/codex/pariisi-valmis-runko-20261102/palajako.json`. KS toimittaa koonnin
  yhteydessä venereitin (lat/lon ~40 m) ja siltarivit kansioon pariisi-sillat-<pvm>.
- **Runko natiivi-ui/pariisi-animaatiot-218 9ae133e6b** (peili natiivi-backup; worktree /Users/Shared/Claude/wt/proto-natiivi-ui-animaatiot;
  pohja 0ffb7e562): uusi PiirrosKerros.Animaatiot.cs. Kytkin `komento animaatiot on|pois` (oletus pois, EI junaan, PT 21.0x).
  Veneet kulkevat metrireitillä (ReittiLat/ReittiLon, nykyinen reitti muunnettuna). Linnut: 4 asentoa (LintuVersio null =
  väliaikainen koodilla piirretty lintu), 4 linnun parvi 30 s välein. unity-tarkistus ja tarkista.sh menevät läpi. Valovahdin poikkeus
  on väliaikaisen linnun musteessa (`// valopoikkeus`), joka on **vielä kertomatta PT:lle**.
- Todistusajo `proto-3d/lokit/todistus-animaatiot-9ae133e6b-20261102-2104/` (OK, Exception 0): kuva-arkki 1-ennen | 2-jalkeen
  (veneet osuvat samaan kohtaan, metrireitti toimii), videot animaatiot-liike.mp4 (lintuparvi t ≈ 11–14 s) ja animaatiot-lahella.mp4.
  Videot ovat pystyssä, joten kierrä ne: `ffmpeg -vf transpose=2`. Kehysanalyysi: scratchpad (ei talteen).

## AUKI: lintukuva näkyy 90° kääntyneenä ja ylitys on liian nopea
- Kuvassa siivet ovat pystyssä: u-akseli näkyy ruudulla pystysuunnassa ja kärjet osoittavat vasemmalle. Veneet käyttävät samaa
  PiirraKuvaM:ää ja näkyvät oikein. Tekstuurin Python-kopio näyttää oikealta (128 × 64, V-siivet). Syy on etsimättä: tarkista
  ValiaikaisetLinnut (SetPixels32-järjestys, mipmapit) ja PiirraLinnut (f = (sx,0), n = (0,1)), esim. piirtämällä vene-1 linnun
  materiaalilla tai linnun tekstuuri veneen paikalle.
- Ylitys kestää noin 2 s, kun tavoite on 9 s (lintuMatka = leveys × 1,3, leveys = RuudunMpp × max(Screen.w, h); siipi 80 m, mpp ~2).
  Tarkista Joutosyke.Aikan tahti `syke jatkuva` -tilassa ja leveyden kaava.

## SEURAAJAN JONO
1. Korjaa linnun kierto ja nopeus haarassa natiivi-ui/pariisi-animaatiot-218, käännä linjalla 2
   (`PROTO_LINJA=2 PROTO_APP_KOPIO=/Users/Shared/Claude/proto-3d/app-jako/natiivi-ui-animaatiot zsh proto-3d/tyokalut/proto-kaanna.sh <haara>`)
   ja aja todistus simu-lukko.sh:n kaaressa (yhteinen-iPad11, SIMU_MUISTIRAJA=16). Skenaario (kopioi uudelleen): komento syke jatkuva →
   veneet nayta 0 0.03 → kuva ennen → animaatiot on → kuva jälkeen → video 40 s → veneet nayta 1 0.012 → video 35 s.
2. Kun liike toimii: pari ja video PT:lle (≤ 3 riviä) ja samassa viestissä valovahdin poikkeus (väliaikainen lintu).
3. Kun Codexin kerrokset ja KS:n koonti tulevat: ReittiLat/Lon KS:ltä, Sillat-rivit + SiltaVersio, LintuVersio ja VeneVersio uusiin
   kansioihin, kuumailmapallon ajelehdinta (erillinen koriste) ja sitten kytkin pois → oletus (junaan vasta PT:n luvalla).
