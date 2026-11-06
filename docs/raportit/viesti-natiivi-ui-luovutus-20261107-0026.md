# Natiivi-UI: luovutus 7.11.2026 klo 00.26 (konteksti yli 25 %, pehmeä raja)

Itsenäinen: korvaa kaikki aiemmat. Oma id local_43962c89-fc14-4098-9dd7-6153133ffcea. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_37f7c945-e1a0-4638-90b8-93c389a36fbe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, NS local_99130238-aa54-4a29-bcc9-7a023584944b.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup (ei origin). Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, nyt haarassa natiivi-ui/kuvapallo-nimi. Ei omia ajoja käynnissä.
YÖN SÄÄNTÖ (omistaja 23.07, PT): kaksi yritystä tai noin 30 min per kohta, sitten kokeen osa pois tai edellinen toimiva tilalle, rivi KK:lle (vika, kokeiltu, suositus) ja seuraavaan. Yöllä vain Pariisi, Lontoo, juoksupeli. Kaikki kokeena, ei junaan.

## Odottaa: JU:n viisi ajoa (kuittaus tulee viestinä tähän id:hen)
L1:llä Pariisin ja Lontoon ajojen jälkeen (viimeksi odotti KS 38:aa, alkoi 00.15); ei aikaisteta. Kansiot lokit/. Skenaariot _tyo/natiivi-ui/.
- nui-yksi-k01f, nui-yksi-k05, nui-yksi-k04, nui-nimi-tallenne: 6d12054b0 (natiivi-ui/aloituslento-paketti)
- nui-kuvapallo-nimi: 36fe37f6a (natiivi-ui/kuvapallo-nimi = 6d12054b0 + kyltti)
Tarkista jokaisesta rivi "laattapalvelin: paketti".

## PT:n neljä kohtaa (tulos KK:lle, sha PT:lle; KK:lle kuvat ja aika, viat leikkaamatta)
1) Vino raja terävän ja sumean välillä (kk-sarjan k01f, k05): näkyykö pelaajalle? Vertaa lokit/nui-aloitus-kk-paketti-8ac8d2a70/k01f ja k05 kuviin nui-yksi-k01f/v-k01f ja nui-yksi-k05/v-k05. Ei näy = ei korjausta, syy kuvasarjan hidastus (NS). Näkyy = laattojen latauksen vika: KYSY PT:ltä siirto NS:lle, älä korjaa itse. Rajaus: Mac, ei iPad. Kohdistus: v-k01f = lento +5 s (kk-sarjassa juuri ennen kaarrosta t 5,41, silmä 44 km); v-k05 = zoomaus +4,3 s (korkeus 4 km). Tarkista lokista, että kuva osui samaan kohtaan.
2) k04: PARIISI-nimi hyvin iso, osin ruudun ulkona. Nimikerros (Assets/Matkakirja/Kartta/Nimikerros.cs): maahan painettu suurkaupungin nimi, kasvaa syöksyssä (654 km → 4 km 3,7 s:ssa). Sääntö "vain kokonaan ruudulla" rivillä 689, sen jälkeen häivytys haiveS:n mukaan (rivi 959 Piirra). Katso v-k04 ja nui-nimi-tallenne (50 fps, peliaika; kertoo nimen koosta ja kestosta, ei latauksesta): kauanko nimi näkyy ruudun ylittävänä. Video: tyokalut/tallenne-video.sh. Korjausehdotus, jos näkyy: nimi pois syöksyn ajaksi (vrt. OtsikkoVaistaa rivi 955, d31fc8676) tai nopeampi häivytys. Ei vielä kokeiltu.
3) k12–k13 pehmeä kuva: SYY LÖYTYI. Eräajossa Screen 640×480, Kuvat.HaeSivulla(Max(Screen)) → 640×427 (kk-lokissa "kartan pieni kuva ladattu 640×427"). Vanhat iPad-lokit 2048×1536. Eli Mac-kuvien ominaisuus, ei korjausta peliin. 6d12054b0 lataa editorissa vähintään 2752 px (vain koehaara). Varmista v-k12 ja v-k13 (nui-yksi-k04), vertaa k07 ja k10; lokista "ladattu".
4) Champs-Élysées'n kuvapallo ilman nimikylttiä (KK 00.22; kuva _tyo/karttaseppa/parit-yhteinen-37/kk/grand-palais-45.jpg kohta 1000,633): SYY: pallo on katukuva pariisi-nykyintro-c3.jpg. Raamattu 2.210: neljä katukuvaa ja Invalidit jäävät pieninä kartalle, eikä niillä ole nostoa; SaapumisKuvat piirsi vain pallon. Korjaus 36fe37f6a, 1. yritys, käännös 0 virhettä, AJAMATTA: Pieni.Kyltti esittelypaikan kohteesta (sulkeet pois: Quai Voltaire, Saint-Germain-des-Prés, Champs-Élysées, Cité, Invalidien kirkko), vaalea kyltti pallon vasemmalla, sama mittakaava kuin kylteillä (KyltinMittakaavaNyt), ei napautusta. Pulun kuvat ilman. Arvioi nui-kuvapallo-nimi: n-yleis, n-champs-45, n-cite-45. Tiedossa olevat riskit, katso kuvista: ei väistä muita kylttejä; Invalidien kirkko tuplaa "Hôtel des Invalides"; "Cité" on epäselvä metrokäynnille. Kuvien ja nimien ristiriita → kerro KK:lle, tekstit ovat omistajan linjan alla.

