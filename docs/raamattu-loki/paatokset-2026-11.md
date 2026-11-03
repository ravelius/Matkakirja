Päätösloki 2026-11. Uusi kohta lisätään loppuun komennolla `node tools/raamattu-kirjaa.mjs "<OTSIKKO>" "<teksti>"`; haku: `node tools/loki-hae.mjs <hakusana>`.

## PARIISI G-KUVAN YLEISTYKSEEN (omistaja 1.11.2026 klo 08.07) (1.11.2026 klo 08.12)

Omistaja (KK:n välitys, G | peli-cite -kuva): 'Miten saadaan peliin tuo vasen versio? Oikea ei ole hyvä.' Kortti 'Yksinkertaistetaanko Pariisin tavalliset korttelit G-kuvan tapaan?' → 'Ainakin pääkohteet pitää saada vasemman mukaan tehtyä. Oikea ei näytä hyvälle. Mutta sopii myös että kaikki muuttuu koska voi olla että se ei muuten toimi. Eli voidaan tehdä suosituksesi mukaan.' Linja: peruskarttaan G:n yleistys (talot isommiksi ja harvemmiksi korttelimassoiksi, kadut leveiksi ja valkoisiksi, pienet kujat pois, puut isoiksi riveiksi); pääkadut ja Seine paikoillaan; Codex maalaa ohjekuvan päälle. ENSIN koepala G:n alueelta (Tuileries–Louvre–Cité) → KK → omistajalle G:n rinnalle ennen koko kaupunkia. Yöllä hyväksytty kooste-97-kk kumottu; 0,5 m/px -keskusta (rungossa ead9e4835) odottaa koepalan hyväksyntää. Juna 216:n Pariisi-ehto avautuu uudelleen.

## PARIISI: PÄÄKOHTEET G:N KOKOON ENSIN (omistaja 1.11.2026 klo 08.1x) (1.11.2026 klo 08.13)

Omistaja (KK:n välitys): 'Pääkohteet siis suurin ongelma' (jatkoa 08.07). KK mittasi: pelissä Notre-Dame ~1,8× ja Louvre ~1,4× pienempi kuin G:ssä; Tuileries ja Cité G:ssä isoja (vrt. aiempi 'Pidä se yhtä isona'). Järjestys: karikatyyrit G:n kokoon (KS mittaa G:stä) + Tuileries ja Cité G:n mukaan → pari G:n rinnalle KK:lle → omistajalle; korttelien G-yleistyksen koepala rinnalla. Juna 216: Pariisi ei valmis; ead9e4835 rungossa välivaiheena, ei lukitusta eikä TF:ää ennen omistajan hyväksyntää uudesta Pariisista.

## PARIISI: CODEX PIIRTÄÄ KAIKEN G:N MUKAAN, PORRASTETUSTI (omistaja 1.11.2026 klo 08.5x) (1.11.2026 klo 09.18)

Omistaja (KK:n välitys, kortti 'Onko tämä oikea suunta koko Pariisiin?'): 'Voisiko tehdä vasemman mukaan kaikki. Ei haittaa jos ei ole täysin oikea. Oikea versio ei toimi ollenkaan. Eli codex
piirtäisi suoraan kaiken. Yritetään vain saada saumat kohdistumaan jotenkin. Tai sitten jos piirtää isomman alueen kerralla ja sitten rajaa siitä alueita jotka codex piirtää vain tarkemmin uudestaan.'
Linja (KK:n suositus jälkimmäisestä): Codex piirtää vapaasti G-tyyliin porrastetusti; ensin isot alueet (keskustassa G itse pohjana), sitten jokainen pala uudelleen tarkemmin yläkuvan rajauksesta;
saumat limityksellä ja ristihäivytyksellä; pelin merkit ja nimet ankkuroidaan piirroksen kohteisiin (KS:n kiintopisteet), ei todellisiin koordinaatteihin. ENSIN koepala: G:n alue 2×2 tarkempana palana
→ sauma ja ulkoasu KK:lle → omistajalle G:n rinnalle. Lukitun pohjan reitti (kooste-97, yleistetty ohjekuva ja 0,5 m/px) jää pois; ead9e4835-palat saavat olla junan rungossa välivaiheena, juna ei
lähde ennen omistajan hyväksyntää.

## LEVYTILA: TURHAT POISTOON, SÄILYTETTÄVÄ NAS:LLE (omistaja 1.11.2026 klo 09.4x) (1.11.2026 klo 09.58)

Omistaja (KK:n välitys, sanatarkasti): 1) 'Voisiko ne simulaattorit siirtää t7:lle jotta tila ei aina loppuisi kesken' 2) 'T7 pitää siivota ja siirtää tarvittaessa nassille' 3) 'Välitin käskyn myös codexille. Roskakori pitää myös tyhjentää jos siellä paljon dataa' 4) 'Turhat kannattaa suoraan poistaa eikä edes siirtää nassille'. Tavoite: sisäisellä ja T7:llä aina reilusti tilaa (käynnistyslevy ≥ 100 Gi, 12.19). Turha (itsestään palautuvat välimuistit, vanhat käännökset ja appikopiot, hylätyt välivaiheet) poistetaan; NAS:lle säilytettävä harvoin käytetty; epävarma NAS:lle. Muuttaa 12.19:n 'siirrot ennen poistoja' turhan osalta. Simut jo T7:llä (12.16). Codex siivoaa omat kansionsa; kansion käsittelee vain omistajansa. Toteutus: PT ajoi siirra_t7 (26 Gt) ja kartoittaa; Clauden agentit eivät tee pysyviä poistoja itse, vaan PT kokoaa poistolistan ja yksirivisen komennon omistajalle (TOIMI TARVITAAN).

## SIMULAATTORIEN YÖSIIVOUS (omistaja 1.11.2026 klo 10.1x) (1.11.2026 klo 10.12)

