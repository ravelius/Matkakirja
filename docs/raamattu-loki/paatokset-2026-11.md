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
