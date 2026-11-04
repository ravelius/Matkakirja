# Jardin des Plantes v3 — #1994 /15m, yksi uusi otto

Lähde: posti/karttaseppa-codex-puutarha-plantes-v3-20261104.md, commit 73bcf5cd515b398dc35932a382f35e464b510230, blob df028514a18d90cd009c7e1731a91ebcdc78a29c. Koko posti, TILAUS.md, alue.json ja kaikki 10 manifestitiedostoa luettu ja SHA256-varmennettu. Vertailun edellinen-otto.png on Karttasepän väliaikaisesti paikkaama ohjekuva (SHA256 48986b73fecead5534bdffa19875a2e2b6a76912484685e3fc29d1b735ec35fa).

**1 ImageGen-kutsu / 1 kokonaan uusi ehdokas.** Omistajan täyden uuden generoinnin ohjeen mukaisesti vanhaa kuvaa ei editoitu eikä paikattu. Tavoitteena oli edellisen asettelun ja ulkoasun säilyttäminen uudessa kokonaisessa generoinnissa. Muita toimitettuja kuvia ei tehty uudelleen.

## Kuva ja QA

1536 × 1024 RGBA. Alkuperäiset natiivin PNG:n tavut ja alfa säilytetty; ei jälkikäteen tehtyä maski-, väri-, koko- tai saumakorjausta.
SHA256: 7d5a7a06a04ffc7cc17871fb3a57fa21a914801f8f79e6d92e6409a3912088cc

Lounaiskulmassa on uusi oma istutuslohko, jossa on kolme pitkää pensasriviä, pieniä latvuksia ja oikean reunan suurempia latvuksia. Edellisen koodikopiopaikan suorat katkot/saumat eivät näy kulman lähivertailussa. Käytävät jatkuvat pohjoiseen ja itään; etelälaidan pieni puurivi säilyy. Rakennusta, kattoa tai harmaata laattaa ei näy. Muu käytäväverkko ja puuryhmien sommittelu vastaavat edellistä silmämääräisesti hyvin, mutta maalausjälki ja sävyt uusiutuivat koko puutarhassa. Nurmi on tavoitetta vaaleampi ja keltaisempi. Tarkka maski, täysin peittävä sisäalfa ja pikselikohtainen säilyminen eivät toteudu.

## Lähteessä pyydetyt mittaukset

- **Alfan ero maskiin:** alpha >=128: XOR **11 149 px** = ulkopuolisia 1 311 + maskin sisältä puuttuvia 9 838 px. IoU 0,975739. Kaikkien alfa-arvojen täsmällinen ero maskiin **466 829 px**. Uuden maskin pinta-ala 458 228 px, SHA256 4609659fd4f74ac712dbab41b0d18c298b87dfd804e17f5a2357babcef7cfe9e.
- **Enintään 2 px reuna:** 5×5 max/min-suodattimella (Chebyshev-toleranssi) ulkopuolelle jää alpha>0-pikseleitä **4 785**, alpha>=16 **597**, alpha>=128 **369**. Erodoidulta sisäalueelta puuttuu alpha>=128 yhteensä **4 551 px**. Alfa min/max **0/254**; täysin peittäviä alpha255-pikseleitä **0**. Maskiehto ei täyty.
- **Muuttuneet pikselit korjauskulman ulkopuolella:** poissuljettu suorakulmio x341–480, y732–897, molemmat rajat mukana. Ensisijainen vertailu vain uuden maskin sisällä ja kulman ulkopuolella: **437 542 / 437 573 px = 99,9929 %** eroaa näkyvässä RGB:ssä, kun molemmat kuvat koostetaan samalle valkoiselle taustalle. Kun vaaditaan vähintään yhden kanavan ero >8/255, osuus on **80,7216 %**; erolla >16/255 **44,2376 %**. Keskimääräinen absoluuttinen RGB-kanavaero **15,4736/255**. Ei kohdistusta tai resamplausta.
- Raaka RGBA eroaa **100 %**:ssa kulman ulkopuolisista pikseleistä. Raakaluku sisältää myös läpinäkyvän alueen näkymättömät RGB-arvot, joten se ei yksin kuvaa näkyvää muutosta. Koko kankaan kulman ulkopuolisella alueella näkyvä RGB-ero on 449 109 / 1 549 624 = **28,9818 %**; tämä nimittäjä sisältää suuren tyhjän ulkoalueen.
- **Nurmen RGB-otantakeskiarvo:** neljä 16×16 px aluetta, **211,51 / 178,78 / 98,54** (tavoite 196/170/106).
- **Tummien pensasaitojen RGB-otantakeskiarvo:** neljä 4×4 px aluetta, **134,09 / 110,55 / 61,58** (tavoite 135/112/71). Näytteet natiivista, koostamattomasta RGB:stä maskin sisällä alpha>=128. Nämä ovat valittujen alueiden keskiarvoja, eivät koko kuvan semanttista segmentointia.

**QA tehty, kokonais-QA EI läpäisty.** Kulman visuaalinen korjaustavoite toteutui, mutta pikselikohtaista ennallaan säilymistä, väritavoitetta ja täsmällistä maskia ei saavutettu. Toimitetaan yhden sallitun oton arviointiehdokkaana, ei hyväksyttynä tuotantokuvana. Vastaanottajan/KK:n hyväksyntä, koodikoostaminen, pelikytkentä ja julkaisu ovat erillisiä eikä niitä ole varmennettu.

Käytetty sisäänrakennettua image_gen-työkalua. Kehote, natiivikuva, kaikki mittauskoordinaatit ja kulman ennen/jälkeen-vertailu: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/puutarha-jardin-des-plantes-v3
Täysi kehote: prompt.json. QA: qa/checks.json, qa/measurement-locations.jpg, qa/corner-before-after.jpg ja qa/outside-corner-difference.png. QA-kuvia ei käytetä toimituskuvana.
