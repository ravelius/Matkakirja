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

## TILINVAIHTO 3.11.2026 klo 16.5x (3.11.2026 klo 16.51)

Tilille sami.reivinen@vvi.fi (org ddaee6a2): tämän tilin 29.10. sessiot tyhjennetty (self-clear) ja käytössä (PT local_8d8ebf72, KK local_d5f31591 + 9 roolia), ei arkistoitavaa; taulu R6VQFTUNq629zSzah719Uy; ohjeiden koe 10/10 (7.34 korjattu PR 6182); opit PR 6183; tilinvaihto-valmis 0 (PR 6184).

## PARIISIN KOEALUE STRIIMIKARTAN PÄÄLLE (omistaja 3.11.2026 klo 16.51) (3.11.2026 klo 16.52)

Kortti 'Aloitetaanko Pariisin koealue uudella tavalla?' → 'Kyllä (Suositus)'. Piirroskaupunki rakennetaan striimikartan päälle esineinä (Codex: nähtävyydet, talotyypit, puut, sillat, veneet; kadut, liikenneympyrät, joki ja puistot koodilla oikeita katuja pitkin Codexin tyylinäytteillä; pohjakartta paperiseksi ja musteviivaiseksi). Koealue Notre-Dame + Louvre nykyisen piirroksen rinnalle. Ristiriita: Raamattu 2.204 '2,5 m/px koko kaupunkina' koskee nykyistä piirrosta; uusi tapa korvaa sen vasta, jos omistaja hyväksyy koealueen. Nykyisen piirroksen korjaukset jatkuvat.

## UUSI KARTTA KK:N SUUNNITTELUVASTUULLE (3.11.2026 klo 19.35) (3.11.2026 klo 19.36)

KK välitti 19.35 sanatarkasti: "Tämä projekti on siis nyt tällainen uusi, mikä tarkoittaa sitä, että sinun pitää ottaa vastuu sen suunnittelemisesta." Uuden kartan (Pariisi striimikartan päälle, yläviisto kulma, karikatyyrinähtävyydet, osakirjasto, elävä kartta, muut kaupungit) suunnittelu ja tekotavat KK:lla kuten juoksupelin ohjat; PT jakaa työt, junat, merget, Raamatun. Taustalla omistajan pyyntö 19.3x (yläviisto kulma kaikkiin elementteihin, nähtävyydet karikatyyreinä, lähelle Codexin koko karttaa) ja 19.33 (netin valmiit ratkaisut). Kirjattu 2.204:n loppuun.

## KAUPUNKIKARTTOJEN RAKENNUSPERIAATE (3.11.2026 klo 20.51) (3.11.2026 klo 20.52)

Omistajan kortti KK:ssa 'Rakennetaanko kaupunkikartat tällä periaatteella?' → 'Kyllä (Suositus)'. Kaupunkikartat KS:n RAKENNUSPERIAATE.md:n mukaan (proto-3d/_kirjasto/kartta-osat/): lukitaan pelaajan huomaama (5 kohtaa), oikaistaan muu (8 kohtaa). KK:n tarkennus: kaupunginosien luonne ensin automaattisesti kartta-aineistosta, ihminen vain korjaa. Mukana omistajan 20.20 (nähtävyydet maksimiliioiteltuina) ja 20.4x (nähtävyys saa kääntyä katsojaa kohti). Kirjattu 2.204:n loppuun.

## NÄHTÄVYYS EI VEDEN PÄÄLLE (3.11.2026 klo 21.29–21.30) (3.11.2026 klo 21.30)

Omistaja KK:n kortissa 'Onko Notre-Dame nyt tarpeeksi suuri?': "Ei se voi noin mennä veden päälle"; 21.30: "Ei se mene g versiossa kaanon. Katsokaa sieltä mallia". KK: G:ssä Notre-Dame seisoo saarella ja joki näkyy molemmin puolin; liioittelu korkeudessa ja julkisivussa. Kumoaa 20.4x-tulkinnan 'saa levitä joen päälle'. Kirjattu 2.204:n loppuun.

## PUYIN TARINA EI KESKEN JUOKSUN (3.11.2026 klo 21.48–22.05) (3.11.2026 klo 22.05)

Omistaja: "Juoksu pelin ei voi tulla kesken pelin mitään opetus kortteja"; kortilla tarkennus "Tarkoitin opetus korteilla puyin yms elämästä. Näin jonkin sellaisen edellisessä sessiossa" (kuva lokit/pk-keisari-kk2-7ac89ff33-2118/kk1-nosto-pelin-paalla.png); kortti 'Avautuuko Puyin tarina vain juoksun jälkeen?' → "Myös valikosta tauolla". Linja: Puyin tarinan kortit eivät tule juoksun aikana esiin itsestään, vain pelaajan valinnasta (☰ tauolla, lopetusruutu). 7ac89ff33 täyttää tämän, muutosta ei tehdä. KK:n ensimmäinen tulkinta (ohjainopetus pois, PR 6222) peruttu PR 6223:lla; 2.177 ennallaan. Kirjattu 2.200:aan.

## OIKEA G-MALLI (3.11.2026 klo 22.09) (3.11.2026 klo 22.13)

Omistaja (kuva docs/raportit/kaappaukset/omistaja-20261103/kk-2209-vaara-g-vertailu.png): "Tässä on väärä vertailu kuva oikealla. Oikea g versio on paljon liioitellumpi. Siinä kirkon tornit levenevät ylöspäin". G = pariisi-koko-kaupunki-G-tyyli.png (d0191a334), ei pariisi-laaja-g-v4.png. KS korjaa ND k4 -tilauksen, RAKENNUSPERIAATE.md:n, NAHTAVYYSALUE.md:n ja G-v4:stä mitatut kertoimet. Kirjattu 2.204:ään.

## NÄHTÄVYYS SAA LEVITÄ TAKANA OLEVAN JOEN PÄÄLLE (3.11.2026 klo 22.14) (3.11.2026 klo 22.15)

Omistaja oikeaa G:tä katsoessaan: "Tuossa kirkko on levitetty takana olevan joen päälle mikä kannattaa sallia myös uuteen karttaan." Tarkentaa 21.29-sääntöä: takana oleva joki ja ranta saa peittyä, edessä ja sivuilla joki auki ja kulku erottuu, ei katkaisua. Kirjattu 2.204:ään.

## PIENET KADUT POIS MYÖS LÄHIKUVASTA (4.11.2026 klo 06.51)

Omistajan kortti KK:ssa "Jätetäänkö pienet kadut pois myös lähikuvasta?" → "Pois (Suositus)"; selite "Vasen kuva: talot ehjinä, sivukadut ja niiden nimet puuttuvat." Kuva scratchpad/keskustelukanava/kuvat/pariisi-lahikuva-kadut-20261104.jpg (vasen = k40). Koe, ei pelikuva; muisti ja vieritys mittaamatta, kuva laitteelta KK:lle ennen hyväksyntää. Kirjattu RAKENNUSPERIAATE.md:hen (lukittu 1, oikaistaan 2) ja 2.204:ään.

## JOKI JA RANNAT SAAVAT SIIRTYÄ KIRKON YMPÄRILLÄ (4.11.2026 klo 07.56)

Omistaja klo 07.39: "Näyttää siltä että codexille annetaan liian pieni alue piirrettäväksi kun kirkko ei istu ollenkaan kuvaan". Omistajan kortti KK:ssa "Saako Codex siirtää jokea ja rantoja kirkon ympärillä?" → "Kyllä (Suositus)"; selite: kirkko seisoo saarella kuten 2029:ssä, mutta joki ei ole kirkon kohdalla täsmälleen oikeassa paikassa. KK:n välityksen mukaan vesisääntö 21.29/22.14 pysyy. Karttaseppä tilaa Notre-Damen oton 5: kirkko ja ympäristö samassa kuvassa koko kuva-alalta (KORJAUSLISTA). Kirjattu 2.204:ään.

## NOTRE-DAMEN SUUNTA JA SAINT-LOUIS-SAARI (4.11.2026 klo 08.22)

Omistajan kortit KK:ssa: "Onko tämä oikea suunta Notre-Damelle?" → "Kyllä (Suositus)"; "Palautetaanko Saint-Louis-saari?" → "Kyllä (Suositus)" (selite: saaren itäpää loppuu kirkon takaosan jälkeen puutarhaan, ja Saint-Louis on oikealla paikallaan; vaatii yhden uuden kuvan). Tekotapa KK:n mukaan: kirkko ja ympäristö samassa Codexin kuvassa, joki saa siirtyä alueella. Järjestys: otto 6 Karttasepälle, sovitus kartalle KK:lle ja omistajalle, vasta sitten iPad ja muut nähtävyydet (KORJAUSLISTA, viimeinen osio).

## PARIISI: EIFFEL ILMAN KOLMATTA KIERROSTA, LINTUPARVET JÄÄVÄT (omistaja 5.11. klo 16.10, kortit KK:ssa) (5.11.2026 klo 16.30)

Tehdäänkö Eiffelin malli ilman kolmatta kierrosta? = Tehdään (Suositus). Saavatko lintuparvet jäädä Pariisin kartalle? = Jäävät (Suositus). KK:n välitys; aika korjattu 16.03:sta 16.10:een.

## PARIISI: VAIN 3D-RAKENNUKSET, METSÄ ENNALLEEN (omistaja 5.11. klo 16.41, kortti KK:ssa) (5.11.2026 klo 16.42)

Kortti: heikennetäänkö metsä puoleen Pariisin alueella. Omistaja: jää ennalleen ja edelleen keskitytään vain pariisin 3d rakennuksiin. KK:n tavoite: Mac-vuorot ja työ ensin Eiffelille ja sarjan seitsemälle, sitten niiden kylteille; VS:n laikku-, metsä- ja saumakokeet seis.

## TILINVAIHTO PÄÄTILILLE (omistaja 5.11. klo 17.05 ja 17.06, kortit KK:ssa) (5.11.2026 klo 17.07)

Vaihdetaanko tänään päätilille? = vaihdetaan nyt. Mihin asti päätiliä saa käyttää? = 92 % (Suositus).

## TILINVAIHTO PÄÄTILILLE (5.11.2026 klo 17.22)

Omistaja 5.11. 17.05 ja 17.06: tilinvaihto päätilille org f04011ee, raja 92 %. Uusi PT local_cf5b4eca. Samat sessiot tyhjennettyinä (clear), viestillä 'kutsu clear_session self', list_events 0 tarkistettu: KK, Postivahti, Asemataulu, JU, NS, NUI, PK, VS, KS, LAV. Id:t paivita-idt.mjs:llä. Viikko 16 % vaihdon alussa. Löydös: Postivahdin kansio oli koti-haarassa, josta KIERROS.md ja NOLLAUS.md puuttuivat juuresta; Postivahti palasi haaraan postivahti (944e80bad). Pieni iPad 9e8c8ab1e ei ollut asentunut vaihdossa; JU:lle ensimmäiseksi työksi.

## KK:N ID PÄÄTILILLÄ (5.11.2026 klo 17.34)

Omistajan kortti 5.11. 17.32: KK:n id local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe lisätty ~/.claude/CLAUDE.md:hen päätilin riville (KK teki omistajan luvalla). Tilinvaihto valmis 17.34: tarkistus 0, ohjeiden koe 10/10.

## OVERPASS-POIKKEAMA 2.183: ESITTELYPAIKAT JAAVAT (5.11.2026 klo 18.15)

KS ilmoitti itse (KK:n kautta 5.11.): 1) Overpass 5.11. klo 11.59-12.03, kuusi kyselya kiellon jalkeen (esittelypaikat.mjs, aloituslennon paikat, PR 6273); 2) omistajan sahkoposti tunnisteessa viidessa vanhassa Wikimedia-skriptissa (ajot 16.10.-3.11., paatelty paivayksista). Omistajalle kerrottu ilman korttia (KK). PT:n paatos: paikkoja ei ajeta uudelleen, jos KS:n rivitarkistus on puhdas; hylatty piste ratkaistaan Geofabrikin aineistosta. Valimuisti jaa kayttamatta ja poistamatta. KS estaa Overpassin koodissa kaikista skripteista (3731d10e3 jatti kaupunkikeskustat.mjs:n ja tarkista-nostopaikat.mjs:n auki) ja poistaa sahkopostin. Saanto 2.183 ei muutu.

## KYLTIT HAIPYVAT USVAAN KUTEN NIMET (2.215) (5.11.2026 klo 18.18)

KK 5.11. klo 18.06: 'Häivytä ne kuten nimet'. Omistajan 14.44 sanat koskivat nimiä, ulotus kyltteihin on KK:n (NUI:n selvitys). Nimen väistö pyöreästä merkistä oli NUI:n oma ratkaisu, ei päätös: PT määräsi sen poistettavaksi ennen ajoa (poisto NUI:lla, ei vielä tehty), jotta Hôtel Matignon ja Hôpital Lariboisière jäävät kartalle.

## NIMI VAISTYY PYOREAN MERKIN KOHDALTA (2.215), OIKAISUT (5.11.2026 klo 18.20)

Oikaisee klo 18.18:n kirjauksen: PT perui väistön poiston, koska KK on päättänyt: '26c7ffcfc:n linja sopii: merkki jää ja nimi väistyy sen kohdalta' (NUI:n välittämä). Hôtel Matignon ja Hôpital Lariboisière voivat kadota keski-kuvasta. Oikaisee klo 18.15:n kirjauksen: sähköposti oli kymmenessä skriptissä ja kahdessa mainin työkalussa, ei viidessä (KS, KK). Rivitarkistus ei ollut täysin puhdas: Tuileries'n paikkojen i1, i2 ja p1 lähde 'OSM Jardin des Tuileries', alkuperä epäselvä; PT: korvataan Geofabrikista tai Wikidatasta, muut paikat jäävät. Overpass yhä yhdeksässä mainin työkalussa; PT: KS estää yhdellä testillä.

## PARIISIN PALLOKIERROS: NOPEA LASKU, RAJA 10 M/S2 EI SITO TATA LASKUA (5.11.2026 klo 18.21)

NS 7d719ae76 (ei vielä nähty ajossa): lasku 8,5 s (tervehdys väliaik. 6 s + 2,5 s liuku), kerronta alkaa 6,0 s, huippu 159 m/s, kiihtyvyys laskettu noin 80 m/s² (ei mitattu), TF 168:n raja 10. PT hyväksyi ajoon omistajan 17.52 tavoitteen perusteella ('pallo laskee nopeasti Notre-Damen luo lyhyen tervehdyksen aikana'): avaus pois, opastus 1. pysähdyksen jälkeen, vain Pariisin pallokierroksessa. Raja 10 m/s² pysyy muualla; kiihtyvyys mitataan ajon lokista, ja NS kertoo ison suunnanmuutoksen. Omistaja ei ole nähnyt tätä; pari PT:lle, ei junaan.

## NIMET PYSYVAT PYOREAN MERKIN KOHDALLA (2.215), RIEMUKAARI KELPAA (5.11.2026 klo 18.22)

KK PT:lle omistajan päätösviestissä klo 18.21: 'NUI:n nimen väistö pois, nimet pysyvät (ei omistajan päätös, ylimääräinen).' Korvaa klo 18.20:n kirjauksen väistöstä, joka perustui NUI:n välittämään KK:n aiempaan sanaan. OMISTAJAN PÄÄTÖS klo 18.21 (kortti 'Kelpaako Riemukaari malliksi?' = 'Kelpaa (Suositus)'): Riemukaari kelpaa. Kerrottu ennen korttia: 20 % leveämpi, suuri kaari kapeampi, kapeille sivuille Wagramin puoli, kaaret auki, ei puistorengasta, aukion rengastien yli. KS tilaa.

## OMISTAJAN PAATOS KLO 18.52: SARJAN ARKIT (5.11.2026 klo 18.52)

Kortit KK:n kautta: Opéra 'Kelpaa', Panthéon 'Kelpaa', Montparnasse 'Uusi otto'. KS jatkaa -1845-suosituksensa mukaan; Opéran jatketut tornit KK katsoo ennen Tripoa. Omistajalle kerrottu: Montparnassen viereen jää kartan rakennuksia (asema, noin 6 m). Kuvat scratchpad/keskustelukanava/kuvat/sarja24/.

## HINTAKYLTTI EI VAISTA (2.215) (5.11.2026 klo 18.53)

KK:n käsky 18.4x, NUI:n välittämä (23485f753, ajamatta): hintakyltti ei väistä eikä katoa, ja sen kohdalle osuva nähtävyyskyltti häipyy. Kumoaa KS:n 5.11. linjan 'nähtävyyskyltti voittaa' ja KK:n 16.2x:n väistön narun pään viereen. Les Halles jää pois keski-kuvista törmäyksen takia (Louvren kyltti).

## PARIISIN PALLOLASKU: AVAUSTAUKO POIS (5.11.2026 klo 18.56)

PT 5.11.: Pariisin tervehdyslaskusta poistetaan avaustauko 2,3 s (vain Pariisi): omistajan 17.52 'pelaaja lähtee heti' menee vanhan 'ei hätiköityä alkua' edelle tässä kohdassa. Mittaus d12a5d046 (Mac, Google, yksi ajo): valinnasta perille 26,9 s, latausruutu 15,8 s (yleiskuva 6,7 + esilataus 9,1), tauko 2,4 s, lasku 8,7 s; ennen 23,8 s. Oikean pelin käynnistystä ei mitattu. Valkoiset rakennukset automaattiajon kuvissa ovat Ion-varadataa (CesiumKaupunki.cs:452); kaupunkikuvaa arvioivat ajot komennolla 'linssi kaupunki google 1'.

## OMISTAJAN PAATOS KLO 19.03: SACRE-COEUR UUSI OTTO (5.11.2026 klo 19.04)

Kortti KK:n kautta (arkki scratchpad/keskustelukanava/kuvat/sarja24/sacre-coeur-arkki.jpg): Sacré-Cœur 'Uusi otto'. KS:n arkista puuttui 2.206:n mäki; lisätty ottoon 2 ja kerrottu omistajalle, reunaa ei ole kokeiltu karttaa vasten. Perillä KS:llä.

## OMISTAJAN PAATOS KLO 19.14: INVALIDIT KELPAA (5.11.2026 klo 19.14)

Kortti KK:n kautta (arkki scratchpad/keskustelukanava/kuvat/sarja24/invalides-arkki.jpg): Invalidit 'Kelpaa', ei kolmatta ottoa. Perillä KS:llä. Omistajalle näytetty samalla NUI:n 23485f753 (kuvat/kyltit-23485f753/). KK antoi NUI:lle seuraavaan ajoon: kadonneella kuvalla aina kyltti, piilotettu kyltti ei vie nimeltä paikkaa.

## PARIISIN NIMIKYLTIT PIENEMMIKSI JA NÄKYVIIN VASTA LÄHELLÄ (OMISTAJA 19.23, KK) (5.11.2026 klo 19.23)

Omistajan pyyntö klo 19.23 KK:n kautta: "nimikyltit pitää olla pienemmällä, näkyvät vasta kun mennään lähemmäs rakennusta". KK:n tavoite: kaukaa kartta on puhdas ja rakennukset puhuvat puolestaan; kun lähestytään, pieni kiinteän kokoinen kyltti ilmestyy pehmeästi. Pyöreät merkit jäävät (15.01). Muuttaa Raamatun 2.215:n kyltit ja 2.212:n tason: pallon kyltti seuraa samaa tasoa. KK antoi työn Natiivi-UI:lle suoraan.

## KAIKKI ÄÄNET PELIIN, OMISTAJA KUUNTELEE PELISSÄ (OMISTAJA 19.23, KK) (5.11.2026 klo 19.25)

OMISTAJAN PÄÄTÖS klo 19.23 KK:n kautta: "laita kaikki äänet peliin, kuuntelen siellä". 223 lausetta ja tervehdys. PT:n suositus KK:lle: pieni iPad, uusi kehitysversio NS:n haarasta nappikorjauksen d1867a55a mittauksen jälkeen (lupa omistaja 13.28), ei TF eikä juna; uudet ääniosoitteet vaativat koodimuutoksen, joten nykyisessä versiossa ne eivät kuulu.

## TF, KUN PARIISI ON VALMIS; ÄÄNET KUUNNELLAAN SIITÄ (OMISTAJA 19.26, KK) (5.11.2026 klo 19.26)

OMISTAJAN PÄÄTÖS klo 19.26 KK:n kautta: "ipad on jo kotona. vielä ei tarvitse julkaista TF, julkaiset TF kun pariisi valmis". KK:n tulkinta, kerrottu omistajalle: pieni iPad on kotona, joten asennus perutaan; ei TF:ää nyt; omistaja kuuntelee äänet Pariisin TF:stä; VS:n vienti ja koodi jatkavat kohti sitä. KK vahvistaa kortilla ennen TF:ää ja kertoo silloin KERROTTAVAT-listan.

## MONTPARNASSE OTTO 2 KELPAA (OMISTAJA 19.28, KK) (5.11.2026 klo 19.28)

OMISTAJAN PÄÄTÖS klo 19.28 kortilla, arkki scratchpad/keskustelukanava/kuvat/sarja24/montparnasse-otto2-arkki.jpg: Montparnasse otto 2 "Kelpaa". Perillä Karttasepällä.

## 3D-KOHTEET EIVÄT SAA NÄKYÄ HORISONTIN TAKANA (OMISTAJA 19.30, KK) (5.11.2026 klo 19.31)

