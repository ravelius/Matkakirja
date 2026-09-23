# Kaupunkilehden herokuvien Commons-viitteet (Siirtoseppä 23.9.2026)

Fablen tilaus 23.9.2026. Tausta on lisenssi-inventaarion avoin kohta
(docs/raportit/lisenssi-inventaario-20260923.md, jatko-osa): osa
kaupunkilehden 394 herokuvasta tehtiin gpt-image-mallilla Commonsin
viitekuvista. Selvitettävä oli, missä viiteloki on, mitkä kuvat olivat
viitteinä ja milloin viite tekee herosta johdannaisteoksen.

Liitteet:

- [taulukko: kaikki 394 heroa](herokuvien-viitteet-20260923-liite-taulukko.md)
- [rekonstruoidut viitteet (JSON)](herokuvien-viitteet-20260923-rekonstruktio.json)
- [oikeudellinen selvitys lähteineen](herokuvien-viitteet-20260923-liite-oikeus.md)

Tämä ei ole oikeudellinen neuvo, vaan lähteisiin perustuva selvitys
päätöksen pohjaksi.

## Tulos lyhyesti

- **Viiteloki on kadonnut.** `tools/hero-ajuri.mjs` ajettiin
  23.–24.8. pilvikontissa, ja loki (`viitekuvat-loki.txt`) jäi kontin
  väliaikaiskansioon. Etsin sitä levyltä, Codexin kansiosta,
  git-historiasta, ämpäristä ja workflow-lokeista, eikä sitä löytynyt.
  Worker saa viitteet nimettöminä base64-kuvina eikä kirjaa niitä.
- **Herojen alkuperä, 394 kuvaa:**

| Ryhmä | Lkm | Viitteet |
|---|---|---|
| hero-ajuri, `tarkkaKohde: true` | **60** | Commons-viitteet, rekonstruoitu (alla) |
| hero-ajuri ilman `tarkkaKohde`a | 189 (8 myöhemmin korvattu omistajan kuvalla) | ei viitteitä |
| 22.8. varhaiset kierrokset ennen viiteputkea | 47 | ei viitteitä |
| omistajan ChatGPT/Drive-erät 26.–28.8. | **94** | **tuntematon**: pakan kommentin mukaan "viiteankkuroitu", mutta kirjausta ei ole |
| Tampere, korvattu 27.8. omistajan kuvilla | 4 | tuntematon |

- **Rekonstruktio 60 herolle.** Ajoin viitehaun (`haeViitekuvat()`,
  `lataa: false`) kuivana samoilla parametreilla kuin ajurikin. Haku ei
  generoi mitään, ei käytä avaimia eikä muuta mitään. Tulos on
  **todennäköinen, ei varmistettu**, koska Commons elää: yksi kategoria on
  jo siirretty, ja kaksi parametrioletusta on kirjattu liitteeseen.
  Kaikki 239 valittua tiedostoa oli ladattu Commonsiin ennen 24.8., joten
  yksikään valinta ei ole mahdoton.
- **Viitteiden lisenssit (240 viitettä):**

| Lisenssi | Viitteitä |
|---|---|
| CC BY-SA | 158 |
| CC BY | 58 |
| PD | 14 |
| CC0 | 10 |
| NC, ND | 0 |

  56 heroa 60:stä sisältää vähintään yhden BY-SA-viitteen, ja yksikään
  hero ei perustu pelkkiin PD- tai CC0-viitteisiin.
- **Pelissä** kaikkien 394 heron lähteenä lukee "Matkakirjan
  havainnekuva". Yleisselite kertoo, että kuva "kootaan useista kohteen
  valokuvista", mutta yksittäisiä viitekuvia, niiden kuvaajia tai
  lisenssejä ei mainita missään.

## Milloin hero on viitekuvan johdannainen

Lähteet ovat liitteessä. Tiivistettynä:

- Tekijänoikeus suojaa valokuvan **ilmaisua**: sommittelua, rajausta,
  valoa ja kuvakulmaa (Painer C-145/10). Kuvattu kohde itsessään ei ole
  suojattu, joten rakennusta tai näkymää saa kuvata ja maalata vapaasti.
- **Johdannainen** (CC 4.0: "Adapted Material"; TekijäL 4 §: epäitsenäinen
  muunnelma) syntyy, jos herossa tunnistettavasti toistuu viitekuvan oma
  sommittelu tai rajaus. **Itsenäinen uusi teos** ("vapaa muuntelu",
  TekijäL 4 § 2 mom.) syntyy, jos hero ottaa viitteestä vain kohteen
  ulkonäön ja sommittelee kuvan itse.