Omistaja (KK:n välitys): 'Simulaattoreille pitää tehdä jokin automaattinen siivous jatkoa varten. Mitä olet mieltä?' → kortti 'Tehdäänkö simulaattoreille yösiivous näin?' → 'Kyllä (Suositus)'. Linja: joka yö tyhjennetään sammutettujen simulaattorien data/Library/Application Support/PRBPosterExtensionDataStore (iOS:n lukitusnäytön poster-välimuisti; T7-sarjassa 266/423 Gt); peli ja sen data jäävät. Skripti (vain sammutetut laitteet, vain tämä kansio, loki) → kokeilu yhdellä simulla (käynnistyy, peli toimii) → launchd-yöajo, jonka omistaja asentaa yhdellä rivillä. Toteuttaja: Julkaisija. Vanha sarja T7/Simulaattorit/Devices (~94 Gt) poistolistaan, jos ei käytössä.

## PARIISI: PÄÄKOHTEET YHTÄ LIIOITELTUJA KUIN G:SSÄ (omistaja 1.11.2026 klo 10.2x) (1.11.2026 klo 10.32)

Kortti KK:ssa: "Onko tämä oikea suunta koko Pariisille?" (laaja v2 1536×1024). Omistaja sanatarkasti: "pääkohteet pitää olla yhtä liioiteltu kuin g versiossa". KK:n tavoitekuvaus: koko Pariisin näkymässä pääkohteet erottuvat heti kuten G:ssä, ympäristöönsä nähden yhtä liioiteltuina; koskee myös G:stä puuttuvia (Eiffel, Riemukaari, Sacré-Cœur, Invalidit, Panthéon, Opéra). Mitta G:stä metreinä kartan mittakaavassa; sama liioittelu laajassa, välitasossa ja lähitasossa (ei kasva/kutistu zoomatessa). Laaja v3 tämän mukaan, keskustan valkoinen kehys pois; välitason erä 1 saa lisäehdon; muut välitason palat vasta kun omistaja on nähnyt v3:n (PT).

## SIMULAATTORIT: NELJÄ YHTEISTÄ, MUUT POISTOLISTALLA (omistaja 1.11.2026 klo 10.4x) (1.11.2026 klo 10.42)

KK:n läpikäynti (omistajan pyyntö 10.16). Kortti: "Siirrytäänkö neljään yhteiseen simulaattoriin?" → "Kyllä (Suositus)" (selite: "Muut 28 poistetaan poistolistalla"). Omistajalle kerrottu: 2 iPadia ja 2 iPhonea eri kokoisina, kaikki roolit vuorollaan; yhteisiksi eniten käytetyt (00CF62C2 iPad 13, F7513985 iPad 11, A885020B iPhone 18, DA0AAEEA iPhone), jotta työkalut toimivat ennallaan; yösiivouksen kanssa noin 25 Gt (nyt 423 Gt); poistot PT:n poistolistaan, jonka omistaja ajaa itse. PT: Karttasepän sisäisen sarjan MCP-simu D9822C57 ei jää viidenneksi. Muutti Raamatun 12.17 (roolikohtainen omistus → neljä yhteistä + vuorolukko) ja 12.19 (simuja ei poisteta → yösiivous + poistolista). Toteutus Julkaisijalle.

## PARIISI: LAAJA V4 HYVÄKSYTTY (omistaja 1.11.2026 klo 12.10) (1.11.2026 klo 13.00)

KK:n välittämä: omistaja vastasi "Ok" kolmeen kuvaan (koko Pariisi v4, G-pari, Louvren zoompari laaja→välitaso). Laaja v4 (Codex b5b817add): Louvre G:n pitkä palatsi ~950 m, Eiffel ja Panthéon ±5 %, Riemukaari +33 %, vesi lähitason sävyssä, kehys pois. KS tilaa välitason loput 10 palaa samoin ehdoin. PT 12.2x: lähin zoom ei muutu; porrastetut tasot peliin vasta koko kaupungin lähitason kanssa.

## VISUAALISUUS ENSIN, MUUT SEN JÄLKEEN (omistaja 1.11.2026 klo 13.46) (1.11.2026 klo 13.47)

KK:n välittämä, sanatarkasti: "hyvä. tärkeintä on ensin saada visuaalisuus kuntoon, tehdään muut vasta sitten" (v4-valon koontikuvien ja erojen jälkeen: varjot, ilmakuva, kivetyksen sävy, läikät). PT:n tulkinta: juoksupelin valon viat (VS, LAV, PK, NS tukena) ja Pariisin piirroskartta (KS, Codex) menevät kaiken muun edelle; 60 fps (NS) ja muut ei-visuaaliset erät vasta, kun rooli ei ole tarpeen visuaalisuuden töissä.

## STRIIMIKARTTA: PARIISIN KESKUSTA TAVALLISELLA TARKKUUDELLA (omistaja 1.11.2026 klo 13.54) (1.11.2026 klo 13.54)

Kortti KK:ssa 'Piirretäänkö Pariisin keskusta kaksi kertaa tarkempana?' (nähtyään ND-kolmikon kolmikko-lahin.jpg: G | ~1 m/px | 0,5 m/px Codex), sanatarkasti: 'Ei, tavallinen tarkkuus'. Taustalla 14.0x: 'stiimi karttojen tarkkuuden olet kyllä itse minulle ilmoittanut ja se on sama koko maailmassa, eli kuinka lähelle pelaaja voi zoomata' ja 'minusta tuntuu että pariisia tehdään nyt tarpeettoman tarkaksi'. Linja: 54 palan 0,5 m/px -keskustaa ei tilata; koko Pariisin lähitaso noin 1 m/px; sama tarkkuus myöhemmin muille kaupungeille. ND 0,5 m/px -koepala (Codex c21035113) jää vertailuksi, ei käyttöön. Tekijä Karttaseppä.

## VALON KUVAT SUORAAN OMISTAJALLE (omistaja 1.11.2026 klo 15.02) (1.11.2026 klo 15.03)

