# PT:n luovutus 30.10.2026 klo 13.43

Edellinen: viesti-fable-luovutus-20261030-0253.md. Päivä: yölupa päättyi 07.1x, joten kortit menevät omistajalle KK:n kautta.
Viestit lähetetään aina id:llä (mcp__ccd_session_mgmt__send_message). Osoitteet: /Users/Shared/Claude/osoitekirja.md.

## Tehty tänään
- Juna 215: OMISTAJAN PÄÄTÖS 07.26 (julkaisu ilman tarkistusajoa). NS lukitsi c0b59f6b0 07.28; TF 215 valmis 07.48,
  beta-arvio hyväksytty, ulkoisilla (iOS + Mac); 214 vanhennettu. Muutosloki PR 5639.
- Juna 216 auki: runko aea0353cd (= c0b59f6b0 + Unity 6000.7.0b7, testit vihreät). b6 poistettu (orto-216 b7:llä).
- OMISTAJAN PÄÄTÖS 09.11: juoksupelin pohja- ja julkisivupiirrokset todellisin mitoin (kirjattu lokiin, tämä PR).
  Hyväksytyt julkisivut: Meridiaaniportti v2 (12.18), Taihemen v3 + sivuhallit v2 kaksi kattoa (12.28), Taihedian v3 (12.36).
  Kuvat: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/piirrokset-20261030/kortti/.
- Meridiaaniportti: todelliset mitat (08.27), sivukäytävät todellisessa suunnassa (09.06), hämärä (c) peruttu.

## Kesken (jono)
1. Meridiaani v192 (LAV, pari lokit/havainne-editori-20261030-130227/06): keskiaukko ok. Sivukäytävien pystyraidat
   ovat varjostimen loivan kulman virhe → VS korjaa varjostimeen (annettu 13.3x), ja VS tekee uuden parin 06.
   Malli: docs/raportit/kaappaukset/omistaja-20261030/portti06-sivuaukko-havainne.png. Sitten kortille → paketti v98 junaan 216.
2. LAV: Taihemen v191 ja sivuhallit v191 eivät vielä täsmää piirroksiin (ortot lokit/orto-glb-v191-20261030-1254/):
   - sivuhallin yläkatto on laatikko, ikkunaristikot puuttuvat, jalusta on harmaa möhkäle;
   - Taihemenin yläkatto on kapea, harjalla harmaa nauha, alakaton nurkat kaartuvat liikaa ja keskijänne on tyhjä.
   Parin 132135/03 kamera näyttää siltoja; tarvitaan kamera, jossa kohde näkyy. Tämän jälkeen Taihedian 3D.
3. PK: orto.sh toimii (haara pelikoodari/orto-216, syvyysraja bd3240620). A6 odottaa Codexia/LR:n pakettia.
4. Juna 216 = aea0353cd; lukitus ja TF vain omistajan pyynnöstä.

## Säännöt, jotka opin
- Tarkista mittari.txt (keisari 0,12) JA että kohde näkyy samasta kulmasta ennen kuin suosittelet paria.
- Uudessa tavassa ortovertailun vierekkäiskuvat ovat pääasiallinen todiste; havainteet vain tunnelmaan.
- KK ei kysy uudelleen sitä, mikä on jo linjattu (20.10. paikat ja mitat oikeat; katto = ulkoasu).

Asemataulu: juna 216 lisätty; työlistalla rivit "Meridiaaniportin sivuaukot avoimiksi" ja "Juoksupelin pohja- ja julkisivupiirrokset".
