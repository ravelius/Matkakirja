# Codex → PT/KK: #2436–2440 luettu; GC:n uusintalupa jo käytetty, Turun lähdekuva puuttuu

16.11.2026. Tämä on yhteinen vastaanottokuittaus ja lähdeselvityksen tulos, ei uusi mallitoimitus.

## #2436: Temple-resepti

Vastaanottokuittaus luettu. Resepti #2434 ja rajattu ehdotus #2435 säilyvät arkistossa. Turun rajausta täsmennetään alla uuden #2440:n perusteella.

## #2437: Grand Châtelet — ei uusita jo tehtyä #2269:ää

Klo 20.37 annettu lupa oli todella **uusi lupa ensimmäisen #2261-kokeen jälkeen**. Sen ratkaiseva jatko löytyy tehtävästä **#2269**, ei #2261:n vanhasta STOP-tilasta:

- Ensimmäinen #2261-koe alkoi 15.11. klo 20.28 ja epäonnistui. Se ei yksin kuluta myöhempää klo 20.37 lupaa.
- Klo 20.37 lupa ja porttisyvennysten ohje: [alkuperäinen päätös](https://github.com/ravelius/Matkakirja/blob/2648b1b306d91cb9949dfdec01d68f9d8bfd943e/posti/paatoimittaja-codex-gc-2261-ja-temple-halkaistu-peliin-20261115.md).
- #2269 aloitettiin klo 20.51. Sen `roofAttemptsThisAuthorization=1`; uusikin kattokoe epäonnistui, joten ohjeen mukainen #2253:n alkuperäinen aumakatto palautettiin. Portit esitettiin kahtena noin 2,5 m:n umpisyvennyksenä.
- [Toimitus #2269](https://github.com/ravelius/Matkakirja/blob/6158644c14824f0d0a35ae22754af111650e3512/posti/tripo3d-kk-grand-chatelet-2269-tulos-20261115.md) luettiin takaisin palvelimelta 15.11. klo 21.04. Paketti sisältää kaikki pyydetyt kuvat: `posti/codex-grand-chatelet-2269-tulos-20261115/01-north.png`, `02-south.png` ja `06-upper-oblique-full.png`.
- [KK:n päätös klo 21.14](https://github.com/ravelius/Matkakirja/blob/731d51566ef88c9c2673f59ba44eea829349ee3a/posti/paatoimittaja-codex-kk-hyvaksyi-2269-2271-20261115.md): #2269 hyväksytty lataustien kokeeseen, aumakatto jää, ei uusia kattoyrityksiä. Eteläseinän venynyttä tekstuuria ei korjata ilman erillistä sanaa pelin kameralla tehdyn katselmuksen jälkeen.

Säilytettävä malli: `output/grand-chatelet-2237-20261115/correction-2269/grand-chatelet-2269-fallback.glb`, **77 762 kolmiota, 9 864 536 tavua**, SHA256 `71a90db9811cd23ebe46df759264ac69272c468963252be57549393c71f7d033`. Tarkistin paikallisen SHA256:n nyt uudelleen. Pelissä toimimista tai julkaisemista en väitä tarkistetuksi.

**#2437:n ehdollinen työ on jo hoidettu #2269:ssä.** Korjataan jonon viittaus tähän jatkoon, jotta #2261:n vanha STOP ei avaa uutta kierrosta.

## #2438: Commons-tarkistus

ArkMP:1903_014 ei löytynyt tästä rajatusta hausta:

- Commonsin tiedostonimiavaruuden suora haku tunnuksella `"ArkMP:1903_014"` palautti **0 osumaa**. API-vastaus on tallessa `output/gc-turku-2436-2439-20261116/commons-exact-search.json`.
- Commonsiin rajatut verkkohakutermit olivat sama tunnus sekä `Turku Castle Nyström section plan`.
- [Turun linnan piirustusluokassa](https://commons.wikimedia.org/wiki/Category:Drawings_of_Turku_Castle) näkyvät kaksi tiedostoa ovat `Turun linna pohjapiirros-Plan.jpg` ja `Åbo slott 1724.JPG`.
- Löytynyt [pohjapiirros](https://commons.wikimedia.org/wiki/File:Turun_linna_pohjapiirros-Plan.jpg) on Tietosanakirjan 415 × 280 px:n kuva. Se ei ole pyydetty Nyströmin itäpään ja eteläsiiven mittausleikkaus. Haun tuomiokirkon leikkaus on puolestaan väärä rakennus.

Tulos ei todista, ettei kuvaa voisi olla Commonsissa toisella nimellä. Tässä tarkistuksessa pyydettyä kuvaa ei kuitenkaan tunnistettu. **Finnaa, sen API:a tai kuvatiedostoja ei avattu.**

## #2439–2440: huonerajaus ja tarvittava aineisto

#2440 luettu kokonaan. SK:n toimittamat huoneet kirjattu sellaisinaan: Jordanin kamari (itäpää, ylin kerros), Kuningattarenkamari (merenpuoleinen pää), Sakaristo / Juhana-herttuan asuinkamari (itätorni), Kuninkaansali (pohjoissiipi). Tämä on SK:n viestin sisältöä, ei Codexin vielä tarkistamaa piirroshavaintoa. **Itäpää + eteläsiipi ei ole lopullinen rajaus**; pohjoissiiven kulma voi olla tarpeen.

Pyydän PT:tä toimittamaan samaan postikanavaan:

1. Raportin `Matkakirja-sisaltokirjuri/docs/raportit/turun-linna-tarinahuoneet-halkaisukoe-20261116.md` sisällön lähteineen ja tapahtumineen. Se ei löytynyt paikallisesta ChatGPT-työjuuresta.
2. KK:n järjestämän alkuperäisen **ArkMP:1903_014**-kuvan tai sen täsmällisen saatavilla olevan tiedostopolun. Vanha #2270 mainitsi `docs/raportit/kaappaukset/omistaja-20261115/`; jos oikea kuva on jo siellä, lähettäkää juuri se, jotta latausta ei monisteta.

Kuvan saavuttua teen pyydetyt kuusi yhden rivin havaintoa: leikkaustaso, kerrokset, holvit, portaat, rakennusvaihe ja arvioksi jäävät. Liitän enintään 1000 px:n kuvan ja ehdotan leikkaustason vasta piirroksen sekä huonelähteiden perusteella. Näyttötapa on leikkauspuoli kameraan ja kerroskierros kortilla.

Senaatin yli 10 Mt:n PDF:ää ei ladattu; sen ohjeessa mainittu KK:n latauslupa ei ole tässä ratkaistu. Uusia mallikuvia, Tripo-ottoja, renderöintejä tai pelimuutoksia **0**, uudet kustannukset **0**. Temple #2403 jää erilliseen sovittavaan työikkunaan; tarkistuksessa Unity oli käynnissä.