Omistaja kysyi: 'Näkeekö valoa nopeammin kuin sinun kautta kehitys työssä?'. Kortti KK:ssa 'Lähettääkö Valoseppä valon kuvat suoraan sinulle heti ajon valmistuttua?', sanatarkasti: 'Kyllä, suoraan (Suositus)'. Linja: Valoseppä lähettää jokaisen valmistuneen kuva-ajon koonnin tai kuvat heti omassa sessiossaan SendUserFilella (proactive, render), keskeneräisetkin, lyhyellä suomenkielisellä kuvatekstillä; polku ja rivi PT:lle, PT tarkistaa jälkikäteen. Poikkeus kuvaparisääntöön (7.24) koskee vain valon kuvia. Samalla 14.4x (KK:n lupaus omistajalle, PT:n kuittaus): VS:n ja LAV:n pitkät Unity-/Blender-ajot Monitorilla, joka ilmoittaa myös kuoleman.

## JUOKSU: LEIVOTTU VALO PELIN OLETUKSEKSI JUNAAN 216 (PT 1.11.2026 klo 15.5x) (1.11.2026 klo 15.58)

Syy: rungon 65ceff743 koonti ajettiin pelin oletusvalossa (JuoksuVertailuValo = true, omistajan 27.10. 'valo pois ensin'), jolloin leivottu valo ja varjot puuttuivat ja PK:n leivottuun valoon viritetty kivikerroin 1,06 ylivalotti lattiat (VS). PT:n päätös omistajan 31.10. linjojen pohjalta (valo yhteen kohtaukseen valmiiksi kaikilla efekteillä; suorituskyky myöhemmin; TF vasta omistajan valohyväksynnän jälkeen): leivottu valo + elävät varjot pelin oletukseksi, vertailuvalo jää QA-kytkimeksi havaintepareille (kivi siinä 0,58). Tekijä PK (haara) → NS runkoon. Samalla PT perui VS:lle annetun 2 ms -hintarajan (omistaja 31.10. 18.31).

## KAUPUNKIEN LÄHITASO VAIN KESKUSTAAN JA NÄHTÄVYYKSIEN YMPÄRILLE (omistaja 1.11.2026 klo 18.22) (1.11.2026 klo 18.23)

Omistaja (KK:n välittämä): 'Kyllä.' kysymykseen 'piirretäänkö lähin taso jatkossa vain keskustaan ja nähtävyyksien ympärille?' (oli nähnyt luvut: Pariisi noin 20 palaa, joista 19 valmiina, tyypillinen kaupunki 10–15, vertailu 151). Taustalla omistajan 18.1x: 'Onko noin monta kuvaa tarpeellista? Tuo on liian suuri työmäärä monistettavaksi muihin kaupunkeihin.' Koskee kaikkia kaupunkeja: muualla lähin zoom näyttää välitason. Pariisi: valmiit 64 palaa käytetään, rengas 4 (32 palaa) peruttu, puuttuva r03c10 (Sacré-Cœurin yläosa) tilataan Codexilta. Karttaseppä toteuttaa siirtymän lähi→väli.

## JUNA 216 TESTFLIGHTIIN HETI KUN PARIISI VALMIS, ILMAN TESTEJÄ (omistaja 1.11.2026 klo 18.2x ja 18.30) (1.11.2026 klo 18.30)

Omistaja (KK:n välittämä, sanatarkasti) 18.2x: 'Näytä Pariisi heti kun valmis ja julkaise ilman testejä niin katson pelissä. Raja ja siirtymä vain pitää saada luontevaksi'. 18.30 kysymykseen 'julkaistaanko, vaikka juoksupelin valo on vielä kesken?': 'Joo, julkaistaan, kun Pariisi on valmis, niin testaan sen pelissä.' 30.10. ehto 'julkaisu vasta valon hyväksynnän jälkeen' ohitetaan tämän julkaisun osalta. Julkaisija kääntää TF:n ilman testejä heti, kun Natiivisepän runko sisältää Karttasepän Pariisin lähitason (64 palaa + r03c10, lähin zoom maskin mukaan, häivytys 40 px).

## PIIRROSKARTTA VAIN SUORANA JA POHJOISEEN (omistaja 1.11.2026 klo 20.31) (1.11.2026 klo 20.32)

Omistaja sanatarkasti: "Piirros saa näkyä vain kun kartta suorassa ja pohjoiseen. Muuten näkyy striimi kartta ja suorista nappi". Tarkentaa 31.10. 17.43 päätöstä (häivytys ja Suorista-nappi): piirroskartta näkyy vain kallistuksella 0° ja pohjoinen ylhäällä; muuten striimikartta ja Suorista-nappi. Piirroskaupunkien (Pariisi) oletuskamera suora ja pohjoiseen. Taustalla omistajan 20.28 havainto: rakennukset vääntyivät kallistetulla kameralla G-kuvaan verrattuna. Junaan 216 ennen TF:ää, kuvat omistajalle ennen julkaisua. Toteuttaa NUI.

## PIIRROSKARTTOJEN PIIRTO-OHJE: TARKIN TASO PIIRRETÄÄN, MUUT PIENENNETÄÄN (omistaja 1.11.2026 klo 21.18) (1.11.2026 klo 21.18)

Omistaja hyväksyi KK:n ehdotuksen sanatarkasti: "Juuri näin seuraaville kaupungeille piirto ohjeeksi". Ohje: Codex piirtää keskustaan ja nähtävyyksille vain tarkimman tason; kauemmat tasot tehdään siitä pienentämällä. Muuhun kaupunkiin Codex piirtää vain välitason; laaja taso tehdään siitä pienentämällä. Pienennyksessä pehmennys, jotta ohuet yksityiskohdat eivät muutu kohinaksi. Peruste (omistaja): "Codex saattaa piirtää eri lailla eri zoom tasoilla" – sisältö ei saa muuttua zoomatessa (esim. Notre-Dame erinäköinen välitasolla 1.11.). PT: sovelletaan myös Pariisiin samassa värikorjauksessa (21.1x): keskustan välitaso johdetaan lähitasosta. Toteuttaa Karttaseppä.

## JUOKSUN VALO HYVÄKSYTTY (omistaja 1.11.2026 klo 22.4x) (1.11.2026 klo 22.41)

