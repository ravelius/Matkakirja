# Lavastajan luovutus 6.11.2026 23.55 — LUE KOKONAAN, riittää yksin (korvaa -2248)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu; ote ja skriptit docs/raportit/lavastaja-levyt7k (sha 2849fe572). EI LEIVONTAA, KARTTAA, VIENTIÄ eikä muita paloja ilman PT:n sanaa. Työ kuuluu juoksupeliin (omistajan yörajaus 23.22; PT kirjasi).

## Yön sääntö (omistaja 23.07)
Vika, joka ei ratkea kahdella yrityksellä tai noin 30 minuutissa: kokeen osa pois tai edellinen toimiva tilalle, rivi KK:lle (vika, mitä kokeiltu, suositus) ja seuraavaan työhön.

## Juova: yritys 2 tehty (7z), rivi PT:lle lähetetty: kiven oma väri + 5 asteen kulma, ei korjausta. Ei enempää yrityksiä yöllä.

## TEE ENSIN: PT:n uusi työ 7.11. (sanatarkasti)
PT: "7m katsottu arkilta: kivet ja saumat näyttävät oikeilta, kuitattu kokeena; sauma täysikoossa jää sinun katsomaksesi. Seuraava työ, juoksupeliä, yhdellä ajolla: mittaa kolmen sivuhuomion alkuperä, koska ne näkyvät pelikameralla: pilarin tumma ristiviiva (näkyvin), muurin vierellä valkoinen raita ja vaalea pienkiviraita. Lisää samaan ajoon kolon yläviistokuva ja törmäys. Kaksi yritystä per huomio. Jos korjaus on koejuureen vain lod0:lla, tee se; muuten suositus KK:n aamuun. Kuvaa korjauksesta ennen|jälkeen samalta kameralta. Ei leivontaa. Älä sano koko muuria korjatuksi ennen 1-1:n kuvaa."
Sauma täysikoossa on katsottu (A/kuvat-levyt7m/rajaus-peli-0-2-tays.png): ohut, heikompi kuin lattian sauma.
Lähtökohdat (A/kuvat-levyt7m, juuri koejuuri-levyt7k; kameran pr() mittaa28.py:ssä):
- Ristiviiva: peli-B, kamera -83,8 4 419,7 -30 15 80, B:n pilarin yläosassa, arkki.png:n kohdalla noin (540; 1510). B-takakulma-kuvassa (kuvat-levyt7s) samanlaisia ohuita tummia viivoja seinässä; todennäköisesti saumat, mittaamatta.
- Valkoinen raita: peli-A, kamera 262 4 -75 -141 15 80, muurin vierellä.
- Pienkiviraita: peli-0-2-kauempaa, kamera -367 3 -22 30 15 80.
- Kolo: z -261,5..-256,5, x noin -228,5, leveys 12-17 cm, pohja y 0, reunat y 0,24 ja 0,55. Kamera esim. -228,9 2 -262 3 30 80 (käytävä, tarkista). Törmäys: käytä pelin peittokarttaa (JuoksuSokkeloMaailma.Osasarja.cs), pelikoodia ei muuteta.
Ajo: tee A/aja-levyt7n.zsh aja-levyt7m.zsh:n mallilla (10-kohdan juuri koejuuri-levyt7k), sha 35140432d, vuoro JU:lta (local_06f8c680-...).
Varo: lue mitattaessa kaikki palat (lue(KT+...+TV, bb)), yksi pala antoi väärän reiän. Kamerat tarkistetaan ennen kuin sanotaan "ei näy".

## Päivitys 7.11. (7m tehty, rivi PT:lle lähetetty)
Saumat ovat ohuita pelin korkeudelta, kuten koskemattomissa kivissä; 1-4 korjattu suoralta kameralta. Kohta 1-1: ei reikää, kolo 5 m, 12-17 cm, pohja lattia (mittaa31), kuvaamatta; näkyvyys ja pääsy auki, PT:n sana odottaa. Koejuurta 7k ei ole viety. Sivuhuomiot KORJAUS.md:n lopussa. Laikku, leivonta ja koeleivonnan UV-saaret KK:n aamuun.

## Tila
- koejuuri-levyt7u (2 jalustaa, 12 kolmiota): korjaus näkyy täysikoossa, PT kuittasi.
- koejuuri-levyt7k: sama sääntö kaikille paloille: kivireunus-sivu, jolla u ei etene (du/L <= 0,9, L >= 0,5 m) -> u = metrit pituussuuntaan. 6 596 kolmiota, 4 711 m2 (aiempi 3 514 m2 oli tiukempi raja du/L < 0,1). Vain lod0, PT:n kuittaama. Pari 7p|7k: korjaus näkyy, kohdissa 1-1 ja 1-4 kamera ei osunut kiveen. PT:n kuittaus parista puuttuu; ei vientiä ilman sanaa.
- Juova 3-1: pinta, materiaali ja UV kunnossa; suorissa kuvissa kivikuva ja saumat, joten tekstuurin puute kumoutui tältä sivulta. AUKI PT:n mukaan: kulma-mip on hypoteesi. Yritys 1 tehty (mittaa28: kirkkaus sama 5-41 astetta, vaihtelu 5 asteessa noin 1/3 pienempi). Yritys 2 on ajo 7z, sitten rivi PT:lle.
- Itäpääty: x 258,6 on seinän sisällä (mittaa27), ei kuvattavissa; PT tietää.
- B:n laikku: jalustan päällä, kaareva reuna, ei saumoja, ei muutu materiaalin vaihdolla eikä heijastuksella. Rivi KK:lle lähetetty, aamun kysymys. Ei enempää ilman sanaa.
- Kiila ja raita: 7v todisti valokartan tai valo-UV:n syyksi. Suositus (3-1:n saaret + 2,86 m2:n kolmio + koeleivonta) jää KK:n aamuun, PT: ei koeleivontaa yöllä.
- Pienet pisteviivat: eivät valokartasta, syy mittaamatta.
- PK:n kävely uudella kartalla tekemättä ennen vientiä.

Muuta: pelikoodi-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu, ajoissa sha 35140432d. numpy/scipy: /opt/homebrew/bin/python3 ilman -I:tä. Kameran projektio toimii: mittaa28.py:n pr().
