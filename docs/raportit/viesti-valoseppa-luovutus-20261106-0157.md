# Valosepän luovutus 6.11.2026 klo 01.57

Korvaa luovutuksen -0135 muilta osin kuin kahdesta luvusta, jotka pätevät siellä: SUOJATARKISTUS (ainoa tallenne, koko lista) ja AJO sk-maa. Syy: konteksti pehmeällä rajalla (Raamattu 7.37). Maa, helma, varjo ja mittarit: -0115.

## TILA
Koodi d48b1b220, haara `linssiseppa2/ohjelmakohteet`, natiivi-backupissa, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Ei junaan. Testit 14/14 (kaikki: `<dotnet> rak/G.dll OhjelmaKohde`). d48b1b220 EI käännetty Unityssä eikä ajettu; 0c25527b2 kääntyi ennen sitä.
D = /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet.

## KK 01.5x: PÄÄTÖKSET AJOSTA 0c25527b2
- Palais Bourbon seisoo, tumma laatta poissa, kelpaa kokeena, ei junaan. Concorde ja Pont Neufin oikean rannan pää kelpaavat kokeena; Concorden kiilan KK kertoo aamulla.
- Korjaa seuraavaan ajoon, EI OMAA AJOA: 1) Pont Royal näyttää puupukilta; tavoite kivisilta kaarineen ("Oikeissa mitoissa", omistaja 21.49); katso sama Louis-Philippestä ja Pont au Changesta, mittaa syy. 2) Pont Neufin sahalaita, jos korjaus on pieni, muuten syy ja jätä.
- Tour Saint-Jacques: lähempi kuvapari samaan ajoon, ei hyväksyntää vielä. ÄLÄ SUURENNA; KK kertoo tikkumaisuuden omistajalle aamulla.
- Saint-Eustache voi tulla samaan ajoon.

## TEHTY: PONT ROYAL, MITATTU SYY
Kansi oli vaakasuora korkeudella Maa × 2 + Kansi, mutta kartan pinta akselilla ei ole: Pont Royalilla 52,8 m (x −25) → 80,6 m (x +87), joten kansi on pinnasta 28,9–1,1 m. Helma (30 m alas) venytti pilarit pinnalle asti: nämä ovat jalat. Mittari `D/maa/profiili.py` (kaikki sillat; argumentilla yhden sillan profiili). Koko sama: Louis-Philippe 60→79, Pont au Change 81→65 (päät).
Korjaus d48b1b220, kaikki 12 ohjelmasiltaa, siis myös KK:n kelpuuttama Concorde: silta seuraa kartan pintaa akselinsa suunnassa.
- `KaupunkiSilta.MaaA, VesiA, VesiB, MaaB`: h ennen kerrointa, `D/maa/pinta.py` (`kirjoita` päivittää taulukon; pelkkä ajo tulostaa). `SillanPinta(s, x)`: paloittain suora, vesiosa yhtenä suorana, joten pitkät nelikulmiot pysyvät tasoina. Sullyn varret yhteisellä korkeudella saarella.
- `OhjelmaKohteet.cs`: `Kohde.Pinta`, verkon kärjet ja maavarjo saavat lisän `Pinta(x) × PintaKerroin`. Tasaisella kartalla kerroin on 0 ja verkko tehdään uudelleen (`PaivitaMuoto`), joten KS:n koe ei riko tätä. Geometria ja OBJ:t ennallaan: offline-kuvassa muutos ei näy.
JÄÄNNÖKSET, EI SAA PIILOTTAA: vesiosan suora poikkeaa pinnasta enintään 8,6 m (Sully pohjoisvarsi), Pont Royal 5,3, Louis-Philippe 0,0, Pont au Change 5,0. Kansi kallistuu vesiosalla enintään 12,4° (Pont au Change; Pont Royal 10,0°): pinta kallistuu samoin, mutta katso, näyttääkö se vinolta. Poikkisuuntaa ei seurata. Pont Neuf ja Pont Alexandre eivät kuulu korjaukseen.

## PONT NEUFIN SAHALAITA: EI KORJATTU, KERROTTU SYY
Hampaat ovat pilarien puolikuut (oikea piirre, `PilarinPaa`), jotka nousevat helman varasta kannelle ja näkyvät tässä kulmassa peräkkäin. Lisäksi kaiteessa on tummia pikseleitä (KK:n tuntema kaide-pisteet). Korjaus olisi Pont Neufin oman rakentajan muutos tai saman pintamekanismin vienti varsille, jotka kohtaavat saarella: ei pieni, jätetty.

## SEURAAVA AJO (JU:lta vuoro; EI VIELÄ PYYDETTY)
`D/sk-maa2.txt`, valmis: p-roy, p-lp, p-cha, p-con, tsj-lahi-pohj, tsj-lahi-et. JU:n vaatima "mitä tämä ratkaisee" on ensimmäisellä rivillä. Ajohaara kuten `linssiseppa2/ajo-maa`: ohjelmakohteet + e726bba9f (`git merge-tree --write-tree`, `git commit-tree`, `git branch`), ei viedä.
TSJ-pari käyttää kehityskomentoa `lahinleveys 5`, koska `aja` pysähtyy pelaajan lähimpään tasoon (kaikki edellisen ajon kuvat noin 1,9 px/m). Piirroskartta voi ohittaa komennon (`PalloKierto.MinKorkeus`); jos koko ei muutu, kerro se KK:lle, älä hae toista keinoa pyytämättä. Pelaaja ei näe tätä etäisyyttä: kerro KK:lle.

## SEURAAVAKSI
1. Saint-Eustache (OSM way 53762963, 109×49; height-tieto 10 on virheellinen, holvi 33,46 m). Vuodet 1532–1633 tarkistettu fr.wp:stä, nykyteoksia ei mallinneta. Ensin kuvat: `python3 -I D/a/hae-viite.py listaa <kohde>`, `hae <kohde> <i> ...`. Malli: Tsj- ja Pb-apurit OhjelmaKohdeRakennukset.cs:ssä. MaaH: lisää `maa/kohteet.py`:n listaan, aja `aja-geometria.sh` ensin, sitten `python3 kohteet.py` kansiossa maa/ (ilman -I).
2. Lisää Saint-Eustachen kuva `sk-maa2.txt`:hen, tee ajohaara, pyydä vuoro JU:lta, katso kuvat täysikoossa, viat nimettyinä KK:lle.
3. Saint-Sulpice (way 16077204, 122×57; porttikäytävä 32 m leveä), vuodet 1646–1870 tarkistettu.
Viitekuvat Pont Royal-3 ja -4 haettu kansioon D/a/viite, EN katsonut niitä.

## AUKI AAMULLA (KK)
Concorden kiila, kaide-pisteet, 14 m:n seinät, Notre-Damen pää, Pont au Doublen mitat 38/94 m, Concorden levennyksen tekijät, Tour Saint-Jacquesin tikkumaisuus: KK kertoo omistajalle. Pompidou-keskus-nimi on yhä kartalla: mallia ei ole, nimeä en ole muuttanut.

## MUUTA
ÄLÄ aja `a/tee-sillat-cs.py`:tä. Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin rivit eivät ole Valosepän.