Omistaja (KK:n välittämä, sanatarkasti): "Valo näyttää hyvälle", nähtyään VS:n varjosavy-koonti.jpg:n ja havainne-editori-20261101-221422/koonti.png:n (lattiavarjot havainteen sinivioletiksi, kivetys, vallihauta, ilmakuvan puut ja kivi). PT:n tulkinta: juoksun valo hyväksytty nykyisellään (juna 217, runko 398990c67); 30.10. 22.27 ehto 'julkaisu vasta kun valo valmis' täyttyy. Varjojen sävy = havainteen mitattu sinivioletti (korvaa PT:n 25.10. lämpimät varjot). TF 217 vasta omistajan pyynnöstä. VS jatkaa vain havainne-eroja, ei valon yleislinjan muutoksia.

## YÖLUPA 1.11. 23.29: KK HYVÄKSYY OMISTAJAN PUOLESTA, TF 217 YÖLLÄ (1.11.2026 klo 23.29)

Omistaja 1.11. klo 23.29 (KK:n kautta), sanatarkasti: "Menen nukkumaan. Saat hyväksyä puolestani kaikki". KK hyväksyy yön aikana kuvat ja erät omistajan linjausten mukaan (visuaalisuus ensin, G-tyyli, valo hyväksytty). Ostot, lupa-asetukset, tilit, pysyvien lupien yli menevät generoinnit ja peruuttamattomat poistot jäävät aamuun. TF 217 lähtee yöllä ilman lisätestejä, kun PK:n bugikorjaukset (eunukit harvemmiksi ja tehtävä, 3-2-1, lähtö sisältä ovesta, sivunykäykset) ovat rungossa ja PT on katsonut uuden videon.

## KADONNEET IHMEET KARIKATYYRIKARTALLA (omistaja 2.11.2026 klo 08.28–08.31) (2.11.2026 klo 08.32)

Omistajan päätös 08.31 (kortti, sanatarkasti): "lisätään kaikki leikattu kuvina mutta ne täytyy piirtää uudestaan Codexlla käyttäen tätä karikatyyri tyyliä jotta istuvat karttaan oikein lisäksi nimikyltti pitää lisätä tähti jotta pelaaja tajuaa että kyse on kadonneesta rakennuksesta". Pyyntö 08.31: "kadonneet aarteet pitää lisätä myös omaksi kytkimeksi suurennuslasin alle kartta-osioon." Linjaus: karikatyyrikartan kadonneet ihmeet (Pariisi: Temple-torni, Grand Châtelet; myöhemmin muut piirroskaupungit) ovat Codexin karikatyyrityylillä piirtämiä leikattuja kuvia piirroksen päällä (karttaa ei piirretä uudelleen); kadonneen ihmeen nimikyltissä on tähti; suurennuslasin Kartta-välilehdellä oma kytkin kadonneille ihmeille (oletus päällä). PT 2.11.

## PIIRROSKAUPUNGIT KORVAAVAT NÄHTÄVYYSKARTAN (omistaja 2.11.2026 klo 08.40) (2.11.2026 klo 08.42)

Omistajan linjaus 08.40 (sanatarkasti, ote): "Nykyinen nähtävyyskartta poistuisi silloin kokonaan, koska uusi piirretty karikatyyri kaupunkinäkymä korvaa sen. Kaupungit, joissa ei vielä ole tätä uutta karttaa, pysyvät ennallaan ja kaupungit, joihin kartta saadaan rakennettua, muuttuvat sitä mukaan tähän uuteen muotoon, hiotaan ensin Pariisi valmiiksi ja aletaan sitten monistamaan kaikkiin Euroopan kaupunkeihin." Samassa viestissä pyynnöt Pariisiin: kaikki Pariisin nostokohteet suoraan piirrokselle; aarteen vihreä piste piirrokselle; saapuessa automaattinen zoomaus piirrokseen isoisän lukiessa (kokeilu Pariisissa, myöhemmin oletus); Pariisin valokuva pois, tilalle turistiinfo ja lehtikioski omina rakennuksinaan (sama ulkoasu kaikissa kaupungeissa; klikkaus avaa kaupunkilehden / turistiinfo-liitteen). Sijoittelu ja toteutustavat KK:n kortilla omistajalle. PT 2.11.

## KADONNUT IHME NYKYRAKENNUKSEN PAIKALLA: VAIN ★-KYLTTI (omistaja 2.11.2026 klo 08.42) (2.11.2026 klo 08.42)

Omistajan päätös 08.42 (sanatarkasti): "sellaiset kohteet, joiden päällä on nykyään toinen rakennus, niin ei rakenneta niihin omaa kadonnutta karikatyyrikuvaa, vaan lisätään vain toinen teksti nykyisen rakennuksen tekstin alapuolelle ja siihen tähtimerkintä, jolloin sitä klikkaamalla avautuu nostoruutu, jossa kadonnut rakennus näkyy havainnekuvana ja omana infotekstinään." Tarkentaa 08.31-päätöstä: leikattu karikatyyrikuva vain kadonneille ihmeille, joiden paikka on vapaa. Pariisi: kyltti Orsay, Palais de l'Industrie, Trocadéro, Les Halles; kuva Temple-torni, Grand Châtelet, Tuileries, Galerie des Machines, Bastilji (KS vahvistaa). PT 2.11.

## ISOT MUUTOSPYYNNÖT: KK SUUNNITTELEE ENSIN (omistaja 2.11.2026 klo 08.47) (2.11.2026 klo 08.48)

Omistaja 08.47 (sanatarkasti): "aina kun tulee tällainen isompi muutospyyntö minulta, niin sinun tehtävä on miettiä sen toteutus mahdollisimman hyvin, koska sinulla on suurempi päättelykapasiteetti käytössä kuin päätoimittajalla. Kirjoita tämä myös Raamattuun. Näin varmistetaan, että uusi isompi tilaus lähtee järkevästi liikkeelle ja se toteutetaan parhaalla mahdollisella tavalla. Vasta sen jälkeen voit luovuttaa asian toimituksen päätoimittajalle." Kortti "Kirjataanko tämä työtapa Raamattuun näin?" → "Kyllä, näin (Suositus)". Kirjattu Raamattuun 7.48. PT 2.11.