Omistajan pyyntö klo 19.30, kuva docs/raportit/kaappaukset/omistaja-20261105/eiffel-horisontissa-1928.png (Grand Palais'n pelikuva 0906b3c15): "Horisontissa näkyy eiffel vaikka ei ehkä pitäisi". KK:n tavoite: horisontin takana ei näy mitään: nähtävyys ja sen maapohja häipyvät usvaan yhtä aikaa kartan kanssa, eikä usvan yläpuolella leiju rakennuksia tai maapaloja. Yksi sääntö kaikille 3D-kohteille (2.215). Sama tunnettu vika kuin Louvressa ja Notre-Damessa. KK antoi Karttasepälle suoraan.

## MAC-KUVIEN PISTEKERROIN PARIISIN KARTALLA (KK 19.50) (5.11.2026 klo 19.52)

KK:n havainto klo 19.50: Mac-kuvien kartan nimet ovat noin 2 kertaa iPadia suuremmat, kun esikatselu.sh käyttää oletuskerrointa 1 (70 julkaisija-ajoa, mm. kaikki kylttiajot). PT tarkisti lokeista: esim. esikatselu-20261105-160023 kerroin 0.465, julkaisija-pariisi-kyltit-84a2f3d83 kerroin 1. Sama kerroin ohjaa koodissa nimi- ja kerrostasoja (Screen.height / Pistekerroin); poikkeamaa tasoissa ei ole mitattu. Raamattu 10.5: Pariisin kartan Mac-ajot kertoimella 0.465. Kertoimella 1 tehdyt koko- ja tasoarviot eivät päde iPadiin; merkkien poisto mallien päältä (84a2f3d83) katsotaan uudelleen NUI:n seuraavasta ajosta.

## NIMIKYLTIT KELPAAVAT; NIMI EI JÄÄ MERKIN ALLE (OMISTAJA 20.08, KK 19.59) (5.11.2026 klo 20.09)

OMISTAJAN PÄÄTÖS klo 20.08 kortilla KK:n kautta: "Kelpaavatko nimikylttien koko ja näkymisen etäisyys?" = "Kelpaa (Suositus)". Kuvat scratchpad/keskustelukanava/kuvat/kyltit-013655981/ (kerroin 0.465). Pehmeää ilmestymistä ei nähty, joten se katsotaan pelistä.

KK klo 19.59 (ei omistajan sana) kumoaa 2.215:n linjauksen NIMI JA PYÖREÄ MERKKI: kirjaimet eivät jää merkin eivätkä 3D-kohteen pohjan tai puiden alle, yksi yleinen sääntö NUI:lla. Euroopan tason musta pohja (013655981): NUI selvittää, omistajalle kerrottu; NS:n ja NUI:n arvio on kuvausvika, ei todistettu.

## KARTAN KUVAT MYÖS 45°:STA; WILLIAM-INTRO SOI; ND:N POHJA (OMISTAJA 20.09, KK) (5.11.2026 klo 20.11)

OMISTAJAN PYYNTÖ klo 20.09: "Näytä kuvia mieluusti myös 45 asteen tms kulmasta sillä karttaa katsotaan jatkossa enemmän noin". Raamattu 10.5.

KK: William-intro soi myös NousuKoe päällä (omistaja 19.23 "laita kaikki äänet peliin, kuuntelen siellä"; 17.5x "kaupunki intron 'pariiisi' ... pitää generoida uusiksi"). Notre-Damen pohja-alue on omistajan hyväksymä (kortti 4.11. "Kelpaa"): uusi maaversio ei muuta piirroskartan ulkoasua ilman hänen katsomaansa paria, vain pallonäkymään tai pari molemmista KK:lle ennen kytkentää; LAV:n jonossa juoksupelin pintojen ja räystäiden jälkeen, ei omaa Mac-ajoa (omistaja 17.40).

## ALOITTAVA PELAAJA SAA PARIISIN ALOITUSLENNON (OMISTAJA 20.20, KK) (5.11.2026 klo 20.2x)

OMISTAJAN PÄÄTÖS klo 20.20: "Saako aloittava pelaaja Pariisiin uuden aloituslennon vanhan intron tilalle?" = "Kyllä (Suositus)"; kortissa: "Kamera kiertää, kuvat nousevat kartalta ja William sanoo nimen ja iskulauseen." Raamattu 2.161 ja 2.210. Muut aloituskaupungit ennallaan (KK:n tulkinta). KK:n tulkinnat klo 20.2x (ei omistajan sanoja; KK kertoo omistajalle kuvien kanssa): 2.161:n kohdat 2 ja 3 pysyvät, päätös koskee vain introa; kierto hiipuu pehmeästi Pulun aloituksen alkupuolella; isoisän Tuileries-kuva ei nouse aloittavalle pelaajalle.

## NIMISÄÄNNÖN TARKENNUS (KK) (5.11.2026 klo 20.18)

KK:n sanamuoto: "kirjaimet eivät jää pyöreän merkin, 3D-kohteen, kyltin eivätkä puiden alle; nimi siirtyy viereen, ja jos vapaata paikkaa ei löydy, nimi ei näy (määrä nähdään seuraavasta ajosta, ei vielä hyväksytty). Pohja piirtyy nimien alle, joten se ei kuulu sääntöön; pallo jää ulos, koska liikkuu. KK:n linjaus, ei omistajan sana." NUI:n toteutus 6bb2744d4, ei vielä nähty pelissä.

## PARIISIN HORISONTTI KAUEMMAS (OMISTAJA 20.25, KK) (5.11.2026 klo 20.2x)

OMISTAJAN PÄÄTÖS klo 20.25: "Siirretäänkö Pariisin horisonttia kauemmas?" = "Kauemmas (Suositus)"; kortissa: "Matalassa kulmassa noin kaksi kertaa kauemmas, ja saat uuden kuvan." Sanat 20.23: "Miksi horisontti tulee näin aikaisin?"; kuva docs/raportit/kaappaukset/omistaja-20261105/horisontti-aikaisin-2023.png. KK:n tavoite: matalalta kaupunki jatkuu katsotun rakennuksen takana, mutta koko Pariisi ei näy kerralla (14.55 pysyy); 19.30:n sääntö pysyy. Raamattu 2.215.

## RAKENNUSTEN ALUSTAT CODEXILTA (OMISTAJA NOIN 20.3x, KK) (5.11.2026 klo 20.4x)

OMISTAJAN PYYNTÖ noin klo 20.3x, käsitelty 20.41 (date; tarkka aika ei tiedossa, tiedostonimen 2031 on KK:n arvaus): "Tuo ympyrä pitäisi piirtää codexilla myös samoin muiden rakennusten alustat vai ovatko ne vielä tulossa?" Kuva docs/raportit/kaappaukset/omistaja-20261105/riemukaari-ympyra-2031.png. Tavoite ja rajaus ovat KK:n: koko aukio Codexilta, sama sarjan muille malleille alueilla v7, reuna katuja ja rantoja pitkin. Raamattu 2.215, tarkentaa 2.206:ta.

## OHJELMANA TEHDYT KOHTEET NYT RINNAKKAIN (OMISTAJA 20.44, KK) (5.11.2026 klo 20.4x)

OMISTAJAN PÄÄTÖS klo 20.44: "Milloin ohjelmana tehtyjen kohteiden kokeilu aloitetaan?" = "Nyt rinnakkain (Suositus)"; kortissa: "2–3 kohdetta, ja kuvat Tripon mallien rinnalle." Muuttaa 2.213:n järjestyksen. KK:n tavoite: 2–3 Pariisin kohdetta, kuten sillat ja Hôtel de Ville, oikein mitoin ilman Tripoa eikä tavallisia taloja; omistaja näkee neljästä suunnasta ja 45°:sta Tripon nähtävyyden rinnalla, mikä ero on. Lontoon osat A–F odottavat yhä korttia. Tekijä Valoseppä (PT).

## EI MINIRAKENNUKSIA PARIISIN KARTALLA (OMISTAJA 20.51, KK) (5.11.2026 klo 20.5x)

OMISTAJAN PÄÄTÖS klo 20.51: "Näitä mini rakennuksia ei saa olla"; kuva docs/raportit/kaappaukset/omistaja-20261105/mini-rakennus-tuileries-2051.png (b7e7a1de0:n ajosta). KK:n tavoite ja tulkinta: kaikki viisi leikattua kuvaa pois, tumma tähtikyltti jää, napautus ja Tuileries-lento kylttiin; kumoaa 2.215:n 14.57:n kuvat. PT: muiden kaupunkien kuvat (2.204) jäävät ratkaisematta. Tekijä NUI.

## EI LUENTOA ALOITUSKAUPUNGISSA (OMISTAJA 21.02, KK) (5.11.2026 klo 21.0x)

OMISTAJAN PÄÄTÖS klo 21.02: "Saako aloituskaupungissa olla isoisän luento?" = "Ei luentoa (Suositus)"; kortissa: "Pulu aloittaa heti, kuten päätit 15.10." Sanat 15.10. klo 17.12 pysyvät. Raamattu 2.161 ja 2.210. Tausta: unen poisto 17.10. oli palauttanut luennan aloituskaupunkeihin. KK kertoi omistajalle, ettei Pariisista aloittava näe Tuileries-kuvan nousua aloituksessa. KK välitti NS:lle suoraan: kohta 2 kaikkiin aloituskaupunkeihin.

## KUVAT KADONNEISTA AARTEISTA (OMISTAJA 21.04, KK) (5.11.2026 klo 21.0x)

OMISTAJAN PÄÄTÖS klo 21.04: "Kuvat pitää olla kadonneista aarteista" (jatkaa 20.51:n sanoja "Näitä mini rakennuksia ei saa olla"). KK: tulkinta "kaikki viisi pois" oli liian laaja; pikkurakennuksen tilalle tulee kuva, tähtikyltti viereen (14.57:n sanat). Raamattu 2.215. Kuvan muodon KK kysyy kortilla; NUI seis siihen asti, KK kertoi NUI:lle suoraan. Muut kaupungit: KK:n mukaan jo päätetty (2.204, 2.215), ei korttia; 2.204:n leikattu kuva päivitetään, kun muoto on selvä.

## KADONNEEN AARTEEN KUVA ON PYÖREÄ (OMISTAJA 21.07, KK) (5.11.2026 klo 21.1x)

OMISTAJAN PÄÄTÖS klo 21.07: "Millainen kuva kadonneella aarteella on pikkurakennuksen tilalla?" = "Pyöreä kuva (Suositus)"; kortissa: "Sama merkki kuin muilla kohteilla, vieressä tähtikyltti." Raamattu 2.215 ja 2.204. Neljä pelkän kyltin kohdetta ennallaan (2.11. klo 08.42). KK välitti NUI:lle suoraan.

## MONTPARNASSE, SACRÉ-CŒUR JA INVALIDIT: KK:N PÄÄTÖKSET (KK, 5.11.2026 klo 21.1x)

KK:n päätöksiä omistajan 19.28:n ja 20.13:n Kelpaa-sanoja vasten, ei omistajan sanoja. Montparnasse: kaksi Tripo-ottoa epäonnistui, ei kolmatta; Karttaseppä rakentaa mitoista, julkisivu ja katto Codexilta kuvina. Sacré-Cœur: kirkko otosta 1, mäki erikseen pelissä, koska Tripo ei tuottanut sitä. Invalidit 24o Tripolle sellaisina. Horisontti: 7875c668d korjasi katoamiset; Karttaseppä selvittää kartan tummumisen eräissä kulmissa ja kokeilee katsepistettä maan tasolle kuvapareilla omistajalle. Muiden kaupunkien kysymys ratkesi 21.07:n kirjauksella (2.204, 2.215).

## EIFFEL SAA NÄKYÄ KARTAN RAJALLA (OMISTAJA 21.28, KK) (5.11.2026 klo 21.2x)

OMISTAJAN PÄÄTÖS klo 21.28: "Saako Eiffel näkyä horisontissa näin selvästi?" = "Kelpaa (Suositus)"; kortissa: "Rakennukset näkyvät selvästi kartan rajalla." Kuvat scratchpad/keskustelukanava/kuvat/horisontti-7875c668d/ (7875c668d, Mac). KK: tarkentaa 19.30:n sanoja: rakennus saa seistä kartan rajalla pohjansa päällä; leijuminen ei kelpaa. Raamattu 2.215. Kartan tummuminen ja pystysauma yhä auki Karttasepällä.

## HORISONTTI PEHMEÄMMÄKSI JA EIFFELIN MAA (OMISTAJA 21.30, 21.32, KK) (5.11.2026 klo 21.4x)

OMISTAJAN PYYNTÖ klo 21.30: "Horisontti on vähän turhan jyrkkä"; kuva docs/raportit/kaappaukset/omistaja-20261105/horisontti-jyrkka-2130.png (NUI 7551a76cc:n Tuileries 45°, ilman KS:n horisonttikorjausta). KK:n tavoite ja tulkinta: kartta häipyy taivaaseen pidemmällä ja pehmeämmällä matkalla, ei kapeana kaistana; koskee myös 45°:ta. 21.28:n Kelpaa pysyy.

OMISTAJAN PYYNTÖ klo 21.32: "Eifelin alta puuttuu maa."; kuva docs/raportit/kaappaukset/omistaja-20261105/eiffel-maa-puuttuu-2132.png. KK:n tavoite: tornin kaikki neljä jalkaa seisovat yhtenäisellä maalla, joka jatkuu kartaksi. Raamattu 2.215. Karttaseppä tekee; kuva → KK → omistaja.

Grand Châtelet'n kyltti pisteen yläpuolelle: KK 21.30 NUI:lle "Grand Châtelet 45°:ssa, kuten suunnittelit", ei omistajan sana; koskee vain tätä kohdetta, ei muita kylttejä eikä sääntöä; KK katsoo tuloksen. Syy mitattu: törmäys malliin vasemmalla 45°:ssa.

Eiffelin siirto 70 m (KS 024338c23): koe, ei junaan eikä hyväksytty; KK päättää, kun KS tuo syyn, vaihtoehdon ja kuvat molemmista. Omistajan sana on vain "Eifelin alta puuttuu maa", ei siirtoa.

## OHJELMAKOHTEET OIKEISSA MITOISSA, ENSIN PARIISI LOPPUUN (OMISTAJA 21.49, KK) (5.11.2026 klo 21.5x)

OMISTAJAN PÄÄTÖS klo 21.49: "Missä koossa nämä kolme kohdetta jäävät Pariisiin?" = "Oikeissa mitoissa (Suositus)"; selite: "Vain tärkeimmät nähtävyydet on liioiteltu, ja viat korjataan". "Kokeillaanko Lontoota tällä tavalla Pariisin jälkeen?" = omin sanoin: "Tehdään ensin Pariisi loppuun". Kuvat scratchpad/keskustelukanava/kuvat/ohjelmakohteet-cffdccab9/ (cffdccab9). KK:n tulkinta: kolme kohdetta jäävät, Valoseppä korjaa viat; Lontoon kokeesta ei päätöstä, osat A–F odottavat, 2.210:n sama toteutus pysyy, KK kysyy uudelleen, kun Pariisi on valmis. Raamattu 2.213.

## 2.213 TIIVISTETTY: AIEMPI SANAMUOTO (PT, RAAMATUN KOKORAJA) (5.11.2026 klo 21.59)

Raamatun 2.213 tiivistetty voimassa olevaan linjaukseen (koko yli 450 kt). Sisältö ei muutu. Aiempi sanamuoto: 2.213 OHJELMANA TEHDYT LISÄKOHTEET ENNEN LONTOON KOETTA (SITOVA, omistaja 5.11.2026 klo
12.57, kortit: "Kokeillaanko Lontoota tällä tavalla heti Pariisin jälkeen?" → "Kokeillaan ensin Pariisin lisäkohteilla"; "Milloin Pariisiin lisätään ohjelmana tehtyjä kohteita?" → "Sarjan jälkeen";
suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261105-kaupungit-avoimesta-datasta.md, MUUTOS 1; lähtökohtana Tiny Warsawin ja Tiny Praguen rakennustapa, omistaja 12.50): JÄRJESTYS: 1) Pariisin
kahdeksan nähtävyyden sarja kartalle; tästä ei töitä ennen sitä. 2) KK katsoo koodin nykyiset ohjelmamallit (Erikoismallit, Maamerkit) lähtötasoksi; PT jakaa tekijän. 3) 2–3 lisäkohdetta ohjelmana,
kuten sillat ja Hôtel de Ville: oikeat mitat, ei Tripoa eikä tavallisia taloja; Macin kuvat neljästä suunnasta Tripon nähtävyyden rinnalla → KK katsoo → omistajalle kuva ja kortti Lontoosta. JÄRJESTYS
MUUTETTU (omistaja 5.11.2026 klo 20.44, kortti "Milloin ohjelmana tehtyjen kohteiden kokeilu aloitetaan?" → "Nyt rinnakkain"; kortissa: "2–3 kohdetta, ja kuvat Tripon mallien rinnalle."): kohdan 3
kokeilu alkaa nyt sarjan rinnalla eikä sen jälkeen; kumoaa kortin "Sarjan jälkeen" ja kohdan 1 "tästä ei töitä ennen sitä". KOKO (omistaja 5.11.2026 klo 21.49, kortti "Missä koossa nämä kolme kohdetta
jäävät Pariisiin?" → "Oikeissa mitoissa"; selite: "Vain tärkeimmät nähtävyydet on liioiteltu, ja viat korjataan"; kuvat scratchpad/keskustelukanava/kuvat/ohjelmakohteet-cffdccab9/, cffdccab9): Hôtel
de Ville, Pont Neuf ja Pont Alexandre III jäävät Pariisiin oikeissa mitoissa, ja Valoseppä korjaa viat (KK:n tulkinta). LONTOO (sama kortti, kysymys "Kokeillaanko Lontoota tällä tavalla Pariisin
jälkeen?", omin sanoin): "Tehdään ensin Pariisi loppuun": ei päätöstä kokeesta; KK kysyy uudelleen, kun Pariisi on valmis (KK:n tulkinta). RAJAUS: Lontoon kokeen osat A–F odottavat korttia, ja 2.210:n
"sama toteutus Lontooseen" pysyy siihen asti.

## OHJELMANA MUITA RAKENNUKSIA PARIISIIN (OMISTAJA 22.04, KK) (5.11.2026 klo 22.06)

OMISTAJAN PYYNTÖ klo 22.04: "Tee muita rakennuksia sillä ohjelmalla  Pariisiin. Onnistuuko?" KK:n tavoite: Pariisi tuntuu täydemmältä oikeilla rakennuksilla oikeissa paikoissa, kun liioitellut nähtävyydet erottuvat niistä. KK kysyy laajuuden ja listan kortilla, sitten osat PT:lle jaettavaksi. VS jatkaa nyt vain kolmen kohteen vikoja. Aikaistaa Pariisissa sarjan suunnitelman kohdan "muut pienet kohteet nykyisiksi, kunnes luokat on päätetty"; muiden kaupunkien luokat ja Lontoo odottavat ennallaan. Muuttaa 2.213:a.

## PARIISI: MYÖS TAVALLISET TALOT OHJELMALLA, ENSIMMÄINEN ERÄ (OMISTAJA 22.09, KK) (5.11.2026 klo 22.10)

OMISTAJAN PÄÄTÖS klo 22.09 (kortti, pyynnöstä 22.04): "Tehdäänkö ohjelmalla vain nimettyjä rakennuksia vai myös tavallisia taloja?" = "Myös tavalliset talot"; selite "Kortteleita 3D:nä nähtävyysalueiden ulkopuolella"; KK suositti vain nimettyjä. "Kelpaako ensimmäinen erä?" = "Kelpaa (Suositus)": keskustan sillat, Madeleine, Palais Bourbon, Pompidou-keskus, Tour Saint-Jacques, Saint-Eustache, Saint-Sulpice. Suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261105-pariisi-rakennukset-ohjelmalla.md. A nimetyt: Valoseppä kolmen kohteen vikojen jälkeen. B talot: yksi neliökilometri kokeena Marais:sta, Karttaseppä varmistaa rajan alueisiin; kuva, KK, omistajalle ja kortti ennen koko Pariisia; lelumainen tai kadut peittävä = tyyli ensin. Ei junaan, sarja ei saa hidastua.

## RAAMATTU 11.8: TARKISTUS ENNEN TYOTA (KK 6.11.2026 klo 01.20) (6.11.2026 klo 01.21)

KK: Pompidou ja Tour Montparnasse olivat KK:n suunnitelmissa, vaikka ovat Ranskassa suojattuja, eikä omistajalle ollut kerrottu. Pompidou pois, Montparnasse seis aamun korttiin asti, VS tarkistaa 18 siltaa. KK:n pyyntö: jokaisesta ohjelma- ja sarjakohteesta 11.8-tarkistus ennen työtä; vuonna 1956 tai myöhemmin suunniteltu on aina suojattu. PT kirjasi rajan muotoon 'enintään 70 vuotta sitten', jotta vuosiluku ei vanhene; sääntö koskee maita, joissa rakennusten kuvausvapautta ei ole. Tilan takia 11.8:sta poistettu esimerkit: 'esim. Christon käärity Pont Neuf ja Epsteinin Wilden hautamuistomerkki'. Ei omistajan sana.

## RAAMATTU 2.215: KADONNEET AARTEET PYOREINA KUVINA (KK 6.11.2026) (6.11.2026 klo 02.42)

KK pyysi: kohdassa luki yhä 'jäävät leikattuina kuvina (2.11. klo 08.31 pysyy)', vaikka omistajan kortti 5.11. klo 21.07 on 'Pyöreä kuva' (7551a76cc). KK ja NUI luulivat pyöreää kuvaa vian takia. Korjattu uudempaan: 'jäävät pyöreinä kuvina (21.07)'. Faktakorjaus, ei uusi sääntö.

## RAAMATTU 11.8: MONTPARNASSE, POMPIDOU JA TALOKERROS POIKKEUKSINA; JUOKSUPELIN OVET (OMISTAJA 6.11.2026 KLO 06.55) (6.11.2026 klo 06.56)

OMISTAJAN KORTIT KK:n välityksellä, sanatarkasti: 'Tehdäänkö Tour Montparnasse poikkeuksena kuten Louvren pyramidi?' = 'Tehdään (Suositus)'. 'Tehdäänkö Pompidou-keskus poikkeuksena?' = 'Tehdään' (KK suositti: Ei tehdä). 'Poistetaanko tunnetusti suojatut talot Pariisin talokerroksesta?' = 'Jätetään laatikoina' (KK suositti: Poistetaan). 'Aukeavatko juoksupelin ovet sisäänpäin?' = 'Sisäänpäin (Suositus)'. KK kertoi riskin ennen korttia: voi joutua pois ennen App Storea, joten kaikki kolme tarkistuslistalle ja 11.8:n poikkeuksiin. Kuudesta poistetusta sillasta KK kysyy erikseen; ei palautusta ennen vastausta. PT tiivisti tilan vuoksi 11.8:n kaksi lausetta (kaupunkilista lyhennetty), oikaisi 11.10:n Pompidou-esimerkin ja poisti 2.215:stä lauseen 'Pieni iPad päivitetään, kun nämä ovat kasassa (2.214)', koska se on ristiriidassa saman kohdan uudemman omistajan linjauksen 5.11. klo 19.26 kanssa ('pienelle iPadille ei asenneta').

## OMISTAJA 6.11.2026 KLO 06.58: SILLAT, TASAINEN KARTTA, HAIVYTYS, OVET ULOSPAIN (6.11.2026 klo 06.59)

OMISTAJAN KORTIT KK:n välityksellä, sanatarkasti: 'Palautetaanko kuusi suojattuna poistettua siltaa Pariisiin poikkeuksena?' = 'Palautetaan (Suositus)'. 'Tasoitetaanko Pariisin kartta keskustassa?' =
'Tasoitetaan (Suositus)'. 'Kelpaako kartan uusi häivytys horisontissa?' = 'Kelpaa (Suositus)'. 'Tuodaanko Pariisin talot lähemmäs nähtävyyksiä?' = 'En osaa sano' (EI PÄÄTÖSTÄ; talojen raja ennallaan,
KK ehdottaa yhtä koekuvaa Notre-Damen rajalta, päätös kuvasta). OVET, KUMOAA 06.55:n SISÄÄNPÄIN: 'Anteeksi ulospäin aukeava ovi olisi parempi'. KK:n tavoite: ovet ulospäin ilman lehden reunan tummia
piikkejä, ja kamera katsotaan, koska lehti vie pysähdyksessä ison osan ruudusta. Sillat: VS palauttaa poistot, 11.8:n poikkeuksiin ja App Store -listalle. Tasainen kartta oletukseksi vasta, kun talot,
nimet ja merkit on sovitettu samaan maahan ja Sacré-Cœurin mäki ja pohja tarkistettu. TILAN VUOKSI PT siirsi Raamatusta tänne: 11.8:n sitaatti 13.10.2026 klo 06.57 'Ei tämä ole kaupallista kuvaamista'
ja 11.17:n 'Ideat hautumaan: pelinappula-avatarit (pöllö, kotka, hevonen), kauppa ja tuunatut linssit; Vanhin maailmankuva -linssi (1500-luvun projektio pallon päällä).'

## OMISTAJA 6.11.2026 KLO 08.13: MONTPARNASSEN LASIPINTA JA NOTRE-DAMEN KORTTELIKOE (6.11.2026 klo 08.14)

OMISTAJAN KORTIT KK:n välityksellä, sanatarkasti: 'Kelpaako Tour Montparnassen lasipinta kokeena?' = 'Kelpaa kokeena (Suositus)' (kortin selite: Reunus korjataan, ja pinta jää tällaiseksi toistaiseksi.). 'Kokeillaanko Notre-Damen ympärille kortteleita ja taloja Seinen rantaan asti?' = 'Kokeillaan (Suositus)' (kortin selite: Vain koe. Näytän parin ennen päätöstä.). KK:n tavoite: sumea alue ja talojen raja katoavat, eikä saari, aukio tai kirkon paikka muutu. KS rajaa pohjakuvan rantaan, NS tuo talot rantaan samalla palojen teolla; pari nd-raja + ylhäältä, nykyinen | koe, ei omaa ajoa. Talojen raja pysyy oletuksena ennallaan, kunnes omistaja päättää. Lasipinnan koe alkoi omistajan sanasta 07.25 (PT:n luovutus 07.40; sanatarkkaa sanaa ei ole tässä). Raamattua ei muutettu: molemmat ovat kokeita, ja Raamatussa on tilaa 28 tavua; lopullinen päätös kirjataan 2.215:een tiivistyksen jälkeen.

## OMISTAJA 6.11.2026 KLO 08.20: CONCORDEN AUKIO KOKEENA UUDELLA KARTALLA (6.11.2026 klo 08.2x)

OMISTAJAN KORTTI KK:n välityksellä, sanatarkasti: 'Kokeillaanko pallon omaa Concorden aukiota uudella kartalla?' = 'Kokeillaan (Suositus)' (kortin selite: Vain koe. Näytän kuvan viat kerrottuina, kun se on valmis.). KK:n tavoite: aukio seisoo kartalla oikeissa mitoissa kuten ohjelmakohteet; malli on pallon oma, ilman Googlea (lähteet _tyo/linssiseppa2/concorde-lahdepaketti.md). Riskit kerrottu: pinnat eivät ehkä sovi piirrettyyn karttaan, obeliski voi jäädä ohueksi. Seuraavaan yhteiseen ajoon, ei omaa ajoa, ei junaan; tekijä VS (PT). KK:n vastaus: pallon koko maailmaa ei tuoda kartalle, eikä 18 Blender-mallia tehdä. Raamattua ei muutettu: koe.

## RAAMATTU 2.215: NOTRE-DAMEN RANTAKOE KÄYTTÖÖN (OMISTAJA 6.11.2026 KLO 08.40) (6.11.2026 klo 08.4x)

OMISTAJAN KORTTI KK:n välityksellä, sanatarkasti: 'Otetaanko Notre-Damen rantakoe käyttöön?' = 'Otetaan käyttöön (Suositus)'. KK:n tavoite: Notre-Damen ympärillä korttelit ja talot jatkuvat Seinen rantaan, sumea alue on poissa, saari, aukio ja kirkko ennallaan. Rantojen tunnetut rakennukset jäävät laatikoiksi (06.55); omistaja tietää tämän. Kuvat scratchpad/keskustelukanava/kuvat/yhteinen-3-382618036/. Kumoaa 08.13:n 'raja oletuksena ennallaan' tältä osin. TILAN VUOKSI PT siirsi 2.215:stä tänne: sitaatit alustoista 13.51 "riemukaaresta koko aukio" ja 13.54 "sininen mielestäni liian pieni koska ympäristö hyvä muokata myös" sekä lause "Panthéonin ja Riemukaaren pohjakorjaus fd711e501 on pikakorjaus, ei lopputulos."

## CONCORDEN AUKIO KOKEENA ILMAN MALLIN OMAA MAATA (OMISTAJA 6.11.2026 KLO 09.07) (6.11.2026 klo 09.0x)

OMISTAJAN KORTTI KK:n välityksellä, sanatarkasti: 'Kelpaako Concorden aukio kokeena ilman mallin omaa maata?' = 'Kelpaa kokeena (Suositus)'. KK:n tavoite: obeliski, suihkulähteet ja pylväät kartan päällä ilman harmaata maata; ei junaan; muisti mittaamatta; Lähteet-rivi, jos jää peliin. Kuvat scratchpad/keskustelukanava/kuvat/yhteinen-4-0b4d74011/. PT välitti Valosepälle seuraavaan yhteiseen ajoon.

## LOUVREN YMPÄRILLE KORTTELIT JA TALOT KOKEENA (OMISTAJA 6.11.2026 KLO 09.20) (6.11.2026 klo 09.2x)

OMISTAJAN KORTTI KK:n välityksellä, sanatarkasti: 'Louvren ympärillä on litteä alue, koska hyväksymällesi alueelle ei ole vielä maalausta. Kokeillaanko sen tilalle kortteleita ja taloja, kuten Notre-Damella?' = 'Kokeillaan (Suositus)'. Kokeena, ei junaan, seuraavaan yhteiseen ajoon. Kumoaa 5.11. klo 08.11:n ison alueen v2:n vain kokeen ajaksi; Codexin pohjaa ei tilata sen aikana. KS tekee maskin, NS uuden kansion. Omistajalle kerrottu: tunnetut voivat näkyä tavallisina taloina, talot voivat osua malliin pohjoissivulla, enintään 942 taloa lisää.

## PARIISIN TALOJEN UUDET KATOT KOKEENA (OMISTAJA 6.11.2026 KLO 09.30) (6.11.2026 klo 09.3x)

OMISTAJAN KORTTI KK:n välityksellä, sanatarkasti: 'Kelpaavatko Pariisin talojen uudet katot kokeena, vaikka noin 17 700 taloa saa tasakaton, myös osa kirkoista?' = 'Kelpaa kokeena (Suositus)'. Palat-v6 jää, ei junaan. Omistajalle kerrottu myös pienten talojen sääntö PT:n sanana; hän ei pysäyttänyt sitä, mutta ei erikseen hyväksynytkään. Kuvat scratchpad/keskustelukanava/kuvat/yhteinen-5-c0bfef077/.

## UNITY-BEETA 6000.7.0b8 KÄYTTÖÖN (OMISTAJA 6.11.2026 KLO 09.32) (6.11.2026 klo 09.3x)

OMISTAJAN PYYNTÖ KK:n välityksellä, sanatarkasti: 'ota unityn uusin beta käyttöön mahd. pian. mitä siinä on uutta?'. KK:n tavoite: pelin ajot ja haarat kulkevat b8:lla heti, kun addae63f2:n käännös, tarkistus ja testit ovat läpi ja yksi lyhyt Mac-kuvasarja näyttää samalta kuin b7:llä; käynnissä olevia ajoja ei pysäytetä. PT:n tulkinta ristiriidasta 6.3 (iPadin muistiajo beetan testikäännöksessä) ja 2.209 (ei iPad-ajoja eikä muistimittauksia juoksupelissä ja Pariisissa ennen valmista): uudempi 2.209 ja tämä pyyntö voittavat tällä kertaa; b8:n muistia ei mitata ennen loppumittausta, ja se on mitattava iPadilla ennen seuraavaa TestFlightiä. KK kertoo riskin omistajalle. 6.3:n App Store -ehto (vain lopullinen versio) ja K63 ennallaan.

## LOUVREN KORTTELIT JA TALOT JÄÄVÄT KOKEENA (OMISTAJA 6.11.2026 KLO 10.04) (6.11.2026 klo 10.0x)

OMISTAJAN KORTTI KK:n välityksellä, sanatarkasti: 'Louvren talokokeessa talot tulevat mallin viereen pohjoisessa ja idässä, ja kolme vikaa jää korjattavaksi. Jätetäänkö korttelit ja talot Louvren ympärille?' = 'Jätetään (Suositus)'. Talot pysyvät kokeena, eivät junassa; Codexin isoa pohjaa ei tilata nyt, ja työlistan 'Louvren iso pohja' on pois työn alta. Korjattavat: Les Hallesin 2 porrasreunaista korttelia, Palais-Royal'n läikkä, litteä kaista mallin ja Seinen välissä. Tavoite: Louvre seisoo kaupungissa kuten Notre-Dame, ilman litteitä kohtia näkyvissä. Kuvat scratchpad/keskustelukanava/kuvat/yhteinen-6-251af3c48/. PT välitti KS:lle ja NS:lle seuraavaan yhteiseen ajoon.

## KARTTAPALETTI V2: TUNNISTUSVÄRIT HAALISTETTUINA (OMISTAJA 6.11.2026 KLO 10.32 JA 10.40) (6.11.2026 klo 10.4x)

Omistaja klo 10.32 KK:n välityksellä, sanatarkasti: 'pelille olisi hyvä tehdä tätä peruskarttaa varten oma väripaletti, jonka sisällä kaikkien näytöllä näkyvien kohteiden pitäisi pysyä.' OMISTAJAN KORTTI klo 10.40, sanatarkasti: 'Miten nähtävyyksien tunnistusvärit, kuten Pompidoun punainen ja sininen sekä pyramidin sininen, käsitellään?' = 'Näytteen tapaan (Suositus)'. Yksi paletti tyylikirjaan, sääntö tuontiporttina, Pariisi ensin uuteen versiokansioon. Korvaa Raamatun 4.40:n 15.10. tekstin ja 3d-maamerkki.md:n kohdan 35 maamerkkien seepiarampin. Tekijä KS, koodilla värjätyt VS; ei junaan. Suunnitelma KK:n scratchpad/keskustelukanava/suunnitelmat/20261106-karttapaletti.md. Raamattuun kirjattu; 2029-paletin 'ei sinistä' väistyy tunnistusvärille.

## NÄHTÄVYYDET JA PUUT SAMAAN USVAAN, PALIKKAKIRJASTON KOE (OMISTAJA 6.11.2026 KLO 10.47) (6.11.2026 klo 10.5x)

OMISTAJAN KORTTI KK:n välityksellä, sanatarkasti: 'Häipyvätkö nyt myös nähtävyydet ja puut samaan usvaan kuin talot?' = 'Samaan usvaan (Suositus)'. Kumoaa 5.11. klo 21.28:n; kaukaiset nähtävyydet eivät enää erotu horisontissa. Lisäksi loivennus (10.29): häivytys alkaa aiemmin, loppu pysyy. Toteutus pikseleittäin mallien varjostimiin, ei koko ruudun kerrosta. Tekijä VS, seuraavaan yhteiseen ajoon, ei junaan.

OMISTAJAN PYYNTÖ klo 10.47 kortilla 'Miten kevyt puumalli tehdään?', sanatarkasti alku: 'tutki kaikki tavat ja tee koe. eli kokeile myös GPU Resident Drawer ja Mesh LOD. selvitä myös maksulliset mallit.' Koe laajenee puista rakennuspalikoihin (valotolpat, sillat, mastot, rakennukset), jotka sopivat mahdollisimman monen maailman kaupungin käyttöön; muistitestejä ei ajeta. KK: tutkimus ensin (suunnitelmat/20261106-rakennuspalikat-tutkimus.md), kokeen tekijä PT:ltä sen jälkeen. Ostokielto pysyy: maksulliset selvitetään, osto vain omistajan kortilla. Puiden pienennys odottaa koetta.

## PALIKKAKIRJASTO: EUROOPPA JA MOSKEIJA ENSIN (OMISTAJA 6.11.2026 KLO 11.22) (6.11.2026 klo 11.2x)

OMISTAJAN KORTTI KK:n välityksellä, sanatarkasti: 'Rakennuspalikkakirjaston kokeen jälkeen: mistä palikoista kirjasto aloitetaan?' = 'Eurooppa ja moskeija (Suositus)'. Muut maanosat lisätään samaan kirjastoon, kun niiden vuoro tulee. Ei ostoja nyt (KK:n suositus kerrottu, ostokielto ennallaan). Koe etenee KK:n suunnitelman 20261106-rakennuspalikat-tutkimus.md osan E mukaan, tekijä NS, haara natiiviseppa/palikka-koe, ei junaan. KK:n tulkinta 10.47:n pyynnöstä: koe saa käyttää isoa iPadia nopeuteen poikkeuksena 2.209:ään, koska Mac käyttää eri piirtotapaa; omistajalle kerrottu. Muistimittauksia ei ajeta.

## PIENI IPAD ON STUDIOLLA, ISO ON RAJOITTAVA (OMISTAJA 6.11.2026 KLO 11.2x) (6.11.2026 klo 11.3x)

OMISTAJAN OIKAISU KK:n välityksellä, sanatarkasti: 'pieni iPad on myös studiolla, olen siis yleensä paikalla aina virkan aikaan ja silloin myös pieni iPad yleensä käytettävissä, jos siitä on apua. mutta teknisesti se on uudempi joten jos pyörii isolla ipadilla niin pyörii varmasti myös pienellä. sitä voi lähinnä käyttää jos on tarve ajaa kahdella yhtä aikaa.' KK: kumoaa 5.11. klo 19.26:n tulkinnan 'pieni kotona' ja käsityksen, että pieni olisi rajoittava laite. Palikkakokeen nopeusmittaus isolla riittää; pieni kahteen rinnakkaiseen ajoon. Raamattu 9.11. PT: 9.13:n muistirajaa (iso hälyttää pienen rajalla) ei tällä muutettu, vaikka perustelu saattaa muuttua; ei tarkistettu.

## PEUKALOKOHDAT VAIN ALUSSA, PALETTI KUUTEEN MALLIIN, SACRÉ-CŒURIN NURMI (OMISTAJA 6.11.2026 KLO 11.39) (6.11.2026 klo 11.4x)

OMISTAJAN KORTTI KK:n välityksellä, sanatarkasti: peukalokohdat 'vain alussa ja silloin ne voisivat olla pyöreät ympyräviivat, jotka näkyvät silloin selkeämmin'; paletti kuuteen malliin 'Otetaan (Suositus)'; Sacré-Cœurin mäen nurmi kartan nurmen väriin 'Viedään (Suositus)'. KK: peukalopäätös kumoaa 21.10. klo 08.58:n ja 11.22:n tavallisen tilan osalta; kokemus: selvä rengas alussa, ensimmäisen ohjauksen jälkeen puhdas kuva; opetuksen syke ja rimpuilun hehku ennallaan. Tekijät: peukalot PK; nurmi KS, kokeena. Kuvat KK:n kansioissa peukalo-c9db47578 ja yhteinen-8-b8-1347410ca.

## PIENENNETTY TRIPO-PUU RAKENNUSPALIKKAKOKEESEEN (OMISTAJA 6.11.2026 KLO 12.42) (6.11.2026 klo 12.4x)

OMISTAJAN KORTTI KK:n välityksellä, sanatarkasti: 'Otetaanko pienennetty Tripo-puu rakennuspalikkakokeen seuraavaan kuvapariin pallopuun tilalle?' = 'Otetaan (Suositus)'. Omistaja kysyi ensin: 'onko puiden tekemiseen vielä eri vaihtoehdot kokeilussa vai onko tuo jo lukittu malli joka näkyy viimeisimmässä kuvassa?'; KK kertoi, ettei ole lukittu. Kokemus: seuraavassa parissa oikean puun näköinen puu pallon sijaan; nykyiset neljä puuta kevennettynä, ei uusia Tripo-ottoja. Tekijä VS (PT), NS kytkee kokeeseen. KK: puiden pienennys ei enää odota koetta.

## NIMIKYLTTIEN KOKO JA NÄKYMISEN ETÄISYYS KELPAAVAT (OMISTAJA 5.11.2026 KLO 20.08; KIRJATTU JÄLKIKÄTEEN) (6.11.2026 klo 12.56)

OMISTAJAN KORTTI KK:ssa, sanatarkasti: 'Kelpaavatko nimikylttien koko ja näkymisen etäisyys?' = 'Kelpaa (Suositus)'. Pyyntö, johon kortti vastasi (klo 19.23): 'nimikyltit pitää olla pienemmällä, näkyvät vasta kun mennään lähemmäs rakennusta'. Lähde: keskustelut/Keskustelukanava-2026-11-05-klo-1944-2044.md rivit 82–86 (PT tarkisti). Kuvat: kuvat/kyltit-013655981/. Rajaus: kortti koskee kuvia, ei pelin liikettä. Nimien katoaminen ja kulku rakennusten yli jatkuu erikseen Natiivi-UI:lla, työlistarivi 'Pariisin nimet: katoaminen ja rakennusten yli kulku'.

## TRIPO-PUUT HILLITYMMIN, KAPEITA TUMMIA VÄHEMMÄN (OMISTAJA 6.11.2026 KLO 13.41) (6.11.2026 klo 13.42)

OMISTAJAN KORTIT KK:n välityksellä, sanatarkasti (kuvat/puut-tripo-mac6): 'Mikä väri Tripo-puille tulee?' = 'Hillitymmin (Suositus)' (tummimmat puut hieman vaaleammiksi ja lämpimämmiksi); 'Vähennetäänkö kapeita tummia puita?' = 'Vähennetään (Suositus)' (enemmän pyöreitä puita). Kokemus (KK): puut asettuvat kartan väreihin, mutta pysyvät eläväisempinä kuin korttipuut. Rajaus: kokeena, ei junaan, ei uusia Tripo-ottoja. NS tekee; uusi pari KK:lle ajosta, jossa on myös Hôtel de Villen ranta; iPad 3 mittaa hinnan tällä värillä ja puusuhteella, jos se mahtuu vuoroon.

## TRIPO-PUIDEN VÄRI JA SUHDE KELPAAVAT (OMISTAJA 6.11.2026 KLO 14.28) (6.11.2026 klo 14.3x)

OMISTAJAN KORTTI KK:n välityksellä, sanatarkasti (kuvat/puut-tripo-mac9): 'Kelpaavatko puiden väri ja suhde nyt?' = 'Kelpaavat (Suositus)'. Väri ja puiden suhde jäävät Mac-8:n ja Mac-9:n tasolle; koe, ei junaan. Kerrottu samalla: laatta, puut ja tolpat vedessä, Pont Neufin tolpat ja vaalea raita, tolppien katkoviiva; NS korjaa v6:een ennen iPad 3:a. iPad-hinta ja lähin puutaso mittaamatta.

## KEVYET MALLIT KOKEENA PELIIN (omistaja 6.11. 15.03, KK:n kautta) (6.11.2026 klo 15.13)

Omistaja: "codexilta tulee riemukaari ja notredame jotka voi vielä peliin ja kokeilla miltä näyttää". Codexin paketti posti/codex-pariisi-lod-toimituspari-20261106 (090c134f8, 3875473dc): Notre-Dame 1 446 ja Riemukaari 1 128 kolmiota, PT tarkisti SHA:t ja kolmiomäärät. Kokeena, ei junaan; nykyiset pelimallit säilyvät palautusta varten; KS tekee parin nykyinen | uusi ylhäältä, 45° ja 5°. Codexin ohjeessa "korvatkaa", toimitaan omistajan sanan mukaan. Kuittaukset 1 ja 3 postissa e13f1ca8a.

## OMISTAJAN VALTUUS KK:LLE KUVAUKSEN AJAKSI (omistaja 6.11. 14.29) (6.11.2026 klo 15.13)

Omistaja KK:lle: "saat hyväksyä puolestani kaiken, olen kuvaamassa". Rajat KK:n kirjaamana kuten yövaltuudessa: vain omistajan aiempia sanoja vasten; ei TF-julkaisua, junan lukitusta, ostoja, asetuksia, avaimia, CLAUDE.md-muutoksia, poistoja eikä suuria ääniajoja; nollaus vain omistajan sanalla. Voimassa, kunnes omistaja palaa keskusteluun tai sanoo toisin. Kirjaukset scratchpad/keskustelukanava/paiva-hyvaksynnat-20261106.md.

## VALTUUS KK:LLE PÄÄTTYI (6.11.2026 klo 15.51)

Omistaja 6.11.2026 klo 15.51 (KK): kortti "Jatkuuko valtuus hyväksyä puolestasi?" = "Päättyy nyt (Suositus)". Klo 14.29:n valtuus päättyi; roolien kuvat ja mallit taas omistajan korteilla KK:n kautta. Valtuudella tehdyt hyväksynnät: scratchpad/keskustelukanava/paiva-hyvaksynnat-20261106.md.

## KEVYIDEN MALLIEN VIAT CODEXILLE (6.11.2026 klo 15.57)

Omistaja 6.11.2026 klo 15.55 (KK): kortti "Viedäänkö Notre-Damen ja Riemukaaren viat Codexille?" = "Viedään (Suositus)". Nykyiset mallit pysyvät, koe ei junaan. Viat: scratchpad/keskustelukanava/kevyet-mallit-viat-20261106.md; kuittaus 2 ja korjauspyyntö postilaatikkohaarassa.

## PEUKALORENKAAT EIVÄT VIELÄ KELPAA (6.11.2026 klo 16.00)

Omistaja 6.11.2026 klo 15.58 (KK): kortti "Kelpaavatko peukalorenkaat?" (PK 76840f429) = "Ei vielä"; syy ei vielä tiedossa, KK kysyi omistajalta. PK: ei lisäajoa eikä muutoksia ennen hänen sanojaan.

## PEUKALORENKAAT LUONNOKSEN SUUNTAAN (omistaja 16.05) (6.11.2026 klo 16.05)

Omistajan kortti KK:n kautta klo 16.05: "Tehdäänkö peukalorenkaat tämän luonnoksen suuntaan?" = "Tähän suuntaan (Suositus)". Kumoaa 15.58:n "ei vielä". Toteuttaa Pelikoodari; luonnos KK:n kansiossa scratchpad/keskustelukanava/kuvat/renkaat-luonnos-20261106/.

## ETÄYHTEYS VAIN KESKUSTELUKANAVALLA (omistaja 16.08) (6.11.2026 klo 16.11)

Omistaja 6.11.2026 klo 16.08 (KK): kortti "Missä etäyhteys on päällä?" = "Vain tässä keskustelussa (Suositus)". Korvaa Raamatun 7.9:n "kaikissa sessioissa". PT korjasi 7.9, 7.30, 7.37, 12.9, NOLLAUS.md, tilinvaihto.md ja PT:n aloitusviestin, ja kytki etäyhteyden pois KS:ltä, PK:lta, VS:ltä, LAV:lta ja Asemataululta.

## POMPIDOUN SIKSAK RIITTÄÄ (omistaja 16.08) (6.11.2026 klo 16.11)

Omistaja 6.11.2026 klo 16.08 (KK): kortti "Riittääkö Pompidoun siksak tällaisena?" = "Riittää (Suositus)" (pari yhteinen19-e5cd281f1). VS:lle kerrottu.

## PEUKALORENKAAT KELPAAVAT (omistaja 16.20) (6.11.2026 klo 16.21)

Omistaja 6.11.2026 klo 16.20 (KK): kortti "Kelpaavatko peukalorenkaat näin?" (PK 8dfc13aaf, kuvat esikatselu-20261106-160909 ja -161433) = "Kelpaavat (Suositus)". Avoimeen junaan, kun iPhonen 10 pt:n turva-aluesiirto on tehty; PK:lle kerrottu. Näkemättä, omistajalle kerrottu: häivytys liikkeessä, oikea laite.

## SEINEN LITTEÄT MUODOT POIS (omistaja 16.46) (6.11.2026 klo 16.47)

Omistaja 6.11.2026 klo 16.46 (KK): kortti "Saavatko Seinen litteät punertavat muodot lähteä kartalta, myös Bercyn suurempi, sijainnista päätellen uimala?" = "Kaikki pois (Suositus)". Selite: laivat, uimala ja muut isot litteät muodot lähtevät joesta; Karttaseppä katsoo isot kuvista ensin, ettei oikea rakennus lähde. Tavoite: Seine näyttää vain vedeltä. Kuva KK:lle ja omistajalle ennen junaa. Kumoaa 09.3x:n "litteät muodot jäävät". Auki ja omistajalle kerrottu: haalea raita (syy auki), koko jokea ei kuvattu, 15/63 palaa laskematta, koko maailman uudelleenpiirto selvitetään paikalliseksi kuten -sillat1.

## KEVYET MALLIT EI VIELÄ (omistaja 16.53) (6.11.2026 klo 16.54)

Omistaja 6.11.2026 klo 16.53 (KK): kortti "Kelpaako Codexin korjattu Notre-Dame nykyisen tilalle kokeena?" = "Ei vielä (Suositus)": nykyinen pysyy; katon hahmo ylhäältä, irralliset tuet ja tornien vaaleat tikkaat viedään Codexille (#2168). Kortti "Kelpaako Codexin korjattu Riemukaari nykyisen tilalle kokeena?" = omat sanat "riemukaaren sisäosa ei näytä oikealle"; KK:n tulkinta, hänelle kerrottu: ei vielä, nykyinen pysyy, sisäosa Codexille (#2169). Seuraava versio: KS:n pari, KK, omistaja.

## PALIKOIDEN IPAD-MITTAUS ODOTTAA (omistaja 17.05) (6.11.2026 klo 17.06)

Omistaja 6.11.2026 klo 17.05 (KK): kortti "Rakennuspalikoiden iPad-mittaus pysähtyi muistivahdin varmuusrajaan, joten korvaamisen hinta jäi mittaamatta. Miten jatketaan?" = "Mittaus odottaa (Suositus)". Nykyiset talot ja vahti pysyvät. Mittaus uusitaan, kun Pariisi on valmis ja muistia on kevennetty; Macin kuvat jatkuvat. Hylätyt: yksi ajo rajan yli, kevennys nyt. Ei uusia palikka-ajoja iPadilla. Tieto: 4 080 Mt on 80 % noin 5 100 Mt:n kaatorajasta (Raamattu 9.4), vara 44-66 Mt koskee varmuusrajaa, loppumittauksessa raja voi ylittyä ilman palikoitakin.

## OFF PARIS SEINE LÄHTEE (omistaja 17.08) (6.11.2026 klo 17.08)

Omistaja 6.11.2026 klo 17.08 (KK): kortti "Lähteekö Seinen kelluva hotelli Off Paris Seine kartalta muiden litteiden muotojen mukana?" = "Lähtee (Suositus)". Tarkentaa päätöstä 16.46 (SEINEN LITTEÄT MUODOT POIS); KS:llä (6a037d9bc, ajo 24).

## PEUKALORENKAAT LÄPIKUULTAVINA JUNAAN (omistaja 17.16) (6.11.2026 klo 17.17)

Omistaja 6.11.2026 klo 17.16 (KK): kortti "Kelpaavatko juoksupelin ohjausrenkaat näin läpikuultavina?" = "Kelpaavat (Suositus)": renkaat menevät avoimeen junaan tällä läpikuultavuudella. PK 36aa43ed3, kuvat scratchpad/keskustelukanava/kuvat/renkaat-36aa43ed3/; junan SHA tulee PK:lta. Omistajalle kerrottu: vaalealla pohjalla heikoin, punaisella punertava vivahde, iPhonella koko ennallaan, häivytys liikkeessä ja oikea laite näkemättä.

## SEINEN KÄVELY- JA METROSILLAT OHUINA VIIVOINA (omistaja 17.24) (6.11.2026 klo 17.24)

Omistaja 6.11.2026 klo 17.24 (KK): kortti "Piirretäänkö Seinen yli kulkevat kävely- ja metrosillat Pariisin kartalle ohuina viivoina?" = "Piirretään (Suositus)". Selite: vain veden yllä olevat sillat tulevat ohuina viivoina, pienet kadut pysyvät poissa, ja kuva näytetään ennen junaa. Syy: kartan linjaus k52 (Passerelle Simone de Beauvoir, Austerlitzin ratasilta; muita ei laskettu). Kokeena, KS:llä; ei junaan ennen kuvaa KK:lle ja omistajalle. Pienet kadut (kortti 4.11. 06.51) pysyvät muuten poissa.

## PÄÄTILIN RAJA 92 % VAHVISTETTU (omistaja 17.30) (6.11.2026 klo 17.32)

Omistaja 6.11.2026 klo 17.30 (KK): "tämän tilin voi käyttää 92% asti". Vahvistaa Raamatun 12.21, ei sääntömuutosta. KK antaa 85 %:n TOIMI-listan; vaihto tilille vvi@vvi.fi, siirtoviesti KK:n kautta 90 %:n luovutusten jälkeen.

## NÄHTÄVYYKSILLE PIENET KOVAT VARJOT (omistaja 17.32) (6.11.2026 klo 17.35)

Omistaja 6.11.2026 klo 17.32 (KK): "nähtävyyksille pitää tehdä pienet kovat varjot jotta istuvat paremmin karttaan. toki osassa lähiympäristö vaatii myös korjaamista." KK:n tavoite: nähtävyys seisoo kartalla kuin painetussa kuvakartassa: pieni terävärajainen varjo maassa samaan suuntaan kaikilla, väri kartan paletista, ei sumeaa läikkää. Korvaa 4.11. suunnitelman pehmeän varjon. Lähiympäristön viat kohteittain kuvin KK:lle.

## TF KUN PARIISI VALMIS, SITTEN LONTOO ILMAN TRIPOA (omistaja 17.33) (6.11.2026 klo 17.35)

Omistaja 6.11.2026 klo 17.33 (KK): "lähden kotiin. julkaise TF kun pariisi valmis ja siirry sitten tekemään lontoota. sen voisi tehdä ensin kokonaan ilman tripoa ja kokeilla kuinka hyvän siitä saa sillä tavalla ja kuinka nopeasti se menee." KK:n kapea tulkinta (kerrotaan omistajalle): TF ei lähde ennen KK:n korttia "Pariisi valmis" (lupaus 5.11. 19.2x). Lontoolle ei töitä ennen KK:n suunnitelmaa; aika kirjataan aloituksesta; ei Tripo-tilauksia Lontoolle. Korvaa 5.11. 11.15 "sama toteutus lontoolle kuin pariisiin" kokeen osalta. Omistaja lähti Macilta 17.33.

## TILINVAIHTO KOTOA (omistaja 17.36) (6.11.2026 klo 17.37)

Omistaja 6.11.2026 klo 17.36 (KK): kortti tilinvaihdosta = "Vaihdan kotoa (Suositus)": hän vaihtaa näytön jaolla, kun KK tuo siirtoviestin. Työt jatkuvat; 90 %:ssa luovutukset ja siirtoprompti (vvi@vvi.fi) KK:lle. Tilin raja kysytään kortilla siirtoviestin kanssa.

## TAIVAS: YKSI CODEX-LUONNOS (omistaja 17.36) (6.11.2026 klo 17.37)

Omistaja 6.11.2026 klo 17.36 (KK): kortti taivaasta = "Teetetään (Suositus)": yksi Codex-luonnos, KK tilasi postilla 9398634e5. Ei pelityötä ennen omistajan sanaa.

## RIEMUKAARI KOKEENA, NOTRE-DAME EI VIELÄ, PONT D'IÉNA KAISTANA (omistaja 18.09) (6.11.2026 klo 18.09)

Omistaja 6.11.2026 klo 18.09 (KK, kortti): Riemukaari #2172 = "Kelpaa (Suositus)": nykyisen tilalle kokeena, ei junaan. Notre-Dame #2171 = "Ei vielä (Suositus)": nykyinen pysyy, viat Codexille (KS). Pont d'Iéna = "Vaalea kaista (Suositus)": kokeillaan ajosillan tapaista kaistaa, kuva KK:lle. Tarkentaa päätöstä 17.24 Iénan osalta.

## TILINVAIHTO ALKAA (omistaja 18.23) (6.11.2026 klo 18.28)

Omistaja 6.11.2026 klo 18.23 (KK): "Paras olisi noiden kahden väliltä. Tehdään tilisiirto jo nyt tämän muutoksen jälken". KK:n tulkinta: muutos = taivaan väliversion kuvaluonnos, pelikoe uudelle tilille. Tilinvaihto vvi@vvi.fi alkoi heti, ei 90 %:ssa; viikko 88 % 18.26. Siirtoprompti viesti-fable-siirtoprompti-20261106.md, luovutus -1830.

## TILINVAIHTO vvi@vvi.fi 6.11. (6.11.2026 klo 18.45)

Omistajan siirtoprompti 6.11. Uusi tili vvi@vvi.fi (org b408744a, koodaustili, viikko 0 % klo 18.39). Tämän tilin sessiot tyhjennetty ja käytössä, taulu Qo5w6Wk4JSYRwYbyf2fJrm. Todettu: kotikansioajo 5.11. 21.07 vei Postivahdin kansion koti-haaraan ja KIERROS.md, NOLLAUS.md ja codex-odottaa.py katosivat juuresta; palautettu main-peilistä ja työkalu ohittaa Matkakirja-postin. Sovellus kytkee etäyhteyden itse käynnistyvälle sessiolle; PT kytki pois 9 roolilta, KK:lle jää (omistaja 6.11. 16.08). KS, VS ja PK jäivät kotikansiossa jälkeen omien tiedostojen takia; CLAUDE.md sama kuin mainissa.

## OHJEIDEN KOE 6.11.: 12.17:n vanha simulaattorirajaus pois (6.11.2026 klo 18.48)

Kokeen vastaus 9 nojasi 12.17:n vanhaan lauseeseen (omistaja 5.10.: simulaattoria vain vian toistoon), jonka 9.11 SIMU HARVOIN (omistaja 20.10.) korvasi. Vanha lause poistettu ja 12.17 viittaa kohtaan 9.11 (Raamattu 7.45, 14.2).

## OMISTAJAN PÄÄTÖKSET 6.11. 18.49 (KK) (6.11.2026 klo 18.50)

Tili vvi@vvi.fi: raja 99 % (Suositus): rivi 99 %:ssa, ei keventämistä eikä pysäytystä; Raamattu 12.21. Eiffelin reuna (ajo 28) Kelpaa (Suositus): saa avoimeen junaan; KK:n viestin sha 33ea85e3b on ajon 28 kärki eli mittausrivi 'ei junaan', ei itse korjaus; junaan vain Eiffelin reunan korjaus. Maalattu taivas #2178 Kokeillaan (Suositus): väliversio pelikokeeseen PT:n kautta; KK sopii muodon Valosepän kanssa ja tilaa Codexilta koko kierroksen.

## KOVAT VARJOT KELPAAVAT KOKEENA (omistaja 19.08) (6.11.2026 klo 19.09)

Omistaja 6.11.2026 klo 19.08 (KK): kovat varjot (ajo 28, 0ca5f68f6) "Kelpaavat (Suositus)", kokeena, ei junaan; viat kerrottu, korjataan. Hinta kerrottu arviona, ei iPadilta. Lähiympäristön lista (_tyo/linssiseppa2/kovat-varjot/ajo28/LISTA.md) rivin Nähtävyyksien lähialue puhtaaksi (omistaja 5.11. 08.52) alle, Karttaseppä; PT:n järjestys 19.09: talot kiinni nähtävyydessä, pinnat, yksittäiset. Valoseppä: varjon viat, ääriviivat, yksi iPad-mittaus; junaan vasta mitatulla luvulla ja omistajan sanalla.

## SAUMAT JA LAIKUT PURETTU (omistaja 19.57) (6.11.2026 klo 19.58)

Omistaja 6.11.2026 klo 19.57 (KK): "Tämän voi purkaa : Linjauksesi mukaan pysähdyksissä: Pariisin saumat ja laikut." KK:n kapea tulkinta katsauksesta 19.48: 5.11. 16.41:n seis poistuu vain saumoilta ja laikuilta. Metsän heikennys jää ennalleen, 3D-rakennukset kärjessä, rakentaminen ensin, ei iPad-mittauksia; mäkien varjostukseen sana ei ota kantaa. Tavoite: Pariisin kartalla ei näy reunaa tai laikkua, jossa kartan pala selvästi vaihtuu toiseen. Kuvat etenemisestä KK:lle heti (13.24). Raamattu 2.215.

## PARIISI VALMIS: RAJA HYVÄKSYTTY, KYMMENEN KOHTAA (omistaja, KK:n kortti) (6.11.2026 klo 20.29)

KK:n kortti 6.11.2026 klo 20.27: "Kelpaako tämä lista Pariisin valmiin rajaksi: kymmenen kohtaa tehdään, palikat ja uudet kohteet jäävät pois?" = "Kelpaa (Suositus)".

ENNEN KORTTIA PARIISI VALMIS: 1. Lähiympäristöt. 2. Kovat varjot (kevyempi muoto, Sacré-Cœurin varjo). 3. Taivas v2 pelikuvana, päätös omistajalle. 4. Usva: Louvren kulma, kaikki samaan usvaan. 5.
Saumat ja laikut; metsä ennallaan, jos korjaus vaatii metsää, kysymys omistajalle. 6. Kevyt Notre-Dame arvioitavaksi (#2175), Riemukaaren korjaukset Codexilla. 7. Seine: litteät pois ja ohuet sillat
kokeena, koko joki katsottava, Pont d'Iéna. 8. Kyltit ja nimet: välke ja nimien käytös liikkeessä. 9. Tärinä: iPad-ajo; jos origo auttaa, korjaus iso, päätös omistajalle. 10. Saapuminen ja pallo:
intro, aloituslento, Liiku, pallon korjaukset Macilla ja erillään.

LOPUKSI: kokeet yhteen, koko Pariisi kuvina, viat listana, kortti Pariisi valmis. Sen jälkeen ennen TF:ää iPad-testit ja muisti kerran (2.209), verkon palautus (2.209), kohdemaan lippu (4.42). TF:n
jälkeen Lontoo.

JÄÄ POIS: rakennuspalikat (iPad-mittaus odottaa, nykyiset talot pysyvät); uudet nähtävyydet (muiden mallien kevennys Codexilla ei estä valmista); metsän heikennys, Louvren iso pohja; koko kartan työt
2.209:n mukaan (muut Euroopan korjaukset, maakuntarajat, mäet, elävä kartta, muiden kaupunkien lisäykset); juoksupeli (KK:n tulkinta: TF odottaa vain Pariisia, tila ja viat kerrotaan ennen
TF-korttia).

SEURAUS: aloituslennon uudet kuvat (13.46: Eiffel, Riemukaari, Sacré-Cœur, Notre-Dame, Louvre) eivät enää seiso 5.11. 16.41:n takia; NUI kytkee ne vuorollaan, kokeena. TF vasta, kun koko Pariisi on
näytetty ja omistaja on vahvistanut kortilla "Pariisi valmis". Tavoite: pelaaja näkee yhden yhtenäisen Pariisin saapumisesta kartan rakennuksiin, ilman selviä vikoja, ja testiversio voi lähteä.

## RAAMATTU 2.215 TIIVISTETTY, KOKORAJA: LAINAUKSET SIIRRETTY LOKIIN (PT) (6.11.2026 klo 20.36)

Raamattu ylitti testin kokorajan 450 kt (main punainen). Sisältö ei muutu; sanatarkat lainaukset siirretty 2.215:stä tähän. Omistaja 5.11.2026 klo 14.55: "ei haittaa jos kartta menee viivaksi koska siinä näkyy kuitenkin 3d rakennukset. voidaan jättää vaikka 5 asteen kulma maksimiksi. ja tehdään horisontti niin että liikaa kohteita ei näy kerralla". Omistajan tarkoittamat pienet kohteet 14.51: kaaret, vaaka, pieni torni, pylväs ja laiva Notre-Damen vieressä. Omistaja 14.55 (kortti): "mitään pieniä malleja ei saa jäädä." Omistaja 14.57: "kadonneet aarteet voisi näkyä myös kuvina mutta kuvan vieressä voisi olla erilainen kyltti jossa tähti tai erilainen taustaväri josta tunnistaa että on kadonnut aarre"; "leikattuina kuvina" korvattu 21.07:n pyöreällä kuvalla.

## LONTOO ENSIN VAIN KOODILLA, ODOTTAA TF:ÄÄ (omistaja, KK:n kortti) (6.11.2026 klo 20.44)

KK:n kortti 6.11.2026 klo 20.41: "Tehdäänkö Lontoon nähtävyydet ensin pelkällä koodilla ilman Codexin kuvia ja malleja?" = "Ensin vain koodilla (Suositus)". Korvaa 2.213:n "KK kysyy uudelleen, kun Pariisi on valmis"; 17.33:n sanat pysyvät. Jos tärkeä kohde jää heikoksi, se tuodaan erikseen omistajalle.

Omistaja 17.33: "julkaise TF kun pariisi valmis ja siirry sitten tekemään lontoota. sen voisi tehdä ensin kokonaan ilman tripoa ja kokeilla kuinka hyvän siitä saa sillä tavalla ja kuinka nopeasti se menee."

Suunnitelma: KK:n scratchpad/keskustelukanava/suunnitelmat/20261106-lontoo-ilman-tripoa.md (korvaa kaupungit-avoimesta-datasta.md:n osat A-F). Ei roolien työtä ennen TF:ää. PT kirjaa ajan ensimmäisestä työstä alkaen. Tavoite: pelaaja näkee oikean Lontoon omilla paikoillaan ilman saumoja, ja omistaja voi Pariisin rinnalla päättää, kumpi tapa kannattaa muille kaupungeille.

## TÄRINÄKOE VIELÄ KERRAN, LOUVREN KULMAN USVA, KEVYT NOTRE-DAME (omistaja 20.58, KK:n kortit) (6.11.2026 klo 20.59)

KK:n kortit 6.11.2026 klo 20.58.

1) "Ajetaanko tärinäkoe vielä kerran niin, ettei hetkellinen muistipiikki pysäytä ajoa?" = "Yksi uusi ajo (Suositus)". Korvaa KK:n 19.37:n "keskeytys = ei uusintaa" vain tämän yhden ajon osalta. NS
kirjoittaa ehdot ja lukitsee ne ennen ajoa: piikki saa tulla vain esineiden uudelleenluonnissa; muisti takaisin alle 4 080 Mt ennen sarjan alkua; VIKA tai varoitus sarjan aikana, kaatuminen tai muu
keskeytys = EI TULOSTA, ei enää uusintaa. Samat kolme ikkunaa ja tulossääntö. Omistajalle kerrottu riski: sovellus voi kaatua. Jos ajo ei onnistu ilman koodimuutosta tai NS näkee esteen, rivi KK:lle
ennen ajoa. JU:n jonon loppuun. Tavoite: tiedämme, tärisevätkö rakennukset vähemmän, ennen kuin isosta korjauksesta päätetään.

2) "Kelpaako Louvren 45 asteen kulma kokeena näin vähäisellä usvalla?" = "Kelpaa (Suositus)". VS b3bff978f, koe, ei junaan. Omistajalle kerrottu: paljon pieniä nimiä yläreunassa, Opéran kyltti
painikkeiden alla, usva palaa nopeasti 60–70°, lataussäde mittaamatta.

3) "Viedäänkö kevyt Notre-Dame eteenpäin kolmella korjauksella: kivi himmeämmäksi, fleche vihreäksi ja tornit leveämmiksi?" = "Korjataan (Suositus)". KS: viat Codexille ja kiven sävy pelin puolelta,
jos se riittää. Tornien mittari G-kuva ja omistajan tilaus 1,25. Nykyinen pysyy, kunnes omistaja on nähnyt korjatun ja se kelpaa. Tavoite: kevyt Notre-Dame istuu kartalle Sainte-Chapellen rinnalla
eikä menetä tornien liioittelua.

Pont d'Iéna: näytetty, eteläpää pyöreä kerrottu; KS korjaa tai palaa, jos korjaus ei ole pieni.

## TÄRINÄKOE KOLMENA KÄYNNISTYKSENÄ (KK 21.08, EI OMISTAJAN SANA) (6.11.2026 klo 21.09)

KK 6.11.2026 klo 21.08, NS:n ehdotuksesta: omistajan 20.58 "Yksi uusi ajo" tehdään kolmena käynnistyksenä: A1, B ja A2 omissaan, muistivahti päällä, ilman uudelleenluontia ja piikin sallimista; ensin yksi Mac-ajo, lukitus, sitten iPad JU:n jonon loppuun. Korvaa 20.58-kirjauksen "piikki saa tulla". Syy (NS): samassa käynnistyksessä VIKA pysäyttää komennot käynnistyksen loppuun, ja iOS-varoitus muuttaa laattavalinnan B:lle ja A2:lle; korjaus vaatisi koodimuutoksen. Omistaja ei ole vielä kuullut tavan muutosta: seuraava KK kertoo sen hänelle.

## TÄRINÄKOE PERUTTU, TÄRINÄ POIS PARIISI VALMIS -LISTALTA (omistaja, KK:n kortti) (6.11.2026 klo 21.30)

Omistaja 6.11.2026 klo 21.2x (KK): "Tärinä ei voi liittyä muistiin tai suoritus kykyyn. Se on joku muu syy. Sen näkee tärinästä." ja "Siihen ei kannata liikaa käyttää aikaa koska en usko että se näkyy jos kartta on korkeammalla. Onko Lontoo jo aloitettu?"

KK:n kortti klo 21.30: "Perutaanko jonossa oleva Pariisin kartan tärinäajo, joka mittaisi tärinän rakennusten kohdalla?" = "Perutaan (Suositus)". Korvaa 20.58:n "Yksi uusi ajo" ja KK:n 21.08:n kolmen käynnistyksen tavan.

Omistajalle kerrottu: tärinä jää peliin, määrä rakennusten kohdalla jää mittaamatta, isoa korjausta ei nyt tehdä, kohta 9 poistuu Pariisin valmis -listalta (KK päivitti listan; 20.27:n kymmenestä kohdasta jää yhdeksän). JU ja NS saivat tiedon suoraan KK:lta.

## REMOTE CONTROL MYÖS PÄÄTOIMITTAJALLE (omistaja, KK) (6.11.2026 klo 21.39)

Omistaja 6.11.2026 klo 21.32 (KK:n välittämä): "Laita remote päälle myös päätoimittajalle". Korvaa 16.08:n "etäyhteys vain KK:lla". KK kytki etäyhteyden päälle PT:lle (tila on, PT tarkisti). PT pitää sen päällä, myös nollauksen jälkeen. Postivahti ja roolit eivät kytke sitä.

## MAALATTU TAIVAS PARIISIIN KOKEENA, PALETIN POIKKEUS (6.11.2026 klo 22.15)

Omistaja 6.11.2026 klo 22.15, kortti "Kelpaako maalattu taivas (lähettämäni pelikuvat) Pariisiin kokeena?" = "Kelpaa (Suositus)": kokeena vain Pariisissa, ei junaan, vaalea pinkki saa jäädä. Kuvat: scratchpad/keskustelukanava/kuvat/taivas-ajo31/. Taivaan väri on tällä päätöksellä poikkeus peruskartan paletista, vain Pariisissa (Raamattu 4.40). Välitti KK.

## NOTRE-DAME #2184 JA EIFFELIN LÄHIALUE KOKEENA (6.11.2026 klo 22.20)

Omistaja 6.11.2026 klo 22.20, kortit: korjattu Notre-Dame #2184 "Kyllä, kivi 85 % (Suositus)" kokeena nykyisen tilalle, ei junaan; Eiffelin ja Montparnassen lähialue, myös Monoprixin poisto, "Kelpaa (Suositus)" kokeena, ei junaan. Omistajalle näytetty kuvat/ajo32-20261106/: intro (alku viallinen, korjattu kuva luvattu NUI:lta) ja saumat (koe ei poistanut rajaa). Välitti KK.

## USVA KAUEMMAS PARIISIN KOKEESEEN (6.11.2026 klo 22.55)

Omistaja 6.11.2026 klo 22.54, kortti "Otetaanko oikean yläkulman usva Pariisin kokeeseen?" = "Oikea ylä kokeeseen (Suositus)" (a: usvakauas 1,5 km / 12 km; kokeena, ei junaan). Kuvat kuvat/usva-ajo34b/. Tavoite: usva tulee kauempaa ja hitaammin, ei näytä sumulta. Omistajalle kerrottu 65°:n vyö, raidoitus, La Défense, maan viivan syy selvittämättä ja muisti mittaamatta. Välitti KK.

## LONTOO ALKAA NYT, KK PÄÄTTÄÄ YÖN (6.11.2026 klo 22.59)

Omistaja 6.11.2026 klo 22.58, sanatarkasti: "Pidä huoli että sessiot etenevät eikä tule  turhia hidastuksia ja tehkää Lontoo. Menen nukkumaan ja saat päättää kaikesta puolestani". KK:n kapea tulkinta: korvaa suunnitelman "Lontoo vasta TF:n jälkeen" ja 17.40 "kolmatta ei"; Lontoo alkaa nyt Pariisin listan rinnalla, suunnitelma suunnitelmat/20261106-lontoo-ilman-tripoa.md, aika lokiin kohdasta A alkaen. Omistajalle menevät pysähdykset (lista, kohta B, kolme nimettyä) ja yön kysymykset päättää KK ilman kortteja ja odotusta aamuun. EI VALTUUTUKSEEN: TF ja julkaisu ("Pariisi valmis" -kortti jää aamuun, lista etenee valmiiksi), junaan vienti ilman sanaa, ostot, Tripo Lontoolle, poistot, tilit ja avaimet, 11.8-rikkeet. PT jakoi kohdat A ja B Pelikoodarille 22.59.

## OLEELLISET NIMET, KK:N PÄÄTÖS VALTUUTUKSELLA (6.11.2026 klo 23.02)

KK 6.11.2026 klo 23.00 omistajan valtuutuksella (22.58 "saat päättää kaikesta puolestani"): nimet oletuksena pois: kadut, kaupunginosat (suburb, quarter, neighbourhood) ja pienet vedet; kylät ja hamletit jäävät; kokeena, ei junaan. Korvaa NS:n suosituksen "vain kadut". Kartta-välilehden rivi NUI:lle. Suunnitelma suunnitelmat/20261106-kartan-oleelliset-nimet.md.

## YÖN SÄÄNTÖ: JUMI EI PYSÄYTÄ (6.11.2026 klo 23.08)

Omistaja 6.11.2026 klo 23.07 (KK:n välittämä): "Jos tulee ongelma ja se ei meinaa ratketa niin ei kannata jäädä korjaamaan liian pitkään vaan jatkaa eteenpäin ja kysyä aamulla minulta mitä tehdään." KK:n tavoite: kun vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa, kokeen osa pois tai edellinen toimiva tilalle, rivi KK:lle (vika, mitä kokeiltu, suositus) ja seuraavaan työhön. KK kokoaa kysymykset aamuun. PT välitti rooleille 23.08.

## LONTOO A: 15 KOHDETTA, KK:N PÄÄTÖS VALTUUTUKSELLA (6.11.2026 klo 23.12)

KK 6.11.2026 klo 23.11 omistajan valtuutuksella: Lontoo A kelpaa (_tyo/pelikoodari/lontoo/a/kohdelista.md): 15 kohdetta, Greenwichin planetaario pois. Suojatut modernit talot jäävät 11.8:n mukaan yhtenä suorana laatikkona, ei kerrospaloja; korvaa PK:n ehdotuksen jättää ne pois. PK jatkaa B:hen.

## YÖLLÄ VAIN PARIISI, LONTOO JA JUOKSUPELI (6.11.2026 klo 23.24)

Omistaja 6.11.2026 klo 23.22 (KK:n välittämä): "Sinun pitää myös valvoa että sessiot eivät alla tehdä jotain muuta kuin  Pariisi, Lontoo tai juoksu peli". KK:n tulkinta: vain nämä kolme; tukityö (käännökset, levy, valvonta, taulu) jatkuu, kun se palvelee niitä. Muu seis yöksi, ei uutta. KK ja PT valvovat.

## RYHMÄ 2 KOKEENA, KK:N PÄÄTÖS VALTUUTUKSELLA (6.11.2026 klo 23.27)

KK 6.11.2026 klo 23.26 omistajan valtuutuksella: ryhmä 2 v13 ja 25 m:n raja kelpaavat kokeena, irtotalot pois. Opéran pari omistajalle aamulla, koska raja koettelee 5.11. klo 08.52:n sanaa. Ajon 35 varjot: peili poissa; Sacré-Cœurin varjo istuu, Invalidien varjoa ei juuri näy, VS arvioi.

## INVALIDIEN VARJO ENNALLEEN, KK:N PÄÄTÖS VALTUUTUKSELLA (6.11.2026 klo 23.37)

KK 6.11.2026 klo 23.36 omistajan valtuutuksella: Invalidien varjo jää ennalleen, kokeena, ei junaan (VS:n suositus). Täydentää 23.27:n kohtaa "VS arvioi", ei korvaa omistajan päätöstä. Peruste: ajot 28 ja 35 rinnakkain lähes samat, ja omistajalle kerrottiin "varjo näkyy heikosti" ennen hänen sanaansa "Kelpaavat". Kuva ja selitys aamun koontiin.

## NIMETYT RAKENNUKSET PALAAVAT, KK:N PÄÄTÖS VALTUUTUKSELLA (6.11.2026 klo 23.49)

KK 6.11.2026 klo 23.47 omistajan valtuutuksella: Jeu de Paume ja Orangerie palaavat 3D-taloina Louvren maskista, kokeena, ei junaan; korvaa oletuksen "ennallaan". Nimet tarkistettu OSM:stä (Q656296, Q726781). Sama sääntö muille: nimetty oikea rakennus, joka ei kuulu malliin ja on yli 25 m mallista, palaa seuraavaan palaversioon ilman omaa ajoa; alle 25 m:n jää pois, ja KS antaa listan aamuun. Ei koske omistajan omia päätöksiä (Eiffel ja Montparnasse 22.20, Monoprix, Seinen laivat, saari). Lista scratchpad/keskustelukanava/nimetyt-poistot-v16.txt; mallien omat erotetaan.

## ALOITUSLENNON AUKKO: EI KORJAUSTA, KK:N PÄÄTÖS VALTUUTUKSELLA (6.11.2026 klo 23.50)

KK 6.11.2026 klo 23.50 omistajan valtuutuksella: aloituslennon aukkoon ei korjausta, verho-ehdotus pois. Peruste: iPad kylmällä välimuistilla (2cba21a3e, 2 ajoa) verho lähti 3,7 s, peitto 100 % koko lennon lokissa; kuvaa pallosta ei ole. Macin 4,3 s:n aukon syy (esikatselusta puuttuu laattapaketti) on päätelmä; NS ajaa vuorollaan yhden Mac-ajon paketin kanssa, jotta se mitataan ja introlle saadaan kuva.

## LONTOO B KELPAA, JATKETAAN C:HEN, KK:N PÄÄTÖS VALTUUTUKSELLA (6.11.2026 klo 23.52)

KK 6.11.2026 klo 23.51 omistajan valtuutuksella: Lontoo B kelpaa, jatketaan C:hen (Big Ben, Tower Bridge, St Paul's), kokeena, ei junaan. Aika B: 22.59–23.46 (02bae0746). Lisäksi lähimmän etäisyyden kuva, Abbeyn väri, Big Benin näkyvyys ja parit oikean rakennuksen kanssa. PT jakaa C:n tekijän.

## INVALIDIT V16 KELPAA, KK:N PÄÄTÖS VALTUUTUKSELLA (7.11.2026 klo 00.22)

KK 7.11.2026 klo 00.22 omistajan valtuutuksella, kokeena, ei junaan: Invalidit v16 kelpaa. Ero v13|v16 mallin ympärillä on vain koju, joka vaihtoi puolta (64954996 pois, 64955038 tuli nimen viereen). Seuraavaan palaversioon, ajoa 38 viivästyttämättä: Invalidien 68568749, 103202696, 103202709, 1272602675 ja 64955038 pois sekä Opéran aukion lounaiskulman pieni koju, jos nimetön. Opéran kauppa 69226766 jää. Grand Palais v13 -kuvat ajoon 38 parina aamuun, jos eivät viivästytä. NUI: Champs-Élysées-n kuvapallo on ilman nimikylttiä (ajot 35 ja 37).

Lontoon kohdan D1 aika 22.59–00.14 (PK 200433217, 275 Mt).

## PALAT V17 JA LONTOO D1 KELPAAVAT, KK:N PÄÄTÖKSET VALTUUTUKSELLA (7.11.2026 klo 00.35)

KK 7.11.2026 klo 00.25 omistajan valtuutuksella, kokeena, ei junaan: Lontoo D1 kelpaa, jatketaan; puistot koneella, kuva ja siirtymä alueen reunalle, Abbey Roadin paikka, oikea aloitus E:n kuviin. KK klo 00.34 samoin: palat v17 kelpaavat (Riemukaari, Sacré-Cœur ja Concorde 45° parina katsottu; 70° ja ylhäältä katsomatta). KS jatkaa ajolla 39; Grand Palais v13 | v18 aamun koontiin; 25 m:n raja jää omistajan kortille.

## KK:N PAATOS VALTUUTUKSELLA: BIG BEN OIKEASSA KOOSSA (7.11.2026 klo 00.45)

KK klo 00.45 omistajan valtuutuksella, kokeena, ei junaan: Big Ben oikeassa koossa, ei liioittelua. Muoto ja katto erottuvat. Ajoon c2 lisäksi koko ruudun kuva lähimmältä etäisyydeltä; KK odottaa c2:n kolme paria palat-d3:n jälkeen.

## KK:N PAATOS VALTUUTUKSELLA: PALAT V18 KELPAAVAT KOKEENA (7.11.2026 klo 00.59)

KK klo 00.58 omistajan valtuutuksella, kokeena, ei junaan: palat v18 kelpaavat (ajo 39; kojut poissa Invalideilta ja Opéralta, Grand Palais v13 | v17 katsottu).

## KK:N PAATOS VALTUUTUKSELLA: KUVAPALLOJEN NIMIKYLTIT KOKEENA (7.11.2026 klo 01.03)

KK klo 01.02 omistajan valtuutuksella, kokeena, ei junaan: kuvapallojen nimikyltit kelpaavat (NUI 36fe37f6a). NUI vaihtaa nimet kuvan aiheen mukaan ja tekee väistön PT:n kohtien jälkeen.

## KK:N PAATOS VALTUUTUKSELLA: LONTOO C KELPAA KOKEENA (7.11.2026 klo 01.20)

KK klo 01.19 omistajan valtuutuksella, kokeena, ei junaan: Lontoo C kelpaa. VS jatkaa loput sarjana, Abbeyn muoto kahdella yrityksellä, joen katkos PK:lla.

## KK:N PAATOS VALTUUTUKSELLA: SUMEA ALUE SAAPUMISESSA PARIISIIN ON VIKA (7.11.2026 klo 01.35)

KK klo 01.34 omistajan valtuutuksella, kumoaa KK:n 01.13 sanan k01f ei korjausta, joka perustui Macin kuvaan: iPad-kuvan nelio-2.png sumea alue on näkyvä vika saapumisessa Pariisiin. Jos syy on korjattavissa ilman koko maailman laattoja, NS saa kaksi yritystä kokeena, tulos iPad-kuvana; muuten syy ja kuva aamun kysymykseksi. Tavoite: kartta on lennon aikana yhtä terävä koko näkymässä, tiet jatkuvat, ja Seine on yksi joki.

## KK:N PAATOKSET VALTUUTUKSELLA: PELIKOODARIN JARJESTYS JA KAMERA NAHTAVYYDEN LAPI (7.11.2026 klo 02.24)

KK klo 01.21 omistajan valtuutuksella, kokeena, ei junaan: Pelikoodarin järjestys on Abbey Road + avauskortti + joki, sitten F, sitten E. KK klo 02.20 samoin: kamera ei saa mennä nähtävyyden läpi; Natiiviseppä saa kaksi yritystä (lokit/nui-kyltit-liike-85/liike85.mp4; ensin pelaajan reitit, korjaus kameratasolla, Raamatun 2.215 rajat voimassa), Z10:n yritys 2:n jälkeen.

## LONTOON SARJA KELPAA KOKEENA, KK:N PAATOS VALTUUTUKSELLA (7.11.2026 klo 02.30)

KK 7.11.2026 klo 02.28 omistajan valtuutuksella, kokeena, ei junaan: Lontoon sarja kelpaa (VS e973cef98, linssiseppa2/lontoo-c); heikkoihin kohteisiin ei enempää yöllä. Seuraavaksi PK: E, Pariisi | Lontoo samoilta etäisyyksiltä hintoineen, ja iPad-tarkistus mallien kanssa. Sumea lento jää aamun kysymykseksi; NS seuraavaksi Eiffelin läpi lentävä kamera.

## SEINE AJO 40: ISSY JA BIR-HAKEIM, KK:N PAATOS VALTUUTUKSELLA (7.11.2026 klo 02.44)

KK 7.11.2026 klo 02.43 omistajan valtuutuksella, kokeena, ei junaan: Bir-Hakeimin kaksi tummaa viivaa ja Issyn L-talo (way/122634056) pois seuraavaan palaversioon, ei omaa ajoa. Austerlitzin eteläpuolen litteä rengas: KS kaksi yritystä, muuten aamun kysymys. Pariisi valmis -kohta 7 ei ole vielä valmis.

## KIINTEA VALO KELPAA KOKEENA, KK:N PAATOS VALTUUTUKSELLA (7.11.2026 klo 03.05)

KK 7.11.2026 klo 03.05 omistajan valtuutuksella, kokeena, ei junaan: kiinteä valo (VS 7738b63c1) kelpaa; pari omistajalle aamulla. VS saa yhden yrityksen muiden kohtien kanssa samassa ajossa: Sacré-Cœurin ja Louvren muodot erottuvat kaikista suunnista lähes kuten vanhassa, valo ei käänny kameran mukana; jos ei parane, nykyinen jää. KK 02.58: Pariisi kohta 8, NUI 4f80574cf, viat 3 ja 4 kelpaavat kokeena, vika 6 aamuun. KK 02.53: Lontoo E1 kelpaa välivaiheena; PK tekee päivitetyt parit, F3:n ja lyhyen lisäajon, jossa samat konemallit isompina, ei Tripoa.

## LONTOO E2, E3 JA F3 KELPAAVAT, KK:N PAATOS VALTUUTUKSELLA (7.11.2026 klo 03.25)

KK 7.11.2026 klo 03.25 omistajan valtuutuksella, kokeena, ei junaan: Lontoo E2, E3 ja F3 kelpaavat (F3 muistihuippu 3 695 Mt, raja 4 080 Mt, PK:n luku). Aamun kortin suositus: muut kaupungit koneella ilman Tripoa, päänähtävyydet isompina. PK jatkaa yhdellä lyhyellä ajolla: sienimuoto, Shardin möhkäle, Tower Bridgen mitat VS:n kanssa ja St Paul'sin väri. KK 02.43:n sillat: ohut viiva lähtee, jos ajosilta on alle 20 m:n päässä; omat kävely- ja metrosillat jäävät. KK 03.13: kameraeste ea5823b4f jää omalle haaralleen, aamun kysymys.

## VALOMUOTO YHTEISEEN AJOON, USVA 12 KM PYSYY, KK:N PAATOS VALTUUTUKSELLA (7.11.2026 klo 03.28)

KK 7.11.2026 klo 03.29 omistajan valtuutuksella, kokeena, ei junaan: valomuoto ac508f55e kelpaa ja menee yhteiseen ajoon. Usva pysyy 12 km:ssä, koska omistaja valitsi sen itse; 16 km menee aamun korttiin. Saumat ovat aamun kysymys.

## NUI:N KYLTIT, ALOITUSLENNON TEKSTIT JA KAINALO, KK:N PAATOKSET VALTUUTUKSELLA (7.11.2026 klo 03.56)

KK 7.11.2026 omistajan valtuutuksella, kokeena, ei junaan. Klo 02.58: Natiivi-UI tekee ensin pallon väistön tarkistuksen ja kylttien selvityksen (Les Halles ja Tuileries), sen jälkeen aloituslennon viisi kuvaa. Klo 03.44: Pariisin listan kohta 10, aloituslennon päällekkäiset tekstit (Bastilji ja Place des Vosges): yksi viimeinen yritys. Klo 03.53: kainalotarkistus (NUI e5619a1c1) kelpaa kokeena; sijainnit ja kortti jäävät aamuun.

## LÄHIYMPÄRISTÖT R8 JA R9, KK:N PÄÄTÖS VALTUUTUKSELLA (7.11.2026 klo 04.29)

KK 7.11.2026 klo 04.28 omistajan valtuutuksella, kokeena, ei junaan (VS cded7d322, ajo lahi-1): Sacré-Cœur r8, Panthéon r8, Opéra r9, Invalidit r9 (oliiviraidat lähtevät, kartan oma Rodinin puutarha näkyy), Notre-Dame ei muutosta. Litteiden ruskeiden palojen syy jää aamuun; yhteisessä ajossa yksi Panthéonin kuva varjot pois, jos tilaa on, ei omaa ajoa eikä kolmatta yritystä. Kaista ja aukiot ovat KS:n palatyötä. Kiinniotossa eunukki ei ole vika (omistaja 27.10. 18.12, KK oikaisi 04.14); PK tekee vain Taso läpi -kortin ja lisäajon.

## PANTHEON R8 PYSYY JA LONTOO E4, KK:N PAATOKSET VALTUUTUKSELLA (7.11.2026 klo 06.26)

KK 7.11.2026 omistajan valtuutuksella, kokeena, ei junaan. Klo 05.09: Panthéon r8 pysyy, vaikka heikko reunus jää; r9 paljastaisi 45°:ssa rosoisen ruskean palan. Reunus kerrotaan omistajalle aamulla. Klo 06.11: Lontoo E4 (fdbf8a0ef) kelpaa. Viimeinen Lontoo-työ yöllä PK:lle: Pariisin kyltti- ja karttatoteutus KS:n yhteisajon kärjestä, oma kainalopoikkeus pois NUI:n korjauksella, yksi pallo per kohde, jos pieni muutos riittää; kaksi yritystä, ei Tripoa, palat vain poistot-d8:lla, yksi ajo E-parien kuvakulmilla.

## PARIISI JA LONTOO, YON RATKAISUT (KK 06.40 ja PT, kaikki kokeena, ei junaan) (7.11.2026 klo 06.53)

KK 7.11. klo 06.40: Lontoo G e48424a75 kelpaa kokeena; Big Benin ja palatsin kyltit, St Paul'sin tuplanimi ja 'Kuumailmapallo £200' jäävät aamun koontiin. PT:n ratkaisut: naarmukorjaus a80a81323 kokeen oletukseksi; kyltit 3d92da39e kokeena; 292afcef2 (ruukun z1-isku) ja Taso läpi -muunnelma 4aa9ec365 jäävät omistajan päätettäviksi aamulla; rappaus 2e1d2b87d aamuun. Pariisin kortin pohja a4269054a (ajo 46, 82/82).

## PARIISI, YON LOPPU (KK 06.54, 07.04, 07.19; kokeena, ei junaan) (7.11.2026 klo 07.19)

Louvren oma kyltti korjattu: NUI c390b057f (haara natiivi-ui/louvre-kyltti, a4269054a:n päällä), yritys 2, kelpaa kokeena (KK 07.19); kärki ei ole a4269054a:ssa, joten c390b057f on muistettava, kun kokeet kootaan junaan. Ei uutta yhteisajoa ennen korttia; pari kortille erikseen. iPadilla kolmiotestin kulutus ja muisti mittaamatta. Pallo isolla iPadilla kelpaa korttiin (PK, a4269054a; KK 07.04); kolme havaintoa kortille, syitä ei selvitetty: Pohjanmeren ruudukkoläikkä, Ranskan lippu Elsassissa, pohjoisnavan laikku. KK:n korjaus 06.54: Kuumailmapallo £200 on pallon oma kyltti (KaupunkiPallot.cs, KyltinTeksti), ei Lontoon vika. Kohta 6: kevyt Notre-Dame #2184 ja Riemukaari #2172 ovat pelikokeessa omistajan päätöksillä.

## MUUT KAUPUNGIT OHJELMALLA ILMAN TRIPOA: EI VIELA (omistaja 7.11.2026 klo 07.40, kortti KK) (7.11.2026 klo 07.41)

Kortti: Tehdäänkö muut kaupungit ohjelmalla ilman Tripoa? Vastaus: Ei vielä (kuvaus: Lontoo jää kokeeksi, ja päätös odottaa). Lontoon koe pysyy haaralla (G e48424a75); kokokysymystä ei esitetty.

## OPENFREEMAP: EI KYSYTA; POISTOTAULU AVOIMESTA AINEISTOSTA (omistaja 7.11.2026 klo 07.49, kortit KK) (7.11.2026 klo 07.49)

Kortti: Kysytäänkö OpenFreeMapilta lupa pelin koko käytölle ennen ulkoista julkaisua? Vastaus: Ei kysytä (Käyttö pysyy ennallaan, ja epäselvä osa jää auki). Kortti: Haetaanko poistettavat talot jatkossa avoimesta aineistosta ja poistetaan vanhat haetut palat? Vastaus: Kyllä (Suositus) (Tehdään, kun Pariisin kartta on lukittu. Peli käyttää elävää karttaa yhä palvelusta). KK: viestiä ei lähde; skriptattujen hakujen kielto pysyy; poisto oma työnsä lukituksen jälkeen, ei koeversioon. Raamattu 2.204.

## SISAINEN KOEVERSIO 219: PARIISI, LONTOO JA JUOKSU (omistaja 7.11.2026 klo 07.41-07.53, kortit KK) (7.11.2026 klo 07.54)

07.41 Julkaise juna niin kokeilen pelissä. 07.43 Mitä kokeiltavaan versioon tulee? = Yön Pariisi ja Lontoo (sisäinen koeversio, kokonaisuutta ei ole ajettu iPadilla). 07.52 Otetaanko juoksupelin tason 1 korjaukset samaan koeversioon? = Kyllä. 07.53 Saako sisäinen koeversio lähteä, vaikka verkon palautus, iPad-testit ja lippu ovat auki? = Saa lähteä (vain sisäisille; kolme asiaa pysyvät ulkoisen julkaisun ehtoina). Runko c390b057f + e48424a75 + 3ed82d1fb. Ei ulkoisille, ei lukitusta. PT 07.48: talot sovelluksen mukaan (+660 Mt, palat vain Macissa, PK 6b688b3d1), yksi iPad-ajo ennen vientiä; kaatuessa takaisin KK:lle, ei omaa uutta yritystä. ODbL ei estä sisäistä, tarkistetaan ennen ulkoisia.

## LIPUN PAIKKA ELSASSISSA EI OLE VIKA (omistaja 7.11.2026 klo 07.55, KK) (7.11.2026 klo 07.55)

Omistaja: Lippu ei kuulukaan olla Pariisissa. Pois vikalistalta ja koeversion ehdoista. Lipun asento (4.42) ja ulkoisen julkaisun ehto pysyvät; sanat koskevat vain paikkaa.

## MUURIN KIVIEN SIVUT TUMMEMMIKSI (omistaja 7.11.2026 klo 07.54-08.30, kortit KK) (7.11.2026 klo 08.30)

07.54 Omistaja: Miksi tuo sivu on vieläkin noin vaalea kivestä? (kuva docs/raportit/kaappaukset/omistaja-20261107/muuri-kiven-sivu-vaalea.png). 07.56 Kokeillaan tummempaa. LAV mittasi: pääosin leivottu valo, sivu/lattia 6x, ilman leivontaa 1,1-1,2x (KK vahvisti). 08.30 Näin (pari kuvat-kivisivu1/pari-perus-tumma-050.png): sivut tummenevat puoleen; saumat, viivat ja sävy korjataan tämän jälkeen. Tavoite: kivi asettuu lattiaan, kuvio näkyy, ei vaaleita saumoja eikä viivoja. Ei vientiä eikä junaa ilman PT:tä; ei koeversioon 219.

## MUURIN PITKAT REUNAKIVET TUMMENNETAAN (omistaja 7.11.2026 klo 08.54, kortti KK) (7.11.2026 klo 08.54)

Kortti: Tummennetaanko muurien juuren pitkät vaaleat reunakivet samaan tapaan kuin muut kivet? Vastaus: Tummennetaan (Suositus). Tavoite: kaikki reunakivet näyttävät samalta kiveltä. Koe, ei vientiä.

## JUOKSUPELI: KALA-ALTAAN JA GRANAATTIOMENAPUUN HUUDOT JA KUPLAT (7.11.2026 klo 09.30)

Omistajan pyyntö 09.02 (KK): "tee huudot ja kuplat esineille joilla sitä ei vielä ole." Kortti 09.27 "Kelpaavatko kala-altaan ja granaattiomenapuun huudot, kuplat ja historiatekstit?": "Kelpaavat (Suositus)". Rajaus kerrottu omistajalle: vain nämä kaksi (koodista tarkistettu); 16 luettelon esinettä ja 7 yhden huudon esinettä eivät kuulu tähän ilman hänen sanaansa. Ensimmäinen rikkominen antaa oman huudon ja kuplan, ja esineet näkyvät loppuyhteenvedossa. Kuvat Codexilta, KK katsoo, omistaja näkee ennen peliä; kahdeksan huutoa Äänittäjältä; avaimet ja testit Pelikoodarilta. Junaan normaalisti, ei omaa vientiä. Suunnitelma: KK:n 20261107-huudot-kala-allas-granaattiomenapuu.md.

## JUOKSUPELI: MUURIN KIVET KELPAAVAT KUVIEN MUKAAN (7.11.2026 klo 09.31)

Kortti 09.31 "Kelpaavatko muurin kivet näin kuvien mukaan?": "Kelpaavat (Suositus)" (VS kuvat-kivisivu5, parit paaty ja pelia; kortissa: saa jatkaa kohti junaa, jäljelle jääneet viat erikseen). Korvaa aiemmat kiviparit. Ei vientiä ilman PT:tä; iPad ja liike katsomatta. Avoimena kerrottu: lattian tumma kolmio (leivonta), irrallinen vaalea laatta reunakiven vieressä, punaisen seinän alla ohut vaalea raita (selvittämättä).

## JUOKSUPELI: KALA-ALTAAN JA GRANAATTIOMENAPUUN KUVAT (7.11.2026 klo 09.41)

Kortti 09.40 "Kelpaavatko kala-altaan ja granaattiomenapuun neljä kuvaa peliin?": "Kelpaavat (Suositus)". Codexin posti a2cdf8fc9 (#2189–2192). Kerrottu: altaan jalusta on muistokuvassa harmaampi ja esinekuvien pinta pelkistetty. Peliin tekstien kanssa; äänet odottavat omistajan kommenttia videosta.

## LONTOO: PÄÄNÄHTÄVYYDET ISOMPINA KOKEENA (7.11.2026 klo 09.52)

Omistajan kysymys 09.49 (KK): "Voiko Lontoon nähtävyyksiä liioitella vaikka tehty koodilla?" Kortti 09.52 "Kokeillaanko Lontoon päänähtävyyksiä isompina?": "Kokeillaan (Suositus)". Hänelle luvattu: parit samasta kohdasta ennen päätöstä, jääkö koko peliin. Kokeena St Paul's, Tower Bridge, Big Ben ja Westminster; Tower Bridgelle omat pituus ja korkeus. Tavoite: erottuvat kaukaa kuten Pariisin nähtävyydet eivätkä peitä naapurikortteleita rumasti. Muisti mitattuna. Ei junaan ilman korttia "Pariisi valmis".

## LÄHTÖKYSYMYS KELPAA, LAUTAPELEIHIN HINTARIVI (7.11.2026 klo 10.49)

Kortit 10.49 (KK): lähtökysymyksen kortti "Kelpaa (Suositus)"; kortissa ulkoasu ja sanat, junaan vasta, kun maksu, raketin laukaisu ja iPad on kokeiltu. Lautapelien rivi "Hinta: ilmainen": "Lisätään (Suositus)", Pelaa-nappi säilyy. Havainto 10.49: koeversion 1.1 pallolennossa iPhonella rakennukset "Eivät näy valkoisina" (laite ja versio eri kuin Macin kuvassa; Macin kuvan syy testiajon varadata). Aamun odottavat kortit "Otetaan (Suositus)": KK vie usvan, saumat, Pariisi valmis, leivonnan ja Taso läpi yksi kerrallaan.

## PARIISIN USVA 16 KM KOKEENA (7.11.2026 klo 10.51)

Kortti 10.50 (KK): "Oikea (Suositus)" (kuvat/usva-12-16/usva-12-vasen-16-oikea-1000.jpg, vasen 12 km, oikea 16 km). Usvan loppu 16 km, korvaa 12 km:n 22.54 kokeessa. Kokeena, ei junaan.

## PARIISIN SAUMAT JÄÄVÄT NÄIN (7.11.2026 klo 10.53)

Kortti 10.52 (KK): "Jää näin" (KK:n suositus oli pehmennys). Kortissa: suora raja jää, eikä sitä lasketa Pariisi valmis -listan esteeksi; kuva kuvat/saumat-20261107/. Saumoista ei uutta työtä.

## PARIISI VALMIS -KORTTI ODOTTAA YHDEN TARKKUUDEN KUVIA (7.11.2026 klo 11.04)

Kortti 11.03 (KK): "Odottaa (Suositus)": omistaja näkee ensin yhden tarkkuuden kartan kokeen kuvat; kortti ja TF vasta sen jälkeen. Kerrottu riskit: vaihtohetki ja kallistus.

## TASO LÄPI -KORTTI KESKELLE (7.11.2026 klo 11.09)

Kortti 11.08 (KK): "Keskelle": noudattaa pohjaa, vaikka peittää keisarin pään ja hartiat; KK:n suositus oli sivussa. Kumoaa 4aa9ec365:n, joka on TF 219:ssä. PK palauttaa keskelle seuraavaan junaan, ei muunnelmaa pohjiin. KORJAUS edelliseen kirjaukseen: Pariisi valmis -kortin "Odottaa" oli klo 11.03, ei 11.00 (KK).

## JULKAISUPYYNTÖ JUNA 220 (7.11.2026 klo 11.22)

Omistaja 11.21 (KK, sanatarkasti): "jatka kaikkia töitä ja julkaise juna kun kaikki korjaukset valmiit." KK:n tulkinta, omistajalle kerrottu: sisäinen koeversio kuten 07.41 ja TF 219; ei ulkoisille, ei lukitusta, ei korvaa korttia Pariisi valmis. Kaikki korjaukset = iPhone-palautteen 09.49 korjaukset, Taso läpi keskelle sekä 11.21:n alanapit ja valikko. Yhden tarkkuuden kartta, Lontoon isot nähtävyydet ja muurin kivet mukaan vain omistajan kortilla. Lähtö PT:n rivillä VIE 220 KOEVERSIONA, kun ehto täyttyy.

## LONTOON ISOT NAHTAVYYDET SISAISEEN KOEVERSIOON, KUN KYLTIT KORJATTU (OMISTAJA 7.11.2026 KLO 11.42, KK:N KORTTI) (7.11.2026 klo 11.43)

Kortti: Otetaanko Lontoon isot nähtävyydet seuraavaan koeversioon? Vastaus: Otetaan (Suositus). Kortin selite: Isot koot sisäiseen koeversioon, kun kyltit on korjattu. Koskee PK:n koetta cbfb96542 (pelikoodari/lontoo-isot), vain sisäistä koeversiota, ei ulkoista julkaisua. Abbeyn 140 m:n siirto ja Tower Bridgen heikkous kaukaa kerrottu omistajalle. KK katsoi parit ja tarkisti lokista huipun 3 844 Mt. Korjattava ennen koeversiota: Newgaten vankila St Paul'sin päällä, Vanha Westminsterin palatsi palatsin päällä, Exchange Alley St Paul'sin julkisivulla matalalta, Lontoon kaupungintalon nimi Tower Bridgen yli, pallon hintakyltti palatsin edessä. Kuva KK:lle korjatusta. Muisti mitataan yhteisajossa muiden korjausten kanssa, koska iPhonesta ei ole lukua.

## JUNA 220 ODOTTAA TALOT KAUEMMAS (OMISTAJA 7.11.2026 KLO 11.52, KK:N KORTTI) (7.11.2026 klo 11.53)

Kortti: Jos talot kauemmas ei onnistu ajoissa, lähteekö juna ilman sitä? Vastaus: Odottaa. Juna odottaa, kunnes talot kauemmas on mukana.

## PALLON ELAMA PARIISIN KARTALLA KOKEENA ENNEN JUNAA (OMISTAJA 7.11.2026 KLO 11.52, KK:N KORTTI) (7.11.2026 klo 11.53)

Kortti: Kokeillaanko junan jälkeen pallon elämää Pariisin kartalla? Vastaus: kokeillaan heti ennen junaa, ja tehdään siihen kaikki mahdollinen mikä ei julkisenakaan edellytä cesium kuukausitilausta ja testataan muisti vasta lopuksi. Heti perään: tosin eri säätiloja ja vuorokaudenaikoja ei oteta vielä mukaan, eli pidetään ns. puolipilvinen ja päivä vuorokauden aikana, mutta kaikki sitä tukevat jutut mukaan. KK:n tulkinta (ei omistajan sanaa): pallon omat osat kartalle kokeena; sade, lumi, salamat ja yö pois; junaan vasta omistajan kortilla kuvista; pallon lento omilla taloilla ei kuulu tähän ilman omistajan sanaa. Suunnitelma KK:lta: suunnitelmat/20261107-pallon-elama-kartalle.md; ei jakoa ennen sitä.

## MUURIN KIVET KOODINA JUNAAN, USVA 16 KM KOEVERSIOON, MAALATUT JULKISIVUT KOKEESEEN (OMISTAJA 7.11.2026 KLO 12.09, KK:N KORTIT) (7.11.2026 klo 12.10)

Kortti: Kokeillaanko omiin taloihin maalattuja julkisivuja? Vastaus: joo, mutta miten ne kannattaa maalata? Kortti: Menevätkö muurin kivet näin junaan koodina? Vastaus: Menevät (Suositus); selite: tummemmat sivut julkaistulla mallilla, ei uutta päätyä; puuttuvat seinät selvitetään erikseen. Koskee dc4b1c69c:tä; LAV:n paketti ja v115pala eivät mene. Kortti: Otetaanko usva 16 km tähän koeversioon? Vastaus: Otetaan (Suositus); selite: kun se on kuvattu ennen junaa. Kuvat koko Pariisin kuvakulmista KK:lle. Suunnitelmat KK:lta: suunnitelmat/20261107-pallon-elama-kartalle.md ja 20261107-talojen-julkisivut.md.

## TUMMA VALIKKO KELPAA (OMISTAJA 7.11.2026 KLO 12.22, KK:N KORTTI) (7.11.2026 klo 12.24)

Kortti: Kelpaako pallon tummempi valikko? Vastaus: Kelpaa (Suositus). Kortin selite: tumma valikko ja reunukset jäävät, ja korjaus menee junaan 220. Kerrottu: oikea iPhone todistamatta, yläreunan ohut viiva tarkistamatta koodista.

## OMISTAJAN PAATOS: KAIKKI KORJAUKSET ENNEN JUNAA (7.11.2026 klo 12.51)

Omistaja 7.11. klo 12.50 kortilla "Saako sisäinen koeversio lähteä, vaikka Lontoon kumpu on vielä korjaamatta?" (Saa / Korjataan ensin), omin sanoin: "Tehdään kaikki korjaukset ennen junaa". KK:n kapea tulkinta (KK kertoo omistajalle): juna 220 ei lähde ennen Lontoon kumpua, Towerin kylttiä, palloa ja Lontoo-nimen hyppimistä sekä muuriaukkoa ja jalkoja. Kokemus: Lontoon keskustasta ei nouse vuoria, oikeat mäet jäävät. Ei Mapterhornia (robots); muu kuin pysyvän luvan lisenssi kortille. Kivet: KK:n 12.13 ehto täyttyi, koska muuriaukko näkyy myös ilman kiviä (a8b873e5d); omistajan 12.09 Menevät on voimassa.

## OMISTAJAN PAATOS: JULKISIVUPALA YHDESSÄ KORTTELISSA (7.11.2026 klo 13.35)

Omistaja 7.11. klo 13.34 kortilla "Kokeillaanko tätä julkisivupalaa yhdessä Pariisin korttelissa?": "Kokeillaan (Suositus)". Selite: pala kytketään yhteen kortteliin, ja hän saa kuvat pelistä ennen sarjaa. #2195 hyväksytty tähän kokeeseen, ei sarjaan; ei junaan ilman korttia. Kytkijä Natiiviseppä (PT). Kuvat KK:lle: parit lähin taso, 45°, 70°, 85°, ja ruutusarja liikkeestä.

## OMISTAJAN PAATOS: KOODILLA PIIRRETTY JULKISIVU MAALAUKSEN RINNALLE (7.11.2026 klo 13.41) (7.11.2026 klo 13.42)

Omistaja 7.11. klo 13.41 (KK välitti) kortilla "Kokeillaanko samassa korttelissa myös koodilla piirrettyä julkisivua?": "Kokeillaan (Suositus)". Selite: parit maalatusta ja koodilla piirretystä samasta kohdasta; koe ei mene junaan. Hänen kysymyksensä ennen korttia: "miten julkisivut oli toteutettu niissä low poly esimerkki kaupungeissa?" 13.34 maalattu koe pysyy; tämä tulee rinnalle samaan kortteliin. Kokemus: lähellä pariisilainen, kaukana rauhallinen; ei tekstuuria eikä uutta mallia. Tekijä Natiiviseppä (PT), junan korjaukset ensin. Suunnitelma: scratchpad/keskustelukanava/suunnitelmat/20261107-talojen-julkisivut.md, osio Koodilla piirretty.

## OMISTAJAN PAATOS: JUNA 220 ON KOKO PARIISIN SISAINEN KOEVERSIO (7.11.2026 klo 14.46) (7.11.2026 klo 14.46)

Omistaja 7.11. klo 14.46 (KK välitti) kortilla "Saako juna 220 olla koko Pariisin sisäinen koeversio?": "Saa (Suositus)". Selite: "Pariisin kokeet mukana, vain sisäiselle ryhmälle." Hänelle kerrottu ennen korttia: sisältö koodiluentana, ei ajettu; ei lukitse, ei korvaa Pariisi valmis -korttia; talojen aineiston lisenssi on ulkoisen julkaisun ehto. Kattaa aiemmat "ei junaan" -sanat sisäisessä versiossa (maalattu taivas 6.11. 22.15, Louvren korttelit 6.11. 10.04). Voimassa: 11.51 "Odottaa" ja 12.50 "Tehdään kaikki korjaukset ennen junaa"; juna odottaa talot kauemmas -korttia, palkkia ja boordia. Lähtösana PT:ltä, kun ehdot täyttyvät.

## OIKAISU: KLO 14.46 KIRJAUKSEEN (7.11.2026) (7.11.2026 klo 14.48)

Kirjauksessa "JUNA 220 ON KOKO PARIISIN SISAINEN KOEVERSIO" mainitut "ei junaan" -sanat (maalattu taivas 6.11. 22.15, Louvren korttelit 6.11. 10.04) eivät olleet omistajan sanoja: KK:n tarkistuksen mukaan Louvren kortin vastaus oli "Jätetään", ja "eivät tule junaan" oli KK:n oma lause, kuten taivaassa. KK:n tulkinta: 14.46 "Saa" kattaa ne Pariisin kokeena, ja omistaja voi kieltää; uutta korttia ei tule, ellei hän sano.

## OMISTAJAN PAATOS: LONTOON PALLON PAIKKA (7.11.2026 klo 15.15) (7.11.2026 klo 15.17)

Omistaja 7.11. klo 15.15 (KK välitti) kortilla "Kelpaako kuumailmapallon paikka Lambethissa, palatsin vastarannalla?": "Kelpaa (Suositus)". Koskee paikkaa 30c33d5b9 (51.4950, -0.1125), Macin kuvat. Kerrottu: The Cenotaph -nimi jää osin pallon alle yhdessä kuvakulmassa, hintakyltti tarkistamatta, iPad ja iPhone ajamatta. Lontoo-nimen hyppiminen on yhä auki ja kuuluu 12.50:n korjauksiin ennen junaa.

## KARTAN ELÄMÄ: AJON 3 KORTIT (omistaja 15.20) (7.11.2026 klo 15.21)

Koe, ei junaan ilman korttia (ajo 3, 488a0de09). "Jäävätkö veneet Seinelle kokeeseen?" → "Jäävät (Suositus)". "Miten autot näkyvät kartalla?" → "Vain lähellä (Suositus)", selite "Kaukaa ei mustia pisteitä.". "Jäävätkö linnut kokeeseen?" → "Jäävät", selite "Kuten kuvissa nyt."; KK suositteli poistoa, omistaja ei ottanut sitä. "Jäävätkö liput kokeeseen?" → "Jäävät (Suositus)". Omistajalle kerrottu ennen korttia 5.11. "mitään pieniä malleja ei saa jäädä" ja koodin merkintä laivasta. KK:n tavoite Natiivi-UI:lle: autot vain lähellä, elämä ei peitä nimiä, raitiovaunuista lähikuva KK:lle, linnut ennallaan ilman omistajan sanaa.

## TALOT KAUEMMAS JUNAAN 220 (omistaja 15.21) (7.11.2026 klo 15.22)

Kortti "Viedäänkö talot kauemmas junaan, vaikka vaikutus iPhonella näkyy vasta sinun ajostasi?" → "Viedään (Suositus)", selite "Juna ei enää odota tätä työtä." Koskee 702f8b48d:tä. Kerrottu ennen korttia: isolla iPadilla ei näkyvää muutosta; 80° yli rajan jo nykyisillä taloilla, ei korjaannu tällä; ei ajettu 80°, liike, pieni iPad, iPhone; marginaali kapea, kasvu voi joskus alkaa; jos iPhone ei näytä muutosta, seuraava keino on kevennys, ei rajan nosto. Muut ehdot voimassa. KK kysyy iPhone-tuloksen omistajalta, kun juna 220 on asennettavissa.

## PALATSIN REUNAKIVET JA JÄÄNTEET (omistaja 15.46) (7.11.2026 klo 15.47)

"Saako koko reunakivisarja lähteä palatsista kuvan 1 mukaan?" → "Saa (Suositus)", selite "252 reunakiven osaa pois, lattia muuriin asti." "Poistetaanko myös kuvan 3 ruskeat reunat ja matalat kappaleet?" → "Poistetaan (Suositus)", selite "Enintään kaksi yritystä, sitten uudet kuvat." Kerrottu: Mac, iPad ajamatta; tumma laikku on täyttövirhe, korjaus ajamatta; boordi ehjä, laatan lähde mittaamatta; juna odottaa tätä 12.50:n mukaan. Omistaja näki palkki-parin, boordi-parin ja arkki-lisan (kuvat/palkki2/). Kolmannen yrityksen tarve: uudet kuvat KK:lle, ei jatkoa ilman omistajaa.

## LONTOON KESKUSTAN MADALLUS (omistaja 15.59) (7.11.2026 klo 15.59)

"Kelpaako Lontoon keskusta näin madallettuna?" → "Kelpaa (Suositus)", selite "Keskusta matalaksi, Hampstead ja Stratford ennallaan." Omistaja näki holborn-parin, iso iPad. Kerrottu: Stratford on PT:n ratkaisu ja omistaja voi muuttaa; kytkentä, mallien korkeudet ja matala kuva auki, ei junassa; iPhone ajamatta. Kortti koskee vain kuvan madallusta, ei leijumista. Matala kuva St Paul`sista KK:lle ennen junaa.

## LONTOO-NIMI HÄIPYY (omistaja 16.09) (7.11.2026 klo 16.09)

"Kelpaako, että Lontoo-nimi häipyy pyyhkäistessä eikä hyppää?" → "Kelpaa (Suositus)", selite "Korjaus menee junaan." Koskee 5bd4aa484:ää. Kerrottu: vain Mac; tason vaihtumisen kautta nimi on yhä Regent`s Parkin puolella; Pariisissa nimi puuttuu kahdessa pysähdyksessä ilman korjaustakin; Wellington ja Mornington auki. Omistaja ei pyytänyt näihin työtä.

## Muurin juuren viat yleisellä säännöllä, testikuvat ennen julkaisua (7.11.2026 klo 16.26)

Omistaja kortilla (KK:n välitys, palkki5, kuva r5-lisa7-0: kivilaikku puulattialla, tumma aukkokaista): 2. kuvassa on vielä jotain outoa; korjataan yleisillä säännöillä, koska samoja on todennäköisesti muuallakin, ei vain yhtä paikkaa; ennen julkaisua testikuvat eri paikoista hänelle. KK:n tulkinta: koskee muurin juuren vikoja; palkki5 ei näin junaan; kahden yrityksen raja korvautuu; juna 220 odottaa kuvia ja hänen sanaansa. Turkoosi katto ja harmaa taso: ei työtä ilman sanaa.

## Pallon osat: filmi, terävöinti ja pilvien varjot jäävät, raitiovaunut pois (7.11.2026 klo 16.44)

Omistaja kortilla klo 16.43 (KK:n välitys; film7 ja ajo 5; koe, ei junaan): filmi Jää, terävöinti Jää, pilvien varjot Jäävät, raitiovaunut Pois. Ehdot: Valoseppä tarkistaa terävöinnin liikkeessä ja korjaa 70°:n kaukaisen tumman läiskän; muisti lopuksi; iPhone-tason pehmeneminen auki; laiteajo tarkistaa kartan puuttumisen levossa. Linnut nimien edessä kerrottu, ei työtä ilman sanaa.

## Lontoon kumpu ja St Paul's kelpaavat junaan (7.11.2026 klo 16.47)

Omistaja kortilla klo 16.47 (KK:n välitys, k3-paavali-matala): Kelpaako St Paul's näin madalletussa Lontoon keskustassa? Kelpaa. Kumpu ja mallit etenevät junaan 220; 045844251 vientiin kansioon 2026-11-07-lontoo ja junavuoroon PT:ltä. Kerrottu: keskiosan juuri peittyy, Abbey, museo ja Big Ben ilman arviota, Thamesin soikiot vanhoja (ei työtä), St Paul's haalea (syy auki), iPhone ja saapumislento ajamatta.

## iPhone vaakatasossa ei laskeudu kattojen tasolle (7.11.2026 klo 17.13)

Omistaja kortilla klo 17.12 (KK:n välitys, iphone-85-pois): Saako iPhone vaakatasossa laskeutua matalassa kallistuksessa kattojen tasolle? Ei laskeudu. Kamera pysähtyy kattojen yläpuolelle; loivemmissa kulmissa pääsee yhä lähelle. Koskee junaa 220. Horisontin sinertävä suorakaide kerrottu, ei työtä ilman sanaa. Julkisivukortti: en ymmärrä kysymystä, KK kysyy uudelleen; ei sarjaa eikä junaa ennen vastausta.

## Talojen kattovärit ja vaihtelu ilmakuvasta, viisi tyyliä, puut (7.11.2026 klo 17.24 ja 17.27)

Omistaja kortilla (KK:n välitys, suunnitelma 20261107-talojen-katot-ja-vaihtelu.md): ilmakuva Saa; aloitus: "suosituksen mukaan mutta voidaanko noiden kuvien perusteella tehdä jotain muutakin? ja miten aiot tämän toteuttaa? tehdäänkö kuinka monta erilaista rakennusta?" Klo 17.27 talotyylit Viisi ja puut ilmakuvasta Otetaan (paikat, latvat, värit). Vaihe 1: 1 km² Louvren pohjoispuolelta, koe, ei junaan 220; ilmakuva vain koealueelta. KS aineisto, NS generaattori. Avoin: 140 puuta puistojen ja puurivien ulkopuolella, kortti KK:lla; oletus ei mukaan.

## Levy tyhjäksi ja iPad-välimuistin yötyhjennys (7.11.2026 klo 17.31 ja 17.48)

Omistaja klo 17.31 (KK:n välitys): "levyä pitää tyhjentää , mikä sen on täyttänyt? laita se työn alle ja nollaa sen jälkeen. vastauksen voit antaa uudessa sessiossa". Klo 17.4x PT:n ikkunassa: Shared/Claude lähes 300 Gt ja proto-3d 140 Gt, turha pois tai T7:lle ja NAS:lle. Omistaja poisti iPad-asennusten välimuistin (75 Gt). Klo 17.48 kortilla: kone saa tyhjentää vain tämän välimuistin yöllä, kun asennuksia ei ole käynnissä (JU, PR 6478, ensimmäinen ajo 8.11. klo 4). Vapaana 183 Gi klo 17.54 (oli 32).

## Kaukainen varjo ja iPhonen kameran korkeus kelpaavat (7.11.2026 klo 18.00)

Omistaja kortilla klo 18.00 (KK:n välitys): Kelpaako kaukainen varjo 70°:ssa nyt? Kelpaa (02a6cc1dd, koe, ei junaan; jatkuu iPadin muistiin). Kelpaako iPhonen kameran uusi korkeus? Kelpaa (901e4004b, juna 220; hyppy kallistaessa katsotaan junan käännöksestä). Madeleinen katto horisontissa ja terävöinnin luvut kerrottu, ei uutta työtä.

## Pihojen ja tonttien puut kokeeseen (7.11.2026 klo 18.06)

Omistaja kortilla klo 18.06 (KK:n välitys): Kokeillaanko pihojen ja tonttien puita koealueella kuvaparina? Kokeillaan. 140 puuta vain koealueen kokeeseen, päätös kuvien jälkeen, ei junaan; 2.204 voimassa siihen asti.

## PIHAPUUT EI OTETA (omistaja 7.11.2026 klo 18.39) (7.11.2026 klo 18.40)

KK:n kortti: "Otetaanko pihojen ja tonttien puut mukaan?" -> "Ei oteta (Suositus)". Linja 2.204 pysyy: puut vain puistoissa ja puuriveissä. Omistaja näki parit (kk/kuvat/pihapuut/), määrät 131 vs. 140 ja rajauksen. Joen kohteiden ero: liikkuvat veneet; paviljongin ero kerrottu ilman syytä.

## MUURIN JUURI JA PUULATTIA (omistaja 7.11.2026 klo 18.49) (7.11.2026 klo 18.50)

KK:n kortit: "Viedäänkö uusi muurin juuri koeversioon, kun oja, laatta ja rako on korjattu?" = "Viedään (Suositus)": korjaukset yleisellä säännöllä, uudet kuvat hänelle ennen junaa. "Korjataanko kuvan 5 puulta näyttävä lattia kiveksi?" = "Korjataan (Suositus)": LAV selvittää syyn (parit-saanto2/lisa7). Vienti vain tällä ehdolla. Laatta: parit-s2b/t-IK-tumma.

## TALOTYYLIT KOE3: JATKETAAN (omistaja 7.11.2026 klo 18.59) (7.11.2026 klo 19.00)

KK:n kortti: "Jatketaanko näillä viidellä talotyylillä?" = "Jatketaan (Suositus)"; ei junaan; kuvat kk/kuvat/talotyylit-koe3/. Omistajalle kerrottu: lohenpunainen ja tumma tasataan seuraavassa vaiheessa; isojen talojen seinät vaalenevat (Palais-Royal, Forumin itäpuoli, rajaus-kauka-70.jpg), syy auki, tasataan samalla. Linnut: myös uudessa kauka-70:ssa, kaikissa skenaarioissa komento elavakartta; ei kokeen osa, parvi-selitys NS:n päätelmä. PT: seuraavaksi tasaus ja kattomuodot samalla alueella, NS.

## KARTAN ELÄMÄ EI JUNAAN 220 (omistaja 7.11.2026 klo 19.02) (7.11.2026 klo 19.02)

KK:n kortti: "Viedäänkö kartan elämä junaan 220?" = "Ei junaan (Suositus)"; jää kokeeksi; kuvat kk/kuvat/kartan-elama-10-ipad/. Omistajalle kerrottu: filmin +288 Mt ja elämän huippu 4273 Mt (raja 4080), kierron +260 Mt syy auki, iPhone mittaamatta; pensaat, litteät puut, kadun keskellä lippu ja puita (rajaus-lippu-kadulla.jpg, KK:n havainto; ei työtä ilman sanaa).

## XCODE-LIITÄNNÄINEN EI NYT (7.11.2026 klo 19.32)

Omistaja 7.11. klo 19.31 (KK:n kortti): Applen Xcode-liitännäinen, josta hän kysyi X-julkaisun perusteella, ja sen kosketuskoe iPadilla: Ei nyt. Ei työtä eikä asennusta.

## PARIISIN MUISTIN KEVENNYS KOKEESEEN (7.11.2026 klo 19.43)

Omistaja 7.11. klo 19.43 (KK:n kortti, Kokeillaan, suositus): napakalotit pois muistista Pariisissa, toisen apumuistin tarve selvitetään; junaan vasta mittauksen jälkeen. KK kertoi samalla omistajalle: filmi ja terävöinti eivät junaan vielä (KK:n suositus, ei korttia), uusi kysymys muistin laskettua; MSAA, SSAO ja palojen yläraja vain tiedoksi, ei työtä. Tekijä: Natiiviseppä (PT).

## MUISTIN KOKONAISSUUNNITELMA (7.11.2026 klo 19.51)

Omistaja 7.11. klo 19.51 (KK:n välittämä): tehdään kokonaisvaltainen muistin käytön suunnitelma: mitä ladataan missäkin vaiheessa ja mitä jätetään pois. Striimikartan lataus katsotaan läpi, suurin osa nimitiedoista jätetään lataamatta, jos ne vievät paljon, maapallon karttaa kevennetään tarvittaessa isommaltakin alalta, ja tarkistetaan, lataako Unity turhaa. Mittauksesta halutaan pelkän Pariisin ja kaiken muun osuus sekä karsittavissa oleva määrä. KK suunnittelee koodista ja lokeista; NS mittaa; KK:n tulkinta: suunnitelma ensin, ei pidätä junaa 220.

## JUNA 220 VASTA OMISTAJAN PYYNNÖSTÄ (7.11.2026 klo 19.53)

Omistaja 7.11. klo 19.52 (KK:n välittämä): julkaistaan juna vasta sitten kun pyydän. Korvaa klo 11.21:n sanan julkaise juna kun kaikki korjaukset valmiit ja PT:n lähtörivin. KK:n tulkinta, kerrottu omistajalle: TestFlightiin ei viedä junaa 220 ennen hänen pyyntöään; korjaukset ja testiajot jatkuvat; muistisuunnitelma ei sido tähän.

## iPAD-ASENNUSTEN VÄLIMUISTI MYÖS PÄIVÄLLÄ (8.11.2026 klo 17.47)

Omistaja 8.11. klo 17.4x (KK:n kortit): "Tyhjennetäänkö iPad-asennusten välimuisti (78 Gt) nyt?" = "Tyhjennä sinä (Suositus)" (KK poisti 17.45, levy 8 → 79 Gi, TF 223 -vienti jatkui); "Saako kone jatkossa tyhjentää välimuistin myös päivällä, kun levytila käy vähiin?" = "Saa (Suositus)". KK:n tulkinta: vain kun asennusta ei ole käynnissä, raja alle 30 Gi. Toteutus: simu_yosiivous.py --paiva --aja (vain iPad-välimuisti, tarkistaa rajan, devicectlin ja iPad-lukon), Postivahti ajaa mittauskierroksella. Muutti Raamatun 12.19.

## JUOKSUPELI: LÄHTÖ HETI OVELTA JA SIVUSEINÄ (Raamattu 2.177) (9.11.2026 klo 02.03)

Omistajan kortti 8.11.2026 klo 22.41 "Lähteekö keisari juoksuun heti ovelta vai vasta 3-2-1-laskennan jälkeen?": "Heti ovelta (Suositus)"; korvaa 2.11.2026 järjestyksen. Dronelennon jälkeen keisari tulee ovesta, kääntyy suoraan avoimelle kujalle ja juoksee pakoon heti; huuto ja kameran kierto keisarin taakse tapahtuvat juostessa, eikä 3-2-1-laskentaa odoteta. Seinän edessä ja umpikujassa keisari odottaa yhä pelaajan pyyhkäisyä (omistaja 8.11.2026 klo 22.38), mutta sivuseinän vierustaa keisari juoksee eteenpäin pysähtymättä (omistaja 8.11.2026 klo 22.40: pysähtyminen sivuseinään on vika). Raamattuun tiivistetty 2.177:n ALKULENTO- ja EI AUTOMAATTISIA KÄÄNNÖKSIÄ -kohtiin (450 kt:n raja).

## JUOKSUPELI: LÄHTÖ OVESTA VASEMMALLE KOHTI KAMERAA (Raamattu 2.177) (9.11.2026 klo 08.33)

Omistaja 9.11.2026 klo 08.32 (KK:n välittämä, sanatarkasti): "Se aiempi versio, missä keisari lähti juoksemaan kohti kameraa, eli kääntyi vasemmalle sen jälkeen, kun tuli ulos ovesta, oli minun mielestä jouhevampi suunta, koska silloin kamera näkee vielä eunukin ja keisari juoksee kohti kameraa ja kamera voi sen jälkeen kääntyä keisarin perään, jonka jälkeen tulee numerot 3, 2, 1 ja ohjaus siirtyy sitten pelaajalle." Kumoaa kortin 8.11.2026 klo 22.41 "Heti ovelta". Sivuseinäsääntö (22.38/22.40) ja eunukin kurkistus ovella (kortti 9.11. klo 08.30 Kelpaa) säilyvät.

## TILINVAIHTO 9.11.2026 klo 09.5x (9.11.2026 klo 10.01)

PT local_8d8ebf72: tili sami.reivinen@vvi.fi (org ddaee6a2, Ultra), viikko 0 %; raja 99 % (omistaja 09.58 kortti). Tämän tilin 10 roolisessiota tyhjennetty (clear, list_events 0) ja aloitettu; id:t osoitekirjaan; taulu R6VQFTUNq629zSzah719Uy (Asemataulu v19). Ohjeiden koe: kysymys 6 (yksittäinen kuva omistajalle) puuttui lukulistalta → 7.47 KAIKILLE + 4.48.

## FPV-DRONEN ALOITUSKUVA (omistaja 9.11.2026 klo 10.16) (9.11.2026 klo 10.17)

KK:n kortti 'Mihin uudet dronekuvat tulevat?' → 'Lennon aloituskuvaksi (Suositus)': Codexin musta vastavalodrone (postilaatikko 1e31a7f0e) Topografialinssin FPV-lennon latauskuvaksi, vaaka iPadille ja puhelimen vaakaan, pysty puhelimen pystyyn, ei rajausta; korvaa 8.11. jättiläisdronen kuvatilauksen (#2197–2199 hylätty 09.15). Ei junaan ennen omistajan kokeilua. PT antoi NS:lle; kuittaus Codexille fd5bbc8cc.

## OPPI: LATAUSKUVAN RAJAUS KAIKILLA RUUDUILLA (PT 9.11.2026) (9.11.2026 klo 10.41)

PT kuittasi FPV-latauskuvan a88e3648b, vaikka puhelimen pystyruudussa dronen potkurit leikkautuivat (2:3-kuva 9:19,5-ruudulla); KK huomasi 10.39. Periaate 2 rikkoutui: kuva tarkistettiin yleisvaikutelmana eikä toimittajan lupausta ('lentolaite potkureineen mahtuu') vasten jokaisella ruudulla. Jatkossa koko ruudun täyttävä kuva tarkistetaan iPadilla, puhelin pysty ja puhelin vaaka erikseen, ja kohteen reunat merkitään ok/vika. Codexilta tilattu puhelinmuodot (postilaatikko 85c59f2ee).

## PT:N ETÄYHTEYS PÄÄLLE (omistaja 9.11.2026 klo 10.45) (9.11.2026 klo 10.46)

Omistaja KK:lle: 'laita myös päätoimittajan remote päälle'; KK kytki PT:n RC:n 10.45. Raamattu 7.9 ja PT:n aloitusviesti vaativat jo PT:n RC:n (omistaja 6.11. 21.32), mutta docs/tilinvaihto.md kohta 6 sanoi 'vain KK:lle' ja PT:n luovutus 10.05 'RC vain KK' – faktavirhe korjattu tilinvaihto.md:hen (kohta 6 ja nollaustaulukko).

## JUOKSUPELIN MUURIN JUURI SISÄISEEN KOEVERSIOON (omistaja 7.11.2026 klo 20.55; kirjattu jälkikäteen) (9.11.2026 klo 12.20)

Kortti 7.11. 20.54 (KK): "Viedäänkö muurin juuren korjaus tällaisena sisäiseen koeversioon?" (Viedään (Suositus) / Uusi yhtenäinen lattia) → OMISTAJA 20.55 "Viedään (Suositus)". KK 20.58: yhtenäinen lattia korjaisi juurisyyn, mutta sitä ei aloiteta ilman omistajan sanaa. Lähde: keskustelut/Keskustelukanava-2026-11-07-klo-2025-2059.md r. 45–49, 86. Toteutus LAV:n paketit (JU 7.11. 21.09) + PK 10e9b6c4a, junissa 220 ja 223.

## KOHOKARTAN ILMA, VALO JA RAE KELPAA (omistaja 9.11.2026 klo 10.54) (9.11.2026 klo 12.20)

Kortti "Kelpaako kohokartan uusi ilma ja rae?" → "Kelpaa (Suositus)": VS ilma b2f1407d6, valo 2f675d74b (aurinko aina luoteessa), rae 90711141e. Junassa 223 (4d105f9e7).

## TOPOKARTAN AURINKO JA AVARUUDEN RAJA (omistaja 9.11.2026 klo 10.56) (9.11.2026 klo 12.20)

Omistaja: "onko taivaalla mahdollista näkyä myös aurinko ja sillä kevyet flarekuviot topokuvissa? dronella voisi lentää niin ylös että taivas mustenee ja maapallon sininen kaari tulee näkyviin. onko mahdollista toteuttaa?" Suunnitelma KK scratchpad/keskustelukanava/suunnitelmat/20261109-topo-aurinko-ja-avaruus.md: VS koe (vain anamorfinen heijastus, omistaja 16.10.); avaruuskaari FPV-suunnitelman osa 7 perus-lennon jälkeen. Ei junaan ilman korttia.

## DRONELENNON NÄYTTÖ: KAIKKI ☰:ÄÄN JA HÄVITTÄJÄN NÄYTTÖ (omistaja 9.11.2026 klo 10.5x ja 11.00) (9.11.2026 klo 12.20)

Omistaja 10.5x: "kaikki toiminnot voi siirtää hampurilaiseen ja poistaa erillisen kytkimen. pitäisikö kokeilla tehdä hävittäjälentokone tyylinen tähtäin / kallistusnäkymä ruudulle, mitä olet mieltä? ja oliko tähän tulossa myös se minimaapallo sekä lukemat? lukemat voi olla yksinkertaisesti vain ruudulla ilman erillisiä mittareita". Kortti 11.00 "Millainen tähtäin dronelentoon?" → "Hävittäjän näyttö": keskimerkki, kallistuva horisonttiviiva, kallistusasteikko, suuntanauha, kehykset. NUI tekee; PT: kamera automaatissa ~3°, manuaalissa 30° (NS).

## PIENI IPAD SAA UUDET VERSIOT (omistaja 9.11.2026 klo 11.05 ja 12.0x) (9.11.2026 klo 12.20)

Omistaja 11.05: "olen taas töissä, niin pienelle iPadille voi sitten päivittää uusia versioita." 12.0x: "pienelle ipadille voisi siirtää uuden version heti kun uusi nostopalkki on valmis". JU asentaa uusimman vihreän junan kärjen (734ed685d asennettu 11.34).

## LONTOON NÄHTÄVYYDET OIKEAAN KOKOON KOKEENA (omistaja 9.11.2026 klo 12.0x) (9.11.2026 klo 12.20)

Omistaja: "ajattelin jopa että voisi kokeilla jos lontoon nähtävyydet palauttaisi kokeeksi oikeaan kokoon. minulla on vielä mietinnässä että miten kaikki euroopan kaupungit kannattaa tehdä." KS tekee kokeen omaan haaraan (ei junaan); muiden kaupunkien tapa omistajan mietinnässä, ei töitä.

## HUUDOT KALA-ALTAALLE JA GRANAATTIOMENAPUULLE KELPAAVAT (omistaja 9.11.2026 klo 12.32) (9.11.2026 klo 12.38)

Omistaja KK:lle: "äänet hyvät" = kaikki 8 ottoa (kala-allas + granaattiomenapuu; promptit KK scratchpad/keskustelukanava/suunnitelmat/20261107-huudot-kala-allas-granaattiomenapuu.md). PK tekee avaimet, testit ja loppuyhteenvedon, NUI antaa ottojen polut; haara PT:lle → junaan 223. Lähde: scratchpad/keskustelukanava/aloitus.md kohta j.

## PALKKI AINA YLHÄÄLLÄ (omistaja 9.11.2026 klo 12.45) (9.11.2026 klo 13.20)

Kortti "Pysyykö noston palkki aina ylhäällä niin, että avattu nosto ja Ranskan valikko tulevat sen alle?" → "Kyllä (Suositus)" ("Palkki ei katoa koskaan. Nosto ja valikko avautuvat sen alle, ja kaikkea ohjataan palkista."). KK suunnitelmat/20261109-palkki-aina-nakyvissa.md, NUI. PT 13.1x: koskee myös valikosta valittua nähtävyyttä.

## FPV-NÄYTTÖ JA NOPEUS (omistaja 9.11.2026 klo 12.57 ja 13.00) (9.11.2026 klo 13.20)

12.57 näyttö omin sanoin: iPadin tikut paremmille peukalokohdille, maapallo pieni ja läpinäkyvä (napautus suurentaa, paikanvaihto kuten ISS), iPhonen ☰ Dynamic Islandin oikealle, vauhti ja korkeus ylös keskelle. Nopeus "Oikean maan mukaan (Suositus)". 13.00: AUTO/MANUAL-nappi oikean peukalon yläpuolelle, pallon napautus manuaalissa → AUTO. NUI koe, ei junaan ilman korttia.

## PIENI IPAD SAA JOKAISEN KOKONAISUUDEN (omistaja 9.11.2026 klo 13.03) (9.11.2026 klo 13.20)

"uuden version voi ladata pikku ipadille kun nostokorjaus valmistuu ja sitä mukaa myös muita päivityksiä aina kun jokin kokonaisuus valmistuu. laita vain viestiä kun päivitetty" → Raamattu 2.217.

## SAUVA, NAPIT JA PULUN KYSYMYKSET (omistaja 9.11.2026 klo 12.58 ja 13.18) (9.11.2026 klo 13.20)

12.58 pyyntö (KK suunnitelmat/20261109-ohjainsauva-napit-pulu.md). Kortit 13.18: kierto keskikohteen ympäri "Kyllä, kaikki suunnat (Suositus)"; M-nappi "Kirjan kuvake (Suositus)"; Pulun lähteet omin sanoin "kyllä ja siinä voisi olla nappi kysymysten alla "lisää kysymyksiä" … oletuksena käytetään kuitenkin valmiiksi generoituja kysymyksiä. jokaisesta uudesta nostosta kun se kirjoitetaan täytyy tarkistaa että sille on kirjoitettu kysymyksiä." → Raamattu 2.218. PK osat 1–4, KS osa 5 (testi).

## ILTAPÄIVÄN JA ILLAN PÄÄTÖKSET (omistaja 9.11.2026 klo 14.07–19.46) (9.11.2026 klo 20.06)

- 14.07 Lontoon bussit ja taksit kelpaavat (kortti, KK).
- 14.12 kohokartan aurinko kelpaa → juna 223 (cd74573cd).
- 14.34 vuoret lennoilla: "Ei, kuten nyt" (koe pois). 15.23 kierto jatkuu nostosta kartalle napautettaessa.
- 16.4x alakulman maanimi pelaajan maasta: ei muutosta (kehittäjän harha).
- 16.46 Lontoon 14 kylttiä tekstein + Pulu + Commons-kuvat kelpaavat; Pariisin 94 nimeä myöhemmin, mallit ensin.
- 16.49 Pariisin 94 nimen tekstit jäihin; kaikista kaupungeista Pariisin kaltaisia. 16.50 paitsi 3D-mallinnus (auki).
- 17.01 nimiotto (~130) + 26 luennon alkua uudelleen; kysymykset jatkossa kortteina. 17.12 otot kelpaavat → juna 224.
- 17.02 juna 223 TF:ään (omistaja poissa studiolta). 17.03 kokeena asennuslinkki verkon yli; 17.31 toimi iPhonessa.
- 17.31 pelitila + lisämuisti kehitysversioon. Pelitila junassa 224; lisämuisti vaatii Apple-tilin Macin Xcodeen (omistajan toimi, 19.1x "Ei nyt").
- 19.06 Temple-tähti kuvamerkin yllä ja pyöreän kuvan nimi + kuvateksti + lähde kelpaavat → juna 224. Templen kuvateksti korjataan kuvan
  mukaiseksi: syy oli CDN:n vanha torikuva; PT valitsi torikuvan -v2-nimellä ja uuden vaatetoritekstin (PR 6521, sisältö v1032).
- 19.46 FPV-vuorten maalauksesta luovutaan (kumoaa 17.25): "Ei, oranssi myös lentoon", vain vuorten muotoa parannetaan. Maalaus talteen
  natiivi-backup linssiseppa2/fpv-vuoret-maalaus-it12; oranssi + valokuvio (it. 13 0809231b9) KK:lla omistajalle.

## KOLME KÄRKEÄ KERRALLAAN (9.11.2026 klo 22.53)

Omistaja 9.11.2026 klo 22.45 kysyi: "Miten parantaisit nykyisiä eri sessioiden työtapoja ja tätä kokonaisuutta miten peliä rakennetaan?" KK:n kortti 22.47 (143 asiaa työn alla; rajataanko kolmeen kärkeen, uudet ideat kirjataan heti, työ alkaa kun kärki valmistuu tai "ohi jonon") = "Kyllä, kolme kärkeä (Suositus)". Kortti 22.50 = "Kaupungit, Tekninen kunto, Juoksupeli"; valitsematta Drone-lento ja kohokartta. KK:n kapea tulkinta: junassa 224 olevat jäävät; kärkien ulkopuoliset kesken olevat pysähtyvät luontevaan kohtaan, odottavat vuoroaan, ei poistoja. Raamattu 7.49 (PT). Samalla Raamatusta karsittu historiatietoja 7.37:stä ja 7.44:stä kokorajan vuoksi.

## PÄÄTÖKSET 9.11. ILTA (PT:n luovutuksesta ja KK:n välityksistä) (9.11.2026 klo 22.53)

20.05 FPV-vuoret it. 13 0809231b9 kelpaa, jää kokeeseen. 20.44 iPhonelle versio kahdella tapilla; 21.03 vasemmalla tapilla lähemmäs; 21.11 tähtäin viipyy ja kierto tähtäimen ympäri (PK 7227a9788,
junassa 224). 21.14 pelin koko: Kyllä, suunnittele (osat 1–2 junassa 224 = 3580eb0f2). 22.04 Xcode-tili lisätty: lisämuisti kehitysversioon (b804a87d6 asennuslinkissä). 22.09 KK Fable 5.2 -mallilla
(omistaja vaihtoi; agenttisääntö ennallaan). 22.18 kierron tärinä läheltä ja aarteen tähden alta punainen piste pois (191f3fa5e junassa 224). 22.22 tärinäkorjaus kokeena: nollapiste lähelle (lähiorigo
PK dc2605d31, NS cad1fe5b1), kehitysversio omistajalle, junaan vasta Kelpaa-kortilla; korvaa 6.11. 21.30 'isoa korjausta ei nyt tehdä' kokeen osalta. 22.24 juoksupelin lataus nopeaksi (palatsi
leivotaan valmiiksi, PK). 22.42 kaupungit koodilla: yksi talokone, tyyppimallit merkkirakennuksille, ei uusia Tripo-malleja (Pariisin tehdyt jäävät); ensin osa A katot 1 km² Pariisi (Louvren
pohjoispuoli) ja Lontoo (Westminster–Covent Garden), koe, ei junaan; korvaa 7.11. kattokokeiden tauon ja vastaa 9.11. 16.50 '3d mallinnus auki'.

## ASEMATAULU JÄÄDYTETTY (9.11.2026 klo 23.09)

Omistaja 9.11.2026 klo 22.59: "En seuraa asemataulua enää kovin paljoa. Kuluttaako se resurssja? Mitä sille kannattaisi tehdä?" KK:n kortti 23.08 "Jäädytetäänkö Asemataulun ylläpito? Työlista ja junatiedot säilyvät sessioiden käytössä, mutta taulua ei enää päivitetä eikä avata; tilannekuvan saat minulta kysymällä." = "Kyllä, jäädytetään (Suositus)" (selite: ei päivityksiä, ei kehitystä, ei avata aloituksessa; mitään ei poisteta; saa takaisin päälle sanomalla). Raamattu 7.39 korvattu jäädytyksellä; 7.37:stä taulun avaus pois PT:n ja KK:n aloituksesta. Samana iltana 22.59 omistaja: "Ja järjestä vain ne kaupungin rivit" → Kaupungit-kärjen 80 riviä paketteihin A–D (24 suljettu, B1–B7, C, D).

## RAAMATTU LYHENEE KÄRKIEN MUKANA (9.11.2026 klo 23.20)

Omistaja 9.11.2026 klo 23.11 kysyi: "Kannattaako raamattua ja sitä mitä sessiot lukevat lyhentää tai muuttaa ja miten ja milloin?" KK:n kortti "Lyhennetäänkö Raamattua niin, että siihen jää vain voimassa oleva sääntö ja historia on lokissa, ja aloituksessa luetaan vain periaatteet, roolikortti ja oma luovutus? Missä tahdissa?" = "Kyllä, kärkien mukana (Suositus)" klo 23.13 (selite: "Kasvu seis heti. Kaupunkien ja juoksupelin kohdat lyhennetään kärkiensä mukana; työtapaluvut odottavat sanaasi."). Hylätyt: "Kyllä, kaikki luvut ohi jonon", "Ei nyt". KK:n kapea tulkinta: (1) heti: uusi päätös lokiin ja aihesivulle, Raamattuun enintään yksi rivi, ei uusia pitkiä kohtia (Raamattu 461 kt > 450 kt). (2) Kaupungit-kärjen mukana luvun 2 kaupunkikohdat (mm. 2.204, 2.213, 2.215, 2.210) tiivistetään nykytilaksi yhdelle aihesivulle (suunnitelma, mittaukset, avoimet), Raamattuun lyhyt sääntö + viittaus lokiin; Juoksupeli-kärjen mukana 2.177 samoin; Tekninen kunto saa aihesivun töiden edetessä; roolin lukulista osoittaa aihesivuun sitä mukaa kuin luku lyhenee. (3) Luvut 7 ja 12, roolikortit ja 7.47:n uusiminen odottavat omistajan sanaa. (4) Apulainen (Sonnet/Opus) luonnostelee yöaikaan, PT hyväksyy; ohjeiden koe (7.47) ennen ja jälkeen; jokaisen poistuvan kohdan päätös tarkistetaan lokista sanatarkasti; luku kerrallaan; päätöksiä ei muuteta, vain siirretään. Raamattu 7.49 (yksi lause, PT).

Siirretty Raamatusta sanatarkasti (7.39 ja 7.47 lyhennetty samalla): omistaja 20.10.2026 klo 23.12 työlistavahdista: "tähän pitäisi saada selkeämpi valvonta, koska tämä ei vieläkään pysy itsestään kunnossa". 7.39:n "poista siis sinulle ja kulutus osiot kokonaan" (20.10. 23.32/23.35) ja 7.47:n "miksi näin kävi" (PT 24.10.) ovat jo lokissa 2026-10.

## YÖTILA JA YÖN KEHITYSVERSIO (9.11.2026 klo 23.17–23.18)

23.17 omistaja: "Menen kohta nukkumaan. Saat silloin nollata itsesi kysymättä ja edetä muutenkin itsenäisesti. Kysy vielä tarvittaessa" → yötila; KK:n tulkinta: yöllä KK päättää työjärjestyksen, katsoo kuvat ja palauttaa keskeneräiset; aamuun odottavat omistajan omat päätökset (Kelpaa-kortit ennen junaa: tärinäkoe, kattokokeen jatko, uusi lattia; TestFlight, uudet Tripo-mallit, ostot, poistot, kärkien vaihto, luvut 7 ja 12). 23.18 kortti "Saako asennuslinkkiin laittaa yön aikana uuden kehitysversion (pienempi peli, punainen piste pois, ja tärinäkoe, jos se valmistuu), jotta voit kokeilla aamulla?" = "Saa (Suositus)" → JU vie junan 224 kärjen asennuslinkkiin, tärinäkoe kytkimellä. 23.18 kortti "Kun zoomasit kehitysversiossa lähelle Pariisissa, näkyivätkö tavalliset talot kolmiulotteisina?" = "Kyllä, kolmiulotteisina" (iPhone, b804a87d6).

## KK:N PYSYVÄ MALLI FABLE 5.2 (9.11.2026 klo 23.27)

Omistaja 23.26: "Miten sen saa muutettua että jatkossa olet aina fable?" → KK:n kortti "Asettaako Päätoimittaja Fablen tämän keskustelun pysyväksi malliksi nyt?" = "Kyllä, nyt (Suositus)". PT asetti set_session_model local_d5f31591 → claude-fable-5-2 (tulos: "will use claude-fable-5-2 from its next turn on"). Koskee vain KK:ta; agenttisääntö (1.1) ennallaan. Samana iltana: pelin koko osa 3 / nähtävyydet NS 380bd41cc kuitattu junaan 224; tärinäkorjaus 3580eb0f2:n päälle ⚙-kytkimellä yön kehitysversioon (koe, ei junaan).

## KESKUSTELUKANAVAN OLETUSTASO KOHTALAISEKSI (omistaja 10.11.2026 klo 06.10) (10.11.2026 klo 06.10)

Omistaja 06.0x: "Sinulle voisi muuttaa oletus effort tasoksi kohtalainen, se oli jäänyt maksimiin. Nostan sitten itse sitä aina tarvittaessa kun pitää miettiä jokin isompi asia." Kortti 06.10 "Vaihdanko Keskustelukanavan oletustasoksi kohtalaisen?" → "Kyllä, kohtalainen". PT asetti KK:n (local_d5f31591) tason medium 06.10; osoitekirja päivitetty.

## PARIISIN NOSTOJEN KYSYMYKSET JA KUVASELITTEET (omistaja 10.11.2026 klo 06.12) (10.11.2026 klo 06.13)

Kortti "Hyväksytkö Pariisin nostojen 22 kysymystä ja 15 kuvaselitettä?" → "Kyllä, selite 12 korjaten". Näytetty kysymykset-pariisi-luonnos.md (22), commons-kuvat-pariisi/selitteet-luonnos.md (15, 01-a uusi kirjeselite) ja arkki pariisi-kuvat-2000.jpg. Selite 12 (07-bastiljin-valtaus-a.jpg): "Heinäkuun 14. päivänä 1789 pariisilaiset ryntäsivät Bastiljiin; siitä tuli Ranskan vallankumouksen tunnetuin hetki." KS vie dataan; Lontoon tekstit omalla kortillaan.

## JUOKSUPELIN ALKULENNON VARJOT KELPAA (omistaja 10.11.2026 klo 06.19) (10.11.2026 klo 06.20)

Pyyntö 1d (8.11. 22.32 "Voisiko ne piirtyä jo kauempaa?"). Kortti "Kelpaavatko juoksupelin alkulennon varjot näin?" → "Kelpaa"; näytetty pari-1d-224-c98-ennen-nyt-a-4s.png. 1e ja 1f junassa 224; omistaja näkee ne uudesta asennuslinkistä (JU vie kärjen).

## IPHONEN KYTKENTÄ JUOKSUN LATAUSMITTAUKSEEN: EI NYT (omistaja 10.11.2026 klo 06.34) (10.11.2026 klo 06.38)

Kortti iPhonen kytkemisestä juoksupelin latausmittaukseen (PK:n luvut ennen 77b1641de / jälkeen 930eaae96) → "Ei nyt". Ajo jää JU:n jonoon; omistajaa ei muistuteta, hän kytkee kun sopii. 77b1641de säilytetään paikallisesti vertailua varten.

## LONTOON NIMIÄÄNET: KOKO OTTO (omistaja 10.11.2026 klo 06.36) (10.11.2026 klo 06.38)

PK:n ääntämistesti (8 nimeä, ElevenLabs 1 otto, 61 krediittiä; lontoo-nimet-testi-20261110.mp4) → "Kelpaa, koko otto": 99 nimeä samalla äänellä ja tavalla. KK välitti PK:lle suoraan.

## LYHYT VERSIONUMERO 224.N (omistaja 10.11.2026 klo 06.39) (10.11.2026 klo 06.42)

Omistaja 06.38: "Saako versio numeron jatkossa lyhyemmäksi" (asennuslinkin 335da402f). Kortti → "224.7" -muoto: junan numero + linkin juokseva järjestysnumero; asennussivulla, sovelluksessa ja viesteissä, commit-tunniste vain sisäisesti (asennussivulla pienellä). Viestit KK:lle muodossa "224.N (sha)". JU numeroi ipa-arkiston mukaan: 224.1 39204416d … 224.6 335da402f; seuraava 224.7. NUI 14877fa07: MATKAKIRJA_LYHYT → ☰ alin rivi, Mitä uutta, matkalaukku.

## ASENNUSSIVU JA LONTOON TEKSTIT; SISÄLTÖTEKSTIT KK:N PÄÄTETTÄVIKSI (omistaja 10.11.2026 klo 06.54–07.36) (10.11.2026 klo 07.37)

- 06.54 kaksi pyyntöä: "Automaattinen orbit kierto loppuu jos säädän kulmaa oik tapilla. Saisi jatkua." (NS 183e4bfbf → 224.10) ja "Kuvan napit näkyvät huonosti kun pois päältä" (NUI 038bbc716 → 224.9).
- 06.59 asennussivu: "Tässä riittäisi kun näkyisi version alla uudet jutut ranskalaisilla viivoilla sekä edellisen version uudet jutut. Sekä latauksen koko. Muut tekstit voi ottaa pois" → JU:n pysyvä linkkiohje 224.8:sta (Matkakirja, iso 224.N, Uutta, Edellisessä, Asenna, koko; sha ja ohjeet pois). Manifestin title "Matkakirja 224.N" joka linkissä.
- 07.36 kortti "Kelpaavatko Lontoon nostojen tekstit (18 kysymystä ja 15 kuvaselitettä)?" → "Kyllä ja jatkossa sinä saat päättää tällaiset asiat koska osaat minua paremmin nämä asiat". Lontoon A 16 + B 2 (KK:n sanamuoto: 18 "saksanhirven urosten") + C 15 kelpaavat.
- PYSYVÄ VALTUUS 07.36: nostojen ja juttujen sisältötekstien (Kysy pululta -kysymykset, kuvaselitteet ja vastaavat faktatekstit) hyväksyntä on KK:n, ei omistajan korttia. KK:n kapea tulkinta: ei koske ääniä, kuvia, malleja, generointilupia, julkaisua eikä huutoja/käsikirjoituksia. Roolit tuovat tekstit PT:n kautta KK:lle; KK kertoo omistajalle lopputuloksen rivillä.

## TYÖLISTA JONONA (omistaja 10.11.2026 klo 07.40) (10.11.2026 klo 07.44)

Omistaja 07.37: "Miten jatkossa työlista pysyisi itsestään käynnissä ja miten seuraavat asiat siirtyisivät aina oikeassa järjestyksessä työn alle?" KK:n suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261110-tyolista-jonona.md; kortti → "Kyllä (Recommended)": yksi työ per rooli, tekijä ja järjestys joka rivillä, valmis vaihtaa seuraavaan, vahti varmistaa, kulutusjarru mukana. MUUTTAA 14.10. 22.55 päätöstä: Postivahti antaa hiljaiselle roolille jonon seuraavan rivin suoraan (PT saa tiedon).
Toteutus PT 07.44: tyolista.py (PR 6542) tekija + jarj, enintään yksi työn alla per tekijä, komennot tehty/este/jono/seuraava; valmis nostaa seuraavan. Siivous: 67 työn alla → 7 (yksi per rooli), 27 jonossa, odottaa-riveillä este. Muistutushook vain työn alla -riveille. Osa 4 Postivahdille (KIERROS.md), osa 6 jarru odottaa omistajan rajaa.

## VIIKKOBUDJETTI 280 % KOLMELLE TILILLE, JARRU 40 %/VRK (omistaja 10.11.2026 klo 07.44) (10.11.2026 klo 07.46)

Omistaja 07.44: "Minulla on kolme tiliä joita käytetään vuorotellen viikon aikana. Joten yksi tili pitää kestää kolme päivää. Yhdellä kolmesta Kehitän myös muita juttuja noin 20% käytöllä joten kokonaiskiintiö noin 280% viikolle. Lisäksi nyt on ilmainen fable reset kolmelle tilille. Mutta sitä voi säästää pidemmälle ajalle". KUMOAA "neljä tiliä, kiintiö ei rajoita" ja "täysi vauhti 99 %:iin". Työlistan jonon osa 6 (KK:n operatiivinen päätös): viiva noin 40 %/vrk (1,67 %/h; 54 % klo 07.38). Postivahti vertaa tilin lukemaa viivaan: yli → vain kolmen kärjen ensimmäiset rivit + JU, muut lepäävät; viivalla/alla kaikki jonot. 99 % → rivi omistajalle ja tilinvaihto (12.23). Ilmainen Fable-reset = vara, ei käyttöön ilman omistajan sanaa. Raamattu 12.21 päivitettävä (yksi rivi).

## JARRU POIS: TÄYSILLÄ, KUNNES OMISTAJA SANOO HIDASTAA (omistaja 10.11.2026 klo 07.47) (10.11.2026 klo 07.48)

Omistaja 07.47: "Ei kannata vielä liikaa rajoittaa. Voitte tehdä täysillä. Kerron jos pitää hidastaa. Kehitetään vain keinoja työn tehostamiseen." KUMOAA 07.44:n 40 %/vrk -viivan (Postivahdille ilmoitettu). 99 %:n rivi ja tilinvaihto pysyvät; ilmainen Fable-reset varana. Tehostus (KK + PT): isot kontekstit nollaan aiemmin (≥ 25 %), ei välitys- eikä "ei uutta" -viestejä, raportti yhdellä rivillä, rooli ottaa seuraavan jonosta itse, rajatut työt Sonnetille. Mittari: valmiit työlistarivit per viikkokulutuksen prosentti. Lähtötaso 10.11. 00.00–07.48: 30 valmista riviä, joista noin 15 siivouksen kirjauksia (työ tehty aiemmin) → noin 15 aitoa / 16 % (38 % klo 01.1x → 54 % klo 07.38) ≈ 1 rivi per prosentti.

## ASENNUSSIVULLE TYÖN ALLA -OSIO, KORVAA ASEMATAULUN SEURANNAN (omistaja 10.11.2026 klo 07.58) (10.11.2026 klo 08.00)

Omistaja 07.5x: "Asennus sivulle voisi tehdä loppuun otsikon työn alla niin voisin sitä kautta seurata missä mennään ja mitä on tekeillä. Korvaisi entistä asemataulua. Mitä olet mieltä?" Kortti 07.58 "Mitä asennussivun loppuun lisättävä Työn alla -osio näyttää?" → "Kolme osaa (Recommended)": Odottaa sinua, Työn alla ja Seuraavaksi; päivittyy jonosta itsestään ja näyttää päivitysajan.
Toteutus (KK:n tavoite, PT 08.0x JU:lle jarj 0): sivun alkuosa ennallaan; alle 1) Odottaa sinua (rivit, joiden este on omistaja tai KK:n kortti), 2) Työn alla (rooli + rivi, yksi per rooli), 3) Seuraavaksi (roolin seuraava jonorivi), lopuksi "Päivitetty klo". Selkokieli, roolien koko nimet, ei sha:ta eikä lyhenteitä. Pelkkä skripti tyolista.json:sta (ei mallia), uudelleenluonti aina kun tyolista.py kirjoittaa; sivu vain tailnetissä. Asemataulu pysyy jäädytettynä (7.39).

## YKSI TARKKUUS KOKO NÄKYMÄÄN: JATKETAAN UUTENA TYÖNÄ (omistaja 10.11.2026 klo 08.00) (10.11.2026 klo 08.01)

Kortti (Pariisi-pino 5) "Jatketaanko kokeilua, jossa Pariisin tarkempi alue poistetaan, jotta kartta on yhtä tarkka koko näkymässä?" → "Jatketaan uutena työnä" (selite: uusi yritys, jossa laite hakee karttaa vain rajatun määrän kerrallaan; menee jonoon). Omistaja näki parin 5-tarkka-alue-pari-z12.jpg ja perustelut; suositus oli Ei. KUMOAA 7.11. 14.2x "SEIS" -tilan.
Tavoite (KK): kartta yhtä tarkka koko näkymässä ilman suoraa rajaa niin, että Pariisi pysyy terävänä (pikkukadut, puistot, Seine), iso iPad ei kaadu kallistettuna eikä nipistys hyppää. Koe; junaan vain kortilla kuvista (7.11. 11.21). Ei Pariisi valmis -kortin este (7.11. 10.53). Työlista: NS, kärki Tekninen kunto, jarj 6 (ISS-muistin jälkeen).

## Siirretty Raamatusta 10.11.2026 (kohdat 2.177, 2.204, 2.210, 2.213, 2.215)

Omistajan päätös 9.11.2026 klo 23.13 (Raamattu 7.49): kohdat tiivistettiin kärkien mukana; nykytila docs/moduulit/juoksupeli.md ja docs/moduulit/kaupungit.md. Alla kunkin kohdan koko teksti sellaisenaan ennen tiivistystä (Raamattu commitissa 229cc209e).

2.177 KIELLETYN KAUPUNGIN JUOKSUPELI (omistaja 17.10.2026): poikkeus: pelaaja on Puyi, kamera korkealla suoraan takana ja Puyi näkyy (etukulmat vain lyhyinä välikohtauksina). Seinät normaalikorkuisina. PELIN YDINAJATUS: AVOIN PALATSI JA ENNAKOITAVAT EUNUKIT (SITOVA, omistaja 30.10.2026 klo 19.12 ja 31.10.2026 klo 18.26, korvaa alla olevan radan toistuvista paloista): pelaaja valitsee reitin itse koko oikealla palatsialueella; maailma on täysin avoin, keisari voi liikkua minne tahansa (jokainen kuja, portti ja aukio), eikä mikään pakota yhdelle radalle. Eunukit tulevat edestä ja sivuilta niin, että pelaaja näkee ne ajoissa ja voi valita reitin, jolla väistää ne ennalta; lähellä pelastavat väistöliikkeet ("Se on se koko pelin idea"). EUNUKIT (SITOVA, omistaja 2.11.2026 klo 07.09–07.12; klo 12.13: "Eunukkeja voi tulla alussa todella vähän. Ja kun mennään tasoja ylöspäin, niin silloin niitä voi alkaa tulla enemmän. Samoin kun taso etenee, eli kun pelaaja on mennyt pidemmän aikaa samaa tasoa, niin eunukkeja voi silloin myös alkaa tulla enemmän. Lisäksi eunukit sopivat paremmin ulos kuin sisätiloihin. Koska ulkona on enemmän tilaa väistää. Vaikeammilla tasoilla eunukkeja voi olla myös sisätiloissa."): eunukit juoksevat aina kohti eivätkä koskaan seiso, ja näkyvissä on yleensä yksi tai ei yhtään; alku on rauhallinen, ja eunukkeja tulee useammin tasojen myötä ja tason sisällä ajan myötä ("enemmän" = useammin, ei enempää yhtä aikaa); ne ovat ensisijaisesti ulkona, sisätiloissa vain vaikeammilla tasoilla (taso 1 ulkona). Kun pelaaja palaa samaan paikkaan, kerättävää ja rikottavaa voi ilmestyä lisää, mutta vähemmän kuin ensimmäisellä kerralla. VAPAA MAAILMA, KATOT PAIKOILLAAN JA YKSI KAMERASÄÄNTÖ (SITOVA, omistaja 4.11.2026 klo 11.42 ja kortti 11.49 "Tehdäänkö kamera ja keisarin kulku tällä koneen laskemalla kartalla?": "Kyllä (Suositus)"; korvaa kohdat DRONE JA KATOT ja katon poiston): "pelissä ei kuulu olla yhtään reittiä vaan peli on vapaa maailma eikä maalia ole. ainoa maali on kun pelaaja saa juostua jonkun tietyn ajan uupumatta ja saa sitä kautta pääsyn seuraavalle tasolle." Katot pysyvät aina paikoillaan, myös kattojuoksussa; kamera laskeutuu ahtaassa ja kulkee keisarin perässä ovesta sisään, yhdellä säännöllä koneen rakennuksista laskemasta kartasta; juoksu voi hidastua hieman sisällä. Käsin maalaus vain korjauskerroksena, jos laskettu tuntuu väärältä. Ei reittejä eikä solmuja kulun pohjana. Kolme tasoa pysyy, ensin taso 1 pelattavaksi; alkulento, ei automaattisia käännöksiä, seinän edessä pysähtyminen, eunukit ja Puyi aina ruudussa pysyvät. Toteutus lipun takana, vanha peli vertailuna, kunnes uusi on parempi. [korvattu 4.11.2026: VAPAA MAAILMA] DRONE JA KATOT (omistaja 21.10.2026 klo 10.43): dronekamera pysyy koko ajan ylhäällä keisarin takana muurien yllä eikä lennä oviaukkojen alta; ahtaassa se jyrkkenee ja avarassa loivenee pehmeästi; ainoa poikkeus on aloituksen alkulento (yleiskuvasta sukellus kujalle oven eteen, ks. ALKULENTO JOKA ALOITUKSEEN). ALKULENTO JOKA ALOITUKSEEN (SITOVA, omistaja 2.11.2026 klo 13.38, korvaa 27.10.2026 linjauksen "tasolla 1 ei alkulentoa"): jokainen aloitus alkaa dronelennolla keisarin luo, sitten keisari tulee ovesta, kääntyy vasemmalle ja juoksee kohti kameraa eunukin näkyessä ovella; kamera kääntyy keisarin perään, laskenta 3-2-1 ja ohjaus pelaajalle (omistaja 9.11.2026 klo 08.32, kumoaa kortin 8.11.2026 klo 22.41 "heti ovelta"). EI AUTOMAATTISIA KÄÄNNÖKSIÄ (SITOVA, omistaja 2.11.2026 klo 13.38): keisari kääntyy vain pelaajan ohjauksesta; autopilotti on vain QA-ajoissa; umpikujassa ja seinän edessä keisari pysähtyy ja odottaa pelaajan ohjausta, mutta sivuseinän vierustaa juoksee pysähtymättä (omistaja 8.11.2026 klo 22.38 ja 22.40: pysähtyminen sivuseinään on vika). Drone huojuu koko ajan hieman sivulle ja lähemmäs–kauemmas ja kallistelee, jotta kamera on elävä. Kaikissa rakennuksissa näkyy katto ([korvattu 4.11.2026: katot pysyvät paikoillaan, ks. VAPAA MAAILMA] talon katto poistui, kun keisari meni sisään). KUVAKULMA JA VÄRIT (SITOVA, omistaja 24.10.2026, korvaa kulman B): pelin ainoa kuvakulma on havainnekuvan 810 kulma: kamera kattojen yläpuolella ja jyrkemmin alas, keisarin taakse jää vähän tyhjää, keisari yhtä iso kuin kulmassa B, kapea kuva-ala ilman venymää; kuvakulmanappia ei ole. Värit, sävyt ja valo mahdollisimman lähelle havainnekuvia: ei liian tummia mustia eikä liian voimakkaita värejä, tarkistus mittaamalla kuvaparista. PALATSIN MITTAKAAVA (SITOVA, omistaja 25.10.2026, korvaa 20.10.2026 mitat oikeat -linjan): paikat, järjestys, keskiakseli, suunnat sekä jokaisen rakennuksen muoto ja mittasuhteet säilyvät, mutta koko palatsi (rakennukset, välimatkat, aukiot ja kujat) skaalataan yhdellä yhteisellä kertoimella; ovet, portaat ja kaiteet pysyvät ihmisen kokoisina keisariin ja eunukkeihin nähden; kerroin on lukittu arvoon 1,0 (omistaja 25.10.2026 klo 11.31: "Kyllä, koko pysyy"); kujia kavennetaan erikseen vain pelattavuuden vaatiessa, ja kaksi kapeaa punamuurikujaa (havainnekohdat 02 ja 05) levennetään havainnekuvien leveyteen muureja siirtämällä, rakennukset ennallaan (omistaja 25.10.2026 klo 11.32: "Kyllä, levennetään"); rakennus- tai suuntakohtaiset skaalaukset ovat kiellettyjä. Kerroin haetaan havainnekuvavertailulla, ja omistaja näkee vertailukuvat ennen lukitusta. Tavoite: pelaaja tunnistaa todellisen palatsin ja sen rakennukset. VAIN VALMIIT PALAT (SITOVA, omistaja 21.10.2026 klo 10.18): pelissä on vain valmiita, toimivia osia; keskeneräiset (esim. läpi juostavat esteet ilman rikkoutuvia osia, ilmassa leijuvat nauhat) pois, kunnes ne valmistuvat; rekvisiitta lisätään yksi kerrallaan, ja jokaiselle mietitään funktio ja paikat. Palatsin ympärillä näkyy 1900-luvun alun Peking, ei toista Kiellettyä kaupunkia. Jatkuva juoksu ilman piiloutumista, yksinkertainen reaktiopeli, pelkistetty grafiikka, nopeus tärkeintä; perässä juoksija, vartijoita sivuilta; reitinvalinta (myös katottomat talot) harhauttaa; esineitä kerätään juostessa. Ohjaus (nykyinen koodi, PK 6.11.2026): oikea peukalo sivulle = käännös (koko peli kääntyy, kamera pehmeästi Puyin taakse), ylös = hyppy, alas = ajoitettu liuku hyppäävän kiinniottajan alta (liian aikaisin tai myöhään = kiinni), napautus = kaistan vaihto; vasen peukalo napautus = heitto eteen, ylös = spurtti (viitan kanssa), alas = heitto taakse, sivulle ei mitään; kiinni ollessa kumman tahansa peukalon kosketus = rimpuilu. Palatsi on suorakulmainen ruudukko; takaisin kääntymällä kahdesti tai kiertämällä talon (takaa-ajaja seuraa ruudukossa, kierto harhauttaa). Juoksu jatkuu, kunnes jää kiinni; [korvattu 31.10.2026: avoin palatsi, ks. PELIN YDINAJATUS] rata toistuvista paloista (portti, piha, katoton talo, muurikäytävä) aina uudessa järjestyksessä, välillä nimetty paikka (Korkeimman sopusoinnun halli, kulmatorni). Omenat (taskuun muutama): vasemman peukalon napautus heittää lähimpään, osuma liukastuttaa. Spurtti: vauhtiviitat täyttävät mittarin, vasemman peukalon pyyhkäisy ylös syöksee Puyin otteen ulottumattomiin. Kattoreitti: muureilla ja katoilla enemmän aarteita ja omenoita, vartijat eivät yllä; ylös portaista tai muurin kulmasta, raot ajoitetulla hypyllä, huti pudottaa pihalle. Tuotantoputki: 1) PT + PK pelikirja; 2) PK harmaa versio (2–3 väylää, kaikki ohjaukset, kiihtyvä vauhti) Pelit › Keskeneräiset + alle minuutin video; 3) omistaja pelaa, hionta; 4) LR ja VS palasarja yhteisin liitoksin (Codexin j8–j10); 5) hahmot ja liikkeet; 6) NUI pelinäyttö UI-pohjilla; 7) SS ja Äänittäjä äänet ja faktakortit (luvat kortilla); 8) Pelaa-valinta omistajan hyväksynnällä. OVET (SITOVA, omistaja 4.11.2026 klo 11.55): "kaikilla rakennuksilla saisi olla ovet ja ne saisivat olla oletuksena auki kaikki. ainoastaan aloituksessa pelaaja työntää oven auki ja juoksee pakoon". OVIEN TOTEUTUS (SITOVA, omistajan kortti 4.11.2026 klo 12.48: Kyllä): taso 1: yksi ovimalli, jonka kone sijoittaa jokaisen rakennuksen etusivulle yhdellä säännöllä; takana hämärä pinta, ei läpinäkymää eikä lattian reikiä; keisari pysähtyy kynnykselle, ja lyhyt viesti kertoo, että sisälle pääsee seuraavalla tasolla. Taso 2: hämärä vaihtuu oikeaan sisätilaan ensin niissä 36 mallissa, joissa sisätila jo on. TASON 1 KULKUALUE (SITOVA, omistajan kortit 4.11.2026 klo 13.00: Kyllä ja Kyllä): kulkualue on ulkomuurin sisäpuoli lukuun ottamatta suljettuja pihoja, jotka jäävät kiinni; maailma loppuu tasolla 1 palatsin ulkomuuriin. Portit avataan myöhemmin yhdellä säännöllä; koko palatsialue pysyy tavoitteena (31.10.2026). TASOJEN SISÄLTÖ (SITOVA, omistaja 4.11.2026 klo 11.53, tarkentaa KOLME TASOA): "ensimmäisellä tasolla voisi siis kerätä lähinnä mätiä ja hyviä omenoita ja heitellä ja väistellä eunukkeja." Ulkona ei ole rikottavaa, koska rikkoutuvat istuvat luontevasti vain sisälle, paitsi tason 1 aukioille kala-allas ja kukkaruukku (omistajan kortti 4.11.2026: Kyllä). Taso 2: sisällä väistellään myös rikkoutuvia esineitä ja kerätään pienempiä esineitä, joilla pääsee tasolle 3. Taso 3: hyppyviitta ja hypyt katolta toiselle. Keskitytään nyt vain tasoon 1. KOLME TASOA (SITOVA, omistaja 27.10.2026 klo 08.30): taso 1 = alkukohtaus, ohjainopetus ja juoksu ulkokujilla ja aukiolla, lyhyempi; taso 2 = ulkokujat ja lisäksi huoneet ja salit, ei pelkkiä sisätiloja (omistaja klo 10.17), selvästi pidempi; taso 3 = yhtä pitkä, lisäksi hypyt katoille ja alas sekä katolta toiselle viitan avulla. Tuotanto tasoittain, julkaisu kokonaisena. ALKU JA OPETUS (SITOVA, omistaja 27.10.2026 klo 08.26–08.29): peli alkaa nykyisen kujan perältä: keisari työntää takimmaisen rakennuksen oven auki, livahtaa ulos ja huikkaa "Ottakaa kiinni, jos saatte!" (omistaja klo 10.10: keisari työntää oven itse auki juostessaan ulos; ovi pysyy kiinni, kunnes kädet osuvat siihen; huonetta ei näytetä, vaan kamera on kujalla ja tulee pakenevaa keisaria vastaan; klo 10.25: kamera ei osoita sisätilaan, vaan kuvaa kadun suuntaisesti, ja keisari näkyy vasta, kun hän on tullut ulos ja kiertänyt oven takaa kujalle); perään kurkistaa heti ensimmäinen eunukki ja huutaa "Teidän majesteettinne!". Kamera kiertää kasvojen edestä nopeasti keisarin taakse, laskenta alkaa heti ja pelaaja ohjaa jo ensimmäisellä suoralla. Jokainen ohjausliike opetetaan ruudun ohjeella juuri tarvittaessa: ensin T-risteyksessä oikealle pyyhkäisy, sitten hyppy esteen yli, sitten vasen käännös ja niin edelleen; omenan heitto vasta ensimmäisen omenan kohdalla. Peli hidastuu ensimmäisten ohjeiden kohdalla, kunnes pelaaja tekee liikkeen. Väistö: arvokas esine tulee linjalle, ja väistön jälkeen keisari sanoo lyhyen repliikin (Huh! / Huh, läheltä piti! / Hui! / Melkein!). TOIVEET JA GRAFIIKKA (omistaja 19.10.2026 klo 07.20 ja 08.30): omistaja antaa juoksupelin toiveet KK:lle, joka välittää ne PT:lle sanatarkasti; grafiikan tilaa PT tai Pelikoodari Codexilta postilla omistajan päätöksellä, eikä Claude pyydä Codexilta omia makumuutoksia. GRAFIIKAN TASO (SITOVA, omistaja 24.10.2026 klo 11.22, korvaa 02.38:n "iPadin rajoissa"): grafiikka tehdään havainnekuvien tasolle (seinät, syvennykset, ikkunat, koristevyö, taivas) karsimatta iPadin suorituskyvyn takia; jos jokin ei pyöri iPadilla sulavasti, se hyväksytään, koska Unityn tulevat versiot todennäköisesti korjaavat sen. Vertailu kohta kohdalta havainnekuviin 01–07 myös yksityiskohdissa (omistaja klo 10.53): leveä sinivihreä kuvioitu koristevyö räystään alla, seinissä syvennyksiä, pylväitä, ovia ja ikkunaristikoita, kivijalka ja räystäät havainnekuvan tasolla; taivas syvän sininen ja horisonttia kohti vaaleneva, pilvissä sävyjä ja varjoja, ei ylivalottunutta vaaleutta; kuvaparit omistajalle. ENSIN YKSI KOHTAUS MAHDOLLISIMMAN HIENOKSI (SITOVA, omistaja 31.10.2026 klo 18.27–18.31, tapa kaikkeen uuteen valoon ja grafiikkaan): uusi valo- tai grafiikkatapa viimeistellään ensin yhdessä koekohtauksessa (juoksupelissä Meridiaaniportin piha 06) taivaineen ja kaikki saatavilla olevat grafiikka-, valo- ja efektiparannukset päällä, myös Unity-beetan uudet mahdollisuudet; suorituskyvystä ei tässä vaiheessa välitetä eikä laitteilla tehdä tarkistusajoja ("Tärkeintä, että saadaan pelistä visuaalisesti mahdollisimman hieno"). Tulos kuvina tai videona Macista KK:lle ja omistajalle; muut kohtaukset vasta hyväksynnän jälkeen. Hyväksytty ilme on sen jälkeen mittari, kun peli tehdään laitteilla nopeaksi: jos tehoste ei toimi puhelimessa, sama ilme tehdään kevyemmin (esim. leivottuna). HUUDOT (omistaja 19.10.2026 klo 12.23): kun Puyin huutorivejä tuodaan hyväksyttäviksi, jokaisen rivin yhteydessä näytetään yhdellä rivillä uneksinnan (muistokuplan) sisältö ("Uni: <kuva>, teksti: <dynastia + vuosi>"); uudet huutoerät tauolla, kunnes erät 1–2 on testattu pelissä. TEKIJÄN OMA TARKISTUS (omistaja 30.10.2026 klo 16.0x): ennen kuin rakennuksen kuvapari tai kortti lähtee PT:lle/KK:lle, tekijä 1) asettaa edestä otetun ortokuvan piirroksen päälle (vierekkäin + päällekkäin, IoU), 2) ajaa automaattisen tarkistuksen: materiaalien värit havainteeseen ja omistajan päätöksiin (esim. kivijalka harmaa 27.10.) sekä lähikuvat jokaisesta muutetusta kohdasta, 3) varmentaa piirroksen [A]-mitat (arviot) kuvista ennen 3D-työtä ja kirjaa lähteen ja laskelman LUE.md:hen. Puuttuva kohta = erä palautetaan tekijälle.

