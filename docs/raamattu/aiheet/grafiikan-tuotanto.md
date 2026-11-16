# grafiikan-tuotanto · vastuu PT · tarkistettu 12.11.2026

TAVOITE: Pelaaja näkee yhtenäistä, todentuntuista grafiikkaa: kuva vastaa todellisuutta tai kertoo avoimesti kadonneesta. Hyväksytty malli päätyy peliin; työ ei seiso tilausten takia.

SÄÄNNÖT:
1. Codex tekee kuvat, pinnat karttoineen ja Tripo-mallit. Claude tekee kaiken pelissä ajettavan eikä aja Tripoa tai kuvageneraattoria itse. [R-7.15] [R-2.181] [R-2.182]
2. Kuvat tilaa Codexin kuvasessio, 3D-mallit Tripo 3D -sessio; tilaus ja korjauspyyntö kulkevat postilaatikon kautta oikealle sessiolle. [R-7.15] [R-7.14]
3. Ennen tilausta varmistetaan kohde ja aiemmat työt ja päätökset. Tilaus kertoo, liikkuuko malli ja miten; liikkumaton toimitetaan ilman luurankoa. [P-261023-1] [R-7.15]
4. Kuvatilaus kuuluu putkeen HERO (nykyinen kohde, 2–3 Commons-viitekuvaa, ei viitteettömiä yleisnäkymiä), IHME (kadonnut tai loistoaika, merkitään havainnekuvaksi) tai AARRE (esine vaalealla pergamentilla). [R-11.11] [R-11.13] [R-2.51]
5. Kuvassa ei tekstiä eikä vesileimaa. Uusin OpenAI-malli (vaihto kokeen kautta); JPG, peliin saa webp:ksi. Pulun kuva tilataan aina Codexilta (vapaat kuvat keskinkertaisia): aidon valokuvan näköinen neliö, aihe ympyrässä. [R-2.51] [R-11.12] [R-11.11] [P-261115-6] [P-261115-7] [P-261116-3]
6. Rakennukset ja kaupungit tehdään koodilla; niihin uusi Tripo- tai Codex-malli vain omistajan sanalla. Hahmot, eläimet, esineet ja kalusteet tehdään Tripolla Codexin kautta. Ensimmäinen halkaistu: Temple-torni, ihmiset nukkekodin nukkeina (Codexin 2D-leikkeet puvuissa, ei vihreitä), kohtausotsikot nukketeatterifontilla. [P-261109-2] [R-7.15] [P-261115-20] [P-261116-4] [P-261116-5]
7. Codexin kuvilla ja Tripolla on pysyvä lupa ilman määrä- tai ottokorttia. Lupa kattaa tuotannon, ei mallin hyväksyntää (kortti mallit-ja-3d). [R-7.15] [P-261105-3]
8. Omistaja sopii valinnat suoraan Codexin kanssa; Claude toimii Codexin postin mukaan eikä kysy samaa kortilla. [P-261021-1]
9. Toimitus kulkee tuontitarkistuksen läpi ja katsotaan täysikokoisena ennen peliä; näkyvän työn hyväksyy KK (valmiin-maaritelma). [R-11.7] [P-261110-6]
10. Malli kulkee tilattu → toimitettu → hyväksytty → pelissä; hyväksytty viedään kohtaukseen samassa tai seuraavassa junassa. [R-7.15]
11. Codexilla on aina 2–3 hyväksyttyä tehtävää jonossa. Toimitus kuitataan heti, arvio puolessa tunnissa. [R-7.18]
12. Tripo-tililtä ladataan vain peliin hyväksytyt mallit. [R-11.6]
13. Pelissä oleva kohtaus videoidaan pelistä; vain olematon hetki renderöidään Codexilla. [R-4.21]
14. Olemattomia patsaita ei generoida: Paljasta-tehtävässä joukossa on oikea patsas toisesta kaupungista, ja pelaaja osoittaa vieraan. [P-261113-6]

EI VIKA:
- Valmiit Tripo-mallit jäävät, vaikka rakennukset ovat koodia.

TEKOTAPA:
- Posti: haara claude/postilaatikko. Vahti: Matkakirja-posti/codex-odottaa.py.
- Herokuvat: tools/hero-kuvakulmat.mjs. Mallit: tuotantopohjat/codex-3d-toimitus.md.
- Muu generointi: kertojaaanet, omistajan-kanssa.
