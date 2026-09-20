# Opus → Fable: Ihmisen matkan kuvat — ei regressiota, mittaukset

20.9.2026 klo 18.40. Haara `opus-local-ihmisen-kuvat` (pohja
origin/v1973-prep, joka sisältää v1979:n). **Ei tuotemuutosta.**

Omistajan havainto 15.20: Ihmisen matka -linssissä pallo, aikajana ja
tekstitys näkyvät, kuvia ei (kaappaus `ihmisen-matka-ei-kuvia.webp`).

## Kolme mittausta, kaikki puhuvat regressiota vastaan

**1. Kuvat piirtyvät.** `tools/savukkeet/savuke-ihmisen-esitys.mjs`:
```
OK  KUVA: löytökuva nousee isona kohteen ylle — {"jakso":"jebel-irhoud","leveys":550,"osuus":0.659}
OK  KUVA: kuva katoaa kohteettomalla jaksolla eikä jää roikkumaan — {"kuvia":16,...}
OK  JATKO 4 / KUVA: kohdekuva on iso, kehyksetön ja reunoilta häivytetty
```
Esityksen aikana syntyi 16 kuvaa. Epäillyt commitit `d222b01e`
(kuvakortin Livia-dialogi) ja `9a6f2055` (saapumisen piilot) ovat
molemmat tässä pohjassa, joten kumpikaan ei ole syy.

**2. Aineisto on ehjä.** Kaikki 20 kohdekuvaa vastasivat ämpäristä
HTTP 200, 0 rikkinäistä.

**3. Kuvatonta ikkunaa ei ole.** Näytteistin esityksen 200 ms:n välein
ja laskin jaksoittain, kuinka kauan kuva puuttuu jakson alusta:

| jakso | kesto | kuva näkyvissä |
|---|---|---|
| avaus | 10,8 s | — (ei kohdetta, oikein) |
| afrikka | 9,6 s | — (ei kohdetta, oikein) |
| jebel-irhoud | 16,4 s | 99 % (alkaa +0,2 s) |
| siirtyma-afrikka | 9,4 s | 2 % (siirtymä) |
| **omo** | **15,8 s** | **100 %, alkaa +0 s** |
| ranta | 17,2 s | 99 % |
| levantti | 26,6 s | 99 % |
| arabia | 34,6 s | 100 % |
| intian-rannat | 18,4 s | 99 % |
| australia | 21,2 s | 99 % |
| denisova | 25,8 s | 99 % |
| napapiiri | 18,2 s | 99 % |
| beringia | 13,4 s | 100 % |

Omistajan kaappauksen teksti (*"Etiopian jokilaaksossa ihmisiä asui
sukupolvi sukupolven perään"*) on jakso **omo**, jolla on kohde
`omo-kibish`. Siinä kuva on näkyvissä **koko jakson ajan** — ei siis
ole hetkeä, johon kuvakaappaus olisi voinut osua kuvattomana. Tämä
kumoaa oman ajoitushypoteesini.

## Johtopäätös

Vika ei toistu Chromiumissa pohjalla, joka sisältää v1979:n, eikä
sille löydy selitystä aineistosta, koodista tai ajoituksesta. **Jää
iPad-Safari-tarkistukseen** (Sonnet 1 laitteella), samoin kuin lennon
tuplaluenta.

## Mitä jäi tekemättä

- `savuke-ihmisen-esitys` on 18/27. Yhdeksän punaista ovat ajoitus- ja
  zoomimittoja (MUSTA ALKU, TÄHDET, AFRIKKA-SANA, TAUKO, ZOOMI,
  NYKÄISY, PULU, LOPPU, KÄRKI KUVASSA), eivät kuvamittoja. En ajanut
  niitä pohjahaarassa enkä siksi väitä niitä ennestään punaisiksi;
  ne ovat oma eränsä jonossa.
- En mitannut hidasta verkkoa: lataushitaus on ainoa jäljelle jäävä
  mekanismi, jolla kuva voisi puuttua vaikka tiedosto on olemassa.
