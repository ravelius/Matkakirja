# TILANNE: lähdetarkistus (Kielletty kaupunki 1923 ja Giza) — jatkoajo 7.10.2026

Päätoimittajan tilaus 7.10.2026: lähdetarkistus kahteen faktapohjaan, jotka kirjoitettiin
ilman pääsyä lähdesivuille. Omistajan päätös (5 tunnin raja) keskeytti työn kesken.
Haara: `fable-lahdetarkistus-kk-giza` (pohja: `origin/main`).

## VAIHE 2 (jatkoajo, uusi pilvisessio 7.10.2026)

**Verkon tila tarkistettu uudelleen tässä ympäristössä (kaikki toimii):**

| Lähde | Vaste |
|---|---|
| `en.wikipedia.org/wiki/Diary_of_Merer` | 200 |
| `commons.wikimedia.org/w/api.php` (imageinfo + extmetadata) | 200 (ajoittain 429 = kiintiö; uusinta auttaa) |
| `content.time.com/time/magazine/article/...` ja `time.com/archive/...` | 200 (vaatii user agentin) |
| `archive.org/details/twilightinforbid0000regi` | 200 |
| `dpm.org.cn` (Palatsimuseon PDF) | 200 |

Komento, jota agentit käyttävät:
`curl -sS -L --max-time 60 -A "MatkakirjaFactCheck/1.0 (sami.reivinen@vvi.fi)" "<URL>"`
(ympäristömuuttuja `NODE_USE_ENV_PROXY=1`).

**Vaihe 2 käynnissä:** neljä ali-agenttia (A, B, C, D alla olevan työnjaon mukaan) ajossa
rinnakkain. Raportit kirjoitetaan session scratchpad-kansioon, ei repoon; vasta kun kaikki
neljä ovat valmiit, tulokset liitetään faktapohjien loppuun osioksi
"Lähdetarkistus 7.10.2026 (sivut avattu)".

**MALLIPÄÄTÖS (omistaja 7.10.2026, krediittien säästö): tämä työ ajetaan Sonnet 5.5:llä.**
Erä 1 (A–D) ehti käynnistyä Opuksella ja saa valmistua sillä; **kaikki tästä eteenpäin
käynnistettävät ali-agentit ja TARKISTAJA-agentti ajetaan mallilla `sonnet`**. Päätös on
CLAUDE.md:n agenttisäännön mukainen (vain Opus tai Sonnet; Fable-mallia ei koskaan agenttina).

**Edistyminen (vaihe 2):** raportit valmiina scratchpadissa (ei repossa, katoavat kontin mukana):
A (KK palo) ✔, B (KK eunukit/henkilöt) ✔, D (Giza kylä/satama/tulva) ✔. Käynnissä: C (Giza Merer),
E (KK kuvalisenssit ja osio 4, Sonnet), F (Giza E15, E18, E21, E27, E28, E53–E55, Sonnet).
Seuraavaksi: kirjoitusvaihe (osiot tiedostojen loppuun + selvien virheiden korjaus
`[KORJATTU 7.10.]`), sitten erillinen TARKISTAJA (Sonnet).

**KK-tiedosto VALMIS (commit b3457bb):** `faktapohja-kielletty-kaupunki-1923.md` sai osion
"Lähdetarkistus 7.10.2026 (sivut avattu)" + 28 tekstikorjausta (`[KORJATTU 7.10.]`).
E1–E25: vahvistui 11, korjattu 12, jää epävarmaksi 2; osio 4: 21/9/11. Agentti E (kuvat/paikat) ✔.
**Jäljellä:** Giza-tiedoston osio (odottaa C ja F; D valmis), sitten TARKISTAJA (sonnet) molemmille
tiedostoille, lopuksi loppuraportti. KK-tiedoston TARKISTAJA-läpikäynti on vielä tekemättä.