## 2.11. 09.4x PARIISIN KADONNEET IHMEET: PYÖRIVÄT TÄHDET LEIKKEIDEN TILALLE (2.11.2026 klo 09.49)

Omistaja (kortit KK:ssa 09.4x, sanatarkasti): 1) "Ei näytä hyvälle. Jätetään rakennukset pois kartalta ja pyydä codexilta tähdestä hitaasti pyörivä 3d video josta tausta leikattu pois nykyisen kartan
tyylillä. Korvataan sillä kaikki rakennukset. Tähteen voisi tehdä pelissä pienen valo hehkun ympäristöön mutta vain pienelle alueelle jotta tähti näyttäisi ihmeelle. Tähdet pitää laittaa pyörimään
kartalle eri kohdista jotta ne eivät pyöri samalla lailla." 2) Kadonneet oletuksena näkyvissä, kytkimestä piiloon. 3) Kaikki 9 saavat tähden; nykyisen rakennuksen paikalla tähti rakennuksen viereen,
tähtikyltti pysyy. Toteutus (KK): 5 leikettä pois; Codex (KS tilaa) piirtää yhden tähden piirroskartan tyylillä, hidas pyörähdys läpinäkyvänä PNG-kuvasarjana (alfa, saumaton silmukka); peli toistaa
silmukkana, kukin 9 tähdestä eri vaiheesta, pieni valohehku vain tähden ympärille; ei läpinäkyvää videotiedostoa (iPad, 9 yhtä aikaa). Video omistajalle ennen peliin vientiä. Suunnitelman
20261102-pariisi-piirroskaupunki kohta C päivitetty.

## 2.11. 10.17 PYÖRIVÄ TÄHTI PIIRROSTYYLISEMMÄKSI (2.11.2026 klo 10.18)

Omistaja (kortti KK:ssa 10.17, video ja asentoarkki nähtyään): "Kelpaako tähti näin?" → "Piirrostyylisemmäksi (Suositus)". Codexin 3D-renderöity kultatähti (acb2831ee) korvataan käsinpiirretyllä: musteääriviiva, akvarellikulta, sama hidas kierros (72 ruutua, 6 s), pieni mutta selvästi näkyvä hehku. Video omistajalle ennen peliin vientiä (päätös 09.4x).

## 2.11. 10.2x JUNARIVIT: TYÖN ALLA JA VALMIINA ERIKSEEN, EI AIKOJA (2.11.2026 klo 10.29)

Omistaja (KK:n kautta, sanatarkasti): "junassa pitää olla valmiina otsikko erikseen ja kaikki aika ja päivämerkinnät pois jotta rivit pysyvät lyhyinä. miksi tämä ei ole käytössä vaikka näin on aiemmin jo sovittu, ainakin että on erikseen valmis otsikko työn alla otsikon lisäksi. tämä täytyy tarkistaa jotta pysyy jatkossakin oikein. nyt asematulussa on jokin rakenteellinen virhe, koska se ei pysy sovitussa muodossa. miten sen saisi korjattua jotta pysyy varmasti myös tilin vaihtojen yli?" Juurisyy: junatekstit kirjoitettiin käsin ja tarkistin ei valvonut muotoa. Korjaus (PR 5969): tools/asemataulu/juna.py ainoa kirjoitustapa, tarkista-junat.py hylkää ajat, toistot, yli 110 merkin kohdat ja valmiin työn sanat Työn alla -osiossa (TF 217 ja uudemmat), pt-taulu-muistutus.py ajaa tarkistimen jokaisella PT:n ja KK:n viestillä. Raamattu 10.10 päivitetty. TF-otsikon saapumisaika ja napin alla oleva aika jäävät.

## 2.11. 10.39 TF-JUNIA EI VALVOTA (2.11.2026 klo 10.40)

Omistaja (KK:n kautta, sanatarkasti): "tf junia ei tarvitse valvoa, oletetaan että ne tulevat oikeaksi käännöshetkellä, jotta valvomiseen ei kulu tokeneita". Tarkistin valvoo junarivien muotoa vain avoimessa/lukitussa junassa (Juna N); TF-rivit tehdään juna.py tf -komennolla. PR 5971.

## 2.11. 10.48 PIIRROSTYYLINEN TÄHTI PELIIN (2.11.2026 klo 10.49)

Omistaja (kortti KK:ssa, video ja asentoarkki nähtyään): "Kelpaako piirrostyylinen tähti?" → "Kyllä, vie peliin (Suositus)". Codexin tähti v2 (f84dfb5b4: musteääriviiva, akvarellikulta, 72 ruutua / 6 s, hehku). KS kokoaa paketin, NUI sijoittaa 9 tähteä eri vaiheisiin (päätös 09.4x).

## TYÖLISTA AJAN TASALLA ILMAN KELLOTUSTA (omistaja 2.11.2026 klo 11.59) (2.11.2026 klo 12.00)

Omistaja 11.3x: "miten tuon työlistankin saisi jatkossa päivittymään automaattisesti?" ja 11.49: "Työlistassa on vielä vanhoja juttuja." Kortti KK:ssa 11.59: "Pidetäänkö työlista ajan tasalla näin?" → "Kyllä, näin (Suositus)" = "Päivitys kuittauksen yhteydessä, muistutus 3 tunnin jälkeen, odottavat kerran päivässä." (omistaja kysyi ensin 3 tai 6 tunnin tarkistusta; KK suositteli, ettei kellotettua tarkistusta tehdä). Toteutus PR 5974: tools/asemataulu/tyolista.py (lisaa|tilanne|valmis [--juna N]) kirjaa kuittauksen junaan ja työlistaan yhdellä komennolla; PT:n koukku pt-taulu-muistutus.py muistuttaa KK:n välittämistä omistajan päätöksistä (aiemmin kaikki cross-session-viestit ohitettiin — juurisyy), yli 3 h päivittämättömistä keskeneräisistä riveistä ja riveistä, joiden tilanne sanoo valmis mutta tila ei, sekä Odottaa-riveistä kerran päivässä klo 6–12. Raamattu 7.39 TYÖLISTAVAHTI täydennetty.

