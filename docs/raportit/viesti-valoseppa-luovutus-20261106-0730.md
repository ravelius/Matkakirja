# Valosepän luovutus 6.11.2026 klo 07.30

Korvaa luovutuksen -0716 kohdat TILA, JÄRJESTYS ja LISÄYS 07.2x:n "jatka/kerro JU:lle". Muut pätevät: -0716 SILLAT, MITAT, ESIKATSELU; -0702 AJO ja TASAINEN KARTTA; -0300 TEHTY: SAINT-SULPICE; -0221 SAINT-EUSTACHE; -0157 AUKI AAMULLA; -0135 SUOJATARKISTUS; -0115 maa ja mittarit (paitsi helma). Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## TILA
Koodi 26d0fcdf2, haara `linssiseppa2/ohjelmakohteet`, natiivi-backupissa, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Ei junaan. Testit 17/17. EI käännetty Unityssä eikä ajettu; OhjelmaKohteet.cs ei kuulu testikäännökseen. Sillat, Eustache, Sulpice ja Pompidou ovat näkemättä kartalla.
Nimien kanssa: `linssiseppa2/ohjelmakohteet-nimet` 4e751932b (kääntyy vain yhdessä `natiivi-ui/merkki-pinta-219`:n kanssa). Jokainen muutos on yhdistettävä tähänkin haaraan; yhdistys on tähän asti mennyt ristiriitaan Kohde-riveillä (ratkaisu: uusi rivi + `NimiEste = true`). Palasin haaraan `linssiseppa2/ohjelmakohteet`.
D = /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet.

## SEURAAVAKSI
1. Kun JU ilmoittaa yhteisen ajon kansion: kuvat täysikoossa, viat nimettyinä KK:lle (`local_231e4bad`), rivi PT:lle. Tarkista erityisesti: katoaako ruskea kaistale se-et:ssä, rakeet ss-la:ssa, kivisillat (-0716), Pompidou jos mukana.
2. KK:n "pari oikea silta | peli" vasta ajosta (-0716 AJO).
3. Uutta rakennusta ei ole määrätty: odota KK:n tai PT:n sanaa. Hyväksyntä on omistajan.

## AJO
`D/sk-maa5.txt` 9 kuvaa, JU kuittasi; EN muuttanut sitä. JU:lle lähetetty 07.2x uudet shat ja `D/sk-maa5-pompidou.txt` (1 kuva, po-la, suunta 85 oma arvio): JU lisää vain, jos ajo ei ole alkanut, muuten seuraavaan yhteiseen ajoon. JU:n vastausta ei ollut tätä kirjoitettaessa. Ei omaa ajoa.

## PT:N LISÄYKSET (Postivahdin aloitusviesti)
(a) nimet ja (b) maan arvot olivat jo hoidettu -0716 LISÄYS 07.2x:n mukaan. PT:lle kerrottu. Tasauksen yhtälö on vain luettu koodista, ei ajettu.

## SAINT-EUSTACHE 05cc60e8a
KK:lle kerrottu 07.2x. Ruskea ala on kartan oma kirkon pohjakuvio.
MITATTU: väri 179,146,106 (kortteli 176,144,108), kuvasta se-et. Pinta jalanjäljen reunalla 74,2–91,1 (`maasto.korkeus` z12, skriptit scratchpadissa, malli `maa/kohteet.py`). Etelässä 3–10 m leijuntaa.
ARVIO: kaistale noin 8 px, mallin mittakaava noin 1,4 px/m, siis noin 8 m leijuntaa kohtisuoraan: sopii yhteen, ei todiste. Kartan kuvaa ei nähty ilman mallia.
KORJAUS: MaaH 42,9 → 37,5 (pinta 75; lounaiskulma leijuu vielä 0,8). Kaakkoiskulman sali x 53,4 → 57,5 ja etelämuuri OSM:n reunaan (piirros 1850:stä antoi 53,4; POIKKEAMA piirroksesta); testin raja päivitetty.
HINTA: koillisessa malli noin 16 m pinnan alla, voi peittää katua. Tasaisella kartalla ei väliä. OSM:n koilliskolmio (x 28–36) yhä mallin ulkopuolella, pohjoisesta ei katsottu.

## SAINT-SULPICE 05cc60e8a
Katot: `SsLiuske` 0x3F4246, `SsPelti` 0x4E5154, vain tämä kohde; kaikki Ss-funktiot, myös tornien kannet. Ajossa katto näkyi 95,100,111. Väri arvioitu esikatselusta, ei viitekuvasta katolle.
Perron: 7 askelmaa → yksi viisto pinta Kivi, koska 0,6 m:n askelmat olivat alle pikselin. POIKKEAMA mitasta, KK:lle kerrottu; jos lähikuva kärsii, palauta askelmat harvempina. Katon reunan valkoiset pisteet ja yläkerran tummat kaaret ennallaan, ei pyydetty.

## POMPIDOU 26d0fcdf2 (omistajan poikkeus 11.8, App Store -listalla)
`OhjelmaKohdeGeometria.Pompidou()` tiedoston OhjelmaKohdeRakennukset.cs lopussa, 5 734 kolmiota, testi `PompidounMitat`, `kohteet.py`:n listassa (ei ajettu sen jälkeen).
MITATTU OSM: x ±84,2 (malli ±84,5 päätyristikon takia), z −33…+28, korkeus 42. Lat/Lon/Akseli kuten -0702.
POIKKEAMA SUUNNITELMASTA -0702: keskilinja z = −2,5 (ei 0), jotta tangot osuvat OSM:n reunoihin; pilarit ±24, tangot ±30 tästä. Portaat z = 31 eli 4,7 m Piazzan puolelle OSM:n yli, alkupää x 72.
TULKINTA / MUISTISTA / ARVIO: täsmälleen KK:lle lähetetyn viestin mukaan; -0702 POMPIDOU-luku on lähde. Katto muutettu yhdeksi siniseksi massaksi, koska erilliset laatikot näyttivät leluilta; väri on esikatselussa kuvaa -0 kylläisempi, katso pelikuvasta.
MaaH 35,0 = länsireunan matalin (pinta 69,4; mediaani 84,5; idässä 100). Maa nousee jalanjäljellä 31 m: idässä malli 30 m pinnan alla, voi näyttää siirtyneeltä idästä. Tämä on isoin auki oleva riski kaltevalla kartalla; tasaisella poissa.
`NimiEste` vain nimihaarassa.

## ESIKATSELU (ei kartalla, ei todista lopputulosta)
/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa-2/6ecc2d0d-e7e7-4fe3-903e-2bf62155b388/scratchpad/esi. `python3 D/esikatsele.py D/obj <tulos> <nimi> <kallistus> <suunta> 1100` ilman -I:tä (numpy). Saint-Sulpicella suunta 90 = länsi, 270 = itä.

## MUUTA
En lukenut aloituksessa Raamatun lukulistaa (7.47): luin vain omat luovutukset. Lue se seuraavaksi aloittaessa. Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin rivit eivät ole Valosepän. ÄLÄ aja `maa/pinta.py kirjoita` eikä `a/tee-sillat-cs.py`.