**Giza/C valmis (scratchpadissa), tärkeimmät löydökset:** E10 KORJATTU: Tallet & Lehner 2021 luku 14 (Lehner): Mererin Tura-kivi
ei todennäköisesti mennyt pyramidin verhoukseen (verhous valmis; kivet pengertiehen, laaksotemppeliin, venekuoppien kattolohkoihin), Tallet 2017 eri mieltä;
E6 kuukaudet löytyivät (Papyrus A = I Akhet/heinä, B = II–IV Akhet + I Peret); E13 Tura–Giza vesireitti n. 20 km; E5 "17. laskenta" pois;
E1 epävarmuus 26/27 on tutkijoiden oma (WP:n Diary_of_Merer ristiriidassa itsensä kanssa); E8 joukkue 40 (aper 160), luku 200 pois;
E9 kausisaldo n. 750 lohkoa; "Ankhhaf ei visiiri" harhaanjohtava (Tallet: visiiri); Khufu 2633–2605 eaa. (Tallet&Lehner), ±40 liian kapea;
E3 mefat = väriaine, 400 miestä ei lähteessä. RSS-skannauksessa ei sivunumeroita (viittaus luku + PDF-sivu).
**Giza/D lisäksi:** RAB-siiloja ~30 (ei 10), Area C Khafren, Ain Sukhna Khafre–Pepi II ja Montuhotep IV–Senusret I, E14 "Younes 2024" pois (Younes on PNAS:n kirjoittaja),
E58–E59 luvut mallinnuksia, E61 muotit 3 kokoa, E62 40 khar = 1 922 l (+ suuri heqat = 1 941 l) vahvistui, E63 jää (Gately-kirja), E64 Roth 1991 s. 121 ei ratkaise ryhmäkokoa.

**Raporttien tärkeimmät löydökset (jotta ne säilyvät, jos kontti katoaa):**
- KK/A: Time 9.7.1923 ("CHINA: Fire") ja 23.7.1923 ("Eunuch's Strike") ovat eri artikkelit, molemmat päiväykset oikein;
  "klo 21" ei tuettu (palo syttyi n. 0–1, hälytys 3, sammui 7, 27.6.); "yli 300 huonetta" on populaariluku (aikalaiset 100+/120/127);
  6643/387 = 《申报》"yli 6000 aarretta, pelastui runsaat 300"; pidätettyjen eunukkien nimet eivät ole lähteessä; Johnstonin puhelu dokumentoitu 《申报》1.7.1923.
- KK/B: E15 päiväys on 4.9.1922 (kuukalenterivirhe tiedostossa); ~1000 eunukkia palatsissa, ~100 jäi, ~900 ajettiin ulos;
  E13 "eroraha kutistui" ei lähteessä (taksa 200/20 yuania); palatsissa puhelimia jo 1910 (myös Jianfugongissa); Duankang nuorin leskijalkavaimo.
- Giza/D: "Khufun ystävät" = Hawassin popularisointi (Roth 1991 s. 125: kolme Khufun nimen muotoa); E35 löytöpäivä 14.4.1990;
  Tura ~17 km (PNAS), ei 12; luunmurtuma 1,97 % pitkistä luista, ei 44 %; Khufu-sinetit Kromerin kaatopaikalla = paras näyttö Lost Cityn yhteydestä Khufuun.

## Mitä on tehty (vaihe 1)

1. **Haara luotu** `origin/main`-pohjalta.
2. **Verkon tila todettu** (tämä on tarkistuksen kannalta oleellinen havainto): ajoympäristössä
   verkko on nyt auki. Testatut vasteet:
   - `https://en.wikipedia.org/wiki/Diary_of_Merer` → **200**
   - `https://content.time.com/time/magazine/article/0,9171,716092,00.html` → **302** (uudelleenohjaus;
     `time.com/archive/...` on seurattava)
   - Commons-API (`commons.wikimedia.org/w/api.php`) → **429** (kiintiöraja; toimii tauolla,
     ei estetty)

   Eli kummankin faktapohjan oma AINEISTORAJOITE-varaus ("yhtään lähdettä ei avattu",
   "verkkoesto") ei enää päde ajoympäristöön, ja tarkistus on tehtävissä loppuun.
3. **Luettu ja kartoitettu** tarkistettavat kohdat:
   - `docs/raportit/faktapohja-kielletty-kaupunki-1923.md`: osio 1 (kohdat 1–12), osio 10
     (E1–E25), osion 10 lopun lista "Tarkistettava Macilla (verkko auki)" ja osien väliset
     ristiriidat (22 kohtaa).
   - `docs/raportit/faktapohja-giza-kulta-aika.md`: osio "Rakennustyömaan hetki: päätelmät",
     "Tärkeimmät korjaukset" ja osio 6 (E1–E74, yhteenvetotaulukko + perustelut).
   - Malli: `docs/raportit/olavinlinna-tietokerros-lahdetarkistus.md` ja
     `faktapohja-olavinlinna-1500.md` (lopun "Epävarmojen tarkistus").