2.204 PIIRROSKAUPUNKI (KARIKATYYRIKARTTA) KORVAA NÄHTÄVYYSKARTAN (SITOVA, omistaja 2.11.2026 klo 08.31–08.44; loki 9f5ceb12d, 9b126b426, 2f5cdcac9): kaupunki, jolle on tehty piirretty karikatyyrikartta, näytetään sillä; nähtävyyskartta ja kaupungin valokuva poistuvat. Kaupungit ilman piirrosta pysyvät ennallaan. Pariisi hiotaan ensin valmiiksi, sitten malli monistetaan kaikkiin Euroopan kaupunkeihin. MALLI: kaikki kaupungin nostot ja nähtävyydet omalle paikalleen piirrokselle, kyltissä lajimerkki; kaukaa vain nähtävyydet, muut esiin lähempänä; kyltit kiinteästi paikallaan ja piirroksen mittakaavassa. Aarteen vihreä piste näkyy piirroksella. KADONNEET IHMEET: kyltissä ★; vapaalle paikalle pyöreä kuva, sama merkki kuin muilla kohteilla, vieressä tähtikyltti (omistaja 5.11.2026 klo 21.07, 2.215; korvaa Codexin karikatyyrityylillä piirtämän leikatun kuvan); jos paikalla on nykyään toinen rakennus, ei kuvaa vaan toinen ★-kyltti nykyisen kyltin alle, napautus avaa nostoruudun (havainnekuva + oma infoteksti). Turistiinfo ja lehtikioski omina rakennuksinaan kaupungin keskeisellä aukiolla (ei saapumiskohdan mukaan), samannäköisinä kaikissa kaupungeissa; napautus avaa turistiinfo-liitteen / kaupunkilehden. SAAPUMINEN: piirroksen tasot ladataan matkan alusta, ja zoomaus piirroksen lähitasolle kaupungin keskustaan (omistaja 08.45: aina keskustaan, jolloin lehtikioski tulee näkyviin; ei saapumiskohtaan) alkaa vasta kun tasot ovat valmiina, isoisän lukiessa (omistaja 2.11. klo 21.42: OLETUS KAIKISSA EUROOPAN KAUPUNGEISSA, myös ilman piirrosta: pohjana striimikartta, kaupungin sisäiset nostot omilla paikoillaan samalla porrastuksella, piirros vaihtuu striimin tilalle kun valmistuu; yksi saapumistapa; suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261102-nostot-ja-zoomaus-kaikkiin.md). Suurennuslasin Kartta-välilehdellä kytkimet Karikatyyrikartta ja Kadonneet ihmeet; karikatyyri päällä ja lähelle zoomattaessa kartta kääntyy pehmeästi suoraksi (pohjoinen ylös). Piirroskaupungissa ei Avauskorttia eikä kutsuminiatyyriä; kaupunkipisteen napautus = sama zoomaus keskustaan. UUDEN PELIN ALOITUS (omistaja 2.11. klo 09.12): aloituslento päättyy nykyiseen yleisnäkymään, josta erillinen zoomaus piirretyn kaupungin keskustaan (ilman isoisän puhetta, 2.161). TARKKUUS JA TYYLI (omistaja 2.11. klo 17.06, korvaa 1.11. klo 13.54 ja 18.22): piirroskaupunki tehdään koko kaupunkina noin 2,5 m/px tarkkuudella (Pariisi ilman Bois de Boulognea ja Bois de Vincennesia 15 palaa), ei erillistä lähitasoa; sama tarkkuus seuraaviin kaupunkeihin. TYYLI (omistaja 2.11. klo 17.39–17.42, korvaa Codexin 16.39-koepalan ja 3 kuvan pohjan): Pariisi tehdään alusta isoisän ajan matkailijan kartaksi, yksinkertaistettuna; kaikkia rakennuksia ei piirretä. Oikeasta kartasta säilyy runko: Seine, pääkadut, sillat, puistot ja tärkeimmät nähtävyydet oikeilla paikoilla ja etäisyyksillä; vähäiset asiat jätetään pois. Suunnitelma ja tekotapa KK:n kortilla omistajalle; ennen sitä ei palatilauksia eikä Magnific-tilausta. Toteutussuunnitelma: scratchpad/keskustelukanava/suunnitelmat/20261102-pariisi-piirroskaupunki.md (7.48). UUSI KARTTA ON KK:N SUUNNITTELUVASTUULLA (SITOVA, omistaja 3.11.2026 klo 19.35): uuden kartan (Pariisi striimikartan päälle, yläviisto kulma kuten Codexin koko kartta, nähtävyydet karikatyyreinä samassa kulmassa ja niiden alta tavalliset talot pois, osakirjasto, elävä kartta, sitten muut kaupungit) suunnittelu ja tekotavat ovat Keskustelukanavalla kuten juoksupelin ohjat; PT jakaa työt, junat ja merget ja kirjaa Raamatun. Yläviisto kulma koskee kaikkia elementtejä (omistaja 19.3x); kattopintojen uusia tilauksia ei tehdä ennen KK:n suunnitelmaa. RAKENNUSPERIAATE (SITOVA, omistajan kortti 3.11.2026 klo 20.51 "Rakennetaanko kaupunkikartat tällä periaatteella?" → "Kyllä (Suositus)"): kaupunkikartat rakennetaan tiedoston proto-3d/_kirjasto/kartta-osat/RAKENNUSPERIAATE.md mukaan. Se lukitaan, minkä pelaaja huomaa (kadut, joki, rannat, puistot ja aukiot oikein; mittakaava ja matkat; tärkeimmät nähtävyydet oikealla paikalla, koko liioiteltu niin paljon kuin mahdollista ja julkisivu käännettynä katsojaa kohti; yksi kuvakulma, valo ja tyyli; kaupunginosien luonne), ja muu oikaistaan (tavalliset talot korttelipinnoin ja kolmella korkeusportaalla, pikkukujat pois, talot nähtävyyksien alta pois, puut vain puistoihin ja puuriveihin, pienet kohteet yhteisestä kirjastosta, liikkuvat monistettuina, loitonnus yksinkertaistaa, kartta valmiiksi kuviksi). Kaupunginosien luonne merkitään ensin automaattisesti kartta-aineistosta, ja ihminen vain korjaa (KK). EI VEDEN PÄÄLLE (omistaja 3.11.2026 klo 21.29: "Ei se voi noin mennä veden päälle", 21.30: "Ei se mene g versiossa kaanon. Katsokaa sieltä mallia"): mikään nähtävyys ei mene veden päälle, ja joki näkyy kokonaan; liioittelu tehdään ylöspäin (korkeus, tornit) ja maalla; pääkadun ja rantakadun saa peittää. MALLI ON G (omistaja 3.11.2026 klo 22.09): Codexin pariisi-koko-kaupunki-G-tyyli.png (d0191a334, 31.10.2026), EI pariisi-laaja-g-v4.png; nähtävyyksien liioittelu G:n suhteessa. TAKANA OLEVA JOKI (omistaja 3.11.2026 klo 22.14): nähtävyys saa levitä takana olevan joen ja rannan päälle kuten G:ssä; edessä ja sivuilla joki pysyy auki ja sen kulku erottuu, eikä jokea saa katkaista (tarkentaa 21.29-sääntöä). PIENET KADUT (omistajan kortti 4.11.2026 klo 06.51 "Jätetäänkö pienet kadut pois myös lähikuvasta?" → "Pois (Suositus)"): pienet kadut jäävät pois myös lähikuvasta z16–17, jotta talot pysyvät ehjinä; poikkeus rakennusperiaatteen lukittuun kohtaan 1, oikaistaan-kohdan 2 mukaan. Poistuvien katujen nimet ja liikkuvat pois. JOKI JA RANNAT KIRKON YMPÄRILLÄ (omistajan kortti 4.11.2026 klo 07.56 "Saako Codex siirtää jokea ja rantoja kirkon ympärillä?" → "Kyllä (Suositus)"; selite: kirkko seisoo saarella kuten 2029:ssä, mutta joki ei ole kirkon kohdalla täsmälleen oikeassa paikassa): nähtävyyden piirtäjä saa siirtää jokea ja rantoja nähtävyyden ympärillä, jotta nähtävyys ja ympäristö ovat yhtä piirrosta. Vesisääntö 21.29/22.14 pysyy: nähtävyys ei mene joen päälle edessä eikä sivuilla, eikä jokea saa katkaista. OPENFREEMAP JA POISTOTAULU (omistaja 7.11.2026 klo 07.49, kortit): lupaa pelin koko käytölle ei kysytä ennen ulkoista julkaisua; käyttö pysyy ennallaan, ja epäselvä osa jää auki. Skriptattujen hakujen kielto pysyy. Poistettavat talot haetaan jatkossa avoimesta aineistosta ja vanhat haetut palat poistetaan: oma työnsä vasta, kun Pariisin kartta on lukittu, ei koeversioon; peli käyttää elävää karttaa yhä palvelusta.

