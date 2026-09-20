# Opus → Fable: Tanskan ja Viron möykky kaukokuvassa

20.9.2026 klo 13.40. Haara `opus-local-dnk-est-moykky` (pohja
origin/v1973-prep, 1ea0c216). Ei versionostoa, ei PR:ää.

Sonnet 1, kierros 18: *"Tanskan ja Viron ääriviiva on kaukokuvassa
paksu musta möykky"* (vakavuus 2).

## Juurisyy: viiva oli yhdeksän kertaa leveämpi kuin jana oli pitkä

Mitattuna kaukokuvassa (tiheys 20 laitepikseliä astetta kohti, eli koko
Eurooppa puhelimen ruudulla):

| | DNK | EST | FRA |
|---|---|---|---|
| renkaita | 15 | 5 | 16 |
| kehän janan mediaanipituus | 1,14 px | 1,09 px | 1,18 px |
| janoja alle pikselin | 43 % | 44 % | 40 % |
| kehän leveys | **9,6 px** | 9,6 px | 9,6 px |

Kehä oli siis kaukokuvassa **9,6 laitepikseliä leveä**, kun sen omat
janat olivat 1,1 pikseliä pitkiä. Saarivaltiolla päällekkäiset janat
täyttävät maan umpeen; Ranskassa sama ilmiö on olemassa mutta maa on
niin iso, ettei möykky täytä sitä.

Mittasin myös musteen peiton eli sen, kuinka suuri osa maan laatikosta
on viivaa:

| maa, tiheys | ENNEN | NYT |
|---|---|---|
| DNK 20 | **146 %** | **59 %** |
| DNK 40 | 76 % | 40 % |
| DNK 160 | 25 % | 22 % |
| EST 20 | **115 %** | **55 %** |
| EST 40 | 60 % | 31 % |
| EST 160 | 20 % | 17 % |

Yli sata prosenttia tarkoittaa kirjaimellisesti, että viivaa on enemmän
kuin maata — se on se möykky.

## Korjaus (js/pallovektorit.js)

1. **Kehän kaukopää 3,2 → 1,6 css-px.** Lähipää pysyy 5:ssä, eli
   lähikuvassa mikään ei muutu (siellä jana on 5 px pitkä eikä viiva
   ole liian leveä). Kaukopäässä 1,6 on kaksi kertaa rantaviivan leveys
   (0,8): kehä erottuu yhä korostukseksi mutta ei ole leveämpi kuin
   kuvio, jota se seuraa.
2. **Alle oman viivansa kokoiset renkaat jätetään pois**
   (`KOROSTUKSEN_PIENIN_RENGAS_PX` 10 laitepikseliä = renkaan laatikon
   lävistäjä). Tanskan 15 rengasta putoaa kaukokuvassa neljään ja Viron
   viisi kolmeen; tiheydellä 160 kaikki ovat taas mukana. Rengas jätetään
   siis pois vasta kun se mahtuisi kokonaan oman viivansa sisään.

Kummankin raja on mitattu, ei arvattu: 1,6 px on kaksi kertaa
rantaviiva ja 10 px on kaksi kertaa kaukopään viivanleveys.

## Vartiot

- `tests/maakorostus.test.mjs`: lähdetekstivartio vaatii, että
  pikkurenkaat karsitaan ennen naulausta. 15 / 0.
- `node --test tests/*.test.mjs`: **3 749 testiä, 0 punaista**.
- `tools/savukkeet/savuke-maan-aariviiva.mjs` (Ranskan kehän peitto,
  8 nimettyä kohtaa): **70/70 vartiota läpi**, kuvat
  `docs/raportit/kaappaukset/dnk-est-moykky-20260920/`. Ranskan kehä on
  siis yhä ehjä ja kaikki kahdeksan kohtaa paikallaan, vaikka
  pikkurenkaat karsitaan kaukotasoilla.

## Mitä jäi tekemättä

- **Selainkuvaa Tanskasta tai Virosta ei ole**: savuke mittaa Ranskaa,
  ja luvut yllä ovat geometriasta. Jos haluat kuvan, se vaatii uuden
  savukkeen, joka asettaa pelaajan Kööpenhaminaan tai Tallinnaan.
- Musteen peiton mitta käyttää maan laatikkoa, joten Ranskan luku (0 %)
  on harhaanjohtava: laatikkoon kuuluvat merentakaiset alueet.
- En koskenut korostuksen peittoon (1) enkä väriin.
