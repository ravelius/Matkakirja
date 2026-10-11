# Natiivi-UI: luovutus 11.10.2026 ilta (PT:n nollaus 56 %)

Säännöt: viesti-natiivi-ui-luovutus-20261010-aamu.md. Edellinen: viesti-natiivi-ui-luovutus-20261011-iltapaiva.md.
Simut: iPhone 17 96044270-92AA-4BD3-BE2D-772C8495AB19, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962. Käännös/simu vain Julkaisijan
KÄÄNNÖS NYT / SIMU NYT -viestillä (linja 1 tai 2 hänen mukaansa; PROTO_LINJA=2 = linja 2); ilmoita "lukko vapaa" ja "simu vapaa".
Ajoskriptit edellisen session scratchpadissa (kopioi): /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/4e8443a7-cf36-4d7a-8e8f-875ae310baae/scratchpad
(kooste-ajo.sh kaanna|iphone|ipad + sk-kooste.txt; kooste-ketju.sh = käännös + iPhone + iPad; sykaisy-ajo.sh + sk-sykaisy.txt).
Testikomennot (kehitysversio): `ui pelaaja 1` (pelaajan näkymä Debugissa: muuten kaikki pallot näkyvät), `ui aarrelaskuri`,
`ui lautapelinostot`, `ui nosto peli:mylly|peli:tavli`, `ui nosto kohde:olavinlinna` (EI @FI), `ui uusi-linssi [tunnus]`
(radiolla on kuva, taidemuseolla ei), `ui kaupunkipallot napauta <id>`, `ui sykaisy <t>|pois`, `peli koetila raha <n>`,
`komento aja <lat> <lon> <kaari°>` (kamera).

## JUNA 182: KAIKKI NUI-HAARAT YHDESSÄ KOOSTEESSA
`natiivi-ui/kooste-182` **81d463634 KUITATTU JUNAAN 182** (PT 17.3x; SHA Natiivisepällä; sisältää sykäyksen ja lautapelit ilman korostusta) (juna-182 c5e255c81 + neljä haaraa alla; ristiriidat ratkaistu; tyylikirja generoitu
webin mainista 33439cb57, PR #4409). tarkista.sh 0, Peli-testit 498/498, Kartta-testit 468/468. Natiiviseppä ottaa koosteen.
Arkit PT:lle: lokit/todistus-kooste3-pari-{iphone,ipad}-20261011.jpg (6c85f062, kaikki PT:n korjauslistan 6 kohtaa näkyvät
oikein). Sykäyksen vaiheet: lokit/todistus-sykaisy2-vaiheet-iphone-20261011.jpg (käännös 09653a0b). Sykäyksen kuittaus: tarkista posti.

1. `natiivi-ui/aloitus-aarre-182` fafa59686
   - Pulun järjestys: aarre-1 → tuuraus-3 → tuuraus-4 → aarre-2.
   - Laskuri "Etsityt kaupungit X/N" (päivälaskurin pilleri ja kellorivi).
     - N tulee pelin datasta: tässä pelissä 49, koska arvonta vaihtelee. 50 vaatisi Pelikoodarin jakologiikkaa.
     - Laskuri on lapun alla ja läpinäkyvä, kun auki oleva matkakirja tai kuvakortti on sen kohdalla.
   - Aarremerkintää ei näytetä Meripihkahuoneelle.
   - AloitusAarre: isoisän aarreteksti, sumea kuva ja luenta aloituskaupungissa (aarre.json, Luennat.Korvaava).
2. `natiivi-ui/olavinlinna-nosto-182` 726ac5dc8 (⊃ Pelikoodari b6f15b061)
   - Kortti: videopeliteema, kimmel 4 s:n välein, napit Pelaa £20 / Jatka / Aloita alusta £10, rahapula.
   - Kortin ylärivit ylikirjoitetaan tarkemmilla valitsimilla.
   - Kategoriarivi ilman ellipsiä. Tämä koskee kaikkia nostokortteja.
   - Lautapelinostot Berliiniin ja Ateenaan ILMAN värikorostusta (omistaja 17.1x): paperinen levy, tavallinen nostokortti ja
     ilmainen Pelaa (arkki lokit/todistus-lautapelit-pari-iphone-20261011.jpg).
   - Vain Olavinlinnalla merkin sininen rengas ja SYKÄYS (Videopelit.KytkeSykaisy: terävä 2 pt:n rengas .mk-videopeli-aalto, 1 → 1,35, 0,9 s, 3 s:n välein).
   - Avaus vaatii Siirtosepän f2bae0ac6:n (AvaaPelattavaPala(bool)). Ilman sitä peli ei aukea ja maksu palautetaan.
3. `natiivi-ui/pallo-hintalappu-182` 19dabd434
   - Hintalappu.Nayta (kellorivi): muun maan pallo näyttää lapun, ja sama funktio on LS2:n raketille.
   - Rahapula.Tarkista.
   - Vahvistus.Ilmoita ja BringToFront (dialogi nostokortin päälle).
4. `natiivi-ui/linssikortti-182` 8871df461 (⊃ linssiaarteet a5df10a0a)
   - Uusi linssi -kortti paljastuksen pergamenttina.

## AVOIMET
1. Pallot koko Euroopan näkymässä pienemmiksi tekee LS1 (sovittu, KaupunkiPalloMitat.Koko, hänen haaransa).
2. N: RATKAISTU (PT 17.2x). 182:ssa N tulee datasta; 183:ssa Pelikoodari tasaa arvonnan 50:een, eikä NUI:lta tarvita muutosta.
3. Taidemuseolinssiltä puuttuu kuva (Linssivalitsin.FotoIsot / havainnekuva).
4. Laskuri iPadilla: tarkista arkista, ettei se osu Kutsuminiatyyriin tai lippuun.

## Muuta
- Worktreet: proto-natiivi-ui-{aarre,pallot,olavinlinna,hintalappu,linssikortti,kooste} + vanhat kadet, museoteksti,
  pklehti, pulu. Pallot (0e6a4a018) on jo juna-182:ssa, joten sen worktreen voi poistaa.
- Appit levyllä: lokit/natiivi-ui-app-{aarre,kooste}. Poista, kun ne eivät enää ole tarpeen.
- Työnjako: LS1 hoitaa houkuttimet hunnun päällä (myös Olavinlinna) ja linssi-hehkun. LS2 hoitaa raketin napautuksen
  (Hintalappu.Nayta ja Rahapula.Tarkista).
