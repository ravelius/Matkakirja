# Julkaisija: luovutus 6.11.2026 klo 20.42 (konteksti 32 %)

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt. Korvaa aiemmat luovutukset; tämä riittää ilman niitä. Id:t: /Users/Shared/Claude/osoitekirja.md.

## ALOITA TÄSTÄ
1. AJOSSA, irrotettuna: pid 91686 `zsh T/ks-yhteinen-ajo.zsh 31 08f5ea7bf 66`, L2, alkoi 20.37. 66 kuvaa + 25 tallennetta, noin 1,6 Gt. Viritä odotin: tulosrivi T/ks-yhteinen31.tulos, loki T/karttaseppa-yhteinen-31-b8-08f5ea7bf.log. Kuollut prosessi: tarkista `ps -p 91686`.
2. Kun ajo on valmis:
   - Kopioi tallenteet ja txt-tiedostot lokikansioon: mac-ajo.zsh kopioi vain png:t, loki.txt ja unity.log. E = viimeinen "ESIKATSELU VALMIS" -rivi lokista; `cp -Rp E/<tallennekansio> P/lokit/karttaseppa-yhteinen-31-b8-08f5ea7bf/` ja `cp -p E/*.txt` samaan. Kansioiden nimet skenaariosta P/_tyo/karttaseppa/sk-pariisi-yhteinen-31.txt. Pohja: scratchpadin ks30kopio teki saman ajolle 30.
   - Tulos KS:lle: kuvat, tallenteet, Shader error, error CS, PUUTE, kesto.
   - TÄRKEÄ: VS:n varjostinta 3d6e35696 ei ole ajettu. Jos se kaataa käännöksen tai kuvat, kerro KS:lle HETI: KS ottaa sen pois ja tilaa muun (PT:n sana).
3. Jono on muuten tyhjä. iPad vapaa, runko d092f48c palautettu 20.41, sovellus kiinni. L1 vapaa.
4. TF: EI lähde ennen KK:n korttia "Pariisi valmis" PT:n kautta (omistaja 17.33). Etäyhteys vain KK:lla.

## TILA
- Junarunko julkaisija/runko-219-muisti = 603d4213a natiivi-backupissa, ei käännetty. NUI-yhdistelmä 1104d0994 = 603d4213a + 13dab1aac, haara natiivi-backup/julkaisija/nui-yhdistelma-1104d0994, ei rungossa; rungon kärkeen vasta PT:n junakuittauksella. Laitekäännös lokit/julkaisija-laite-218-1104d0994 on tallella.
- iPadin indeksi: tyhjä (0 palaa) NS:n ajojen jäljiltä, ei 16 palaa.
- Valoseppa-vahti pyörii taukolipulla.

## TULOKSET TÄLTÄ VUOROLTA (kaikki viety)
- Origokoe iPad 5 d907286cb: 1. ajo keskeytyi 18.49 JU:n skriptivirheeseen (ks. opit), PT:n sanalla yksi uusinta 18.59-19.06: 7/7, vahti 0, lämpö 0. Koe suljettu. Ajon 1 kansio -keskeytys1-ei-aineistoa.
- NS Mac-14 ja Mac-15 valmiit; NS kuittasi. NS:n rakennustarina iPad: EI TULOSTA 20.25, muistivahti VIKA 4082 Mt ≥ 4080 Mt heti "palikat esineet 1":n jälkeen B:n alussa, ei uusintaa.
- NUI UI-sarja 1104d0994: 14/15, vain D:n 3 riviä. Piilo-palautus: Mac OK; iPad 1. ajo 0 palautusta (4 "omistaja muutti"), uusinta (odota 110, PT:n sana, viimeinen) 5 poistoa, 5 palautusta, kansio .../ipad-2. Viety NUI:lle, joka arvioi. Toista uusintaa ei.
- KS 30 38ab4d14d: 28/28, 5 tallennetta, 0 virhettä; viety KS:lle.
- LAV 1-2 (EROTA 1041/1041), 3c, levyt4 x2, levyt4b, levyt5 ajettu ja kuitattu; odotus 404 = 4 täsmäsi kaikissa. LAV:n pyynnöt ajoin linjalla 2, kun L1 oli varattu.

## OPIT
- Laite kirjoittaa desimaalit pilkulla, Mac pisteellä: odotusriveillä vain tunnus, ei lukuja. Tämä oli 1. ajon syy.
- Vältä pgrep -f skripti.zsh -silmukkaa Monitorissa: oma komentorivi osuu, joten silmukka ei pääty ja odotin viivästyy. Käytä pid:tä tai tulostiedostoa.
- Vuoro: tarkista PT:n järjestys ennen kuin aloitat seuraavan ajon: NUI-sarja lähti 18.50 ja piti pysäyttää 18.51 origokokeen uusinnan takia (48 min työtä ei hukkunut, koska ero oli heti).
- En mitannut värieroa ennen kuin kerroin sen: Mac-14:n "väri- ja usvaero" oli väärä havainto. Mittaa ensin, kerro sitten.
- "VIKA lähetys" ipad-skenaariossa ei aina tarkoita, että komento jäi perille tulematta; katso konsolin "→ ok" ennen johtopäätöstä.
- ipad-skenaarion oleta-rivi näkee vain omat jälkeisensä rivit; arvioi ehdot konsolista.