2.210 PARIISIN ALOITUSLENTO JA KARTALTA NOUSEVAT KUVAT (SITOVA, omistaja 5.11.2026 klo 11.15, kortit 11.26, 11.43 ja 11.45; suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261105-pariisin-aloituslento.md): saapuessa kamera ei jää paikalleen, vaan jatkaa zoomauksesta pysähtymättä hitaaseen kiertoon kaupungin yllä, ja kierto loppuu pehmeästi isoisän luennan alkupuolella. Viidestä nähtävyydestä (Eiffel-torni, Riemukaari, Sacré-Cœur, Notre-Dame, Louvre; omistaja 11.26) nousee vuorollaan kuva omalta paikaltaan noin 2 s ajaksi ja palaa kartalle; neljä katukuvaa ja Invalidit eivät nouse, vaan jäävät pieninä kartalle (pyöreät merkit jäävät, omistaja 3.11. 09.28 ja 5.11. 15.01). LIIKE: "niiden animaatio saa olla hieman hitaampi", ease in/out, keskellä nopein, viimeinen kasvu lähes täysikokoisena hyvin hidas; uusi kuva alkaa nousta, kun edellinen on melkein pienentynyt kartalle, ei tyhjäkäyntiä. MATKAKIRJAN ALAOSA: vain isoisän ottamia kuvia. Isoisän kuva nousee ensin ottopaikaltaan ja lentää lopuksi matkakirjan alapuolelle. Pariisin ilmakuva C5 poistuu epärealistisena (omistaja 11.26, 11.43); tilalle isoisän Tuileries-kuvat i1 ja i2, ottopaikka Tuileries'n puutarha. PULUN KUVAT nousevat ja palaavat kartalle kuten intron kuvat, omalla pyöreän kehyksen värillä. TUILERIES-KORTTI (omistaja 11.43, 11.45 "tehdään"): isoisän kuvan napautus matkakirjassa vie kartan Tuileries'n palatsin luo ja avaa kadonneen aarteen nykyisen kortin; toisessa kaupungissa kortti aukeaa ilman lentoa, ja pelaaja jää sinne (omistaja 11.48). KORVAA: 3.11. 08.48 kameran pysähdyksen ja isoisän kuvan nousun matkakirjasta, 3.11. 15.40 kuvien ajan puoleen ja 2.205:n samanlaisen kehyksen. LUENNAN JÄLKEEN (omistaja 14.29, kortti): kamera jää Pariisin ylle, jotta kaupunki ja nähtävyydet pysyvät näkyvissä; ei 2.136:n loitonnusta maahan. Lontoo ja muut kaupungit ennallaan. KULMA JA NIMI (omistaja 15.18): "pariisin introssa kartta saa olla aika sivusta (ei suoraan ylhäältäpäin) jotta 3d rakennukset näkyvät hyvin. pariisin nimen takana ei saa olla tummennusta": kartta on kallistettuna koko aloituslennon ajan, ja PARIISI-nimi on kartan päällä ilman tummennusta; luettavuus nimen omalla reunalla tai varjolla. Toteutus (NS:n arvo, omistaja ei nimennyt lukua; omistaja katsoo kuvasta): kierron kallistus 60° (oli 30°), ei palaa nollaan luennan aikana; PARIISI ilman soikiota. LIIKU (omistaja 15.05, kortti): kun pelaaja painaa Liiku Pariisin yllä, kamera loitontaa itse, jotta kohteet ja reitit näkyvät. SEURAUS: Ranskan maakuntien täyttö jää pois, jos Pariisi on ensimmäinen kohde (omistajalle kerrottu 14.41). MÄKIEN VARJOSTUS (omistaja 14.27, kortti): häipyy, kun kamera laskeutuu kaupungin ylle; mäet näkyvät kaukaa, ja kaupunki on lähellä puhdas. ALOITTAVA PELAAJA (omistaja 5.11.2026 klo 20.20, kortti "Saako aloittava pelaaja Pariisiin uuden aloituslennon vanhan intron tilalle?" → "Kyllä"; kortissa: "Kamera kiertää, kuvat nousevat kartalta ja William sanoo nimen ja iskulauseen."): Pariisista aloittava pelaaja saa aloituslennon 2.161:n intron tilalle; muut aloituskaupungit ennallaan. Aloittavalla pelaajalla kierto hiipuu pehmeästi Pulun aloituksen alkupuolella, ja isoisän Tuileries-kuva ei nouse, koska hänen ensimmäinen tekstinsä tulee vasta seuraavassa kaupungissa (nämä KK:n tulkintoja, omistaja näkee kuvien kanssa; Tuileries-kuvan puuttuminen aloituksesta kerrottu omistajalle 21.02:n kortin yhteydessä). RAJAUS: aloituslento vain Pariisiin, kunnes omistaja toisin sanoo; Lontooseen tehdään Pariisin jälkeen sama toteutus (omistaja 11.15; pysyy, kunnes omistaja päättää 2.213:n kortilla). TARKENTAA 2.209:n: Pariisiin liittyvät työt jatkuvat, ja odottavat työt jatkuvat, kun Pariisi on valmis (ei enää juoksupeli ja Pariisi; KK 11.15). Testit vasta valmiina, ei junaan ennen omistajan lupaa.

