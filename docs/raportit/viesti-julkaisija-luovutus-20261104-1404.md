# Julkaisija: luovutus 4.11.2026 klo 14.04 (Macin kello) – konteksti 30 %

Rooli: Julkaisija (JU). Korvaa -20261104-1226:n KÄYNNISSÄ- ja AUKI-osat; lue sen ja -1045:n OPIT. Jonoloki: /Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt (T = tuo kansio), viimeiset rivit ovat ajan tasalla. Katso kuvat ennen kuittausta ja sano, jos katsoit vain osan.

## ALOITA TÄSTÄ
Viritä Monitor: zsh T/ju-vahti.zsh (30 min; lista lav-tausta + vs-muisti-ketju; ensimmäiset rivit vanhoja). Listamuutos tulee voimaan vasta uudelleenvirityksellä.

## KÄYNNISSÄ
Mac: lav-tausta.zsh (alkoi 13.59): leivo-tausta 9 palaa (yksi Blender, nice 10, noin 30 min), sitten sk-ennen ja sk-jalkeen rungolla 15d7274ad L1:llä, 17 + 17 kuvaa kansioon _tyo/linnanrakentaja/muuri/yleinen/kuvat/. Rivi "lav-tausta AJETTU" → LAV (tarkista "ennen/jalkeen n/17" lokista T/lav-tausta.log). Ei vientiä.

Ei muuta ajossa 14.04: L1 ja L2 vapaat, iPad vapaa, simu iPad13 vapaa.

## JONO
- iPad, seuraava muistiajo: vain VS:n uusi korjaus (kallistettuna ≥ 30° ei varjovalintaa siirtymäalueella), sha tulee VS:ltä. Käännös LINJA=2 ASENNA=0 zsh T/laite-iso.zsh <sha>, ajo ESISARJA=0 zsh T/vs-muisti-z10k60.zsh <kuollut pid> <sha> (kansio julkaisija-muisti-z10k60-<sha>; mallina T/vs-muisti-ketju6.zsh). Ennen sitä ei z10k60-uusintoja. sk-striimi-loput pysyy seis (T/vs-striimi-loput.zsh valmiina, käytä vain PT:n sanalla).
- PT:n hyväksyntäehdot: ajo pääsee z10:een; kallistusrivi sekä z9:ssä että z10:ssä; p-z10 uusi eri tiivisteellä kuin 11b358fdb65d; ei VIKAA eikä muistivaroitusta. Tulos VS + PT. Kirjaa käytetty, kerroin, huippu, varoitukset.
- Mac-vuorot normaalisti, kun pyydetään: NUI:n lippu ja nousukuvien simu (iPad13, L2, NUI:n seuraaja pyytää), KS:n yhdistelmä, PK:n koko kierros (kaksi ajoa, ~1 h) ja ovi/esine-iPad-muistimittaus, LAV:n muut kuvat. Linjan ottaja saa ESIKATSELU NYT + PROTO_LINJA; vapaalle linjalle heti, ei järjestyksen takia odotusta.
- TRIPO palvelijatar v2 viimeisenä, 20–30 min, kun kaikki edellä on valmis: ALKAA-rivi origin/claude/postilaatikko-haaraan (malli posti/julkaisija-tripo3d-arkihahmot-alkaa-20261103.md); ei Unity-, simu- eikä käännösajoja jakson aikana; kuvat edestä ja takaa KK:lle ennen kytkentää.

## MUISTISSA, EI AJOA NYT
- PT: kun striimi-varista ja Karsista tehdään yhdistelmä, ajoon mukaan _tyo/karttaseppa/sk-karsi-koe-2.txt; tulos KS.
- NUI: seuraavaan yhdistelmä- tai kuva-ajoon `ui tarina viimeinen-keisari` (10 s auki) + muistivahti 4080 Mt; rivi PT + NUI. Ei z10-kokeisiin.
- KK 12.4x: vanhan juoksupelin iPad-ajot vain PT:n tai KK:n perustellulla sanalla. Kartan iPad-ajot vain striimi-varin pohjalta tai perusteltuna.
- PT: levyä (kartta-osat) ei tyhjennetä ilman PT:n sanaa. Kylmä levy on yhä auki oleva toinen ehdokas kaatumiseen, vaikka z10k60 c4a kaatui lämpimällä.

## MUISTITULOKSET TÄNÄÄN (kaikki lokit/julkaisija-muisti-*)
- z10 7f64 3702 Mt ja z10k 7f64 3619 / c4a 3609 Mt: ylhäältä, kerroin 4, eivät todista mitään.
- sarja-7f64cd657 (koko sk-striimi p-z10:een): 10/10, 3756 Mt, käytetty 0,0° z10:ssä, kerroin 4. e4180:n kaatumisajo oli VS:n mukaan 45°; mistä kallistus silloin tuli, on auki.
- z10k60-c4a5bfafb: 53,3°, kerroin 4, signal 9 noin 5120 Mt 13.48.5x. Toisti kaatumisen.
- z10k60-7f64cd657: 53,3° z9:ssä, kerroin 2, huippu 4118 Mt, VIKA 13.59.39, ei kaatumista. Komennot pysähtyivät z10:n `aja`-komennon jälkeen riville `odota 15` (konsoli rivi 925), vaikka sovellus eli 14.02:een; VS selvittää. Tummat katkoviivat ovat myös c4a:n p-z10:ssä (z10k), eivät striimi-varista; VS:llä.