## EUNUKIT: ALKU RAUHALLINEN, USEAMMIN TASOJEN JA AJAN MYÖTÄ (omistaja 2.11.2026 klo 07.12 ja 12.13) (2.11.2026 klo 12.14)

Omistaja 07.09 (palaute): "Eunukit juoksevat aina kohti, ne eivät ole koskaan pysähdyksissä ja niitä on yleensä vain yksi tai ei yhtään näkyvillä"; 07.12: "Tee kuten kirjoitin". 12.13 (KK:n välittämä määrittely, sanatarkasti): "Eunukkeja voi tulla alussa todella vähän. Ja kun mennään tasoja ylöspäin, niin silloin niitä voi alkaa tulla enemmän. Samoin kun taso etenee, eli kun pelaaja on mennyt pidemmän aikaa samaa tasoa, niin eunukkeja voi silloin myös alkaa tulla enemmän. Lisäksi eunukit sopivat paremmin ulos kuin sisätiloihin. Koska ulkona on enemmän tilaa väistää. Vaikeammilla tasoilla eunukkeja voi olla myös sisätiloissa." Tulkinta (KK): 07.12 pysyy; enemmän = useammin; taso 1 ulkona. Raamattu 2.177 PELIN YDINAJATUS, kohta EUNUKIT. Toteutus Pelikoodari junaan 218; näkyy omistajalle juoksupelin videolla.

## Juoksupeli: alkulento joka aloitukseen, ei automaattisia käännöksiä (omistaja 2.11. 13.38) (2.11.2026 klo 13.45)

Omistaja 2.11.2026 klo 13.38 (KK:n ohjaus PK:lle, KK välitti PT:lle): (a) korvaa 27.10. 08.26–08.29 tason 1 'ei alkulentoa': dronelento keisarin luo kaikkien aloitusten alussa → ovi ja huuto → nopea kierto taakse → 3-2-1. (b) EI AUTOMAATTISIA KÄÄNNÖKSIÄ: keisari kääntyy vain pelaajan ohjauksesta; autopilotti vain QA:ssa; umpikujassa ja seinän edessä keisari pysähtyy ja odottaa. PK:n lista ja KK:n hyväksyntä: PK:n luovutus -20261102-1400 kohta 1. Raamattu 2.177 päivitetty.

## SALIN KATON VARJO TAKAISIN (PT 2.11.2026 klo 13.5x, kumoaa 25.10. 13.1x) (2.11.2026 klo 13.55)

Valosepän vertailu havainteeseen (esikatselu-20261102-135020/sali-pari.jpg): 04 salin lattia on täysin valaistu, havainteessa hämärä ja ikkunoista valojuovat. PT kumosi 25.10. oman linjauksensa (salin oma aurinko ilman katon varjoa): salikattovarjo 1, ja piilotettu katon pääpala heittää varjoa myös keisarin ollessa sisällä. Valojuovat tehdään erikseen ikkuna-aukoista, ja niiden osuus lattiasta mitataan havainnetta (~25 %) vasten. Seinien auringon suuntaa ei muuteta (sama kuin havainteissa); varjoseinille maavalo.

## SATUNNAISET KORISTEET: VAIN SADE POIS; SAAPUMINEN: ZOOMAUS ENNEN INTROKUVIA (2.11.2026 klo 14.38)

Omistaja 2.11.2026 klo 14.37 (kortti KK:ssa): 'Poistetaanko satunnaiset koristeet kartalta?' → 'Vain sade pois' (laiva, juna, lintuparvi ja kyyhky jäävät). Samana hetkenä pyyntö: kaupunkiin saavuttaessa ensin zoomaus peruskartalta kaupunkinäkymään, vasta sen jälkeen introkuvat noin 70 % kuva-alasta, kartta näkyy ympärillä (korvaa suunnitelman E-kohdan 'zoomaus kulkee introa pitkin'). iPadin aloituslogo mustalla taustalla puolet nykyisestä, iPhone ennallaan.

## Pariisin piirros ilman metsiä (omistaja 2.11. 16.48) (2.11.2026 klo 16.49)

Omistaja 16.48 (KK:n kortti, sanatarkasti): "metsiä ei tarvitse. tee uusi koekuva joka samaa tarkkuutta kuin max 15 kuvaa ilman metsiä". Piirretty Pariisi tehdään ilman Bois de Boulognea ja Bois de Vincennesia (laaja v4 -maski ilman metsiä). Koekuva tarkkuudella, jolla kaupunki mahtuu enintään 15 palaan (1536×1024); valinta omistajalta ennen tilauksia.

## Magnific tilattu, käyttö MCP-yhdistimellä (omistaja 2.11. 16.59–17.01) (2.11.2026 klo 17.02)

Omistaja 16.59 (KK:n kortti): "Kyllä, Magnific"; "Kyllä, hankin sen". 17.00: "yhdistetään se MCP:llä" (korvaa Chrome-reitin). 17.01: "nyt yhdistetty" (claude.ai Connectors → Magnific). Koe: Codex piirtää Pariisin uuden tyylin perustan 3 kuvan tarkkuudella, Karttaseppä suurentaa Magnific MCP:llä (Creative-tila, sama tyyliohje), pari KK:n kautta omistajalle. Raamattu 12.24 kohta 5.

## Piirroskaupungit 2,5 m/px koko kaupunkina, Pariisi uudella tyylillä (omistaja 2.11. 17.06) (2.11.2026 klo 17.07)

Omistaja 17.06 (KK:n kortti, sanatarkasti, nähtyään tarkkuus-2m-2_5m(-lahi) ja pari-nykyinen-koepala): "Valitaanko 15 kuvan tarkkuus Pariisille ja seuraaville kaupungeille?" → "Kyllä, 15 kuvaa (Suositus)"; "Tehdäänkö koko Pariisi uudella tyylillä?" → "Kyllä (Suositus)". Piirroskaupungit ~2,5 m/px koko kaupunkina (Pariisi ilman metsiä 15 palaa); korvaa 1.11. 13.54 (lähitaso ~1 m/px) ja 18.22 (lähitaso vain keskustaan). Pariisi kokonaan uudella tyylillä (Codexin koepala 16.39). Tekotapa (Codexin 15 palaa vai 3 kuvaa + Magnific) vasta Magnific-kokeen jälkeen, ei palatilauksia ennen sitä. Raamattu 2.204.