## Valmiit
- Intro laattapaketin kanssa 8ac8d2a70, kuvat lokit/nui-aloitus-kk-paketti-8ac8d2a70, KK ja PT saivat; PT: kelpaa kokeena. Tästä lähtien kaikki intron Mac-kuvat haarasta natiivi-ui/aloituslento-paketti (paketti: kaksi riviä Laattapalvelin.cs:ssä, luetaan lokit/julkaisija-laite-218-2cba21a3e/; jos kansio siivotaan, paketti puuttuu). JU tarkistaa koodista ja rivin ajon jälkeen.
- Galerie: PT 00.1x: f29ff0335 pidetään kokeena, ei toista korjausta; gr-8-p:n 0,24 s jää. Tulos lokit/nui-tahtikyltit-20261106/tulos-nui.md, arkki37.jpg.
- kk-* ajossa 37 ovat VS:n katkoskuvat, eivät minun.
- Muut kokeet ennallaan: intro 51f9fad72, nimirivi c8a71c1cd (natiivi-ui/kartta-nimirivi), molemmat KK:lla; poiminta vain PT:n sanalla. Junaan vietäessä pois: `ui kuvajumi`, mittausrivit, kyltti-ui-lokirivi ae497b124, paketin ja 2752 px:n koehaararivit.

## Avoinna, ei minun ilman PT:n sanaa
Tyhjä pohja ja vino reuna ajossa 356eb0101; jumin 9,16 s; kylmä levyvälimuisti; Invalidit `ui kohdenostot kyltti` ei merkkiä; NS:n Liiku 43a2fa300; tappien lasku vaakapuhelimelle UI-sarjan jälkeen. Havaintoja, ei korjattu: piiloelementin suodin; Livian ohjeteksti sumean kartan päällä; suurennuslasin haalea neliö; Lopeta kierros ja Linssit lähes samassa; Saapumiskortti, Latauspalkki, KaupunkiKortti, Ponnahdus tarkistamatta; k03 palikkainen meri (VS/KS, ei minun).

## Opit
- zsh: muuttuja ei pilkkoudu sanoiksi: `$a`-silmukassa `${=a}`. --include=*.cs lainausmerkkeihin; käytä git grep.
- Kaappaus pysäyttää pelin; kuvasarja ei kerro kestosta eikä latauksesta. Yksi kuva per ajo, tallenne vain logiikkaan.
- is-ancestor epäonnistuu poiminnalla: kerro JU:lle patch-id tai git grep.
- Peli-testit/unity-tarkistus.sh sh:lla, 0 virhettä noin 1 min. Viestit send_messagella id:llä, PT:lle enintään 3 riviä. Jos jono tyhjenee: rivi PT:lle "JONO TYHJÄ: Natiivi-UI". Etäyhteys vain KK:lla ja PT:llä: älä kytke. Hookin työlistarivit eivät ole minun.

