# Build 23, korjaus edelliseen (6b6eec040) — Natiivisepän tarkennukset

## 1) 164 EI ollutkaan FAIL — uusi löydös Natiivi-UI:lle

Natiiviseppä täsmensi: 164 kattaa vain kaupunki-/aluenimiöt ja kaupunkipisteet (KalusteenAlla) — web ei
piilota nostomerkkejä lainkaan. Havaintoni (nostomerkki jäi näkyviin pulun päälle) on siis EI 164:n FAIL,
vaan uusi, erillinen löydös Natiivi-UI:lle (nostomerkkien kalustekollisio ei ole vielä toteutettu/
suunniteltu ominaisuus). En testannut varsinaista 164:n kattamaa aluetta (nimiöt/kaupunkipisteet
kartussin/Liiku-napin/pulun alla) — se jää yhä auki.

## 2) Aloitusverho — todennäköisesti OMA testivirhe, ei build-ongelma

Löysin syyn konsolista: lähetin `uusi-peli 1 ateena` -komennon t=6,28 s kohdalla, ENNEN kuin verho lähti
(t=8,38 s) — kamera/pelitilan muutos verhon aikana pudottaa Natiivisepän mukaan astetta. Rivijärjestys
todistaa tämän:
```
MATKAKIRJA linssit: fonttilämmitys: 173 merkkiä, 3498 ms, fontista puuttuu 18
MATKAKIRJA peli-komento: 6.28 uusi-peli 1 ateena → ok [Kartta]
MATKAKIRJA valmius: verho aloitusverho lähti katto 8382 ms aste 1,5 % kevennys paalle (...)
MATKAKIRJA aloitusverho: pois 8,4 s (pallo 2 %)
```
Lisäksi kriteeri oli väärä: ≥ 80 % koskee palloa aloituslennon mustan verhon lähtiessä, EI aloitusverhoa —
aloitusverhon raja on 8 s:n katto. 8,4 s on lähellä kattoa mutta linjassa muiden 25.–26.9. kylmäajojen
kanssa (Pelikoodari 8 033 ms). En lähettänyt yhtään komentoa ennen fonttilämmitystä, mutta lähetin
`uusi-peli`:n liian aikaisin tälle nimenomaiselle testille. **Peruttu FAIL** — pitäisi uusia ilman
komentoja ennen "aloitusverho: pois" -riviä, jotta saadaan puhdas mittaus.

## Korjattu tila
164: ei FAIL, testaamatta jäi oikea kattama alue. Aloitusverho: peruttu FAIL, todennäköinen syy oma
komento; uusittava puhtaana. Nostomerkki-pulu-kollisio: uusi erillinen löydös Natiivi-UI:lle (ei kirjattu
vielä muualle).