- Suomessa myös teoskynnyksen alittava valokuva on suojattu lähioikeudella
  (TekijäL 49 a §, 50 vuotta). Suoja kattaa myös muutetun kuvan.
- **Epävarmaa:** Creative Commonsin kannat koskevat mallin koulutusta, eivät
  yksittäistä kuvaa suorana image-edit-syötteenä. Julkaistua
  oikeuskäytäntöä tai Tekijänoikeusneuvoston lausuntoa tästä ei löytynyt.
  Tilanne muistuttaa lähinnä perinteistä "maalasin valokuvan pohjalta"
  -tapausta, jossa ratkaisee, kuinka paljon kuvan ilmaisusta siirtyy.
  Tämä vaihtelee herosta toiseen.
- EU AI Actin 50 artiklan merkintävelvoite (voimassa 2.8.2026 alkaen)
  koskee ensisijaisesti mallin tarjoajaa. Pelin oma "Havainnekuva"-merkki
  on jo hyvä käytäntö.

## Vaihtoehdot ja työmäärä

| Vaihtoehto | Mitä tehdään | Työ | Riski |
|---|---|---|---|
| **(a) Attribuutio** | 60 heron riville `viitteet: [{ tiedosto, tekija, lisenssi, sivu }]` rekonstruktiosta; suurennoksen lähderiville "pohjana: …" (sama komponentti kuin kuvalähteillä); BY-SA-viitteelliset herot merkitään BY-SA-lisensoiduiksi | data 0,5 sessiota (Sisältökirjuri, JSON on valmiina), UI 0,5 sessiota (Pelikoodari) | pienin. Attribuutio täyttää ehdot, oli hero johdannainen tai ei, eikä BY-SA estä kaupallista käyttöä: se koskee vain kyseistä kuvaa, ei sovellusta. Jäännösriski: rekonstruoitu viite voi osua väärään kuvaajaan |
| **(b) Uudelleengenerointi** | 60 heroa (ja tarvittaessa 94 ChatGPT-erän heroa) uudelleen joko ilman viitteitä tai vain PD/CC0-viitteillä. `hae-viitekuvat.mjs`:ään lisenssisuodatin, ja loki talteen repoon | 60 herolle 2–3 sessiota ja omistajan silmätarkistus; 94 lisää vielä 2–3; maksulliset kuvakutsut noin 150–600 | poistaa periytymisen. Laatu voi heiketä, sillä 60 kohteesta vain 24 viitettä oli PD/CC0, ja tarkkuus perustui juuri viitteisiin |
| **(c) Juristin kanta** | Kysytään kolmea asiaa: (1) Onko tämä työtapa (2–4 kuvaa suorana syötteenä, tyylillinen uudelleenmaalaus) TekijäL 4 §:n vapaata muuntelua? (2) Kuinka laajalle BY-SA ulottuu mobiilisovelluksessa? (3) Mikä on pelin rooli AI Actin 50 artiklassa? Kysytään samalla SA-kuvista (noin 9 600) ja radiovirroista | tekijänoikeusjuristi 1–3 viikkoa, tai Tekijänoikeusneuvoston lausunto (hitaampi, ennakkotapaus) | ei korjaa mitään sellaisenaan, mutta ratkaisee, tarvitaanko (a) tai (b) |

**94 ChatGPT-erän heroa** ovat suurin tuntematon. Ensimmäinen askel on
kysyä omistajalta, mitä viitteitä niissä käytettiin: omia valokuvia,
Commons-kuvia vai ei viitteitä ollenkaan. Jos sitä ei tiedetä, niihin
sovelletaan vaihtoehtoa (b) tai riski hyväksytään juristin kannan
perusteella.

## Suositus

1. **(a) heti 60 herolle.** Se on halpa (noin 1 sessio), harmiton, jos
   hero ei ole johdannainen, ja riittävä, jos on.
2. **Omistajalle yksi kysymys** 94 ChatGPT-erän herosta: mitä
   viitteitä käytettiin?
3. **(c) ennen maksullista julkaisua** yhtenä juristikysymyksenä, jossa
   ovat mukana herot, SA-kuvat ja radiot.
4. **Jatkossa viiteloki repoon.** `hero-ajuri.mjs` kirjoittaa viitteet
   (tiedosto, tekijä, lisenssi) kuvan viereen dataan, ei ajokansioon. Näin
   loki ei katoa ajokontin mukana. Tämä on pieni muutos (Pelikoodari tai
   se, joka seuraavaksi ajaa herot).