4. **Neljä Opus-ali-agenttia käynnistetty** rinnakkain (työnjako alla) ja **pysäytetty**
   omistajan päätöksellä, ennen kuin yksikään ehti kirjoittaa raporttiaan.

## Mitä EI ole tehty

- **Kummankaan faktapohjan sisältöä ei ole muutettu.** Osiota
  "Lähdetarkistus 7.10.2026 (sivut avattu)" ei ole vielä kirjoitettu kumpaankaan tiedostoon.
- Yhtään `[KORJATTU 7.10.]`-merkintää ei ole tehty.
- TARKISTAJA-agentin läpikäyntiä ei ole tehty (ei ollut mitään tarkistettavaa).
- **Yhtään tulosta (vahvistui / korjattu / jää epävarmaksi) ei siis ole vielä olemassa.**
  Agentit ehtivät vain ladata lähdeaineistoa session väliaikaiskansioon, joka katoaa
  kontin mukana; mitään päätelmää niistä ei ehditty kirjata eikä mitään ole committoitu.
  Aiempaa tulosta ei saa lukea tästä haarasta, koska sitä ei ole.

## Mistä jatketaan

Käynnistä sama neljän agentin erä uudelleen (enintään 4 rinnakkain; malli `sonnet`,
ks. MALLIPÄÄTÖS yllä), sitten erillinen TARKISTAJA-agentti. Agenttien työnjako oli:

| Agentti | Vastuu | Keskeiset kohdat |
|---|---|---|
| A (KK palo) | Jianfugongin palo ja tuhoutuneet esineet | E1–E10, E23, E24; Time 1923 (molemmat artikkelit ja niiden päiväykset), Palatsimuseon PDF, Puyin muistelman luku 遣散太监, palaneiden rakennusten nimet |
| B (KK eunukit ja henkilöt) | Eunukkien karkotus 16.7.1923 ja henkilöt | E11–E22; Puyi (17 v, Yangxindian), Wanrong (16 v, Chuxiugong), Wenxiu (13 v, Changchungong), Johnston (48 v, *Twilight in the Forbidden City*), Pujie-vienti 13.7.1922 |
| C (Giza Merer ja ajoitus) | Mererin päiväkirja ja Khufun ajoitus | E1–E13; Tallet & Marouard (MIFAO 136, 2017), *The Red Sea Scrolls* (2021), Dakhlan kalliokirjoitus, venekuopan "14. laskenta", Mererin titteli (sḥḏ) |
| D (Giza kylä, satama, tulva) | Työläisten kylä, satama, arki | E14, E17, E33–E37, E57–E70; AERA / Heit el-Ghurab, Wall of the Crow, Ro-She Khufu, PNAS 2022 (Nile waterscapes), märkä hiekka (Djehutihotep) |

Jäljellä olevat ja agenteille vielä jakamattomat kohdat (toinen erä):
- KK: E25 (Commons-lisenssit, kaikki osan C kuvat #1–#28 + `File:TaitaiWanRongJohnston.jpg`),
  osio 4 (Qianqingmenin raja, Guwu chenliesuo, restauroidut palatsit).
- Giza: E15, E18, E21, E27, E28, E53, E54, E55 (kuvalisenssit ja yksilähteiset kohdat).

### Lopputuotteen muoto (ei vielä kirjoitettu)

Kummankin tiedoston loppuun osio **"Lähdetarkistus 7.10.2026 (sivut avattu)"**, jossa
jokaisesta kohdasta: alkuperäinen väite, tulos (vahvistui / korjattu / jää epävarmaksi),
avattu lähde (URL + sivu tai kohta) ja tarvittaessa pelin käyttöohje. Tekstiin korjataan
vain selvät virheet, merkintä `[KORJATTU 7.10.]`. Muita tiedostoja ei muokata, PR:ää ei
avata eikä mergeä tehdä.

**Huom. "vahvistui" vaatii avatun sivun** — hakutiivistelmä ei riitä, koska juuri se on
näiden kahden faktapohjan alkuperäinen puute.
