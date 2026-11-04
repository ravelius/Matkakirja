# Notre-Dame /19a k2 — arviointitoimitus

**Viisi uutta kuvaa KK:n ja omistajan arvioon. Ei Tripo-lähetystä.** K2 korvaa aiemman19a-sarjan arviointiehdokkaana; vanhat kuvat ja kaikki uudet otot säilyvät historiassa. Mallinnus, KK:n/omistajan hyväksyntä, runtime ja julkaisu eivät ole valmiita. 19b on edelleen SEIS erilliseen avaukseen asti.

Pelikulma tehtiin ensin. Siinä korkeat, ylöspäin levenevät tasannetornit hallitsevat lyhyttä ja matalaa runkoa. Sen jälkeen tuotettiin neljä suoraa vaakasuuntaista elevatiota. Mukana kolme länsiportaalia, ruusuikkunat, ristilaiva, kuori, tukikaaret ja hillityn vihreä huippu. Tasainen vaaleanharmaa tausta; ei maata, aukiota, puita, ihmisiä, tekstiä tai muita rakennuksia.

Yhteensä9 sisäänrakennetun ImageGenin kutsua: pelikulma2, länsi2, pohjoinen3, itä1, etelä1. Viisi valittua natiivia1024×1536 RGB-PNG:tä. Yhtään kuvaa ei rajattu, skaalattu, retusoitu tai peilattu tiedostona. Uusinnat olivat kokonaan uusia generointeja.

## Mittaukset ja rajoitteet

Tavoite: leveys240, pituus250, tornit540, huippu620; noin1,9px/yksikkö. Yhteinen tavoitemaaviiva y1425, huippu y247, tornin tasanne y399. Näitä varten tehtiin yksinkertaiset alkuperäiset mittarungot. Pelikulman projektio on jyrkkä yläkuva noin60astetta, mutta kamera ei ole kalibroitu. Se on tarkastuskuva, ei viides ortografinen elevatio.

| Kuva | Valittu otto | Värialueen bbox [x0,y0,x1,y1] | Leveys | Alareuna |
|---|---:|---|---:|---:|
| pelikulma | 2 | [212, 492, 805, 1428] | 593 px | 1427 |
| lansi | 2 | [281, 245, 742, 1427] | 461 px | 1426 |
| pohjoinen | 3 | [242, 245, 768, 1427] | 526 px | 1426 |
| ita | 1 | [278, 245, 746, 1428] | 468 px | 1427 |
| etela | 1 | [252, 244, 795, 1427] | 543 px | 1426 |

Bbox on koko natiivin kuvan pikselit, joilla RGB:n suurimman ja pienimmän kanavan ero>12; oikea ja alaraja ovat poissulkevia. Mittaus sisältää koristeet ja tukikaaret, eikä ole rakennuksen semanttinen3D-mittaus. Elevatioiden huiput y244–245 ja alareunat y1426–1427 sopivat noin1,9px/yksikkö pystymittakaavaan. Pääkerrosnauhat ja tornien parapetit vastaavat toisiaan silmämääräisesti.

**Jäljellä oleva poikkeama:** lännen/idän koko leveys461/468px on lähellä456px tavoitetta. Pohjoisen/etelän ulottuvuus tukikaarineen526/543px ylittää noin490px sivumittarungon (noin7%/11%); myös keskinäinen ero17px jää. Kaikkien koristeiden ja tukikaarien vastaavuutta samaan3D-malliin ei ole varmennettu. Ylöspäin leveneminen näkyy, mutta1,25-suhdetta ei ole kaikista suunnista kalibroitu. Taustan ja pintojen natiivit sävyerot säilyvät. **Täsmällinen geometrinen QA ei siis ole läpäisty; kuvat ovat katselmusvalmis visuaalinen ehdotus.** Mittoja ei esitetä valmiina3D-koordinaatteina.

Erillinen neljän elevatiokuvan vertailu: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/notre-dame-19a-k2-2009-20261104/qa/elevation-comparison.jpg
Täydet kehotteet: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/notre-dame-19a-k2-2009-20261104/prompts/
Alkuperäiset9 ottoa ja QA: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/notre-dame-19a-k2-2009-20261104/originals/ ja /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/notre-dame-19a-k2-2009-20261104/qa/
Lähteet ja tarkisteet: LAHTEET.md ja SHA256SUMS.

19c-pohja-alue on erillinen työ: #2011 hyväksyi Karttasepän viimeistelemän valmis.png-version (SHA256703e543c21cdaaa97f938abb184e1b3d5b83cae3c909e897656711d59d97f042) uusilla240×250mitoilla. Tämä ei muuta alkuperäisen19c-oton epäonnistunutta240×330-QA:ta eikä anna uutta19c-ottoa.
