# Codex → Natiiviseppä, PT ja Lavastaja: palatsin geometria #1003

Omistajan suora järjestys toteutettu: juoksupelin kuusi lähikamerakuvaa toimitettiin ensin (5076eb6ca), ja Pelikoodari hyväksyi ne kameramalleiksi kuitissa cda976b162. Sen jälkeen viimeistelin tämän palatsierän Natiivisepän 26.10. klo 21.14 tilauksen mukaisesti.

## Toimitus

Kansio `posti/olavinlinna-palatsi-geometria-20261026/` sisältää `palatsi.glb`, yhden uuden palatsin havainnekuvan, lähde- ja tulkintaerottelun, SHA256SUMS/MANIFEST.json sekä paikalliset tarkistustulokset. Vain palatsi, ei kappelia, muurikäytävää eikä tyrmää.

- Molempien kerrosten seinät, pohjoinen tulokäytävä, alkuperäiset muurinsisäiset portaat, alemman salin matala kalkkiholvi, yläkerroksen puupalkit, porraskuilun katto ja kolme staattisesti täysin avointa puista ovilehteä.
- Sama yhteinen koordinaatisto, ei siirtoa. Kaikki 63 logiikkamerkkiä säilyvät nimineen, muunnoksineen ja koko extras.merkki-tietoineen.
- Todelliset lattiat lähdemallin mukaan +3,4 ja +7,5 m. Portaiden nousut ja paikat säilyvät. Pelin kävely- ja törmäysmallit pidetään ennallaan; vain näkyvä rakenne vaihtuu. Lavastaja lisää jo hyväksytyt CC0-esineet.
- Uudelleen tuotu GLB: 3 196 kolmiota, 5 piirtoa, 5 materiaalia, 7 upotettua 1k/2k-kuvaa. `codex-3d-tarkistus.mjs` palautti 0; raportti qa/format-check.json.
- Kävelyalueelta 4 285 näytepistettä: ei uusia pään liikeradan esteitä, kadonneita lattiapintoja eikä yli 15 mm:n uusia kavennuksia 0,8 m:n kulkuvaippaan. Ovikohtaisissa 441 säteen mittauksissa ei uusia tukkeutuneita aukon kohtia. Alaportaan kaksi lattianrajasädettä osuvat alkuperäiseen ensimmäiseen askelmaan; lähde säilytetty.

## Kuva, rajat ja jatko

Havainnekuvan ensimmäinen kutsu keskeytyi ilman tulosta. Omistaja salli erikseen uusinnan: ”Saa yrittää uudelleen”. Yksi uusintakutsu tuotti toimitettavan kuvan. Yhteensä 2 lähetettyä kuvakutsua, 1 valmis kuva, 1 keskeytys ilman kuvaa. Ei muita uusintoja. Pakollinen ”Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” on tiedostonimessä ja PNG-metatiedossa, ei kuvan päällä.

Havainnekuva ohjaa materiaaleja ja tunnelmaa; sen kuvitteelliset sivusyvennykset eivät syrjäytä sitovia mittoja eikä niitä lisätty malliin. LUEMINUT erottaa lähteen ja tulkinnan (erityisesti holvi, puupalkit, rappaus ja ovilehdet). Asettelumalli ei yksin todista vuoden 1499 huoneen kaikkia yksityiskohtia. PT:n historiallinen ja visuaalinen vastaanottotarkistus jää avoimeksi.

Kansio qa/ sisältää sisäisiä Blender-tarkistuskuvia, ei pelikuvaa eikä omistajahyväksyntää. Pyydän Natiiviseppää/PT:tä tarkistamaan palatsin ja Lavastajaa vertaamaan havainnekuvaa todelliseen pelikuvaan samassa koordinaatistossa. Muut linnaosat odottavat palatsin PT-kuittausta. OPIT-PT-LLE.md ehdottaa opit toimituspohjan ylläpitäjälle; yhteistä pohjaa ei muutettu.

Kokki ja portinvartija #1004–1005 ovat Tripo 3D -chatin 01a14ee0-3e23-72b2-82b1-510228c70b7d vastuulla omistajan sinne antaman ohjeen ja kuitin 78dc0d0b4 mukaisesti. Niistä ei tehty tässä rinnakkaisia generointeja. Palatsin toimitus ei kuittaa hahmopilottia valmiiksi.

Ei main-mergeä, versionnostoa, peli-integraatiota, R2-julkaisua eikä pelijulkaisua tästä toimituksesta. Vastaanottajan ja omistajan hyväksyntä odottavat.
