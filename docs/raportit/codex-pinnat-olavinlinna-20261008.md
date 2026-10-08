# Olavinlinna: ainutlaatuiset pinnat Codexille (Linnanrakentaja 8.10.2026)

Omistaja 20.5x: "Voisiko codex renderöidä linnan pintaan paremmat tekstuurit?" PT:n linja: toistuvat peruspinnat (kivi, laasti,
puu, olki, rauta) tehdään skannatuilla CC0-PBR-tekstuureilla (Poly Haven, ambientCG; detaljit v45m). **Codex tekee vain
ainutlaatuiset pinnat**, joita kirjastoissa ei ole. Kaikki fotorealistisina, ja metatietoihin merkintä "havainnekuva".
Sisältökirjuri tilaa. Toimitus `_valmiit/olavinlinna-codex-pinnat-v1/<tunnus>.png` (PNG, sRGB; alfa vain kun mainittu).
Normaali- ja karheuskartat teen niistä itse (korkeus luminanssista + käsin maskit), koska Codexin kuvissa niitä ei ole.

| # | Tunnus | Pinta ja käyttökohta | Koko | Saumaton | Huom |
|---|---|---|---|---|---|
| 1 | holvi-lehvasto | Kappelin ristiholvin lehvä- ja kukkakuvioinen maalaus (1400-luvun loppu), haalistunut ja rapautunut, rappauksen päällä | 2048² | kyllä (toistuva kuvio) | korvaa maalaukset-v1:n projektorikuvat; alfa = maalin peitto |
| 2 | tott-vaakuna-maalattu | Erik Axelsson Tottin nelijaettu vaakunakilpi maalattuna holviin (kappeli) | 1024² | ei | alfa; heraldiikka lähteistä (kappeli.js) |
| 3 | sture-vaakuna-laatta | Sten Sturen vaakuna (kolme lumpeenlehteä) kalkkikivilaatassa, kulunut | 1024² | ei | kilpilaatan väri; kohokuva on jo mallissa |
| 4 | kuvakudos-sali | Voudin salin seinäverho, flaamilainen verduuri n. 1490 (lehvästö, eläimiä), villa, haalistunut | 2048×1024 | ei | ripustetaan salin päätyseinälle |
| 5 | villa-punainen | Karkea punaiseksi värjätty villakangas (voudin viitta, penkkityynyt) | 1024² | kyllä | myös sininen ja ruskea variantti (5b, 5c) |
| 6 | brokadi-alttari | Kappelin alttarivaate (antependium), brodeerattu kultalangalla, kuvio pyhimyksen monogrammi | 2048×1024 | ei | |
| 7 | pellava-liina | Valkaistu pellavaliina, reunassa punainen ristipistobrodeeraus (Linnantuvan pöytä) | 1024² | kyllä (vaakasuunnassa) | |
| 8 | ovi-tammi-heloin | Tammilankkuovi, takorautaiset saranat ja naulat, kulunut (kappeli, sali, Tott-kammio) | 1024×2048 | ei | alfa ei; reunat siistit mallin kehykseen |
| 9 | helat-decal | Takorautaiset saranat, lukkolevy ja rivinaulat erillisinä | 1024² | ei | alfa; sijoitetaan ovien ja arkkujen päälle |
| 10 | arkku-kansi | Voudin arkun kansi: tammi, rautavanteet, maalattu kukkakuvio | 1024² | ei | esine arkku-komero |
| 11 | tilikirja-aukeama | Voudin tilikirja auki: käsin kirjoitettua ruotsia/latinaa, sarakkeet, mustetahrat (1490-luku) | 2048×1024 | ei | teksti epäselväksi, ei luettavaa sisältöä |
| 12 | kirja-kansi | Nahkakantinen kirja, prässätyt koristeet, messinkihelat (kansi + selkä samaan kuvaan) | 1024² | ei | esine kirja |
| 13 | asiakirja-sinetti | Taitettu pergamenttikirje punaisella vahasinetillä | 1024² | ei | esine; sinetti erikseen alfalla |
| 14 | alttarikaappi | Kappelin pieni alttarikaappi, maalattu pyhimys kultapohjalla, 1400-luvun pohjoissaksalainen tyyli | 1024×2048 | ei | |
| 15 | tyrma-raapustukset | Vankien raapustukset ja päivälaskut tyrmän kalkkiseinässä | 1024² | ei | alfa (decal) |
| 16 | takka-noki | Takan sisäseinä: kivi ja nokikerros, kuumuuden halkeilema | 1024² | kyllä | Tott-kammio, Linnantupa |
| 17 | lasitetut-laatat | Kappelin lattian lasitetut poltetut savilaatat, vuorottelevat vihreä ja keltainen, kuluneet | 1024² | kyllä | jos lähteet tukevat; muuten kivilattia |
| 18 | lippu-sture | Linnan lippu tai viiri Sturen väreissä, kangas | 1024×512 | ei | tunnelma-tilan liput |
| 19 | pelikortit-noppa | Linnantuvan noppapelin pöydän pinta: puun kulumajäljet, viiltoja, kynttilävahaa | 1024² | ei | noppapöytä |
| 20 | kangas-saakki | Hamppusäkki, painettu kauppamerkki | 1024² | kyllä | rekvisiitta |

**Kuoren 43 px/m -tekstuuri ja Codex:** ei luotettavasti. Kuoren tekstuuri on fotogrammetrian UV-atlas, joka on pilkottu
sadoiksi saariksi. Kuvageneraattori ei säilytä saarten rajoja eikä vastaavuutta todelliseen muuraukseen, joten saumat
ja paikat menisivät rikki. Parempi tie on toistuva lähidetalji (v45m "kuori"), jonka natiivi häivyttää etäisyydellä, ja
tarvittaessa paikallinen tekoälyskaalaus (esim. Real-ESRGAN, BSD) 8k → 16k saari kerrallaan reunat suojattuina. Senkin
tulos tarkistetaan silmin.
