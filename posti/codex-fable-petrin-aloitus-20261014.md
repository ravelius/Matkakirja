# Petřín — lähde- ja kameratarkistus, 14.10.2026

Aloitus ja lähdevalmistelu on tehty. Kuvia 0/5 ja maskeja 0/5; ensimmäinen generointi odottaa palautetauon soveltamista koskevaa omistajan päätöstä. Tämä ei ole kuvatoimitus tai hyväksytty mallin tavoite.

## Voimassa oleva mitoitus

Korjaus #253: runko 58,7 m, ylätasanne 51 m ja alatasanne 20 m. Masto noin 12 m / kokonaiskorkeus noin 71 m säilyvät epävarmoina. Hallin leveys ja korkeus sekä valokuvista johdetut värit ja osa kuvaussuunnista ovat arvioita. Vanhoja 60/55 m -lukuja ei käytetä aktiivisessa suunnitelmassa.

## Kamerat

| Kulma | Atsimuutti | Etäisyys m | Silmä m | Pitch | VFOV | Koko | Analyyttinen tornin osuus korkeudesta | Tila |
|---|---:|---:|---:|---:|---:|---|---:|---|
| K1 | 200° | 200 | 90 | -14.8° | 45° | 2400×1600 | 40.0% | ei generoitu |
| K2 | 190° | 55 | 1.7 | 24.9° | 70° | 1600×2400 | 71.7% | ei generoitu |
| K3 | 270° | 110 | 1.7 | 15.7° | 45° | 2400×1600 | 71.7% | ei generoitu |
| K4 | 5° | 100 | 1.7 | 16.9° | 45° | 2400×1600 | 77.7% | ei generoitu |
| K5 | 100° | 130 | 150 | -40.2° | 40° | 2400×1600 | 43.0% | ei generoitu |

Osuudet ovat JSON-kameran neulanreikäprojektion laskennallisia tuloksia tornin pystyakselille, eivät valmistuneen kuvan kameran tai oikean tornin mittatarkkuuden vahvistuksia. Kamerat pysyvät lähteen arvoissa; todelliset kuvapoikkeamat mitataan vasta generoinnin jälkeen. 2400 px on toimitusvaatimus, ei vielä varmistettu natiivikoko.

## Maskit

#254 edellyttää jokaiseen kuvaan samankokoista ja samanrajauksista maskia: torni hallista mastoon 255, muu 0, pehmeä reuna enintään 2 px. Maskia ei generoida arvattuna erillisenä hahmona: se on sidottava valmistuneen kuvan tarkkoihin ääriviivoihin. Ensimmäinen kuva valmistellaan ilman tornin eteen tulevia puita. Maskeja ei vielä ole.

## Lähteiden puutteet ja rajat

Kaikki 11 alkuperäistä liitettä ja viisi päivitysliitettä ovat Git-blob-tavuiltaan varmennetut. Kaikki seitsemän alkuperäistä kuvaliitettä sekä korjattu leikkaus on katsottu henkilökohtaisesti. Viitatut pohjakartta.svg, leikkaus.svg ja osm.json puuttuvat toimitetusta paketista; niitä ei ole rekonstruoitu lähteiksi. Kuva 4:n GPS/suunta on ristiriitainen; sitä ei käytetä pohjoiskulman todisteena. Kuva 5 on tornin tasanteelta alas katsova kuva, ei ilmakuva.

## Lähteet ja lisenssit

- [petrin-1-sisaankaynti.jpg](https://commons.wikimedia.org/wiki/File:Petrinska_rozhledna_a_nejblizsi_okoli_20250427_121942.jpg): VANOCE2022, CC0. tower geometry and color only.
- [petrin-2-etela.jpg](https://commons.wikimedia.org/wiki/File:Pet%C5%99%C3%ADnsk%C3%A1_rozhledna,_Prague.jpg): Ivan Korostelev, CC BY-SA 4.0. tower geometry and color only.
- [petrin-3-lansi.jpg](https://commons.wikimedia.org/wiki/File:Pet%C5%99%C3%ADn_Lookout_Tower_-_Prague,_Czech_Republic_-_May_17,_2019.jpg): Giorgio Galeotti, CC BY 4.0. tower geometry and color only.
- [petrin-4-muurin-takaa.jpg](https://commons.wikimedia.org/wiki/File:Prag_%E2%80%93_Aussichtsturm_Pet%C5%99%C3%ADn_-_Pet%C5%99%C3%ADnsk%C3%A1_rozhledna_-_panoramio_(1).jpg): Edgar El, CC BY 3.0. structure only, conflicting camera GPS and winter setting are not transferred.
- [petrin-5-ylhaalta.jpg](https://commons.wikimedia.org/wiki/File:Petrinska_rozhledna_a_nejblizsi_okoli_20250427_130633.jpg): VANOCE2022, CC0. hall roof and metal structure only; viewpoint is downward from tower platform, not aerial.

Mittakorjauksen ja maskilisäyksen lähdeversiot sekä kaikki SHA:t: source-read-receipt.json. K1-prompti: K1/prompt.txt. PT hyväksyy kuvat ennen mallikierroksia. Mallituotantoa tai peli-/julkaisumuutoksia ei ole tehty.

Lähdetarkistus ja aloituskuittaus vain: kuvat 0/5, maskit 0/5, generointikutsut 0. Ensimmäisen K1:n palautetauon soveltaminen on kysytty omistajalta; uusi reititys ei vapauta vanhaa palautetaukoa. Muut neljä kulmaa odottavat ensimmäisen palautetta. Tämä posti ei ole havainnekuvien toimitus, PT-hyväksyntä tai lupa aloittaa mallikierroksia.
