# PT-luovutus 29.10.2026 klo 21.36 (konteksti 29 %)

Edellinen: viesti-fable-luovutus-20261029-2045.md (+ lisäys 21.2x). Tämä voittaa. Keskustelu:
/Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-29-klo-2107-2136.md

## Juna 214 → TestFlight (omistaja 17.20, omistajan tärkein asia; KK 21.2x)
- Ennallaan: AINOA ESTE JU:n Alppien maastokopio z10–12 (layer.json vielä 404 klo 21.10). Sitten KS maastotarkistus →
  osoitin 4486eb40b NS:lle → NS lukitus → JU TF 214 → NS asentaa lopullisen 214-rungon isoon iPadiin. KS:lle käsketty:
  junan 214 osuus ennen porttia 06. JU ja NS levossa odottaen (oikeutettu).

## Juna 215: juoksupelin osasarja (OMISTAJA HYVÄKSYI 21.07 "Hyvä. Keksitkö vielä muita tapoja tämän lisäksi"; loki PR 5616)
- Uudet sessiot eivät käynnisty, kun omistaja on Remote Controlissa (start_session vaatii työpöydällä kirjoitetun viestin)
  → käytettiin levossa olleita: HALLI (Taihedian, erolista 1, 2, 5) = Natiivi-UI; PORTTI 06 (Meridiaani) = Karttaseppä.
- HALLIN JAKO (PT 21.3x): NUI LOD1-katon muoto, julkisivun UV:t LOD1 ja terassikaiteet LR:n osasarja-v1-osista myös
  LOD1-etäisyydelle (EI C2-LOD1-paloja); LR koristeet LOD1:een (v146); VS pinnat. NUI nollautuu (36 %); Postivahdille
  rivi aloitusviestiin. Suunnitelma proto-3d/_tyo/natiivi-ui/halli-215/suunnitelma.md.
- PORTTI 06: KS:n erolista + suunnitelma A–D kuitattu (proto-3d/_tyo/karttaseppa/portti06-215/erolista-06.md, parit
  212123 ja 212644). Ohje: 1067/1070/1071 jo pintasarjassa; kk_wumen.py-kopion muutokset takaisin LR:lle samassa paketissa.
- LR: osasarja v1 VALMIS (11 osaa + 3 profiilia, kielletty-rakennukset/osasarja-v1/), PR 5619 mergetty (PT korjasi
  Ladonta-rivin: PK latoo puhtaalla koodilla, ei ajonaikaisia Splinesejä). v148 pikkutiili 0, Taihemenin muurit pois
  (kuvat katsottu). Avoimet (kuja 01) EI muuteta nyt (kujat omistajan hyväksymät). Seuraavaksi pari v77 (03/03b) + paketti v73.
- PK: osasarja-215 882debb2e (pariajo 8 kohtaa, pintatarkistus) + 511ca08dc (ladonta koodina, oletus pois) kuitattu.
  Codex-YHTEISTILAUS lähti 21.2x (posti/pelikoodari-codex-juoksupeli-osat-215-20261029.md): Tripo A1–A6 (vastaanotettu,
  e9737d82c), kuvat B1–B3 työn alla (adb93ef95). PÄÄTÖS: tripo_mat_* sallittu VAIN A-osien glb:issä (PK lisää
  palatsi-pinnat.json:iin). 07-havainnekuva: git show origin/claude/postilaatikko:posti/juoksupeli-havainnekuvat-810-20261021/
  07-yleiskuva-ylhaalta.png (PK palautti levylle).
- VS: pinnat-215 abdd058ed kuitattu junaan 215 (katot kullankeltaiset, kaukolattian saumat; pari 211437/03 katsottu).
  1067/1070 myös lod1/2:ssa (juuri-pk7-v76). VS nollattu 21.3x.
- Codex-toimitukset kuitataan postiin heti, kun B1–B3 ja A1–A6 saapuvat (PT tarkistaa täysikokoisina).

## Muut
- Asemataulu: tyolista.json osasarjarivi päivitetty (edistys 3, 21.34). Junalle 215 ei vielä riviä (214 auki).
- Monitorit odottajavahti + codex-posti-vahti käynnissä 21.08 alkaen (30 min) → uusi PT käynnistää uudelleen.
- PK ja LR nollattu 21.2x–21.3x; KK 37 %.
- Järjestys omistajalle: aukio → sali 04 → 06/07 → kortti valosta (halli ja portti nyt rinnakkain).
