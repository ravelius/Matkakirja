# grafiikan-tuotanto · vastuu PT · tarkistettu 12.11.2026

TAVOITE: Pelaaja näkee yhtenäistä, todentuntuista grafiikkaa, joka vastaa todellisuutta tai kertoo avoimesti kadonneesta. Hyväksytty malli päätyy peliin; työ ei seiso tilausten takia.

SÄÄNNÖT:
1. Codex tekee kuvat, pinnat ja Tripo-mallit; Claude kaiken pelissä ajettavan eikä aja Tripoa tai kuvageneraattoria. [R-7.15] [R-2.181] [R-2.182]
2. Kuvat tilaa Codexin kuvasessio, 3D-mallit Tripo 3D -sessio; tilaus ja korjaus kulkevat postilaatikon kautta. [R-7.15] [R-7.14]
3. Ennen tilausta varmistetaan kohde, aiemmat työt, päätökset. Tilaus kertoo, liikkuuko malli; liikkumaton ilman luurankoa. [P-261023-1] [R-7.15]
4. Kuvatilaus kuuluu putkeen HERO (nykyinen kohde, 2–3 Commons-viitekuvaa), IHME (kadonnut tai loistoaika, merkitään havainnekuvaksi) tai AARRE (esine vaalealla pergamentilla). [R-11.11] [R-11.13] [R-2.51]
5. Kuvassa ei tekstiä eikä vesileimaa. Uusin OpenAI-malli (vaihto kokeella); JPG, peliin webp. Pulun kuva aina Codexilta (vapaat keskinkertaisia): aidon näköinen neliö, aihe ympyrässä; paikkaan sopivia lintuja, eläimiä tai söpöä, pullaa säästeliäästi; Venetsiassa ihastussarja (useampi kuva). [R-2.51] [R-11.12] [R-11.11] [P-261115-6] [P-261115-7] [P-261116-3] [P-261116-9] [P-261116-10]
6. Rakennukset ja kaupungit koodilla; uusi Tripo- tai Codex-malli niihin vain omistajan sanalla. Hahmot, eläimet, esineet ja kalusteet Tripolla Codexin kautta. Ensimmäinen halkaistu: Temple-torni, ihmiset nukkekodin nukkeina (Codexin 2D-leikkeet puvuissa, ei vihreitä), kohtausotsikot nukketeatterifontilla, alussa esirippujuliste, joka vedetään pois. [P-261109-2] [R-7.15] [P-261115-20] [P-261116-4] [P-261116-5] [P-261116-7] [P-261116-8]
7. Codexin kuvilla ja Tripolla on pysyvä lupa ilman määrä- tai ottokorttia. Lupa kattaa tuotannon, ei mallin hyväksyntää (kortti mallit-ja-3d). [R-7.15] [P-261105-3]
8. Omistaja sopii valinnat suoraan Codexin kanssa; Claude toimii postin mukaan eikä kysy samaa. [P-261021-1]
9. Toimitus kulkee tuontitarkistuksen läpi ja katsotaan täysikokoisena ennen peliä; näkyvän työn hyväksyy KK (valmiin-maaritelma). [R-11.7] [P-261110-6]
10. Malli: tilattu → toimitettu → hyväksytty → pelissä; hyväksytty kohtaukseen samassa tai seuraavassa junassa. [R-7.15]
11. Codexilla aina 2–3 hyväksyttyä tehtävää jonossa. Toimitus kuitataan heti, arvio puolessa tunnissa. [R-7.18]
12. Tripolta ladataan vain peliin hyväksytyt mallit. [R-11.6]
13. Pelissä oleva kohtaus videoidaan pelistä; vain olematon hetki renderöidään Codexilla. [R-4.21]
14. Olemattomia patsaita ei generoida: Paljasta-tehtävässä joukossa on oikea patsas toisesta kaupungista, ja pelaaja osoittaa vieraan. [P-261113-6]

EI VIKA:
- Valmiit Tripo-mallit jäävät, vaikka rakennukset ovat koodia.

TEKOTAPA:
- Posti: haara claude/postilaatikko. Vahti: Matkakirja-posti/codex-odottaa.py.
- Herokuvat: tools/hero-kuvakulmat.mjs. Mallit: tuotantopohjat/codex-3d-toimitus.md.
- Muu generointi: kertojaaanet, omistajan-kanssa.