## PÄIVITYS 7.11. 01.0x: VOITTAA YLLÄ OLEVAT
Ajot nui-yksi-k01f, -k05, -k04, nimi-tallenne valmiit ja katsottu; KK ja PT saivat k05:n ja k12–k13:n tuloksen. Worktree nyt haarassa natiivi-ui/nimi-syoksy.
Odottaa JU:lta (L1, Pariisin ja Lontoon jälkeen): nui-kuvapallo-nimi (36fe37f6a), nui-nimi-tallenne-2 ja nui-yksi-k01f-2 (molemmat 1596d5e32, sisältää kuvapallon).
- Kohta 1, k05: VALMIS, ei näy: v-k05 tasainen, ei vinoa rajaa. Ei korjausta.
- Kohta 1, k01f: 2. yritys. 1. kuva osui liian aikaisin (kello 06.06, k01f 07.03), siinä ei rajaa, mutta eri kohta. sk-yksi-k01f-2 = lento +6,8 s. Vertaa kelloa 07.03 ja k01f:ää; jos raja näkyy: laattojen lataus → kysy PT:ltä siirto NS:lle. Jos kello ei osu tai raja ei näy: rivi KK:lle, ei kolmatta yritystä.
- Kohta 2, k04: VIKA ON TODELLINEN. v-k04 osui liian myöhään (11 km), mutta tallenteessa PARIISI ylittää ruudun leveyden kuvat noin 94–108 (0,3 s) ja katoaa kuvaan 109 mennessä. Koe 1596d5e32 (1. yritys, käännös 0 virhettä, ajamatta): suurkaupungin nimi häipyy, kun leveys yli 45 % ruudusta (Nimikerros.cs rivi 690). Arvioi nui-nimi-tallenne-2 samoilla kuvilla (python-mittaus: tummat pikselit kuvissa 70–124; arkki 15 kuvan välein): ei saa ylittää ruutua. Huomaa, että sääntö koskee kaikkia suurkaupunkeja myös levossa.
- Kohta 3: VALMIS: v-k12, v-k13 terävät, ladattu 1536×1024 (lähdekuvan koko); pehmeys oli Macin 640 px:n ominaisuus. Ei korjausta peliin.
- Kohta 4: ajamatta, kuten yllä.
- POIKKEUS ArgumentOutOfRangeException odota-tila-rivillä on myös kk-sarjassa; ajot jatkuvat; syy selvittämättä, ei kuulu näihin.

## PÄIVITYS 2, 7.11. 01.0x: VOITTAA YLLÄ OLEVAT
Kohta 4 VALMIS kokeena: nui-kuvapallo-nimi katsottu, tulos KK:lla, sha PT:llä; viat (ei väistöä, tupla, pieni kaukaa, "Cité") kerrottu; odottaa KK:n sanaa, ei toista yritystä ilman sitä.
Jäljellä JU:lta vain nui-nimi-tallenne-2 ja nui-yksi-k01f-2 (1596d5e32, L1 NS:n laitekäännöksen jälkeen).

## PÄIVITYS 3, 7.11. 01.05: VOITTAA YLLÄ OLEVAT
KK:n päätös omistajan valtuutuksella 01.02 (kuvapallo, koe, ei junaan). Tehty 7ffd6ab5f (natiivi-ui/kuvapallo-nimi-2; 1596d5e32 + kartan nimipäätös 98180b82d, 0c544d4ef, c8a71c1cd poimintana + tämä); worktree tässä haarassa; käännös 0 virhettä, AJAMATTA, ajo nui-kuvapallo-nimi-2 JU:lla kahden 1596d5e32-ajon jälkeen.
1) Kyltin teksti: sulkeiden sisältö tai koko nimi: Bukinistit, Café de Flore, Guimardin metrokäynti, Champs-Élysées, Invalidien kirkko.
2) Väistö: kyltti vasemmalle, oikealle tai piiloon nähtävyyden kyltin ja pallon mukaan (NostotKartalla.NahtavyysAlla); oma pallo piiloon, jos se osuu nähtävyyteen; palaa vasta 0,3 s vapaana. Pienempi koko kaukaa saa jäädä (KK). 3 riviä: `ui saapumiskuva kyltit` lokiin.
3) Napautus: nähtävyyden kyltti avaa jutun; näillä viidellä ei ole juttua, joten kyltti avaa kuvan kuten pallo. Pieni muutos. KERRO TÄMÄ KK:LLE. Testattu vain lähetetyllä napautuksella `ui saapumiskuva kyltti <teksti>`, ei oikealla kosketuksella.
Arvio: kuvat n2-yleis, n2-champs-45, n2-cite-45, n2-napautus → KK:lle (kuvat ja aika, viat leikkaamatta), sha PT:lle. Sama kaksi yrityksen sääntö.

