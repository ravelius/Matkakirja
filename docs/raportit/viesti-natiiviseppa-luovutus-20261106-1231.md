# Natiivisepän luovutus 6.11.2026 klo 12.31 (konteksti 30 %, pehmeä raja ylitetty, 7.37)

Korvaa -1216:n SEURAAVA TYÖ:n kohdat 1 ja 3. -1216:n kohta 2 (iPad-ajo d015acab6), opit ja huomiot pätevät. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Luo ensin cron "4 9 * * *" (Raamattu 7.41, proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py).

## SEURAAVA TYÖ
Odottaa kolmea tulosta. Älä pyydä niitä uudelleen; ne tulevat NS:lle viestinä.

1. PALIKKAKOE MAC-5 (JU:n jonossa, pyydetty 12.29). Haara natiiviseppa/palikka-koe e1b50940b (peilissä, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-palikka), skenaario _tyo/natiiviseppa/palikkakoe/sk-mac-5.txt, lokit lokit/natiiviseppa-palikka-mac5-e1b50940b, kuvat m-b2, c-b2, c-b3, y-b2.
   - Tee: grep unity.logista "Shader error in 'Matkakirja/Kartta/Palikka'" (JU:n "0 error CS" ei kerro sitä). Varjostin on muuttunut paljon eikä sitä ole käännetty: virhe näkyy vasta, kun variantti piirretään.
   - Kuvat täysikokoisina. Parit parit-mac4.py:n mallilla: L uuteen kansioon, U = selvitys-mac5, mac-2:n m-nyt ja c-nyt | m-b2 ja c-b2. Rajaukset täysikoossa. Malli rajauksiin ja väreihin: varit-mac4-2.py. HUOM: c-b2:n etuala (y > noin 1850) on nykyisiä taloja, ei palikoita; palikkakaton näyte rivi 1480–1500, x 1560–1900 (voi vaihtua katon muutoksesta).
   - Tulos KK:lle pari ja arvio kohta kohdalta, tiivistys PT:lle. KK näyttää omistajalle varhaisena kokeena.
   - Katso erityisesti: ikkunat palikkaseinissä (riviin ja kokoon verrattuna nykyisiin, ei samaa välkettä); latvus (lelumaisuus pois? kortti näkyy kortin reunana? väri näytöllä lähellä #8f7743, kerroin 1,35 on arvio, mittaa); katto (yhtenäistyikö saman talon rivi, tuliko yhteisille sivuille outoja päätyjä tai reikiä, c-b3 = c-b2).
   - Jos rivi pieniä kattoja näkyy yhä: syy todennäköisesti eri taloja. KK:lle lupaus: kerro se parin yhteydessä. Eri talojen yhdistäminen ei ole pyydetty; nykyiset talot tekevät sen tee-palikat.py:n talo():ssa naapurin korkeudesta (ds). Vaatisi sisäsivun laskun eri talojen välillä, eri kierrot; kerro KK:lle, älä tee ilman sanaa.

2. IPAD-NOPEUS d015acab6 (JU:lla, -1216 kohta 2, lokit lokit/natiiviseppa-palikka-ipad1-d015acab6). KK: saa jatkua. Tulos KK:lle, tiivistys PT:lle.

3. IKKUNOIDEN JA LATVUKSEN NOPEUS ERIKSEEN (KK 12.2x: "jotta tekotapojen vertailu ei sekoitu"). Vasta kuvien jälkeen, oma iPad-ajo sha:sta, joka kelpaa kuvissa. Uudet tavat: B2P (ei yhtään), B2I, B2L, B2K (vain yksi), B2 (kaikki). Parit B2P|B2I, B2P|B2L, B2P|B2K, B2P|B2, rata r3, jakso 20, parit 3 (20 min). Ajopyynnön malli ajopyynto-ipad-1.md, uusi ipad-2. KK:lle lupaus: hinta kerrotaan erikseen. Latvus on alfaleikkaus: Applen piiri voi hidastua, vaikka kolmiot putoavat 272 → 18. Mittari: katso omatKutsut > 0, lukua verrataan rajaan 16,7 ms.

4. KS:N AJO 12 (Palais-Royal'n muoto, pr-etela uudella kameralla). KS kertoo kansion. Arvio KK:lle: louvre-ita ajossa 11 usvassa, eikä pr-etela todista etelämuuria. Canopéen katon välke liikkeessä todistamatta.

## Mitä tässä sessiossa tehtiin
- Mac-4 katsottu, 0 varjostinvirhettä, parit selvitys-mac4/, tulos KK:lla ja PT:llä. Värit ja katto kunnossa, korttelit osittain, puut lelumaiset, seinissä ei ikkunoita. Palikkakatto näytöllä #b89474 = nykyiset (yksi talo).
- KS:n ajon 11 Forumin pari katsottu ja arvioitu KK:lle (vain pienennetty jpg): irtopalat poissa, 4 pientä kuviota nimen lähellä (KS:n mukaan altaat). Muut ajon 11 kuvat katsomatta.
- KK 12.2x: "ikkunat ja puun latvus seuraavaan pariin. Käytä samaa tapaa kuin nykyisissä taloissa ja kaupunkipuissa, ei uutta tekotapaa eikä uusia tiedostoja, jos se vain on mahdollista. Matalalla näkyvä rivi pieniä kattoja: yhtenäistä saman talon katto, jos se onnistuu kevyesti; muuten kerro, mitä se vaatisi." KK:lle kerrottu tekotavat, nähty vasta mac-5:ssä.

## Mitä koodissa on (e1b50940b, NÄKEMÄTTÄ)
- Palikka.shader: kärjen alfa = laji (PalikkaVerkot.LajiSeina 200, LajiKatto 128, LajiKortti 64, LajiMuu 255). Ikkunat fragmentissa uv metreinä, TaloKerros.shaderin luvut. Kattoikkunoita (TaloKerroksen rinne-haara) ei tehty.
- Latvus: PalikkaVerkot.PuuKortti: runko + yksi nelikulmio, varjostin kääntää kameraan, KaupunkiPuu.shaderin kohina, leikkaus ja lehvästökimput; väri paletista, ei tuulta. Vanha pallo jää Tee(Puu):hun vertailua varten.
- Katto: KatonMuoto(p, sivut), bitit 1 +x, 2 −x, 4 +z, 8 −z; B3 varalla-kentässä, B2 matriisin m10:ssä × 0,001 (varjostin nollaa ennen käyttöä). HAKKEROINTI, vain kokeeseen: jos tekotapa etenee, siirrä oikeaan instanssidataan. Sisäsivu, kun naapurit peittävät sivusta vähintään puolet.
- PalikkaKerros: komento palikat piirre ikkunat|latvus|katto 0|1, ajon tavat kohdassa 3, tila-rivillä piirteet.
- Data: tee-palikat.py sisasivut(), PalikkaData-v3.bytes, sisäsivuja 2 093, 1 869 laatikolla, samat 2 000 taloa, palat-ilman-marais kelpaa ennallaan. Kartan testit 680/680, 2 uutta testiä PalikkaTestit.cs:ssä; tyyppitarkistus 0 virhettä.

## Opit
- KK:n ja PT:n viestit nimellä vaativat ref:n: SendMessage "KESKUSTELUKANAVA (Opus, max) [xxx]" (ListAgents).
- Parien etuala voi olla nykyisiä taloja: palikat rajoittuvat 735 m:iin Marais'n keskipisteestä. Mittaa näyte palikasta.
- tyyppitarkistus.zsh: S= osoittaa session scratchpadiin, vaihda polku.

## Huomiot
- NS:n työpuita wt/-kansiossa 8 (raja 3): kerro PT:lle ennen poistoja (-1140).
