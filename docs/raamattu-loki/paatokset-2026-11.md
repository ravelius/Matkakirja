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
