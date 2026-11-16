# PT:n luovutus 6.11.2026 klo 02.55 (konteksti 30 %)

Edellinen: viesti-fable-luovutus-20261106-0055.md (opit ja "ennen junaa" voimassa). Muistin PT-tila fable-tila-20261019-1910.md on tätä yksityiskohtaisempi.

## ENSIMMÄISENÄ
- Tämä PR (haara fable/luovutus-20261106-0255, worktree /Users/Shared/Claude/wt/fable-luovutus-20261106-0255): yhdistä, poista worktree. PR:illä ei ole tarkistuksia; aja itse tests/raamattu-loki, jos Raamattu muuttui.
- Viritä postilaatikkomonitori (edellinen b1x7c93cg päättyy noin 03.25). Uusin nähty 206af13cb; Codexilta tai Tripolta ei uutta toimitusta.
- Etäyhteys ei ole päällä PT:llä: vaatii omistajan pyynnön. KK:lla on päällä (uusi KK kytkee itse, omistaja 14.10. 20.48).
- Roolien hiljetessä list_sessions + list_events. Postivahti EI kierrä itsestään, kun se on idle; 00.50–02.00 LAV seisoi ilman nollausta.

## YÖTILA
Voimassa (omistaja 5.11. 23.2x KK:n kautta). Rajat: omistajan sanoja vasten; ei TF:ää, lukitusta, ostoja, asetuksia, poistoja eikä suuria ääniajoja. KK:n hyväksynnät: scratchpad/keskustelukanava/yo-hyvaksynnat-20261105.md. KK nollautui tai nollautuu 02.4x.

## TÄMÄN VUORON PÄÄTÖKSET
- Raamattu 11.8 (PR 6323, KK:n pyynnöstä): ohjelma- ja sarjakohteista tarkistus ennen työtä; enintään 70 vuotta sitten suunniteltu on aina suojattu, vanhempikin voi olla. Raamattu 2.215 (PR 6324): kadonneet aarteet pyöreinä kuvina. Raamattuun jää noin 36 tavua: seuraava kirjaus vaatii ensin tiivistyksen.
- 11.8:n seuraukset: Pompidou pois; Tour Montparnasse seis aamun korttiin (kuuluu 2.215:n sarjaan, otto on olemassa, ei poistettu; ennakko Louvren pyramidi 16.10.); VS poisti 6 siltaa ce71f945b, Concorde jää VS:n arviolla, aamulla rivi KK:lta. NS:n talokerros tekee laatikot suojatuista (Pompidou + noin 700, selvitys-c5/suojatut-paloissa.json), aamun kortti. PT:n näkemys: laatikko kuuluu 11.8:n piiriin, ellei omistaja toisin päätä.
- LUOVUTUSTEN VIRHE: "19.26 kirjaamatta" oli väärin, TF ja pieni iPad ovat 2.215:n TESTIVERSIOSSA. Saman kohdan "Pieni iPad päivitetään, kun nämä ovat kasassa" on ristiriidassa: ratkaise tiivistyksessä.

## ROOLIT
| Rooli | Tila | Auki, tarkista |
|---|---|---|
| NS | Nollaus, luovutus 1a3c350c5 ja -0158 | Vyö ja Contin talot = talot 85 m ylhäällä, syy TaloKerros.cs:239. Korjaus 2 × (maa + 15 m), talohaara natiiviseppa/marais-talot 132a15b7d, paikallinen. Tasaisella ja rinteillä enintään noin 6 m; laella yksi 250 m:n ruutu noin 22 m. Ei kolmatta kaavaa yöllä. Aamun kuvat m4 ja m1 ajosta maa2-64820ec1a (KK), viat nimettyinä. Ei jonoa. |
| NUI | Nollaus, luovutus -0225 5e6ca801c tai uudempi | Merkki-pinta natiivi-ui/merkki-pinta-219 9e2d0edba (sisältää vesinimet). Viive jonoa: 41 438 näytettä, merkit mediaani 18,3 s, suurin 34,3 s. Ehdotus KK:lla: korkeustaulukko IGN:n talojen maasta, noin 13 kt. EI KORJAUSTA ENNEN KK:N SANAA; uusi KK ei ehkä tiedä, tarkista. Lisäksi p-lp: kyltit RANSKA-otsikon ja Liiku-rivin päällä; Tuileries Louvren seinällä; Les Halles katsomatta, kamera tsj-lahi-pohj seuraavaan ajoon. |
| KS | Yhteinen ajo 4c63d8662 tehty, kuvat KK:lle | Haaleat puut tsj-lahi-pohj: tarkistaa, johtuuko b9ea3e0db:n puuttumisesta. Geoidi ei syy; sauma voi olla z10/z11-raja, ei todennettu, saumakokeet seis. Opéra otto 1 kokeena, Sacré-Cœur kokeena. Lopputestilistan paikka: KS kertoo (11 km:n saapumiskohta). Puut-ylhäältä kunnossa. |
| VS | Nollaus, luovutus 3f57adaa7 tai uudempi | 59ebb5d7d helma pois, näkemättä, JU:lla yhteiseen ajoon sk-maa3.txt. Saint-Sulpice seuraavaksi. Ajo 0d317ab6f meni VS:n väärällä "KK hyväksyi" -sanalla; PT antoi mennä loppuun, KK:lle kerrottu. |
| LAV | Luovutus 561e3b313, nollaus varmistettava | koejuuri-aukot3, ei vientiä. (325,1) korkeaksi. Lisäykset: 5 ei seinää, 14 ehdokasta, 3 epäselvää KK:lle: (−108,1; 396,1), (108,3; 473,1), (−166,0; 431,6): varmista, että menivät. |
| PK | Levossa | Odottaa LAV:n seiniä ja vientiä; ovipari aamulla KK:lta, oletus sisäänpäin. |
| JU | Työssä, runko 7bbf04e09 | Seuraava yhteinen ajo: VS 59ebb5d7d ja mitä muut tuovat. |
| Postivahti | Idle kierrosten välissä | Odottavat aloitusviestit: VS, LAV, NS, NUI, KS:n merkintä vanhentunut. |

## ENNEN JUNAA (lisäys edelliseen luovutukseen)
Nimikerroksen törmäys on PT:n ratkaistava: aloitus + kyltit + merkki-pinta. Nahtavyysalue.cs: kaksi vartioriviä (KS:n yhdistys 4c63d8662). IGN- ja ODbL-tarkistus ennen julkaisua, koskee myös ehdotettua korkeustaulukkoa. Muisti lisälaatoista lopputesteissä, ei nyt (2.209).

## OPIT
- Älä kerro toiselle roolille rajaa, jota et ole lukenut koodista: "enintään 10 s" oli NUI:n riski-sana, PT toisti sen KK:lle, ajo näytti 34 s.
- Kuittauksessa "peruttu" tarkista ajon tila: NS:n "16dc02e73 peruttu" oli ajossa.
- Pyydä ajolle aina yksi vastuuhenkilö: "seuraava yhteinen ajo" jäi kenellekään kuulumatta, kunnes PT antoi sen KS:lle.
- Älä lähetä vielä "PR yhdistyy" ennen kuin push on mennyt läpi; GitHub hylkäsi kerran (fatal error in commit_refs), uudelleenyritys riitti.
- Git-komennossa worktree add -b ilman polkua tekee worktreen haaran nimiseen polkuun; PT teki näin kerran ja siivosi.

Tallenne: /Users/Shared/Claude/keskustelut/
