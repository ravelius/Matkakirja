# Todistusajo: kehys-ratas-iphone-201 bfc99a3d

**kehys-ratas-iphone-201 bfc99a3d: OK**

Laite iphone `123B4B25-36B7-4A76-B677-905621CD8F5A`, skenaario `sk-kehys-ratas-201-iphone.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-kehys-ratas-iphone-201-20261018-0131`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt bfc99a3d = bfc99a3d6
- **OK** haaran natiivi-ui/ratas-201b sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: elävä opas aukesi` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: täkyt workerilta` | OK: linssit: opas: täkyt 11 (/opas/kohteet?n=50 ok) |
| `tap-teksti mk-linssirivi__nimi → tap 219.5 341.6` | lähetetty |
| `oletus: 1. kohde saapui` | OK: linssit: opas: saapui Eiffel-torni (48,8583, 2,2945), ääni soi, laatat 100 %, saapumisportti 0,0 s, tarkkuus 1,00, peitto 1,00 |
| `tap 196 430` | lähetetty |
| `tap 196 430` | lähetetty |
| `oletus: laukaisu alkoi` | OK: raketti: laukaisu alkaa (lyhyt 22 s) |
| `oletus: lataus valmis` | OK: raketti: lataus valmis 0,5 s (kaikki), avaus 17,1 s |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 4075 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/0, karkeita 0, lataus 0 %) |
| `tap 196 300` | lähetetty |
| `tap 243 755` | lähetetty |
| `tap 317 765` | lähetetty |
| `tap 317 765` | lähetetty |

- **OK** 7 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [O1-opas-ratas.png](kuvat/O1-opas-ratas.png): Oppaan napit: ⚙ ☀:n paikalla, napit näkyvissä (1179×2556 px, pysty)
- **OK** [O2-opas-himmea.png](kuvat/O2-opas-himmea.png): Napit himmeinä 5 s jälkeen (1179×2556 px, pysty)
- **OK** [O3-opas-esiin.png](kuvat/O3-opas-esiin.png): Napautus tyhjään: napit esiin, ei muuta toimintoa (1179×2556 px, pysty)
- **OK** [R1-poyta.png](kuvat/R1-poyta.png): UUSI: ⚙ pöydässä näytön ja sauvan välissä (näyttö kapeampi) (1179×2556 px, pysty)
- **OK** [R2-iss-himmea.png](kuvat/R2-iss-himmea.png): ISS: napit himmeinä 5 s jälkeen (1179×2556 px, pysty)
- **OK** [R3-iss-esiin.png](kuvat/R3-iss-esiin.png): Napautus ikkunaan: napit esiin, kohdevalikko ei aukea (1179×2556 px, pysty)
- **OK** [R4-kohdevalikko.png](kuvat/R4-kohdevalikko.png): KOHTEET-näyttö: kohdevalikko ilman vuorokausi-, vuodenaika-, LIVE- ja NIMET-nappeja (1179×2556 px, pysty)
- **OK** [R5-saadot.png](kuvat/R5-saadot.png): ⚙ palaa, säätöpaneeli pöydän yllä: vuorokaudenaika ›, vuodenaika ›, LIVE, NIMET, pilvipeitto (1179×2556 px, pysty)
- **OK** [R6-saadot-kiinni.png](kuvat/R6-saadot-kiinni.png): ⚙ uudelleen: paneeli kiinni, ratas ylhäällä (1179×2556 px, pysty)
- **OK** [R7-kooppenhamina.png](kuvat/R7-kooppenhamina.png): Pitkä nimi KÖÖPENHAMINA mahtuu kapeampaan näyttöön (1179×2556 px, pysty)
- **OK** [R8-amsterdam.png](kuvat/R8-amsterdam.png): AMSTERDAM näytössä (1179×2556 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 78.70 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 190.25): kuormitus 190.25 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