2.213 OHJELMANA TEHDYT LISÄKOHTEET (SITOVA, omistaja 5.11.2026 klo 12.57, 20.44 "Nyt rinnakkain", 21.49 "Oikeissa mitoissa"; kortit ja kumottu järjestys lokissa; suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261105-kaupungit-avoimesta-datasta.md, MUUTOS 1; lähtökohtana Tiny Warsawin ja Tiny Praguen rakennustapa): 2–3 kohdetta ohjelmana, oikeat mitat, ei Tripoa; Macin kuvat neljästä suunnasta Tripon mallien rinnalle → KK. KK katsoo koodin ohjelmamallit (Erikoismallit, Maamerkit) lähtötasoksi; PT jakaa tekijän. KOKO: Hôtel de Ville, Pont Neuf ja Pont Alexandre III jäävät Pariisiin oikeissa mitoissa, ja Valoseppä korjaa viat (KK:n tulkinta). LONTOO (omistaja 6.11. 17.33, kortti 20.41 ja 22.58; loki): alkaa heti Pariisin listan rinnalla, nähtävyydet ensin vain koodilla, ei Codexia eikä uutta Tripoa; PT kirjaa ajan; yöllä 6.–7.11. KK päättää omistajan pysähdykset, TF ja juna vain omistajan sanalla. LAAJENNUS PARIISIIN (omistajan pyyntö 5.11.2026 klo 22.04: "Tee muita rakennuksia sillä ohjelmalla  Pariisiin. Onnistuuko?"; kortit 22.09: "Myös tavalliset talot", ensimmäinen erä "Kelpaa"; suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261105-pariisi-rakennukset-ohjelmalla.md): A nimetyt: keskustan sillat, Madeleine, Palais Bourbon, Pompidou-keskus, Tour Saint-Jacques, Saint-Eustache, Saint-Sulpice. B talot: 1 km² kokeena Marais'sta nähtävyysalueiden ulkopuolella; kuva → KK → omistajalle + kortti ennen koko Pariisia; lelumainen tai kadut peittävä = tyyli ensin. Ei junaan, sarja ei hidastu. Kumoaa Pariisissa "ei tavallisia taloja" ja aikaistaa "muut pienet kohteet nykyisiksi, kunnes luokat on päätetty"; muut kaupungit ja Lontoo ennallaan.

