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