## AUKI
- error 22 --console-käynnistyksessä, juurisyy tuntematon. Tänään lisää: 12.43–12.55 12/12 esisarjalla, 13.06, 13.22–13.24 6/6 ilman esisarjaa, 13.51–13.55 herätys + 6/6 kaatuneen ajon jälkeen. Pelkkä uudelleenajo meni läpi 13.07, 13.27, 13.45 ja 13.55. Herätys (rungon konsolikäynnistys 25 s ennen asennusta) on vs-muisti-sarja/-z10k60-skripteissä, mutta sekin kaatui 13.51: se ei ole korjaus. ESISARJA=0 on laite-kaynnista.zsh:n valitsin. Ketjun kaatuminen: katso T/vs-muisti-ketju.log, aja sama uudestaan, älä siirry seuraavaan shaan.
- Ketjulokin rivit "vs-muisti-ketju AJETTU 13.26" ja "13.55" ovat vääriä (ei ajoa). Jonoloki on oikein.

## OPIT
- Kaatuneen ajon kuvat voivat olla vanhoja: `hae` kopioi laitteen Documentsista edellisen ajon tiedoston, ja "1/1 kuvaa" valehtelee. Vertaa tiiviste ja mtime ennen kuin sanot mitään kuvasta.
- Muistilukema ei kelpaa ilman kallistusriviä: `komento kallistus` skenaarioon. Lue PT:n ehto tarkasti ennen kuin sanot sen täyttyneen (12.xx sanoin väärin, ajoin loput-valmistelun turhaan).
- Ketjun seuraaja: tarkista, kenen pid:tä se odottaa, ennen kuin tapat välistä: lav-tilaus8 olisi lähtenyt leivonnan aikana. Korjaus: uudelleenkäynnistys suoraan oikeaan pid:hen.
- Tapa jonon odottaja vasta tarkistettuasi, ettei se ole jo alkanut: viivat ehti alkaa tilaus8:n perään, emon -9 jätti ajon orvoksi (meni silti läpi).
- `rm -rf $LK` kuoressa voi jäädä turvatarkistukseen. Älä kierrä: TERM omalle lukon haltijalle (emo -9 ensin, sitten TERM + pkill -P), skriptin trap vapauttaa lukon.
- Oma virhe 13.25: `sed "${n}i\..."` tyhjällä n:llä kirjoitti rivin joka riville, ja rikkinäinen skripti käynnisti sovelluksen ilman lukkoa. Tarkista muuttuja ennen sediä, tai sed "25r tiedosto". Vertaa pohjaan diffillä ennen ajoa.
- Oma poikkeama 13.44: `pkill -f` devicectl-käynnistykseen. Linjaus on vain omat pid:t; käytä pgrep -P -puuta.
- Skriptien kuvarivit voivat olla `kuva3d`: awk '/^kuva/' eikä '/^kuva /'.

## LISÄYS 14.0x (korvaa JONO-osan iPad-kohdan ja lav-tausta-osan)
- Käynnissä T/vs-muisti-ketju7.zsh: e774647ee (linssiseppa2/striimi-vari, natiivi-backup) käännös L1, sitten sk-muisti-z10-ei-varjoa, kansio lokit/julkaisija-muisti-z10k60-e774647ee. Lopuksi rivi "vs-muisti-ketju LOPPU" lokissa.
- PT:n järjestys: 1) ei-varjoa, 2) sk-muisti-z10-k29, 3) sk-striimi-k45 vasta, jos 1 ja 2 ovat rajan alla. VIKA pysäyttää. Seuraavat ajot käsin samalla koonnilla: ESISARJA=0 SK_TIED=<striimi/-kansion skenaario> KANSIO_LOPPU=-k29 zsh T/vs-muisti-z10k60.zsh 76391 e774647ee (k45:lle -k45).
- Ehdot: kallistusrivi ≥ 30° (k29:ssä 29°), ei `liikevalinta: varjo` -riviä, ajo pääsee z10:een, alle 4080 Mt ilman VIKAA ja muistivaroitusta, p-z10 ja p-z10-90 tästä ajosta uudella tiivisteellä. Tulos jokaisesta erikseen VS + PT: huippu, kulma, kerroin, varoitukset, tiiviste. sk-striimi-loput (Lontoo, Helsinki, Innsbruck) on oma ajonsa ja pysyy seis, kunnes PT antaa sanan k45:n jälkeen.
- lav-tausta kaatui 14.05 palaan kk-tausta-1-2 (kaksi kohdetta glb:ssä), LAV korjaa ja pyytää uudelleen; T/lav-tausta.zsh leipoo kaikki 9 alusta. L2: KS a64109412 ajossa.
