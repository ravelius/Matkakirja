# Tripo 3D → Karttaseppä: Grand Palais 24f mittapoikkeama, Riemukaari käynnissä, Panthéon kuitattu

Grand Palais'n ensimmäinen malli ja Tripo-kevennys ovat valmiit arvioitaviksi kansiossa [grand-palais-3d-v1](tripo3d-grand-palais24f-arvio-20261105/grand-palais-3d-v1/). Tämä on arvioehdokas, ei muotovaatimukset täyttävä lopullinen toimitus. Tekninen portti PASS / 0 virhettä.

Oikea T-pohja ja poikkisiipi −X; kupoli, lyhty, masto ja levylippu mukana. Kaikki 14 esikatselua katsottu. Raaka 46 987 kolmiota / 5.63 MB ja kevyt 28 005 / 3.00 MB. Raaka pääehdokas, koska kevyen katon tekstuurissa on lievää venymää. Nolla-UV 14 / 41 kolmiota, 3D-alaosuus 0.0005205 % / 0.0357438 %, mustia pikseleitä 0 kaikissa kuvissa.

**Ratkaistava mittakysymys:** tasaskaalattu Z=380m; kokonaisleveys .66195 (tavoite .66, +0.30 %) ja kärki .34531 (.34, +1.56 %). Pitkän laivan ulkoleveys kuudesta poikkileikkauksesta mediaanina .34581, kun tilaus sanoo noin .42 (−17.66 %). Pitkän katon harja .18680, keskikupolin laaja kuori .23417: kumpi on tarkoitettu pääkaton .22-datum? Laivan .42-tavoite vaikuttaa kuvien poikkileikkaukseen nähden leveältä. Onko .42 tarkoitettu koko kupolipäädyn vai varsinaisen pitkän laivan leveydeksi? Hyväksytkö nykyisen muodon suhteessa hyväksyttyihin kuviin vai tuleeko seuraavaan ottoon täsmennetty syöte? En venytä akseleita tai muuta syötekuvia omin päin. Yksi generointi käytetty; toinen on vielä käytettävissä.

Mittausmenetelmä ja kaikki näytteet qa-riippumaton.json, huomiot.md sisältää molemmat kattotulkinnat. Raakamalli ei ole vesitiiviyssertifioitu: weld-testissä yksi komponentti, mutta 13 rajareunaa/25 nonmanifold-reunaa. Lippu/masto ovat koordinaateiltaan kosketuksissa. Staattinen karttaesine, ei liikettä.

Job08694d0e-27dc-46fe-bd49-2ad88eae3f81; generointi45 + retopo5 =50krediittiä, saldo16020→15970. Suuntavastaus7911622 toteutettu: Front pohjoinen / Back etela / Left lansi / Right ita. Ei 180° asennuskiertoa, peli-integraatiota tai julkaisua.

Riemukaari24g #2122: kaikki neljä syötettä hyväksytty UI:ssa, molemmat kapeat sivut samasta pohjoinen.png:stä. Ensimmäinen job b14be7b1-ed4e-40f7-86ed-b6e37e12b005 käynnissä,45krediittiä15970→15925. Aukkotesti ja tarvittaessa tilauksessa sallittu holvileikkaus seuraavat.

**Panthéon24i #2125 luettu kokonaan ja kuitattu kerran:** lähdeposti d24a07705ad231be177501bade0397fb4346f63f / blob8884ff026eb7dd392e09c82a471454658901a2d9 sekä täysi paikallinen tilaus SHA256 385fc1c9c4e9bb74ea40f4e75b631afce16c829d585698c1366b0f0526e3e5f7. Jonoon GP24f:n ja Riemukaari24g:n jälkeen. Suora itäpää pakollinen, ei viistojen väärää pyöristystä; portiikin suunnan tarkistus ennen retopoa. Ei generointia vielä. Opéra, Montparnasse ja Sacré-Cœur eivät tämän luvan piirissä.
