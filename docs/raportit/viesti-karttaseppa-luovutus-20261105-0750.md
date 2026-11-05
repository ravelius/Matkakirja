# Karttaseppä: luovutus 5.11.2026 klo 07.50 (KS)
Syy: omistajan päätökset tulivat juuri ennen nollausta. **Lue tämä ensin, sitten -0745 (haara karttaseppa/luovutus-20261105-0745, d0f75f519) koko.** Tämä voittaa -0745:n ristiriidassa: sen kohdat "UUSI OTTO", "Pyramidit", "Mac-ajon kuvat: yksi pyramidisuositus" ja "Sitten: tilaus" eivät enää päde. Kyltti, Sainte-Chapelle, raja, avoimet, jono, opit ja vahti pätevät.

## Omistaja (KK:n välittämänä, sitova)
**07.43 kumoaa KK:n 07.33:n osan.** Omistajan sanat: "Codex saisi tehdä enemmän ympäristöä. Vai onko vielä tulossa? Pyramidi on mielestäni Ok kun erottuu värinsä puolesta"
1. **Pyramidi:** koko, paikka ja väri pysyvät nykyisinä. Ei korkeutta, ei siirtoa G:n siniseen, keskipaviljonkia ei madalleta. Sovitus lopetettu.
2. **Uusi otto** jatkuisi vain pohjoissivun ja katon piikkien takia; erillinen pyramidi sallittu vain, jos ulkonäkö pysyy samana. **Mutta katso kohta 4.**
3. **Enemmän ympäristöä (uusi, rinnakkain).** Kokemus: Louvre seisoo Codexin piirtämässä ympäristössä, ei kapealla reunuksella keskellä karkeampaa karttaa. **Ennen tilausta KK:lle yksi ehdotus isommasta alueesta kuvana kartan päällä:** nykyisen 21e:n koko, uusi rajaus, ulkoreuna kadulle tai rantaan, liitos ND:n pohjaan. ND:n hyväksytty pohja ei muutu. Kerro myös, kuinka paljon lähizoomin tarkkuus muuttuu ja tarvitaanko useampi pala. Laikka ja eteläranta ratkeavat todennäköisesti isommassa alueessa: huomioi ne ehdotuksessa.
4. **Omistaja pyramidin pihasta: "Mutta onko se oikeasti noin suljetussa tilassa?"** ÄLÄ TILAA Louvren uutta ottoa äläkä sen julkisivukuvia ennen KK:n sanaa: mallin muoto voi muuttua. Oikeassa Louvressa pyramidin piha on avoin länteen Tuileries'n suuntaan. Sainte-Chapelle ja isomman alueen ehdotus jatkuvat. **Piirrä ehdotukseen myös oikean Louvren siivet, jos ne saa kartta-aineistosta** (OSM-välimuisti; A/louvre-pohja/alue/tarkistus-alue.jpg on lähtökohta).
Kyltti, eteläranta, laikka ja sumea raja muuten ennallaan.

## Koodi
- Kärki 186aaea45 (natiivi-backup, karttaseppa/nahtavyydet-219): Louvren Pyramidit ja PihaPois pois käytöstä, v1b:n oma pyramidi näkyy taas. Oma nimi ja SC 22c pysyvät. Pyramidikoodi ja komento `pyramidi` jäivät käyttämättöminä: siivoa, jos pyramidia ei tarvita erillisenä.
- **JU ajaa Macilla 6b9788c79:ää (alkoi 07.44), jossa pyramidit ovat vielä koodissa.** Ajo saa valmistua, koska se antaa kyltin syyn ja SC:n. **p1–p4-kuvia ei arvioida eikä näytetä KK:lle pyramidin takia; ne ovat väärä ulkonäkö.** Kyltti katsotaan p-kuvista silti, nd-sc- ja rinnan-kuvista ensisijaisesti.
- iPad: JU:lla sama sk, käynnistys odottaa omistajaa, PK ja NS ensin. Pyysin JU:ta vaihtamaan iPad-rivin sha:ksi 186aaea45. Skriptin `pyramidi`-komennot eivät tee mitään, kun Pyramidit puuttuu.

## Seuraavaksi
1. Vahti (ENSIN -0745:stä), Mac-ajo: syy lokista, kyltti ja SC pelikuvina KK:lle. SC:n koko, akseli ja väri.
2. Isomman alueen ehdotus KK:lle, kohta 3 ja 4. Tiedot -2256 "Pohjan jatko" (A/louvre-pohja/: tee-alue.py, alue/, cs/ eli VS:n palat), -0728 "Pohja" (tee-louvre-pohja.py). Nyt 1536 × 1024 kuvaa. Laske: m/px eri aluekoolla (mvt14, alue.json), koska lähizoomin tarkkuus on kysytty; palamäärä. Kysymys on kuvapari kartan päällä, ei tilaus.
3. Louvren otto ja julkisivukuvat vasta KK:n sanalla.
4. Tripolle SC-kuittaus KK:n jälkeen (Tripo pyysi tietoa uudesta tehtävästä: Louvrea ei ole nyt jonossa).
