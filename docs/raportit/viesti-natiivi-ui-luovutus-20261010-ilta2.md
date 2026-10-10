# Natiivi-UI: luovutus 10.10.2026 klo 19.4x (PT:n nollaus 51 %)

Säännöt: viesti-natiivi-ui-luovutus-20261010-aamu.md (pätevät yhä). Muistio: natiivi-ui-tila-20261009.md.
Pitkät simu-, käännös- ja asettelutestiajot ajetaan irrotettuina (perl POSIX::setsid + skripti scratchpadissa), koska session
uudelleenkäynnistys tappoi 18.15 run_in_background-ajon kesken. Omat simut: iPhone 17 96044270, natiivi-ui-iPad11 F7513985.

## Tänään junissa (kuitattu, SHA:t Natiivisepällä)

- 179: asettelutesti-mac-179-2 f572720ab (maakortin pääkaupunki / hallinnon paikka), latauspallo-tuuli-179 e0eeafb4f.
- 180: pallo-koysi-sumuun-179 e341491f7 (ankkuriköysi häipyy sumuun, iPhone vaaka nimen yläpuolella).
- Pelikoodarin #4360 (Ramallahin nimi Jerusalemin alla) ei toistu natiivissa: Kevyt-piste pinossa pudotetaan → ei muutosta.

## KIIRE 1 (PT 19.2x): kohdekaupungit eivät näy / häviävät — SYY RAPORTOITU PT:lle 19.3x

iPad vaaka, uusi peli Pariisissa, sama sisältö v655: BUILD 179 ilman pelinappulaa ja Saint-Cloudin nimeä (kuvaruudussa 8 intron
kuvaa), BUILD 178 normaali. Kartta/- ja Peli/-koodi identtinen → syy on build, ei sisältö: LS1:n Pariisin nykyintro
(Saapumisesitys.NykyIntro a6771263c: kortti.Kuvat.LuentoKaynnissa = true intron ajan). Ranskassa sallittuja pallokaupunkeja on
vain 2 (Pariisi, Marseille). Pallot roikkuvat luoteeseen, joten ne osuvat Saint-Cloudin ja Avignonin kohdalle. Kuvat:
lokit/todistus-kohde-ipad-179-20261010-1926 ja -178-20261010-1929. Korjaus LS1:lle / PT:n päätös; odota PT:n linjaa.

## KESKEN 2: Pariisin kippikorjaukset (PT 19.0x, omistaja; juna 180 tavoite)

natiivi-ui/kippi-pariisi-180 **4af39b65c** (juna-180 57bfc3083:n päällä): kertomuskuvat (OpasKuvanosto) lisäkuvien kokoisina niiden
vasemmalle (KuvanostoAsettelu.Kulmaan), metrolinjan asemat napautettaviksi (osuma-ala, lähin asema, AsemaValittu → nyt
OpasSovitin.Liiku), selite koko kohteen ajan. Testit L1347/P456/K461, tarkista 0, asettelutesti LÄPI (editorissa selite ja kuvanosto
eivät piirry: ajastus/aika ei kulje → todennus simulla). Simukäännös a33722497 (scratchpad app4). iPhone-kippiajo OK (lokit/todistus-kippi-iphone-20261010-1929): Louvren napautus siirsi
korostuksen, selite näkyy, kertomuskuva pienenä oikeassa alakulmassa (testikuva Nyhavn ei latautunut → kuvanosto kuvanapin
paikalla). iPad-ajo käynnissä irrotettuna 19.31 → lokit/todistus-kippi-ipad-*; ilmoita Julkaisijalle SIMU VAPAA, kun valmis.
JÄLJELLÄ: (a) kun LS1:n linssiseppa/pariisi-kippi-180 50204e0f2 (OpasSovitin.KierrosKohteeseen(int i)) on junassa 180, vaihda
OpasValikko metro.AsemaValittu → `OpasSovitin.KierrosKohteeseen(i)`; (b) kuvapari iPhone + iPad PT:lle (myös tapaus, jossa kuvanappi näkyy ja kertomuskuva on sen vierellä); (c) kuittausrivi PT:lle → SHA Natiivisepälle.

## KESKEN 3: Jos Maa lakkaisi pyörimästä, UI (PT 18.5x; EI junaan ennen kuin omistaja on nähnyt LS2:n prototyyppikuvat)

natiivi-ui/maa-ei-pyori-180 **bab469d18**: Ydin/MaanPyoriminen.cs (Pyorimisnopeus 0–2, Muuttui; LS2:n kanssa sovittu, LS2 rakentaa
072e94c89:n päälle), Asetukset > Kartta "Pyörimisnopeus" -säädinrivi (äänentasojen mk-saadinrivi, arvo kahdella rivillä "100 %" /
"24 h"), tallennus matkakirja-maa-pyorimisnopeus, Asetukset.Nollaa, rivi näkyy kun linssi rekisterissä ja saatavilla;
MaaEiPyoriKerrokset.Piilota/Palauta (LS2:n sovitin kutsuu), LinssiUi porttina. Asettelutesti 19.14: rivi oikeassa pohjassa, arvo
leikkautui → korjattu kahdelle riville bab469d18, EI vielä uudelleenajettu. JÄLJELLÄ: asettelutesti (NAKYMAT "pillerin asetukset",
4 kokoa) → SHA PT:lle.

## Muuta

Soundly UI-äänet odottavat PT:n "200"-ilmoitusta. Lukkoa tai simuja ei ole minulla luovutushetkellä (ks. viimeiset viestit Julkaisijalle).
