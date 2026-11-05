# Natiivi-UI: luovutus 5.11.2026 klo 11.10 (konteksti 35 %)

Edellinen: viesti-natiivi-ui-luovutus-20261105-0938.md (haara natiivi-ui/luovutus-20261105-tila), josta korjausten kuvaus; KK:n sanat sellaisinaan: viesti-natiivi-ui-luovutus-20261104-2057.md, lisäys 1. Proto: /Users/Shared/Claude/proto-3d/Matkakirja-proto, wt/proto-natiivi-ui-kaanto.

## Rajaus
KK 10.58 omistajan 10.52 ja 10.55 päätösten jälkeen: "lippu jatkuu, koska kartan kääntö kuuluu Pariisin karttaan … Vie simuajo loppuun ja tuo kuvat KK:lle. Rajaus: vain viisi korjausta, ei uusia laajennuksia eikä iPad-ajoja." Muu työ jää pois (kohta "Pois jääneet").

## Tila
- **c5 valmis:** PT hyväksyi kuvan; JU poimi rungon julkaisija/runko-219-muisti kärkeen 0a353e6d0, ei ristiriitoja. Ei muuta tehtävää.
- **Lippu `c87a77c16`** (proto natiivi-ui/kartan-kaanto-219): ajamatta; 13/13 Lippukulma, tarkista.sh läpi. Simuvuoro pyydetty JU:lta klo 11.09; JU:n viesti "SIMULAATTORI NYT" tulee seuraajalle. Ajo (linja JU:n viestistä, taustalle):
  `zsh <oma scratchpad>/ajot3.zsh <linja>`; jos scratchpad on vaihtunut, sama sisältö: `PROTO_LINJA=<linja> SIMU_MUISTIRAJA=16 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/simu-lukko.sh kaari natiivi-ui yhteinen-iPhone18 -- zsh /Users/Shared/Claude/proto-3d/lokit/nui-lippu-c87a77c16-20261105/ajo.zsh iphone`
  Kuvat: nui-lippu-c87a77c16-20261105, arkit `python3 -I …/arkit.py` (iPhone). Sen jälkeen rivi JU:lle, app-kopio pois omasta ajokansiosta.
- Ajo `8be86170b` (ennen kohdan 3 korjausta) valmis: proto-3d/lokit/nui-lippu-840d8abd3-20261105/arkki/ (14 arkkia, 4 suuntaa, kääntöajot kaanto-FRA ja kaanto-NOR). iPadin kuvat pätevät yhä: c87a77c16 ei siirrä iPadin paikkaa (Ranska 170 km = 180 pt, vaatimus 168 pt).

## Havainnot ajosta 8be86170b (katsottu vain 4 arkkia: iphone-vaaka-FRA, iphone-pysty-FRA, kaanto-NOR-2pysty, kaanto-FRA-3vaaka)
1. VÄRI: näissä neljässä sama joka suunnassa. Katso täysikokoisena muista suunnista rajaus ja NOR.
2. KOKO: iPhone 48 pt, kelpaa arkeissa; iPad ennallaan 124 pt.
3. NIMI: iphone-pysty-FRA-225: kangas PARIISI-nimen päällä → korjaus c87a77c16 (`Lippukulma.KohteestaPt`: √(90² + lipun korkeus²) + 15 pt, Kartuscha.LaskeLippukulma; jos ehdot eivät täyty, ehto pois). Tarkista: iPhone-paikka siirtyy (ennen 49,25/6,06 vaaka ja 48,25/4,33 pysty) ja pysyy ympyrässä, kaikki 4 suuntaa ilman osumaa nimeen ja nappulaan. Lokiriville "lipputanko: maa". Norja ei ole kaupungin kohdalla ongelma, mutta Oslo-ajo varmistaa.
4. MERKIT: arkeissa kangas ei tullut merkin päälle kuin kerran: kaanto-FRA-3vaaka-225: kuumailmapallo kankaan päällä (käyttöliittymäkerros, ei korjata; kerro KK:lle). Kaupunkipisteitä ei nähty kankaan päällä, joten ZTest-korjaus on näkynyt vain, jos kangas osuu merkkiin: etsi täysikokoisista, ja sano KK:lle suoraan, jos sitä ei voinut todistaa näistä kuvista.
5. LAITTEEN KÄÄNTÖ: kaanto-NOR-2pysty: lippu ruudussa kokonaan suunnissa 000, 135, 225; suunnassa 045 lippu paneelin alla (KK:n hyväksymä sääntö 5.10.). kaanto-FRA-3vaaka kokonaan ruudussa. Käy loput kaanto-arkit läpi.

## Seuraajan työ
1. Aja c87a77c16, katso kaikki 14 + uudet iPhone-arkit (myös täysikokoisina, kartta käännettynä; PT:n ohje "ennen valmista").
2. Arkit KK:lle viestillä, kohdat 1–5 KK:n sanoista: iPhone uudesta ajosta, iPad ja kääntö 8be86170b:stä. Kerro erikseen: täysikoko ruudun keskellä poikkeaa 4.42:sta (KK kysyy omistajalta), kuumailmapallo kankaan päällä.
3. Ei omistajalle ennen KK:n sanaa, ei mergeä (haara on kääntökokeen päällä, ebc8ce01e "koe, ei junaan").

## Pois jääneet (omistaja 10.52 ja 10.55; PT 10.55)
- KS:n ND:n iPad-haara lippua odottamassa: ei NUI:n jonossa, ellei KS tai PT pyydä.
- Vanhat kohdat 13.56-luovutuksesta 4 ja 5 (haara natiivi-ui/luovutus-20261104-1356): pois. Worktree-siivous ei poistanut haaroja.

## Huomiot
- Valopoikkeus: PT:n päätös "vain suunta, ei väriä eikä lähtötason muutosta" (Lippu3D.shader, KANGAS_VALO); ei saa laajentaa.
- tarkista.sh päivittää tyylikirjan (3 tiedostoa): git restore.
- Levy 91 Gi (sääntö 100). wt:stä poistui 12 kansiota; jäljellä aloitukset (3 muutosta, ei omaa ratkaisua tehty), kaanto, nousu-pieni, postilaatikko. T7 → NAS 2. erä: NS:lle kuitattu, kaikki saa siirtää.
- Tehty 08.xx–11.10, ei auki olevia ajoja.