## Magnific ei vielä tilattu (omistaja 2.11. 17.21) (2.11.2026 klo 17.22)

KK 17.19: Magnific-yhdistin näkyy, mutta tunnus on Free-tilillä ja krediittejä on 0. Omistaja 17.21 (KK:lle): "en ole vielä tehnyt tilausta". Raamattu 12.24 kohta 5 korjattu: ei vielä tilattu; suurennus toimii vasta, kun omistaja tilaa samalla Magnific-tunnuksella. Omistajan 17.10-ehto ennallaan: Codexin perusta näytetään ensin.

## Pariisi alusta isoisän ajan kartaksi (omistaja 2.11. 17.39–17.42) (2.11.2026 klo 17.42)

Omistaja 17.39 (KK:n kortin vastaus, sanatarkasti): "Tuo ei näytä vielä vanhalle kartalle minun mielestä kartta pitäisi olla yksinkertaistettumpi eli kaikkia rakennuksia ei minun mielestä kannata piirtää"; 17.42: "pitää olla enemmän sen näköinen kuin jos se olisi piirretty isoisän aikaan. Nyt tuo näyttää liikaa siltä kuvalta, joka oli alkuperäinen kuva, eli pitää lähteä ihan nollasta liikenteeseen, mutta kuitenkin oikea karttapohja pitää säilyttää sillä tavalla, että tärkeimmät nähtävyydet ovat oikeissa paikoissa oikeilla etäisyyksillä, mutta vähemmän tärkeitä asioita voi minusta jättää piirtämättä. Mitä sinä olet mieltä?" Codexin 3 kuvan pohja hylätty; Magnific-pari, palatilaukset ja Magnific-tilaus pysäytetty. KK päivittää suunnitelmat/20261102-pariisi-uusi-tyyli.md ja tuo kortin. Raamattu 2.204 TYYLI.

## Pariisin kartta: ensin ulkoasu ilman paikkavaatimuksia (omistaja 2.11. 19.14–19.17) (2.11.2026 klo 19.17)

Omistaja 19.14 Codexille otosta E: "Ei hyvä. Tee ihan tyhjältä pohjalta. Anna jollekin toiselle sessiolle tehtäväksi." 19.17 (KK): "Voisi tehdä ensin ilman realismi vaateita että saisi visun kuntoon". Uusi Codex-sessio hakee ensin ulkoasun ilman paikka- ja etäisyysvaatimuksia; sovitus Karttasepän OSM-runkoon (2.204: nähtävyydet oikeilla paikoilla ja etäisyyksillä) vasta, kun omistaja on hyväksynyt tyylin. Tyylikokeet A–C (18.31) ja E hylätty.

## Pariisin piirroksen tyyli hyväksytty (omistaja 2.11. 20.36) (2.11.2026 klo 20.40)

Omistaja 20.36 Codexin 20.29 kuvan jälkeen (KK:n kautta, sanatarkasti): "Anna codexille ohjeet miten tehdä valmiiksi. Nyt tyyli hyvä. Animoidaan lopulliseen veneet ja lintuja ja ehkä kuumailmapallo tms". Hyväksytty kuva docs/raportit/kaappaukset/omistaja-20261102/2029-hyvaksytty-tyyli.png. Codexin ohje: suunnitelma 20261102-pariisi-uusi-tyyli.md kohta 00 (tyyli lukossa, paikat Karttasepän palarungoista, 2,5 m/px ja 15 palaa ilman metsiä, ensin yksi pala runko.png:n päälle omistajan hyväksyttäväksi, animaatioita varten sillat, veneet, lintu ja pallo erillisinä kerroksina). Animaatiot Natiivi-UI ja Karttaseppä.

## JUOKSUPELIN ARKISET HAHMOT (2.11.2026 klo 21.06)

Omistaja 2.11. klo 20.54: "Juoksupelissä voisi olla muitakin hahmoja, jotka eivät yritä ottaa keisaria kiinni, vaan toimittavat arkisia askareitaan. Heillä voisi olla myös kädessään tavaroita, jotka saattavat rikkoontua, jos keisari osuu heihin tai jos he säikähtävät keisaria." Kortti klo 21.05 (KK): aloitetaan kolmella hahmolla – Kyllä (suositus): ruokaa kantava eunukki lakatun ruokalaatikon kanssa (eri asu kuin jahtaajilla), palvelijatar posliinin tai teetarjottimen kanssa, vedenkantaja olkapuun ämpäreineen; säikähdys tai osuma pudottaa tavaran. Särkymisen ääni houkuttelee lähimmän jahtaajan – Ei. Toteuttaja Pelikoodari (juoksupeli KK:n ohjauksessa): Codex-tilaus heti, toteutus nykyisen paketin, eunukkikorjausten ja ristikko-ovien jälkeen; äänet Soundlysta; tietokortit PK tai Sisältökirjuri. Suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261102-juoksupeli-arkiset-hahmot.md.

## JUOKSUPELIN AUKIOT JA VEISTOKSET (2.11.2026 klo 21.17)

Omistaja 2.11. klo 21.0x: "Mitä muuta? Varsinkin suurilla palatsin aukioilla voisi olla. Ja onko siellä ollut jotain veistoksia? Itse ainakin muistan nähneeni valtavan kokoisen vihreän kilpikonnan kielletyssä kaupungissa." + "siis veistoksena." Kortti klo 21.17 (KK) "Mitkä lisätään palatsin aukioille ensin?" → kaikki neljä: terassin pronssit (Taihedianin pronssikilpikonna ja kurki, aurinkokello, viljamitta, suitsukeastiat), pronssileijonat porteille, vesiastiat ja lakaisijat, sade lohikäärmeenpäistä. Jako (PT): veistokset, leijonat ja vesiastiat Lavastajalle (mallit Codexilta, Tripo varalla) itäisen salirivin jälkeen; lakaisijat, vedenkantajat ja vesiastiat esteinä Pelikoodarille (KK suoraan); sade Valosepälle Sarytševin jälkeen; tietokortit PK, PT tarkistaa 1914. Suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261102-juoksupeli-arkiset-hahmot.md kohta 7.

