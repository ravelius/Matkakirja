# grafiikan-tuotanto · vastuu PT · tarkistettu 12.11.2026

TAVOITE: Pelaaja näkee yhtenäistä, todentuntuista grafiikkaa, joka vastaa todellisuutta tai kertoo avoimesti kadonneesta. Hyväksytty malli päätyy peliin; työ ei seiso tilausten takia.

SÄÄNNÖT:
1. Codex tekee kuvat, pinnat ja Tripo-mallit; Claude pelissä ajettavan eikä aja Tripoa tai kuvageneraattoria. [R-7.15] [R-2.181] [R-2.182]
2. Kuvat tilaa Codexin kuvasessio, mallit Tripo-sessio; tilaukset ja korjaukset postilaatikon kautta. [R-7.15] [R-7.14]
3. Ennen tilausta varmistetaan kohde, aiemmat työt, päätökset. Tilaus kertoo, liikkuuko malli; liikkumaton ilman luurankoa. [P-261023-1] [R-7.15]
4. Kuvatilaus kuuluu putkeen HERO (nykyinen kohde, 2–3 Commons-viitekuvaa), IHME (kadonnut tai loistoaika, merkitään havainnekuvaksi) tai AARRE (esine vaalealla pergamentilla). [R-11.11] [R-11.13] [R-2.51]
5. Kuvassa ei tekstiä eikä vesileimaa. Uusin OpenAI-malli (vaihto kokeella); JPG, peliin webp. Pulun kuva aina Codexilta: aidon näköinen neliö, aihe ympyrässä; paikkaan sopivia lintuja, eläimiä tai söpöä, pullaa säästeliäästi; Venetsiassa ihastussarja. [R-2.51] [R-11.12] [R-11.11] [P-261115-6] [P-261115-7] [P-261116-3] [P-261116-9] [P-261116-10]
6. Talot ja ympäristö koodilla. Koristeellinen merkkirakennus (kaari, katedraali, kupoli) Tripolla, aina kaksi tasoa (kaukaa kevyt, läheltä tarkka); peliin omistajan vertailukuvan jälkeen. Hahmot, eläimet, esineet ja kalusteet Tripolla. Temple-torni halkaistuna nukkekodiksi: Codexin 2D-nuket, nukketeatterifontti, esirippujuliste. [P-261109-2] [P-261115-20] [P-261116-4] [P-261116-5] [P-261116-7] [P-261116-8] [P-261117-57]
7. Codexin kuvilla ja Tripolla on pysyvä lupa ilman korttia; Tripolla myös massaerät saldon rajoissa, ei ostoja. Lupa ei ole mallin hyväksyntä (mallit-ja-3d). [R-7.15] [P-261105-3] [P-261117-2]
8. Omistaja sopii valinnat suoraan Codexin kanssa; Claude toimii postin mukaan eikä kysy samaa. [P-261021-1]
9. Toimitus kulkee tuontitarkistuksen läpi, katsotaan täysikokoisena ennen peliä; näkyvän työn hyväksyy KK (valmiin-maaritelma). [R-11.7] [P-261110-6]
10. Malli: tilattu → toimitettu → hyväksytty → pelissä; hyväksytty peliin samassa tai seuraavassa junassa. [R-7.15]
11. Codexilla aina 2–3 hyväksyttyä tehtävää jonossa. Toimitus kuitataan heti, arvio ½ tunnissa. [R-7.18]
12. Tripolta ladataan vain hyväksytyt mallit. [R-11.6]
13. Pelissä oleva kohtaus videoidaan pelistä; vain olematon renderöidään Codexilla. [R-4.21]
14. Olemattomia patsaita ei generoida: Paljasta-tehtävän vieras on oikea patsas toisesta kaupungista. [P-261113-6]
15. Grafiikka kärjessä: lähelle paljon yksityiskohtia (maat, suihkulähteet); raskaus ei este. [P-261117-113]

EI VIKA:
- Valmiit Tripo-mallit jäävät, vaikka rakennukset ovat koodia.

TEKOTAPA:
- Posti: haara claude/postilaatikko. Vahti: Matkakirja-posti/codex-odottaa.py.
- Herokuvat: tools/hero-kuvakulmat.mjs. Mallit: tuotantopohjat/codex-3d-toimitus.md.
- Muu generointi: kertojaaanet, omistajan-kanssa.
