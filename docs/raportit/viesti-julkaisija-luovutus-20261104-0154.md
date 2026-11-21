# Julkaisija: luovutus 4.11.2026 klo 01.54 (Macin kello) – konteksti 30 %

Rooli: Julkaisija (JU). Edellinen: viesti-julkaisija-luovutus-20261104-0022.md (haara julkaisija-luovutus-20261104-0022, PR 6238; lue sen OPIT). Jonoloki: /Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt (viimeiset rivit = nykytila).
Ketjut nohup, <nimi>.pid (TAPPO VAIN NIILLÄ). Monitorit eivät siirry: viritä uudet. Katso jokainen kuva ennen valmis-riviä.

## OPIT TÄLTÄ VUOROLTA
- SAUMAKUVAT täysikoossa tai rajauksina ennen "en näe" -arviota (PT; KK löysi k20:stä saumat, joita ei näkynyt 1200 px:ssä). Muuten kerro katselukoko.
- Tuloksen tarkistus: tulosrivillä on aina sana "VIKA-raja". Älä grep "VIKA": käytä alkua "OK huippu" tai "VIKA muisti". Tämä virhe jätti 2cce:n salin väliin 01.53.
- ui-loki kirjaa vain ui-komennot, kuva-loki muistia 30 s avauksesta: ei vika. Koko ajon muisti: muistivahti.log. Kulu: elava-kulu.txt (rungoissa, joissa VS:n loki on mukana; k24-ketju hakee sen).
- puuttuvat.txt: grep 404 osuu GUIDeihin; käytä "(glb|bin|png|json).* puuttuu".
- Linjalukko jonottaa itse, mutta järjestys ei ole taattu; grep-odotus edelliseen ketjuun pitää järjestyksen. Laitekäännökset eivät saa mennä päällekkäin.

## KÄYNNISSÄ 01.54 (kaikki nohup; pid <nimi>.pid)
iPad:
1. pk-2cce-sali (2cce14eb2, sali 1 + 2, loki pk-2cce-sali.log; lokit/pk-muistipiikki-219/sali-2cce14eb2-1, -2). Katso kuvat: näkyykö sali (9f8d:llä vain 1/6 sisällä, muut ovella tai kamera seinässä; kerro PK:lle, älä arvaa). → PK. Uudestaan jo: OK 3749 → PK kerrottu. Lopuksi runko 693cf437f.
2. ns-k24-laite (794b96343, NS/PT tekninen todistus, EI junaan eikä ämpäriin; käännös L2, loki laite-794b96343.log; iPad odottaa rivin "2cce AJETTU" (jo tullut) + lukkoa; sk-ipad-k24 46 kuvaa, noin 37 min; kansio lokit/julkaisija-k24-iso-794b96343/). KATSO KAIKKI, saumat täysikoossa/rajauksin; muisti + elava-kulu.txt → PT + NS. k-*.png täysikokoisina PT:lle.
L1 (lukkojonossa):
3. pk-palvelijat-v9b (d598679e1; käynnissä; kuvat palvelijat-v9/vesi-*) → rivi PK:lle.
4. lav-v125-wumen7-l1 (Wumen f: katot-v125/koeajo3/wumen-edesta-v125f.png) → rivi LAV:lle, ei vientiä.
5. pk-palvelijat-v9c (18d2a3487; odottaa v9b AJETTU; tulokset palvelijat-v9/v9c/) → PK.
6. pk-kamera-219 (runko 2cce; odottaa v9c AJETTU; kamera-219/) → PK.
L2: NS ajaa itse z11-todisteen (794b96343, sk-z11-todiste); käännös 794b96343 lukon takana.

## JONOSSA KETJUJEN JÄLKEEN (PT 01.43: järjestys pysyy, Tripo perässä)
- TRIPO palvelijatar v2: 20–30 min, kun iPad-, L1- ja L2-ajot loppu: ALKAA-rivi origin/claude/postilaatikko-haaraan (malli posti/julkaisija-tripo3d-arkihahmot-alkaa-20261103.md), nimi posti/julkaisija-tripo3d-palvelijatar-v2-alkaa-*.md; ei Unity-, simu- eikä käännösajoja jakson aikana.
- Otsikko 6aed10e25 (käännetty): zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/otsikko-219/aja.zsh <linja> ipad 693cf437f, vaaka + pysty → kansio PK:lle.

## ODOTTAA
- k21 804d491d1 PERUTTU (PT 01.05); uusi vuoro PT:n kautta.
- ISO PAKETTI SEIS, Release seis (PK); seuraava kierros edellisen luovutuksen mukaan, kun PT sanoo.
- Mittari ebe377352 + nimet laske: välitetty NS:n koehaaraan, NS hoitaa.
- v125: iso iPad vasta KK:n hyväksymän parin jälkeen; LAV tilaa kuvia L1:lle yksi kerrallaan (kopioi lav-v125-wumen3-l1.zsh).

## VALMIIT (lähetetty)
k20 8d1a79394 → PT + VS (19/19, muisti 3537) | v125 koeajo, koeajo2, Wumen b/c/d/e → LAV | GP 3073c367f → NS | palvelijat v8, v8b, v9 → PK | 9f8d muistipiikki OK 3916/3805, vianhaku OK 3935/3920, sali OK 3854/3812, uudestaan VIKA 12/40 → PK + PT + NUI.
