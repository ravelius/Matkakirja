# Bagdad — raportti 13.8.2026

*Nipun 2 viides kaupunki. Doha v587, Nikosia v592, Kuwait v594,
Masqat v597.*

## Bagdad ei ollutkaan estynyt — väärä diagnoosi purettu

Bagdad jätettiin 12.8. pois erästä sillä perusteella, että Overpass
palautti Rusafan rajauksesta vain 441 elementtiä ja kuva oli puoliksi
tyhjää paperia. Päätelmä oli, että kaupungin katuverkkoa on kartoitettu
OSM:ään ohuesti. **Päätelmä oli väärä.**

Kun elementit laskettiin kunnolla samasta ruudusta:

| kysely | tulos |
|---|---|
| pelin vakioluokat (residential, tertiary, primary…) | 381 way |
| `way["highway"]` ilman luokkasuodatinta | **1 096 way** |
| `way["building"]` | **2 682 way** |

Aineistoa on siis runsaasti. Rusafan vanhan puolen kujat on vain
merkitty OSM:ään `service`- ja `footway`-teiksi eikä `residential`-
teiksi, ja piirtotyökalun vakiokysely jättää `service`-tiet pois
tarkoituksella (ne siroittaisivat kujia joka kaupunkiin). Kaksi
kolmasosaa Bagdadin kaduista jäi siis hakematta.

Korjaus oli yksi lippu: `palvelutiet: true`, sama jota Vilna jo
käyttää. Kartta piirtyi kerralla kunnollisena — tiheä katuverkko
molemmin puolin Tigristä.

**Opetus on kirjattu työkaluun:** pieni elementtimäärä ei todista, että
kaupunki on kartoittamatta. Se voi tarkoittaa, että kadut on tagattu
luokkiin, joita vakiokysely ei pyydä. Laske ensin `way["highway"]`
ilman luokkasuodatinta ja vertaa, ennen kuin hylkäät kaupungin.

## Uusi tarkistus: numeroympyröiden päällekkäisyys

Selaintarkistus näytti, että Bagdadin kartalla kohteet 1 ja 6
(Mutanabbin katu ja Bagdadin museo, 110 metrin päässä toisistaan)
menevät osittain päällekkäin. Kirjoitin siitä tarkistuksen
`tools/tarkista-karttapisteet.mjs`:ään — ja **olin juuri vaihtamassa
kohdetta, kun ajoin tarkistuksen koko kartastolle.**

Päällekkäisiä pareja löytyi yhdestätoista jo julkaistusta kaupungista:

| kaupunki | pari | peitto |
|---|---|---|
| Berliini | Valtiopäivätalo ja Brandenburgin portti | 43 % |
| Riika | Kolme veljestä ja tuomiokirkko | 42 % |
| **Bagdad** | **Mutanabbin katu ja museo** | **18 %** |
| Kairo | Egyptin museo ja Tahririn aukio | 16 % |
| Istanbul | Hagia Sofia ja Sininen moskeija | 2 % |
| Moskova | Punainen tori ja Vasilin katedraali | 1 % |

Päällekkäisyys on siis pelissä tavallista eikä vika: kuuluisat kohteet
ovat vanhoissa kaupungeissa naapureita, ja se on kartan totuus eikä sen
virhe. Bagdadin kohteita ei vaihdettu. Tarkistus jäi työkaluun mutta
**se ei vaikuta paluuarvoon** — se kertoo peittoprosentin ja jättää
päätöksen ihmiselle. Jos olisin luottanut ensivaikutelmaan, olisin
heittänyt pois valmiiksi kirjoitetun jutun.

## Rajaus: pelin vaikein kaupunki

Peli ei käsittele nykykonflikteja, ja Bagdadissa se on tiukempi rajaus
kuin missään aiemmassa kaupungissa. Kirjoittajille annettiin kielto
myös kiertoilmauksista, koska Kuwaitin erässä kaksi kirjoittajaa oli
kiertänyt säännön muotoilemalla sotavaurion neutraaliksi remontiksi.
Yksi tarkistusagentti luki koko aineiston pelkästään tätä vasten.

Historialliset tapahtumat saa kertoa, ja niitä on: Mustansiriyan juttu
kertoo vuoden 1258 piirityksen vaurioista ja Timurin kaudesta,
molemmat satoja vuosia vanhoja.

## Mitä tarkistus löysi

Faktatarkistin ajettiin tällä kertaa ohjeella, joka vaatii
**sanatarkan lainauksen jokaisesta lähteestä** — Masqatin erässä kaksi
"täsmää lähteeseen" -riviä osoittautui perusteettomiksi. Ohje toimi:
raportti lainaa 18 väitettä lähteineen, ja kaksi virhettä löytyi.

1. **Khan Mirjanin rakennusvuodet.** Juttu sanoi 1357–1359, mutta Khan
   Mirjan -artikkelin infobox sanoo `built = 1356–1358`. Kirjoittaja oli
   poiminut vuodet Jalayirid Sultanate -artikkelista, joka nimeää
   rakennuttajan toisin ("Marjan b. Abdallah"), mutta säilyttänyt nimen
   päälähteestä. Hain lähteen itse ja vahvistin: korjattu 1356–1358, ja
   `aika` on nyt 1358.
2. **Khan Mirjanin ravintolakäyttö.** Juttu sanoi 1970-lukua, lähde
   sanoo *"By the mid-1980s, the building had been restored and was in
   use as a restaurant"*. Korjattu 1980-luvun puoliväliksi. Lähde
   liittää kunnostuksen myös silloiseen hallitsijaan; se jätettiin pois,
   koska se ei ole lehden aihe.
3. **Bagdadin museon perustamisvuosi.** Artikkelin leipäteksti sanoo
   1970, infobox 1940. Juttu käyttää leipätekstin lukua, joka sopii myös
   rakennuksen vuoteen 1869. Ristiriita on kirjattu tähän, koska
   `lahde`-kenttä ei voi sitä kertoa.

Erikseen tarkistin itse Vapaudenmonumentin nostosta kaikki luvut, koska
ensimmäinen haku osui Riian samannimiseen monumenttiin — joka on
sattumalta myös travertiinia. Bagdadin monumentin luvut (50 × 10 m,
kuuden metrin korkeudella, 14 pronssivalua, 25 hahmoa, Jawad Salim)
täsmäävät lähteeseen sanatarkasti.

## Mitat

Kuusi nähtävyysjuttua 1 085–1 395 merkkiä, kaksi kuvaa kussakin.
Kansisivu kolmella kansikuvalla ja kolmella nostolla, aihesivu `arki`
kolmella nostolla ja minitehtävällä. Kuvia 21, joista yksikään ei ole
pelissä ennestään eikä toistu kaupungin sisällä.

**Säätiedot puuttuvat.** Open-Meteon vuorokausikiintiö oli käytetty,
eikä sitä jääty odottamaan. Säälohko on vapaaehtoinen: 43 kohdekartasta
vain kymmenellä on säätiedot, eikä yhdelläkään Euroopan kaupungilla ole.
Bagdad ja İzmir voidaan täydentää myöhemmin.

## Jonossa

Ankara, Aleppo, Damaskos, Luxor, Riad, Sana, Aden, Salalah, Mosul,
Tabriz, Teheran, Isfahan — ja Lähi-idän jälkeen Aasian kaupunkilehdet.
Isfahan viimeisenä, koska sen kuusi maamerkkiä ovat IRN-maalehdessä.
Mekka ja Medina odottavat yhä omistajan erillistä päätöstä.