## PÄIVITYS 4, 7.11. 01.1x: VOITTAA YLLÄ OLEVAT
Kaikki JU:n ajot valmiit ja katsottu, tulokset KK:lla ja PT:llä. Ei ajoja jonossa.
- Kohdat k05, k12–k13: valmiit. k01f: valmis, 2 yritystä, raja ei näy kuvassa kello 07.17, ei korjausta.
- Kuvapallo 7ffd6ab5f: valmis kokeena, odottaa KK:n sanaa. Jää: Café de Flore'n pallo kartan nimen päällä.
- AVOIN KYSYMYS PT:lle: tumma suorakaide merellä (nui-yksi-k01f-2/v-k01f.png), kenelle. Odota vastausta, älä korjaa itse.
## SEURAAVA TYÖ: k04, iso PARIISI, 2. ja viimeinen yritys
1. yritys 1596d5e32 EI AUTTANUT: tummien pikselien käyrä lähes sama (nui-nimi-tallenne vs -2, kuvat 70–124; mittaus scratchpadin nimi2.py: tummat < 125 ja x-laajuus, rivit 90...h-140). Nimi ei siis ole r.suurkaupunki-rivi Nimikerroksessa, eikä sääntö "kokonaan ruudulla" koske sitä. Poista 1596d5e32:n rivi (Nimikerros.cs) 2. yrityksessä.
Selvitä ensin kerros: se piirtää versaalin PARIISI puoliläpinäkyvänä, koko kasvaa kameran laskiessa ja katoaa noin kuvaan 109 (tallenne, 50 fps). Ehdokkaat: Nimikerroksen muu luokka (rivin syy: Nimikerros.cs rivi 872 tuloste, komento `nimet`), KaupunkiMerkit, Merkittavat.cs:61, PiirrosKerros tai UiNakymat.cs:476 OtsikkoVaistaa (otsikko saapuessa, d31fc8676). Jos se on tarkoituksellinen otsikko, älä poista: rajoita niin, ettei ylitä ruutua, tai kysy KK:lta. Käytä `git log -S` ja haku "versaali/Otsikko". Korjaus haaraan 7ffd6ab5f:n päälle, JU:n vuorolla sk-nimi-tallenne.txt, kansio lokit/nui-nimi-tallenne-3; rivi "laattapalvelin: paketti". Jumi: rivi KK:lle ja JONO TYHJÄ PT:lle.

## PÄIVITYS 5, 7.11. 01.2x (PT): VOITTAA YLLÄ OLEVAT
Meren tumma suorakaide EI ole työsi: PT vie kuvan KK:n aamun koontiin, meri seis yöllä. Avoin kysymys PT:lle on suljettu.
k04:n 2. yritys on VIIMEINEN (yön sääntö). Jos se ei auta: rivi KK:lle (vika, kokeiltu, suositus), ei kolmatta yritystä.

## PÄIVITYS 6, 7.11. 01.2x (KK:n päätös omistajan valtuutuksella 01.13): VOITTAA YLLÄ OLEVAT
Kuvapallot 7ffd6ab5f kelpaavat kokeena: ei enempää työtä näihin viiteen yöllä. Kartan pienet nimet pallon alla KK kertoo omistajalle aamulla. k01f: ei korjausta, ei kolmatta yritystä. Meri ei kuulu sinulle.
AINOA JÄLJELLÄ OLEVA TYÖ: k04:n 2. yritys, yön viimeinen. Jos ei ratkea: kuva ja syy KK:lle aamun kysymykseksi. Sen jälkeen rivi PT:lle "JONO TYHJÄ: Natiivi-UI".