2.215 PARIISIN KARTTA: KALLISTUS, UUDET 3D-KOHTEET JA NIMET (SITOVA, omistaja 5.11.2026 klo 14.44): KALLISTUS: "kartta saisi kääntyä enemmän, aina 90 asteen kulmaan asti"; TARKENNUS (omistaja 14.55): kamera laskee Pariisissa 5°:n päähän vaakatasosta, kartta saa näkyä lähes viivana, ja horisontti tuodaan niin lähelle, että matalalta näkyy kerralla vain lähimmät kohteet. Kamera ei mene pinnan alle. Korvaa Pariisissa 24.9.:n rajan 85–88°. Muisti mitataan kerran valmiina (2.209). KOHTEET: "ei jätetä muita 3d kohteita näkyviin kuin nämä uudet juuri tekeillä olevat": Pariisissa 3D-kohteina vain Notre-Dame, Sainte-Chapelle, Louvre ja sarjan kahdeksan; muut pois heti, ja uusi kohde ilmestyy, kun se on valmis. Pelin toimintaan kuuluvat pienet kohteet KK:n kautta omistajalle ennen poistoa. EI PIENIÄ MALLEJA (omistaja 14.55, 20.51): Pariisissa ei yhtään pientä mallia eikä minirakennusta. KUVAT KADONNEISTA AARTEISTA (omistaja 21.04): Pikkurakennuksen tilalle tulee kuva, ja tähtikyltti on sen vieressä (14.57:n sanat pysyvät). KK:n tulkinta "kaikki viisi pois" on peruttu. KUVAN MUOTO (omistaja 21.07 "Pyöreä kuva", sama merkki kuin muilla kohteilla; kortti lokissa): pyöreä kuva; neljä pelkän kyltin kohdetta ennallaan (2.11. klo 08.42). Muut piirroskaupungit saavat saman, kun ovat vuorossa; ks. 2.204 (KK 21.04). KADONNEET AARTEET (omistaja 14.57, 21.07): Temple-torni, Grand Châtelet, Tuileries, Galerie des Machines ja Bastilji jäävät pyöreinä kuvina (21.07), vieressä kyltti samassa muodossa kuin nähtävyyskyltti, mutta tähti ja eri tausta (omistaja 15.59, kortti: tumma tähtikyltti kelpaa); toisen rakennuksen paikalla vain kyltti (2.11. klo 08.42: Orsay, Palais de l'Industrie, Trocadéro, Les Halles). Pallo ja nappula jäävät. Louvren pyramidi säilyy, kunnes uuden Louvren napautus avaa museon (KK 14.56). NOSTOT (omistaja 15.01, kortit): pienet kohteet ovat 2D-kuvia, joten kuva poistuu ja napautus siirtyy kylttiin; laiva poistuu. Kyltti näyttää noston nimen jo ennen löytämistä. Pyöreät valokuvamerkit jäävät kartalle. Muut piirroskaupungit saavat saman, kun ovat vuorossa, ellei omistaja toisin sano. Kuumailmapallo ja nappula jäävät; muut kaupungit ennallaan. KYLTIT: uusilla kohteilla sama vaalea kyltti kuin 2.212:ssa. KYLTIN SIVU (KK 5.11. 18.1x omistajan sanoista 2.11. klo 08.14 ja 5.11. klo 15.01; omistajalle kerrottu): kyltti pysyy kiinteällä sivullaan, ei vaihda sivua pyöreän merkin takia ja piirtyy merkin päälle; Orsayn oma sivu on vasen. Grand Châtelet'n tähtikyltti pisteen yläpuolella, koska vasemmalla se törmää malliin 45°:ssa (KK 5.11.2026 klo 21.30, ei omistajan sana; koskee vain tätä kohdetta, ei muita kylttejä eikä sääntöä). KYLTTIEN HÄIVYTYS (KK 5.11. klo 18.06: "Häivytä ne kuten nimet"; ulotus nimistä kyltteihin on KK:n): kyltit häipyvät usvaan samaan tapaan kuin nimet, eivätkä näy aina. 3D-KOHTEET HORISONTISSA (omistaja 5.11. 19.30 ja 6.11. 10.47, joka kumoaa 21.28:n): kaikki häipyy samalla etäisyydellä samaan usvaan, nähtävyys ja maapohja yhtä aikaa kartan kanssa; leijuminen ei kelpaa; yksi sääntö kaikille 3D-kohteille. KYLTTIEN KOKO JA TASO (omistajan pyyntö 5.11. klo 19.23; KK:n tavoite): kaukaa kartta on puhdas, ja lähestyttäessä pieni kiinteän kokoinen kyltti ilmestyy pehmeästi. Pyöreät merkit jäävät (15.01), ja kuumailmapallon kyltti seuraa samaa tasoa (2.212). OMISTAJAN PÄÄTÖS 5.11. klo 20.08: nimikylttien koko ja näkymisen etäisyys "Kelpaa" (kuvat kertoimella 0.465, 013655981); pehmeää ilmestymistä ei nähty, joten se katsotaan pelistä. TESTIVERSIO (omistaja 5.11. klo 19.26): "vielä ei tarvitse julkaista TF, julkaiset TF kun pariisi valmis"; KK vahvistaa kortilla ennen TF:ää ja kertoo silloin KERROTTAVAT-listan. Omistaja kuuntelee uudet äänet (223 lausetta ja tervehdys) Pariisin TF:stä; pienelle iPadille ei asenneta. HINTAKYLTTI (KK 5.11. klo 18.4x, NUI:n välittämä): hintakyltti ei väistä eikä katoa; sen kohdalle osuva nähtävyyskyltti häipyy. NIMI JA PYÖREÄ MERKKI (KK 5.11. klo 19.59 ja 20.10; kumoaa KK:n aiemman linjauksen): kirjaimet eivät jää pyöreän merkin, 3D-kohteen, kyltin eivätkä puiden alle; nimi siirtyy viereen, ja jos vapaata paikkaa ei löydy, nimi ei näy (määrä nähdään seuraavasta ajosta, ei vielä hyväksytty). Pohja piirtyy nimien alle, joten se ei kuulu sääntöön; pallo jää ulos, koska liikkuu. KK:n linjaus, ei omistajan sana. ALUSTAT CODEXILTA (omistajan pyyntö 5.11. noin 20.3x; tarkentaa 2.206:ta; KK:n tavoite): Riemukaari seisoo kokonaisella Codexin piirtämällä aukiolla, jossa ympyrä ja katujen alut jatkuvat kartaksi ilman saumaa; sama koskee sarjan muita malleja omistajan hyväksymillä alueilla v7. Reuna seuraa katuja ja rantoja, joten se ei peitä kortteleita. Tripo jatkaa samalla. HORISONTTI KAUEMMAS (omistaja 20.25 "Kauemmas", matalassa kulmassa noin kaksi kertaa; kortti lokissa): KK:n tavoite: matalalta kaupunki jatkuu katsotun rakennuksen takana, mutta koko Pariisi ei näy kerralla (14.55 pysyy); 3D-kohde ja sen pohja häipyvät edelleen kartan mukana (19.30). HORISONTTI PEHMEÄMMÄKSI (omistajan pyyntö 5.11. 21.30; KK:n tavoite): kartta häipyy taivaaseen pidemmällä ja pehmeämmällä matkalla, ei kapeana kaistana; koskee myös 45°:ta. EIFFELIN MAA (omistajan pyyntö 21.32): "Eifelin alta puuttuu maa."; KK:n tavoite: tornin kaikki neljä jalkaa seisovat yhtenäisellä maalla, joka jatkuu kartaksi. NIMET: häipyvät horisontissa samaan tahtiin kuin kartta; "nimiä ei ole koskaan muualla kuin näkyvän kartan päällä". KESKITYS (omistaja 16.41, kortti metsän heikentämisestä): "jää ennalleen ja edelleen keskitytään vain pariisin 3d rakennuksiin". Pariisin Mac-vuorot ja työ menevät ensin Eiffelille ja sarjan seitsemälle, sitten niiden kylteille (KK:n tavoite); Valosepän metsä- ja mäkien varjostuksen kokeet seis; SAUMAT JA LAIKUT PURETTU (omistaja 6.11.2026 klo 19.57, KK:n kapea tulkinta): Tavoite: Pariisin kartalla ei näy reunaa tai laikkua, jossa kartan pala selvästi vaihtuu toiseen. Metsän heikennys jää ennalleen, 3D-rakennukset pysyvät kärjessä, ei iPad-mittauksia; kuvat etenemisestä KK:lle heti. Rajaus koskee Pariisin työtä: juoksupeli ei pysähdy. MAC-LINJAT (omistajan pyyntö 5.11. klo 17.40, KK; korvaa vuorottelun 15.06): kun molemmilla on ajettavaa, toisella linjalla ajetaan Pariisia ja toisella juoksupeliä, eikä vapaa linja jää tyhjäksi; kolmatta linjaa ei avata (10.5). NOTRE-DAMEN TORNIT: leveneminen ylöspäin ja korkeus ovat omistajan pyytämää liioittelua, eivät vika (omistaja 3.11. 22.11 ja 4.11. 10.22, kortti 11.25 "oikein hyvä"; mittari G-kuva; KK 5.11.); mallia ei suoristeta eikä madalleta. TASAINEN KARTTA (omistaja 6.11. klo 06.58): keskusta tasoitetaan; oletus vasta, kun talot, nimet ja merkit ovat samassa maassa ja Sacré-Cœurin mäki ja pohja tarkistettu. Horisontin uusi häivytys kelpaa. NOTRE-DAMEN RANTA (omistaja 6.11. klo 08.40): korttelit ja talot jatkuvat Seinen rantaan; saari, aukio ja kirkko ennallaan. PARIISI VALMIS -RAJA (omistaja 6.11. klo 20.27, kortti, koko lista lokissa): yhdeksän kohtaa ennen korttia "Pariisi valmis": lähiympäristöt, kovat varjot, taivas, usva, saumat ja laikut, kevyt Notre-Dame ja Riemukaari, Seine ja sillat, kyltit ja nimet, saapuminen ja pallo. Pois: tärinä (21.30), palikat, uudet nähtävyydet, metsän heikennys, Louvren iso pohja, koko kartan työt (2.209). Aloituslennon uudet kuvat (13.46) eivät enää seiso 16.41:n takia: NUI kytkee vuorollaan, kokeena. TF vasta, kun koko Pariisi on näytetty ja omistaja vahvistanut kortilla.

## PARIISI-PINO: VAIN OLENNAISET NIMET JA PALLON ELÄMÄ JUNAAN (omistaja 10.11.2026 klo 08.11–08.13) (10.11.2026 klo 08.15)

Kortti 4 (08.11) "Näytetäänkö kartalla oletuksena vain nähtävyyksien ja tärkeimpien paikkojen nimet, ilman katujen nimiä?" → "Kyllä, vain olennaiset (Recommended)": kadut, kaupunginosat ja pienet vedet pois; kylät, nähtävyydet ja joet jäävät; kadut saa takaisin Kartta-välilehdeltä. Omistaja näki parin 4-nimikarsinta-pari-lahi.jpg. Junaan: NS:n 98180b82d (oletus) + 4d2610ab0 (karsinta) + NUI:n Kartta-välilehden rivi; yksi iPad-tarkistus Pariisi lähellä ennen junaa.
Kortti 1 (08.13) "Viedäänkö Pariisin kartan kevyt filmi (lämmin tummempi sävy, reunojen tummennus, terävöinti, hento rae) junaan?" → "Kyllä, junaan (Recommended)" (iPad +21 Mt, huippu 3 979 < 4 080 Mt, iPhone mittaamatta).
Kortti 2 (08.13) "Viedäänkö Pariisin kartan liukuvat pilvien varjot junaan filmin lisäksi?" → "Kyllä, junaan (Recommended)" (+25 Mt). Pallon elämä kokonaisuutena (filmi, terävöinti, pilvien varjot) junaan; raitiovaunut pysyvät pois (7.11. 16.43). KUMOAA 7.11. 19.02 "Ei junaan" (muisti nyt rajan alla).
Asennussivun osio (KK 08.1x): "Odottaa sinua" vain omistajan päätöksiä tai toimia ("SINÄ:"-este), KK:n odottamat erikseen ("KK:"), teksti omistajan kielellä.

## LATTIA7, PIENOISKARTTA, MUISTIKATOT, EI IPHONE-MITTAUKSIA JA PARIISIN NÄHTÄVYYDET KOODILLA (omistaja 10.11.2026 klo 08.52–09.36) (10.11.2026 klo 09.37)

08.52 juoksupelin uusi yhtenäinen lattia "Kelpaa" + 08.53 "Pysyy" (kolme uutta vikaa korjataan erikseen) → kielletty-tausta-v130 viety 08.58, PK:n kulku OK; sokkelikivi, loota2, oja4, valo1 ja L-kehys LAV:n jonossa.
09.19 pyynnöt: maakartalta avattu kohde jää sumeaksi (NS), ensimmäisen luennan viive (NS, mittaus ensin), kerronnan tauko pysäyttää kierron ja jatko jatkaa (NUI).
09.22 maakartan 3D-kohteet: koe Ranskassa kaupunkien tyyppimallien jälkeen; KK suunnittelee kolmen tason hierarkian.
09.28 "Kyllä, kartta korvaa napin": Palaa näkymään -nappi korvautuu maan pienoiskartalla vasemmassa alakulmassa (NUI); "Kyllä": jokaisella näkymällä oma muistikatto (KK:n muistisuunnitelma, PÄIVITYS 10.11.).
09.31 Saint-Germain-l'Auxerrois "Kirkko jää pois" – RAUKESI 09.36:n myötä (kirkko palaa oikean kokoisen Louvren viereen).
09.32 ei koskaan mittauksia iPhonella, vain iso iPad (Raamattu 12.26 kohta 4).
09.34 Riemukaari koodilla vertailuun "Kyllä"; 09.36 "Tehdäänkö Pariisi ensin loppuun koodilla piirretyillä nähtävyyksillä, Tripo-mallit talteen?" → "Kyllä, Pariisi ensin (Recommended)": nähtävyydet koodilla oikeassa koossa, Tripo-mallit ja kuvat talteen levylle ja kytkimen taakse (ei poistoja), kolme ensimmäistä (Riemukaari, Notre-Dame, Eiffel) kuvapareina ennen loppuja. KORVAA 9.11. 22.42 "Pariisin tehdyt jäävät" ja G-liioittelun lähtökohtana Pariisissa (liioittelu vain kortilla). Raukesivat: Sacré-Cœurin puiston koe, Louvren kirkon kaista, Riemukaaren Codex-korjaus, mallien kuvien pakkaus (muistivaihe 3), lähialueen 25 m:n sääntö ja mallimaskit. Suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261110-pariisin-nahtavyydet-koodilla.md.

## NOSTOLUETTELO: KADONNEET ERILLEEN, KAUPUNGIT-KOHTA JA KIINTEÄ JÄRJESTYS (omistaja 9.11.2026 klo 16.13 ja 10.11.2026 klo 10.06) (10.11.2026 klo 10.08)

9.11. 16.13 (oli vain koodin kommentissa, KaupunkiNostovalikko.cs): "onko nähtävyyksissä myös unohdetut aarteet, vaikka niillä olisi myös oma osio. Ne täytyy erotella normaaleista nähtävyyksistä erilleen." → kadonneet ihmeet (★-kyltti, leike tai hahmotelma-nosto) vain omassa Kadonneet ihmeet -osiossaan, eivät Nähtävyyksissä.
10.11. 09.57 pyyntö ja 10.06 kortit: (1) maan luettelon ensimmäinen rivi "Kaupungit (määrä) ›" → kaupungit nostomäärineen → kaupungin kategoriat; (2) "Tehdäänkö luetteloon sama kiinteä järjestys kaikkialle, Kadonneet ihmeet toisena?" → "Kyllä (Recommended)": Nähtävyydet, Kadonneet ihmeet, sitten muut samassa järjestyksessä maassa ja kaupungissa; (3) "Luokitellaanko Muut-ryhmän kohteet oikeisiin kategorioihin?" → "Kyllä, minä luokittelen (Recommended)": KK Sisältökirjurin kanssa. Toteutus NUI; vika (kadonneet Nähtävyyksissä, kaksoiskappaleet) ohi jonon.

## MUISTIRAJA OSUUDEKSI LAITTEEN ANTAMASTA, KOE (omistaja 10.11.2026 klo 10.23) (10.11.2026 klo 10.36)

Kortti "Muistiraja osuudeksi laitteen antamasta (koe)": NS tekee, lähtö 80 % laitteen antamasta, jarrun tasot samaan suhteeseen; iPad-mittaus ennen junaa, junaan vasta tuloksen ja uuden kortin jälkeen.

## NOSTOLUETTELO: AIHEETON NÄHTÄVYYS VAIN NÄHTÄVYYKSISSÄ, KAUPUNGIN NIMI ZOOMAA (omistaja 10.11.2026 klo 10.34, KK:n välittämä, aamulista kohta 59) (10.11.2026 klo 10.36)

(1) "eikö kaikki rakennukset kuulu ennemmin nähtävyyksiin?" → KK:n Muut-luokittelu (PR 6553) pitoon; tilalle sääntö: aiheeton nähtävyys näkyy vain Nähtävyyksissä eikä Muut-ryhmässä (ei datamuutosta). Kumoaa 10.06:n kohdan (3) tältä osin.
(2) "poistaa pariisin nimen klikkauksesta kaikki nykyiset (siitä nousee kortti jossa nämä ovat) ja korjata pariisin ja muiden kaupunkien nimien klikkaus sillä että peli zoomaa kaupunkiin sisään."
(3) Kaupunkilehti ja turisti-info "pitäisi muuten turisti infon kanssa nostaa selkeämmin näkyville kaupungissa" → NUI:n ehdotus kuvana KK:lle (kaksi selkeää nappia kaupungin nimen yhteyteen, sovitus 09.28 pienoiskarttaan ja nimikilpeen).
(4) Lehden jutut vs. kartan kohteet (omat 3D-merkit kuten kadonneiden tähti): odottaa KK:n suunnitelmaa ja korttia. Toteutus (1)–(3) NUI.

## KARTAN KOHTEET KOLMEEN LAJIIN: NÄHTÄVYYDET, KADONNEET IHMEET, TARINAPAIKAT (omistaja 10.11.2026 klo 10.36, KK:n välittämä, aamulista kohdat 59–60) (10.11.2026 klo 10.52)

Kortti "Jaetaanko kartan kohteet kolmeen lajiin: Nähtävyydet, Kadonneet ihmeet ja Tarinapaikat?" = "Kyllä, suunnittele (Recommended)"; kuvaus: "Tärkeimmät paikkaan sidotut jutut kartalle yhdellä omalla 3D-merkillä; muut jutut vain lehdessä. Merkit kuvina ennen päätöstä."
KK:n suunnitelma 10.52: scratchpad/keskustelukanava/suunnitelmat/20261110-kartan-kohteet-kolme-lajia.md (osat 1–7; laajuus kaupungit, maatason aihevalot ennallaan). Korvaa 10.06:n aihejärjestyksen kaupungin luettelossa (Kaupungit-rivi pysyy). Jako PT 10.5x: NUI (lista KK:lle, nimen napautus PK:n kanssa, napit kuvana, luettelo luokittelun jälkeen), merkki NUI + VS myöhemmin.

## PARIISIN MAALATTU TAIVAS LOPULLISEKSI (omistaja 10.11.2026 klo 10.45, KK:n välittämä, aamulista kohta 61) (10.11.2026 klo 10.52)

Kortti "Jääkö maalattu taivas lopulliseksi Pariisin kallistettuun karttaan?" = "Kyllä, lopulliseksi (Recommended)"; kuvaus: "Maalattu taivas jää Pariisiin ja menee junaan." Vain Pariisi, muualla liukuväri. Jo junan 224 pohjassa oletuksena: linkissä 224.13 (e46b3f251) alkaen.

## MUISTIRAJA OSUUTENA, PIENOISKARTTA JA LEHTI/INFO-NAPIT (omistaja 10.11.2026 klo 12.05–12.06, KK:n välittämä) (10.11.2026 klo 12.06)

12.06: "Otetaanko pelin muistiraja junaan osuutena laitteen antamasta muistista (isolla iPadilla 6553 Mt entisen 4080 Mt:n sijaan)?" = "Kyllä, junaan (Suositus)"; rajoitus kerrottu: käytös lähellä 6553:a mittaamatta (NS efdb68d93).
12.06: "Kelpaako maan pienoiskartta vasemmassa alakulmassa tällaisena junaan (kuvassa oikealla)?" = "Kyllä, junaan (Suositus)" (NUI 224e8ea23).
12.05: Lehti- ja Turisti-info-napit nimikilven "Pariisi ▾" alle oikeaan yläreunaan = "Kyllä, nimikilven alle (Suositus)" (KK:n suunnitelma 20261110-kartan-kohteet-kolme-lajia.md osa 2; NUI).
12.06 omistajan sanat: "et voi kysyä ennen kuin remote on kytketty päälle, en muuten näe sinua" (sääntö jo KK:n aloitus.md kohta 2).

## Striimikartta kaikissa kaupungeissa (omistaja 16.14) (10.11.2026 klo 16.15)

Omistaja KK:n kautta 10.11.2026 klo 16.14: "eikö kaikissa kaupungeissa pitäisi olla kuitenkin striimikartta käytössä?" Vahvistaa 2.204 (2.11. 22.08). Marseillen tyhjä pohja isolla iPadilla on vika: NS selvittää (latauspaikkavuoto, Lontoo, verkko) ja korjaa. NUI:n nimizoom-katto ef774d9fd perutaan; nimen napautus fb16ab5de junaan vasta kun Marseille + yksi muu piirrokseton näyttää striimikartan isolla iPadilla. JU:n katto-Mac-ajo peruttu. KK:n kortin vaihtoehdot rauenneet.

## Pariisin koodinähtävyydet: maltillinen korostus (omistaja 16.17) (10.11.2026 klo 16.17)

Omistajan kortti KK:ssa 10.11.2026 klo 16.17 (iPad-parit Eiffel, Riemukaari, Notre-Dame): "Maltillinen korostus" – kaikki nähtävyydet samassa suhteessa hieman todellista suurempina, erottuvat yhdellä vilkaisulla, eivät peitä kortteleita; uudet kuvat ennen junaa. Tarkentaa 09.36. Yksi yhteinen kerroin (KS vetää, VS Eiffel), Eiffel korkein, Sainte-Chapelle ei ND:tä isompi, kyltti ei peitä mallia. Uudet iPad-parit kolmesta kulmasta + lähikuvat (ND:n tornit) KK:lle korttiin kelpaako junaan.

## Pariisin nimen napautus zoomaa, junaan heti (omistaja 16.17) (10.11.2026 klo 16.17)

Omistaja KK:n kautta 10.11.2026 klo 16.17 (kaappaus pariisin-nimikortti-pois-1617.png): "Tämän voisi tosiaan poistaa ja korvata sillä, että pelit zoomautuisi Pariisiin, kun painan Pariisin nimeä kartalla." Vahvistaa 10.34. NUI fb16ab5de Pariisin osalta junaan heti; muut kaupungit pitävät kortin, kunnes striimikarttakorjaus (16.14) näkyy isolla iPadilla, sitten zoomaus laajenee ilman uutta korttia.

## Nimen napautus: lopullinen linja (KK 16.2x) (10.11.2026 klo 16.18)

Korvaa 16.14/16.17 välivaiheet: zoomaus kaikissa kaupungeissa, kortti pois (omistaja 10.34 + 16.17). Barcelona näyttää katuverkon ilman piirroskarttaa (NUI Mac-ajo ef774d9fd), joten Marseillen tyhjä pohja on Marseillen oma laatta-aukko. Marseille pitää kortin kunnes NS korjaa aukon (ja tarkistaa muut aukkokaupungit). Ehto ennen junaa: iso iPad, Barcelona katuverkko näkyy.

## Pariisin raivaus palautetaan maltilliseen kokoon (omistaja 16.18) (10.11.2026 klo 16.18)

Omistaja KK:n kautta 10.11.2026 klo 16.18: "pariisista on siivottu tripokohteiden ympäriltä tilaa liioitelluille malleille. ne varmaan kannattaa nyt palauttaa, jotta ei jää liikaa tyhjää tilaa". KS palauttaa talot ja korttelit; raivaus vain korostetun mallin peittämä ala; samaan iPad-pariin kuin 16.17 koko. Samalla 16.18: omistaja epäilee Marseillen tyhjää pohjaa latausongelmaksi ja kokeilee puhelimella omalla verkolla; NS selvittää aukko vai lataus.

## Latausjumi hitaalla verkolla: kestävä lataus (omistaja 16.25) (10.11.2026 klo 16.27)

Omistaja KK:n kautta 10.11.2026 klo 16.25: "iPad simu on juuttunut viimeisen keisarin latauskuvaan, sama mitä kävi kun itse testasin sitä aiemmin päivällä." JU 16.27: Puyin malli ja leivotut kuvat 121 aikakatkaisua isolla iPadilla, Macilla 0,45 s. PK: uudelleenyritys ja jatko, todellinen palkki, suomenkielinen viesti hitaasta yhteydestä, Poistu aina; suositus välttämättömistä sovelluksen mukana/välimuistissa. NS: sama periaate kartoille; tarkistetaan myös samanaikaisten hakujen tulva.

## Striimikartta ei lataudu varmasti myös Macilla (PT 16.4x) (10.11.2026 klo 16.32)

NUI 3e8796b49 Mac-ajo: Barcelona tyhjä paperi 17 s zoomauksen jälkeen, edellisellä ajolla latautui. Satunnainen latausvika, ei vain Marseillen aukko eikä hidas verkko. NS:n Tekninen kunto -ykköstyö; OK = Barcelona + Marseille katuverkko toistuvasti Macilla ja isolla iPadilla. Nimen napautus (3e8796b49) ei junaan ennen korjausta.

## Latausruudun hitaan yhteyden teksti (omistaja 16.36) (10.11.2026 klo 16.36)

Omistajan kortti KK:ssa 10.11.2026 klo 16.36: "Yhteys on hidas. Lataus jatkuu siitä, mihin se jäi. Voit myös palata kartalle Poistu-napista." = "Kyllä, kelpaa (Suositus)". PK käyttää sanatarkasti. Samalla omistaja 16.36: "en näe tekstiä. vaihdoin koneen nyt puhelimen kautta nettiin niin pitäisi toimia nopeammin" – Mac puhelinverkossa, isot ulospäin suuntautuvat siirrot lykätään kunnes verkko palaa.

## Telian kuituvika: verkko 4 Mb/s klo 9 alkaen (omistaja 16.38) (10.11.2026 klo 16.38)

Omistaja KK:n kautta 10.11.2026 klo 16.38: "tänään verkko on ollut todella hidas klo 9:00 alkaen suurinpiirtein. ennen 950mb/s, nyt vain 4mb/s. vaihdoin nyt myös ipadit puhelimeni verkkoon joka toimii nopeammin. telialla on valokuidun kanssa jokin isompi ongelma ja siksi verkko äärimmäisen hidas". Seuraus: tämän päivän laitehavainnot klo 9 jälkeen (Lontoon tyhjä kartta, Britannian laatat, panorointi, juoksupelin jumi, Marseille/Barcelona tyhjä, error 22?) hitaassa verkossa; NS/PK/JU erottavat syyn uusinnalla; kestävyyskorjaukset pysyvät. PT:n työtapa: lataus- ja karttamuutokset kokeillaan myös hitaalla verkolla (pakotettu hidastus/katko). Pysyvä Raamattu-sääntö vaatisi omistajan kortin (7.45).

## Ei hitaan verkon testejä nyt (omistaja 16.42) (10.11.2026 klo 16.43)

Omistajan vastaus KK:n korttiin 10.11.2026 klo 16.42: "en usko että kannattaa alkaa testaamaan muutoksia vielä hitaalla yhteydellä. voidaan joskus myöhemmin ennen kaupallista julkistusta testata. pääsin nyt pelaamaan ipadilla juoksupeliä, eli vika oli varmaan hitaassa nettiyhteydessä". Kumoaa PT:n 16.38 työtavan. Latausjumin syy verkko; PK c62818943 junaan tavallisilla testeillä, Pekingin hahmoesihaku peruttu. NS uusii striimikartan, Britannian laatat ja panoroinnin nopeassa verkossa, korjaa vain toistuvat. Hitaan verkon testaus idealistaan ennen kaupallista julkistusta.

## Tyhjä striimikartta = hidas verkko (NS 16.5x) (10.11.2026 klo 16.44)

NS: puhelinverkossa (f2fe729b1) Marseille ja Barcelona katuverkko 5 s:ssa, 0 virhettä; 4 Mb/s:llä epäonnistunut haku jätti pysyvän beigen. Pieni korjaus 94303946d (3× uusinta) tavalliseen junaan ilman hitaan verkon testejä (omistaja 16.42); verhon välähdys idealistaan. Nimen napautus laajenee kaikkiin kaupunkeihin (NUI erillinen commit) ilman uutta korttia, Marseillen poikkeus pois.

## Juoksupelin linjat ja omenat: KK suunnittelee (omistaja 16.48) (10.11.2026 klo 16.50)

Omistajan pyyntö 10.11.2026 klo 16.48 (KK:n kautta): omenat aina jommallakummalla kahdesta linjasta, oikea ohjain valitsee automaattisesti, käännökset 90° jompaankumpaan linjaan, isoilla aukioilla kaista kerrallaan kohti omenaa; koko juoksupelin piirto ja logiikka tarkastetaan. Iso muutos (7.48): KK:n suunnitelma ensin, PK ei tee linja-/omenamuutoksia ennen sitä.

## Juoksupelin suunnitelma jaettu (omistaja 16.59 ja 17.04) (10.11.2026 klo 17.05)

KK:n suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261110-juoksupeli-linjat-ja-tarkastus.md. Omistaja 16.59: ovet kiinni tasolla 1 jos ei iso työ, pysähdysvika aukiolla, tavoite näkyviin, opastettu alku. Kortit 17.04: omenat "niitä voisi olla sekä että, mutta alussa ilman hyppyä"; aukiot kokeena linjojen jälkeen (kumoaa 21.10. vain kaksi kaistaa); tavoite täyttyvä palkki ja portti. Jako: PK 9 → 1–3 → 8 (koko ensin) → 6 → 10 (NUI ulkoasu) → 11 (KK:n tekstit); 5 kokeena; NS osa 7 piirto (mittaus ensin) usvarajauksen jälkeen.

## Kuvakyltti junaan (omistaja 10.11. 17.08) (10.11.2026 klo 17.09)

KK välitti: NUI kuvakyltti-koe 9f7f40611 (kuva ja nimi yhtenä kylttinä tähden alla, saman paikan toinen nimi pois) = 'Kyllä, junaan'. PT antaa pt-ok:n heti JU:n numeroinnin jälkeen. Juoksupelin kiinni-teksti ei vielä hyväksytty (KK:n 11 opasteen lista omistajalla); PK ei vaihda tekstiä ennen päätöstä.

## Juoksupelin aineisto isolle iPadille johdolla (omistaja 10.11. 17.31) (10.11.2026 klo 17.32)

Kortti 'Kyllä, kopioidaan': poikkeus vain isolle iPadille ja vain juoksupelin aineistolle, kopio kokonaisena; latausta mittaavat ajot (latausruutu, latausjumi) eivät päde isolla iPadilla kopion jälkeen, latauksen toimivuus omistajan kotitesteillä (pieni iPad, puhelin). Samalla 17.30: varjojen piirtoetäisyys työlistaan (NS, ei kiire).

## Pariisin maltillinen korostus junaan (omistaja 10.11. 17.45) (10.11.2026 klo 17.45)

Kortti 'Kyllä, junaan': KS c1a15236d (nähtävyysmallit 2× todellinen, vaaka enint. +150 m, Riemukaari vähintään 150 m, raivatut talot palautettu, koodirakennukset oikeassa koossa). Seuraava vaihe (ei junan ehto): Riemukaari sulautuu taloihin värin takia, Sacré-Cœur lähes katoaa yleiskuvassa; mallien ulkonäkö ja ND:n tornit koon jälkeen (16.17).

## Juoksupelin opastetekstit 1–11 hyväksytty (omistaja 10.11. 17.52) (10.11.2026 klo 17.52)

Kortit KK:ssa: tekstit sellaisinaan (scratchpad/keskustelukanava/suunnitelmat/20261110-juoksupeli-linjat-ja-tarkastus.md osa 11). Kohta 1 'Pakene vartijoita, kunnes palkki täyttyy ja portti aukeaa.' (NUI:n 'Pysy jaloillasi…' ei käyttöön); sana KAISTA; kohta 11 'Vartija sai kiinni! Napauta nopeasti'; liuku- ja aarreopaste pois tasolta 1. Toteutus PK (osa 11) ja NUI (palkki+portti, osa 10).

## Oppi: karttamuutos iPadilla oletustilassa ennen linkkiä (PT 10.11. 19.1x) (10.11.2026 klo 19.10)

224.36 (Pariisin korostus) meni linkkiin vain Mac-ajoilla, joissa talot/elävä kartta kytkettiin komennoilla ja talot paikallisesta kansiosta; laitteella korostuksen pohja peitti laajat alat beigellä (omistaja 18.53). Korostus peruttu junasta 191aaeaf2, linkki 224.35. Jatkossa kartan/talojen muutokset: Mac-ajo myös oletustilassa (ei komentoja, talot ämpäristä) ja iPad-ajo ennen pt-ok:ta. PT tulkitsi beigen horisontin virheellisesti hitaaksi verkoksi.

## Työlistan järjestys ja suunnitelma KK:lle (omistaja 10.11. 20.13) (10.11.2026 klo 20.13)

Omistaja KK:n kautta sanatarkasti: "Mutta onhan siellä paljon muitakin asioita kuin mitä minä pyydän. Ja sinähän suunnittelit ison listan asioita jo aiemmin. Sinunhan pitäisi pitää järjestys ja suunnitelma". KK:n ehdotus "vain omistajan pyynnöt sivulle" peruttu. Työnjako: KK pitää työlistan järjestyksen ja suunnitelman (rivit, kärki, jarj, osiin jako, uudet pyynnöt listaan välittäessään); PT ja roolit kirjaavat tilan (tilanne, valmis, este), PT kuittaa laadun. Viestillä jaettu työ: listan rivi tai rivi KK:lle. Asennussivun työosio päivittyy itsestään (tyo-osio.py-vahti, 15 s). Raamatun kohta 7.4/7.39 päivitetään seuraavassa Raamattu-erässä.

## Pariisi vaihtuu koodimalleihin, Tripo-mallit 224.35-koossa siihen asti (omistaja 10.11. 20.19) (10.11.2026 klo 20.19)

Omistaja KK:n kautta sanatarkasti: "mutta eikö ne ole tarkoitus vaihtaa niihin uusiin malleihin?" (2× kutisti vanhat Tripo-mallit 224.36:ssa). KK: kortit 09.36 ja 16.17 koskivat koodimalleja; 18.0x ok välitilalle oli KK:n virhe, ja PT 17.4x jätti koodimallit junasta pois niiden "koe, ei junaan" -merkinnän takia (PT:n virhe). Järjestys: (0) laitevika (pieni iPad: talot/mallit puuttuvat, jättinimet, ND puuttuu 224.35) iPad-ajolla ensin; (1) RK, ND, Eiffel koodimalleina maltillisella korostuksella, Tripo talteen; (2) Louvre, SC, Panthéon, Invalides, Opéra, Sainte-Chapelle koodimalleiksi, parit KK:lle; (3) ympäristöt. Vaihtamattomat Tripo-mallit 224.35:n koossa (KS b8971b839). Tripo-koosta ei korttia.

## Omistaja testaa itse, kunnes iso iPad toimii (omistaja 10.11. 20.23) (10.11.2026 klo 20.23)

Omistaja KK:n kautta sanatarkasti: "Minä voin testata asioita siihen asti, kunnes iPad saadaan huomenna toimintaan." Kunnes iso iPad on käynnistetty: laiteajoa odottavat muutokset linkkiin Mac-tarkistuksella (oletustila, PT katsoo) ilman ison iPadin ajoa; Uutta-tekstiin tai JU:n viestiin rivi "kokeiltava: …"; vika → linkki heti edelliseen. Koskee Pariisin koodimalliversiota ja PK:n osia 6, 8, 11. Ei muisti- ja nopeusmittauksia (vain iso iPad) eikä TF:ää.

## Raamatun kevennys luvut 12 ja 7: KK tekee tilinvaihdon jälkeen (omistaja 10.11. 20.30) (10.11.2026 klo 20.30)

Omistaja kysyi 20.26 "Milloin se raamatun kevennys kannattaa tehdä?"; KK suositteli tilinvaihdon yhteyteen, luku 12 ensin, sitten 7. Omistaja 20.30 sanatarkasti: "Haluan että sinä teet sen tilinvaihdon jälkeen." Tekijä KK heti tilinvaihdon jälkeen: omistajan poikkeus sääntöön "Raamatun kohdat kirjoittaa vain Päätoimittaja" tälle työlle. Suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261110-raamatun-kevennys-luvut-12-ja-7.md (säännöt ennallaan, taustat aihesivuille, kokotesti ja checks, PR per luku). PT: kertoo KK:lle heti vaihdon jälkeen; muut roolit käynnistetään vasta luvun 12 yhdistämisen jälkeen, jos odotus on lyhyt; ohjeiden koe (7.47 C2) kerran kevennyksen jälkeen; KK ilmoittaa PT:lle ennen kumpaakin yhdistämistä.

## Nähtävyyksien erottuvuus kaukaa kokeiltavaksi (omistaja 10.11. 20.51) (10.11.2026 klo 20.51)

Kortti KK:ssa (4 kuvaa: pari-rk-viisto, rajaus-rk, pari-yleis, rajaus-nd): "Kyllä, kokeiltavaksi (Suositus)". VS 593d09722 (pieni nähtävyys vaalenee hieman, ohut tumma ääriviiva; läheltä ei muutosta; Eiffel ei) asennusversioon koodimallien kanssa, ei lopullinen: omistaja arvioi pienellä iPadilla, KK kysyy sitten, jääkö. Huomiot VS:lle: viiva paikoin rosoinen/katkonainen Macin rajauksissa, Louvre haalistuu yleiskuvassa, Riemukaari hieman litteä.

## Tarinamerkit: lisää vaihtoehtoja ja tarinat näkyviin (omistaja 10.11. 21.12) (10.11.2026 klo 21.12)

Kortti KK:ssa (tiimalasi / huutomerkki / raunio, NUI e59888f0b): omistaja sanatarkasti "Keksi lisää. Mitä tarinoita noissa on esimerkiksi" → ei valintaa, tiimalasia ei lukita. NUI:n toinen kierros samasta kohdasta samalla rajauksella (koe): avoin matkakirja (KK:n suositus), sulkakynä + mustepullo, isoisän taskukello, lyhty, tiimalasi vertailuksi; sepia, yksi merkki/paikka, tähti voittaa (2bdd4d55f); selitteessä jokaisen merkin tarina, kuvan ulkopuolella. Kuvakkeet pelistä tai Codexin kuvat-sessiolta (7.15).

## Tarinamerkit yksinkertaisiksi (omistaja 10.11. 21.27) (10.11.2026 klo 21.27)

Omistaja KK:n kautta sanatarkasti: "Pitää olla yksinkertainen jotta toimii". KK:n tavoite: merkin tunnistaa yhdellä vilkaisulla pienenäkin kuten kultatähden; yksi täytetty siluetti, ei yksityiskohtia, ei sädekehää, ei kahta esinettä. Ehdokkaat: avoin kirja (KK:n suositus), taskukello, sulka, lyhty yhtenä muotona, tiimalasi yksinkertaistettuna. Sama rajaus + kauempaa otettu kuva. Kuvakkeet Codexilta (7.15), NUI täydentää tilauksen.

## Näkyvä työ KK:n katsottavaksi ennen junaa, kokeena (omistaja 10.11. 21.38) (10.11.2026 klo 21.4x)

Omistaja KK:n kautta sanatarkasti: "Sinun olisi hyvä tarkastaa itse visuaaliset jutut ja ottaa ohjat jos opuksen tekemät asiat eivät vastaa sinun tasoa. … Pitää ehkä miettiä sinun ja päätoimittajan työnjakoa. … Esim. nuo kartan 3d kohteet tarvitsevat ehkä sinun ohjausta tai tekemistä". KK:n tulkinta, heti voimaan kokeena (Pariisin 3D-kohteet, tarinamerkit): 1) näkyvä työ (3D-kohteet, merkit, kartan ilme, valikot, valo) ei junaan eikä omistajalle ennen KK:n katsomista; pt-ok = toimii teknisesti, KK = näyttää oikealta; PT ei anna ulkonäkösuositusta omistajalle vietäväksi. 2) KK antaa tavoitekuvan ennen työtä ja palautteen suoraan tekijälle (KS, NUI, VS, LAV), PT kopiona; ensimmäinen karkea kuva KK:lle ennen hiomista. 3) PT:llä ennallaan jonot KK:n järjestyksestä, junat, testit, vikojen syyt, muisti ja nopeus, yövuoro, kirjaukset. Pysyvä sääntö vasta omistajan kortilla (KK:n suunnitelma 20261110-kk-pt-tyonjako.md); Raamattuun ei vielä.

