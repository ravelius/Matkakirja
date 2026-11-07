# Pelikoodari: luovutus 07.11.2026 klo 16.06

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (25 %). Vanhat työkalut: `git show bb183d409:docs/raportit/viesti-pelikoodari-luovutus-20261107-1532.md` kohdat 3 ja 5 sekä kulkukartan kohta.

## 1. Avoinna: Lontoo-nimi, PT:n vuoroa odottaa
Korjaus `5bd4aa484`, haara `pelikoodari/lontoo-nimi-haipyy` (natiivi-backup), rungossa `08ca315a4`. Ei junassa. PT:lle raportoitu 16.00, kuvat katsottu. Raportti `/Users/Shared/Claude/proto-3d/lokit/pelikoodari-lontoo-i13-5bd4aa484/raportti.md`, pari `pari-lontoo-nimi.jpg` samassa kansiossa. Poiminta kärkeen `359fc1f95` puhdas (merge-tree), ei käännetty eikä ajettu siellä. JU odottaa sanaa: junaan vain PT:n vuorolla.
Sääntö: `NimiLadonta.KaupunkiPaikkaKelpaa`, muisti `Nimikerros.kaupunkiMuisti` tason sisällä, uusi paikka syttyy vasta edellisen häivyttyä (`Rivi.odottaa`). Lähipaikka voittaa kaukopaikan vain 10 %:n päässä reunasta (`KaupunkiReunaOsuus`).
Avoimet, kerrottu PT:lle:
- Tasonvaihdon kautta sama kamera -0.0754 antaa paikan 16, Regent's Parkin puolella (`i13-reitti-1`). Ei hyppy; KK:n päätettävä, kelpaako.
- Pariisi kohdissa 5–6 ei nimeä, sama ilman korjausta. Syy ei todistettu. Lokin "ladottu" on siellä todennäköisesti vanha rivi: `ValitsePerintoSivut`:n `lahella`-haara ei siivoa `syy`-kenttää. Ele ei koettele kaukopaikkoja Pariisissa.
- Wellington ja Mornington: rivit samat i12:ssa ja i13:ssa, korjaus ei koske. Vaihtelun syy ei todistettu.

## 2. Avoinna: Lontoon kumpu, KS tilaa iPad-ajon
MaaH-arvot `045844251`, haara `pelikoodari/lontoo-kumpu-maah` (natiivi-backup), KS:n `791972bbd` päällä. Kartta-testit 709/709, Unity 0 virhettä, ei ajettu kuvissa. KS:lle ilmoitettu. Ei junaan eikä vientiä ilman PT:n sanaa. Jos iPad-ajo näyttää kohteen ilmassa tai maan alla, korjaus samaan haaraan KS:n lukemista.

## 3. Ennallaan
Kulkukartta: juuri tulee Lavastajalta palkkipäätöksen jälkeen, ei odoteta (PT 15.3x). Lisää kerros olemassa olevaan tiedostoon, älä vie uudelleen. Junan juoksuajon raportti PT:lle: ks. 1532 kohta 3.
Työpuu `/Users/Shared/Claude/wt/proto-pelikoodari-kortti` on haarassa `lontoo-kumpu-maah`; KS:n iPad-ajo käyttää sha:ta, älä silti siivoa haaroja. `.claude/settings.local.json.ennen-kevennysta` ei minun.

## 4. Opit
- Laatikot lokissa ovat 640×480-ruudussa, kuvat 2752×2064: muunna ennen kuin väität nimen olevan tai puuttuvan.
- Ladonta ei päivity liikkeen aikana (omistaja 09.54): `nimet etsi` liikkeessä antaa alkutilan. Mittaa pysähdyksissä.
- Pelkkä `nimet etsi` ei riitä: Pariisi 5–6 loki sanoi "ladottu", kuvassa ei nimeä. Katso aina kuva.
- `odota` ei ole kohdan 1 Pariisin ele: 16 kuvan koostetta ei mahdu yhteen 1200 px:n pohjaan. Laske koko ensin.
- zsh: `echo == x` kaatuu (`= not found`).
