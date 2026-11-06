# Lavastajan luovutus 6.11.2026 09.05 (seinät aukkoihin) — LUE TÄMÄ KOKONAAN

Pohja: -0744:n (git show 87725dbf1:docs/raportit/viesti-lavastaja-luovutus-20261106-0744.md) Opetukset ja Työkalut pätevät; -0729:n ja -0715:n viittaukset samoin. Tila ja järjestys korvattu tällä. Työkansio A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md (lopun 4 kirjausta). Luovutus kontekstirajan takia.

## KK:n ja PT:n linja (6.11. 09.0x)
EI VIENTIÄ, ennen kuin myös 14 lisäyksen seinät ja 5 tiheää friisiä on tehty. Yksi vienti valmiista listasta, koska vienti muuttaa julkaistua pelin mediaa. Omistajan kysymys on "eikä seiniä puutu". Järjestys: aukot7 → punainen levy → lisäykset. Jos jokin ei ratkea, kerro KK:lle ja PT:lle kohde ja syy, älä odota. Pelikoodarin koko tason tarkastelu odottaa tätä vientiä. Mac-ajo vain JU:n vuorolla; L1 on ollut yhteisellä ajolla, JU käytti L2:ta.

## Opetukset
- TEXCOORD_1 on leivottu valo: atlas valo_rgbm glb:ssä, JuoksuLeivottu(i.uv1). Täytteen väri ratkeaa valitsemalla valo-UV naapurin kärjistä. Atlaksen arvot: mittaa7c.py.
- 13 px:n porras ja pystyviiva tulivat geometriasta: täyte naapurin tason takana ja poikkiseinän pää edessä. Mittaa e ja s ennen kuvia.
- Friisin korkeus otetaan liitoksen kärjistä, ei v-arvojen ääripäistä: friisi voi olla vino.
- Oma epäilyni räystäsvarjosta oli väärä. Kerro epäily epäilynä.
- Kuvauskomento: `ui juoksupeli valo ...`, ei pelkkä `valo ...`.

## Tila
`koejuuri-aukot7` (tee_aukot7.py, rakenna7.py, suunnitelma7.json; rakenna3 ja rakenna6 ennallaan). Kuvat-h, -i, -il katsottu. KK:lle ei ole lähetetty paria. Ei vientiä.
Korjattu kuvissa: a5:n pystyviiva, väri ja alareuna; (-155,6):n vyö ja friisi; (-157,1):n friisi ja väri; (154,7):n rako (yksi kamera). Punainen levy noin (-153; 290) on mallin, ei täytteen: ei korjattu, kerro KK:lle, jos se pitää korjata ennen vientiä.
Auki, syy mittaamatta (räystäsvarjo kumottu):
- a5: tumma nauha friisin yllä, täytteen leveydeltä, täytteen oma pinta; friisin vaaleampi vapaa pää; noin 3 px:n porras friisin alareunassa.
- (-155,6): naapurin tummat suorakaiteet (eivät atlaksessa mitatulla linjalla), tumma pystynauha ja ohut punainen viiva liitoksessa.
- (154,7): poikkiseinä täytettä tummempi, porrasmuoto yläreunassa.
Rakennus-, UV- ja valo-UV-muutos koskee kaikkia täytteitä; etupinta siirtyi kuudessa. Kuvaamatta: (-136,2), (54,8; 442,5), (58,0), (58,5) ja muut täytteet.

## Seuraajan järjestys
1. Yksi ajo JU:lta `ui juoksupeli valo varjot 0`, kamerat a5, -155-etela, 154p7 (tee_sk7b.py mallina), samassa ajossa sama kamera ennen komentoa, jos kuvaraja sallii. Jos varjoa: kirjaa, onko täytteen asia. Jos ei: mittaa a5:n nauha ja pystynauha.
2. 5 tiheää friisiä: (-189,4), (-188,8), (-188,5), (-151,5), (-136,2): vyot-lippu (rakenna6:n vyöt liitoksen korkeudelta). Tarkista vapaat päät ja poikkiseinät kuten a5.
3. 14 lisäyksen seinää, 19 aukkoa (lista KORJAUS.md); 25-28 m:n aukot (-100,2; -105,4; -163,5; -113,1) kuvasta ennen seinää. Juuri: uusi nimi, kopioi kaistan poisto tee_aukot7.py:stä, tai kaista palaa.
4. Paljaan taustan näkyvyys (54,8) ja (154,7) kartan kuljettavalta puolelta (-0744:n kohta 4). Kartta tuntee (154,7):n täytteen ja poikkiseinän vasta uudelleenajossa: PK:lle.
5. Kaista (-251,8) on jäänne myös v115- ja v124-juurissa: vientiin mukaan.
6. Valmis lista: pari PT:lle, sitten yksi vienti. Julkaistun median muutos: PK vahvistaa viittaukset ennen vientiä.

## Työkalut (A/), uudet
mittaa6*.py, mittaa7*.py (mittaukset), tee_rakenna6.py -> rakenna6.py, tee_aukot6.py, tee_aukot7.py -> rakenna7.py (uv1_kulmat), tee_sk7b.py (kuvauslista), rajaa6*.py, rajaa7.py (rajat6/), kirjaa_*.py (kirjaukset, älä aja uudelleen). Suunnitelman liput: vyot, friisi_kasin, ei_friisi, uv1, uv1_kulmat.