## Nähtävyydet oikeassa mittasuhteessa kaikissa kaupungeissa (omistaja 10.11. 21.59) (10.11.2026 klo 21.59)

Omistaja 21.58 KK:lle: "Tehdäänkö kaikki nyt oikeassa mittasuhteessa ilman liioittelua? Se olisi varmaan järkevintä. Mitä olet mieltä?" Kortti 21.59 "Tehdäänkö kaikki nähtävyydet kaikissa kaupungeissa oikeassa mittasuhteessa (ei enää kaksinkertaista korkeutta)? Erottuvuus kaukaa hoidetaan värillä, ääriviivalla ja kylteillä. Tämä korvaisi korttisi 16.17 maltillisen korostuksen." = "Kyllä, oikea mittasuhde (Suositus)" ("Kaikki nähtävyydet todellisessa koossa ja muodossa; raivattu tila palautetaan mallin oman pohjan kokoiseksi."). Korvaa 16.17 ja 17.45 (K 2). Toteutus: KS koodimallit 1:1 ja raivaus mallin pohjaan, ensin 224.42:n RK, ND, Eiffel → pari K 2 | 1:1 KK:lle → seuraava versio; Tripo-mallit 224.35-koossa kunnes korvataan, ei uudelleenskaalausta; VS säätää erottuvuuden 1:1-koolle, 224.45 kokeiltavaksi sellaisenaan; Lontoo jo oikeassa koossa. Raamattu 2.204 ja kaupungit.md kohta 3 päivitetty. Samalla omistaja 21.56: raivaus isompi kuin mallit → kuuluu jokaisen mallin kierrokseen.

