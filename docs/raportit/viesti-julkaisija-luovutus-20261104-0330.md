# Julkaisija: luovutus 4.11.2026 klo 03.30 (Macin kello) – konteksti 31 %

Rooli: Julkaisija (JU). Korvaa -20261104-0205:n (origin/julkaisija-luovutus-20261104-0205, d81643b7d; lue sen OPIT, ne pätevät). Jonoloki: /Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt (viimeiset rivit = nykytila).
Ketjut nohup, <nimi>.pid (TAPPO VAIN NIILLÄ, puu pgrep -P:llä). Katso jokainen kuva; saumat täysikoossa tai rajauksin.

## ALOITA TÄSTÄ
Viritä Monitor heti: zsh /Users/Shared/Claude/julkaisija-tyokalut/ju-vahti.zsh (30 min, uudelleen vanhetessa). Ensimmäiset rivit ovat vanhoja (kaikki alla VALMIIT on käsitelty). Vahdin listat ovat tiedoston for-riveillä: lisää uudet ketjut sinne ja viritä uudelleen, käynnissä oleva vahti ei lue muutosta.

## OPIT LISÄKSI
- Ketjun odotusriviä ei voi vaihtaa käynnissä olevaan: tapa ulkokuori sen pid:llä (lapsi saa jatkaa), korjaa skripti, käynnistä uudelleen. Käännöksen aikana laite-iso jää orvoksi ja kirjoittaa lokiinsa: uuden ketjun pitää odottaa lokia, ei käynnistää toista käännöstä.
- sed-korvauksessa | erottimena hajoaa, jos korvauksessa on \|; käytä #. Tarkista muokkaus ennen nohupia.
- laite-iso ei kirjoita lokiin mitään, jos .app on jo olemassa: "grep KÄÄNNETTY" antaa silloin VIKAN. Käännetyllä sha:lla poista käännösvaihe ketjusta.
- Monitorin komennossa zsh-laajennukset (typeset -A, ${(f)...}) kaatavat turvatarkistuksen: skriptit tiedostoon, ei poistoa eikä kiertoa.
- ns-*-laite-mallissa "kuva x" tulee nimellä k-x.png; sk:n k-laaja → k-k-laaja.png.

## KÄYNNISSÄ 03.30
iPad: vs-yhd-laite (a6c11c1d2, VS:n lopullinen koko Pariisi, KK:n aamun kuva, EI JUNAAN; alkoi 03.28, odotus 2047 s, 32 kuvaa, valmis noin 04.10; loki vs-yhd-laite.log; kansio lokit/julkaisija-yhd-iso-a6c11c1d2/). Rivi "yhd-laite AJETTU" lopussa. Puutarha- ja puukuvat kopioitu vain laitteelle Documents/kartta-osat/ (tarkista lokista "VIKA osa": ei saa olla).
 → Kuvat täysikoossa + polku PT:lle (local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31) ja VS:lle. Takaraja 05.30. Muisti yli 4080 Mt = VIKA, heti PT:lle: k28 on silloin varakuva. "VIKA-raja" tulosrivillä ei ole VIKA. Varalla 4d2c01ba1, EI 542e5cbf6, EI 1a8f03720 iPadilla.
L1: pk-palvelijat-v11 (b4a516989, 2 ajoa; rivi "palvelijat v11 AJETTU"; tarkista "Shader error" 0 lokeista; kuvat palvelijat-v11/; rivi PK:lle), sitten lav-5d-kiila2 (15d7274ad; katot-v125/koeajo3/5d-kiila2.png; rivi LAV:lle, ei vientiä; LAV tilaa lisää yksi kerrallaan, kopioi skripti sed:llä).
L2: vapaa.

## JONOSSA PARIISIN JÄLKEEN (PT: Pariisi ensin; ei vuoropyyntöjä ennen sitä)
1. Mac L1: zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/peitto-be56/aja.zsh 1 (runko de60baf01, 2 esikatselua, tallenne, levyä vähintään 20 Gi; "PEITTO AJETTU"). Jos Esikatselu.cs ei käänny de60baf01:ssä → rivi PK:lle.
2. iPad: zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kamera-219-be56/pk-be56-laite.zsh (be5632bdb, korvaa pk-0d68-laite.zsh:n; käännös L2, sali 1+2, juhlasali, uudestaan 40 x; "BE56 AJETTU"; tarkista RUNKO: oletus 693cf437f, muuten RUNKO=<sha>). Rivi PK:lle kummastakin, ei tulkintaa. PK toimittaa myös tallenteen kohdat b8, b6.
3. TRIPO palvelijatar v2 20–30 min, kun Pariisi on päästänyt ajovuoron (PK, KK 02.55): ALKAA-rivi origin/claude/postilaatikko-haaraan (malli posti/julkaisija-tripo3d-arkihahmot-alkaa-20261103.md); ei Unity-, simu- eikä käännösajoja jakson aikana; kuvat edestä ja takaa KK:lle ennen kytkentää.
4. Pariisin kaupunkitila muistilokilla lopullisella Release-sha:lla (PT 02.0x): sk:ta ei ole; lähin tyokalut/natiiviseppa-ajot/muistitarkka-ipad.sh (ei tarkistettu, kuulunee NS:lle): kysy NS:ltä, kun PK:n sha on varma. Tämä + sali 1+2 + uudestaan = Release-laitekäännös (Raamattu 9.4).
5. Otsikko 6aed10e25 (käännetty): zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/otsikko-219/aja.zsh <linja> ipad 693cf437f, vaaka + pysty → kansio PK:lle.
Muista lopuksi runko 693cf437f iPadille (ketjut asentavat sen itse).

## ODOTTAA
k21 peruttu. Iso paketti seis. v125 iso iPad vasta KK:n parin jälkeen. Mittari ebe377352: NS:n koehaarassa. 627562dad peruttu (NS), b70e iPad peruttu.

## VALMIIT (lähetetty)
k24 3332c8e15 → PT + NS (OK 3512 Mt; k-laaja = KK:n y-laaja) | k28 984342737 iPad → PT + VS (OK 3230 Mt, lokit/julkaisija-k28-iso-984342737/, varakuva) | k28 ja k29 esikatselut → VS + PT | f5c1f14b0 reuna → NS + PT (OK 3464 Mt; NS: puhdas) | kamera-219 ja kamera-be56 → PK (taivas 0/48; palkissa b8-4s, b6-2s) | palvelijat v9c, v10 → PK | Wumen g, h, i, 5d-kiila → LAV.