## NOSTOT JA SAAPUMISZOOMAUS KAIKKIIN EUROOPAN KAUPUNKEIHIN (2.11.2026 klo 22.08)

Omistaja 2.11. klo 21.42: "Eurooppaan voi sijoittaa niitä nostoja kaikkiin kaupunkeihin. Samoin zoomauksen saavuttaessa voi tehdä kaikkiin. Ei haittaa jos ei ole piirros karttaa. Vaihdetaan niitä striimi karttojen tilalle sitä mukaan kun valmistuu". Raamattu: 2.204 saapumiszoomaus ja nostot oletukseksi kaikille Euroopan kaupungeille (striimikartta pohjana), 2.137 sisäisten nostojen kielto pois (kaupunki yhä yksi piste maan ja Euroopan näkymissä), 2.138 vain piirroksettomille. Jako (PT): NUI osat A (zoomaus), F (aloituskaupunki), E (nostot, D:n jälkeen); KS osat B (60 keskipistettä), D (paikattomien nostojen paikat, Sonnet-parvi), G yhdessä NUI:n kanssa; NS osa C (esilataus ja nykäysmittaus). Video (Lontoo, Bratislava, Pariisi) KK:lle, kun A–F samassa rungossa. Suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261102-nostot-ja-zoomaus-kaikkiin.md.

## YÖVALTUUTUS 2.–3.11.: KK HYVÄKSYY OMISTAJAN PUOLESTA (2.11.2026 klo 22.25)

Omistaja 2.11. klo 22.25 (KK:n kautta): "Menen nukkumaan. Saat hyväksyä puolestani kaikki". KK hyväksyy yön ajan omistajan puolesta sen, mikä muuten menisi omistajalle (Pariisin koko kaupunki, juoksupelin korjaukset ja salit, nostot ja zoomaus -video, kuvaparit, kysymykset suositusvaihtoehdolla) omistajan aiempia sanoja vasten; merkintä "KK:N HYVÄKSYNTÄ OMISTAJAN PUOLESTA klo …", aamulista scratchpad/keskustelukanava/yo-hyvaksynnat-20261102.md. Ei kuulu valtuutukseen (odottaa aamua): TF-julkaisu ja junan lukitus, ostot, asetukset, avaimet ja CLAUDE.md, poistot, uusi generointi yli 3 %:n kiintiön. Roolit lähettävät omistajalle menevät KK:lle kuten ennenkin.

## KK:N YÖHYVÄKSYNNÄT 2.–3.11. (SAAPUMISODOTUS, LATAUSKUVAT, ZOOMAUS KAIKKIIN JUNAAN) (3.11.2026 klo 01.53)

KK hyväksyi omistajan puolesta (valtuutus 2.11. klo 22.25): 23.29 saapumisodotus (a) pysyy (zoomaus alkaa vasta, kun tasot valmiina; omistajan 08.44-linja), NS tekee esilatauksen kohteen valinnasta ja taustaennakoinnin, ilmaisin vain myöhästyessä; jos kylmä odotus yleinen, video molemmista omistajalle aamulla (mitattu: kylmä 30 s, ennakoitu 0 s → videot tehty, KK suosittaa (b)). 01.50 juoksupelin iPad-latauskuvat vaaka+pysty hyväksytty; taso 1 ja 8 salia palautettu PK:lle (kamera seinän läpi, Puyi poissa kattonäkymästä). 01.50 zoomaus ja nostot kaikkiin Euroopan kaupunkeihin (NUI 82634eb4b) junaan 218. PT: pimennyksen varjon ulkonäkö 2024/2017 ISS-kuvasta, jos 12.8.2026:n kuvaa ei ole.

## Saapuminen kaupunkiin (omistaja 3.11. 07.22) (3.11.2026 klo 07.23)

Omistaja: "Lataa jo siirtymän aikana ja silloin pelkkä sisään zoomattu kartta. Siinä ei voi kestää 30sek". Esilataus siirron alusta vain kohteen lopulliseen lähinäkymään; zoomaus välitasojen läpi päättyy valmiiseen kuvaan. Muistivian korjaus riittää junassa 218 (TF 217 ei erikseen). KK:n yöpäätökset 2.–3.11.: iPadin latauskuvat hyväksytty; zoomaus ja nostot kaikkiin kaupunkeihin junaan 218.

## VIIMEISEN KEISARIN NOSTO PEKINGIIN (3.11.2026 klo 13.35)

Omistaja 3.11.2026 klo 13.30 (KK:n kautta, sanatarkasti): "tee nosto pekingiin viimeisestä keisarista jossa usampi oikea kuva sekä myös havainnekuvia keisarista ja paikoista jossa hän asui. mielenkiintoinen historia hänelle. saa olle pidempi teksti. pelissä voisi olla myös linkki tähän nostoon valikossa ja lopetusruudussa." PT: poikkeus Vain Eurooppa- ja Peking-taukoon vain tämän noston osalta; Raamattu 2.200.

## LAATTA- JA TEKSTUURIMUUTOKSET TARKISTETAAN OIKEALLA IPADILLA (3.11.2026 klo 15.14)

Omistajan havainto 3.11.2026 klo 15.14 (KK:n kautta): "nyt isolla ipadilla näkyy simussa uusi kartta mutta se on sekaisin ja väärinpäin". Syy NS 252c190dc (ASTC-pakkaus vain laitteella, #if UNITY_IOS), simu ei näyttänyt vikaa. PT: laattojen, tekstuurien ja laitekohtaisen koodin (#if UNITY_IOS) muutos todistetaan iPad-kuvakaappauksella ennen yhdistelmää; simu ei riitä.