## Nähtävyys paisuu hetkeksi kohteena, koe (omistaja 10.11. 22.01) (10.11.2026 klo 22.0x)

Omistaja KK:lle sanatarkasti: "Ja voisiko rakennusta vain paisuttaa hetkellisesti joka suuntaan jos se on kohteena? Silloin se ei mahtuisi paikalleen mutta jos se on vain väliaikainen ja animoitu liike niin se voisi toimia". KK:n tavoitekuva suunnitelmat/20261110-nahtavyys-paisuu-kohteena.md (ponnahduskirja: kartta 1:1, valittu kasvaa ~0,5 s pohjan keskipisteestä, naapurit väistyvät, paluu valinnan päättyessä). Koe videona, ei junaan; tekijä NUI (PT 22.0x), KS:n 1:1-työ edellä; karkea ND-video suoraan KK:lle.

## Ei tilinvaihtoa, kevennys aamulla (omistaja 11.11. 00.07) (11.11.2026 klo 00.08)

Omistaja KK:n kautta 11.11.2026 klo 00.07 sanatarkasti: "Ei tehdä tilin vaihtoa sillä sain ilmaisen resetin. Menen kuitenkin kohta nukkumaan joten voit tehdä nollauksen ilman lupaa. Tehdään raamattu juttu vasta aamulla. Resetin kun prosentit alkaa loppua". 1) Ei tilinvaihtoa; omistaja nollaa viikkorajan itse: kun viikko lähestyy 99 %:a, PT/Postivahti rivi KK:lle, ei tilinvaihtoa eikä luovutuksia sen takia. 2) Raamatun kevennys (luvut 12 ja 7, KK) aamulla 11.11. ilman tilinvaihtoa. 3) Yön säännöt voimassa.

## Lähin kamera hyväksytty (KK 11.11. noin klo 01.0x) (11.11.2026 klo 07.1x)

KK hyväksyi NUI:n lähimmän kameran c032134e7 11.11. noin klo 01.0x (kuvat lokit/nui-lahin-2-7x-4-c032134e7, KS b5ef8b0c9): lähin leveys 0,231 = 0,620 km. Linkissä 224.51 (29768b6cb). Lähde: KS:n luovutus -0105, LISÄYS 01.1x; merkintä puuttui lokista, KK pyysi lisäämään 07.1x. VS:n kynäkoe ja uusi 1:1-viiva jatkuvat tällä kameralla.

## Nostoesityksen kierto täytenä ympyränä samaan suuntaan (omistaja 11.11. 08.35) (11.11.2026 klo 08.4x)

Omistaja KK:n kautta sanatarkasti: "ei kaupungissa ole näkyvissä painettuja nimiä ja orbit-kierto pitää olla koko ajan samaan suuntaan ja tehdä täysi ympyrä. Mutta sitä voi miettiä, pitäisikö kiertosuuntaa vuorotella jokaisen noston välillä. Mutta jos se on hankalaa, niin kierto voi myös olla aina samaan suuntaan." KK: muuttaa 9.11. klo 11.43 linjan (kierto kaistalla ±90°) nostoesityksen osalta: kaista pois, täysi ympyrä samaan suuntaan; suunnan vuorottelu nostojen välillä vapaaehtoinen. Toteuttaja NUI (nähtävyyden napautus, työ A, 50565c427). PT: ±90°-linjaa ei ollut kirjattu Raamattuun eikä tähän lokiin, joten Raamatun kohtaa ei muuteta.

## Saapuminen uudistetaan, kaupunkien nimet kertojan äänellä (omistaja 11.11. 08.34–08.50) (11.11.2026 klo 09.1x)

- 08.34 + 08.37: kaupunkiin saapuminen uudistetaan, Pariisi ensin kokeena: zoomaus ilman näkyvää striimikarttaa → introkuvat liukuen pehmennetyn taustan päällä (oikealta sisään, vasemmalta ulos) → nimi + iskulause kertojan (William) äänellä → häivytys kaupunkiin → ylhäältä noin 45°:een ja hidas kierto → matkakirjan luenta vain muualta saavuttaessa (5.11. 21.02 "ei luentoa aloituskaupungissa" pysyy). Nimien väärä asento tai rakennuksen peitto kierron aikana ei ole vika. Korvaa 2.210:n nousevat kuvat ja rivit "Saapumisen kuvat nousevat kaupungista", "Pariisin saapumisen nousukuvat", "Pariisi: ei tyhjää pohjaa saapuessa". Tekijä NS, tavoitekuva scratchpad/keskustelukanava/suunnitelmat/20261111-saapuminen-kaupunkiin.md.
- 08.34: kaikki Euroopan kaupunkien nimet ja iskulauseet uudelleen kertoja Williamin äänellä, suomi pakotettuna, alkuun muutama suomenkielinen lause, koko lista YHTENÄ OTTONA, leikkaus jälkeenpäin; isoisän äänellä tehdyt 45 saapumispuhetta (15.9.) vaihdetaan. Uusinta = uusi lupa.
- 08.50 kortti: 16 uutta iskulausetta (Bryssel–Valletta, KK:n sanamuoto) "Kyllä, kaikki" → otto 61 riviä. Nollauskortti KK:lle: "Ei vielä".
- 08.11 + 08.19 + 08.21: nähtävyyden napautus yhtenä lentona kiertoon, kohde keskelle; Turisti-info Lehden sisälle sivuna "Matkaopas"; Lehden nappi nostopalkin vasemmalle (koe); ohjaussauvat isommiksi ja vähemmän herkiksi; nostoesityksessä kamera lukittu kohteeseen (vasen sauva vain ylös–alas). 08.11:n valikkosiirto korvattu 08.19:llä. Tekijä NUI.

## Äänitykset KK:n vastuulle, suomi alkuun (omistaja 11.11. 08.51) (11.11.2026 klo 09.2x)

Omistaja KK:n kautta sanatarkasti: "Saat aina tehdä kaikki äänitykset ja niitä ei tarvitse tuoda minulle tarkastettavaksi kunhan on huolehdittu että äänitys tehdään äskeisen ohjeeni mukaan tai jos pidempiä kappaleita niin silloin voi tehdä omina äänityksinä. Täytyy vain huolehtia että alussa on varmasti selkeästi suomen kieltä. Jos jokin nimi niin alkuun pitää laittaa hieman suomen kielistä tekstiä jotta nimi ääntyy oikein ja poistaa se sitten vain äänitteen alusta". Pysyvä työtapa: lupa ja tarkastus KK:lla, ei näytteitä eikä korttia omistajalle; korvaa äänitysten "uusinta = uusi kortti". Raamattu 5.1 ja 7.27 päivitetty.

## ÄÄNITYSOHJE YHDEKSI, KILPAILEVAT POIS (omistaja 11.11. klo 08.58, KK:n välitys) (11.11.2026 klo 09.02)

Omistaja: "Kirjaa äänitys ohje raamattuun ja tarkista että siellä ei ole kilpailevia ohjeita." 5.1 kirjoitettu yhdeksi voimassa olevaksi säännöksi (puheäänitykset: alle 3 % KK:n lupa ja tarkastus, yli 3 % omistajan kortti, uudet luettavat tekstit omistajalle listana; tekotapa; näyte vain pyydettäessä). 5.2 rajattu yli 3 %:n ajoon, 5.4 esiteksti, 5.12 kertojan otot, 5.28 vain pyydettäessä, 7.27 ÄÄNET uudelleen, 7.14 äänigenerointi Äänittäjällä (fakta), 7.15/11.x/12.23 viittaukset 5.1:een. Musiikki (Lyria) ja tekoälyn tehosteet ennallaan omistajan luvalla. Pohjat: kertojan-teksti-ja-aani, tuotannonohjaus, kysymys-omistajalle, tekotavat/aani, taidemuseon-maa, kuumailmapallokierros.

## ISON IPADIN JUMIN TAKAPORTTI KÄYTÖSSÄ (KK 11.11. 09.1x, omistajan havainto 09.12) (11.11.2026 klo 09.29)

Omistaja 09.12: "miten tuohon saisi takaportin jotta iPad ei jäisi jatkossa jumiin? eikö peliä voi vain tappaa ja käynnistää uudestaan". JU otti käyttöön A–C (ipad-takaportti.zsh, ipad-skenaario-f1.zsh, C-raja 360 s), ei pelin koodia. Raamattu 12.26 ja 7.41.

## JUOKSUPELIN PIIRRON KEVENNYS: PERIAATE A/B (omistaja 11.11.2026 klo 09.38, KK) (11.11.2026 klo 09.47)

Omistaja 09.38: "mutta varmasti järkevää optimoida, niin pyörii paremmin tai sitten voidaan lisätä muuta grafiikkaa ja tehosteita, kun ei käytetä laskentatehoa turhaan". KK purki 09.4x juoksuvipujen pysäytyksen osittain: A) turha työ pois (kuva ei muutu) junaan PT:n kuittauksella ilman KK:ta; B) kuvaa muuttavat (MSAA, varjot, varjomatka, tarkkuus, lehvästö) vain parilla ja KK:n sanalla. 224.65 = NS 41bbbc320 (kuvan kopio + leivottujen varjo pois, −5,7 ms, KK katsoi parin). Raamattu 2.177.

## IPADIN ERROR 22 = PERITTY STDIN (JU 11.11. 09.43) (11.11.2026 klo 09.53)

JU: error 22 ei johtunut laitteesta eikä wifistä, vaan nohup-jono peri nollauksessa suljetun sessiosoketin stdin:ksi ja devicectl --console kaatui. Korjaus: </dev/null jonoihin, exec </dev/null iPad-skripteihin; vianhaussa ensin lsof -d 0. Työlistan "iPad ilman wifiä" valmis. Raamattu 12.26.

## PILVET: ENTINEN NOPEUS, PYSÄHTYVÄT 1 RUUTU/S -TILASSA (omistaja 11.11.2026 klo 09.52, KK) (11.11.2026 klo 09.56)

Omistaja: "voisiko pilvet liikkua yhtä nopeasti kuin ennen ja pehmeästi, kun ruutua päivitetään, mutta kun päivitys laskee yhteen ruutuun sekunnissa, niin pilvet voisivat silloin myös pysähtyä kokonaan paikalleen. Eli ne jatkaisivat liikettä vasta, kun ruudun päivitys nostetaan." VS: kellon pysäytys levossa pysyy, tuuli takaisin alkuperäiseen (noin 6 m/s), paikka joka ruudussa; Mac + iso iPad KK:lle ennen junaa. Työlista "Pilvien varjot: pehmeä liike ilman hyppyjä".

## JUOKSUPELIN VARJOT LEIVOTTUINA, ELÄVÄ VAIN PELAAJALLA (omistaja 11.11.2026 klo 09.54, KK) (11.11.2026 klo 09.59)

Omistaja: "Eikö juoksupeliin kannattaisi leipoa kaikki varjot paikalleen? Se on todella ärsyttävän näköistä esimerkiksi aloituslennossa, kun varjot piirtyvät pikkuhiljaa näytölle jo piirrettyjen varjojen päälle. Eli siellä on tavallaan tuplavarjot. ainoastaan pelaajan varjo kannattaa piirtää pelin aikana." KK suositteli kyllä; Juoksupeli-kärjen jonon alkuun. Tavoite: paikallaan pysyvä varjo vain leivonnasta, ei ilmestymistä eikä tuplia, puiden läikkä pehmeä. NS johtaa (selvitys 1–5 KK:lle ensin), LAV leivonta, PK hahmot ja ovet; hahmojen läikkä KK:n parilla.

## SALIN VARJOT LEIVOTAAN; KK AJATTELEE MUUTOSTYÖN ENSIN ITSE (omistaja 11.11.2026 klo 10.15, KK) (11.11.2026 klo 10.17)

Omistaja: "Salin varjot voi myös laskea suoraan valmiiksi, koska ne eivät näy muulloin kuin silloin, kun keisari tulee sisään, joten ne voidaan suoraan laskea eri valon suunnasta valmiiksi etukäteen. sinun pitää ajatella jatkossa paremmin. Voiko olla, että nojaat liikaa muiden sessioiden palautteeseen tällaisissa tavallaan muutostöissä? Sinun itse kannattaa ajatella asia aina läpi jos kyse on muutostyöstä ja sitten laittaa vasta sessio tekemään työtä, eikä toisinpäin."
- Sali: KK perui salipoikkeuksen; sali leivotaan omasta valon suunnastaan (oma valokartta, tarvittaessa kaksi + ristihäivytys), elävä varjo vain pelaajalla. NS vaihto, LAV leivonta v133:n jälkeen.
- Työtapa: Raamattu 7.4 KK:n riville "MUUTOSTYÖSSÄ KK AJATTELEE ENSIN ITSE LÄPI" (KK:n sanamuoto).

## KOODIMALLIEN HYVÄKSYNTÄ ESITYSKAMERALTA (KK 11.11.2026 klo 10.2x) (11.11.2026 klo 10.27)

NUI:n napautuslento (katse-2, 2c75bcf22) on kunnossa, mutta ei junaan yksin: esityskamera menee 110–145 m:iin (4–5 × lähemmäs kuin lähin vapaa kamera) ja paljastaa Sainte-Chapellessa mallivikoja (tornin kärki, apsiksen katto, talo apsiksen sisällä, vinot seinälevyt). Järjestys: NUI esitysarkit kaikista 12 Pariisin nähtävyydestä (4 kuvaa/kohde, pysyvä tarkistus) → KS korjaa (Sainte-Chapelle heti, ennen palloa) → KK katsoo → lento ja korjatut mallit junaan yhdessä. Uusi hyväksyntäehto koodimalleille: esityskameran kuvat 4 suunnasta. Raamattu 2.204.

## JUOKSUPELIN PERUSKORJAUS KK:LLE; KK KIRJOITTAA RAAMATTUA (omistaja 11.11.2026 klo 10.26, KK) (11.11.2026 klo 10.28)

Omistajan koko teksti: scratchpad/keskustelukanava/suunnitelmat/20261111-juoksupelin-peruskorjaus.md. Ydin: "opus sessiot eivät ole osanneet rakentaa juoksupeliä oikein, joten siinä on paljon valuvikoja. sinun kannattaa käydä pelin koodi ja arkkitehtuuri läpi kohta kohdalta." Drone/kamera ajatellaan uudelleen ammattimaiseksi ja realistiseksi ("kameran käyttö on matkakirjapelissä yksi tärkeimmistä osa-alueista"); "et saa luottaa mihinkään mitä peliin on tähän asti tehty"; työ auttaa myös tulevia 3D-pelejä; "voit jo nyt tehdä muutoksia itse raamattuun aina kun sellaisia tulee vastaan"; "tätä korkeamman tason ajattelua ei kannata ulkoistaa muille sessioille"; KK ehdottaa etenemistavan ja järjestyksen; KK:n effort nostetaan toistaiseksi.
- Kirjattu: Raamattu 7.4 (KK kirjoittaa omat kohtansa omalla PR:llä, ilmoittaa PT:lle etukäteen; PT päätösloki ja junat; KK:n vastuulle koodin, arkkitehtuurin ja työtapojen puhdistus). CLAUDE.md:n "kohdat kirjoittaa vain Päätoimittaja" korjataan omistajan omalla viestillä/kortilla (KK).
- Etenemistä ei vielä päätetty: KK:n ehdotus omistajalle (ydin: ei uusia juoksupelin ominaisuuksia ennen tavoiterakennetta; v133 ja varjojen leivonta loppuun; kaupungit jatkuvat PT:n johdolla; ensimmäinen uudelleenrakennettava pala kamera/drone). Työlistarivi KK "Juoksupelin peruskorjaus".

## JUOKSUPELIN PERUSKORJAUS ALKAA KK:N EHDOTUKSEN MUKAAN (omistaja 11.11.2026 klo 11.09, kortti) (11.11.2026 klo 11.12)

Kortti "Juoksupelin peruskorjaus: aloitanko aamulla ehdottamallani tavalla?" → "Kyllä, aloita näin". Juoksupelin kesken olevat (v133 lattia ja rakenteet, varjojen leivonta) tehdään loppuun; uusia juoksupelin ominaisuuksia ei aloiteta; KK lukee koodin itse (vaihe 1 nyt: drone ja kamera), sitten tavoiterakenne ja työtavat; ensimmäinen uusittava pala kamera/drone; kaupungit jatkuvat rinnalla. Kamera- ja drone-töitä rooleille vain KK:n määrittelyllä. Suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261111-juoksupelin-peruskorjaus.md.

## KAMERAN KÄSIALA: ELOKUVAKAMERA, KEVYT KALLISTUS, EI NIIAUSTA (omistaja 11.11.2026 klo 11.15 ja 11.17, KK) (11.11.2026 klo 11.24)

Omistaja 11.15 (juoksupelin drone, myöhemmin kaikki kamerat): "dronen "niiausta" kiihdytyksessä ja jarrutuksessa ei välttämättä tarvitse imitoida, se voi näyttää häiritsevältä. mutta kallistelu todennäköisesti parantaa tunnelmaa ja sitä voisi kokeilla myös peruskartan kameran liikkeisiin sitten kun olet saanut juoksupelin osalta kuntoon. dronemainen kallistus ja liike on käytössä myös taidenäyttelyissä, tosin siellä sivukallistus on vain kevyenä. dronen liike saa olla muutenkin ehkä parempaa kuin mitä FPV droneissa näkee, enemmän niin, että liike on kuin elokuvasta jossa käytetään kallistusta pienenä tehokeinona elävöittämään, mutta että kameran kiihdytys ja jarrutus ovat todella harkittuja kuin parhaissa elokuvissa. oli kameran ajo toteutettu sitten dronella, helikopterilla, jibillä tai muulla vastaavalla. saatko kiinni?"
Omistaja 11.17: "ja sitten voidaan säädellä kameran liikkeen tyyliä hieman tilanteen mukaan. pelissä vauhdikkaampaa ja taidemuseossa rauhallisempaa, mutta perusidea saisi olla kuitenkin sama, etenkin pehmeys ja ja jatkuva liike mieluiten useammalla eri kameran akselilla, mikä elävöittää liikkuvaa kuvaa eniten."
KK: yksi yhteinen kameran käsiala koko Matkakirjaan (juoksupeli → peruskartta → museot), luonne säädettävissä tilanteen mukaan; liike lähtee ja pysähtyy harkitusti, kallistus kevyt mauste kaarteissa, ei nyökkäystä. KK kirjoittaa määrittelyn (scratchpad/keskustelukanava/suunnitelmat/20261111-juoksupelin-peruskorjaus.md); roolit eivät tee kameraan muutoksia ilman sitä. Työlista (KK): "Peruskartan kamera: kevyt kallistus (koe juoksupelin dronen jälkeen)".

## ISON IPADIN JUOKSUPELIAJOT LOPETETAAN TOISTAISEKSI (omistaja 11.11.2026 klo 12.15, KK 12.16) (11.11.2026 klo 12.2x)

Omistaja 12.15: "ison ipadin juoksupelin ajot kannattaa varmaan lopettaa toistaiseksi? ne pyörivät kokoajan."
KK 12.16: kyllä. Iso iPad on omistajan käytössä ja Pariisin ajoille; juoksupeli rakennetaan uudelleen, joten vanhan rakenteen laiteajot eivät ole nyt arvokkaita. Käynnissä ollut NS:n varjoajo pysäytetty, juoksupelin iPad-ajot pois jonosta (JU); muut iPad-ajot ja juoksupelin Mac-ajot jatkuvat. Juoksupelin iPad-todisteita ei tilata; iPad-ajoa odottavat juoksupelin rivit tilaan "odottaa KK:n iPad-erää". Latausvian (NS) syy haetaan olemassa olevista lokeista ja Macilla; iPad-todiste vasta korjaukselle KK:n sanalla. NS, PK ja LAV ohjattu (PT 12.2x).

## JUOKSUPELIN VANHAA KOODIA EI MITATA EIKÄ NOPEUTETA (omistaja 11.11.2026 klo 12.20, KK 12.21) (11.11.2026 klo 12.2x)

Omistaja 12.20: "ei varmaan kannata mitata mitään mikä tulee poistumaan joka tapauksena, esim. ne kattojen häivytykset. mitataan vasta sitten kun juoksupeli on koodattu uudestaan jos jotain tarvitsee kehittää"
KK 12.21: (1) juoksupelin vanhan koodin mittauksia ja profilointeja (ruutunopeus, piirron mittaus isolla iPadilla, joka ruudun työn kustannus) ei tilata eikä jatketa; rivit tilaan "odottaa juoksupelin uudelleenkoodausta". NS:n valmis ENNEN/JÄLKEEN-tulos (37,5 → 40,0 ruutua/s) on lähtötaso. (2) Uusia nopeutuksia ei tehdä juoksupelin koodiin, joka vaihtuu (kamera, pelisilmukka, säännöt, maailman päivitys); jäävä aineistotyö (leivotut varjot, lattia, seinät, mallit) jatkuu. Kesken olevista koodinopeutuksista KK päättää erikseen (PT: NS 367ea7f0a pidätetty JU:lla KK:n päätökseen).

## ISOLLA IPADILLA VAIN VALMIS KOKONAISUUS (omistaja 11.11.2026 klo 12.21–12.22, KK 12.22) (11.11.2026 klo 12.3x)

Omistaja 12.21: "kannattaa varmaan ohjeistaa että ipadilla ei kannata ajaa mitään ennenkuin lopullinen suunniteltu versio on valmis. nyt siellä pyörii joku ajo vaikka suunnitelma ei ole vielä valmis koodissa" ja 12.22: "siis peruskartan ajo pyörii".
KK 12.22: JU pysäytti käynnissä olevan ajon ja tyhjensi ison iPadin jonon (laattamuisti-2, pilvivarjo-todiste-2, saapuminen-muisti-4). Iso iPad näyttää omistajalle vain valmista: iPadilla ajetaan vain KK:n nimeämä valmis kokonaisuus (suunnitelma koodissa valmis + KK:n hyväksymät Mac-kuvat) viimeisenä tarkistuksena ennen versiota; kokeet, välivaiheet ja mittaukset Macilla; rooli ei tilaa iPad-ajoa itse. Junaan menee Mac-tarkistettu, iPad-erä ennen kuin versio annetaan omistajalle. Kirjattu Raamattu 12.26 kohta 5; työlistan iPad-todistetta odottavat rivit tilaan "odottaa KK:n iPad-erää".

## ISOISÄN KUVAT POIS ALKUINTROSTA, TEKSTIT LYHYEMMIKSI; LEHTI OMAKSI PAINIKKEEKSI (omistaja 11.11.2026 klo 15.3x, KK) (11.11.2026 klo 19.2x)

Omistaja 15.3x (224.71:n saapumisen jälkeen): saapuminen kelpaa, intron kohteiden kuvat jäävät; isoisän kuvat pois kaupungin alkuintrosta, kartalle isoisän tekstin kanssa, isoisältä yksi kuva; isoisän ja pulun tekstit ja kuvat lyhyemmiksi ja harkiten missä tarvitaan. Lehti omana painikkeena ja Matkaopas Lehden sisään kiireellä.
- KK:n suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261111-isoisa-ja-pulu-lyhennys.md (esimerkkiparit omistajalla; roolit vasta omistajan sanalla). Lehti + Matkaopas junassa 224.74. NS:n saapumiskoe ei junaan.

## T7-LEVYLTÄ TILAA ENSIN (omistaja 11.11.2026 klo 16.07) (11.11.2026 klo 19.2x)

Omistaja 16.07: "vapauttakaa ensin t7 levyltä tilaa". JU siirsi ei-aktiivista NAS:lle (ei poistoja): vapaa 134,9 → 228,6 Gi (18.5x); loput seuraavalla JU-vuorolla.

## SOUNDLY-HAKU HUOMENNA (omistaja 11.11.2026 klo 18.37 ja 18.44, KK) (11.11.2026 klo 19.2x)

Omistaja 18.37 "Voin painaa etänä", 18.44 "En pääse. Kokeillaan huomenna": kenkäleiman äänen Soundly-haku siirtyy 12.11.; KK kysyy. Työlista: "Kenkäleiman ääni Soundlysta" (este: odottaa omistajaa).

## PARIISIN LOPPULISTA LUKITAAN; UUDET LÖYDÖT TOISELLE KIERROKSELLE (omistaja 11.11.2026 klo 19.16, kortti, KK) (11.11.2026 klo 19.2x)

Kortti: "Lukitaanko Pariisin loppulista nyt? Listalle jäävät vain sovitut kohdat (puistot, Montmartre, Seine ja sillat, kymmenen kohdan lista); uudet löydöt siirtyvät toiselle kierrokselle eivätkä viivästytä Pariisi valmis -päätöstä." → "Lukitaan".
- PT kokoaa lukitun loppulistan (scratchpad/keskustelukanava/suunnitelmat/20261111-pariisi-lukittu-loppulista.md), KK lukitsee; sen jälkeen uusi löytö KK:n listalle "toinen kierros" (jarjestys.md), ei Pariisiin. Raamattu 2.215.

## KAUPUNKIEN KOLME TYÖKALUA ENNEN LONTOOTA; LONTOO MITTAUKSENA (omistaja 11.11.2026 klo 19.16, kortti, KK) (11.11.2026 klo 19.2x)

Kortti: "Rakennetaanko ennen Lontoota kolme työkalua (uuden kaupungin pohja yhdellä komennolla, kirkkojen ja palatsien automaattinen rakentaminen valmiista osista, sama kuva-arkki ja muistimittaus joka kaupungista), ja tehdäänkö Lontoo niillä mittauksena?" → "Työkalut ensin".
- Työlista: "Kaupunkien kolme työkalua ennen Lontoota: odottaa KK:n suunnitelmaa" (pohja suunnitelmat/20261110-euroopan-kaupungit-tyonkulku.md). Roolit eivät aloita ennen KK:n tehtävänantoja; Lontoon rinnakkaiskoe odottaa työkaluja. Raamattu 2.215.
